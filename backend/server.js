require('dotenv').config();

const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const session = require('express-session');

const app = express();
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(__dirname, 'data');
const CONFIG_PATH = path.join(DATA_DIR, 'ai-config.json');

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || `http://127.0.0.1:${PORT}`;
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:4173')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean);
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(value => value.trim().toLowerCase())
    .filter(Boolean);
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session-secret-change-me';
const CONFIG_SECRET = process.env.CONFIG_ENCRYPTION_SECRET || SESSION_SECRET;
const LOCAL_FRONTEND_PORTS = new Set(['3000', '4173', '4176', '5173', '5500', '5501', '5502']);
const AI_MAX_OUTPUT_TOKENS = 2048;
const SPEECH_MAX_AUDIO_BYTES = 5 * 1024 * 1024;
const SPEECH_MAX_OUTPUT_TOKENS = 512;
const CHAT_RATE_LIMIT = 30;
const CHAT_RATE_WINDOW_MS = 10 * 60 * 1000;
const SPEECH_RATE_LIMIT = 12;
const SPEECH_RATE_WINDOW_MS = 10 * 60 * 1000;
const WAITLIST_RATE_LIMIT = 5;
const WAITLIST_RATE_WINDOW_MS = 10 * 60 * 1000;
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || '';
const chatRateBuckets = new Map();
const speechRateBuckets = new Map();
const waitlistRateBuckets = new Map();
const compiledTemplateProjects = new Map();

const TEMPLATE_SOURCES = {
    bullet_hell: {
        id: 'bullet_hell',
        label: 'Bullet Hell / Flying Shooter',
        rootPath: 'D:\\Codex\\Codex game design\\bullet_hell',
        templateType: 'bullet-hell',
        entryFiles: ['index.html', 'GameSettings.js', 'game.js', 'bullet-hell.css', 'spec/game.json', 'spec/schema.json', 'assets/manifest.json', 'README.md'],
        patchableFiles: ['spec/game.json', 'assets/manifest.json'],
        assetManifestPath: 'assets/manifest.json',
        priorityCategories: ['player', 'enemies', 'bosses', 'weaponAttacks', 'effects', 'ui']
    },
    roguelike_survival: {
        id: 'roguelike_survival',
        label: 'Roguelike Survival',
        rootPath: 'D:\\Codex\\Codex game design\\Groglike-SOP',
        templateType: 'roguelike-survival',
        entryFiles: [
            'index.html', 'game.css', 'template-config.js', 'FeatureFlags.js', 'GameRuntime.js', 'GameSettings.js',
            'AudioManager.js', 'AssetRuntime.js', 'ConfigManager.js', 'SpatialHashGrid.js', 'DebugRuntime.js',
            'SystemPipeline.js', 'InputController.js', 'SaveManager.js', 'ViewportManager.js', 'SpawnDirector.js',
            'RewardSystem.js', 'ProgressionSystem.js', 'PerkSystem.js', 'game.js', 'spec/schema.js',
            'spec/minimal.json', 'spec/waves.json', 'spec/enemies.json', 'spec/weapons.json', 'spec/balance.json',
            'spec/effects.json', 'assets/manifest.json', 'README.md'
        ],
        patchableFiles: ['template-config.js', 'spec/minimal.json', 'spec/waves.json', 'spec/enemies.json', 'spec/balance.json', 'assets/manifest.json'],
        assetManifestPath: 'assets/manifest.json',
        priorityCategories: ['player', 'enemies', 'bosses', 'weapons', 'pickups', 'skills', 'map', 'ui']
    }
};

const ASSET_REFERENCE_ROOT = 'D:\\Codex\\Codex game design\\zero_downtime_refactor\\assets';
const ASSET_GROUPS = {
    'Game Art': ['player', 'enemies', 'bosses', 'miniBosses', 'weapons', 'weaponAttacks', 'pickups', 'skills', 'map', 'tiles', 'terrain', 'bullets'],
    'Visual Style': ['ui', 'styleProofs', 'themeTokens', 'hud', 'panelFrames', 'buttonFrames'],
    'Audio & Feel': ['effects', 'audio', 'sfx', 'bgm', 'hitFeedback', 'screenShake', 'particles']
};

const PROVIDER_META = {
    openai: {
        label: 'OpenAI',
        defaultBaseUrl: 'https://api.openai.com/v1',
        adapter: 'responses',
        envApiKey: 'OPENAI_API_KEY',
        defaultModel: 'gpt-5.5'
    },
    qwen: {
        label: 'Qwen',
        defaultBaseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
        adapter: 'openai-compatible',
        envApiKey: 'QWEN_API_KEY',
        defaultModel: 'qwen3.7-max'
    },
    anthropic: {
        label: 'Claude code',
        defaultBaseUrl: 'https://api.anthropic.com/v1',
        adapter: 'anthropic',
        envApiKey: 'ANTHROPIC_API_KEY',
        defaultModel: 'claude-opus-4-7'
    },
    groq: {
        label: 'xAI Grok',
        defaultBaseUrl: 'https://api.x.ai/v1',
        adapter: 'responses',
        envApiKey: 'XAI_API_KEY',
        defaultModel: 'grok-4.20-multi-agent-0309'
    },
    gemini: {
        label: 'Gemini',
        defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        adapter: 'gemini',
        envApiKey: 'GEMINI_API_KEY',
        defaultModel: 'gemini-3.1-pro-preview'
    },
    custom: {
        label: 'Custom',
        defaultBaseUrl: 'http://localhost:11434/v1',
        adapter: 'openai-compatible',
        envApiKey: 'CUSTOM_API_KEY',
        defaultModel: 'custom-model'
    }
};

function sendError(res, status, message, details = {}) {
    res.status(status).json({ error: message, ...details });
}

function isAdminEmail(email) {
    return ADMIN_EMAILS.includes(String(email || '').trim().toLowerCase());
}

function isGoogleOAuthConfigured() {
    return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

function isAllowedOrigin(origin) {
    if (!origin) return false;
    if (FRONTEND_ORIGINS.includes(origin)) return true;
    try {
        const url = new URL(origin);
        return ['127.0.0.1', 'localhost'].includes(url.hostname) && LOCAL_FRONTEND_PORTS.has(url.port);
    } catch (error) {
        return false;
    }
}

function enforceRateLimit(req, res, buckets, limit, windowMs, message) {
    const now = Date.now();
    const key = req.sessionID || req.ip || 'anonymous';
    const current = buckets.get(key) || { count: 0, resetAt: now + windowMs };

    if (current.resetAt <= now) {
        current.count = 0;
        current.resetAt = now + windowMs;
    }

    current.count += 1;
    buckets.set(key, current);

    if (buckets.size > 1000) {
        for (const [bucketKey, bucket] of buckets) {
            if (bucket.resetAt <= now) buckets.delete(bucketKey);
        }
    }

    if (current.count > limit) {
        res.setHeader('Retry-After', String(Math.ceil((current.resetAt - now) / 1000)));
        sendError(res, 429, message);
        return false;
    }

    return true;
}

function enforceSpeechRateLimit(req, res) {
    return enforceRateLimit(
        req,
        res,
        speechRateBuckets,
        SPEECH_RATE_LIMIT,
        SPEECH_RATE_WINDOW_MS,
        'Too many voice transcription requests. Please try again later.'
    );
}

function enforceChatRateLimit(req, res) {
    return enforceRateLimit(
        req,
        res,
        chatRateBuckets,
        CHAT_RATE_LIMIT,
        CHAT_RATE_WINDOW_MS,
        'Too many AI chat requests. Please try again later.'
    );
}

function enforceWaitlistRateLimit(req, res) {
    return enforceRateLimit(
        req,
        res,
        waitlistRateBuckets,
        WAITLIST_RATE_LIMIT,
        WAITLIST_RATE_WINDOW_MS,
        'Too many waitlist submissions. Please try again later.'
    );
}

function requireAdmin(req, res, next) {
    if (!req.session.user || !isAdminEmail(req.session.user.email)) {
        return sendError(res, 403, 'Admin access required.');
    }
    next();
}

function getRedirectUri() {
    return `${PUBLIC_BASE_URL.replace(/\/$/, '')}/auth/google/callback`;
}

function encodeState(state) {
    return Buffer.from(JSON.stringify(state), 'utf8').toString('base64url');
}

function decodeState(value) {
    try {
        return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
    } catch (error) {
        return null;
    }
}

function getEncryptionKey() {
    return crypto.createHash('sha256').update(CONFIG_SECRET).digest();
}

function encryptSecret(value) {
    if (!value) return '';
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('base64url')}.${tag.toString('base64url')}.${encrypted.toString('base64url')}`;
}

function decryptSecret(value) {
    if (!value) return '';
    const [ivPart, tagPart, encryptedPart] = String(value).split('.');
    if (!ivPart || !tagPart || !encryptedPart) return '';
    const decipher = crypto.createDecipheriv('aes-256-gcm', getEncryptionKey(), Buffer.from(ivPart, 'base64url'));
    decipher.setAuthTag(Buffer.from(tagPart, 'base64url'));
    return Buffer.concat([
        decipher.update(Buffer.from(encryptedPart, 'base64url')),
        decipher.final()
    ]).toString('utf8');
}

function getEnvApiKey(providerId) {
    const meta = PROVIDER_META[providerId] || PROVIDER_META.custom;
    const envName = meta.envApiKey;
    return envName && process.env[envName] ? String(process.env[envName]).trim() : '';
}

function getProviderApiKey(providerId, provider = {}) {
    const envApiKey = getEnvApiKey(providerId);
    try {
        return decryptSecret(provider.encryptedApiKey) || envApiKey;
    } catch (error) {
        return envApiKey;
    }
}

function hasStoredApiKey(provider) {
    try {
        return Boolean(decryptSecret(provider.encryptedApiKey));
    } catch (error) {
        return false;
    }
}

function isProviderPubliclyAvailable(providerId, provider = {}) {
    const sanitized = sanitizeProvider(providerId, provider);
    return Boolean(getEnvApiKey(providerId) || (sanitized.enabled && hasStoredApiKey(sanitized)));
}

function createDefaultProvider(providerId) {
    const meta = PROVIDER_META[providerId] || PROVIDER_META.custom;
    return {
        enabled: Boolean(getEnvApiKey(providerId)),
        baseUrl: providerId === 'qwen'
            ? process.env.QWEN_BASE_URL || meta.defaultBaseUrl
            : meta.defaultBaseUrl,
        encryptedApiKey: '',
        currentModel: meta.defaultModel || 'custom-model',
        customModel: providerId === 'custom' ? meta.defaultModel : '',
        reasoningEffort: providerId === 'openai' || providerId === 'groq' ? 'high' : 'none'
    };
}

function defaultConfig() {
    const providers = Object.fromEntries(
        Object.keys(PROVIDER_META).map(providerId => [providerId, createDefaultProvider(providerId)])
    );
    const firstEnabledProvider = Object.entries(providers).find(([, provider]) => provider.enabled);

    return {
        defaultModel: firstEnabledProvider?.[1]?.currentModel || 'qwen3.7-max',
        providers,
        publicModels: []
    };
}

async function readConfig() {
    try {
        const raw = await fs.readFile(CONFIG_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        const defaults = defaultConfig();
        return {
            ...defaults,
            ...parsed,
            providers: {
                ...defaults.providers,
                ...(parsed.providers || {})
            },
            publicModels: Array.isArray(parsed.publicModels) ? parsed.publicModels : defaults.publicModels
        };
    } catch (error) {
        return defaultConfig();
    }
}

async function writeConfig(config) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function sanitizeProvider(providerId, provider) {
    const meta = PROVIDER_META[providerId] || PROVIDER_META.custom;
    return {
        enabled: Boolean(provider.enabled),
        baseUrl: provider.baseUrl || meta.defaultBaseUrl,
        encryptedApiKey: provider.encryptedApiKey || '',
        currentModel: provider.currentModel || provider.customModel || meta.defaultModel || 'custom-model',
        customModel: provider.customModel || '',
        reasoningEffort: provider.reasoningEffort || 'none'
    };
}

function publicModelsFromConfig(config) {
    const configuredModels = Array.isArray(config.publicModels) ? config.publicModels : [];
    const explicitModels = configuredModels
        .filter(model => model && model.enabled !== false)
        .filter(model => model.provider && isProviderPubliclyAvailable(model.provider, config.providers?.[model.provider]))
        .map(model => ({
            id: model.id || model.model,
            provider: model.provider,
            model: model.model,
            label: model.label || model.model,
            reasoningEffort: model.reasoningEffort || model.reasoning || 'none',
            enabled: true
        }))
        .filter(model => model.id && model.provider && model.model);

    const providerModels = Object.entries(config.providers || {})
        .filter(([providerId, provider]) => isProviderPubliclyAvailable(providerId, provider))
        .map(([providerId, provider]) => {
            const sanitized = sanitizeProvider(providerId, provider);
            const model = sanitized.currentModel || sanitized.customModel;
            return {
                id: model,
                provider: providerId,
                model,
                label: model,
                reasoningEffort: sanitized.reasoningEffort || 'none',
                enabled: true
            };
        })
        .filter(model => model.id);

    if (!explicitModels.length) return providerModels;

    const seen = new Set(explicitModels.map(model => `${model.provider}:${model.model}`));
    return [
        ...explicitModels,
        ...providerModels.filter(model => !seen.has(`${model.provider}:${model.model}`))
    ];
}

async function getProviderRuntime(providerId, modelId) {
    const config = await readConfig();
    const publicModel = publicModelsFromConfig(config)
        .find(model => (model.id === modelId || model.model === modelId) && model.provider === providerId);

    if (!publicModel) throw new Error('Model is not enabled.');

    const provider = sanitizeProvider(providerId, (config.providers || {})[providerId] || {});
    const apiKey = getProviderApiKey(providerId, provider);
    if (!isProviderPubliclyAvailable(providerId, provider) || !apiKey) throw new Error(`${providerId} API key is not configured.`);

    return {
        config,
        publicModel,
        provider: {
            ...provider,
            apiKey
        },
        meta: PROVIDER_META[providerId] || PROVIDER_META.custom
    };
}

async function callOpenAICompatible(provider, model, messages) {
    const body = {
        model,
        messages,
        temperature: 0.7,
        max_tokens: AI_MAX_OUTPUT_TOKENS
    };

    if (provider.reasoningEffort && provider.reasoningEffort !== 'none' && model.startsWith('gpt-5')) {
        body.reasoning_effort = provider.reasoningEffort;
    }

    const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${provider.apiKey}`
        },
        body: JSON.stringify(body)
    });
    const data = await parseProviderResponse(response);
    return {
        content: data.choices && data.choices[0] && data.choices[0].message
            ? data.choices[0].message.content
            : '',
        usage: data.usage || {}
    };
}

function normalizeResponseInput(messages, providerId) {
    return messages.map(message => ({
        role: providerId === 'openai' && message.role === 'system' ? 'developer' : message.role,
        content: message.content
    }));
}

function extractResponseText(data) {
    if (typeof data.output_text === 'string') return data.output_text;

    const output = Array.isArray(data.output) ? data.output : [];
    return output
        .flatMap(item => Array.isArray(item.content) ? item.content : [])
        .map(content => content.text || content.output_text || '')
        .filter(Boolean)
        .join('');
}

function normalizeResponsesUsage(usage = {}) {
    const promptTokens = usage.input_tokens || usage.prompt_tokens || 0;
    const completionTokens = usage.output_tokens || usage.completion_tokens || 0;
    return {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: usage.total_tokens || promptTokens + completionTokens
    };
}

async function callResponsesCompatible(providerId, provider, model, messages) {
    const body = {
        model,
        input: normalizeResponseInput(messages, providerId),
        max_output_tokens: AI_MAX_OUTPUT_TOKENS
    };

    if (provider.reasoningEffort && provider.reasoningEffort !== 'none') {
        body.reasoning = { effort: provider.reasoningEffort };
    }

    const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/responses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${provider.apiKey}`
        },
        body: JSON.stringify(body)
    });
    const data = await parseProviderResponse(response);
    return {
        content: extractResponseText(data),
        usage: normalizeResponsesUsage(data.usage || {})
    };
}

async function callAnthropic(provider, model, messages) {
    const system = messages.find(message => message.role === 'system');
    const conversation = messages
        .filter(message => message.role !== 'system')
        .map(message => ({
            role: message.role === 'assistant' ? 'assistant' : 'user',
            content: message.content
        }));

    const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': provider.apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model,
            max_tokens: AI_MAX_OUTPUT_TOKENS,
            system: system ? system.content : undefined,
            messages: conversation
        })
    });
    const data = await parseProviderResponse(response);
    const textBlock = data.content && data.content.find(item => item.type === 'text');
    return {
        content: textBlock ? textBlock.text : '',
        usage: {
            prompt_tokens: data.usage ? data.usage.input_tokens : 0,
            completion_tokens: data.usage ? data.usage.output_tokens : 0,
            total_tokens: data.usage ? data.usage.input_tokens + data.usage.output_tokens : 0
        }
    };
}

async function callGemini(provider, model, messages) {
    const prompt = messages.map(message => `${message.role}: ${message.content}`).join('\n\n');
    const modelPath = String(model).startsWith('models/') ? model : `models/${model}`;
    const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/${modelPath}:generateContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': provider.apiKey
        },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0,
                maxOutputTokens: AI_MAX_OUTPUT_TOKENS
            }
        })
    });
    const data = await parseProviderResponse(response);
    const candidate = data.candidates && data.candidates[0];
    const content = candidate && candidate.content && candidate.content.parts
        ? candidate.content.parts.map(part => part.text || '').join('')
        : '';
    return {
        content,
        usage: {
            prompt_tokens: data.usageMetadata ? data.usageMetadata.promptTokenCount : 0,
            completion_tokens: data.usageMetadata ? data.usageMetadata.candidatesTokenCount : 0,
            total_tokens: data.usageMetadata ? data.usageMetadata.totalTokenCount : 0
        }
    };
}

async function callGeminiSpeechTranscription(provider, model, audioBase64, mimeType) {
    const modelPath = String(model).startsWith('models/') ? model : `models/${model}`;
    const response = await fetch(`${provider.baseUrl.replace(/\/$/, '')}/${modelPath}:generateContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': provider.apiKey
        },
        body: JSON.stringify({
            contents: [{
                role: 'user',
                parts: [
                    {
                        text: [
                            'Transcribe this audio into plain text only.',
                            'Keep the original language.',
                            'Do not add explanations, labels, markdown, or quotation marks.',
                            'If there is no clear speech, return an empty string.'
                        ].join(' ')
                    },
                    {
                        inlineData: {
                            mimeType: mimeType || 'audio/webm',
                            data: audioBase64
                        }
                    }
                ]
            }],
            generationConfig: {
                temperature: 0,
                maxOutputTokens: SPEECH_MAX_OUTPUT_TOKENS
            }
        })
    });
    const data = await parseProviderResponse(response);
    const candidate = data.candidates && data.candidates[0];
    const rawText = candidate && candidate.content && candidate.content.parts
        ? candidate.content.parts.map(part => part.text || '').join('').trim()
        : '';
    return {
        text: cleanSpeechTranscript(rawText),
        usage: {
            prompt_tokens: data.usageMetadata ? data.usageMetadata.promptTokenCount : 0,
            completion_tokens: data.usageMetadata ? data.usageMetadata.candidatesTokenCount : 0,
            total_tokens: data.usageMetadata ? data.usageMetadata.totalTokenCount : 0
        }
    };
}

function cleanSpeechTranscript(value) {
    let text = String(value || '').trim();
    text = text.replace(/^```[a-z]*\s*/i, '').replace(/```$/i, '').trim();
    if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
        text = text.slice(1, -1).trim();
    }
    return text;
}

async function parseProviderResponse(response) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data.error && data.error.message ? data.error.message : `Provider request failed with ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        throw error;
    }
    return data;
}

async function callProvider(providerId, provider, meta, model, messages) {
    if (meta.adapter === 'responses') return callResponsesCompatible(providerId, provider, model, messages);
    if (meta.adapter === 'anthropic') return callAnthropic(provider, model, messages);
    if (meta.adapter === 'gemini') return callGemini(provider, model, messages);
    return callOpenAICompatible(provider, model, messages);
}

function normalizeTemplateId(templateId) {
    const id = String(templateId || '').trim();
    if (id === 'bullet-hell' || id === 'bulletHell') return 'bullet_hell';
    if (id === 'roguelike' || id === 'roguelike-survival' || id === 'Groglike-SOP') return 'roguelike_survival';
    return id;
}

function getTemplateSource(templateId) {
    return TEMPLATE_SOURCES[normalizeTemplateId(templateId)] || null;
}

function resolveInside(rootPath, relativePath = '') {
    const root = path.resolve(rootPath);
    const target = path.resolve(root, String(relativePath || '').replace(/^[/\\]+/, ''));
    if (target !== root && !target.startsWith(root + path.sep)) {
        const error = new Error('Template path escapes the source root.');
        error.status = 400;
        throw error;
    }
    return target;
}

async function pathExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

async function readTextIfExists(rootPath, relativePath) {
    const filePath = resolveInside(rootPath, relativePath);
    if (!(await pathExists(filePath))) return null;
    return fs.readFile(filePath, 'utf8');
}

async function readJsonIfExists(rootPath, relativePath) {
    const text = await readTextIfExists(rootPath, relativePath);
    if (!text) return null;
    return JSON.parse(text);
}

function makeProjectId() {
    return `${Date.now().toString(36)}-${crypto.randomBytes(5).toString('hex')}`;
}

function asArray(value) {
    return Array.isArray(value) ? value : (value ? [value] : []);
}

function collectAssetNodesFromValue(value, category, parentKey = '', nodes = []) {
    if (typeof value === 'string') {
        nodes.push({ manifestKey: parentKey || category, src: value, usage: [], assetRole: category });
        return nodes;
    }
    if (!value || typeof value !== 'object') return nodes;
    if (typeof value.src === 'string') {
        nodes.push({
            manifestKey: parentKey || category,
            src: value.src,
            usage: asArray(value.usage),
            assetRole: value.role || value.type || category
        });
    }
    if (Array.isArray(value.frames)) {
        value.frames.slice(0, 2).forEach((frame, index) => {
            nodes.push({
                manifestKey: `${parentKey || category}.frames.${index + 1}`,
                src: frame,
                usage: asArray(value.usage),
                assetRole: value.role || category
            });
        });
    }
    Object.entries(value).forEach(([key, child]) => {
        if (['src', 'frames', 'usage', 'sourceSize', 'anchor', 'worldSize'].includes(key)) return;
        collectAssetNodesFromValue(child, category, parentKey ? `${parentKey}.${key}` : `${category}.${key}`, nodes);
    });
    return nodes;
}

function groupForCategory(category) {
    return Object.entries(ASSET_GROUPS).find(([, categories]) => categories.includes(category))?.[0] || 'Game Art';
}

async function buildAssetSidebar(templateSource, manifest, patchPlan = {}) {
    const sourceBasePath = String(manifest?.basePath || 'assets/').replace(/^\/+/, '');
    const rootsToCheck = [
        path.join(templateSource.rootPath, sourceBasePath),
        path.join(templateSource.rootPath, 'assets')
    ];
    const rawNodes = [];

    Object.entries(manifest || {}).forEach(([category, value]) => {
        if (['version', 'basePath', 'fallback', '$schema'].includes(category)) return;
        if (category === 'images' && value && typeof value === 'object') {
            Object.entries(value).forEach(([imageCategory, imageValue]) => {
                collectAssetNodesFromValue(imageValue, imageCategory, imageCategory, rawNodes);
            });
            return;
        }
        collectAssetNodesFromValue(value, category, category, rawNodes);
    });

    const promptNodes = [];
    Object.entries(patchPlan.assetPrompts || {}).forEach(([key, prompt]) => {
        const category = key.split('.')[0] || 'styleProofs';
        promptNodes.push({
            manifestKey: key,
            src: '',
            usage: ['asset_generation_prompt'],
            assetRole: category,
            status: 'Generated Prompt',
            prompt: String(prompt || '')
        });
    });

    const nodes = await Promise.all([...rawNodes, ...promptNodes].map(async node => {
        const category = node.assetRole || String(node.manifestKey || '').split('.')[0] || 'asset';
        const src = String(node.src || '').replace(/^assets[\/\\]/, '');
        let status = node.status || (src ? 'Inherited' : 'Missing/Fallback');
        let previewable = false;
        if (src) {
            const exists = await Promise.all(rootsToCheck.map(root => pathExists(resolveInside(root, src))));
            previewable = exists.some(Boolean);
            if (!previewable) status = 'Missing/Fallback';
        }
        return {
            group: groupForCategory(category),
            category,
            manifestKey: node.manifestKey || category,
            src: src ? `assets/${src.replace(/\\/g, '/')}` : '',
            usage: asArray(node.usage).join(', ') || 'runtime manifest',
            assetRole: category,
            status,
            source: status === 'Inherited' ? templateSource.id : 'ai_prompt',
            previewable,
            prompt: node.prompt || ''
        };
    }));

    const grouped = Object.keys(ASSET_GROUPS).map(group => {
        const groupNodes = nodes.filter(node => node.group === group);
        const categories = [...new Set(groupNodes.map(node => node.category))].map(category => {
            const items = groupNodes.filter(node => node.category === category);
            return {
                category,
                total: items.length,
                defaultOpen: templateSource.priorityCategories.includes(category),
                items: items.slice(0, 6),
                overflow: Math.max(0, items.length - 6)
            };
        });
        return { group, categories };
    });

    return { groups: grouped, total: nodes.length };
}

function patchBulletHellGameSpec(gameSpec, userSpec = {}, patchPlan = {}) {
    const next = JSON.parse(JSON.stringify(gameSpec || {}));
    const specPatches = patchPlan.specPatches || {};
    const productionPlan = patchPlan.productionPlan || userSpec.productionPlan || null;
    next.meta = {
        ...(next.meta || {}),
        gameName: patchPlan.gameName || userSpec.gameSetting || next.meta?.gameName || 'Bullet Hell / Flying Shooter',
        genre: 'bullet-hell',
        description: specPatches.meta?.description || patchPlan.userIntentSummary || userSpec.background || next.meta?.description || '',
        storyPremise: specPatches.meta?.storyPremise || productionPlan?.storyPremise || next.meta?.storyPremise || '',
        productionPlan: productionPlan || next.meta?.productionPlan || null
    };
    next.flow = {
        ...(next.flow || {}),
        ...(specPatches.flow || {})
    };
    next.generated = {
        templateId: 'bullet_hell',
        userSpec,
        templatePatchPlan: patchPlan,
        generatedAt: new Date().toISOString()
    };

    const difficultyText = String(userSpec.difficultyLevel || patchPlan.difficultyTuning || '').toLowerCase();
    const difficultyScale = /hard|困难|高难|hardcore|expert/.test(difficultyText) ? 1.35 : (/easy|简单|casual/.test(difficultyText) ? 0.82 : 1);
    if (next.enemyTypes) {
        Object.values(next.enemyTypes).forEach(enemy => {
            if (typeof enemy.hp === 'number') enemy.hp = Math.max(1, Math.round(enemy.hp * difficultyScale));
            if (typeof enemy.speed === 'number') enemy.speed = Math.round(enemy.speed * Math.min(1.25, difficultyScale));
            if (typeof enemy.fireRate === 'number') enemy.fireRate = Number(Math.max(0.35, enemy.fireRate / Math.min(1.22, difficultyScale)).toFixed(2));
        });
    }
    if (next.bosses) {
        Object.values(next.bosses).forEach(boss => {
            if (typeof boss.hp === 'number') boss.hp = Math.round(boss.hp * difficultyScale);
            boss.phases = boss.phases || patchPlan.bossPhases || boss.phases;
        });
    }
    if (next.coreRules) {
        next.coreRules.autoAttack = true;
        next.coreRules.defaultShootMode = 'auto';
        next.coreRules.playerShootOnKey = false;
    }
    if (next.enemyBulletTypes && userSpec.artStyle) {
        const neonPalette = ['#74e5ff', '#8a78ff', '#f093fb', '#f8d878'];
        Object.values(next.enemyBulletTypes).forEach((bullet, index) => {
            bullet.color = neonPalette[index % neonPalette.length];
        });
    }
    return next;
}

function patchRoguelikeTemplateConfig(sourceText, userSpec = {}, patchPlan = {}) {
    let next = String(sourceText || '');
    const gameName = patchPlan.gameName || userSpec.gameSetting || 'Generated Roguelike Survival';
    next = next.replace(/gameName:\s*['"][^'"]+['"]/, `gameName: '${String(gameName).replace(/'/g, "\\'")}'`);
    if (/hard|困难|hardcore|expert/i.test(String(userSpec.difficultyLevel || ''))) {
        next = next.replace(/baseHp:\s*\d+/, 'baseHp: 90');
        next = next.replace(/baseSpeed:\s*\d+/, 'baseSpeed: 210');
    }
    return `${next}\n\nwindow.GENERATED_TEMPLATE_PATCH_PLAN = ${JSON.stringify(patchPlan, null, 2)};\nwindow.GENERATED_PRODUCTION_PLAN = ${JSON.stringify(patchPlan.productionPlan || userSpec.productionPlan || null, null, 2)};\nwindow.GENERATED_USER_SPEC = ${JSON.stringify(userSpec, null, 2)};\n`;
}

function patchRoguelikeMinimalSpec(minimalSpec, userSpec = {}, patchPlan = {}) {
    const next = JSON.parse(JSON.stringify(minimalSpec || {}));
    const specPatches = patchPlan.specPatches || {};
    const productionPlan = patchPlan.productionPlan || userSpec.productionPlan || null;
    next.meta = {
        ...(next.meta || {}),
        gameName: patchPlan.gameName || userSpec.gameSetting || next.meta?.gameName || 'Generated Roguelike Survival',
        description: specPatches.meta?.description || patchPlan.userIntentSummary || userSpec.background || '',
        storyPremise: specPatches.meta?.storyPremise || productionPlan?.storyPremise || '',
        productionPlan
    };
    next.flow = {
        ...(next.flow || {}),
        production: specPatches.flow || {},
        productionBrief: patchPlan.productionBrief || ''
    };
    next.generated = {
        templateId: 'roguelike_survival',
        userSpec,
        templatePatchPlan: patchPlan,
        generatedAt: new Date().toISOString()
    };
    return next;
}

async function buildCompiledTemplateProject(templateSource, userSpec = {}, patchPlan = {}) {
    const files = new Map();
    for (const relativePath of templateSource.entryFiles) {
        const content = await readTextIfExists(templateSource.rootPath, relativePath);
        if (content != null) files.set(relativePath.replace(/\\/g, '/'), content);
    }

    const manifest = await readJsonIfExists(templateSource.rootPath, templateSource.assetManifestPath) || {};
    if (templateSource.id === 'bullet_hell') {
        const gameSpec = await readJsonIfExists(templateSource.rootPath, 'spec/game.json');
        const patchedGameSpec = patchBulletHellGameSpec(gameSpec, userSpec, patchPlan);
        files.set('spec/game.json', JSON.stringify(patchedGameSpec, null, 2));
    }
    if (templateSource.id === 'roguelike_survival') {
        const templateConfig = await readTextIfExists(templateSource.rootPath, 'template-config.js');
        if (templateConfig) files.set('template-config.js', patchRoguelikeTemplateConfig(templateConfig, userSpec, patchPlan));
        const minimalSpec = await readJsonIfExists(templateSource.rootPath, 'spec/minimal.json');
        if (minimalSpec) files.set('spec/minimal.json', JSON.stringify(patchRoguelikeMinimalSpec(minimalSpec, userSpec, patchPlan), null, 2));
    }

    const manifestWithPrompts = {
        ...manifest,
        generatedPrompts: patchPlan.assetPrompts || {},
        generatedStylePatch: patchPlan.stylePatch || {}
    };
    files.set(templateSource.assetManifestPath, JSON.stringify(manifestWithPrompts, null, 2));

    const assetSidebar = await buildAssetSidebar(templateSource, manifestWithPrompts, patchPlan);
    const projectId = makeProjectId();
    const fileList = [...files.entries()].map(([filePath, content]) => ({
        path: filePath,
        kind: filePath.includes('/assets/') ? 'manifest' : (filePath.endsWith('.json') ? 'spec' : (filePath.endsWith('.js') ? 'runtime' : (filePath.endsWith('.css') ? 'style' : 'doc'))),
        size: Buffer.byteLength(content, 'utf8'),
        language: path.extname(filePath).replace('.', '') || 'text',
        patched: templateSource.patchableFiles.includes(filePath)
    }));
    const validationChecks = [
        { label: 'Template source mounted', ok: true },
        { label: 'Runtime files inherited from template', ok: files.has('game.js') && files.has('GameSettings.js') },
        { label: 'Manifest parsed and routed through assets/manifest.json', ok: Boolean(manifest && Object.keys(manifest).length) },
        { label: 'State machine, input, collision, restart stay in template runtime', ok: !patchPlan.requiresRuntimeCodePatch },
        { label: 'Asset sidebar generated from manifest', ok: assetSidebar.total > 0 }
    ];
    const validationReport = {
        ok: validationChecks.every(check => check.ok),
        checks: validationChecks
    };
    const project = {
        id: projectId,
        templateId: templateSource.id,
        templateLabel: templateSource.label,
        templateType: templateSource.templateType,
        previewEntry: 'index.html',
        previewUrl: `/api/template-project/${projectId}/index.html`,
        changedFiles: [...new Set(templateSource.patchableFiles.filter(filePath => files.has(filePath)))],
        files: fileList,
        fileContents: files,
        assetSidebar,
        validationReport,
        source: {
            rootPath: templateSource.rootPath,
            templateType: templateSource.templateType,
            assetManifestPath: templateSource.assetManifestPath
        },
        createdAt: Date.now()
    };
    compiledTemplateProjects.set(projectId, project);
    if (compiledTemplateProjects.size > 20) {
        const oldest = [...compiledTemplateProjects.entries()].sort((a, b) => a[1].createdAt - b[1].createdAt)[0];
        if (oldest) compiledTemplateProjects.delete(oldest[0]);
    }
    return project;
}

async function sendTemplateProjectFile(req, res) {
    const project = compiledTemplateProjects.get(req.params.projectId);
    if (!project) return sendError(res, 404, 'Template project not found.');
    const templateSource = getTemplateSource(project.templateId);
    if (!templateSource) return sendError(res, 404, 'Template source not found.');
    const requestedPath = String(req.params[0] || 'index.html').replace(/^[/\\]+/, '').replace(/\\/g, '/');
    const content = project.fileContents.get(requestedPath);
    if (content != null) {
        const ext = path.extname(requestedPath).toLowerCase();
        const type = ext === '.html' ? 'text/html' : (ext === '.css' ? 'text/css' : (ext === '.js' ? 'application/javascript' : (ext === '.json' ? 'application/json' : 'text/plain')));
        res.type(type).send(content);
        return;
    }
    const assetPath = requestedPath.startsWith('assets/') ? requestedPath : '';
    if (assetPath) {
        const filePath = resolveInside(templateSource.rootPath, assetPath);
        if (await pathExists(filePath)) return res.sendFile(filePath);
    }
    const sourcePath = resolveInside(templateSource.rootPath, requestedPath);
    if (await pathExists(sourcePath)) return res.sendFile(sourcePath);
    return sendError(res, 404, 'Template project file not found.');
}

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (isAllowedOrigin(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use(express.json({ limit: '8mb' }));
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: PUBLIC_BASE_URL.startsWith('https://')
    }
}));

app.get('/auth/google', (req, res) => {
    if (!isGoogleOAuthConfigured()) {
        return sendError(res, 500, 'Google OAuth is not configured.');
    }

    const nonce = crypto.randomBytes(16).toString('hex');
    const returnTo = req.query.returnTo || FRONTEND_ORIGINS[0] || '/';
    req.session.oauthNonce = nonce;

    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: getRedirectUri(),
        response_type: 'code',
        scope: 'openid email profile',
        prompt: 'select_account',
        state: encodeState({ nonce, returnTo })
    });

    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

app.get('/auth/google/callback', async (req, res) => {
    const state = decodeState(req.query.state);
    if (!state || state.nonce !== req.session.oauthNonce) {
        return sendError(res, 400, 'Invalid OAuth state.');
    }

    try {
        const params = new URLSearchParams({
            code: req.query.code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: getRedirectUri(),
            grant_type: 'authorization_code'
        });

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });
        const tokenData = await parseProviderResponse(tokenResponse);

        const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(tokenData.id_token)}`);
        const profile = await parseProviderResponse(verifyResponse);
        if (profile.aud !== process.env.GOOGLE_CLIENT_ID || profile.email_verified !== 'true') {
            return sendError(res, 401, 'Google identity verification failed.');
        }

        req.session.user = {
            email: profile.email,
            name: profile.name || '',
            picture: profile.picture || ''
        };

        delete req.session.oauthNonce;
        res.redirect(state.returnTo || FRONTEND_ORIGINS[0] || '/');
    } catch (error) {
        sendError(res, 500, error.message);
    }
});

app.get('/api/session', (req, res) => {
    const user = req.session.user;
    if (!user) return res.json({ email: '', isAdmin: false, googleConfigured: isGoogleOAuthConfigured() });
    res.json({
        email: user.email,
        name: user.name || '',
        picture: user.picture || '',
        isAdmin: isAdminEmail(user.email),
        googleConfigured: isGoogleOAuthConfigured()
    });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ ok: true });
    });
});

app.get('/api/models', async (req, res) => {
    const config = await readConfig();
    const models = publicModelsFromConfig(config);
    const defaultModel = models.find(model => model.id === config.defaultModel || model.model === config.defaultModel);
    res.json({
        defaultModel: defaultModel?.id || models[0]?.id || '',
        models
    });
});

app.post('/api/chat', async (req, res) => {
    try {
        if (!enforceChatRateLimit(req, res)) return;

        const messages = Array.isArray(req.body.messages) ? req.body.messages : [];
        const providerId = req.body.provider;
        const modelId = req.body.modelId || req.body.model;
        if (!providerId || !modelId || !messages.length) {
            return sendError(res, 400, 'provider, modelId, and messages are required.');
        }

        const runtime = await getProviderRuntime(providerId, modelId);
        const result = await callProvider(providerId, runtime.provider, runtime.meta, runtime.publicModel.model, messages);
        res.json({
            content: result.content,
            usage: result.usage || {}
        });
    } catch (error) {
        sendError(res, 400, error.message);
    }
});

app.post('/api/template-project/compile', async (req, res) => {
    try {
        const templateSource = getTemplateSource(req.body.templateId);
        if (!templateSource) {
            return sendError(res, 400, 'Unsupported template. Automatic generation only supports bullet_hell and roguelike_survival.');
        }
        const patchPlan = req.body.patchPlan || {};
        if (patchPlan.requiresRuntimeCodePatch) {
            return sendError(res, 409, 'Template patch requires runtime code changes. Route this request to the manual production flow.', {
                runtimePatchReason: patchPlan.runtimePatchReason || 'Template configuration cannot express the requested change.'
            });
        }
        const project = await buildCompiledTemplateProject(templateSource, req.body.spec || {}, patchPlan);
        const publicProject = {
            ...project,
            fileContents: undefined
        };
        res.json({ ok: true, project: publicProject });
    } catch (error) {
        sendError(res, error.status || 500, error.message);
    }
});

app.post('/api/waitlist', async (req, res) => {
    try {
        if (!enforceWaitlistRateLimit(req, res)) return;
        if (!WEB3FORMS_ACCESS_KEY) {
            return sendError(res, 500, 'Waitlist submission is not configured.');
        }

        const email = String(req.body.email || '').trim();
        const prompt = String(req.body.prompt || '').trim().slice(0, 5000);
        const subject = String(req.body.subject || 'New Droi AI Waitlist Submission').trim().slice(0, 160);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return sendError(res, 400, 'A valid email address is required.');
        }

        const formData = new URLSearchParams();
        formData.set('access_key', WEB3FORMS_ACCESS_KEY);
        formData.set('email', email);
        formData.set('prompt', prompt);
        formData.set('subject', subject);

        const response = await fetch(WEB3FORMS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.success === false) {
            return sendError(res, response.status || 502, data.message || 'Waitlist submission failed.');
        }

        res.json({ ok: true });
    } catch (error) {
        sendError(res, error.status || 400, error.message);
    }
});

app.post('/api/speech/transcribe', async (req, res) => {
    try {
        if (!enforceSpeechRateLimit(req, res)) return;

        const audioBase64 = String(req.body.audioBase64 || '').trim();
        const mimeType = String(req.body.mimeType || 'audio/webm').trim();
        const providerId = req.body.provider || 'gemini';
        const modelId = req.body.modelId || req.body.model;

        if (providerId !== 'gemini') {
            return sendError(res, 400, 'Speech transcription currently uses Gemini audio.');
        }
        if (!audioBase64) {
            return sendError(res, 400, 'audioBase64 is required.');
        }
        if (!/^audio\//i.test(mimeType)) {
            return sendError(res, 400, 'mimeType must be an audio type.');
        }

        const audioBytes = Buffer.byteLength(audioBase64, 'base64');
        if (!audioBytes || audioBytes > SPEECH_MAX_AUDIO_BYTES) {
            return sendError(res, 413, 'Audio is too large. Please keep recordings under 5MB.');
        }

        const config = await readConfig();
        const models = publicModelsFromConfig(config).filter(model => model.provider === 'gemini');
        const selectedModel = modelId
            ? models.find(model => model.id === modelId || model.model === modelId)
            : models[0];

        if (!selectedModel) {
            return sendError(res, 400, 'No Gemini speech model is enabled.');
        }

        const provider = sanitizeProvider('gemini', (config.providers || {}).gemini || {});
        const apiKey = getProviderApiKey('gemini', provider);
        if (!isProviderPubliclyAvailable('gemini', provider) || !apiKey) {
            return sendError(res, 400, 'Gemini API key is not configured.');
        }

        const result = await callGeminiSpeechTranscription(
            { ...provider, apiKey },
            selectedModel.model,
            audioBase64,
            mimeType
        );

        res.json({
            text: result.text || '',
            usage: result.usage || {}
        });
    } catch (error) {
        sendError(res, error.status || 400, error.message);
    }
});

app.get('/api/admin/ai-config', requireAdmin, async (req, res) => {
    const config = await readConfig();
    const publicConfig = {
        ...config,
        providers: Object.fromEntries(Object.entries(config.providers || {}).map(([providerId, provider]) => ([
            providerId,
            {
                ...provider,
                encryptedApiKey: undefined,
                hasApiKey: Boolean(provider.encryptedApiKey || getEnvApiKey(providerId))
            }
        ])))
    };
    res.json(publicConfig);
});

app.post('/api/admin/ai-config', requireAdmin, async (req, res) => {
    const incoming = req.body || {};
    const previous = await readConfig();
    const next = {
        ...previous,
        defaultModel: incoming.defaultModel || previous.defaultModel,
        providers: { ...previous.providers },
        publicModels: Array.isArray(incoming.publicModels) ? incoming.publicModels : previous.publicModels
    };

    Object.entries(incoming.providers || {}).forEach(([providerId, provider]) => {
        const previousProvider = sanitizeProvider(providerId, next.providers[providerId] || {});
        const apiKey = provider.apiKey && provider.apiKey.trim()
            ? encryptSecret(provider.apiKey.trim())
            : previousProvider.encryptedApiKey;
        next.providers[providerId] = sanitizeProvider(providerId, {
            ...previousProvider,
            ...provider,
            encryptedApiKey: apiKey
        });
    });

    await writeConfig(next);
    res.json({ ok: true, models: publicModelsFromConfig(next) });
});

app.post('/api/admin/ai-config/test', requireAdmin, async (req, res) => {
    try {
        const providerId = req.body.provider;
        const providerInput = req.body.config || {};
        const model = req.body.model || providerInput.currentModel || providerInput.customModel;
        const meta = PROVIDER_META[providerId];
        if (!providerId || !meta || !model) {
            return sendError(res, 400, 'provider and model are required.', { stage: 'validation' });
        }

        const saved = await readConfig();
        const savedProvider = sanitizeProvider(providerId, (saved.providers || {})[providerId] || {});
        const provider = sanitizeProvider(providerId, {
            ...savedProvider,
            ...providerInput,
            encryptedApiKey: savedProvider.encryptedApiKey
        });
        provider.apiKey = providerInput.apiKey && providerInput.apiKey.trim()
            ? providerInput.apiKey.trim()
            : getProviderApiKey(providerId, savedProvider);

        if (!provider.apiKey) {
            return sendError(res, 400, `${meta.label} API key is required.`, { stage: 'credential' });
        }

        const result = await callProvider(providerId, provider, meta, model, [
            { role: 'system', content: 'Reply with a short health check.' },
            { role: 'user', content: 'Say: connection ok' }
        ]);
        res.json({
            provider: meta.label,
            model,
            message: (result.content || 'connection ok').slice(0, 120)
        });
    } catch (error) {
        sendError(res, 400, error.message, {
            stage: 'provider',
            upstreamStatus: error.status
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'index.html'));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'index.html'));
});
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'script.js'));
});
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'style.css'));
});
app.get('/favicon.ico.png', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'favicon.ico.png'));
});
app.get('/api/template-project/:projectId/*', sendTemplateProjectFile);
app.use('/assets', express.static(path.join(ROOT_DIR, 'assets')));
app.use('/showcase', express.static(path.join(ROOT_DIR, 'showcase')));
app.get('*', (req, res) => {
    if (req.path.includes('/.') || path.extname(req.path)) {
        return sendError(res, 404, 'Not found.');
    }
    res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Droi AI backend listening on ${PUBLIC_BASE_URL}`);
    console.log(`Google callback URL: ${getRedirectUri()}`);
});

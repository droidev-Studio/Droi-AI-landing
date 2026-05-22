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
const LOCAL_FRONTEND_PORTS = new Set(['3000', '4173', '5173', '5500']);
const AI_MAX_OUTPUT_TOKENS = 2048;
const SPEECH_MAX_AUDIO_BYTES = 5 * 1024 * 1024;
const SPEECH_MAX_OUTPUT_TOKENS = 512;
const SPEECH_RATE_LIMIT = 12;
const SPEECH_RATE_WINDOW_MS = 10 * 60 * 1000;
const speechRateBuckets = new Map();

const PROVIDER_META = {
    openai: {
        label: 'OpenAI',
        defaultBaseUrl: 'https://api.openai.com/v1',
        adapter: 'responses'
    },
    anthropic: {
        label: 'Claude code',
        defaultBaseUrl: 'https://api.anthropic.com/v1',
        adapter: 'anthropic'
    },
    groq: {
        label: 'xAI Grok',
        defaultBaseUrl: 'https://api.x.ai/v1',
        adapter: 'responses'
    },
    gemini: {
        label: 'Gemini',
        defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        adapter: 'gemini'
    },
    custom: {
        label: 'Custom',
        defaultBaseUrl: 'http://localhost:11434/v1',
        adapter: 'openai-compatible'
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

function enforceSpeechRateLimit(req, res) {
    const now = Date.now();
    const key = req.sessionID || req.ip || 'anonymous';
    const current = speechRateBuckets.get(key) || { count: 0, resetAt: now + SPEECH_RATE_WINDOW_MS };

    if (current.resetAt <= now) {
        current.count = 0;
        current.resetAt = now + SPEECH_RATE_WINDOW_MS;
    }

    current.count += 1;
    speechRateBuckets.set(key, current);

    if (speechRateBuckets.size > 1000) {
        for (const [bucketKey, bucket] of speechRateBuckets) {
            if (bucket.resetAt <= now) speechRateBuckets.delete(bucketKey);
        }
    }

    if (current.count > SPEECH_RATE_LIMIT) {
        res.setHeader('Retry-After', String(Math.ceil((current.resetAt - now) / 1000)));
        sendError(res, 429, 'Too many voice transcription requests. Please try again later.');
        return false;
    }

    return true;
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

function defaultConfig() {
    return {
        defaultModel: 'gpt-5.5',
        providers: {
            openai: {
                enabled: false,
                baseUrl: PROVIDER_META.openai.defaultBaseUrl,
                encryptedApiKey: '',
                currentModel: 'gpt-5.5',
                reasoningEffort: 'low'
            }
        },
        publicModels: []
    };
}

async function readConfig() {
    try {
        const raw = await fs.readFile(CONFIG_PATH, 'utf8');
        return { ...defaultConfig(), ...JSON.parse(raw) };
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
        currentModel: provider.currentModel || provider.customModel || 'custom-model',
        customModel: provider.customModel || '',
        reasoningEffort: provider.reasoningEffort || 'none'
    };
}

function publicModelsFromConfig(config) {
    const configuredModels = Array.isArray(config.publicModels) ? config.publicModels : [];
    const explicitModels = configuredModels
        .filter(model => model && model.enabled !== false)
        .map(model => ({
            id: model.id || model.model,
            provider: model.provider,
            model: model.model,
            label: model.label || model.model,
            reasoningEffort: model.reasoningEffort || model.reasoning || 'none',
            enabled: true
        }))
        .filter(model => model.id && model.provider && model.model);

    if (explicitModels.length) return explicitModels;

    return Object.entries(config.providers || {})
        .filter(([, provider]) => provider.enabled)
        .map(([providerId, provider]) => ({
            id: provider.currentModel || provider.customModel,
            provider: providerId,
            model: provider.currentModel || provider.customModel,
            label: provider.currentModel || provider.customModel,
            reasoningEffort: provider.reasoningEffort || 'none',
            enabled: true
        }))
        .filter(model => model.id);
}

async function getProviderRuntime(providerId, modelId) {
    const config = await readConfig();
    const publicModel = publicModelsFromConfig(config)
        .find(model => (model.id === modelId || model.model === modelId) && model.provider === providerId);

    if (!publicModel) throw new Error('Model is not enabled.');

    const provider = sanitizeProvider(providerId, (config.providers || {})[providerId] || {});
    const apiKey = decryptSecret(provider.encryptedApiKey);
    if (!provider.enabled || !apiKey) throw new Error(`${providerId} API key is not configured.`);

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
    res.json({
        defaultModel: config.defaultModel,
        models: publicModelsFromConfig(config)
    });
});

app.post('/api/chat', async (req, res) => {
    try {
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
        const apiKey = decryptSecret(provider.encryptedApiKey);
        if (!provider.enabled || !apiKey) {
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
                hasApiKey: Boolean(provider.encryptedApiKey)
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
            : decryptSecret(savedProvider.encryptedApiKey);

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

app.use(express.static(ROOT_DIR));
app.get('*', (req, res) => {
    res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Droi AI backend listening on ${PUBLIC_BASE_URL}`);
    console.log(`Google callback URL: ${getRedirectUri()}`);
});

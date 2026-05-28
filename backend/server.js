const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = ROOT_DIR;
const DATA_DIR = path.join(__dirname, 'data');
const GENERATED_DIR = path.join(DATA_DIR, 'generated');

const PROVIDERS = {
  openai: {
    label: 'GPT',
    apiKeyEnv: 'OPENAI_API_KEY',
    baseUrlEnv: 'OPENAI_BASE_URL',
    defaultBaseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-5.5-high',
    models: [
      { id: 'gpt-5.5-high', label: 'GPT 5.5 High', reasoningEffort: 'high' },
      { id: 'gpt-5.5-low', label: 'GPT 5.5 Low', reasoningEffort: 'low' },
      { id: 'gpt-5.4-mid', label: 'GPT 5.4 Mid', reasoningEffort: 'medium' }
    ]
  },
  gemini: {
    label: 'Gemini',
    apiKeyEnv: 'GEMINI_API_KEY',
    baseUrlEnv: 'GEMINI_BASE_URL',
    defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    defaultModel: 'gemini-3.5-flash',
    models: [
      { id: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash', reasoningEffort: 'none' },
      { id: 'gemini-3.5-pro', label: 'Gemini 3.5 Pro', reasoningEffort: 'medium' },
      { id: 'gemini-3.0-flash-lite', label: 'Gemini 3.0 Flash Lite', reasoningEffort: 'none' }
    ]
  },
  anthropic: {
    label: 'Claude code',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
    baseUrlEnv: 'ANTHROPIC_BASE_URL',
    defaultBaseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-sonnet-4-6',
    models: [
      { id: 'claude-opus-4-7', label: 'Claude Opus 4.7' },
      { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
      { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5' }
    ]
  },
  groq: {
    label: 'xAI Grok',
    apiKeyEnv: 'GROQ_API_KEY',
    baseUrlEnv: 'GROQ_BASE_URL',
    defaultBaseUrl: 'https://api.x.ai/v1',
    defaultModel: 'grok-4.3',
    models: [
      { id: 'grok-4.20-multi-agent-0309', label: 'Grok 4.20 Multi-Agent' },
      { id: 'grok-4.3', label: 'Grok 4.3' },
      { id: 'grok-4.20-0309-non-reasoning', label: 'Grok 4.20 Non-reasoning' }
    ]
  }
};

function loadEnvFile() {
  const envPath = path.join(ROOT_DIR, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const LOCAL_FRONTEND_PORTS = new Set(['3000', '4173', '5173', '5500']);
const DEFAULT_FRONTEND_ORIGINS = [
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'http://localhost:4173',
  'http://localhost:5173',
  'http://localhost:5500',
  'https://droidev-studio.github.io'
];

function getPort() {
  return Number(process.env.PORT || 3000) || 3000;
}

function getModelRequestTimeoutMs() {
  return Number(process.env.MODEL_REQUEST_TIMEOUT_MS || 60000) || 60000;
}

function getFrontendOrigins() {
  return [
    ...DEFAULT_FRONTEND_ORIGINS,
    ...(process.env.FRONTEND_ORIGIN || '')
      .split(',')
      .map(value => value.trim())
      .filter(Boolean)
  ];
}

function isAllowedCorsOrigin(origin) {
  if (!origin) return false;
  if (getFrontendOrigins().includes(origin)) return true;
  try {
    const url = new URL(origin);
    return ['127.0.0.1', 'localhost'].includes(url.hostname) && LOCAL_FRONTEND_PORTS.has(url.port);
  } catch (error) {
    return false;
  }
}

function applyCorsHeaders(req, res) {
  const origin = req.headers.origin || '';
  if (origin && isAllowedCorsOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function sendError(res, status, code, message, extra = {}) {
  sendJson(res, status, {
    ok: false,
    code,
    error: {
      code,
      category: extra.category || 'request_failed',
      title: extra.title || message,
      message,
      technicalMessage: extra.technicalMessage || '',
      retryable: Boolean(extra.retryable),
      manualQueueRecommended: Boolean(extra.manualQueueRecommended),
      actions: extra.actions || []
    }
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 2_000_000) {
        reject(new Error('Request body too large.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('Invalid JSON body.'));
      }
    });
    req.on('error', reject);
  });
}

function getProviderConfig(providerId) {
  const provider = PROVIDERS[providerId];
  if (!provider) {
    const error = new Error(`Provider ${providerId || '(empty)'} is not supported.`);
    error.code = 'MODEL_NOT_FOUND';
    throw error;
  }
  const apiKey = process.env[provider.apiKeyEnv] || '';
  if (!apiKey) {
    const error = new Error(`${provider.label} API key is not configured.`);
    error.code = 'MODEL_NOT_CONFIGURED';
    throw error;
  }
  return {
    ...provider,
    apiKey,
    baseUrl: (process.env[provider.baseUrlEnv] || provider.defaultBaseUrl).replace(/\/+$/, '')
  };
}

function flattenMessages(messages) {
  return (Array.isArray(messages) ? messages : [])
    .map(message => {
      const role = message.role || 'user';
      const content = typeof message.content === 'string' ? message.content : JSON.stringify(message.content || '');
      return `${role.toUpperCase()}:\n${content}`;
    })
    .join('\n\n');
}

async function callModel({ provider, model, messages }) {
  const config = getProviderConfig(provider);
  if (provider === 'gemini') return callGemini(config, model || config.defaultModel, messages);
  if (provider === 'anthropic') return callAnthropic(config, model || config.defaultModel, messages);
  return callOpenAICompatible(config, model || config.defaultModel, messages);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = getModelRequestTimeoutMs()) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } catch (error) {
    if (error && error.name === 'AbortError') {
      const timeoutError = new Error(`Model request timed out after ${timeoutMs}ms.`);
      timeoutError.code = 'MODEL_TIMEOUT';
      timeoutError.status = 408;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAICompatible(config, model, messages) {
  const response = await fetchWithTimeout(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.4
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throwProviderError(response, data);
  return {
    content: data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content || '' : '',
    usage: data.usage || {}
  };
}

async function callGemini(config, model, messages) {
  const response = await fetchWithTimeout(`${config.baseUrl}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: flattenMessages(messages) }] }],
      generationConfig: { temperature: 0.4 }
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throwProviderError(response, data);
  const parts = data.candidates && data.candidates[0] && data.candidates[0].content
    ? data.candidates[0].content.parts || []
    : [];
  return {
    content: parts.map(part => part.text || '').join(''),
    usage: data.usageMetadata || {}
  };
}

async function callAnthropic(config, model, messages) {
  const system = (messages || []).filter(item => item.role === 'system').map(item => item.content).join('\n\n');
  const userMessages = (messages || []).filter(item => item.role !== 'system');
  const response = await fetchWithTimeout(`${config.baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 2000,
      temperature: 0.4,
      system,
      messages: userMessages.map(item => ({
        role: item.role === 'assistant' ? 'assistant' : 'user',
        content: String(item.content || '')
      }))
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throwProviderError(response, data);
  return {
    content: (data.content || []).map(item => item.text || '').join(''),
    usage: data.usage || {}
  };
}

function throwProviderError(response, data) {
  const message = data.error && (data.error.message || data.error)
    ? data.error.message || String(data.error)
    : `Provider HTTP ${response.status}`;
  const error = new Error(message);
  error.status = response.status;
  if (response.status === 401 || response.status === 403) error.code = 'MODEL_AUTH_FAILED';
  else if (response.status === 404) error.code = 'MODEL_NOT_FOUND';
  else if (response.status === 408) error.code = 'MODEL_TIMEOUT';
  else if (response.status === 429) error.code = 'MODEL_RATE_LIMITED';
  else if (response.status >= 500) error.code = 'MODEL_NETWORK_ERROR';
  else error.code = 'MODEL_REQUEST_INVALID';
  throw error;
}

function listPublicModels() {
  return Object.entries(PROVIDERS).flatMap(([providerId, provider]) => {
    const enabled = Boolean(process.env[provider.apiKeyEnv]);
    return provider.models.map(model => ({
      id: `${providerId}:${model.id}`,
      provider: providerId,
      model: model.id,
      modelId: model.id,
      label: model.label,
      reasoningEffort: model.reasoningEffort || 'none',
      enabled
    }));
  });
}

function getErrorResponseMeta(code) {
  const normalized = String(code || 'SERVER_ERROR');
  const table = {
    MODEL_TIMEOUT: {
      category: 'recoverable_model_failure',
      retryable: true,
      manualQueueRecommended: false,
      actions: ['retry', 'switch_model']
    },
    MODEL_NETWORK_ERROR: {
      category: 'recoverable_model_failure',
      retryable: true,
      manualQueueRecommended: false,
      actions: ['retry', 'switch_model', 'manual_queue']
    },
    MODEL_RATE_LIMITED: {
      category: 'recoverable_model_failure',
      retryable: true,
      manualQueueRecommended: false,
      actions: ['retry', 'switch_model']
    },
    MODEL_QUOTA_EXCEEDED: {
      category: 'model_configuration_failure',
      retryable: false,
      manualQueueRecommended: false,
      actions: ['switch_model', 'open_deployment_guide', 'manual_queue']
    },
    MODEL_AUTH_FAILED: {
      category: 'model_configuration_failure',
      retryable: false,
      manualQueueRecommended: false,
      actions: ['switch_model', 'open_deployment_guide', 'manual_queue']
    },
    MODEL_NOT_CONFIGURED: {
      category: 'model_configuration_failure',
      retryable: false,
      manualQueueRecommended: false,
      actions: ['switch_model', 'open_deployment_guide', 'manual_queue']
    },
    MODEL_NOT_FOUND: {
      category: 'model_configuration_failure',
      retryable: false,
      manualQueueRecommended: false,
      actions: ['switch_model', 'open_deployment_guide', 'manual_queue']
    },
    MODEL_SCHEMA_INVALID: {
      category: 'model_output_invalid',
      retryable: true,
      manualQueueRecommended: false,
      actions: ['retry', 'switch_model', 'manual_queue']
    },
    MODEL_JSON_PARSE_FAILED: {
      category: 'model_output_invalid',
      retryable: true,
      manualQueueRecommended: false,
      actions: ['retry', 'switch_model', 'manual_queue']
    },
    CAPABILITY_UNSUPPORTED: {
      category: 'capability_unsupported',
      retryable: false,
      manualQueueRecommended: true,
      actions: ['revise_prompt', 'manual_queue']
    },
    TEMPLATE_NOT_SUPPORTED: {
      category: 'capability_unsupported',
      retryable: false,
      manualQueueRecommended: true,
      actions: ['revise_prompt', 'manual_queue']
    },
    PATCH_REQUIRES_RUNTIME_CODE: {
      category: 'template_patch_invalid',
      retryable: true,
      manualQueueRecommended: true,
      actions: ['retry_patch', 'revise_prompt', 'manual_queue']
    },
    PATCH_FILE_NOT_ALLOWED: {
      category: 'template_patch_invalid',
      retryable: true,
      manualQueueRecommended: false,
      actions: ['retry_patch', 'switch_model', 'manual_queue']
    },
    TEMPLATE_COMPILE_FAILED: {
      category: 'template_compile_failed',
      retryable: true,
      manualQueueRecommended: true,
      actions: ['retry_patch', 'revise_prompt', 'manual_queue']
    },
    PREVIEW_BOOT_FAILED: {
      category: 'template_compile_failed',
      retryable: true,
      manualQueueRecommended: true,
      actions: ['retry_patch', 'manual_queue']
    }
  };
  return table[normalized] || {
    category: 'request_failed',
    retryable: false,
    manualQueueRecommended: false,
    actions: ['retry']
  };
}

function getRuntimeStatus() {
  const models = listPublicModels();
  const enabledModels = models.filter(model => model.enabled);
  const enabledProviders = [...new Set(enabledModels.map(model => model.provider))];
  return {
    ok: true,
    service: 'droi-ai-backend',
    aiAvailable: enabledModels.length > 0,
    enabledProviders,
    enabledModelCount: enabledModels.length,
    modelCount: models.length,
    templates: ['bullet_hell', 'roguelike_survival'],
    manualQueue: {
      localStorage: true,
      web3FormsForwarding: Boolean(process.env.WEB3FORMS_ACCESS_KEY)
    },
    generatedPreviewRoute: '/generated/'
  };
}

function detectTemplateId(decision, spec) {
  const raw = [
    decision && decision.templateId,
    decision && decision.templateLabel,
    spec && spec.gameType,
    spec && spec.background
  ].filter(Boolean).join(' ').toLowerCase();
  if (/bullet|shooter|shmup|space|plane|flying|弹幕|飞行|飞机|射击|打飞机/.test(raw)) return 'bullet_hell';
  if (/rogue|survivor|vampire|horde|auto|arena|肉鸽|割草|幸存者|生存|自动/.test(raw)) return 'roguelike_survival';
  return 'unsupported';
}

function normalizeModelRef(model = {}) {
  return {
    providerId: String(model.providerId || model.provider || '').trim(),
    modelId: String(model.modelId || model.model || '').trim(),
    label: String(model.label || model.modelLabel || '').trim()
  };
}

function validatePatchModelMatchesSelectedModel(plan, selectedModel) {
  const patchModel = normalizeModelRef(plan.modelMeta || {});
  const activeModel = normalizeModelRef(selectedModel || {});
  if (!activeModel.providerId || !activeModel.modelId) {
    const error = new Error('Template compile requires the selected model provider and model id.');
    error.code = 'MODEL_SCHEMA_INVALID';
    throw error;
  }
  if (!patchModel.providerId || !patchModel.modelId) {
    const error = new Error('TemplatePatchPlan modelMeta must include providerId and modelId.');
    error.code = 'MODEL_SCHEMA_INVALID';
    throw error;
  }
  if (patchModel.providerId !== activeModel.providerId || patchModel.modelId !== activeModel.modelId) {
    const error = new Error('TemplatePatchPlan modelMeta does not match the selected model.');
    error.code = 'MODEL_SCHEMA_INVALID';
    throw error;
  }
}

function compileTemplateProject(payload) {
  if (!payload.aiPlanDraft || typeof payload.aiPlanDraft !== 'string') {
    const error = new Error('Template compile requires an AI-generated game plan draft.');
    error.code = 'TEMPLATE_COMPILE_FAILED';
    throw error;
  }
  const templatePatchPlan = validateTemplatePatchPlan(payload.templatePatchPlan);
  validatePatchModelMatchesSelectedModel(templatePatchPlan, payload.selectedModel);

  const spec = payload.gameSpec || {};
  const decision = payload.templateDecision || {};
  const templateId = detectTemplateId(decision, spec);
  if (templateId === 'unsupported') {
    const error = new Error('No P0 template supports this request yet.');
    error.code = 'TEMPLATE_NOT_SUPPORTED';
    throw error;
  }

  const projectId = `${templateId}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  const projectDir = path.join(GENERATED_DIR, projectId);
  fs.mkdirSync(projectDir, { recursive: true });

  const generatedSpec = buildCompiledGameSpec(spec, decision, templateId, payload.selectedModel || {}, templatePatchPlan);
  const projectFiles = buildGeneratedProjectFiles(generatedSpec);
  const validationReport = {
    ok: true,
    checks: [
      { ok: true, label: 'Current model was used before compile' },
      { ok: true, label: 'TemplatePatchPlan validated as AI-generated' },
      { ok: true, label: `${templateId} P0 template selected` },
      { ok: true, label: 'HTML5 Canvas preview files emitted' },
      { ok: true, label: 'GameSpec, split spec modules, template config, and manifest emitted' },
      { ok: true, label: 'Generation trace report emitted' }
    ]
  };
  const generationReport = buildGenerationReport({
    projectId,
    generatedSpec,
    templateId,
    selectedModel: payload.selectedModel || {},
    templatePatchPlan,
    aiPlanDraft: payload.aiPlanDraft,
    validationReport
  });
  projectFiles['generation-report.json'] = JSON.stringify(generationReport, null, 2);
  const files = Object.keys(projectFiles);
  for (const [relativePath, contents] of Object.entries(projectFiles)) {
    const targetPath = path.join(projectDir, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, contents, 'utf8');
  }

  return {
    id: projectId,
    name: generatedSpec.meta.gameName,
    templateId,
    previewUrl: `/generated/${projectId}/index.html`,
    files,
    generationReport,
    validationReport
  };
}

function saveManualQueueSubmission(payload) {
  const email = String(payload.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error('A valid email is required.');
    error.code = 'WAITLIST_EMAIL_INVALID';
    error.status = 400;
    throw error;
  }
  const prompt = String(payload.prompt || '').slice(0, 12000);
  const context = payload.context && typeof payload.context === 'object' ? payload.context : {};
  const queueDir = path.join(DATA_DIR, 'manual-queue');
  fs.mkdirSync(queueDir, { recursive: true });
  const id = `manual-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  const record = {
    id,
    email,
    prompt,
    context,
    receivedAt: new Date().toISOString()
  };
  fs.writeFileSync(path.join(queueDir, `${id}.json`), JSON.stringify(record, null, 2), 'utf8');
  return { id, receivedAt: record.receivedAt };
}

async function forwardManualQueueSubmission(payload, submission) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { enabled: false };
  }

  const endpoint = process.env.WEB3FORMS_ENDPOINT || 'https://api.web3forms.com/submit';
  const body = new URLSearchParams();
  body.set('access_key', accessKey);
  body.set('email', String(payload.email || ''));
  body.set('prompt', String(payload.prompt || ''));
  body.set('context', JSON.stringify(payload.context || {}, null, 2));
  body.set('subject', 'New Droi AI Manual Queue Submission');
  body.set('submission_id', submission.id);

  try {
    const response = await fetchWithTimeout(endpoint, { method: 'POST', body }, 10000);
    return { enabled: true, ok: response.ok, status: response.status };
  } catch (error) {
    return {
      enabled: true,
      ok: false,
      status: 0,
      error: error.message || 'Web3Forms forwarding failed.'
    };
  }
}

function validateTemplatePatchPlan(plan) {
  if (!plan || typeof plan !== 'object') {
    const error = new Error('Template compile requires TemplatePatchPlan.');
    error.code = 'MODEL_SCHEMA_INVALID';
    throw error;
  }
  if (plan.aiGenerated !== true || !plan.modelMeta || typeof plan.modelMeta !== 'object') {
    const error = new Error('TemplatePatchPlan must be generated by the selected AI model.');
    error.code = 'MODEL_SCHEMA_INVALID';
    throw error;
  }
  if (plan.requiresRuntimeCodePatch === true) {
    const error = new Error('TemplatePatchPlan requires runtime code changes, which P0 compile does not allow.');
    error.code = 'PATCH_REQUIRES_RUNTIME_CODE';
    throw error;
  }
  const blockedKeys = ['files', 'filePatches', 'runtimePatch', 'codePatch', 'sourcePatch', 'diff', 'patches'];
  const blocked = blockedKeys.find(key => Object.prototype.hasOwnProperty.call(plan, key));
  if (blocked) {
    const error = new Error(`TemplatePatchPlan cannot include direct file patches: ${blocked}.`);
    error.code = 'PATCH_FILE_NOT_ALLOWED';
    throw error;
  }
  for (const key of ['gameName', 'userIntentSummary', 'settingsPatch', 'stylePatch', 'contentPatch']) {
    if (!plan[key]) {
      const error = new Error(`TemplatePatchPlan missing required field: ${key}.`);
      error.code = 'MODEL_SCHEMA_INVALID';
      throw error;
    }
  }
  return plan;
}

function deepMerge(base, patch) {
  if (!patch || typeof patch !== 'object' || Array.isArray(patch)) return base;
  const output = Array.isArray(base) ? base.slice() : { ...(base || {}) };
  for (const [key, value] of Object.entries(patch)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      output[key] = deepMerge(output[key] && typeof output[key] === 'object' ? output[key] : {}, value);
    } else {
      output[key] = value;
    }
  }
  return output;
}

function buildCompiledGameSpec(spec, decision, templateId, selectedModel, templatePatchPlan = {}) {
  const isBullet = templateId === 'bullet_hell';
  const setting = spec.gameSetting || 'Custom World';
  const typeName = isBullet ? 'Bullet Hell / Flying Shooter' : 'Roguelike Survival';
  const baseSpec = {
    meta: {
      gameName: templatePatchPlan.gameName || `${setting} ${isBullet ? 'Skybreak' : 'Survival'}`,
      gameType: typeName,
      templateId,
      generatedBy: selectedModel.label || selectedModel.modelLabel || 'Selected model',
      description: templatePatchPlan.userIntentSummary || spec.background || 'Generated from the AI summarized concept.',
      patchModel: templatePatchPlan.modelMeta || null
    },
    userSpec: spec,
    aiPatch: {
      userIntentSummary: templatePatchPlan.userIntentSummary || '',
      assetPrompts: templatePatchPlan.assetPrompts || {},
      playabilityChecklist: templatePatchPlan.playabilityChecklist || []
    },
    runtime: {
      renderer: 'html5-canvas',
      width: isBullet ? 600 : 960,
      height: isBullet ? 800 : 540,
      controls: isBullet ? ['move', 'focus', 'shoot', 'bomb'] : ['move', 'auto-attack', 'upgrade-choice']
    },
    gameplay: {
      coreLoop: spec.coreGameplay || (isBullet ? 'Dodge projectile patterns and shoot through boss phases.' : 'Move, collect XP, choose upgrades, and survive waves.'),
      goal: spec.playerGoal || (isBullet ? 'Defeat the final boss.' : 'Survive the timer and defeat the boss.'),
      challenge: spec.mainChallenge || (isBullet ? 'Enemy waves and boss bullet phases.' : 'Enemy swarms, elites, and scaling pressure.'),
      progression: spec.progressionSystem || 'Level-up choices',
      difficulty: spec.difficultyLevel || 'Normal'
    },
    content: isBullet ? buildBulletContent(spec) : buildRoguelikeContent(spec),
    artDirection: {
      style: spec.artStyle || 'Readable arcade',
      setting,
      palette: isBullet ? ['#42e8ff', '#ff4fd8', '#ffe66d', '#111827'] : ['#9af27f', '#d95d55', '#f2c14e', '#171417']
    }
  };
  baseSpec.settings = deepMerge({}, templatePatchPlan.settingsPatch || {});
  baseSpec.artDirection = deepMerge(baseSpec.artDirection, templatePatchPlan.stylePatch || {});
  baseSpec.content = deepMerge(baseSpec.content, templatePatchPlan.contentPatch || {});
  return baseSpec;
}

function buildBulletContent() {
  return {
    player: { hp: 3, speed: 230, hitbox: 4, weapon: 'focus_vulcan' },
    waves: [
      { t: 0, enemy: 'drone', count: 8, pattern: 'fan' },
      { t: 30, enemy: 'elite', count: 3, pattern: 'aimed' }
    ],
    bosses: [
      { id: 'final_boss', hp: 1600, phases: ['spiral', 'flower', 'burst'] }
    ],
    pickups: ['power', 'bomb', 'shield']
  };
}

function buildRoguelikeContent() {
  return {
    player: { hp: 120, speed: 220, weapons: ['auto_blade'] },
    waves: [
      { t: 0, enemy: 'runner', interval: 1.2 },
      { t: 90, enemy: 'elite', interval: 8 },
      { t: 240, enemy: 'boss', interval: 999 }
    ],
    upgrades: ['damage', 'cooldown', 'projectile_count', 'move_speed', 'shield'],
    pickups: ['xp', 'health', 'magnet']
  };
}

function buildManifest(gameSpec) {
  return {
    generated: true,
    templateId: gameSpec.meta.templateId,
    style: gameSpec.artDirection,
    assetPrompts: gameSpec.aiPatch ? gameSpec.aiPatch.assetPrompts : {},
    assets: {
      player: [],
      enemies: [],
      effects: [],
      ui: []
    }
  };
}

function collectEnemySpec(gameSpec) {
  const content = gameSpec.content || {};
  if (Array.isArray(content.enemies)) return content.enemies;
  if (Array.isArray(content.enemyTypes)) return content.enemyTypes;
  const fromWaves = Array.isArray(content.waves)
    ? [...new Set(content.waves.map(wave => wave && wave.enemy).filter(Boolean))]
      .map(id => ({ id, source: 'wave' }))
    : [];
  const bosses = Array.isArray(content.bosses)
    ? content.bosses.map(boss => ({ ...(boss || {}), type: 'boss' }))
    : [];
  return [...fromWaves, ...bosses];
}

function collectWeaponSpec(gameSpec) {
  const content = gameSpec.content || {};
  if (Array.isArray(content.weapons)) return content.weapons;
  const player = content.player || {};
  const weapons = [];
  if (player.weapon) weapons.push({ id: player.weapon, source: 'player' });
  if (Array.isArray(player.weapons)) {
    player.weapons.forEach(id => weapons.push({ id, source: 'player' }));
  }
  if (Array.isArray(content.upgrades)) {
    content.upgrades.forEach(id => weapons.push({ id, source: 'upgrade_pool' }));
  }
  return weapons;
}

function buildGeneratedProjectFiles(gameSpec) {
  const content = gameSpec.content || {};
  const minimalSpec = {
    meta: gameSpec.meta,
    runtime: gameSpec.runtime,
    gameplay: gameSpec.gameplay,
    artDirection: gameSpec.artDirection
  };
  const balance = content.balance || {
    difficulty: gameSpec.gameplay && gameSpec.gameplay.difficulty,
    settings: gameSpec.settings || {},
    player: content.player || {},
    bosses: Array.isArray(content.bosses) ? content.bosses.map(boss => ({
      id: boss.id,
      hp: boss.hp,
      phases: boss.phases
    })) : []
  };
  const effects = content.effects || {
    projectilePatterns: content.projectilePatterns || [],
    pickups: content.pickups || [],
    palette: gameSpec.artDirection && gameSpec.artDirection.palette
  };
  const templateConfig = {
    templateId: gameSpec.meta.templateId,
    generatedBy: gameSpec.meta.generatedBy,
    patchModel: gameSpec.meta.patchModel,
    runtime: gameSpec.runtime,
    entrySpec: 'spec/game.json',
    splitSpecs: {
      minimal: 'spec/minimal.json',
      waves: 'spec/waves.json',
      enemies: 'spec/enemies.json',
      weapons: 'spec/weapons.json',
      balance: 'spec/balance.json',
      effects: 'spec/effects.json'
    }
  };

  return {
    'index.html': buildPreviewHtml(gameSpec),
    'game.js': buildPreviewGameJs(),
    'template-config.js': `window.DROI_TEMPLATE_CONFIG=${JSON.stringify(templateConfig, null, 2)};\n`,
    'spec/game.json': JSON.stringify(gameSpec, null, 2),
    'spec/minimal.json': JSON.stringify(minimalSpec, null, 2),
    'spec/waves.json': JSON.stringify(content.waves || [], null, 2),
    'spec/enemies.json': JSON.stringify(collectEnemySpec(gameSpec), null, 2),
    'spec/weapons.json': JSON.stringify(collectWeaponSpec(gameSpec), null, 2),
    'spec/balance.json': JSON.stringify(balance, null, 2),
    'spec/effects.json': JSON.stringify(effects, null, 2),
    'assets/manifest.json': JSON.stringify(buildManifest(gameSpec), null, 2)
  };
}

function buildGenerationReport({
  projectId,
  generatedSpec,
  templateId,
  selectedModel,
  templatePatchPlan,
  aiPlanDraft,
  validationReport
}) {
  return {
    projectId,
    generatedAt: new Date().toISOString(),
    aiFirst: true,
    aiGenerated: true,
    fallbackReason: '',
    templateId,
    templateLabel: generatedSpec.meta && generatedSpec.meta.gameType,
    selectedModel: {
      providerId: selectedModel.providerId || selectedModel.provider || '',
      modelId: selectedModel.modelId || selectedModel.model || '',
      label: selectedModel.label || selectedModel.modelLabel || 'Selected model'
    },
    stages: {
      analysis: { required: true, modelRequired: true },
      gamePlan: { required: true, modelRequired: true, draftLength: String(aiPlanDraft || '').length },
      templatePatch: {
        required: true,
        modelRequired: true,
        aiGenerated: templatePatchPlan.aiGenerated === true,
        modelMeta: templatePatchPlan.modelMeta || null
      },
      compile: {
        required: true,
        modelRequired: false,
        compiler: 'p0-template-project-compiler'
      }
    },
    outputs: {
      files: [
        'index.html',
        'game.js',
        'template-config.js',
        'spec/game.json',
        'spec/minimal.json',
        'spec/waves.json',
        'spec/enemies.json',
        'spec/weapons.json',
        'spec/balance.json',
        'spec/effects.json',
        'assets/manifest.json',
        'generation-report.json'
      ],
      preview: `/generated/${projectId}/index.html`
    },
    validationReport
  };
}

function buildPreviewHtml(gameSpec) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(gameSpec.meta.gameName)}</title>
  <style>
    body{margin:0;background:#050812;color:#fff;font-family:Inter,Arial,sans-serif;display:grid;place-items:center;min-height:100vh}
    main{width:min(960px,100vw);padding:20px;box-sizing:border-box}
    canvas{width:100%;aspect-ratio:16/9;background:#071018;border:1px solid rgba(120,185,255,.25);border-radius:10px}
    h1{font-size:20px;margin:0 0 8px}
    p{color:rgba(255,255,255,.72);margin:0 0 14px}
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(gameSpec.meta.gameName)}</h1>
    <p>${escapeHtml(gameSpec.gameplay.coreLoop)}</p>
    <canvas id="game" width="960" height="540"></canvas>
  </main>
  <script>window.GAME_SPEC=${JSON.stringify(gameSpec)};</script>
  <script src="./game.js"></script>
</body>
</html>`;
}

function buildPreviewGameJs() {
  return `(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const spec = window.GAME_SPEC || {};
  const isBullet = spec.meta && spec.meta.templateId === 'bullet_hell';
  const content = spec.content || {};
  const art = spec.artDirection || {};
  const palette = Array.isArray(art.palette) && art.palette.length ? art.palette : ['#42e8ff', '#ff4fd8', '#ffe66d', '#88f3d2'];
  const playerConfig = content.player || {};
  const wavesConfig = Array.isArray(content.waves) ? content.waves : [];
  const bossConfig = Array.isArray(content.bosses) && content.bosses.length ? content.bosses[0] : {};
  const upgradesConfig = Array.isArray(content.upgrades) ? content.upgrades : [];
  let t = 0;
  let last = performance.now();
  let spawn = 0;
  let fire = 0;
  let enemyFire = 0;
  let score = 0;
  let level = 1;
  let xp = 0;
  let over = false;
  let won = false;
  const player = {
    x: canvas.width / 2,
    y: canvas.height * 0.72,
    hp: Number(playerConfig.hp) || (isBullet ? 3 : 120),
    r: Number(playerConfig.hitbox || playerConfig.r) || (isBullet ? 10 : 14),
    speed: Number(playerConfig.speed) || (isBullet ? 245 : 220),
    inv: 0
  };
  const enemies = [];
  const shots = [];
  const enemyShots = [];
  const pickups = [];
  const keys = new Set();
  addEventListener('keydown', e => {
    keys.add(e.code);
    if (over && e.code === 'Enter') location.reload();
    if (isBullet && e.code === 'KeyX') enemyShots.length = 0;
  });
  addEventListener('keyup', e => keys.delete(e.code));

  function dist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  function addEnemy(kind) {
    if (isBullet) {
      const wave = wavesConfig[Math.min(wavesConfig.length - 1, Math.max(0, Math.floor(t / 20)))] || {};
      const bossHp = Number(bossConfig.hp) || 260;
      enemies.push({ kind, x: 80 + Math.random() * (canvas.width - 160), y: -30, hp: kind === 'boss' ? bossHp : Number(wave.hp) || 24, r: kind === 'boss' ? 34 : 13, cd: 0 });
    } else {
      const side = Math.floor(Math.random() * 4);
      const x = side < 2 ? Math.random() * canvas.width : (side === 2 ? -20 : canvas.width + 20);
      const y = side >= 2 ? Math.random() * canvas.height : (side === 0 ? -20 : canvas.height + 20);
      const bossHp = Number(bossConfig.hp) || 300;
      enemies.push({ kind, x, y, hp: kind === 'boss' ? bossHp : (kind === 'elite' ? 60 : 24), r: kind === 'boss' ? 32 : 14, cd: 0 });
    }
  }

  function shootAt(from, to, hostile) {
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const speed = hostile ? (isBullet ? 165 : 110) : 420;
    const list = hostile ? enemyShots : shots;
    list.push({ x: from.x, y: from.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: hostile ? 6 : 4, life: 3, dmg: hostile ? 14 : 18 });
  }

  function update(dt) {
    if (over) return;
    t += dt;
    player.inv = Math.max(0, player.inv - dt);
    const focus = isBullet && (keys.has('ShiftLeft') || keys.has('ShiftRight'));
    const speed = (focus ? player.speed * 0.64 : player.speed) * dt;
    if (keys.has('ArrowLeft') || keys.has('KeyA')) player.x -= speed;
    if (keys.has('ArrowRight') || keys.has('KeyD')) player.x += speed;
    if (keys.has('ArrowUp') || keys.has('KeyW')) player.y -= speed;
    if (keys.has('ArrowDown') || keys.has('KeyS')) player.y += speed;
    player.x = Math.max(20, Math.min(canvas.width - 20, player.x));
    player.y = Math.max(20, Math.min(canvas.height - 20, player.y));

    spawn -= dt;
    if (spawn <= 0) {
      addEnemy(t > 45 && enemies.length < 2 ? 'boss' : (t > 20 && Math.random() < 0.25 ? 'elite' : 'runner'));
      const waveInterval = wavesConfig[0] && Number(wavesConfig[0].interval || wavesConfig[0].spawnInterval);
      spawn = isBullet ? (waveInterval || 1.0) : Math.max(0.35, waveInterval || (1.2 - t * 0.01));
    }

    fire -= dt;
    if (fire <= 0) {
      if (isBullet || enemies.length) {
        const target = isBullet ? { x: player.x, y: 0 } : enemies.reduce((best, enemy) => !best || dist(player, enemy) < dist(player, best) ? enemy : best, null);
        if (target) shootAt(player, target, false);
      }
      fire = isBullet ? 0.12 : Math.max(0.22, 0.55 - level * 0.035);
    }

    enemyFire -= dt;
    if (isBullet && enemyFire <= 0) {
      enemies.forEach(enemy => {
        const count = enemy.kind === 'boss' ? 10 : 3;
        for (let i = 0; i < count; i++) {
          const angle = enemy.kind === 'boss' ? (Math.PI * 2 * i / count + t) : Math.atan2(player.y - enemy.y, player.x - enemy.x) + (i - 1) * 0.24;
          enemyShots.push({ x: enemy.x, y: enemy.y, vx: Math.cos(angle) * 150, vy: Math.sin(angle) * 150, r: enemy.kind === 'boss' ? 6 : 5, life: 5, dmg: 1 });
        }
      });
      enemyFire = 0.75;
    }

    enemies.forEach(enemy => {
      if (isBullet) {
        enemy.y += (enemy.kind === 'boss' ? 22 : 58) * dt;
        enemy.x += Math.sin(t * 2 + enemy.y) * 30 * dt;
      } else {
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        const speed = enemy.kind === 'boss' ? 35 : (enemy.kind === 'elite' ? 64 : 82);
        enemy.x += Math.cos(angle) * speed * dt;
        enemy.y += Math.sin(angle) * speed * dt;
      }
    });

    [...shots, ...enemyShots].forEach(shot => {
      shot.x += shot.vx * dt;
      shot.y += shot.vy * dt;
      shot.life -= dt;
    });

    for (let i = shots.length - 1; i >= 0; i--) {
      const shot = shots[i];
      for (let j = enemies.length - 1; j >= 0; j--) {
        const enemy = enemies[j];
        if (dist(shot, enemy) < shot.r + enemy.r) {
          enemy.hp -= shot.dmg;
          shots.splice(i, 1);
          if (enemy.hp <= 0) {
            score += enemy.kind === 'boss' ? 500 : 40;
            if (!isBullet) pickups.push({ x: enemy.x, y: enemy.y, r: 7 });
            if (enemy.kind === 'boss') { over = true; won = true; }
            enemies.splice(j, 1);
          }
          break;
        }
      }
    }

    const hazards = isBullet ? enemyShots.concat(enemies) : enemies;
    hazards.forEach(item => {
      if (player.inv <= 0 && dist(player, item) < player.r + item.r) {
        player.hp -= isBullet ? 1 : 12;
        player.inv = 1.1;
        if (!isBullet && item.hp) item.hp -= 10;
      }
    });

    for (let i = pickups.length - 1; i >= 0; i--) {
      if (dist(player, pickups[i]) < player.r + pickups[i].r + 10) {
        xp += 1;
        score += 10;
        pickups.splice(i, 1);
        if (xp >= 4) { xp = 0; level += 1; player.hp = Math.min(140, player.hp + 16); }
      }
    }

    for (const list of [shots, enemyShots]) {
      for (let i = list.length - 1; i >= 0; i--) {
        const shot = list[i];
        if (shot.life <= 0 || shot.x < -80 || shot.x > canvas.width + 80 || shot.y < -80 || shot.y > canvas.height + 80) list.splice(i, 1);
      }
    }
    for (let i = enemies.length - 1; i >= 0; i--) {
      if (enemies[i].y > canvas.height + 80) enemies.splice(i, 1);
    }
    if (player.hp <= 0) { over = true; won = false; }
    if (!isBullet && t >= 180) { addEnemy('boss'); t = -999; }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#06111f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 48; i++) {
      const x = (i * 97 + t * 18) % canvas.width;
      const y = (i * 53 + Math.sin(t + i) * 24 + t * 12) % canvas.height;
      ctx.fillStyle = i % 3 === 0 ? palette[0] : (palette[3] || '#8b5cf6');
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.arc(x, y, 2 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    pickups.forEach(p => {
      ctx.fillStyle = palette[2] || '#f2c14e';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    shots.forEach(s => {
      ctx.fillStyle = palette[3] || '#88f3d2';
      ctx.fillRect(s.x - 2, s.y - 10, 4, 14);
    });
    enemyShots.forEach(s => {
      ctx.fillStyle = palette[1] || '#ff4fd8';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    enemies.forEach(e => {
      ctx.fillStyle = e.kind === 'boss' ? (palette[2] || '#ffe66d') : (e.kind === 'elite' ? '#ff7a90' : (palette[0] || '#42e8ff'));
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(0,0,0,.55)';
      ctx.fillRect(e.x - e.r, e.y - e.r - 10, e.r * 2, 4);
      ctx.fillStyle = palette[3] || '#88f3d2';
      ctx.fillRect(e.x - e.r, e.y - e.r - 10, e.r * 2 * Math.max(0, Math.min(1, e.hp / (e.kind === 'boss' ? 300 : 60))), 4);
    });
    ctx.fillStyle = palette[3] || '#88f3d2';
    ctx.globalAlpha = player.inv > 0 ? 0.45 : 1;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - 18);
    ctx.lineTo(player.x - 14, player.y + 16);
    ctx.lineTo(player.x + 14, player.y + 16);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,.86)';
    ctx.font = '16px Inter, Arial';
    ctx.fillText((spec.meta ? spec.meta.gameType : 'Generated Game') + ' | Score ' + score + ' | HP ' + Math.ceil(player.hp) + ' | Lv ' + level, 18, 28);
    const upgradeText = upgradesConfig.length ? ' Upgrades: ' + upgradesConfig.slice(0, 3).join(', ') : '';
    ctx.fillText((isBullet ? 'Move WASD/Arrows. X bomb clears bullets.' : 'Move WASD/Arrows. Weapons auto-fire. Collect XP.') + upgradeText, 18, 52);
    if (over) {
      ctx.fillStyle = 'rgba(0,0,0,.68)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = won ? '#88f3d2' : '#ff7a90';
      ctx.font = 'bold 34px Inter, Arial';
      ctx.textAlign = 'center';
      ctx.fillText(won ? 'Prototype Cleared' : 'Run Failed', canvas.width / 2, canvas.height / 2);
      ctx.font = '16px Inter, Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText('Press Enter to restart', canvas.width / 2, canvas.height / 2 + 34);
      ctx.textAlign = 'left';
    }
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - last) / 1000);
    last = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();`;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function serveStatic(req, res, pathname) {
  const decodedPath = decodeURIComponent(pathname);
  let rootDir = PUBLIC_DIR;
  let relativePath = decodedPath === '/' ? 'index.html' : decodedPath;

  if (decodedPath.startsWith('/generated/')) {
    rootDir = GENERATED_DIR;
    relativePath = decodedPath.slice('/generated/'.length);
  }

  const safePath = path.normalize(relativePath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(rootDir, safePath);
  const relativeToRoot = path.relative(rootDir, filePath);
  if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
    sendError(res, 403, 'FORBIDDEN', 'Forbidden.');
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    sendError(res, 404, 'NOT_FOUND', 'Not found.');
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

async function handleApi(req, res, pathname) {
  applyCorsHeaders(req, res);
  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }
  try {
    if (req.method === 'GET' && pathname === '/api/health') {
      sendJson(res, 200, getRuntimeStatus());
      return;
    }
    if (req.method === 'GET' && pathname === '/api/ready') {
      const status = getRuntimeStatus();
      if (!status.aiAvailable) {
        sendJson(res, 503, {
          ...status,
          ok: false,
          code: 'MODEL_NOT_CONFIGURED',
          message: 'No model provider API key is configured.'
        });
        return;
      }
      sendJson(res, 200, status);
      return;
    }
    if (req.method === 'GET' && pathname === '/api/session') {
      sendJson(res, 200, {
        ok: true,
        loggedIn: false,
        email: '',
        isAdmin: false,
        googleConfigured: false,
        devAllowlist: false
      });
      return;
    }
    if (req.method === 'POST' && pathname === '/api/logout') {
      sendJson(res, 200, { ok: true });
      return;
    }
    if (req.method === 'GET' && pathname === '/api/models') {
      sendJson(res, 200, { ok: true, models: listPublicModels() });
      return;
    }
    if (req.method === 'POST' && pathname === '/api/chat') {
      const body = await readJsonBody(req);
      const result = await callModel({
        provider: body.provider,
        model: body.model || body.modelId,
        messages: body.messages || []
      });
      sendJson(res, 200, { ok: true, ...result, provider: body.provider, model: body.model || body.modelId });
      return;
    }
    if (req.method === 'POST' && pathname.startsWith('/api/ai/')) {
      const stage = pathname.replace('/api/ai/', '');
      const body = await readJsonBody(req);
      const result = await callModel({
        provider: body.provider,
        model: body.model || body.modelId,
        messages: body.messages || buildStageMessages(stage, body)
      });
      sendJson(res, 200, {
        ok: true,
        stage,
        ...result,
        provider: body.provider,
        model: body.model || body.modelId
      });
      return;
    }
    if (req.method === 'POST' && pathname === '/api/template-project/compile') {
      const body = await readJsonBody(req);
      const project = compileTemplateProject(body);
      sendJson(res, 200, { ok: true, project });
      return;
    }
    if (req.method === 'POST' && pathname === '/api/waitlist') {
      const body = await readJsonBody(req);
      const submission = saveManualQueueSubmission(body);
      const forwarding = await forwardManualQueueSubmission(body, submission);
      sendJson(res, 200, { ok: true, submission: { ...submission, forwarding } });
      return;
    }
    sendError(res, 404, 'NOT_FOUND', 'API endpoint not found.');
  } catch (error) {
    const code = error.code || 'SERVER_ERROR';
    const status = error.status || (code === 'MODEL_NOT_CONFIGURED' ? 400 : code === 'TEMPLATE_NOT_SUPPORTED' ? 422 : 500);
    const meta = getErrorResponseMeta(code);
    sendError(res, status, code, error.message || 'Request failed.', {
      ...meta
    });
  }
}

function buildStageMessages(stage, body) {
  const context = body.context || body;
  const stagePrompts = {
    'analyze-game-request': 'Analyze the user request into structured GameSpec JSON, including templateDecision, capability, missingFields, and confidence.',
    'generate-game-plan': 'Generate a complete P0 HTML5 Canvas game plan from the structured GameSpec and selected template. Return strict JSON.',
    'generate-template-patch': 'Generate a safe TemplatePatchPlan JSON for the selected template. Do not include runtime source code patches.'
  };
  return [
    {
      role: 'system',
      content: stagePrompts[stage] || 'Process this AI game generation stage. Return strict JSON.'
    },
    {
      role: 'user',
      content: JSON.stringify(context, null, 2)
    }
  ];
}

function createServer() {
  loadEnvFile();
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) {
      handleApi(req, res, url.pathname);
      return;
    }
    serveStatic(req, res, url.pathname);
  });
}

if (require.main === module) {
  const port = getPort();
  createServer().listen(port, () => {
    console.log(`Droi AI server running at http://localhost:${port}`);
  });
}

module.exports = {
  createServer,
  compileTemplateProject,
  saveManualQueueSubmission,
  forwardManualQueueSubmission,
  buildCompiledGameSpec,
  detectTemplateId,
  getErrorResponseMeta,
  getRuntimeStatus,
  getFrontendOrigins,
  isAllowedCorsOrigin,
  listPublicModels
};

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SCRIPT_PATH = path.join(ROOT, 'script.js');
const SERVER_PATH = path.join(ROOT, 'backend', 'server.js');
const PORT = 4299;

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assertSourceInvariants() {
    const script = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const server = fs.readFileSync(SERVER_PATH, 'utf8');

    assert(
        script.includes("const AUTO_GENERATION_TEMPLATE_IDS = new Set(['roguelike_survival', 'bullet_hell']);"),
        'Auto-generation whitelist must only include roguelike_survival and bullet_hell.'
    );
    assert(
        script.includes('AUTO_GENERATION_TEMPLATE_IDS.has(best.id)'),
        'matchTemplate must check the auto-generation whitelist before enabling auto generation.'
    );
    assert(
        script.includes("return ['gemini', 'qwen'].find(providerId => hasLiveAIProvider(providerId)) || '';"),
        'Bullet Hell product-plan provider selection must prefer Gemini and then Qwen.'
    );
    assert(
        script.includes('getPublicModelIdForProvider(planProviderId) || getProviderModelId(planProviderId)'),
        'Bullet Hell product-plan calls must use public /api/models model ids before local defaults.'
    );
    assert(
        script.includes("modelDropdownList.innerHTML = '<div class=\"model-empty\">Loading configured models...</div>';"),
        'Frontend model dropdown must not show hard-coded providers before /api/models loads.'
    );
    assert(
        server.includes('function isProviderPubliclyAvailable(providerId, provider = {})'),
        'Backend must filter public models through provider availability.'
    );
    assert(
        server.includes('models: publicModelsFromConfig(config)') || server.includes('const models = publicModelsFromConfig(config);'),
        '/api/models must be generated from publicModelsFromConfig.'
    );
    assert(
        script.includes('projectilePrimary: productPlan.artDirection.bulletColors[0]') &&
            script.includes('enemyPrimary: productPlan.artDirection.enemyPalette[0]'),
        'Bullet Hell art direction must map bullet colors and enemy palettes into generated UI/theme tokens.'
    );
    assert(
        script.includes('renderColor: isBulletHell ? (bulletPlan.artDirection.enemyPalette[0]') &&
            script.includes('render: { color: isBulletHell ? (content.enemies[enemyType].renderColor'),
        'Bullet Hell enemy palette must reach generated enemy render colors.'
    );
    assert(
        script.includes('powerPickupChance') &&
            script.includes('bombPickupChance') &&
            script.includes('shieldPickupChance') &&
            script.includes('lifePickupChance'),
        'Bullet Hell progression must map power, bomb, shield, and life rewards into generated balance drops.'
    );
    assert(
        script.includes("quickTitle: '快速灵感'") &&
            script.includes("hint: '今天你的心情更接近哪种？'") &&
            script.includes("planTitle: '飞行射击 / Bullet Hell 产品方案'") &&
            script.includes("webPreview: '网页预览'"),
        'Chinese UI copy must be readable for chat, profile, Bullet Hell plan, and generated preview surfaces.'
    );
    assert(
        script.includes('const PROFILE_SELECTION_LIMIT = 2;') &&
            script.includes('selected.length >= PROFILE_SELECTION_LIMIT') &&
            script.includes('selected.size}/${PROFILE_SELECTION_LIMIT}'),
        'Mood, scene, state, and visual vibe selections must be limited to 2 items per dimension.'
    );
    assert(
        script.includes('available.slice(0, Math.min(2, available.length))'),
        'GameSpec quick option batches must show at most 2 options each time.'
    );
    assert(
        script.includes('function getOptionIcon(item, step)') &&
            script.includes('quick-tag-icon') &&
            script.includes('profile-mood-icon'),
        'GameSpec options and mood profile chips must keep icon rendering.'
    );
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForModelsEndpoint(baseUrl, child) {
    let lastError = null;
    for (let i = 0; i < 30; i += 1) {
        if (child.exitCode !== null) {
            throw new Error(`Server exited before /api/models responded. Exit code: ${child.exitCode}`);
        }
        try {
            const response = await fetch(`${baseUrl}/api/models`);
            if (response.ok) return response.json();
            lastError = new Error(`/api/models returned HTTP ${response.status}`);
        } catch (error) {
            lastError = error;
        }
        await wait(200);
    }
    throw lastError || new Error('/api/models did not respond.');
}

async function assertRuntimeModels() {
    const env = {
        ...process.env,
        PORT: String(PORT),
        PUBLIC_BASE_URL: `http://127.0.0.1:${PORT}`,
        QWEN_API_KEY: process.env.QWEN_API_KEY || 'flow-smoke-qwen-key',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'flow-smoke-gemini-key'
    };
    const child = spawn(process.execPath, [SERVER_PATH], {
        cwd: ROOT,
        env,
        stdio: ['ignore', 'pipe', 'pipe']
    });

    let stderr = '';
    child.stderr.on('data', chunk => {
        stderr += chunk.toString();
    });

    try {
        const data = await waitForModelsEndpoint(`http://127.0.0.1:${PORT}`, child);
        const providers = [...new Set((data.models || []).map(model => model.provider))];
        const unexpected = providers.filter(provider => !['gemini', 'qwen'].includes(provider));
        assert(!unexpected.length, `Only Gemini and Qwen should be public. Unexpected providers: ${unexpected.join(', ')}`);
        assert(providers.includes('qwen'), 'Qwen should be public when QWEN_API_KEY is configured.');
        assert(providers.includes('gemini'), 'Gemini should be public when Gemini is configured.');
        assert(data.defaultModel, '/api/models should return a defaultModel from the filtered model list.');
    } finally {
        child.kill();
        if (stderr.trim()) {
            process.stderr.write(stderr);
        }
    }
}

(async () => {
    assertSourceInvariants();
    await assertRuntimeModels();
    console.log('flow-smoke-test passed');
})().catch(error => {
    console.error(error.message);
    process.exit(1);
});

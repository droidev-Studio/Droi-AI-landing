const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SERVER_PORT = 4311;
const DEBUG_PORT = 4312;
const BASE_URL = `http://127.0.0.1:${SERVER_PORT}`;
const CHROME_PATHS = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
];

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function findBrowser() {
    const found = CHROME_PATHS.find(item => fs.existsSync(item));
    if (!found) throw new Error('Chrome or Edge was not found for browser e2e smoke test.');
    return found;
}

function httpJson(url) {
    return new Promise((resolve, reject) => {
        http.get(url, response => {
            let body = '';
            response.setEncoding('utf8');
            response.on('data', chunk => { body += chunk; });
            response.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

async function waitForHttp(url, timeoutMs = 10000) {
    const started = Date.now();
    let lastError = null;
    while (Date.now() - started < timeoutMs) {
        try {
            return await httpJson(url);
        } catch (error) {
            lastError = error;
            await wait(200);
        }
    }
    throw lastError || new Error(`Timed out waiting for ${url}`);
}

function fakeAIResponse() {
    return {
        modules: {
            gameType: { status: 'confirmed', value: 'Bullet Hell / Flying Shooter', confidence: 0.98 },
            artStyle: { status: 'confirmed', value: 'Cyberpunk', confidence: 0.9 },
            gameSetting: { status: 'confirmed', value: 'Neon orbital city', confidence: 0.9 },
            coreGameplay: { status: 'confirmed', value: 'Move, dodge, shoot, collect power, and use bomb screen-clear.', confidence: 0.92 },
            playerGoal: { status: 'confirmed', value: 'Defeat the final Boss.', confidence: 0.93 },
            mainChallenge: { status: 'confirmed', value: 'Boss phases and projectile patterns.', confidence: 0.9 },
            progressionSystem: { status: 'confirmed', value: 'Weapon upgrades, power drops, bomb energy, shield, and life rewards.', confidence: 0.9 },
            difficultyLevel: { status: 'confirmed', value: 'Hard', confidence: 0.86 }
        },
        background: '赛博霓虹太空背景，击败最终 Boss，多阶段弹幕。',
        meta: { description: 'A neon flying shooter prototype with readable projectile patterns.' },
        gameName: 'Neon Skybreaker',
        artDirection: {
            summary: 'Cyber neon arcade',
            bulletColors: ['#74E5FF', '#F093FB', '#F8D878'],
            enemyPalette: ['#8A78FF', '#42A5FF', '#F093FB'],
            backgroundVisual: 'Layered neon orbital city',
            uiToken: '#74E5FF'
        },
        setting: 'Neon orbital city',
        story: 'A lone pilot breaks a hostile signal chain above the city.',
        coreGameplay: 'Move, dodge, shoot, collect power, and use bombs to clear unsafe screens.',
        winCondition: 'Defeat the final Boss.',
        bossConfig: { name: 'Prism Core', hp: 2200, phases: ['Spiral lane pressure', 'Flower spread', 'Burst wall'] },
        waves: [
            { id: 'wave-1', name: 'Approach Pattern', interval: 0.82, enemyTypes: ['Pattern Drone'] },
            { id: 'wave-2', name: 'Crossfire Pattern', interval: 0.68, enemyTypes: ['Pattern Drone', 'Fan Weaver'] },
            { id: 'boss', name: 'Final Boss', interval: 0, enemyTypes: ['Prism Core'] }
        ],
        enemyTypes: ['Pattern Drone', 'Fan Weaver', 'Ring Lotus'],
        bossPhases: ['Spiral lane pressure', 'Flower spread', 'Burst wall'],
        progression: 'Weapon upgrades, power drops, bomb energy, shield, and life rewards.',
        difficultyTuning: { level: 'Hard', enemyHpMultiplier: 1.25, bulletSpeedMultiplier: 1.18, waveInterval: 0.82, bossHp: 2200, lives: 3, shield: 1 },
        readmeSummary: 'Playable bullet-hell P0 with waves, power growth, bombs, and final Boss.'
    };
}

class CdpClient {
    constructor(wsUrl) {
        this.ws = new WebSocket(wsUrl);
        this.nextId = 1;
        this.pending = new Map();
        this.handlers = new Map();
    }

    async open() {
        await new Promise((resolve, reject) => {
            this.ws.addEventListener('open', resolve, { once: true });
            this.ws.addEventListener('error', reject, { once: true });
        });
        this.ws.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (message.id && this.pending.has(message.id)) {
                const { resolve, reject } = this.pending.get(message.id);
                this.pending.delete(message.id);
                if (message.error) reject(new Error(message.error.message || 'CDP command failed'));
                else resolve(message.result || {});
                return;
            }
            const handler = this.handlers.get(message.method);
            if (handler) handler(message.params || {});
        });
    }

    on(method, handler) {
        this.handlers.set(method, handler);
    }

    send(method, params = {}) {
        const id = this.nextId;
        this.nextId += 1;
        this.ws.send(JSON.stringify({ id, method, params }));
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
        });
    }

    async close() {
        this.ws.close();
    }
}

async function evaluate(cdp, expression) {
    const result = await cdp.send('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true
    });
    if (result.exceptionDetails) {
        throw new Error(result.exceptionDetails.text || 'Browser evaluation failed.');
    }
    return result.result ? result.result.value : undefined;
}

async function waitFor(cdp, expression, timeoutMs = 8000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
        const ok = await evaluate(cdp, `Boolean(${expression})`);
        if (ok) return;
        await wait(150);
    }
    throw new Error(`Timed out waiting for browser condition: ${expression}`);
}

async function navigate(cdp, url) {
    await cdp.send('Page.navigate', { url });
    await waitFor(cdp, 'document.readyState !== "loading" && document.querySelector("#inspireEntryBtn")', 10000);
    await wait(500);
}

async function click(cdp, selector) {
    await evaluate(cdp, `document.querySelector(${JSON.stringify(selector)}).click()`);
}

async function runBrowserChecks(cdp) {
    await navigate(cdp, `${BASE_URL}/?browser-e2e=profile`);
    await waitFor(cdp, 'document.querySelector("#activeModelName") && !document.querySelector("#activeModelName").textContent.includes("Loading")', 10000);
    await click(cdp, '#inspireEntryBtn');
    await waitFor(cdp, 'document.querySelector("[data-inspire-mode=\\"profile\\"]")');
    await click(cdp, '[data-inspire-mode="profile"]');
    await waitFor(cdp, 'document.querySelectorAll("[data-profile-option]").length >= 10');
    await evaluate(cdp, `
        const chips = [...document.querySelectorAll('[data-profile-option]')];
        chips[0].click();
        chips[1].click();
        chips[2].click();
    `);
    try {
        await waitFor(cdp, 'getComputedStyle(document.querySelector("#chatProfileSidebar")).display !== "none"', 5000);
    } catch (error) {
        const debug = await evaluate(cdp, `(() => {
            const panel = document.querySelector('#chatProfileSidebar');
            return {
                innerWidth,
                panelExists: Boolean(panel),
                inlineDisplay: panel ? panel.style.display : null,
                computedDisplay: panel ? getComputedStyle(panel).display : null,
                inspireClasses: document.querySelector('#inspireView')?.className || '',
                panelHtmlLength: panel ? panel.innerHTML.length : 0
            };
        })()`);
        throw new Error(`${error.message}. Debug: ${JSON.stringify(debug)}`);
    }
    const profileState = await evaluate(cdp, `(() => ({
        selectedCount: document.querySelectorAll('[data-profile-option].selected').length,
        countText: document.querySelector('[data-profile-selection-count]')?.textContent || '',
        disabledCount: document.querySelectorAll('[data-profile-option].limit-disabled').length,
        iconCount: document.querySelectorAll('[data-profile-option] .profile-mood-icon').length,
        sidebarVisible: getComputedStyle(document.querySelector('#chatProfileSidebar')).display !== 'none'
    }))()`);
    assert(profileState.selectedCount === 2, 'Mood profile step must enforce max 2 selected chips.');
    assert(profileState.countText === '2/2', 'Mood profile step must show 2/2 selected count.');
    assert(profileState.disabledCount > 0, 'Mood profile step must visually disable extra chips at the limit.');
    assert(profileState.iconCount >= 10, 'Mood profile chips must render icons.');
    assert(profileState.sidebarVisible, 'Profile sidebar must be visible during mood recommendation flow.');

    await navigate(cdp, `${BASE_URL}/?browser-e2e=quick`);
    await waitFor(cdp, 'document.querySelector("#activeModelName") && !document.querySelector("#activeModelName").textContent.includes("Loading")', 10000);
    await click(cdp, '#inspireEntryBtn');
    await waitFor(cdp, 'document.querySelector("[data-inspire-mode=\\"quick\\"]")');
    await click(cdp, '[data-inspire-mode="quick"]');
    await waitFor(cdp, 'document.querySelectorAll("#chatOptionsList .quick-tag").length > 0');
    const quickState = await evaluate(cdp, `(() => {
        const options = [...document.querySelectorAll('#chatOptionsList .quick-tag')];
        return {
            count: options.length,
            iconCount: options.filter(option => option.querySelector('.quick-tag-icon')).length
        };
    })()`);
    assert(quickState.count > 0 && quickState.count <= 2, 'Quick GameSpec options must show at most 2 choices.');
    assert(quickState.iconCount === quickState.count, 'Every Quick GameSpec option must include an icon.');

    await navigate(cdp, `${BASE_URL}/?browser-e2e=bullet`);
    await waitFor(cdp, 'document.querySelector("#activeModelName") && !document.querySelector("#activeModelName").textContent.includes("Loading")', 10000);
    await evaluate(cdp, `
        const input = document.querySelector('#mainInput');
        input.value = '做一个赛博霓虹飞行射击游戏，太空背景，击败最终Boss，多阶段Boss，武器升级，困难';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        document.querySelector('#waitlistForm').requestSubmit();
    `);
    try {
        await waitFor(cdp, 'document.body.textContent.includes("飞行射击 / Bullet Hell 产品方案")', 16000);
    } catch (error) {
        const debug = await evaluate(cdp, `(() => ({
            text: document.body.textContent.slice(-3000),
            model: document.querySelector('#activeModelName')?.textContent || '',
            chatVisible: getComputedStyle(document.querySelector('#inspireView')).display,
            optionText: document.querySelector('#chatOptionsList')?.textContent || '',
            emailVisible: getComputedStyle(document.querySelector('#emailModal')).display
        }))()`);
        throw new Error(`${error.message}. Debug: ${JSON.stringify(debug)}`);
    }
    const bulletState = await evaluate(cdp, `(() => ({
        hasPlan: document.body.textContent.includes('飞行射击 / Bullet Hell 产品方案'),
        hasConfirm: [...document.querySelectorAll('button')].some(button => button.textContent.includes('确认并生成')),
        hasSidebar: getComputedStyle(document.querySelector('#chatProfileSidebar')).display !== 'none',
        languageZh: document.body.textContent.includes('确认并生成') || document.body.textContent.includes('模板已锁定')
    }))()`);
    assert(bulletState.hasPlan, 'Chinese flying-shooter prompt must show the Bullet Hell product plan card.');
    assert(bulletState.hasConfirm, 'Bullet Hell product plan must require confirmation before generation.');
    assert(bulletState.hasSidebar, 'GameSpec sidebar must remain visible for Bullet Hell analysis.');
    assert(bulletState.languageZh, 'Chinese prompt must keep Chinese UI copy in the Bullet Hell flow.');
}

async function main() {
    const server = spawn(process.execPath, ['backend/server.js'], {
        cwd: ROOT,
        env: {
            ...process.env,
            PORT: String(SERVER_PORT),
            PUBLIC_BASE_URL: BASE_URL,
            QWEN_API_KEY: process.env.QWEN_API_KEY || 'browser-e2e-qwen-key',
            GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'browser-e2e-gemini-key'
        },
        stdio: ['ignore', 'pipe', 'pipe']
    });
    const browserProfileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'droi-browser-e2e-'));
    const browser = spawn(findBrowser(), [
        '--headless=new',
        '--disable-gpu',
        '--window-size=1440,900',
        '--no-first-run',
        '--no-default-browser-check',
        `--remote-debugging-port=${DEBUG_PORT}`,
        `--user-data-dir=${browserProfileDir}`,
        'about:blank'
    ], { stdio: ['ignore', 'pipe', 'pipe'] });

    let cdp;
    try {
        await waitForHttp(`${BASE_URL}/api/models`, 10000);
        const targets = await waitForHttp(`http://127.0.0.1:${DEBUG_PORT}/json/list`, 10000);
        const page = targets.find(target => target.type === 'page');
        assert(page && page.webSocketDebuggerUrl, 'No Chrome page target found.');

        cdp = new CdpClient(page.webSocketDebuggerUrl);
        await cdp.open();
        await cdp.send('Page.enable');
        await cdp.send('Runtime.enable');
        await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
            source: `window.DROI_API_BASE = ${JSON.stringify(BASE_URL)};`
        });
        await cdp.send('Emulation.setDeviceMetricsOverride', {
            width: 1440,
            height: 900,
            deviceScaleFactor: 1,
            mobile: false
        });
        await cdp.send('Fetch.enable', {
            patterns: [{ urlPattern: '*api/chat*', requestStage: 'Request' }]
        });
        cdp.on('Fetch.requestPaused', params => {
            const body = Buffer.from(JSON.stringify({
                content: JSON.stringify(fakeAIResponse()),
                usage: { inputTokens: 100, outputTokens: 260 }
            })).toString('base64');
            cdp.send('Fetch.fulfillRequest', {
                requestId: params.requestId,
                responseCode: 200,
                responseHeaders: [{ name: 'Content-Type', value: 'application/json' }],
                body
            }).catch(() => {});
        });

        await runBrowserChecks(cdp);
        console.log('browser-e2e-smoke passed');
    } finally {
        if (cdp) await cdp.close().catch(() => {});
        browser.kill();
        server.kill();
        await wait(600);
        try {
            fs.rmSync(browserProfileDir, { recursive: true, force: true });
        } catch (error) {
            // Chrome can keep file handles briefly on Windows; the OS temp folder can clean this later.
        }
    }
}

main().catch(error => {
    console.error(error.message);
    process.exit(1);
});

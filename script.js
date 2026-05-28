document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('waitlistForm');
    const mainInput = document.getElementById('mainInput');
    const submitBtn = document.getElementById('mainSubmitBtn');
    const backToPromptBtn = document.getElementById('backToPromptBtn');

    const progressContainer = document.getElementById('progressContainer');
    const generationSteps = document.getElementById('generationSteps');
    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');
    const progressBarBg = document.getElementById('progressBarBg');
    const progressMessage = document.getElementById('progressMessage');
    const statsContainer = document.getElementById('statsContainer');

    // Inspire Chat View Elements
    const inspireEntryBtn = document.getElementById('inspireEntryBtn');
    const inspireView = document.getElementById('inspireView');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatHistory = document.getElementById('chatHistory');
    const chatOptionsList = document.getElementById('chatOptionsList');
    const chatMoreBtn = document.getElementById('chatMoreBtn');
    const mainHero = document.querySelector('.hero');
    const inspireSection = document.querySelector('.inspire-section');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminAuthModal = document.getElementById('adminAuthModal');
    const adminAuthMessage = document.getElementById('adminAuthMessage');
    const retryAdminAuthBtn = document.getElementById('retryAdminAuthBtn');
    const closeAdminAuthBtn = document.getElementById('closeAdminAuthBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const providerList = document.getElementById('providerList');
    const providerEnabled = document.getElementById('providerEnabled');
    const providerApiKey = document.getElementById('providerApiKey');
    const providerBaseUrl = document.getElementById('providerBaseUrl');
    const providerModel = document.getElementById('providerModel');
    const providerReasoning = document.getElementById('providerReasoning');
    const customModelField = document.getElementById('customModelField');
    const customModelName = document.getElementById('customModelName');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    const testConnectionBtn = document.getElementById('testConnectionBtn');
    const clearProviderBtn = document.getElementById('clearProviderBtn');
    const settingsStatus = document.getElementById('settingsStatus');
    const usageTotalTokens = document.getElementById('usageTotalTokens');
    const usageEstimatedCost = document.getElementById('usageEstimatedCost');
    const usageByModelList = document.getElementById('usageByModelList');
    const modelSelector = document.getElementById('modelSelector');
    const modelDropdown = document.getElementById('modelDropdown');
    const modelDropdownList = document.getElementById('modelDropdownList');
    const modelConfigLink = document.getElementById('modelConfigLink');
    const activeModelIcon = document.getElementById('activeModelIcon');
    const activeModelName = document.getElementById('activeModelName');
    const modelSwitchNotice = document.getElementById('modelSwitchNotice');

    // === WIZARD DATA ===
    const GAME_TYPES = [
        { label: 'RPG', value: 'RPG', mechanic: 'deep character progression and branching story choices' },
        { label: 'Puzzle', value: 'Puzzle', mechanic: 'clever logic puzzles and satisfying aha moments' },
        { label: 'Action', value: 'Action Platformer', mechanic: 'fast-paced combat and fluid movement mechanics' },
        { label: 'Roguelike', value: 'Roguelike', mechanic: 'procedurally generated levels and permadeath mechanics' },
        { label: 'Bullet Hell / Flying Shooter', value: 'Bullet Hell / Flying Shooter', mechanic: 'dense projectile dodging, flying shooting, and boss phase patterns' },
        { label: 'Simulation', value: 'Life Simulation', mechanic: 'relaxing life management and cozy progression loops' },
        { label: 'Horror', value: 'Horror Survival', mechanic: 'tension-building atmosphere and scarce resource management' },
        { label: 'Rhythm', value: 'Rhythm Battle', mechanic: 'music-synced gameplay and beat-perfect combos' },
        { label: 'Strategy', value: 'Strategy', mechanic: 'resource management and tactical decision-making' },
        { label: 'Survival', value: 'Open-World Survival', mechanic: 'crafting, exploration and staying alive against the odds' },
    ];

    const ART_STYLES = [
        { label: 'Pixel Art', value: 'pixel art' },
        { label: 'Dark Gothic', value: 'dark gothic' },
        { label: 'Anime / Cartoon', value: 'anime cartoon' },
        { label: 'Minimalist', value: 'minimalist' },
        { label: 'Cyberpunk', value: 'cyberpunk neon' },
        { label: 'Fantasy Illustration', value: 'fantasy illustration' },
        { label: 'Retro / Lo-Fi', value: 'retro lo-fi' },
        { label: 'Realistic', value: 'realistic 3D' },
    ];

    const SETTINGS = [
        { label: 'Fantasy Medieval', value: 'a fantasy medieval world', desc: 'Journey through kingdoms of magic, knights, and legendary dragons.' },
        { label: 'Cyberpunk City', value: 'a cyberpunk megalopolis', desc: 'Navigate neon-lit streets controlled by corporations and high-tech rebels.' },
        { label: 'Outer Space', value: 'the depths of outer space', desc: 'Explore distant galaxies, alien planets, and the silent mysteries of the void.' },
        { label: 'Post-Apocalyptic', value: 'a post-apocalyptic wasteland', desc: 'Survive in a world reclaimed by nature after the fall of civilization.' },
        { label: 'Underwater World', value: 'a mysterious underwater kingdom', desc: 'Discover bioluminescent cities and deep-sea creatures in the ocean depths.' },
        { label: 'Ancient East', value: 'an ancient eastern empire', desc: 'Experience the beauty and mythology of floating temples and cherry blossoms.' },
        { label: 'Arctic / Ice World', value: 'a frozen arctic wilderness', desc: 'Endure the extreme cold of a world locked in a perpetual blizzard.' },
        { label: 'Haunted Realm', value: 'a haunted cursed realm', desc: 'Uncover dark secrets in a dimension where shadows come to life.' },
    ];

    const CORE_GAMEPLAY_OPTIONS = [
        { label: 'Auto-attack survival', value: 'Move to survive while weapons attack automatically.', desc: 'Best for Vampire Survivors-style games.' },
        { label: 'Manual action combat', value: 'Move, aim, dodge, and attack manually.', desc: 'Best for action and boss-fight games.' },
        { label: 'Tower placement', value: 'Place and upgrade defenses along enemy paths.', desc: 'Best for tower defense games.' },
        { label: 'Build and survive', value: 'Gather resources, build a base, and survive pressure.', desc: 'Best for survival simulations.' },
        { label: 'Puzzle exploration', value: 'Explore spaces and solve chained puzzles.', desc: 'Best for mystery or puzzle games.' }
    ];

    const PLAYER_GOAL_OPTIONS = [
        { label: 'Survive a timer', value: 'Survive for a fixed duration and reach extraction.', desc: 'Clear win condition for wave survival.' },
        { label: 'Defeat final boss', value: 'Defeat a final boss encounter.', desc: 'Clear climax for action or roguelike runs.' },
        { label: 'Clear all waves', value: 'Beat every enemy wave without losing the base.', desc: 'Clear goal for defense games.' },
        { label: 'Reach destination', value: 'Reach a final location or escape point.', desc: 'Clear goal for adventure and platform games.' },
        { label: 'Endless high score', value: 'Play endlessly and chase the highest score.', desc: 'Best for arcade replayability.' }
    ];

    const MAIN_CHALLENGE_OPTIONS = [
        { label: 'Enemy swarm pressure', value: 'Enemy numbers increase over time.', desc: 'Best for survival and roguelike pressure.' },
        { label: 'Elite enemies', value: 'Special enemies force movement and tactical choices.', desc: 'Adds readable tactical spikes.' },
        { label: 'Boss phases', value: 'Bosses change attacks across phases.', desc: 'Best for memorable peaks.' },
        { label: 'Environmental hazards', value: 'Danger zones, traps, or terrain hazards shape decisions.', desc: 'Adds spatial challenge.' },
        { label: 'Resource limits', value: 'Limited ammo, energy, gold, or supplies create tradeoffs.', desc: 'Best for strategy and survival.' }
    ];

    const PROGRESSION_OPTIONS = [
        { label: 'Level-up choices', value: 'Earn XP and choose upgrades when leveling.', desc: 'Reliable progression for roguelike games.' },
        { label: 'Skill tree', value: 'Earn points and unlock abilities over time.', desc: 'Good for long-term builds.' },
        { label: 'Equipment drops', value: 'Enemies drop gear that changes stats and playstyle.', desc: 'Good for RPG-like loops.' },
        { label: 'Permanent unlocks', value: 'Runs unlock lasting characters, weapons, or perks.', desc: 'Good for replayability.' },
        { label: 'Crafting upgrades', value: 'Collect materials and craft stronger tools or weapons.', desc: 'Good for survival and building games.' }
    ];

    const DIFFICULTY_OPTIONS = [
        { label: 'Easy', value: 'easy', desc: 'Relaxed pacing for new players.' },
        { label: 'Normal', value: 'normal', desc: 'Balanced default difficulty.' },
        { label: 'Hard', value: 'hard', desc: 'More pressure and tighter mistakes.' },
        { label: 'Nightmare', value: 'nightmare', desc: 'High pressure for expert players.' }
    ];

    const MODULE_STEPS = [
        null,
        { key: 'type', specKey: 'gameType', title: 'Game Type', pool: GAME_TYPES, prompt: 'What kind of game should this be?' },
        { key: 'style', specKey: 'artStyle', title: 'Art Style', pool: ART_STYLES, prompt: 'What art style should we use?' },
        { key: 'setting', specKey: 'gameSetting', title: 'Game Setting', pool: SETTINGS, prompt: 'What world or background should the game use?' },
        { key: 'coreGameplay', specKey: 'coreGameplay', title: 'Core Gameplay', pool: CORE_GAMEPLAY_OPTIONS, prompt: 'What should the player mainly do moment to moment?' },
        { key: 'playerGoal', specKey: 'playerGoal', title: 'Player Goal', pool: PLAYER_GOAL_OPTIONS, prompt: 'How does the player win or clear the game?' },
        { key: 'mainChallenge', specKey: 'mainChallenge', title: 'Main Challenge', pool: MAIN_CHALLENGE_OPTIONS, prompt: 'What should create the main pressure or challenge?' },
        { key: 'progressionSystem', specKey: 'progressionSystem', title: 'Progression System', pool: PROGRESSION_OPTIONS, prompt: 'How should the player grow stronger?' },
        { key: 'difficultyLevel', specKey: 'difficultyLevel', title: 'Difficulty Level', pool: DIFFICULTY_OPTIONS, prompt: 'What difficulty level should we tune for?' }
    ];

    const CHAT_POOLS = MODULE_STEPS.map(step => step ? step.pool : null);
    const BOT_MESSAGES = [
        null,
        'Awesome! What vibes are we channeling today? <span class="highlight-text">Game Type</span>',
        'Great choice! What art style should we use? <span class="highlight-text">Art Style</span>',
        'Perfect! What world or background should the game use? <span class="highlight-text">Game Setting</span>',
        'Now define the moment-to-moment action. <span class="highlight-text">Core Gameplay</span>',
        'How does the player win or clear the game? <span class="highlight-text">Player Goal</span>',
        'What creates the main pressure or challenge? <span class="highlight-text">Main Challenge</span>',
        'How should the player grow stronger? <span class="highlight-text">Progression System</span>',
        'What difficulty level should we tune for? <span class="highlight-text">Difficulty Level</span>'
    ];

    let TEMPLATE_CATALOG = [
        {
            id: 'roguelike_survival',
            label: 'Roguelike Survival',
            type: 'roguelike',
            keywords: [
                'roguelike', 'roguelite', 'roguelike survival', 'survivors-like', 'vampire survivors',
                'bullet heaven', 'reverse bullet hell', 'arena survival', 'horde survival', 'swarm survival',
                'survival', 'survive', 'wave', 'horde', 'auto attack', 'auto weapon', 'level-up', 'level up',
                'upgrade choice', 'three choices', 'xp', 'experience pickup', '肉鸽', '肉鸽生存', '类吸血鬼幸存者',
                '吸血鬼幸存者', '幸存者', '生存', '割草', '波次', '刷怪', '敌潮', '自动攻击', '自动武器',
                '升级', '升级三选一', '经验', '存活', '生存计时'
            ],
            sourceArchitecture: 'Groglike-SOP',
            specMode: 'module-spec',
            contentModules: ['minimal', 'weapons', 'enemies', 'waves', 'balance', 'effects', 'manifest'],
            gameplayPillars: ['auto-weapons', 'xp-pickups', 'level-up-options', 'survival-timeline'],
            systems: ['input', 'movement', 'collision', 'combat', 'spawn', 'pickup', 'health', 'progression', 'reward', 'animation', 'render_canvas'],
            confidenceBoost: 0.16
        },
        {
            id: 'bullet_hell',
            label: 'Bullet Hell / Flying Shooter',
            type: 'bullet-hell',
            keywords: [
                'bullet hell', 'danmaku', 'shmup', 'shoot em up', 'shooter', 'flying shooter',
                'space shooter', 'vertical shooter', 'plane shooter', 'airplane shooter', 'aircraft shooter',
                'shoot', 'dodge', 'projectile', 'boss phase', 'boss bullet', 'boss fight',
                '飞行射击', '飞机大战', '太空射击', '纵版射击', '竖版射击', '竖版打飞机', '打飞机',
                '弹幕射击', '弹幕', '躲子弹', '躲避子弹', 'Boss 弹幕战', 'boss 弹幕战', '射击',
                '子弹', '躲避', '首领'
            ],
            sourceArchitecture: 'bullet_hell',
            specMode: 'single-game-spec',
            contentModules: ['game', 'schema', 'manifest'],
            gameplayPillars: ['focused-movement', 'projectile-patterns', 'graze', 'bombs', 'boss-phases'],
            systems: ['input', 'movement', 'collision', 'combat', 'spawn', 'projectile', 'bullet_pattern', 'pickup', 'hud', 'render_canvas'],
            confidenceBoost: 0.13
        },
        {
            id: 'tower_defense',
            label: 'Tower Defense',
            type: 'tower-defense',
            keywords: ['tower', 'defense', 'defence', 'lane', 'base', 'turret', 'path', '塔防', '防御塔', '防守', '基地', '路线'],
            sourceArchitecture: 'p0-local-preview',
            specMode: 'single-game-spec',
            contentModules: ['game', 'waves', 'manifest'],
            gameplayPillars: ['base-defense', 'pathing', 'tower-projectiles', 'wave-pressure'],
            systems: ['input', 'collision', 'combat', 'spawn', 'health', 'projectile', 'wave', 'ui_render'],
            confidenceBoost: 0.12
        }
    ];

    TEMPLATE_CATALOG = [
        {
            id: 'roguelike_survival',
            label: 'Roguelike Survival',
            type: 'roguelike',
            keywords: [
                'roguelike', 'roguelite', 'roguelike survival', 'survivors-like', 'vampire survivors',
                'bullet heaven', 'reverse bullet hell', 'arena survival', 'horde survival', 'swarm survival',
                'survival', 'survive', 'wave', 'horde', 'auto attack', 'auto weapon', 'level-up', 'level up',
                'upgrade choice', 'three choices', 'xp', 'experience pickup',
                '肉鸽', '肉鸽生存', '类吸血鬼幸存者', '吸血鬼幸存者', '幸存者', '生存', '割草',
                '波次', '刷怪', '敌潮', '自动攻击', '自动武器', '升级', '升级三选一', '经验', '存活', '生存计时'
            ],
            sourceArchitecture: 'Groglike-SOP',
            specMode: 'module-spec',
            contentModules: ['minimal', 'weapons', 'enemies', 'waves', 'balance', 'effects', 'manifest'],
            gameplayPillars: ['auto-weapons', 'xp-pickups', 'level-up-options', 'survival-timeline'],
            systems: ['input', 'movement', 'collision', 'combat', 'spawn', 'pickup', 'health', 'progression', 'reward', 'animation', 'render_canvas'],
            confidenceBoost: 0.16
        },
        {
            id: 'bullet_hell',
            label: 'Bullet Hell / Flying Shooter',
            type: 'bullet-hell',
            keywords: [
                'bullet hell', 'danmaku', 'shmup', 'shoot em up', 'shooter', 'flying shooter',
                'space shooter', 'vertical shooter', 'plane shooter', 'airplane shooter', 'aircraft shooter',
                'shoot', 'dodge', 'projectile', 'boss phase', 'boss bullet', 'boss fight',
                '飞行射击', '飞机大战', '太空射击', '纵版射击', '竖版射击', '竖版打飞机', '打飞机',
                '弹幕射击', '弹幕', '躲子弹', '躲避子弹', 'Boss 弹幕战', 'boss 弹幕战', '射击',
                '子弹', '躲避', '首领'
            ],
            sourceArchitecture: 'bullet_hell',
            specMode: 'single-game-spec',
            contentModules: ['game', 'schema', 'manifest'],
            gameplayPillars: ['focused-movement', 'projectile-patterns', 'graze', 'bombs', 'boss-phases'],
            systems: ['input', 'movement', 'collision', 'combat', 'spawn', 'projectile', 'bullet_pattern', 'pickup', 'hud', 'render_canvas'],
            confidenceBoost: 0.13
        },
        {
            id: 'tower_defense',
            label: 'Tower Defense',
            type: 'tower-defense',
            keywords: ['tower', 'defense', 'defence', 'lane', 'base', 'turret', 'path', '塔防', '防御塔', '防守', '基地', '路线'],
            sourceArchitecture: 'p0-local-preview',
            specMode: 'single-game-spec',
            contentModules: ['game', 'waves', 'manifest'],
            gameplayPillars: ['base-defense', 'pathing', 'tower-projectiles', 'wave-pressure'],
            systems: ['input', 'collision', 'combat', 'spawn', 'health', 'projectile', 'wave', 'ui_render'],
            confidenceBoost: 0.12
        }
    ];

    TEMPLATE_CATALOG = TEMPLATE_CATALOG.map(template => {
        if (template.id === 'roguelike_survival') {
            return {
                ...template,
                keywords: [
                    ...template.keywords,
                    '\u8089\u9e3d', '\u8089\u9e3d\u751f\u5b58', '\u7c7b\u5438\u8840\u9b3c\u5e78\u5b58\u8005',
                    '\u5438\u8840\u9b3c\u5e78\u5b58\u8005', '\u5e78\u5b58\u8005', '\u751f\u5b58', '\u5272\u8349',
                    '\u6ce2\u6b21', '\u5237\u602a', '\u654c\u6f6e', '\u81ea\u52a8\u653b\u51fb', '\u81ea\u52a8\u6b66\u5668',
                    '\u5347\u7ea7', '\u5347\u7ea7\u4e09\u9009\u4e00', '\u7ecf\u9a8c', '\u5b58\u6d3b', '\u751f\u5b58\u8ba1\u65f6'
                ]
            };
        }
        if (template.id === 'bullet_hell') {
            return {
                ...template,
                keywords: [
                    ...template.keywords,
                    '\u98de\u884c\u5c04\u51fb', '\u98de\u673a\u5927\u6218', '\u592a\u7a7a\u5c04\u51fb',
                    '\u7eb5\u7248\u5c04\u51fb', '\u7ad6\u7248\u5c04\u51fb', '\u7ad6\u7248\u6253\u98de\u673a',
                    '\u6253\u98de\u673a', '\u5f39\u5e55\u5c04\u51fb', '\u5f39\u5e55', '\u8eb2\u5b50\u5f39',
                    '\u8eb2\u907f\u5b50\u5f39', 'Boss \u5f39\u5e55\u6218', 'boss \u5f39\u5e55\u6218',
                    '\u5c04\u51fb', '\u5b50\u5f39', '\u8eb2\u907f', '\u9996\u9886'
                ]
            };
        }
        if (template.id === 'tower_defense') {
            return {
                ...template,
                keywords: [
                    ...template.keywords,
                    '\u5854\u9632', '\u9632\u5fa1\u5854', '\u9632\u5b88', '\u57fa\u5730', '\u8def\u7ebf'
                ]
            };
        }
        return template;
    });

    const AUTO_GENERATION_TEMPLATE_IDS = new Set(['bullet_hell', 'roguelike_survival']);

    const THEME_PRESETS = {
        animal_island: {
            label: 'Animal Island',
            keywords: ['animal', 'island', 'cozy', 'cute', 'farm', 'village'],
            styleLock: {
                preset: 'warm_cozy_handmade',
                anchorImage: 'theme/animal_island/style-anchor.png',
                fingerprint: ['rounded-shapes', 'soft-contrast', 'warm-daylight', 'low-pressure']
            },
            uiTokens: {
                colors: { background: '#f5efe2', surface: '#fff7e8', accent: '#4b9f6f', danger: '#d95d55' },
                radius: 8,
                shadow: 'soft'
            },
            balance: { enemyPressure: 0.85, playerForgiveness: 1.15, economyGain: 1.05 }
        },
        three_kingdoms_ink: {
            label: 'Three Kingdoms Ink',
            keywords: ['three kingdoms', 'warlord', 'ink', 'spear', 'guan', 'battlefield'],
            styleLock: {
                preset: 'ink_war_scroll',
                anchorImage: 'theme/three_kingdoms_ink/style-anchor.png',
                fingerprint: ['ink-lines', 'paper-texture', 'historic-armor', 'high-contrast-silhouette']
            },
            uiTokens: {
                colors: { background: '#e8dfcf', surface: '#fbf2df', accent: '#9c2f2f', danger: '#3b2621' },
                radius: 4,
                shadow: 'ink'
            },
            balance: { enemyPressure: 1.05, playerForgiveness: 0.95, economyGain: 1 }
        },
        cyberpunk_neon: {
            label: 'Cyberpunk Neon',
            keywords: ['cyberpunk', 'neon', 'future', 'hacker', 'city', 'sci-fi'],
            styleLock: {
                preset: 'neon_arcade',
                anchorImage: 'theme/cyberpunk_neon/style-anchor.png',
                fingerprint: ['high-saturation-neon', 'dark-grid', 'glow-projectiles', 'sharp-ui']
            },
            uiTokens: {
                colors: { background: '#10131a', surface: '#161b26', accent: '#38e8ff', danger: '#ff3f7f' },
                radius: 6,
                shadow: 'glow'
            },
            balance: { enemyPressure: 1.1, playerForgiveness: 0.9, economyGain: 1 }
        },
        dark_gothic: {
            label: 'Dark Gothic',
            keywords: ['gothic', 'dark', 'vampire', 'castle', 'grave', 'demon'],
            styleLock: {
                preset: 'gothic_horror',
                anchorImage: 'theme/dark_gothic/style-anchor.png',
                fingerprint: ['deep-shadows', 'stone-metal', 'crimson-accents', 'dramatic-silhouette']
            },
            uiTokens: {
                colors: { background: '#171417', surface: '#242024', accent: '#b48a57', danger: '#b42d40' },
                radius: 5,
                shadow: 'heavy'
            },
            balance: { enemyPressure: 1.15, playerForgiveness: 0.9, economyGain: 0.95 }
        },
        pixel_retro: {
            label: 'Pixel Retro',
            keywords: ['pixel', 'retro', '8bit', '16bit', 'arcade'],
            styleLock: {
                preset: 'pixel_retro',
                anchorImage: 'theme/pixel_retro/style-anchor.png',
                fingerprint: ['low-resolution-grid', 'limited-palette', 'crisp-edges', 'arcade-feedback']
            },
            uiTokens: {
                colors: { background: '#101820', surface: '#203040', accent: '#f2c14e', danger: '#e4572e' },
                radius: 2,
                shadow: 'none'
            },
            balance: { enemyPressure: 1, playerForgiveness: 1, economyGain: 1.05 }
        }
    };

    const AI_STORAGE_KEY = 'droi_ai_model_config';
    const ADMIN_SESSION_KEY = 'droi_ai_admin_session';
    const ADMIN_EMAIL_ALLOWLIST = ['liyilin199976@gmail.com'];
    const AI_ANALYSIS_TIMEOUT_MS = 6000;
    const AI_GAME_PLAN_TIMEOUT_MS = 30000;
    const AI_TEMPLATE_PATCH_TIMEOUT_MS = 45000;
    const TEMPLATE_COMPILE_TIMEOUT_MS = 30000;
    const isLocalHost = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    const isBackendPort = window.location.port === '3000';
    const DEFAULT_API_BASE_URL = (
        isLocalHost && window.location.port && !isBackendPort
            ? 'http://127.0.0.1:3000'
            : ''
    );
    let API_BASE_URL = normalizeApiBaseUrl(window.DROI_API_BASE || DEFAULT_API_BASE_URL);
    const PROVIDER_ORDER = ['openai', 'gemini', 'anthropic', 'groq'];
    const PROVIDER_META = {
        openai: {
            label: 'GPT',
            icon: 'GP',
            color: '#10a37f',
            defaultBaseUrl: 'https://api.openai.com/v1',
            adapter: 'responses',
            models: [
                { id: 'gpt-5.5-high', label: 'GPT 5.5 High', reasoningEffort: 'high' },
                { id: 'gpt-5.5-low', label: 'GPT 5.5 Low', reasoningEffort: 'low' },
                { id: 'gpt-5.4-mid', label: 'GPT 5.4 Mid', reasoningEffort: 'medium' }
            ]
        },
        anthropic: {
            label: 'Claude code',
            icon: 'CL',
            color: '#d97757',
            defaultBaseUrl: 'https://api.anthropic.com/v1',
            adapter: 'anthropic',
            models: [
                { id: 'claude-opus-4-7', label: 'Claude Opus 4.7' },
                { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
                { id: 'claude-haiku-4-5-20251001', label: 'Claude Haiku 4.5' }
            ]
        },
        groq: {
            label: 'xAI Grok',
            icon: 'GX',
            color: '#f55036',
            defaultBaseUrl: 'https://api.x.ai/v1',
            adapter: 'responses',
            models: [
                { id: 'grok-4.20-multi-agent-0309', label: 'Grok 4.20 Multi-Agent' },
                { id: 'grok-4.3', label: 'Grok 4.3' },
                { id: 'grok-4.20-0309-non-reasoning', label: 'Grok 4.20 Non-reasoning' }
            ]
        },
        gemini: {
            label: 'Gemini',
            icon: 'GM',
            color: '#4285f4',
            defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
            adapter: 'gemini',
            models: [
                { id: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash', reasoningEffort: 'none' },
                { id: 'gemini-3.5-pro', label: 'Gemini 3.5 Pro', reasoningEffort: 'medium' },
                { id: 'gemini-3.0-flash-lite', label: 'Gemini 3.0 Flash Lite', reasoningEffort: 'none' }
            ]
        },
        custom: {
            label: 'Custom',
            icon: 'CU',
            color: '#a482ff',
            defaultBaseUrl: 'http://localhost:11434/v1',
            adapter: 'openai-compatible',
            models: [
                { id: 'custom-model', label: 'Custom Model' }
            ]
        }
    };
    function createDefaultAIConfig() {
        return {
            version: 1,
            activeProvider: 'openai',
            providers: PROVIDER_ORDER.reduce((acc, id) => {
                const meta = PROVIDER_META[id];
                acc[id] = {
                    enabled: id === 'openai',
                    apiKey: '',
                    baseUrl: meta.defaultBaseUrl,
                    currentModel: meta.models[0].id,
                    customModel: '',
                    reasoningEffort: ['openai', 'groq'].includes(id) ? 'high' : 'none'
                };
                return acc;
            }, {}),
            usage: {
                totalTokens: 0,
                estimatedCost: 0,
                byModel: {},
                byCost: {}
            }
        };
    }

    function mergeAIConfig(saved) {
        const defaults = createDefaultAIConfig();
        if (!saved || typeof saved !== 'object') return defaults;

        const merged = {
            ...defaults,
            ...saved,
            providers: { ...defaults.providers },
            usage: { ...defaults.usage, ...(saved.usage || {}) }
        };

        PROVIDER_ORDER.forEach(id => {
            merged.providers[id] = {
                ...defaults.providers[id],
                ...((saved.providers && saved.providers[id]) || {})
            };
            merged.providers[id].apiKey = '';
            if (id !== 'custom' && !PROVIDER_META[id].models.some(model => model.id === merged.providers[id].currentModel)) {
                merged.providers[id].currentModel = PROVIDER_META[id].models[0].id;
            }
        });

        if (!PROVIDER_META[merged.activeProvider] || !merged.providers[merged.activeProvider]) {
            merged.activeProvider = 'openai';
        }

        merged.usage.totalTokens = Number(merged.usage.totalTokens) || 0;
        merged.usage.estimatedCost = Number(merged.usage.estimatedCost) || 0;
        merged.usage.byModel = merged.usage.byModel && typeof merged.usage.byModel === 'object' ? merged.usage.byModel : {};
        merged.usage.byCost = merged.usage.byCost && typeof merged.usage.byCost === 'object' ? merged.usage.byCost : {};

        return merged;
    }

    function loadAIConfig() {
        try {
            return mergeAIConfig(JSON.parse(localStorage.getItem(AI_STORAGE_KEY)));
        } catch (error) {
            return createDefaultAIConfig();
        }
    }

    function createPublicAIConfigSnapshot(config = aiConfig) {
        return {
            ...config,
            providers: PROVIDER_ORDER.reduce((acc, providerId) => {
                const provider = config.providers[providerId] || {};
                acc[providerId] = {
                    ...provider,
                    apiKey: ''
                };
                return acc;
            }, {}),
            usage: {
                ...config.usage
            }
        };
    }

    function saveAIConfig() {
        localStorage.setItem(AI_STORAGE_KEY, JSON.stringify(createPublicAIConfigSnapshot()));
    }

    async function saveAdminAIConfig() {
        if (!adminSession.isAdmin) return { persisted: 'denied' };
        try {
            const response = await fetch(apiUrl('/api/admin/ai-config'), {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(aiConfig)
            });
            if (response.ok) return { persisted: 'server' };
        } catch (error) {
            // Static preview keeps model choices locally, but never persists API keys.
        }

        saveAIConfig();
        return { persisted: 'local-public' };
    }

    function loadAdminSession() {
        try {
            const saved = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
            if (!saved || typeof saved !== 'object') return { loggedIn: false, email: '', isAdmin: false };
            return {
                loggedIn: Boolean(saved.loggedIn),
                email: saved.email || '',
                isAdmin: false
            };
        } catch (error) {
            return { loggedIn: false, email: '', isAdmin: false };
        }
    }

    function saveAdminSession(session) {
        adminSession = {
            loggedIn: Boolean(session.loggedIn),
            email: session.email || '',
            isAdmin: Boolean(session.isAdmin)
        };
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));
    }

    function isAllowedAdminEmail(email) {
        return ADMIN_EMAIL_ALLOWLIST.includes(String(email || '').trim().toLowerCase());
    }

    function normalizeApiBaseUrl(value) {
        return String(value || '').trim().replace(/\/+$/, '');
    }

    async function loadRuntimeConfig() {
        if (window.DROI_API_BASE) {
            API_BASE_URL = normalizeApiBaseUrl(window.DROI_API_BASE);
            runtimeConfigState = 'inline';
            return;
        }

        try {
            const response = await fetch('droi-config.json', { cache: 'no-store' });
            if (!response.ok) {
                runtimeConfigState = API_BASE_URL ? 'local-default' : 'missing';
                return;
            }
            const config = await response.json();
            const apiBase = config.apiBaseUrl || config.apiBase || config.backendUrl || '';
            if (apiBase) {
                API_BASE_URL = normalizeApiBaseUrl(apiBase);
                runtimeConfigState = 'file';
            } else {
                runtimeConfigState = API_BASE_URL ? 'local-default' : 'missing';
            }
        } catch (error) {
            // Static hosting can omit droi-config.json; the UI will show model/backend errors instead of faking generation.
            runtimeConfigState = API_BASE_URL ? 'local-default' : 'missing';
        }
    }

    function apiUrl(path) {
        return `${API_BASE_URL}${path}`;
    }

    function resolveBackendUrl(pathOrUrl) {
        const value = String(pathOrUrl || '');
        if (!value) return '';
        if (/^https?:\/\//i.test(value)) return value;
        return apiUrl(value.startsWith('/') ? value : `/${value}`);
    }

    async function parseJsonResponse(response) {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            const message = data.error && data.error.message
                ? data.error.message
                : (data.error || data.message || `Request failed with ${response.status}`);
            const error = new Error(message);
            error.status = response.status;
            error.data = data;
            throw error;
        }
        return data;
    }

    function getProviderModelId(providerId) {
        const provider = aiConfig.providers[providerId];
        if (!provider) return '';
        if (providerId === 'custom' && provider.customModel.trim()) {
            return provider.customModel.trim();
        }
        return provider.currentModel;
    }

    function getModelLabel(providerId, modelId = getProviderModelId(providerId)) {
        const meta = PROVIDER_META[providerId];
        if (!meta) return modelId || 'Unknown model';
        const known = meta.models.find(model => model.id === modelId);
        return cleanModelDisplayLabel(known ? known.label : modelId);
    }

    function cleanModelDisplayLabel(label) {
        return String(label || '')
            .replace(/\bpreview\b/gi, '')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }

    function getActiveModelMeta() {
        const providerId = aiConfig.activeProvider;
        const provider = aiConfig.providers[providerId] || aiConfig.providers.openai;
        const meta = PROVIDER_META[providerId] || PROVIDER_META.openai;
        const modelId = getProviderModelId(providerId);
        const reasoning = provider.reasoningEffort || 'none';
        const modelLabel = getModelLabel(providerId, modelId);
        return {
            providerId,
            providerLabel: meta.label,
            icon: meta.icon,
            color: meta.color,
            modelId,
            modelLabel,
            reasoning,
            label: modelLabel
        };
    }

    function buildStageModelMeta(response = {}, fallback = getActiveModelMeta()) {
        const providerId = response.providerId || response.provider || fallback.providerId || fallback.provider || '';
        const modelId = response.model || response.modelId || fallback.modelId || fallback.model || '';
        return {
            providerId,
            provider: providerId,
            modelId,
            model: modelId,
            label: getModelLabel(providerId, modelId) || fallback.label || fallback.modelLabel || modelId || 'Selected model'
        };
    }

    function hasConfiguredProvider(providerId = aiConfig.activeProvider) {
        const modelId = getProviderModelId(providerId);
        return platformModels.some(model => model.providerId === providerId && model.modelId === modelId && model.enabled !== false);
    }

    function hasLiveAIProvider(providerId = aiConfig.activeProvider) {
        return Boolean(platformAIAvailable && hasConfiguredProvider(providerId));
    }

    function applyModelSelection(modelConfig) {
        if (!modelConfig) return;
        const provider = aiConfig.providers[modelConfig.providerId];
        if (!provider) return;
        aiConfig.activeProvider = modelConfig.providerId;
        provider.enabled = true;
        provider.currentModel = modelConfig.modelId;
        provider.reasoningEffort = modelConfig.reasoningEffort || provider.reasoningEffort || 'none';
        if (modelConfig.providerId === 'custom') provider.customModel = modelConfig.modelId;
    }

    function normalizePublicModels(models) {
        if (!Array.isArray(models)) return;
        platformModels = [];

        PROVIDER_ORDER.forEach(providerId => {
            aiConfig.providers[providerId].enabled = false;
        });

        models.forEach(item => {
            const providerId = item.provider || item.providerId || 'custom';
            const provider = aiConfig.providers[providerId];
            const meta = PROVIDER_META[providerId];
            if (!provider || !meta) return;

            const modelId = item.model || item.modelId || item.id;
            if (!modelId) return;

            const modelConfig = {
                id: item.id || modelId,
                providerId,
                modelId,
                label: cleanModelDisplayLabel(item.label || modelId),
                reasoningEffort: item.reasoningEffort || item.reasoning || provider.reasoningEffort || 'none',
                enabled: item.enabled !== false
            };

            if (!meta.models.some(model => model.id === modelId)) {
                meta.models.push({ id: modelId, label: modelConfig.label });
            }

            if (!modelConfig.enabled) return;
            provider.enabled = true;
            platformModels.push(modelConfig);
        });
    }

    async function loadPlatformModels() {
        platformModelLoadState = 'loading';
        platformModelLoadMessage = '';
        try {
            const response = await fetch(apiUrl('/api/models'), { credentials: 'include' });
            if (!response.ok) {
                platformAIAvailable = false;
                platformModelLoadState = 'backend-error';
                platformModelLoadMessage = `Backend model list returned HTTP ${response.status}.`;
                updateModelUI();
                return;
            }
            const data = await response.json();
            platformAIAvailable = true;
            normalizePublicModels(data.models || data.publicModels || data);

            if (platformModels.length) {
                const defaultId = data.defaultModel || data.defaultModelId;
                const defaultModel = platformModels.find(item => item.id === defaultId || item.modelId === defaultId) || platformModels[0];
                applyModelSelection(defaultModel);
                platformModelLoadState = 'ready';
                platformModelLoadMessage = '';
            } else {
                platformModelLoadState = 'no-models';
                platformModelLoadMessage = 'Backend is reachable, but no provider API key is enabled.';
            }
            updateModelUI();
        } catch (error) {
            platformAIAvailable = false;
            platformModels = [];
            platformModelLoadState = runtimeConfigState === 'missing' ? 'config-missing' : 'backend-unreachable';
            platformModelLoadMessage = runtimeConfigState === 'missing'
                ? 'Static deployment is missing droi-config.json, so the frontend does not know the backend URL.'
                : 'Backend is unreachable. Check apiBaseUrl, deployment status, and CORS.';
            updateModelUI();
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    class AIService {
        constructor(getConfig, onUsage) {
            this.getConfig = getConfig;
            this.onUsage = onUsage;
        }

        async chat(messages, options = {}) {
            const config = this.getConfig();
            const providerId = options.provider || config.activeProvider;
            const provider = config.providers[providerId];
            const meta = PROVIDER_META[providerId];

            if (!provider || !meta) throw new Error(`Provider ${providerId} is not supported.`);
            const model = options.model || getProviderModelId(providerId);

            const platformResult = await this.tryPlatformChat(providerId, model, messages);
            if (platformResult) {
                this.onUsage(providerId, model, platformResult.usage || {});
                return {
                    ...platformResult,
                    providerId,
                    model
                };
            }

            throw new Error(`Platform API for ${meta.label} is not configured yet.`);
        }

        async stageChat(endpoint, messages, options = {}) {
            const config = this.getConfig();
            const providerId = options.provider || config.activeProvider;
            const provider = config.providers[providerId];
            const meta = PROVIDER_META[providerId];

            if (!provider || !meta) throw new Error(`Provider ${providerId} is not supported.`);
            const model = options.model || getProviderModelId(providerId);

            const response = await fetch(apiUrl(endpoint), {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider: providerId,
                    model,
                    modelId: model,
                    messages
                })
            });
            const data = await this.parseResponse(response);
            platformAIAvailable = true;
            this.onUsage(providerId, model, data.usage || {});
            return {
                content: data.content || data.message || data.text || '',
                usage: data.usage || {},
                providerId,
                model,
                stage: data.stage || ''
            };
        }

        async tryPlatformChat(providerId, model, messages) {
            try {
                const response = await fetch(apiUrl('/api/chat'), {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        provider: providerId,
                        model,
                        modelId: model,
                        messages
                    })
                });

                if (response.status === 404) return null;
                const data = await this.parseResponse(response);
                platformAIAvailable = true;
                return {
                    content: data.content || data.message || data.text || '',
                    usage: data.usage || {}
                };
            } catch (error) {
                if (isModelTimeoutError(error) || error.status) throw error;
                return null;
            }
        }

        async parseResponse(response) {
            return parseJsonResponse(response);
        }
    }

    let aiConfig = loadAIConfig();
    let settingsProviderId = aiConfig.activeProvider;
    let modelNoticeTimeout = null;
    let adminSession = loadAdminSession();
    let platformAIAvailable = false;
    let platformModels = [];
    let runtimeConfigState = window.DROI_API_BASE ? 'inline' : (API_BASE_URL ? 'local-default' : 'pending');
    let platformModelLoadState = 'idle';
    let platformModelLoadMessage = '';
    let googleAuthConfigured = false;
    const aiService = new AIService(() => aiConfig, recordUsage);

    function createEmptySelections() {
        return MODULE_STEPS.slice(1).reduce((acc, step) => {
            acc[step.key] = null;
            return acc;
        }, {});
    }

    function createChatTracking(defaultValueFactory) {
        return MODULE_STEPS.slice(1).reduce((acc, step) => {
            acc[step.step || MODULE_STEPS.indexOf(step)] = defaultValueFactory();
            return acc;
        }, {});
    }

    function createModuleStates() {
        return MODULE_STEPS.slice(1).reduce((acc, step) => {
            acc[step.key] = {
                id: step.specKey,
                title: step.title,
                status: 'missing',
                value: null,
                confidence: 0,
                userEdited: false
            };
            return acc;
        }, {
            outputPackage: {
                id: 'outputPackage',
                title: 'Output Package',
                status: 'fixed',
                value: 'Complete project folder and in-page preview',
                confidence: 1,
                userEdited: false
            }
        });
    }

    let chatStep = 1;
    let chatSelections = createEmptySelections();
    let chatShown = createChatTracking(() => new Set());
    let chatCurrent = createChatTracking(() => []);

    let analysisState = {
        active: false,
        ...createEmptySelections(),
        background: null,
        processing: false,
        revisionMode: false,
        finalModelMeta: null,
        analysisModelMeta: null,
        gamePlanModelMeta: null,
        workStartedAt: 0,
        templateDecision: null,
        capability: null,
        missingFields: [],
        modules: createModuleStates()
    };

    // Global tracking for animation processes to allow interruption
    let generationInterval = null;
    let generationTimeouts = [];
    let botWorkIntervals = [];
    let activeGameCleanups = [];
    let latestGamePlanDraft = '';
    let latestGamePlanJson = null;
    let latestGamePlanModelMeta = null;
    let latestTemplatePatchPlan = null;
    let latestCompiledProject = null;
    let latestAIFlowRetry = null;
    let latestAIFlowError = null;

    function regTimeout(fn, delay) {
        const t = setTimeout(fn, delay);
        generationTimeouts.push(t);
        return t;
    }

    let analysisTimeout = null;

    function getStepDefinition(step) {
        return MODULE_STEPS[step] || null;
    }

    function getStepByKey(key) {
        return MODULE_STEPS.findIndex(step => step && step.key === key);
    }

    function normalizeFieldName(value) {
        return String(value || '')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim();
    }

    function getStepFromMissingField(fieldName) {
        const normalized = normalizeFieldName(fieldName);
        if (!normalized) return null;
        return MODULE_STEPS.find(step => {
            if (!step) return false;
            return [step.key, step.specKey, step.title]
                .map(normalizeFieldName)
                .some(name => name === normalized || normalized.includes(name) || name.includes(normalized));
        }) || null;
    }

    function setModuleSelection(key, item, status = 'confirmed', confidence = 1, userEdited = true) {
        if (!key || !item) return;
        const normalizedItem = typeof item === 'string'
            ? { label: item, value: item }
            : item;
        analysisState[key] = normalizedItem;
        chatSelections[key] = normalizedItem;
        if (!analysisState.modules) analysisState.modules = createModuleStates();
        if (analysisState.modules[key]) {
            analysisState.modules[key] = {
                ...analysisState.modules[key],
                status,
                value: normalizedItem,
                confidence,
                userEdited
            };
        }
        if (userEdited && Array.isArray(analysisState.missingFields)) {
            const currentStep = MODULE_STEPS.find(step => step && step.key === key);
            analysisState.missingFields = analysisState.missingFields.filter(fieldName => {
                const missingStep = getStepFromMissingField(fieldName);
                return !(currentStep && missingStep && missingStep.key === currentStep.key);
            });
        }
    }

    function getModuleSelection(key) {
        return analysisState[key] || chatSelections[key] || null;
    }

    function getNextMissingStep() {
        const aiMissingFields = Array.isArray(analysisState.missingFields) ? analysisState.missingFields : [];
        for (const fieldName of aiMissingFields) {
            const definition = getStepFromMissingField(fieldName);
            if (!definition) continue;
            const moduleState = analysisState.modules && analysisState.modules[definition.key];
            if (moduleState && moduleState.userEdited && moduleState.status === 'confirmed') continue;
            return getStepByKey(definition.key);
        }
        for (let step = 1; step < MODULE_STEPS.length; step += 1) {
            const definition = getStepDefinition(step);
            if (definition && !getModuleSelection(definition.key)) return step;
        }
        return null;
    }

    function getModulePrompt(step) {
        const definition = getStepDefinition(step);
        if (!definition) return 'What should we define next?';
        return `${definition.prompt}`;
    }

    function normalizeAnswerText(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/<[^>]*>/g, ' ')
            .replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');
    }

    function keyToWords(key) {
        return String(key || '').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    }

    function getInvalidAnswerReason(promptText, definition) {
        if (!definition) return '';
        const normalized = normalizeAnswerText(promptText);
        const title = normalizeAnswerText(definition.title);
        const key = normalizeAnswerText(keyToWords(definition.key));
        const systemPhrases = [
            'auto generation ready',
            'manual queue fallback',
            'p0 gamespec ready',
            'p0 template',
            'decision',
            'create',
            'add more in chat',
            'exit new idea'
        ];

        if (!normalized) return 'Please enter a concrete answer.';
        if (normalized === title || normalized === key) {
            return `That is the module name. Please choose a concrete ${definition.title.toLowerCase()} option.`;
        }
        if (systemPhrases.includes(normalized)) {
            return 'That is a system status, not an answer to the current question.';
        }
        if (definition.key === 'progressionSystem' && ['progression', 'progression system', 'upgrade', 'upgrades', 'growth', 'grow stronger'].includes(normalized)) {
            return 'Please describe how the player grows stronger, for example Level-up choices, Skill tree, Equipment drops, or Permanent unlocks.';
        }
        return '';
    }

    function buildClarificationRetryMessage(definition, reason) {
        const examples = (definition.pool || []).slice(0, 3).map(item => item.label).join(', ');
        return `${escapeHtml(reason)}<br><span style="opacity:0.72">Try: ${escapeHtml(examples)}</span>`;
    }

    function isWizardStepActive() {
        return !analysisState.active && chatStep > 0 && chatStep < MODULE_STEPS.length;
    }

    function inferWizardStepFromVisibleOptions() {
        if (!chatOptionsList) return null;
        const visibleTexts = Array.from(chatOptionsList.querySelectorAll('button'))
            .map(button => normalizeAnswerText(button.textContent))
            .filter(Boolean);
        if (!visibleTexts.length) return null;

        let bestMatch = null;
        MODULE_STEPS.slice(1).forEach((step, index) => {
            const score = (step.pool || []).reduce((count, item) => {
                const label = normalizeAnswerText(item.label);
                return count + (label && visibleTexts.some(text => text.includes(label)) ? 1 : 0);
            }, 0);
            if (score > 0 && (!bestMatch || score > bestMatch.score)) {
                bestMatch = { stepIndex: index + 1, score };
            }
        });

        return bestMatch ? getStepDefinition(bestMatch.stepIndex) : null;
    }

    function getWizardFreeTextDefinition() {
        if (analysisState.active) return null;
        return inferWizardStepFromVisibleOptions() || (isWizardStepActive() ? getStepDefinition(chatStep) : null);
    }

    function shouldAnalyzeWizardFreeText(promptText, definition) {
        if (!definition || definition.key !== 'type') return false;
        const text = String(promptText || '').trim();
        if (text.length < 20) return false;
        const best = scoreTemplatesForText(text)[0];
        return Boolean(best && best.confidence >= 0.7 && best.hits.length > 0);
    }

    async function handleFreeTextForStepWithAI(definition, promptText, onAccepted) {
        if (!definition) return false;
        const invalidReason = getInvalidAnswerReason(promptText, definition);
        if (invalidReason) {
            addBotMessage(buildClarificationRetryMessage(definition, invalidReason), () => {
                regTimeout(() => renderChatOptions(getStepByKey(definition.key)), 160);
            });
            return true;
        }
        if (!hasLiveAIProvider()) throw createModelNotConfiguredError('clarification');

        const response = await withTimeout(aiService.stageChat('/api/ai/analyze-game-request', [
            {
                role: 'system',
                content: `You classify one user answer for a single GameSpec field.
Return strict JSON only:
{
  "fieldKey": "${definition.key}",
  "label": string|null,
  "value": string|null,
  "status": "confirmed|suggested|missing",
  "confidence": number,
  "reason": string
}
Do not answer with the field name itself. If the user only repeats the field name, return status "missing".`
            },
            {
                role: 'user',
                content: JSON.stringify({
                    selectedModel: getActiveModelMeta(),
                    targetField: {
                        key: definition.key,
                        specKey: definition.specKey,
                        title: definition.title,
                        prompt: definition.prompt
                    },
                    answer: promptText,
                    currentGameSpec: getCurrentGameSpec(),
                    options: (definition.pool || []).map(item => ({
                        label: item.label,
                        value: item.value,
                        desc: item.desc || item.mechanic || ''
                    }))
                }, null, 2)
            }
        ]), AI_ANALYSIS_TIMEOUT_MS);

        const parsed = parseJsonObjectFromText(response.content, 'MODEL_JSON_PARSE_FAILED');
        const value = parsed.value || parsed.label;
        if (!value || parsed.status === 'missing') {
            addBotMessage(buildClarificationRetryMessage(definition, parsed.reason || 'Please enter a concrete answer.'), () => {
                regTimeout(() => renderChatOptions(getStepByKey(definition.key)), 160);
            });
            return true;
        }

        const selected = matchChoice(definition.pool, value, 'desc') || {
            label: value,
            value,
            desc: value
        };
        const confidence = Number.isFinite(Number(parsed.confidence)) ? Number(parsed.confidence) : 0.72;
        onAccepted(selected, parsed.status === 'confirmed' ? 'confirmed' : 'suggested', confidence);
        return true;
    }

    function startAnalysisFlow(prompt) {
        if (analysisState.active && analysisState.processing) return;
        if (analysisTimeout) clearTimeout(analysisTimeout);

        analysisState.active = true;
        analysisState.processing = true;
        MODULE_STEPS.slice(1).forEach(step => {
            analysisState[step.key] = null;
        });
        analysisState.modules = createModuleStates();
        analysisState.background = prompt;
        analysisState.workStartedAt = Date.now();
        analysisState.templateDecision = null;
        analysisState.capability = null;
        analysisState.missingFields = [];
        analysisState.analysisModelMeta = null;
        analysisState.gamePlanModelMeta = null;

        const analysisMessage = addBotMessage('', null, { pending: true });

        runPromptAnalysis(prompt, analysisState.workStartedAt, analysisMessage);
    }

    async function runPromptAnalysis(prompt, runStartedAt, pendingMessage) {
        if (!hasLiveAIProvider()) {
            analysisState.processing = false;
            showAIFlowError(createModelNotConfiguredError('analysis'), { stage: 'analysis', prompt, pendingMessage });
            return;
        }

        try {
            await withTimeout(analyzePromptWithAIIfAvailable(prompt), AI_ANALYSIS_TIMEOUT_MS);
        } catch (error) {
            if (!analysisState.active || analysisState.workStartedAt !== runStartedAt) return;
            analysisState.processing = false;
            showAIFlowError(error, { stage: 'analysis', prompt, pendingMessage });
            return;
        }

        if (!analysisState.active || analysisState.workStartedAt !== runStartedAt) return;
        analysisState.processing = false;
        if (pendingMessage) pendingMessage.remove();
        continueClarification();
    }

    function scoreTemplatesForText(text) {
        const intent = String(text || '').toLowerCase();
        return TEMPLATE_CATALOG.map(template => {
            const hits = template.keywords.filter(keyword => intent.includes(String(keyword).toLowerCase()));
            const directHit = intent.includes(template.type) ||
                intent.includes(template.id.replace(/_/g, ' ')) ||
                intent.includes(template.label.toLowerCase());
            const hitScore = Math.min(0.66, hits.length * 0.11);
            const confidence = Math.min(0.98, (directHit ? 0.58 : 0.18) + hitScore + template.confidenceBoost);
            return { ...template, confidence, hits, directHit };
        }).sort((a, b) => (b.confidence - a.confidence) || (b.hits.length - a.hits.length) || Number(b.directHit) - Number(a.directHit));
    }

    function withTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) => {
                setTimeout(() => {
                    const error = new Error(`Timed out after ${timeoutMs}ms`);
                    error.code = 'MODEL_TIMEOUT';
                    error.status = 408;
                    reject(error);
                }, timeoutMs);
            })
        ]);
    }

    function getAIErrorCode(error) {
        return error && (
            error.code ||
            (error.data && error.data.code) ||
            (error.data && error.data.error && error.data.error.code) ||
            ''
        );
    }

    function isModelTimeoutError(error) {
        const code = String(getAIErrorCode(error) || '').toUpperCase();
        const message = String(error && error.message ? error.message : '');
        return code === 'MODEL_TIMEOUT' || error.status === 408 || /timed out|timeout/i.test(message);
    }

    function createAIFlowError(error, stage) {
        const active = getActiveModelMeta();
        const code = String(getAIErrorCode(error) || '').toUpperCase();
        if (isModelTimeoutError(error)) {
            return {
                code: 'MODEL_TIMEOUT',
                stage,
                title: 'Current model timed out',
                modelLabel: active.label,
                message: 'The model did not respond in time. Retry this request, or switch to a faster model.',
                technicalMessage: '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['retry_current_model', 'switch_model']
            };
        }

        if (code === 'MODEL_NOT_CONFIGURED' || code === 'MODEL_NOT_FOUND') {
            return {
                code: code || 'MODEL_NOT_CONFIGURED',
                stage,
                title: 'Current model is not available',
                modelLabel: active.label,
                message: getBackendModelStatusMessage(),
                technicalMessage: error && error.message ? error.message : '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['open_deployment_guide', 'retry_current_model', 'switch_model']
            };
        }

        if (code === 'MODEL_AUTH_FAILED' || code === 'MODEL_QUOTA_EXCEEDED') {
            return {
                code,
                stage,
                title: code === 'MODEL_AUTH_FAILED' ? 'Current model credentials failed' : 'Current model quota is unavailable',
                modelLabel: active.label,
                message: code === 'MODEL_AUTH_FAILED'
                    ? 'The selected model rejected the configured credentials. Switch model or check deployment configuration.'
                    : 'The selected model quota is unavailable. Switch model or check provider billing/quota.',
                technicalMessage: error && error.message ? error.message : '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['open_deployment_guide', 'switch_model']
            };
        }

        if (code === 'MODEL_RATE_LIMITED') {
            return {
                code,
                stage,
                title: 'Current model is rate limited',
                modelLabel: active.label,
                message: 'The provider is rate limiting this model. Retry shortly, or switch to a faster/available model.',
                technicalMessage: error && error.message ? error.message : '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['retry_current_model', 'switch_model']
            };
        }

        if (code === 'MODEL_SCHEMA_INVALID' || code === 'MODEL_JSON_PARSE_FAILED') {
            return {
                code,
                stage,
                title: 'Current model returned invalid structure',
                modelLabel: active.label,
                message: 'The selected model answered, but the output did not match the required JSON schema. Retry or switch model.',
                technicalMessage: error && error.message ? error.message : '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['retry_current_model', 'switch_model']
            };
        }

        if (code === 'CAPABILITY_UNSUPPORTED' || code === 'TEMPLATE_NOT_SUPPORTED') {
            return {
                code,
                stage,
                title: 'Automatic generation is not available for this request',
                modelLabel: active.label,
                message: error && error.message
                    ? error.message
                    : 'This request is outside the current P0 template coverage. Revise it toward Flying Shooter or Roguelike Survival, or submit an email for manual handling.',
                technicalMessage: '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['revise_prompt', 'submit_email']
            };
        }

        if (code === 'PATCH_REQUIRES_RUNTIME_CODE' || code === 'PATCH_FILE_NOT_ALLOWED') {
            return {
                code,
                stage,
                title: 'Template patch needs review',
                modelLabel: active.label,
                message: error && error.message
                    ? error.message
                    : 'The selected model produced a patch outside the current P0 spec/config/manifest surface. Retry, revise the request, or submit an email for manual handling.',
                technicalMessage: '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['retry_current_model', 'revise_prompt', 'submit_email']
            };
        }

        if (code === 'TEMPLATE_COMPILE_BACKEND_MISSING' || code === 'TEMPLATE_COMPILE_FAILED') {
            return {
                code,
                stage,
                title: code === 'TEMPLATE_COMPILE_BACKEND_MISSING' ? 'Template compiler is not connected' : 'Template compile failed',
                modelLabel: active.label,
                message: error && error.message
                    ? error.message
                    : 'The AI plan is ready, but the game project compiler could not finish this build.',
                technicalMessage: '',
                validationReport: error && error.validationReport ? error.validationReport : null,
                generationReport: error && error.generationReport ? error.generationReport : null,
                actions: ['retry_current_model', 'revise_prompt', 'submit_email']
            };
        }

        return {
            code: code || 'MODEL_CALL_FAILED',
            stage,
            title: 'Current model call failed',
            modelLabel: active.label,
            message: 'The selected model could not continue this AI generation step.',
            technicalMessage: error && error.message ? error.message : '',
            validationReport: error && error.validationReport ? error.validationReport : null,
            generationReport: error && error.generationReport ? error.generationReport : null,
            actions: ['retry_current_model', 'switch_model']
        };
    }

    function createModelNotConfiguredError(stage) {
        const active = getActiveModelMeta();
        const error = new Error(getBackendModelStatusMessage() || `${active.label} is not configured for live AI generation.`);
        error.code = 'MODEL_NOT_CONFIGURED';
        error.stage = stage;
        return error;
    }

    function createTemplateCompileUnavailableError() {
        const error = new Error('The static page cannot generate game files until /api/template-project/compile is available.');
        error.code = 'TEMPLATE_COMPILE_BACKEND_MISSING';
        error.status = 404;
        return error;
    }

    function getAIErrorActionLabel(action, flowError) {
        if (action === 'retry_current_model') return 'Retry';
        if (action === 'switch_model' && flowError && flowError.code === 'MODEL_TIMEOUT') return 'Switch faster model';
        if (action === 'switch_model') return 'Switch model';
        if (action === 'open_deployment_guide') return 'Deployment guide';
        if (action === 'revise_prompt') return 'Modify request';
        if (action === 'submit_email') return 'Submit email';
        return action;
    }

    function buildAIFlowErrorHtml(flowError) {
        const actionHtml = flowError.actions.map(action => {
            const label = getAIErrorActionLabel(action, flowError);
            const className = (action === 'retry_current_model' || action === 'open_deployment_guide' || action === 'submit_email')
                ? 'ai-error-action ai-error-action-primary'
                : 'ai-error-action ai-error-action-secondary';
            return `<button type="button" class="${className}" data-ai-error-action="${action}">${escapeHtml(label)}</button>`;
        }).join('');

        const technical = flowError.technicalMessage
            ? `<div class="ai-error-tech"><strong>Technical:</strong> ${escapeHtml(flowError.technicalMessage)}</div>`
            : '';
        const validationChecks = flowError.validationReport && Array.isArray(flowError.validationReport.checks)
            ? flowError.validationReport.checks
            : [];
        const validationHtml = validationChecks.length
            ? `<div class="ai-error-validation"><strong>Validation:</strong>${validationChecks.map(check => `<div>${escapeHtml(check.ok === false ? 'Needs review' : 'Pass')}: ${escapeHtml(check.label || check.message || String(check))}</div>`).join('')}</div>`
            : '';

        return `
            <div class="ai-error-card" data-error-code="${escapeHtml(flowError.code)}">
                <div class="ai-error-title">${escapeHtml(flowError.title)}</div>
                <div class="ai-error-model"><strong>Current model:</strong> ${escapeHtml(flowError.modelLabel)}</div>
                <div class="ai-error-message">${escapeHtml(flowError.message)}</div>
                ${technical}
                ${validationHtml}
                <div class="ai-error-actions">${actionHtml}</div>
            </div>
        `;
    }

    function showAIFlowError(error, { stage, prompt, pendingMessage, definitionKey, clarificationMode } = {}) {
        if (pendingMessage) pendingMessage.remove();
        const flowError = createAIFlowError(error, stage || 'model');
        latestAIFlowError = flowError;
        latestAIFlowRetry = {
            stage: flowError.stage,
            prompt: prompt || savedPrompt || analysisState.background || '',
            definitionKey: definitionKey || '',
            clarificationMode: clarificationMode || ''
        };
        addBotMessage(buildAIFlowErrorHtml(flowError));
        return flowError;
    }

    function normalizeAITemplateDecision(rawDecision) {
        if (!rawDecision || typeof rawDecision !== 'object') return null;
        const templateId = rawDecision.templateId || rawDecision.id || rawDecision.template || null;
        if (!templateId) return null;
        const template = TEMPLATE_CATALOG.find(item => item.id === templateId);
        return {
            templateId,
            templateLabel: rawDecision.templateLabel || rawDecision.label || (template ? template.label : templateId),
            genre: rawDecision.genre || (template ? template.type : ''),
            confidence: Math.max(0, Math.min(1, Number(rawDecision.confidence) || 0)),
            supported: rawDecision.supported !== false,
            reason: rawDecision.reason || rawDecision.matchReason || 'AI template decision.',
            raw: rawDecision
        };
    }

    function normalizeAICapability(rawCapability) {
        if (!rawCapability || typeof rawCapability !== 'object') {
            return {
                supported: true,
                blockers: [],
                reason: ''
            };
        }
        const blockers = Array.isArray(rawCapability.blockers)
            ? rawCapability.blockers.map(item => String(item)).filter(Boolean)
            : [];
        return {
            supported: rawCapability.supported !== false && rawCapability.unsupported !== true && blockers.length === 0,
            blockers,
            reason: rawCapability.reason || rawCapability.message || blockers.join(', '),
            raw: rawCapability
        };
    }

    async function analyzePromptWithAIIfAvailable(prompt) {
        if (!hasLiveAIProvider()) throw createModelNotConfiguredError('analysis');

        try {
            const response = await aiService.stageChat('/api/ai/analyze-game-request', [
                {
                    role: 'system',
                    content: `You are a game requirements analyst. Extract only what is present or strongly implied. Return strict JSON only.
Use this shape:
{
  "modules": {
    "gameType": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "artStyle": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "gameSetting": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "coreGameplay": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "playerGoal": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "mainChallenge": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "progressionSystem": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "difficultyLevel": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number }
  },
  "background": string|null,
  "missingFields": string[],
  "templateDecision": {
    "templateId": "bullet_hell|roguelike_survival|unsupported",
    "templateLabel": string,
    "genre": string,
    "confidence": number,
    "supported": boolean,
    "reason": string
  },
  "capability": {
    "supported": boolean,
    "blockers": string[],
    "reason": string
  }
}
Treat genre conventions as suggested, not confirmed, unless the user explicitly stated them.
Readable alias note: \u98de\u884c\u5c04\u51fb, \u98de\u673a\u5927\u6218, \u592a\u7a7a\u5c04\u51fb, \u7eb5\u7248\u5c04\u51fb, \u7ad6\u7248\u6253\u98de\u673a, \u5f39\u5e55\u5c04\u51fb map to bullet_hell; \u8089\u9e3d, \u5272\u8349, \u751f\u5b58, \u5438\u8840\u9b3c\u5e78\u5b58\u8005, \u81ea\u52a8\u653b\u51fb, \u5347\u7ea7\u4e09\u9009\u4e00 map to roguelike_survival.
Template mapping:
- Flying shooter, plane shooter, space shooter, vertical shooter, shmup, bullet hell, 飞行射击, 飞机大战, 太空射击, 纵版射击, 竖版打飞机, 弹幕射击 => bullet_hell.
- Roguelike survival, Vampire Survivors-like, arena survival, auto-attack survival, horde survival, 肉鸽, 割草, 幸存者, 自动攻击, 升级三选一 => roguelike_survival.
Unsupported P0 capability includes 3D, multiplayer/networked, MMO, open world, native app, blockchain, or complex backend runtime.`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        selectedModel: getActiveModelMeta(),
                        prompt,
                        currentGameSpec: getCurrentGameSpec(),
                        chatTranscript: getRecentChatTranscript(),
                        optionCatalog: {
                            gameTypes: GAME_TYPES.map(item => item.value),
                            artStyles: ART_STYLES.map(item => item.value),
                            settings: SETTINGS.map(item => item.value),
                            coreGameplay: CORE_GAMEPLAY_OPTIONS.map(item => item.value),
                            playerGoals: PLAYER_GOAL_OPTIONS.map(item => item.value),
                            mainChallenges: MAIN_CHALLENGE_OPTIONS.map(item => item.value),
                            progression: PROGRESSION_OPTIONS.map(item => item.value),
                            difficulty: DIFFICULTY_OPTIONS.map(item => item.value)
                        }
                    }, null, 2)
                }
            ]);

            const parsed = validateAnalysisResponse(parseJsonObjectFromText(response.content, 'MODEL_JSON_PARSE_FAILED'));
            const modules = parsed.modules || parsed;

            applyExtractedModule('type', modules.gameType || parsed.gameType, GAME_TYPES, 'mechanic');
            applyExtractedModule('style', modules.artStyle || parsed.artStyle, ART_STYLES);
            applyExtractedModule('setting', modules.gameSetting || parsed.setting, SETTINGS, 'desc');
            applyExtractedModule('coreGameplay', modules.coreGameplay, CORE_GAMEPLAY_OPTIONS, 'desc');
            applyExtractedModule('playerGoal', modules.playerGoal, PLAYER_GOAL_OPTIONS, 'desc');
            applyExtractedModule('mainChallenge', modules.mainChallenge, MAIN_CHALLENGE_OPTIONS, 'desc');
            applyExtractedModule('progressionSystem', modules.progressionSystem, PROGRESSION_OPTIONS, 'desc');
            applyExtractedModule('difficultyLevel', modules.difficultyLevel, DIFFICULTY_OPTIONS, 'desc');

            analysisState.background = parsed.background || prompt;
            analysisState.templateDecision = normalizeAITemplateDecision(parsed.templateDecision || parsed.template || parsed.decision);
            analysisState.capability = normalizeAICapability(parsed.capability);
            analysisState.missingFields = Array.isArray(parsed.missingFields) ? parsed.missingFields : [];
            analysisState.analysisModelMeta = buildStageModelMeta(response);

            if (!analysisState.setting && parsed.setting) {
                setModuleSelection('setting', {
                    label: parsed.setting,
                    value: parsed.setting,
                    desc: parsed.background || parsed.setting
                }, 'suggested', 0.6, false);
            }

            return true;
        } catch (error) {
            console.warn('AI analysis failed:', error);
            throw error;
        }
    }

    async function refreshAITemplateDecisionForCurrentSpec(stage = 'template_decision') {
        if (!hasLiveAIProvider()) throw createModelNotConfiguredError(stage);
        const spec = getCurrentGameSpec();
        const response = await withTimeout(aiService.stageChat('/api/ai/analyze-game-request', [
            {
                role: 'system',
                content: `You validate the current GameSpec before generation.
Return strict JSON only. The response must include modules, templateDecision, capability, and missingFields.
Do not create a full game plan here.
Template mapping:
- Flying shooter, plane shooter, space shooter, vertical shooter, shmup, bullet hell, \u98de\u884c\u5c04\u51fb, \u98de\u673a\u5927\u6218, \u592a\u7a7a\u5c04\u51fb, \u7eb5\u7248\u5c04\u51fb, \u7ad6\u7248\u6253\u98de\u673a, \u5f39\u5e55\u5c04\u51fb => bullet_hell.
- Roguelike survival, Vampire Survivors-like, arena survival, auto-attack survival, horde survival, \u8089\u9e3d, \u5272\u8349, \u751f\u5b58, \u5438\u8840\u9b3c\u5e78\u5b58\u8005, \u81ea\u52a8\u653b\u51fb, \u5347\u7ea7\u4e09\u9009\u4e00 => roguelike_survival.
Unsupported P0 capability includes 3D, multiplayer/networked, MMO, open world, native app, blockchain, or complex backend runtime.`
            },
            {
                role: 'user',
                content: JSON.stringify({
                    selectedModel: getActiveModelMeta(),
                    currentGameSpec: spec,
                    chatTranscript: getRecentChatTranscript(),
                    allowedTemplates: TEMPLATE_CATALOG
                        .filter(template => AUTO_GENERATION_TEMPLATE_IDS.has(template.id))
                        .map(template => ({
                            id: template.id,
                            label: template.label,
                            keywords: template.keywords,
                            gameplayPillars: template.gameplayPillars
                        }))
                }, null, 2)
            }
        ]), AI_ANALYSIS_TIMEOUT_MS);

        const parsed = validateAnalysisResponse(parseJsonObjectFromText(response.content, 'MODEL_JSON_PARSE_FAILED'));
        const modules = parsed.modules || parsed;
        applyExtractedModule('type', modules.gameType || parsed.gameType, GAME_TYPES, 'mechanic');
        applyExtractedModule('style', modules.artStyle || parsed.artStyle, ART_STYLES);
        applyExtractedModule('setting', modules.gameSetting || parsed.setting, SETTINGS, 'desc');
        applyExtractedModule('coreGameplay', modules.coreGameplay, CORE_GAMEPLAY_OPTIONS, 'desc');
        applyExtractedModule('playerGoal', modules.playerGoal, PLAYER_GOAL_OPTIONS, 'desc');
        applyExtractedModule('mainChallenge', modules.mainChallenge, MAIN_CHALLENGE_OPTIONS, 'desc');
        applyExtractedModule('progressionSystem', modules.progressionSystem, PROGRESSION_OPTIONS, 'desc');
        applyExtractedModule('difficultyLevel', modules.difficultyLevel, DIFFICULTY_OPTIONS, 'desc');
        analysisState.background = parsed.background || spec.background || analysisState.background;
        analysisState.templateDecision = normalizeAITemplateDecision(parsed.templateDecision || parsed.template || parsed.decision);
        analysisState.capability = normalizeAICapability(parsed.capability);
        analysisState.missingFields = Array.isArray(parsed.missingFields) ? parsed.missingFields : [];
        analysisState.analysisModelMeta = buildStageModelMeta(response);
        return analysisState.templateDecision;
    }

    function matchChoice(pool, value, extraKey) {
        if (!value) return null;
        const normalized = String(value).toLowerCase();
        const found = pool.find(item => {
            const label = item.label.toLowerCase().replace(/[^\w\s]/g, '').trim();
            return normalized.includes(item.value.toLowerCase()) || item.value.toLowerCase().includes(normalized) || normalized.includes(label);
        });
        if (found) return found;

        const custom = { label: value, value };
        if (extraKey) custom[extraKey] = value;
        return custom;
    }

    let typingTimeout = null;

    function continueClarification() {
        const nextStep = getNextMissingStep();
        if (nextStep) {
            const definition = getStepDefinition(nextStep);
            askClarification(nextStep, `${getModulePrompt(nextStep)} <span class="highlight-text">${definition.title}</span>`);
            return;
        }

        finalizeAnalysis();
    }

    function askClarification(step, msgHtml) {
        chatStep = step;
        addBotMessage(msgHtml, () => {
        regTimeout(() => renderChatOptions(step), 160);

        // 娓呯悊涔嬪墠鐨勮鏃跺櫒
        if (analysisTimeout) clearTimeout(analysisTimeout);

        // 3s 寤惰繜鍞よ捣 "Inspire Me" 鎸夐挳閫昏緫 (鍏ㄩ噺鍚屾)
        analysisTimeout = regTimeout(() => {
            // 鍙湁鍦ㄧ敤鎴锋病杈撳叆锛屼笖渚濈劧鍋滅暀鍦ㄥ綋鍓嶆楠ゆ椂鎵嶆樉绀?
            if (chatInputField.value.trim() === '' && chatStep === step && !analysisState.revisionMode && chatOptionsList.children.length === 0) {
                showInspireMePrompt(step);
            }
        }, 3000);
        });
    }

    function showInspireMePrompt(step) {
        if (document.getElementById('inspirePromptContainer')) return;

        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.id = 'inspirePromptContainer';
        // Give it a special class to remove bubble background later
        msgDiv.innerHTML = `
            <div class="chat-content-wrap">
                <div class="chat-bubble typing-indicator" id="inspireBubble">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        regTimeout(() => {
            if (!document.getElementById('inspirePromptContainer')) return;
            const bubble = msgDiv.querySelector('#inspireBubble');
            if (bubble) {
                // Remove bubble styling so it looks exactly like the external button
                bubble.className = '';
                bubble.style.padding = '0';
                bubble.style.background = 'transparent';
                bubble.style.boxShadow = 'none';

                bubble.innerHTML = `
                    <div class="inspire-section" style="margin: 0; justify-content: flex-start;">
                        <span class="inspire-text">No idea? Just</span>
                        <button type="button" class="inspire-entry-btn" id="chatInspireBtn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sparkle-icon">
                                <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7l11.4-11.4" opacity="0.3"></path>
                                <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8l15.6-15.6" stroke="currentColor"></path>
                            </svg>
                            Inspire Me
                        </button>
                    </div>
                `;
                chatHistory.scrollTop = chatHistory.scrollHeight;

                const btn = bubble.querySelector('#chatInspireBtn');
                btn.addEventListener('click', () => {
                    if (analysisTimeout) {
                        clearTimeout(analysisTimeout);
                        analysisTimeout = null;
                    }
                    msgDiv.remove();
                    renderChatOptions(step);
                });
            }
        }, 1200);
    }

    function finalizeAnalysis() {
        MODULE_STEPS.slice(1).forEach(step => {
            chatSelections[step.key] = getModuleSelection(step.key);
        });

        askFinalConfirmation();
    }

    function getNextBatch(step) {
        const pool = CHAT_POOLS[step];
        if (!pool || !pool.length) return [];
        let available = pool.map((_, i) => i).filter(i => !chatShown[step].has(i));
        if (available.length < 3) {
            chatShown[step] = new Set(chatCurrent[step]);
            available = pool.map((_, i) => i).filter(i => !chatShown[step].has(i));
        }
        for (let i = available.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [available[i], available[j]] = [available[j], available[i]];
        }
        const picked = available.slice(0, Math.min(3, available.length));
        picked.forEach(i => chatShown[step].add(i));
        chatCurrent[step] = picked;
        return picked.map(i => pool[i]);
    }

    const chatInputField = document.getElementById('chatInputField');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatAttachBtn = document.getElementById('chatAttachBtn');
    const chatFileInput = document.getElementById('chatFileInput');
    const chatAttachmentTray = document.getElementById('chatAttachmentTray');
    const chatMicBtn = document.getElementById('chatMicBtn');
    let chatAttachments = [];
    let speechRecognition = null;
    let isListening = false;
    let voiceBaseValue = '';

    function formatFileSize(size) {
        if (!size) return '0 KB';
        if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }

    function getFileTypeLabel(file) {
        if (file.type && file.type.startsWith('image/')) return 'IMG';
        const extension = file.name.includes('.') ? file.name.split('.').pop().slice(0, 4).toUpperCase() : 'FILE';
        return extension || 'FILE';
    }

    function renderChatAttachments() {
        if (!chatAttachmentTray) return;
        if (!chatAttachments.length) {
            chatAttachmentTray.innerHTML = '';
            chatAttachmentTray.style.display = 'none';
            return;
        }

        chatAttachmentTray.style.display = 'flex';
        chatAttachmentTray.innerHTML = chatAttachments.map((item, index) => {
            const preview = item.previewUrl
                ? `<img class="attachment-thumb" src="${item.previewUrl}" alt="">`
                : `<span class="attachment-thumb">${escapeHtml(getFileTypeLabel(item.file))}</span>`;
            return `
                <div class="attachment-chip" data-index="${index}">
                    ${preview}
                    <span class="attachment-meta">
                        <span class="attachment-name">${escapeHtml(item.file.name)}</span>
                        <span class="attachment-size">${escapeHtml(formatFileSize(item.file.size))}</span>
                    </span>
                    <button type="button" class="attachment-remove" data-index="${index}" aria-label="Remove ${escapeHtml(item.file.name)}">&times;</button>
                </div>
            `;
        }).join('');

        chatAttachmentTray.querySelectorAll('.attachment-remove').forEach(button => {
            button.addEventListener('click', () => {
                const index = Number(button.dataset.index);
                const [removed] = chatAttachments.splice(index, 1);
                if (removed && removed.previewUrl) URL.revokeObjectURL(removed.previewUrl);
                renderChatAttachments();
            });
        });
    }

    function clearChatAttachments({ preserveUrls = false } = {}) {
        if (!preserveUrls) {
            chatAttachments.forEach(item => {
                if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
            });
        }
        chatAttachments = [];
        renderChatAttachments();
        if (chatFileInput) chatFileInput.value = '';
    }

    function getAttachmentPromptSummary(attachments) {
        if (!attachments.length) return '';
        const names = attachments.map(item => `${item.file.name} (${getFileTypeLabel(item.file)}, ${formatFileSize(item.file.size)})`);
        return `Attached files: ${names.join(', ')}`;
    }

    function getRecentChatTranscript(limit = 12) {
        if (!chatHistory) return [];
        return Array.from(chatHistory.querySelectorAll('.chat-message'))
            .slice(-limit)
            .map(item => ({
                role: item.classList.contains('user-message') ? 'user' : 'assistant',
                text: item.textContent.trim().replace(/\s+/g, ' ').slice(0, 800)
            }))
            .filter(item => item.text);
    }

    function handleChatFiles(files) {
        const nextFiles = Array.from(files || []);
        if (!nextFiles.length) return;
        const normalized = nextFiles.map(file => ({
            file,
            previewUrl: file.type && file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
        }));
        const merged = chatAttachments.concat(normalized);
        merged.slice(8).forEach(item => {
            if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        });
        chatAttachments = merged.slice(0, 8);
        renderChatAttachments();
        if (chatInputField) chatInputField.focus();
    }

    function updateChatInputHeight() {
        if (!chatInputField) return;
        chatInputField.style.height = 'auto';
        chatInputField.style.height = `${Math.min(chatInputField.scrollHeight, 250)}px`;
    }

    function getChatInputMaxLength() {
        return Number(chatInputField && chatInputField.maxLength > 0 ? chatInputField.maxLength : 1000);
    }

    function updateChatCount() {
        const countDisplay = document.getElementById('chatCharCount');
        if (!countDisplay || !chatInputField) return;
        const length = chatInputField.value.length;
        const maxLength = getChatInputMaxLength();
        countDisplay.textContent = `${length}/${maxLength}`;
        if (length >= maxLength) {
            countDisplay.style.color = '#ef4444';
        } else if (length >= maxLength * 0.8) {
            countDisplay.style.color = 'var(--accent-yellow)';
        } else if (length >= maxLength * 0.5) {
            countDisplay.style.color = 'rgba(255, 255, 255, 0.6)';
        } else {
            countDisplay.style.color = 'rgba(255, 255, 255, 0.3)';
        }
    }

    function appendVoiceText(text) {
        if (!chatInputField) return;
        const joined = [voiceBaseValue.trim(), text.trim()].filter(Boolean).join(' ');
        chatInputField.value = joined.slice(0, getChatInputMaxLength());
        chatInputField.dispatchEvent(new Event('input'));
    }

    function toggleVoiceInput() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            if (chatMicBtn) {
                chatMicBtn.title = 'Voice input is not supported in this browser.';
                chatMicBtn.setAttribute('aria-pressed', 'false');
            }
            return;
        }

        if (!speechRecognition) {
            speechRecognition = new SpeechRecognition();
            speechRecognition.continuous = false;
            speechRecognition.interimResults = true;
            speechRecognition.lang = navigator.language || 'en-US';
            speechRecognition.onresult = event => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i += 1) {
                    transcript += event.results[i][0].transcript;
                }
                appendVoiceText(transcript);
            };
            speechRecognition.onend = () => {
                isListening = false;
                if (chatMicBtn) chatMicBtn.classList.remove('is-listening');
                if (chatMicBtn) {
                    chatMicBtn.setAttribute('aria-pressed', 'false');
                    chatMicBtn.title = 'Voice input';
                }
            };
            speechRecognition.onerror = () => {
                isListening = false;
                if (chatMicBtn) chatMicBtn.classList.remove('is-listening');
                if (chatMicBtn) {
                    chatMicBtn.setAttribute('aria-pressed', 'false');
                    chatMicBtn.title = 'Voice input';
                }
            };
        }

        if (isListening) {
            isListening = false;
            if (chatMicBtn) {
                chatMicBtn.classList.remove('is-listening');
                chatMicBtn.setAttribute('aria-pressed', 'false');
                chatMicBtn.title = 'Voice input';
            }
            speechRecognition.stop();
            return;
        }

        voiceBaseValue = chatInputField ? chatInputField.value : '';
        isListening = true;
        if (chatMicBtn) {
            chatMicBtn.classList.add('is-listening');
            chatMicBtn.setAttribute('aria-pressed', 'true');
            chatMicBtn.title = 'Stop voice input';
        }
        try {
            speechRecognition.start();
        } catch (error) {
            isListening = false;
            if (chatMicBtn) chatMicBtn.classList.remove('is-listening');
            if (chatMicBtn) {
                chatMicBtn.setAttribute('aria-pressed', 'false');
                chatMicBtn.title = 'Voice input';
            }
        }
    }

    async function processActiveClarification(definition, promptText, pendingMessage = null) {
        try {
            analysisState.processing = true;
            await handleFreeTextForStepWithAI(definition, promptText, (selected, status, confidence) => {
                setModuleSelection(definition.key, selected, status, confidence);
            });
            analysisState.processing = false;
            if (pendingMessage) pendingMessage.remove();
            continueClarification();
        } catch (error) {
            analysisState.processing = false;
            showAIFlowError(error, {
                stage: 'clarification',
                prompt: promptText,
                pendingMessage,
                definitionKey: definition && definition.key,
                clarificationMode: 'active'
            });
        }
    }

    async function processWizardClarification(definition, promptText, pendingMessage = null) {
        try {
            analysisState.processing = true;
            await handleFreeTextForStepWithAI(definition, promptText, selected => {
                chatSelections[definition.key] = selected;
            });
            analysisState.processing = false;
            if (pendingMessage) pendingMessage.remove();
            if (chatStep < MODULE_STEPS.length - 1) {
                chatStep += 1;
                addBotMessage(BOT_MESSAGES[chatStep], () => {
                    regTimeout(() => renderChatOptions(chatStep), 160);
                });
            } else {
                askFinalConfirmation();
            }
        } catch (error) {
            analysisState.processing = false;
            showAIFlowError(error, {
                stage: 'clarification',
                prompt: promptText,
                pendingMessage,
                definitionKey: definition && definition.key,
                clarificationMode: 'wizard'
            });
        }
    }

    function getStepDefinitionByKey(key) {
        return MODULE_STEPS.find(step => step && step.key === key) || null;
    }

    async function processRevisionWithAI(promptText, pendingMessage = null) {
        try {
            if (!hasLiveAIProvider()) throw createModelNotConfiguredError('revision');
            analysisState.processing = true;
            const response = await withTimeout(aiService.stageChat('/api/ai/analyze-game-request', [
                {
                    role: 'system',
                    content: `You revise an existing GameSpec from the user's edited planning text.
Use the edited text as the newest source of truth.
Return strict JSON only with this shape:
{
  "modules": {
    "gameType": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "artStyle": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "gameSetting": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "coreGameplay": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "playerGoal": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "mainChallenge": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "progressionSystem": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number },
    "difficultyLevel": { "status": "confirmed|suggested|missing", "value": string|null, "confidence": number }
  },
  "background": string|null,
  "missingFields": string[],
  "templateDecision": {
    "templateId": "bullet_hell|roguelike_survival|unsupported",
    "templateLabel": string,
    "genre": string,
    "confidence": number,
    "supported": boolean,
    "reason": string
  },
  "capability": {
    "supported": boolean,
    "blockers": string[],
    "reason": string
  }
}
Keep the selected template aligned with broad genre intent, not only exact words.`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        selectedModel: getActiveModelMeta(),
                        currentGameSpec: getCurrentGameSpec(),
                        editedPlanningText: promptText,
                        allowedTemplates: TEMPLATE_CATALOG.map(template => ({
                            id: template.id,
                            label: template.label,
                            keywords: template.keywords,
                            gameplayPillars: template.gameplayPillars
                        }))
                    }, null, 2)
                }
            ]), AI_ANALYSIS_TIMEOUT_MS);

            const parsed = parseJsonObjectFromText(response.content, 'MODEL_JSON_PARSE_FAILED');
            const modules = parsed.modules || parsed;
            applyExtractedModule('type', modules.gameType || parsed.gameType, GAME_TYPES, 'mechanic');
            applyExtractedModule('style', modules.artStyle || parsed.artStyle, ART_STYLES);
            applyExtractedModule('setting', modules.gameSetting || parsed.setting, SETTINGS, 'desc');
            applyExtractedModule('coreGameplay', modules.coreGameplay, CORE_GAMEPLAY_OPTIONS, 'desc');
            applyExtractedModule('playerGoal', modules.playerGoal, PLAYER_GOAL_OPTIONS, 'desc');
            applyExtractedModule('mainChallenge', modules.mainChallenge, MAIN_CHALLENGE_OPTIONS, 'desc');
            applyExtractedModule('progressionSystem', modules.progressionSystem, PROGRESSION_OPTIONS, 'desc');
            applyExtractedModule('difficultyLevel', modules.difficultyLevel, DIFFICULTY_OPTIONS, 'desc');
            analysisState.background = parsed.background || promptText;
            analysisState.templateDecision = normalizeAITemplateDecision(parsed.templateDecision || parsed.template || parsed.decision);
            analysisState.capability = normalizeAICapability(parsed.capability);
            analysisState.missingFields = Array.isArray(parsed.missingFields) ? parsed.missingFields : [];
            analysisState.analysisModelMeta = buildStageModelMeta(response);
            analysisState.revisionMode = false;
            analysisState.active = true;
            analysisState.processing = false;
            if (pendingMessage) pendingMessage.remove();
            askFinalConfirmation();
        } catch (error) {
            analysisState.processing = false;
            showAIFlowError(error, {
                stage: 'revision',
                prompt: promptText,
                pendingMessage
            });
        }
    }

    function handleChatSubmit() {
        const text = chatInputField.value.trim();
        const attachments = chatAttachments.slice();
        const attachmentSummary = getAttachmentPromptSummary(attachments);
        const promptText = [text, attachmentSummary].filter(Boolean).join('\n\n');
        if (!promptText) return;
        const wizardDefinitionBeforeClear = !analysisState.active ? getWizardFreeTextDefinition() : null;

        addUserMessage(text || attachmentSummary, { attachments });
        chatInputField.value = '';
        updateChatInputHeight();
        updateChatCount();
        clearChatAttachments({ preserveUrls: true });

        // 娓呯悊褰撳墠鏄剧ず鐨勯€夐」
        chatOptionsList.innerHTML = '';
        const optContainer = document.getElementById('chatOptionsContainer');
        if (optContainer) optContainer.style.display = 'none';

        if (analysisState.revisionMode) {
            if (analysisState.processing) return;
            const pendingMessage = addBotMessage('', null, { pending: true });
            processRevisionWithAI(promptText, pendingMessage);
            return;
        }

        if (analysisState.active) {
            if (analysisState.processing) return;
            const nextStep = getNextMissingStep();
            const definition = getStepDefinition(nextStep);
            if (definition) {
                const pendingMessage = addBotMessage('', null, { pending: true });
                processActiveClarification(definition, promptText, pendingMessage);
                return;
            }
            continueClarification();
        } else {
            const definition = wizardDefinitionBeforeClear || getWizardFreeTextDefinition();
            if (!definition) {
                savedPrompt = promptText;
                startAnalysisFlow(promptText);
                return;
            }
            if (shouldAnalyzeWizardFreeText(promptText, definition)) {
                savedPrompt = promptText;
                startAnalysisFlow(promptText);
                return;
            }
            const pendingMessage = addBotMessage('', null, { pending: true });
            processWizardClarification(definition, promptText, pendingMessage);
            return;
        }
    }

    function handleAIErrorAction(action, button) {
        if (!action) return;
        if (button) {
            button.disabled = true;
            button.classList.add('selected');
        }

        if (action === 'retry_current_model') {
            const retry = latestAIFlowRetry || {};
            if (retry.stage === 'analysis' && retry.prompt) {
                startAnalysisFlow(retry.prompt);
                return;
            }
            if (retry.stage === 'revision' && retry.prompt) {
                const pendingMessage = addBotMessage('', null, { pending: true });
                processRevisionWithAI(retry.prompt, pendingMessage);
                return;
            }
            if (retry.stage === 'clarification' && retry.prompt && retry.definitionKey) {
                const definition = getStepDefinitionByKey(retry.definitionKey);
                const pendingMessage = addBotMessage('', null, { pending: true });
                if (retry.clarificationMode === 'wizard') {
                    processWizardClarification(definition, retry.prompt, pendingMessage);
                } else {
                    processActiveClarification(definition, retry.prompt, pendingMessage);
                }
                return;
            }
            if (retry.stage === 'compile') {
                composeAndReturn();
                return;
            }
            askFinalConfirmation();
            return;
        }

        if (action === 'switch_model') {
            if (button) button.disabled = false;
            if (modelDropdown && modelSelector) {
                modelDropdown.style.display = 'block';
                modelSelector.setAttribute('aria-expanded', 'true');
            }
            return;
        }

        if (action === 'revise_prompt') {
            if (button) button.disabled = false;
            analysisState.revisionMode = true;
            const retry = latestAIFlowRetry || {};
            const editableText = latestGamePlanDraft || retry.prompt || savedPrompt || buildGameSpecPlainText();
            if (chatInputField) {
                chatInputField.value = editableText;
                chatInputField.style.height = 'auto';
                chatInputField.style.height = chatInputField.scrollHeight + 'px';
                chatInputField.dispatchEvent(new Event('input'));
                chatInputField.focus();
                const len = chatInputField.value.length;
                chatInputField.setSelectionRange(len, len);
            }
            addBotMessage('I put the current request back into the input box. Adjust it and send again.');
            return;
        }

        if (action === 'submit_email') {
            if (button) button.disabled = false;
            if (emailModal) {
                emailModal.style.display = 'flex';
                emailModal.offsetWidth;
                emailModal.classList.add('active');
                if (modalEmailInput) modalEmailInput.focus();
            }
            return;
        }

        if (action === 'open_deployment_guide') {
            if (button) button.disabled = false;
            window.open('docs/backend-deployment.md', '_blank', 'noopener');
        }
    }

    if (chatHistory) {
        chatHistory.addEventListener('click', event => {
            const button = event.target.closest('[data-ai-error-action]');
            if (!button) return;
            handleAIErrorAction(button.dataset.aiErrorAction, button);
        });
    }

    if (chatInputField) {
        chatInputField.addEventListener('input', () => {
            updateChatInputHeight();
            updateChatCount();

            if (chatInputField.value.trim() !== '') {
                clearTimeout(typingTimeout);
                // Remove prompt container if user starts typing
                const promptContainer = document.getElementById('inspirePromptContainer');
                if (promptContainer) {
                    promptContainer.remove();
                }
            }
        });
        chatInputField.addEventListener('keydown', (e) => {
            // Shift + Enter 鎹㈣锛屼粎 Enter 鍙戦€?
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleChatSubmit();
            }
        });
        chatInputField.addEventListener('focus', () => {
            document.querySelector('.chat-input-bar').style.borderColor = 'rgba(124, 93, 250, 0.4)';
        });
        chatInputField.addEventListener('blur', () => {
            document.querySelector('.chat-input-bar').style.borderColor = 'rgba(0,0,0,0.05)';
        });
    }
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', handleChatSubmit);
    }

    if (chatAttachBtn && chatFileInput) {
        chatAttachBtn.addEventListener('click', () => {
            chatAttachBtn.style.transform = 'scale(0.9)';
            setTimeout(() => { chatAttachBtn.style.transform = ''; }, 100);
            chatFileInput.click();
        });
        chatFileInput.addEventListener('change', event => {
            handleChatFiles(event.target.files);
        });
    }

    if (chatMicBtn) {
        chatMicBtn.addEventListener('click', () => {
            chatMicBtn.style.transform = 'scale(0.9)';
            setTimeout(() => { chatMicBtn.style.transform = ''; }, 100);
            toggleVoiceInput();
        });
    }

    const voiceBtn = document.querySelector('.voice-btn');

    [voiceBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => btn.style.transform = '', 100);
                // 杩欓噷鍙互鎵╁睍瀹為檯鍔熻兘锛岀洰鍓嶅厛鍋氳瑙夊弽棣?
            });
        }
    });

    function addBotMessage(text, onRendered, options = {}) {
        cleanupChatModelBadges();
        const startedAt = Date.now();
        const isPending = Boolean(options.pending);
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.innerHTML = `
            <div class="chat-content-wrap">
                <div class="bot-worked-time">works 0m 0s</div>
                <div class="chat-bubble typing-indicator" style="${isPending ? 'display:none;' : ''}">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        const workedTime = msgDiv.querySelector('.bot-worked-time');
        const updateWorkedTime = () => {
            if (workedTime) workedTime.textContent = `works ${formatWorkDuration(Date.now() - startedAt)}`;
        };
        updateWorkedTime();
        const workInterval = setInterval(updateWorkedTime, 1000);
        botWorkIntervals.push(workInterval);

        const finishMessage = finalText => {
            const bubble = msgDiv.querySelector('.chat-bubble');
            if (bubble) {
                bubble.style.display = '';
                bubble.className = 'chat-bubble';
                bubble.innerHTML = finalText;
                clearInterval(workInterval);
                botWorkIntervals = botWorkIntervals.filter(interval => interval !== workInterval);
                updateWorkedTime();
                chatHistory.scrollTop = chatHistory.scrollHeight;
                if (typeof onRendered === 'function') {
                    onRendered(msgDiv);
                }
            }
        };

        const removeMessage = () => {
            clearInterval(workInterval);
            botWorkIntervals = botWorkIntervals.filter(interval => interval !== workInterval);
            msgDiv.remove();
        };

        if (isPending) {
            return {
                element: msgDiv,
                finish: finishMessage,
                remove: removeMessage
            };
        }

        // 妯℃嫙鎬濊€冨拰鎵撳瓧寤惰繜
        regTimeout(() => {
            finishMessage(text);
        }, 1200);

        return {
            element: msgDiv,
            finish: finishMessage,
            remove: removeMessage
        };
    }

    function formatWorkDuration(milliseconds) {
        const totalSeconds = Math.max(1, Math.round(milliseconds / 1000));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}m ${seconds}s`;
    }

    function cleanupChatModelBadges() {
        if (!chatHistory) return;
        chatHistory.querySelectorAll('.bot-model-badge').forEach(badge => badge.remove());
        chatHistory.querySelectorAll('.chat-content-stack').forEach(stack => {
            const bubble = stack.querySelector('.chat-bubble');
            const wrap = stack.closest('.chat-content-wrap');
            if (bubble && wrap) {
                wrap.appendChild(bubble);
                stack.remove();
            }
        });
    }

    function addUserMessage(text, options = {}) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user';
        const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
        const content = options.html ? text : escapeHtml(text);
        const attachments = Array.isArray(options.attachments) ? options.attachments : [];
        if (attachments.length) msgDiv.classList.add('has-attachments');
        const attachmentsHtml = attachments.length ? `
            <div class="message-attachments">
                ${attachments.map(item => {
                    const label = getFileTypeLabel(item.file);
                    const preview = item.previewUrl
                        ? `<img class="message-attachment-thumb" src="${item.previewUrl}" alt="">`
                        : `<span class="message-attachment-thumb">${escapeHtml(label)}</span>`;
                    return `
                        <div class="message-attachment">
                            ${preview}
                            <span class="message-attachment-meta">
                                <span>${escapeHtml(item.file.name)}</span>
                                <small>${escapeHtml(formatFileSize(item.file.size))}</small>
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>
        ` : '';
        msgDiv.innerHTML = `
            <div class="chat-bubble">${content}${attachmentsHtml}</div>
            <div class="chat-time">${timeStr}</div>
        `;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function recordUsage(providerId, modelId, usage) {
        const total = usage.total_tokens || usage.totalTokens || ((usage.prompt_tokens || 0) + (usage.completion_tokens || 0));
        if (!total) return;

        const key = `${providerId}:${modelId}`;
        const cost = estimateCost(providerId, modelId, total);
        aiConfig.usage.totalTokens += total;
        aiConfig.usage.byModel[key] = (aiConfig.usage.byModel[key] || 0) + total;
        aiConfig.usage.byCost[key] = (aiConfig.usage.byCost[key] || 0) + cost;
        aiConfig.usage.estimatedCost += cost;
        saveAIConfig();
        renderUsage();
    }

    function estimateCost(providerId, modelId, tokens) {
        const perMillion = {
            openai: modelId.includes('pro') ? 105 : (modelId.includes('mini') ? 2.625 : 17.5),
            anthropic: modelId.includes('haiku') ? 3 : (modelId.includes('sonnet') ? 9 : 15),
            groq: 1.875,
            gemini: modelId.includes('flash-lite') ? 0.875 : 2.5,
            custom: 0
        };
        return (tokens / 1000000) * (perMillion[providerId] || 0);
    }

    function renderUsage() {
        if (usageTotalTokens) usageTotalTokens.textContent = aiConfig.usage.totalTokens.toLocaleString();
        if (usageEstimatedCost) usageEstimatedCost.textContent = `$${aiConfig.usage.estimatedCost.toFixed(4)}`;
        if (!usageByModelList) return;

        const entries = Object.entries(aiConfig.usage.byModel || {})
            .filter(([, tokens]) => tokens > 0)
            .sort((a, b) => b[1] - a[1]);

        if (!entries.length) {
            usageByModelList.innerHTML = '<div class="usage-empty">No model usage yet.</div>';
            return;
        }

        usageByModelList.innerHTML = entries.map(([key, tokens]) => {
            const separator = key.indexOf(':');
            const providerId = separator >= 0 ? key.slice(0, separator) : aiConfig.activeProvider;
            const modelId = separator >= 0 ? key.slice(separator + 1) : key;
            const meta = PROVIDER_META[providerId] || PROVIDER_META.custom;
            const cost = aiConfig.usage.byCost && aiConfig.usage.byCost[key] ? aiConfig.usage.byCost[key] : estimateCost(providerId, modelId, tokens);
            return `
                <div class="usage-model-row" style="--model-color: ${meta.color};">
                    <span class="usage-model-dot">${meta.icon}</span>
                    <span class="usage-model-name">${escapeHtml(getModelLabel(providerId, modelId))}</span>
                    <span class="usage-model-tokens">${tokens.toLocaleString()} tok</span>
                    <span class="usage-model-cost">$${cost.toFixed(4)}</span>
                </div>
            `;
        }).join('');
    }

    function renderProviderList() {
        if (!providerList) return;
        providerList.innerHTML = '';

        PROVIDER_ORDER.forEach(providerId => {
            const meta = PROVIDER_META[providerId];
            const provider = aiConfig.providers[providerId];
            const btn = document.createElement('button');
            const isReady = hasLiveAIProvider(providerId);
            btn.type = 'button';
            btn.className = `provider-card ${providerId === settingsProviderId ? 'active' : ''} ${isReady ? 'configured' : ''}`;
            btn.style.setProperty('--model-color', meta.color);
            btn.innerHTML = `
                <span class="provider-icon">${meta.icon}</span>
                <span>
                    <strong>${meta.label}</strong>
                    <small>${isReady ? 'Enabled' : 'Disabled'}</small>
                </span>
            `;
            btn.addEventListener('click', () => {
                settingsProviderId = providerId;
                syncProviderEditor();
                renderProviderList();
            });
            providerList.appendChild(btn);
        });
    }

    function syncProviderEditor() {
        const provider = aiConfig.providers[settingsProviderId];
        const meta = PROVIDER_META[settingsProviderId];
        if (!provider || !meta) return;
        if (!providerEnabled || !providerApiKey || !providerBaseUrl || !providerModel || !providerReasoning) return;

        providerEnabled.checked = hasConfiguredProvider(settingsProviderId);
        providerEnabled.disabled = true;
        providerApiKey.value = '';
        providerApiKey.placeholder = 'Configured on backend .env only';
        providerApiKey.disabled = true;
        providerBaseUrl.value = provider.baseUrl || meta.defaultBaseUrl;
        providerBaseUrl.disabled = true;
        providerReasoning.value = provider.reasoningEffort || 'none';

        providerModel.innerHTML = '';
        meta.models.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.label;
            providerModel.appendChild(option);
        });
        providerModel.value = provider.currentModel;

        if (customModelField) customModelField.style.display = settingsProviderId === 'custom' ? 'flex' : 'none';
        if (customModelName) customModelName.value = provider.customModel || '';

        renderUsage();
    }

    function collectProviderEditor() {
        const provider = aiConfig.providers[settingsProviderId];
        const meta = PROVIDER_META[settingsProviderId];
        if (!provider || !meta || !providerEnabled || !providerApiKey || !providerBaseUrl || !providerModel || !providerReasoning) return;
        provider.apiKey = '';
        provider.baseUrl = provider.baseUrl || meta.defaultBaseUrl;
        provider.currentModel = providerModel.value;
        provider.reasoningEffort = providerReasoning.value;
        if (settingsProviderId === 'custom') {
            provider.customModel = customModelName.value.trim();
        }
        aiConfig.activeProvider = settingsProviderId;
    }

    function showSettingsStatus(message, tone = 'info') {
        if (!settingsStatus) return;
        settingsStatus.textContent = message;
        settingsStatus.dataset.tone = tone;
    }

    function updateAdminUI() {
        const isAdmin = Boolean(adminSession && adminSession.isAdmin);
        document.querySelectorAll('.admin-only').forEach(element => {
            element.style.display = isAdmin ? '' : 'none';
        });
        if (adminLoginBtn) {
            adminLoginBtn.textContent = isAdmin ? adminSession.email : 'Google Login';
            adminLoginBtn.classList.toggle('is-admin', isAdmin);
            adminLoginBtn.title = isAdmin ? 'Admin access enabled' : 'Google login for admins';
        }
    }

    function updateModelUI() {
        const active = getActiveModelMeta();
        if (activeModelIcon) activeModelIcon.style.display = 'none';
        if (activeModelName) activeModelName.textContent = active.label;
        if (modelSelector) {
            modelSelector.style.setProperty('--model-color', active.color);
            modelSelector.title = hasLiveAIProvider() ? `Current model: ${active.label}` : getBackendModelStatusMessage();
        }
        if (settingsBtn) {
            settingsBtn.classList.toggle('is-configured', hasLiveAIProvider());
            settingsBtn.title = adminSession.isAdmin
                ? (hasLiveAIProvider() ? `Admin config: using ${active.label}` : 'Admin config: platform AI not configured')
                : 'Admin only';
        }
        renderProviderList();
        renderModelDropdown();
        updateAdminUI();
    }

    function getBackendModelStatusMessage() {
        if (platformModelLoadState === 'config-missing') {
            return 'Static frontend is missing droi-config.json. Deploy the backend and set apiBaseUrl.';
        }
        if (platformModelLoadState === 'backend-unreachable') {
            return 'Backend is unreachable. Check droi-config.json apiBaseUrl, deployment status, and CORS.';
        }
        if (platformModelLoadState === 'backend-error') {
            return platformModelLoadMessage || 'Backend model list failed.';
        }
        if (platformModelLoadState === 'no-models') {
            return 'Backend is connected, but no provider API key is configured.';
        }
        if (platformModelLoadState === 'loading') {
            return 'Loading backend models...';
        }
        return 'Platform AI is not configured.';
    }

    function renderModelDropdown() {
        if (!modelDropdownList) return;
        modelDropdownList.innerHTML = '';

        if (platformModels.length) {
            const groups = platformModels.reduce((acc, modelConfig) => {
                if (!acc[modelConfig.providerId]) acc[modelConfig.providerId] = [];
                acc[modelConfig.providerId].push(modelConfig);
                return acc;
            }, {});
            PROVIDER_ORDER.forEach(providerId => {
                if (!groups[providerId] || !groups[providerId].length) return;
                renderModelGroup(providerId, groups[providerId]);
            });
        } else {
            modelDropdownList.innerHTML = `<div class="model-empty">${escapeHtml(getBackendModelStatusMessage())}</div>`;
        }

        if (!modelDropdownList.children.length) {
            modelDropdownList.innerHTML = '<div class="model-empty">No platform models enabled.</div>';
        }

        if (modelConfigLink) {
            modelConfigLink.style.display = adminSession.isAdmin ? 'flex' : 'none';
        }
    }

    function renderModelGroup(providerId, models) {
        const meta = PROVIDER_META[providerId] || PROVIDER_META.custom;
        const group = document.createElement('div');
        group.className = 'model-provider-group';
        group.style.setProperty('--model-color', meta.color);
        group.innerHTML = `
            <div class="model-provider-heading">
                <span class="model-provider-icon">${escapeHtml(meta.icon)}</span>
                <span>${escapeHtml(meta.label)}</span>
            </div>
        `;

        models.forEach(modelConfig => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'model-option';
            btn.style.setProperty('--model-color', meta.color);
            const modelId = modelConfig.modelId;
            const label = modelConfig.label || getModelLabel(providerId, modelId);
            const active = aiConfig.activeProvider === providerId && getProviderModelId(providerId) === modelId;
            btn.innerHTML = `
                <span>${escapeHtml(label)}</span>
                ${active ? '<small>Active</small>' : ''}
            `;
            btn.addEventListener('click', () => switchActiveModel(providerId, modelId, modelConfig.reasoningEffort));
            group.appendChild(btn);
        });

        modelDropdownList.appendChild(group);
    }

    function switchActiveModel(providerId, modelId, reasoningEffort) {
        const previous = getActiveModelMeta();
        aiConfig.activeProvider = providerId;
        if (!aiConfig.providers[providerId]) return;
        const meta = PROVIDER_META[providerId];
        const knownModel = meta && meta.models.find(model => model.id === modelId);
        aiConfig.providers[providerId].enabled = true;
        aiConfig.providers[providerId].currentModel = modelId;
        aiConfig.providers[providerId].reasoningEffort = reasoningEffort || (knownModel && knownModel.reasoningEffort) || aiConfig.providers[providerId].reasoningEffort || 'none';
        if (providerId === 'custom') aiConfig.providers[providerId].customModel = modelId;
        saveAIConfig();
        updateModelUI();
        closeModelDropdown();
        const next = getActiveModelMeta();
        if (previous.label !== next.label) {
            showModelSwitchNotice(previous.label, next.label);
        }
    }

    function showModelSwitchNotice(previousLabel, nextLabel) {
        if (!modelSwitchNotice) return;
        clearTimeout(modelNoticeTimeout);
        modelSwitchNotice.innerHTML = `
            <strong>Model switched</strong>
            <span>${escapeHtml(previousLabel)} &rarr; ${escapeHtml(nextLabel)}</span>
            <small>Next AI reply will use ${escapeHtml(nextLabel)}.</small>
        `;
        modelSwitchNotice.style.display = 'flex';
        modelSwitchNotice.classList.remove('is-hiding');
        modelNoticeTimeout = setTimeout(() => {
            modelSwitchNotice.classList.add('is-hiding');
            modelNoticeTimeout = setTimeout(() => {
                modelSwitchNotice.style.display = 'none';
                modelSwitchNotice.classList.remove('is-hiding');
            }, 260);
        }, 3600);
    }

    function openSettingsModal(message) {
        if (!settingsModal) return;
        settingsProviderId = aiConfig.activeProvider;
        renderProviderList();
        syncProviderEditor();
        showSettingsStatus(message || (hasLiveAIProvider() ? 'Platform AI config is ready.' : 'Configure provider API keys in backend .env, then restart the backend.'), hasLiveAIProvider() ? 'success' : 'warning');
        settingsModal.style.display = 'flex';
        settingsModal.offsetWidth;
        settingsModal.classList.add('active');
    }

    function closeSettingsModal() {
        if (!settingsModal) return;
        settingsModal.classList.remove('active');
        setTimeout(() => { settingsModal.style.display = 'none'; }, 260);
    }

    function openAdminAuthModal(message) {
        if (!adminAuthModal) return;
        if (adminAuthMessage) {
            adminAuthMessage.textContent = message || 'Google admin login needs the platform auth backend.';
        }
        adminAuthModal.style.display = 'flex';
        adminAuthModal.offsetWidth;
        adminAuthModal.classList.add('active');
    }

    function closeAdminAuthModal() {
        if (!adminAuthModal) return;
        adminAuthModal.classList.remove('active');
        setTimeout(() => { adminAuthModal.style.display = 'none'; }, 260);
    }

    function toggleModelDropdown() {
        if (!modelDropdown || !modelSelector) return;
        const isOpen = modelDropdown.style.display === 'block';
        modelDropdown.style.display = isOpen ? 'none' : 'block';
        modelSelector.setAttribute('aria-expanded', String(!isOpen));
    }

    function closeModelDropdown() {
        if (modelDropdown) modelDropdown.style.display = 'none';
        if (modelSelector) modelSelector.setAttribute('aria-expanded', 'false');
    }

    async function fetchAdminSession() {
        try {
            const response = await fetch(apiUrl('/api/session'), { credentials: 'include' });
            if (!response.ok) return null;
            const data = await response.json();
            googleAuthConfigured = Boolean(data.googleConfigured);
            const email = data.email || (data.user && data.user.email) || '';
            return {
                loggedIn: Boolean(email),
                email,
                isAdmin: Boolean(data.isAdmin) || (data.devAllowlist === true && isAllowedAdminEmail(email))
            };
        } catch (error) {
            return null;
        }
    }

    async function refreshAdminSession() {
        const session = await fetchAdminSession();
        if (session) {
            saveAdminSession(session);
        } else {
            saveAdminSession({ loggedIn: false, email: '', isAdmin: false });
        }
        updateAdminUI();
        return adminSession;
    }

    async function hasAdminAuthBackend() {
        try {
            const response = await fetch(apiUrl('/api/session'), {
                credentials: 'include',
                cache: 'no-store'
            });
            if (response.status === 404) return false;
            const data = await response.json().catch(() => ({}));
            googleAuthConfigured = Boolean(data.googleConfigured);
            return googleAuthConfigured;
        } catch (error) {
            return false;
        }
    }

    function applyExtractedModule(key, extracted, pool, extraKey) {
        const value = extracted && typeof extracted === 'object' && 'value' in extracted ? extracted.value : extracted;
        const status = extracted && typeof extracted === 'object' && extracted.status ? extracted.status : 'confirmed';
        const confidence = extracted && typeof extracted === 'object' && Number.isFinite(Number(extracted.confidence))
            ? Number(extracted.confidence)
            : 0.7;
        if (!value || status === 'missing') return;
        const choice = matchChoice(pool, value, extraKey);
        if (choice) setModuleSelection(key, choice, status === 'confirmed' ? 'confirmed' : 'suggested', confidence, false);
    }

    async function startAdminGoogleLogin() {
        if (adminLoginBtn) {
            adminLoginBtn.disabled = true;
            adminLoginBtn.textContent = 'Checking...';
        }

        const backendAvailable = await hasAdminAuthBackend();
        if (!backendAvailable) {
            if (adminLoginBtn) {
                adminLoginBtn.disabled = false;
                adminLoginBtn.textContent = 'Google Login';
            }
            openAdminAuthModal(`Admin login is not enabled in this P0 backend. Configure provider API keys in backend .env, restart the backend at ${API_BASE_URL || window.location.origin}, and use the public model selector.`);
            return;
        }

        const returnTo = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
        window.location.href = apiUrl(`/auth/google?returnTo=${returnTo}`);
    }

    async function testActiveConnection() {
        if (!adminSession.isAdmin) {
            showSettingsStatus('Admin access is required to test platform providers.', 'warning');
            return;
        }
        collectProviderEditor();
        showSettingsStatus('Testing connection...', 'info');
        try {
            const response = await fetch(apiUrl('/api/admin/ai-config/test'), {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider: settingsProviderId,
                    config: aiConfig.providers[settingsProviderId],
                    model: getProviderModelId(settingsProviderId)
                })
            });

            const result = await parseJsonResponse(response);
            showSettingsStatus(`Connection ok: ${result.provider || settingsProviderId} / ${result.model || getProviderModelId(settingsProviderId)}${result.message ? ` - ${result.message}` : ''}`, 'success');
        } catch (error) {
            const data = error.data || {};
            const meta = PROVIDER_META[settingsProviderId];
            let prefix = 'Connection failed';
            if (error.status === 403) {
                prefix = 'Connection not started: admin access required';
            } else if (error.status === 404) {
                prefix = 'Connection not started: admin backend not found';
            } else if (data.stage === 'credential' || data.stage === 'validation') {
                prefix = 'Connection not started';
            } else if (data.stage === 'provider') {
                prefix = `${meta ? meta.label : settingsProviderId} connection attempted`;
            }
            const upstream = data.upstreamStatus ? ` (provider HTTP ${data.upstreamStatus})` : '';
            showSettingsStatus(`${prefix}${upstream}: ${error.message}`, 'warning');
        }
    }

    function renderOptions(step) {
        chatOptionsList.innerHTML = '';
        const items = getNextBatch(step);
        items.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = item.label;
            btn.addEventListener('click', () => {
                addUserMessage(item.label);
                chatOptionsList.innerHTML = '';

                if (analysisState.active) {
                    const definition = getStepDefinition(step);
                    if (definition) setModuleSelection(definition.key, item);
                    continueClarification();
                } else {
                    const definition = getStepDefinition(step);
                    if (definition) chatSelections[definition.key] = item;

                    if (step < MODULE_STEPS.length - 1) {
                        chatStep++;
                        setTimeout(() => {
                            addBotMessage(BOT_MESSAGES[chatStep], () => {
                                renderOptions(chatStep);
                            });
                        }, 600);
                    } else {
                        askFinalConfirmation();
                    }
                }
            });
            chatOptionsList.appendChild(btn);
        });
    }

    function renderChatOptions(step) {
        const items = getNextBatch(step);
        const container = document.getElementById('chatOptionsContainer');

        // Re-trigger animation
        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = null;

        chatOptionsList.innerHTML = '';
        const isDescriptiveStep = items.some(item => item.desc);

        items.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';

            if (isDescriptiveStep) {
                btn.className = 'quick-tag setting-card';
                btn.innerHTML = `
                    <div class="card-title">${escapeHtml(item.label)}</div>
                    <div class="card-desc">${escapeHtml(item.desc || item.value || '')}</div>
                `;
            } else {
                btn.className = 'quick-tag';
                btn.textContent = item.label;
            }

            btn.style.animationDelay = `${idx * 0.07}s`;
            btn.addEventListener('click', () => onChatOptionClick(step, item, btn));
            chatOptionsList.appendChild(btn);
        });

        chatMoreBtn.style.display = 'inline-flex';
        chatMoreBtn.style.animationDelay = `${items.length * 0.07}s`;

        container.style.display = 'flex';
        chatHistory.appendChild(container);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // 3s 寤惰繜鍞よ捣鐐瑰嚮 (鏍稿績鍚屾閫昏緫)
        regTimeout(() => {
            // 鍙湁鍦ㄥ綋鍓嶆楠ゆ病鍙橈紝涓旀病鍦ㄥ鐞嗕腑锛屼笖涓嶆槸淇妯″紡鏃舵墠瑙﹀彂
            if (analysisState.active && chatStep === step && !analysisState.revisionMode && container.style.display !== 'none') {
                chatMoreBtn.click();
            }
        }, 3000);
    }

    function onChatOptionClick(step, item, btn) {
        // Disable all options
        const allBtns = document.querySelectorAll('#chatOptionsList .quick-tag');
        allBtns.forEach(b => b.style.pointerEvents = 'none');
        btn.classList.add('selected');

        const definition = getStepDefinition(step);
        if (definition) {
            if (analysisState.active) {
                setModuleSelection(definition.key, item);
            } else {
                chatSelections[definition.key] = item;
            }
        }

        regTimeout(() => {
            const container = document.getElementById('chatOptionsContainer');
            container.style.display = 'none';
            chatOptionsList.innerHTML = '';

            if (item.desc) {
                addUserMessage(`<strong>${escapeHtml(item.label)}</strong><br><span style="font-size: 0.9em; opacity: 0.7; display: block; margin-top: 4px; line-height: 1.4;">${escapeHtml(item.desc)}</span>`, { html: true });
            } else {
                addUserMessage(item.label);
            }

            regTimeout(() => {
                if (analysisState.active) {
                    // 鍒嗘瀽娴侊細璋冪敤 continueClarification 缁х画琛ュ叏
                    continueClarification();
                } else if (step < MODULE_STEPS.length - 1) {
                    // 鏍囧噯 Wizard 娴?
                    chatStep = step + 1;
                    addBotMessage(BOT_MESSAGES[chatStep], () => {
                        regTimeout(() => renderChatOptions(chatStep), 160);
                    });
                } else {
                    askFinalConfirmation();
                }
            }, 600);
        }, 300);
    }

    async function askFinalConfirmation() {
        const pendingMessage = addBotMessage('', null, { pending: true });
        try {
            const summaryHtml = await buildGamePlanSummaryHtml();
            if (pendingMessage) pendingMessage.finish(summaryHtml);
            regTimeout(() => {
                addBotMessage("I've collected all the basic information. Ready to generate the game! Shall we start?", () => {
                    regTimeout(renderFinalActionButtons, 160);
                });
            }, 500);
        } catch (error) {
            showAIFlowError(error, {
                stage: 'game_plan',
                prompt: savedPrompt || analysisState.background || '',
                pendingMessage
            });
        }
    }

    async function buildGamePlanSummaryHtml() {
        if (!hasLiveAIProvider()) {
            throw createModelNotConfiguredError('game_plan');
        }

        try {
            const responseModelMeta = getActiveModelMeta();
            let spec = getCurrentGameSpec();
            await refreshAITemplateDecisionForCurrentSpec('template_decision');
            spec = getCurrentGameSpec();
            const decision = matchTemplate(spec);
            if (decision.source !== 'ai') {
                const error = new Error('Template decision must come from the selected AI model before game plan generation.');
                error.code = 'MODEL_SCHEMA_INVALID';
                throw error;
            }
            const templateCapability = getTemplateCapabilitySummary(decision);
            const response = await withTimeout(aiService.stageChat('/api/ai/generate-game-plan', [
                {
                    role: 'system',
                    content: `You are a game design assistant for an AI-first playable game generator.
Return only valid JSON with keys title, hook, storyPremise, coreLoop, momentToMoment, visualDirection, enemyDesign, progressionPlan, playerFantasy, prototypeScope, risk, templateUsage, patchTargets.
Use the selected template capability summary as a hard constraint.
Avoid repeating the same genre/style words mechanically.
Every value must be concrete enough for the next model stage to produce TemplatePatchPlan data.
Keep every value under 54 words.`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        selectedModel: responseModelMeta,
                        gameSpec: spec,
                        templateDecision: decision,
                        capability: analysisState.capability,
                        missingFields: analysisState.missingFields,
                        chatTranscript: getRecentChatTranscript(),
                        templateCapability,
                        expectedGeneratedFiles: templateCapability.outputFiles
                    }, null, 2)
                }
            ]), AI_GAME_PLAN_TIMEOUT_MS);
            const plan = validateGamePlanSummary(parseJsonObjectFromText(response.content, 'MODEL_JSON_PARSE_FAILED'));
            latestGamePlanModelMeta = buildStageModelMeta(response, responseModelMeta);
            analysisState.gamePlanModelMeta = latestGamePlanModelMeta;
            analysisState.finalModelMeta = latestGamePlanModelMeta;
            return buildAISummaryHtml(plan);
        } catch (error) {
            console.warn('AI game plan failed:', error);
            throw error;
        }
    }

    function parseJsonObjectFromText(text, errorCode = 'MODEL_JSON_PARSE_FAILED') {
        try {
            const raw = String(text || '').trim();
            const jsonMatch = raw.match(/\{[\s\S]*\}/);
            return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(raw);
        } catch (error) {
            const wrapped = new Error('The selected model did not return valid JSON.');
            wrapped.code = errorCode;
            wrapped.cause = error;
            throw wrapped;
        }
    }

    function validateAnalysisResponse(parsed) {
        if (!parsed || typeof parsed !== 'object') {
            const error = new Error('AI analysis response must be a JSON object.');
            error.code = 'MODEL_SCHEMA_INVALID';
            throw error;
        }
        const modules = parsed.modules || parsed;
        if (!modules || typeof modules !== 'object') {
            const error = new Error('AI analysis response must include modules or GameSpec fields.');
            error.code = 'MODEL_SCHEMA_INVALID';
            throw error;
        }
        if (!parsed.templateDecision && !parsed.template && !parsed.decision) {
            const error = new Error('AI analysis response must include templateDecision.');
            error.code = 'MODEL_SCHEMA_INVALID';
            throw error;
        }
        return parsed;
    }

    function validateGamePlanSummary(plan) {
        if (!plan || typeof plan !== 'object') {
            const error = new Error('AI game plan must be a JSON object.');
            error.code = 'MODEL_SCHEMA_INVALID';
            throw error;
        }
        const required = ['title', 'hook', 'coreLoop', 'prototypeScope', 'templateUsage', 'patchTargets'];
        const missing = required.filter(key => !plan[key]);
        if (missing.length) {
            const error = new Error(`AI game plan missing required field(s): ${missing.join(', ')}.`);
            error.code = 'MODEL_SCHEMA_INVALID';
            throw error;
        }
        return plan;
    }

    function validateTemplatePatchPlan(plan) {
        if (!plan || typeof plan !== 'object') {
            const error = new Error('TemplatePatchPlan is missing.');
            error.code = 'MODEL_SCHEMA_INVALID';
            throw error;
        }
        if (plan.requiresRuntimeCodePatch === true) {
            const error = new Error('The AI patch requires runtime code changes, which are outside P0 automatic compile scope.');
            error.code = 'PATCH_REQUIRES_RUNTIME_CODE';
            throw error;
        }
        const runtimePatchPath = findTemplatePatchKeyPath(plan, 'requiresRuntimeCodePatch', value => value === true);
        if (runtimePatchPath && runtimePatchPath !== 'requiresRuntimeCodePatch') {
            const error = new Error(`TemplatePatchPlan requires runtime code changes at ${runtimePatchPath}, which P0 compile does not allow.`);
            error.code = 'PATCH_REQUIRES_RUNTIME_CODE';
            throw error;
        }
        const blocked = findForbiddenTemplatePatchKeyPath(plan);
        if (blocked) {
            const error = new Error(`TemplatePatchPlan cannot include direct file patches: ${blocked}.`);
            error.code = 'PATCH_FILE_NOT_ALLOWED';
            throw error;
        }
        if (!plan.gameName || !plan.userIntentSummary || !plan.settingsPatch || !plan.stylePatch || !plan.contentPatch) {
            const error = new Error('TemplatePatchPlan must include gameName, userIntentSummary, settingsPatch, stylePatch, and contentPatch.');
            error.code = 'MODEL_SCHEMA_INVALID';
            throw error;
        }
        return plan;
    }

    function findForbiddenTemplatePatchKeyPath(value) {
        const blockedKeys = new Set(['files', 'filePatches', 'runtimePatch', 'codePatch', 'sourcePatch', 'diff', 'patches']);
        return findTemplatePatchKeyPath(value, key => blockedKeys.has(key));
    }

    function findTemplatePatchKeyPath(value, matcher, valueMatcher = null, pathParts = []) {
        if (!value || typeof value !== 'object') return '';
        if (Array.isArray(value)) {
            for (let index = 0; index < value.length; index += 1) {
                const found = findTemplatePatchKeyPath(value[index], matcher, valueMatcher, pathParts.concat(`[${index}]`));
                if (found) return found;
            }
            return '';
        }
        for (const [key, child] of Object.entries(value)) {
            const keyMatches = typeof matcher === 'function' ? matcher(key) : key === matcher;
            const valueMatches = !valueMatcher || valueMatcher(child);
            const nextPath = pathParts.concat(key).join('.');
            if (keyMatches && valueMatches) return nextPath;
            const found = findTemplatePatchKeyPath(child, matcher, valueMatcher, pathParts.concat(key));
            if (found) return found;
        }
        return '';
    }

    async function generateTemplatePatchPlan(spec, decision) {
        if (!hasLiveAIProvider()) throw createModelNotConfiguredError('template_patch');
        const templateCapability = getTemplateCapabilitySummary(decision);

        const response = await withTimeout(aiService.stageChat('/api/ai/generate-template-patch', [
            {
                role: 'system',
                content: `You generate safe TemplatePatchPlan JSON for a P0 HTML5 Canvas game template.
Return strict JSON only. Do not include markdown.
Required shape:
{
  "gameName": string,
  "userIntentSummary": string,
  "settingsPatch": object,
  "stylePatch": object,
  "contentPatch": object,
  "assetPrompts": object,
  "playabilityChecklist": string[],
  "requiresRuntimeCodePatch": false
}
Never include direct file patches, source code patches, diffs, runtimePatch, files, filePatches, codePatch, sourcePatch, or patches.
For bullet_hell contentPatch should include waves, bosses, enemyTypes, pickups, and projectilePatterns.
For roguelike_survival contentPatch should include waves, enemies, weapons, upgrades, pickups, and balance.
Use templateCapability.outputFiles as the compile target, but do not emit a files/filePatches key.`
            },
            {
                role: 'user',
                content: JSON.stringify({
                    selectedModel: getActiveModelMeta(),
                    gameSpec: spec,
                    templateDecision: decision,
                    templateCapability,
                    chatTranscript: getRecentChatTranscript(),
                    aiGamePlan: latestGamePlanJson || latestGamePlanDraft
                }, null, 2)
            }
        ]), AI_TEMPLATE_PATCH_TIMEOUT_MS);

        const parsed = validateTemplatePatchPlan(parseJsonObjectFromText(response.content, 'MODEL_JSON_PARSE_FAILED'));
        const patchModelMeta = buildStageModelMeta(response);
        latestTemplatePatchPlan = {
            ...parsed,
            aiGenerated: true,
            modelMeta: patchModelMeta
        };
        return latestTemplatePatchPlan;
    }

    function getCurrentGameSpec() {
        return {
            gameType: (chatSelections.type && chatSelections.type.label) || '',
            artStyle: (chatSelections.style && chatSelections.style.label) || '',
            gameSetting: (chatSelections.setting && chatSelections.setting.label) || '',
            background: analysisState.background || (chatSelections.setting && (chatSelections.setting.desc || chatSelections.setting.value)) || '',
            coreGameplay: (chatSelections.coreGameplay && chatSelections.coreGameplay.label) || '',
            playerGoal: (chatSelections.playerGoal && chatSelections.playerGoal.label) || '',
            mainChallenge: (chatSelections.mainChallenge && chatSelections.mainChallenge.label) || '',
            progressionSystem: (chatSelections.progressionSystem && chatSelections.progressionSystem.label) || '',
            difficultyLevel: (chatSelections.difficultyLevel && chatSelections.difficultyLevel.label) || 'Normal',
            outputPackage: {
                mode: 'fixed',
                preview: true,
                exportProjectFolder: true
            }
        };
    }

    function getSpecIntentText(spec = getCurrentGameSpec()) {
        return [
            spec.gameType,
            spec.artStyle,
            spec.gameSetting,
            spec.background,
            spec.coreGameplay,
            spec.playerGoal,
            spec.mainChallenge,
            spec.progressionSystem,
            spec.difficultyLevel
        ].filter(Boolean).join(' ').toLowerCase();
    }

    function detectCapabilityExceeded(text) {
        const intent = String(text || '').toLowerCase();
        const blockers = [
            '3d', 'three.js', 'multiplayer', 'online co-op', 'mmo', 'massive open world',
            'virtual reality', 'augmented reality', 'blockchain', 'nft', 'voice chat', 'networked', 'server authoritative',
            '多人', '联机', '联网', '大型开放世界', '开放世界大地图', '虚拟现实', '增强现实', '区块链', '链游'
        ];
        const hit = blockers.find(term => intent.includes(term));
        return hit ? {
            blocked: true,
            reason: `Capability exceeded: ${hit}`
        } : {
            blocked: false,
            reason: ''
        };
    }

    function matchTemplate(spec = getCurrentGameSpec()) {
        const intent = getSpecIntentText(spec);
        const capability = detectCapabilityExceeded(intent);
        const scored = scoreTemplatesForText(intent).map(template => {
            const hits = template.keywords.filter(keyword => intent.includes(String(keyword).toLowerCase()));
            const directType = String(spec.gameType || '').toLowerCase();
            const directHit = directType && (
                directType.includes(template.type) ||
                directType.includes(template.id.replace(/_/g, ' ')) ||
                directType.includes(template.label.toLowerCase())
            );
            const confidence = Math.min(0.98, template.confidence + (directHit ? 0.18 : 0));
            return {
                ...template,
                confidence,
                hits,
                directHit: Boolean(directHit || template.directHit)
            };
        }).sort((a, b) => (b.confidence - a.confidence) || (b.hits.length - a.hits.length) || Number(b.directHit) - Number(a.directHit));

        const aiDecision = analysisState.templateDecision;
        const aiCapability = analysisState.capability;
        if (aiDecision) {
            const aiTemplate = TEMPLATE_CATALOG.find(template => template.id === aiDecision.templateId);
            const aiBlocked = capability.blocked || (aiCapability && aiCapability.supported === false);
            const aiTemplateAllowed = Boolean(aiTemplate && AUTO_GENERATION_TEMPLATE_IDS.has(aiTemplate.id));
            const canAutoGenerate = Boolean(
                !aiBlocked &&
                aiTemplate &&
                aiTemplateAllowed &&
                aiDecision.supported !== false &&
                aiDecision.confidence >= 0.65
            );
            const reason = aiBlocked
                ? (capability.reason || (aiCapability && aiCapability.reason) || 'Capability exceeded.')
                : (!aiTemplateAllowed && aiTemplate
                    ? `${aiTemplate.label} is not in the current P0 automatic generation whitelist.`
                    : (aiDecision.reason || `AI selected ${aiDecision.templateLabel}.`));
            return {
                canAutoGenerate,
                templateId: aiTemplate ? aiTemplate.id : aiDecision.templateId,
                templateLabel: aiTemplate ? aiTemplate.label : aiDecision.templateLabel,
                confidence: aiDecision.confidence,
                reason,
                fallbackMessage: canAutoGenerate
                    ? ''
                    : (aiBlocked
                        ? 'This request includes features outside the current P0 HTML5 template whitelist. Please leave an email and we will route it to the manual queue.'
                        : (aiTemplate && !aiTemplateAllowed
                            ? 'This template is not wired into the current P0 automatic compiler. Please revise the request to Flying Shooter or Roguelike Survival, or leave an email for manual handling.'
                            : 'The selected AI model did not map this request to a supported P0 template. Please revise the prompt or leave an email for manual handling.')),
                candidates: scored.slice(0, 3),
                source: 'ai',
                capability: aiCapability || capability
            };
        }

        const best = scored[0];
        const bestAllowed = Boolean(best && AUTO_GENERATION_TEMPLATE_IDS.has(best.id));
        const canAutoGenerate = Boolean(!capability.blocked && bestAllowed && best && best.confidence >= 0.7);
        return {
            canAutoGenerate,
            templateId: best ? best.id : null,
            templateLabel: best ? best.label : 'No matching template',
            confidence: best ? best.confidence : 0,
            reason: capability.blocked
                ? capability.reason
                : (!bestAllowed && best && best.confidence >= 0.7
                    ? `${best.label} is recognized but not wired into the current P0 automatic compiler.`
                    : (canAutoGenerate
                ? `Matched ${best.label} from ${best.hits.slice(0, 4).join(', ')}.`
                : 'No P0 template reached the 70% confidence threshold.')),
            fallbackMessage: canAutoGenerate
                ? ''
                : (capability.blocked
                    ? 'This request includes features outside the current P0 HTML5 template whitelist. Please leave an email and we will route it to the manual queue.'
                    : (!bestAllowed && best && best.confidence >= 0.7
                        ? 'This template is recognized but not available in the current P0 automatic compiler. Please revise the request to Flying Shooter or Roguelike Survival, or leave an email for manual handling.'
                        : 'This idea is outside the current automatic template coverage. Please leave an email and we will route it to the manual queue.')),
            candidates: scored.slice(0, 3),
            source: 'local_safety'
        };
    }

    function getTemplateCapabilitySummary(decision = matchTemplate()) {
        const template = TEMPLATE_CATALOG.find(item => item.id === decision.templateId) || null;
        const templateId = template ? template.id : decision.templateId;
        const sharedFiles = [
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
            'assets/manifest.json'
        ];
        const templateNotes = templateId === 'bullet_hell'
            ? [
                'HTML5 Canvas flying shooter or bullet hell template.',
                'Supports movement, focused slow movement, shooting, bombs, projectile patterns, enemy waves, pickups, boss phases, score, HUD, win, fail, pause, and restart.',
                'contentPatch should include player, waves, enemyTypes, bosses, projectilePatterns, pickups, optional balance, optional effects, and optional weapons.'
            ]
            : templateId === 'roguelike_survival'
                ? [
                    'HTML5 Canvas roguelike survival template.',
                    'Supports movement, auto-fire combat, XP pickups, upgrade choices, enemy swarms, elites, timed survival, boss node, health, score, HUD, win, fail, pause, and restart.',
                    'contentPatch should include player, waves, enemies, weapons, upgrades, pickups, balance, and effects.'
                ]
                : [
                    'Unsupported by the current P0 automatic template whitelist.'
                ];

        return {
            templateId,
            templateLabel: template ? template.label : decision.templateLabel,
            sourceArchitecture: template ? template.sourceArchitecture : '',
            specMode: template ? template.specMode : '',
            contentModules: template ? template.contentModules : [],
            gameplayPillars: template ? template.gameplayPillars : [],
            systems: template ? template.systems : [],
            outputFiles: sharedFiles,
            patchAllowlist: [
                'settingsPatch',
                'stylePatch',
                'contentPatch',
                'assetPrompts',
                'playabilityChecklist'
            ],
            forbiddenPatchSurfaces: [
                'runtime source code patches',
                'file diffs',
                'direct file writes',
                'patches outside spec/config/manifest-derived data'
            ],
            notes: templateNotes
        };
    }

    function buildGeneratedGameSpec() {
        throw new Error('Local GameSpec generation is disabled. Use AI TemplatePatchPlan plus backend compile.');
    }

    function buildGenerationPlan() {
        throw new Error('Local generation plans are disabled. Use the AI-first backend compile pipeline.');
    }

    function buildLocalEnhancedPlan() {
        throw new Error('Local enhanced plans are disabled. Use the selected model to generate the game plan.');
    }

    function buildFallbackGamePlanHtml() {
        throw new Error('Local fallback game-plan HTML is disabled. Model failures must show recoverable errors.');
    }

    function buildEnhancedPlanHtml(plan) {
        return [
            '<div class="summary-title">Detailed game concept</div>',
            `<div class="summary-name">${escapeHtml(plan.title)}</div>`,
            `<div class="summary-item"><strong>Hook:</strong> ${escapeHtml(plan.hook)}</div>`,
            `<div class="summary-item"><strong>Story Premise:</strong> ${escapeHtml(plan.storyPremise)}</div>`,
            `<div class="summary-item"><strong>Core Loop:</strong> ${escapeHtml(plan.coreLoop)}</div>`,
            `<div class="summary-item"><strong>Moment-to-Moment:</strong> ${escapeHtml(plan.momentToMoment)}</div>`,
            `<div class="summary-item"><strong>Visual Direction:</strong> ${escapeHtml(plan.visualDirection)}</div>`,
            `<div class="summary-item"><strong>Enemy / Challenge Design:</strong> ${escapeHtml(plan.enemyDesign)}</div>`,
            `<div class="summary-item"><strong>Progression Plan:</strong> ${escapeHtml(plan.progressionPlan)}</div>`,
            `<div class="summary-item"><strong>Player Fantasy:</strong> ${escapeHtml(plan.playerFantasy)}</div>`,
            `<div class="summary-item"><strong>P0 Prototype Scope:</strong> ${escapeHtml(plan.prototypeScope)}</div>`
        ].join('');
    }

    function buildGameSpecItemsHtml(spec = getCurrentGameSpec(), plan = null) {
        const decision = matchTemplate(spec);
        const backgroundDisplay = plan && plan.storyPremise ? plan.storyPremise : spec.background;
        return [
            `<div class="summary-item"><strong>Game Type:</strong> ${escapeHtml(spec.gameType)}</div>`,
            `<div class="summary-item"><strong>Art Style:</strong> ${escapeHtml(spec.artStyle)}</div>`,
            `<div class="summary-item"><strong>Game Setting:</strong> ${escapeHtml(spec.gameSetting)}</div>`,
            `<div class="summary-item"><strong>Background/Story:</strong> ${escapeHtml(backgroundDisplay)}</div>`,
            `<div class="summary-item"><strong>Core Gameplay:</strong> ${escapeHtml(spec.coreGameplay)}</div>`,
            `<div class="summary-item"><strong>Player Goal:</strong> ${escapeHtml(spec.playerGoal)}</div>`,
            `<div class="summary-item"><strong>Main Challenge:</strong> ${escapeHtml(spec.mainChallenge)}</div>`,
            `<div class="summary-item"><strong>Progression System:</strong> ${escapeHtml(spec.progressionSystem)}</div>`,
            `<div class="summary-item"><strong>Difficulty Level:</strong> ${escapeHtml(spec.difficultyLevel)}</div>`,
            `<div class="summary-item"><strong>P0 Template:</strong> ${escapeHtml(decision.templateLabel)} (${Math.round(decision.confidence * 100)}%)</div>`,
            `<div class="summary-item"><strong>Decision:</strong> ${decision.canAutoGenerate ? 'Auto generation ready' : 'Manual queue fallback'}</div>`
        ].join('');
    }

    function buildGameSpecPlainText(spec = getCurrentGameSpec()) {
        const decision = matchTemplate(spec);
        return [
            'GameSpec modules',
            `Game Type: ${spec.gameType}`,
            `Art Style: ${spec.artStyle}`,
            `Game Setting: ${spec.gameSetting}`,
            `Background/Story: ${spec.background}`,
            `Core Gameplay: ${spec.coreGameplay}`,
            `Player Goal: ${spec.playerGoal}`,
            `Main Challenge: ${spec.mainChallenge}`,
            `Progression System: ${spec.progressionSystem}`,
            `Difficulty Level: ${spec.difficultyLevel}`,
            `P0 Template: ${decision.templateLabel} (${Math.round(decision.confidence * 100)}%)`,
            `Decision: ${decision.canAutoGenerate ? 'Auto generation ready' : 'Manual queue fallback'}`
        ].join('\n');
    }

    function buildGamePlanDraftText(plan = null, spec = getCurrentGameSpec()) {
        if (!plan) return buildGameSpecPlainText(spec);

        return [
            'AI game plan',
            `Title: ${plan.title}`,
            `Hook: ${plan.hook}`,
            `Story Premise: ${plan.storyPremise || plan.setting || ''}`,
            `Core Loop: ${plan.coreLoop}`,
            `Moment-to-Moment: ${plan.momentToMoment || ''}`,
            `Visual Direction: ${plan.visualDirection}`,
            `Enemy / Challenge Design: ${plan.enemyDesign || ''}`,
            `Progression Plan: ${plan.progressionPlan || ''}`,
            `Player Fantasy: ${plan.playerFantasy}`,
            `P0 Prototype Scope: ${plan.prototypeScope || ''}`,
            `Template Usage: ${plan.templateUsage || ''}`,
            `Patch Targets: ${Array.isArray(plan.patchTargets) ? plan.patchTargets.join(', ') : (plan.patchTargets || '')}`,
            '',
            buildGameSpecPlainText(spec)
        ].join('\n');
    }

    function buildAISummaryHtml(plan) {
        const safePlan = {
            title: plan.title || 'Untitled Game Concept',
            hook: plan.hook || 'A compact game concept ready for generation.',
            storyPremise: plan.storyPremise || plan.setting || 'A focused premise for the first playable prototype.',
            coreLoop: plan.coreLoop || 'Explore, act, earn feedback, and progress.',
            momentToMoment: plan.momentToMoment || 'The player should make clear short-cycle decisions every few seconds.',
            visualDirection: plan.visualDirection || (chatSelections.style ? chatSelections.style.label : 'A polished, readable game art direction.'),
            enemyDesign: plan.enemyDesign || plan.challengeDesign || 'Challenge rules should be readable and escalate through the session.',
            progressionPlan: plan.progressionPlan || 'Progression should create clear power growth and meaningful upgrade choices.',
            playerFantasy: plan.playerFantasy || 'Step into a clear role and chase a focused goal.',
            prototypeScope: plan.prototypeScope || 'Build one compact playable loop with win, fail, pause, and restart states.',
            templateUsage: plan.templateUsage || '',
            patchTargets: plan.patchTargets || []
        };
        latestGamePlanJson = safePlan;
        latestGamePlanDraft = buildGamePlanDraftText(safePlan);

        return [
            '<div class="selection-summary ai-plan-summary">',
            buildEnhancedPlanHtml(safePlan),
            safePlan.templateUsage
                ? `<div class="summary-item"><strong>Template Usage:</strong> ${escapeHtml(safePlan.templateUsage)}</div>`
                : '',
            Array.isArray(safePlan.patchTargets) && safePlan.patchTargets.length
                ? `<div class="summary-item"><strong>Patch Targets:</strong> ${safePlan.patchTargets.map(item => escapeHtml(String(item))).join(', ')}</div>`
                : (safePlan.patchTargets
                    ? `<div class="summary-item"><strong>Patch Targets:</strong> ${escapeHtml(String(safePlan.patchTargets))}</div>`
                    : ''),
            '<div class="summary-title">Recognized GameSpec modules</div>',
            buildGameSpecItemsHtml(getCurrentGameSpec(), safePlan),
            '</div>'
        ].join('');
    }

    function renderFinalActionButtons() {
        const container = document.getElementById('chatOptionsContainer');
        const list = document.getElementById('chatOptionsList');
        if (!container || !list) return;

        if (chatMoreBtn) chatMoreBtn.style.display = 'none';

        container.style.display = 'flex';
        list.innerHTML = '';

        const createBtn = document.createElement('button');
        createBtn.className = 'chat-action-btn chat-action-primary';
        createBtn.innerHTML = 'Create';
        createBtn.addEventListener('click', () => {
            createBtn.classList.add('selected');
            container.style.display = 'none';
            composeAndReturn();
        });

        const waitBtn = document.createElement('button');
        waitBtn.className = 'chat-action-btn chat-action-edit';
        waitBtn.innerHTML = 'Add More in Chat';
        waitBtn.addEventListener('click', () => {
            waitBtn.classList.add('selected');
            container.style.display = 'none';
            analysisState.revisionMode = true;

            const summaryText = latestGamePlanDraft || buildGamePlanDraftText();

            if (chatInputField) {
                chatInputField.value = summaryText;
                chatInputField.style.height = 'auto';
                chatInputField.style.height = chatInputField.scrollHeight + 'px';
                chatInputField.dispatchEvent(new Event('input'));
                setTimeout(() => {
                    chatInputField.focus();
                    const len = chatInputField.value.length;
                    chatInputField.setSelectionRange(len, len);
                }, 100);
            }
            addBotMessage("Sure! I've filled the summary into the input box. Feel free to edit or add more details!");
        });

        const newIdeaBtn = document.createElement('button');
        newIdeaBtn.className = 'chat-action-btn chat-action-exit';
        newIdeaBtn.innerHTML = 'Exit & New Idea';
        newIdeaBtn.addEventListener('click', () => {
            newIdeaBtn.classList.add('selected');
            container.style.display = 'none';
            resetChat();
        });

        list.appendChild(createBtn);
        list.appendChild(waitBtn);
        list.appendChild(newIdeaBtn);

        chatHistory.appendChild(container);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function buildGeneratedSpecHtml(plan) {
        throw new Error('Local generated preview HTML is disabled. Use backend compiled projects.');
        const generated = plan.generatedSpec;
        const decision = plan.decision;
        return [
            '<div class="generation-result">',
            '<div class="generation-status">Auto generation path</div>',
            '<div class="generation-title">P0 GameSpec ready</div>',
            `<div class="generation-meta"><span>${escapeHtml(decision.templateLabel)}</span><span>${Math.round(decision.confidence * 100)}% match</span></div>`,
            '<div class="playable-shell">',
            '<canvas class="game-preview-canvas" width="640" height="360" tabindex="0" aria-label="Playable generated game preview"></canvas>',
            '<div class="game-preview-panel">',
            `<strong>${escapeHtml(generated.meta.gameName)}</strong>`,
            `<span>${escapeHtml(generated.flow.winCondition.description)}</span>`,
            `<small>${escapeHtml(generated.systems.join(' + '))}</small>`,
            '<div class="game-preview-actions">',
            '<button type="button" class="game-preview-btn" data-game-action="restart">Restart</button>',
            '<button type="button" class="game-preview-btn" data-game-action="pause">Pause</button>',
            '</div>',
            '</div>',
            '</div>',
            `<pre class="spec-code">${escapeHtml(JSON.stringify(generated, null, 2))}</pre>`,
            '</div>'
        ].join('');
    }

    function showAutoGenerationResult(plan) {
        throw new Error('Local auto-generation result rendering is disabled. Use backend compiled projects.');
        addBotMessage(buildGeneratedSpecHtml(plan), msgDiv => {
            const inputArea = document.querySelector('.chat-input-wrapper');
            if (inputArea) inputArea.style.display = '';
            chatHistory.classList.remove('is-generating');
            mountGeneratedGamePreview(msgDiv, plan);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        });
    }

    function mountGeneratedGamePreview(container, plan) {
        throw new Error('Local mounted game preview is disabled. Use backend generated preview iframe.');
        const canvas = container.querySelector('.game-preview-canvas');
        if (!canvas || !plan || !plan.generatedSpec) return;
        const ctx = canvas.getContext('2d');
        const spec = plan.generatedSpec;
        const isTowerDefense = spec.meta.gameType === 'tower-defense';
        const isBulletHell = spec.meta.gameType === 'bullet-hell';
        const keys = new Set();
        let rafId = 0;
        let paused = false;
        let lastTime = performance.now();
        let spawnTimer = 0;
        let attackTimer = 0;
        let enemyShotTimer = 0;

        const base = { x: canvas.width / 2, y: canvas.height / 2, hp: isTowerDefense ? 160 : 0 };
        const player = { x: canvas.width / 2, y: canvas.height / 2, r: 12, hp: spec.player.components.stats.maxHp, speed: spec.player.components.stats.speed };
        const state = { time: 0, score: 0, level: 1, over: false, won: false, enemies: [], bullets: [], enemyBullets: [], towers: [] };

        function resetGame() {
            player.x = canvas.width / 2;
            player.y = canvas.height / 2;
            player.hp = spec.player.components.stats.maxHp;
            base.hp = isTowerDefense ? 160 : 0;
            state.time = 0;
            state.score = 0;
            state.level = 1;
            state.over = false;
            state.won = false;
            state.enemies = [];
            state.bullets = [];
            state.enemyBullets = [];
            state.towers = isTowerDefense
                ? [{ x: 220, y: 180, cd: 0 }, { x: 420, y: 180, cd: 0 }]
                : [];
            spawnTimer = 0;
            attackTimer = 0;
            enemyShotTimer = 0;
            lastTime = performance.now();
            paused = false;
            canvas.focus();
        }

        function spawnEnemy() {
            const edge = Math.floor(Math.random() * 4);
            const pos = [
                { x: -20, y: Math.random() * canvas.height },
                { x: canvas.width + 20, y: Math.random() * canvas.height },
                { x: Math.random() * canvas.width, y: -20 },
                { x: Math.random() * canvas.width, y: canvas.height + 20 }
            ][edge];
            state.enemies.push({
                x: pos.x,
                y: pos.y,
                r: isBulletHell ? 10 : 12,
                hp: isBulletHell ? 22 : 30,
                speed: isTowerDefense ? 44 : (isBulletHell ? 70 : 58),
                cd: Math.random()
            });
        }

        function shootFrom(x, y, tx, ty, hostile = false) {
            const dx = tx - x;
            const dy = ty - y;
            const dist = Math.hypot(dx, dy) || 1;
            const list = hostile ? state.enemyBullets : state.bullets;
            list.push({
                x,
                y,
                vx: dx / dist * (hostile ? 145 : 260),
                vy: dy / dist * (hostile ? 145 : 260),
                r: hostile ? 4 : 5,
                damage: hostile ? 8 : 18,
                life: hostile ? 4 : 2.2
            });
        }

        function nearestEnemy(x, y, range = 220) {
            let best = null;
            let bestDist = range;
            state.enemies.forEach(enemy => {
                const dist = Math.hypot(enemy.x - x, enemy.y - y);
                if (dist < bestDist) {
                    best = enemy;
                    bestDist = dist;
                }
            });
            return best;
        }

        function update(dt) {
            if (paused || state.over) return;
            state.time += dt;
            if (state.time >= 60) {
                state.over = true;
                state.won = true;
            }

            if (!isTowerDefense) {
                const dx = (keys.has('ArrowRight') || keys.has('KeyD') ? 1 : 0) - (keys.has('ArrowLeft') || keys.has('KeyA') ? 1 : 0);
                const dy = (keys.has('ArrowDown') || keys.has('KeyS') ? 1 : 0) - (keys.has('ArrowUp') || keys.has('KeyW') ? 1 : 0);
                const len = Math.hypot(dx, dy) || 1;
                player.x = Math.max(player.r, Math.min(canvas.width - player.r, player.x + dx / len * player.speed * dt));
                player.y = Math.max(player.r, Math.min(canvas.height - player.r, player.y + dy / len * player.speed * dt));
            }

            spawnTimer -= dt;
            if (spawnTimer <= 0) {
                spawnEnemy();
                spawnTimer = Math.max(0.35, isBulletHell ? 0.85 : 1.15 - state.time * 0.006);
            }

            attackTimer -= dt;
            if (!isTowerDefense && attackTimer <= 0) {
                const target = nearestEnemy(player.x, player.y, isBulletHell ? 360 : 160);
                if (target) {
                    if (isBulletHell || keys.has('Space')) {
                        shootFrom(player.x, player.y, target.x, target.y);
                    } else {
                        target.hp -= 16;
                    }
                }
                attackTimer = isBulletHell ? 0.22 : 0.55;
            }

            if (isTowerDefense) {
                state.towers.forEach(tower => {
                    tower.cd -= dt;
                    if (tower.cd <= 0) {
                        const target = nearestEnemy(tower.x, tower.y, 260);
                        if (target) {
                            shootFrom(tower.x, tower.y, target.x, target.y);
                            tower.cd = 0.45;
                        }
                    }
                });
            }

            enemyShotTimer -= dt;
            if (isBulletHell && enemyShotTimer <= 0) {
                state.enemies.slice(0, 8).forEach(enemy => shootFrom(enemy.x, enemy.y, player.x, player.y, true));
                enemyShotTimer = 1.2;
            }

            state.enemies.forEach(enemy => {
                const tx = isTowerDefense ? base.x : player.x;
                const ty = isTowerDefense ? base.y : player.y;
                const dx = tx - enemy.x;
                const dy = ty - enemy.y;
                const dist = Math.hypot(dx, dy) || 1;
                enemy.x += dx / dist * enemy.speed * dt;
                enemy.y += dy / dist * enemy.speed * dt;
                if (dist < enemy.r + (isTowerDefense ? 18 : player.r)) {
                    if (isTowerDefense) {
                        base.hp -= 14;
                    } else {
                        player.hp -= 12;
                    }
                    enemy.hp = 0;
                }
            });

            [state.bullets, state.enemyBullets].forEach(list => {
                list.forEach(bullet => {
                    bullet.x += bullet.vx * dt;
                    bullet.y += bullet.vy * dt;
                    bullet.life -= dt;
                });
            });

            state.bullets.forEach(bullet => {
                state.enemies.forEach(enemy => {
                    if (enemy.hp > 0 && Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.r + bullet.r) {
                        enemy.hp -= bullet.damage;
                        bullet.life = 0;
                    }
                });
            });

            state.enemyBullets.forEach(bullet => {
                if (Math.hypot(player.x - bullet.x, player.y - bullet.y) < player.r + bullet.r) {
                    player.hp -= bullet.damage;
                    bullet.life = 0;
                }
            });

            const before = state.enemies.length;
            state.enemies = state.enemies.filter(enemy => enemy.hp > 0);
            state.score += before - state.enemies.length;
            state.level = 1 + Math.floor(state.score / 8);
            state.bullets = state.bullets.filter(bullet => bullet.life > 0);
            state.enemyBullets = state.enemyBullets.filter(bullet => bullet.life > 0);

            if ((!isTowerDefense && player.hp <= 0) || (isTowerDefense && base.hp <= 0)) {
                state.over = true;
                state.won = false;
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#071018';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'rgba(120,185,255,0.08)';
            for (let x = 0; x < canvas.width; x += 32) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 32) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            if (isTowerDefense) {
                ctx.fillStyle = '#facc15';
                ctx.beginPath(); ctx.arc(base.x, base.y, 20, 0, Math.PI * 2); ctx.fill();
                state.towers.forEach(tower => {
                    ctx.fillStyle = '#42a5ff';
                    ctx.fillRect(tower.x - 12, tower.y - 12, 24, 24);
                });
            } else {
                ctx.fillStyle = '#88f3d2';
                ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2); ctx.fill();
            }

            state.enemies.forEach(enemy => {
                ctx.fillStyle = isBulletHell ? '#42a5ff' : '#ff6b6b';
                ctx.beginPath(); ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2); ctx.fill();
            });
            state.bullets.forEach(bullet => {
                ctx.fillStyle = '#facc15';
                ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2); ctx.fill();
            });
            state.enemyBullets.forEach(bullet => {
                ctx.fillStyle = '#ff5fd2';
                ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2); ctx.fill();
            });

            ctx.fillStyle = 'rgba(5,8,12,0.72)';
            ctx.fillRect(12, 12, 265, 64);
            ctx.fillStyle = '#fff';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText(`Time ${Math.floor(state.time)}s / Score ${state.score} / Lv ${state.level}`, 24, 36);
            ctx.fillText(isTowerDefense ? `Base HP ${Math.max(0, Math.floor(base.hp))}` : `HP ${Math.max(0, Math.floor(player.hp))}`, 24, 58);
            ctx.fillStyle = 'rgba(255,255,255,0.62)';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(isTowerDefense ? 'Auto towers defend the base' : 'WASD/Arrows move, Space fires', 360, 30);

            if (state.over) {
                ctx.fillStyle = 'rgba(0,0,0,0.62)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = state.won ? '#88f3d2' : '#ff8b8b';
                ctx.font = 'bold 28px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(state.won ? 'Prototype Cleared' : 'Run Failed', canvas.width / 2, canvas.height / 2 - 8);
                ctx.fillStyle = '#fff';
                ctx.font = '14px Inter, sans-serif';
                ctx.fillText('Press Restart to run again', canvas.width / 2, canvas.height / 2 + 24);
                ctx.textAlign = 'left';
            }
        }

        function loop(now) {
            const dt = Math.min(0.033, (now - lastTime) / 1000);
            lastTime = now;
            update(dt);
            draw();
            rafId = requestAnimationFrame(loop);
        }

        const onKeyDown = event => {
            keys.add(event.code);
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) event.preventDefault();
        };
        const onKeyUp = event => keys.delete(event.code);
        const onCanvasClick = event => {
            canvas.focus();
            if (isTowerDefense && state.towers.length < 6) {
                const rect = canvas.getBoundingClientRect();
                state.towers.push({
                    x: (event.clientX - rect.left) / rect.width * canvas.width,
                    y: (event.clientY - rect.top) / rect.height * canvas.height,
                    cd: 0
                });
            }
        };

        const restartBtn = container.querySelector('[data-game-action="restart"]');
        const pauseBtn = container.querySelector('[data-game-action="pause"]');
        if (restartBtn) restartBtn.addEventListener('click', resetGame);
        if (pauseBtn) pauseBtn.addEventListener('click', () => {
            paused = !paused;
            pauseBtn.textContent = paused ? 'Resume' : 'Pause';
            canvas.focus();
        });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        canvas.addEventListener('click', onCanvasClick);

        const cleanup = () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            canvas.removeEventListener('click', onCanvasClick);
        };
        activeGameCleanups.push(cleanup);
        resetGame();
        rafId = requestAnimationFrame(loop);
    }

    async function compileTemplateProject(spec, decision, templatePatchPlan) {
        if (!hasLiveAIProvider()) throw createModelNotConfiguredError('compile');

        const response = await withTimeout(fetch(apiUrl('/api/template-project/compile'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                gameSpec: spec,
                templateDecision: decision,
                selectedModel: getActiveModelMeta(),
                analysisModelMeta: analysisState.analysisModelMeta,
                gamePlanModelMeta: latestGamePlanModelMeta,
                aiPlanDraft: latestGamePlanDraft,
                aiPlanJson: latestGamePlanJson,
                templatePatchPlan
            })
        }), TEMPLATE_COMPILE_TIMEOUT_MS);

        if ([404, 405, 501].includes(response.status)) {
            throw createTemplateCompileUnavailableError();
        }

        const data = await parseJsonResponse(response);
        const project = data.project || data;
        if (!project || typeof project !== 'object') {
            const error = new Error('Template compiler did not return a project payload.');
            error.code = 'TEMPLATE_COMPILE_FAILED';
            throw error;
        }
        if (project.validationReport && project.validationReport.ok === false) {
            const error = new Error('Template compiler returned a failed validation report.');
            error.code = 'TEMPLATE_COMPILE_FAILED';
            error.validationReport = project.validationReport;
            error.generationReport = project.generationReport || null;
            throw error;
        }
        latestCompiledProject = project;
        return project;
    }

    function buildCompiledProjectHtml(project, decision) {
        const files = Array.isArray(project.files) ? project.files : [];
        const validation = project.validationReport || {};
        const checks = Array.isArray(validation.checks) ? validation.checks : [];
        const trace = project.generationReport || {};
        const traceModel = trace.selectedModel || {};
        const traceStages = trace.stages || {};
        const previewUrl = resolveBackendUrl(project.previewUrl || project.url || '');

        return [
            '<div class="generation-result compiled-project-result">',
            '<div class="generation-status">AI template compile path</div>',
            `<div class="generation-title">${escapeHtml(project.name || project.gameName || 'Playable project ready')}</div>`,
            `<div class="generation-meta"><span>${escapeHtml(decision.templateLabel || 'Template')}</span><span>${escapeHtml(getActiveModelMeta().label)}</span></div>`,
            trace.aiFirst
                ? [
                    '<div class="summary-title">Generation trace</div>',
                    `<div class="summary-item"><strong>AI-first:</strong> ${trace.aiGenerated ? 'true' : 'false'}</div>`,
                    `<div class="summary-item"><strong>Selected model:</strong> ${escapeHtml(traceModel.label || getActiveModelMeta().label)}</div>`,
                    traceStages.analysis && traceStages.analysis.modelMeta
                        ? `<div class="summary-item"><strong>Analysis model:</strong> ${escapeHtml(traceStages.analysis.modelMeta.label || '')}</div>`
                        : '',
                    traceStages.gamePlan && traceStages.gamePlan.modelMeta
                        ? `<div class="summary-item"><strong>Game plan model:</strong> ${escapeHtml(traceStages.gamePlan.modelMeta.label || '')}</div>`
                        : '',
                    traceStages.templatePatch && traceStages.templatePatch.modelMeta
                        ? `<div class="summary-item"><strong>Patch model:</strong> ${escapeHtml(traceStages.templatePatch.modelMeta.label || '')}</div>`
                        : '',
                    `<div class="summary-item"><strong>Template:</strong> ${escapeHtml(trace.templateId || decision.templateId || '')}</div>`,
                    `<div class="summary-item"><strong>Stages:</strong> ${['analysis', 'gamePlan', 'templatePatch', 'compile'].filter(stage => traceStages[stage]).join(' -> ')}</div>`
                ].join('')
                : '',
            files.length
                ? `<div class="summary-title">Generated files</div><div class="compiled-file-list">${files.map(file => `<span>${escapeHtml(String(file))}</span>`).join('')}</div>`
                : '<div class="summary-item">The compiler did not return a file list.</div>',
            checks.length
                ? `<div class="summary-title">Validation report</div>${checks.map(check => `<div class="summary-item"><strong>${escapeHtml(check.ok === false ? 'Needs review' : 'Pass')}:</strong> ${escapeHtml(check.label || check.message || String(check))}</div>`).join('')}`
                : '',
            previewUrl
                ? `<iframe class="compiled-preview-frame" src="${escapeHtml(previewUrl)}" title="Playable generated game preview"></iframe>`
                : '<div class="summary-item">No preview URL was returned by the compiler.</div>',
            '</div>'
        ].join('');
    }

    async function composeAndReturn() {
        let spec = getCurrentGameSpec();
        let decision = matchTemplate(spec);
        savedPrompt = `Your Concept: ${spec.background}
Game Type: ${spec.gameType}
Art Style: ${spec.artStyle}
Setting: ${spec.gameSetting}
Core Gameplay: ${spec.coreGameplay}
Player Goal: ${spec.playerGoal}
Main Challenge: ${spec.mainChallenge}
Progression System: ${spec.progressionSystem}
Difficulty Level: ${spec.difficultyLevel}
P0 Template Decision: ${decision.canAutoGenerate ? 'auto' : 'fallback'}
Template: ${decision.templateLabel}
Confidence: ${Math.round(decision.confidence * 100)}%
Decision Source: ${decision.source || 'unknown'}`;

        // 鐩存帴杩涘叆鐢熸垚娴佺▼锛屾枃妗堝凡鍦?askFinalConfirmation 涓睍绀鸿繃
        const pendingMessage = addBotMessage('', null, { pending: true });
        try {
            if (decision.source !== 'ai') {
                await refreshAITemplateDecisionForCurrentSpec('template_decision');
                spec = getCurrentGameSpec();
                decision = matchTemplate(spec);
            }
            if (decision.source !== 'ai') {
                const error = new Error('Template decision must come from the selected AI model before template patch generation.');
                error.code = 'MODEL_SCHEMA_INVALID';
                throw error;
            }
            if (!decision.canAutoGenerate) {
                const error = new Error(decision.fallbackMessage || 'This request is outside the current automatic template coverage.');
                error.code = 'TEMPLATE_COMPILE_FAILED';
                throw error;
            }
            const templatePatchPlan = await generateTemplatePatchPlan(spec, decision);
            const project = await compileTemplateProject(spec, decision, templatePatchPlan);
            if (pendingMessage) pendingMessage.finish(buildCompiledProjectHtml(project, decision));
        } catch (error) {
            showAIFlowError(error, {
                stage: 'compile',
                prompt: savedPrompt,
                pendingMessage
            });
        }
    }

    function clearChatTimers() {
        if (generationInterval) {
            clearInterval(generationInterval);
            generationInterval = null;
        }
        generationTimeouts.forEach(clearTimeout);
        generationTimeouts = [];
        botWorkIntervals.forEach(clearInterval);
        botWorkIntervals = [];
        activeGameCleanups.forEach(cleanup => cleanup());
        activeGameCleanups = [];
        latestTemplatePatchPlan = null;
        latestCompiledProject = null;
        latestGamePlanModelMeta = null;

        if (analysisTimeout) {
            clearTimeout(analysisTimeout);
            analysisTimeout = null;
        }

        if (typingTimeout) {
            clearTimeout(typingTimeout);
            typingTimeout = null;
        }
    }

    function resetProgressUI() {
        if (!progressContainer) return;

        if (mainHero && progressContainer.parentElement !== mainHero) {
            mainHero.appendChild(progressContainer);
        }

        progressContainer.style.display = 'none';
        if (progressBarFill) progressBarFill.style.width = '0%';
        if (progressText) progressText.textContent = '0%';
        if (progressMessage) progressMessage.style.display = 'none';
        if (progressBarBg) progressBarBg.style.display = 'block';

        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active', 'completed');
        });
    }

    function resetChatStateOnly() {
        clearChatTimers();
        resetProgressUI();

        chatStep = 1;
        chatSelections = createEmptySelections();
        chatShown = createChatTracking(() => new Set());
        chatCurrent = createChatTracking(() => []);
        latestGamePlanDraft = '';
        latestGamePlanJson = null;
        latestGamePlanModelMeta = null;
        analysisState = {
            active: false,
            ...createEmptySelections(),
            background: null,
            processing: false,
            revisionMode: false,
            finalModelMeta: null,
            analysisModelMeta: null,
            gamePlanModelMeta: null,
            workStartedAt: 0,
            modules: createModuleStates()
        };

        chatHistory.innerHTML = '';
        chatHistory.classList.remove('is-generating');
        chatOptionsList.innerHTML = '';

        const optContainer = document.getElementById('chatOptionsContainer');
        if (optContainer) optContainer.style.display = 'none';
        if (chatMoreBtn) chatMoreBtn.style.display = 'inline-flex';

        if (chatInputField) {
            chatInputField.value = '';
            chatInputField.style.height = 'auto';
        }
        clearChatAttachments();

        const countDisplay = document.getElementById('chatCharCount');
        if (countDisplay) {
            countDisplay.textContent = `0/${getChatInputMaxLength()}`;
            countDisplay.style.color = 'rgba(255, 255, 255, 0.3)';
        }

        const chatInputWrapper = document.querySelector('.chat-input-wrapper');
        if (chatInputWrapper) chatInputWrapper.style.display = '';
        if (modelSwitchNotice) {
            modelSwitchNotice.style.display = 'none';
            modelSwitchNotice.classList.remove('is-hiding');
        }
    }

    function openChatView() {
        mainHero.style.display = 'none';
        inspireView.style.display = 'flex';

        if (successStateContainer) successStateContainer.style.display = 'none';
        if (form) form.style.display = 'flex';

        resetChatStateOnly();
    }

    function openInspireView() {
        openChatView();

        // Initial chat flow
        regTimeout(() => {
            addBotMessage("Hey there! What kind of game do you want to create?", () => {
                regTimeout(() => {
                addUserMessage("Inspire me!");
                regTimeout(() => {
                    askClarification(1, BOT_MESSAGES[1]);
                }, 800);
                }, 350);
            });
        }, 400);
    }

    function openCreateChatView(prompt) {
        openChatView();
        addUserMessage(prompt);
        startAnalysisFlow(prompt);
        regTimeout(() => { if (chatInputField) chatInputField.focus(); }, 500);
    }

    // Event Listeners
    if (inspireEntryBtn) {
        inspireEntryBtn.addEventListener('click', openInspireView);
    }

    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', resetChat);
    }

    if (chatMoreBtn) {
        let moreThrottle = false;
        chatMoreBtn.addEventListener('click', () => {
            if (moreThrottle) return;
            moreThrottle = true;
            chatMoreBtn.classList.add('spinning');
            setTimeout(() => {
                chatMoreBtn.classList.remove('spinning');
                moreThrottle = false;
            }, 420);
            renderChatOptions(chatStep);
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (!adminSession.isAdmin) return;
            openSettingsModal();
        });
    }

    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettingsModal);
    }

    if (settingsModal) {
        settingsModal.addEventListener('click', (event) => {
            if (event.target === settingsModal) closeSettingsModal();
        });
    }

    if (adminAuthModal) {
        adminAuthModal.addEventListener('click', (event) => {
            if (event.target === adminAuthModal) closeAdminAuthModal();
        });
    }

    if (closeAdminAuthBtn) {
        closeAdminAuthBtn.addEventListener('click', closeAdminAuthModal);
    }

    if (retryAdminAuthBtn) {
        retryAdminAuthBtn.addEventListener('click', () => {
            closeAdminAuthModal();
            startAdminGoogleLogin();
        });
    }

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', async () => {
            if (adminSession.isAdmin) {
                openSettingsModal('Admin access enabled. Manage platform model routing here.');
                return;
            }
            await startAdminGoogleLogin();
        });
    }

    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', async () => {
            if (!adminSession.isAdmin) return;
            const previous = getActiveModelMeta();
            collectProviderEditor();
            const result = await saveAdminAIConfig();
            updateModelUI();
            const next = getActiveModelMeta();
            if (previous.label !== next.label) {
                showModelSwitchNotice(previous.label, next.label);
            }
            const target = result.persisted === 'server' ? 'platform' : 'local preview';
            showSettingsStatus(`Admin config saved to ${target}. Next AI reply will use the selected platform model.`, hasLiveAIProvider() ? 'success' : 'warning');
        });
    }

    if (testConnectionBtn) {
        testConnectionBtn.addEventListener('click', testActiveConnection);
    }

    if (clearProviderBtn) {
        clearProviderBtn.addEventListener('click', () => {
            if (!adminSession.isAdmin) return;
            aiConfig.providers[settingsProviderId].apiKey = '';
            providerApiKey.value = '';
            saveAIConfig();
            updateModelUI();
            showSettingsStatus('API key cleared for this provider.', 'warning');
        });
    }

    if (providerModel) {
        providerModel.addEventListener('change', () => {
            if (!adminSession.isAdmin) return;
            const previous = getActiveModelMeta();
            collectProviderEditor();
            saveAIConfig();
            updateModelUI();
            const next = getActiveModelMeta();
            if (previous.label !== next.label) {
                showModelSwitchNotice(previous.label, next.label);
            }
        });
    }

    if (providerReasoning) {
        providerReasoning.addEventListener('change', () => {
            if (!adminSession.isAdmin) return;
            const previous = getActiveModelMeta();
            collectProviderEditor();
            saveAIConfig();
            updateModelUI();
            if (settingsProviderId === aiConfig.activeProvider) {
                const next = getActiveModelMeta();
                if (previous.label !== next.label) {
                    showModelSwitchNotice(previous.label, next.label);
                }
            }
        });
    }

    if (modelSelector) {
        modelSelector.addEventListener('click', toggleModelDropdown);
    }

    if (modelConfigLink) {
        modelConfigLink.addEventListener('click', () => {
            if (!adminSession.isAdmin) return;
            closeModelDropdown();
            openSettingsModal();
        });
    }

    document.addEventListener('click', (event) => {
        if (!modelDropdown || !modelSelector) return;
        if (!modelDropdown.contains(event.target) && !modelSelector.contains(event.target)) {
            closeModelDropdown();
        }
    });

    // Modal & Success State Elements
    const emailModal = document.getElementById('emailModal');
    const emailSubmitForm = document.getElementById('emailSubmitForm');
    const modalEmailInput = document.getElementById('modalEmailInput');
    const modalEmailSubmitBtn = document.getElementById('modalEmailSubmitBtn');
    const closeEmailModalBtn = document.getElementById('closeEmailModalBtn');

    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const successStateContainer = document.getElementById('successStateContainer');
    const newIdeaBtn = document.getElementById('newIdeaBtn');

    // Sidebar Elements
    const historySidebar = document.getElementById('historySidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const historyList = document.getElementById('historyList');
    const joinedCountEl = document.getElementById('joinedCount');

    let currentMode = 'prompt'; // 'prompt' or 'email'
    let savedPrompt = ''; // Store the user's prompt

    // Initialize Joined Count
    let currentJoinedCount = parseInt(localStorage.getItem('droi_ai_joined_count') || '842', 10);
    if (joinedCountEl) {
        joinedCountEl.textContent = `${currentJoinedCount} people`;
    }

    // Sidebar Toggle
    sidebarToggle.addEventListener('click', () => {
        historySidebar.classList.toggle('open');
    });

    // Sidebar Close Button (mobile)
    const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', () => {
            historySidebar.classList.remove('open');
        });
    }

    // Local Storage Logic
    function loadHistory() {
        const historyData = JSON.parse(localStorage.getItem('droi_ai_history') || '[]');
        historyList.innerHTML = '';
        if (historyData.length === 0) {
            historyList.innerHTML = '<div style="color: #6b6972; font-size: 0.875rem; text-align: center; margin-top: 2rem;">No previous inspirations found.</div>';
            return;
        }

        historyData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div class="history-item-date">${new Date(item.timestamp).toLocaleString()}</div>
                <div class="history-item-text">${item.text}</div>
                <button class="history-delete-btn" aria-label="Delete history">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;

            // Item click to populate prompt
            div.addEventListener('click', () => {
                // ALWAYS reset state first to ensure loop closure
                resetChat();

                mainInput.value = item.text;
                historySidebar.classList.remove('open');

                // Trigger auto-resize if applicable
                mainInput.dispatchEvent(new Event('input'));
            });

            // Delete button click
            const deleteBtn = div.querySelector('.history-delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent item click
                historyData.splice(index, 1);
                localStorage.setItem('droi_ai_history', JSON.stringify(historyData));
                loadHistory(); // Reload UI
            });

            historyList.appendChild(div);
        });
    }

    function saveToHistory(text) {
        if (!text) return;
        const historyData = JSON.parse(localStorage.getItem('droi_ai_history') || '[]');
        historyData.unshift({ text: text, timestamp: Date.now() });
        if (historyData.length > 20) historyData.pop();
        localStorage.setItem('droi_ai_history', JSON.stringify(historyData));
        loadHistory();
    }

    function buildManualQueueContext(email) {
        const spec = getCurrentGameSpec();
        const decision = matchTemplate(spec);
        const visibleMessages = chatHistory
            ? Array.from(chatHistory.querySelectorAll('.chat-message')).slice(-12).map(item => item.textContent.trim().replace(/\s+/g, ' ').slice(0, 800))
            : [];
        return {
            submittedAt: new Date().toISOString(),
            email,
            prompt: savedPrompt,
            currentModel: getActiveModelMeta(),
            publicAIConfig: createPublicAIConfigSnapshot(),
            gameSpec: spec,
            templateDecision: decision,
            capability: analysisState.capability,
            missingFields: analysisState.missingFields,
            aiGamePlanDraft: latestGamePlanDraft,
            aiGamePlanJson: latestGamePlanJson,
            analysisModelMeta: analysisState.analysisModelMeta,
            gamePlanModelMeta: latestGamePlanModelMeta,
            templatePatchPlan: latestTemplatePatchPlan,
            compiledProject: latestCompiledProject ? {
                id: latestCompiledProject.id,
                name: latestCompiledProject.name,
                templateId: latestCompiledProject.templateId,
                previewUrl: latestCompiledProject.previewUrl,
                files: latestCompiledProject.files || [],
                validationReport: latestCompiledProject.validationReport || null,
                generationReport: latestCompiledProject.generationReport || null
            } : null,
            generatedFiles: latestCompiledProject && Array.isArray(latestCompiledProject.files) ? latestCompiledProject.files : [],
            validationReport: (latestCompiledProject && latestCompiledProject.validationReport) ||
                (latestAIFlowError && latestAIFlowError.validationReport) ||
                null,
            generationReport: (latestCompiledProject && latestCompiledProject.generationReport) ||
                (latestAIFlowError && latestAIFlowError.generationReport) ||
                null,
            lastError: latestAIFlowError,
            chatTranscript: visibleMessages
        };
    }

    async function submitManualQueue(email) {
        const context = buildManualQueueContext(email);
        let response;
        try {
            response = await fetch(apiUrl('/api/waitlist'), {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    prompt: savedPrompt,
                    context
                })
            });
        } catch (error) {
            throw new Error('Manual queue backend is unavailable. Please try again after the server is running.');
        }

        if (response.ok) {
            return { ok: true, target: 'backend', context };
        }

        let message = 'Manual queue submission failed.';
        try {
            const data = await response.json();
            message = (data && (data.message || data.error)) || message;
        } catch (error) {
            // Keep the generic message when the backend did not return JSON.
        }
        throw new Error(message);
    }

    // Initialize History
    loadHistory();
    cleanupChatModelBadges();
    renderProviderList();
    syncProviderEditor();
    updateModelUI();
    loadRuntimeConfig().finally(() => {
        loadPlatformModels();
        refreshAdminSession();
    });

    // Modal Close Logic -> Transition to Success State
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        setTimeout(() => {
            successModal.style.display = 'none';
            // Only show legacy success state if we are NOT in the chat view
            if (inspireView.style.display !== 'flex') {
                // Hide previous elements
                form.style.display = 'none';
                if (progressContainer) progressContainer.style.setProperty('display', 'none', 'important');
                backToPromptBtn.style.display = 'none';
                // Show new success state
                successStateContainer.style.display = 'flex';
            }
        }, 300); // match CSS transition
    });

    // Email Modal Submit Logic
    if (emailSubmitForm) {
        emailSubmitForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = modalEmailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            modalEmailSubmitBtn.disabled = true;
            modalEmailSubmitBtn.textContent = 'Sending...';

            try {
                    await submitManualQueue(email);
                    modalEmailSubmitBtn.disabled = false;
                    modalEmailSubmitBtn.textContent = 'Send to Email';

                    currentJoinedCount++;
                    const joinedCountEl = document.getElementById('joinedCount');
                    if (joinedCountEl) joinedCountEl.textContent = `${currentJoinedCount} people`;
                    localStorage.setItem('droi_ai_joined_count', currentJoinedCount.toString());

                    // Hide email modal
                    emailModal.classList.remove('active');
                    setTimeout(() => { emailModal.style.display = 'none'; }, 300);

                    // Show success modal
                    if (successModal) {
                        successModal.style.display = 'flex';
                        successModal.offsetWidth;
                        successModal.classList.add('active');
                    }

                    // Append bot messages
                    addBotMessage("All systems go! Your game assets and logic are finalized. We'll send it to your inbox within 15 working days");
                    addBotMessage("Would you like to explore another creative spark?");

                    const msgDiv = document.createElement('div');
                    msgDiv.className = 'chat-message bot';
                    msgDiv.innerHTML = `
                        <div class="chat-content-wrap">
                            <div class="chat-options-list" style="margin-top: 10px;">
                                <button type="button" class="chat-action-btn chat-action-exit" id="chatNewIdeaBtn" style="margin-top: 10px; font-size: 0.9rem;">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sparkle-icon">
                                        <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7l11.4-11.4" opacity="0.3"></path>
                                        <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8l15.6-15.6" stroke="currentColor"></path>
                                    </svg>
                                    Exit & New Idea
                                </button>
                            </div>
                        </div>
                    `;
                    chatHistory.appendChild(msgDiv);
                    chatHistory.scrollTop = chatHistory.scrollHeight;

                    msgDiv.querySelector('#chatNewIdeaBtn').addEventListener('click', resetChat);
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong with the submission. Please try again.");
                modalEmailSubmitBtn.disabled = false;
                modalEmailSubmitBtn.textContent = 'Send to Email';
            }
        });
    }

    if (closeEmailModalBtn) {
        closeEmailModalBtn.addEventListener('click', () => {
            emailModal.classList.remove('active');
            setTimeout(() => { emailModal.style.display = 'none'; }, 300);

            addBotMessage("No problem! You can always share an email with me later if you change your mind.");
            addBotMessage("Would you like to explore another creative spark?");

            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot';
            msgDiv.innerHTML = `
                <div class="chat-content-wrap">
                    <div class="chat-options-list" style="margin-top: 10px;">
                        <button type="button" class="chat-action-btn chat-action-exit" id="chatNewIdeaBtn" style="margin-top: 10px; font-size: 0.9rem;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sparkle-icon">
                                <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7l11.4-11.4" opacity="0.3"></path>
                                <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8l15.6-15.6" stroke="currentColor"></path>
                            </svg>
                            Exit & New Idea
                        </button>
                    </div>
                </div>
            `;
            chatHistory.appendChild(msgDiv);
            chatHistory.scrollTop = chatHistory.scrollHeight;

            msgDiv.querySelector('#chatNewIdeaBtn').addEventListener('click', resetChat);
        });
    }

    function resetChat() {
        resetChatStateOnly();

        // UI View Transition
        if (inspireView) inspireView.style.display = 'none';
        if (mainHero) mainHero.style.display = 'flex';

        // Hide success states
        successStateContainer.style.display = 'none';
        if (typeof emailModal !== 'undefined' && emailModal) {
            emailModal.style.display = 'none';
            emailModal.classList.remove('active');
        }

        // Reset state variables
        currentMode = 'prompt';
        savedPrompt = '';

        // Reset Form UI
        mainInput.value = '';
        mainInput.style.height = 'auto';
        localStorage.removeItem('droi_prompt_draft');
        mainInput.type = 'text';
        mainInput.placeholder = 'Enter your creative prompt~';
        form.classList.remove('email-mode');
        form.classList.add('prompt-mode');

        // Reset Button UI
        submitBtn.innerHTML = 'Create';
        submitBtn.disabled = false;

        // Hide back button
        backToPromptBtn.style.display = 'none';

        // Restore UI visibility
        form.style.display = 'flex';
        statsContainer.style.display = 'flex';
        if (inspireSection) inspireSection.style.display = 'flex';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // newIdeaBtn listener
    newIdeaBtn.addEventListener('click', resetChat);

    const charCountWarning = document.getElementById('charCountWarning');

    // Textarea Auto-resize and Cursor Logic
    mainInput.addEventListener('input', function () {
        if (currentMode === 'prompt') {
            const length = this.value.length;
            const remaining = 2000 - length;

            // Show warning if over 1500 chars
            if (length >= 1500) {
                charCountWarning.style.display = 'block';
                charCountWarning.textContent = `Up to 2000 characters. ${remaining} characters left.`;
                if (remaining <= 100) {
                    charCountWarning.style.color = '#ef4444'; // Red if very close
                } else {
                    charCountWarning.style.color = 'var(--accent-yellow)';
                }
            } else {
                charCountWarning.style.display = 'none';
            }

            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';

            // Auto-save draft to prevent data loss
            localStorage.setItem('droi_prompt_draft', this.value);
        }
    });

    // Restore draft on load
    const savedDraft = localStorage.getItem('droi_prompt_draft');
    if (savedDraft && mainInput) {
        mainInput.value = savedDraft;
        // Trigger resize
        mainInput.style.height = 'auto';
        mainInput.style.height = mainInput.scrollHeight + 'px';
    }

    mainInput.addEventListener('focus', function () {
        if (currentMode === 'prompt' && this.value.trim() !== '') {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';

            // Move cursor to the end
            const len = this.value.length;
            setTimeout(() => {
                this.setSelectionRange(len, len);
            }, 0);
        }
    });

    mainInput.addEventListener('blur', function () {
        if (currentMode === 'prompt') {
            // Shrink back to 1 row
            this.style.height = '56px';
        }
    });

    // Handle keyboard events (Enter for submit, ArrowUp for history)
    mainInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        } else if (e.key === 'ArrowUp' && currentMode === 'prompt') {
            const historyData = JSON.parse(localStorage.getItem('droi_ai_history') || '[]');
            if (historyData.length > 0) {
                e.preventDefault(); // Prevent default cursor moving
                this.value = historyData[0].text;
                // Auto-resize
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
                // Enter edit mode by selecting the text
                this.select();
            }
        }
    });

    // Back Button Logic
    backToPromptBtn.addEventListener('click', () => {
        currentMode = 'prompt';

        // Hide back button and progress UI
        backToPromptBtn.style.display = 'none';
        progressContainer.style.display = 'none';

        // Restore prompt mode
        form.classList.remove('email-mode');
        form.classList.add('prompt-mode');
        mainInput.placeholder = 'Enter your creative prompt~';
        mainInput.value = savedPrompt; // Restore their text

        // Auto-resize textarea to fit restored prompt
        mainInput.style.height = 'auto';
        mainInput.style.height = (mainInput.scrollHeight) + 'px';

        submitBtn.innerHTML = 'Create';
        submitBtn.disabled = false;

        if (statsContainer) statsContainer.style.display = 'flex';
        if (inspireSection) inspireSection.style.display = 'flex';
        mainInput.focus();
    });

    // Animation Sequence Logic with Progress Bar
    async function runGenerationAnimation() {
        throw new Error('Legacy local generation animation is disabled. Use AI-first backend compile.');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputValue = mainInput.value.trim();

        if (currentMode === 'prompt') {
            if (!inputValue) return;

            savedPrompt = inputValue;
            saveToHistory(savedPrompt);
            localStorage.removeItem('droi_prompt_draft');

            // 鎻愪氦鍚庨噸缃椤佃緭鍏ユ楂樺害
            mainInput.style.height = 'auto';

            openCreateChatView(savedPrompt);
        }
    });

    // 1. 鍏堢敓鎴愭槦鍏夋晥鏋滐紝杩欐牱鍚庣画鎵嶈兘琚?querySelectorAll 鎶撳彇鍒?
    function createStarlights() {
        const container = document.getElementById('starlightContainer');
        if (!container) return;

        const colors = ['rgba(164, 130, 255, 0.9)', 'rgba(240, 147, 251, 0.9)', 'rgba(129, 140, 248, 0.9)']; // 绱壊銆佺矇绱€佽摑绱壊
        const count = 200; // 鏄熸槦鏁伴噺

        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'starlight';

            // 闅忔満澶у皬
            const size = Math.random() * 3 + 1; // 1px - 4px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // 鏄熸槦淇濇寔鏄庝寒娓呮櫚锛岀◢寰繚鐣欎竴鐐归€忔槑搴﹀樊寮傚鍔犲眰娆?
            if (i % 3 === 0) {
                star.style.opacity = '0.9';
            } else if (i % 3 === 1) {
                star.style.opacity = '0.7';
            } else {
                star.style.opacity = '0.5';
            }

            // 闅忔満棰滆壊
            const color = colors[Math.floor(Math.random() * colors.length)];
            star.style.background = color;
            star.style.boxShadow = `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}`;

            // 闅忔満浣嶇疆
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;

            // 闅忔満鍔ㄧ敾鏃堕暱鍜屽欢杩?
            const duration = Math.random() * 4 + 3; // 3s - 7s
            const delay = Math.random() * 5; // 0s - 5s
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `-${delay}s`; // 璐熷欢杩熻鍔ㄧ敾鐩存帴浠ヤ笉鍚岃繘搴﹀紑濮?

            container.appendChild(star);
        }
    }

    createStarlights();

    // 2. 鎺㈢収鐏Щ鍔ㄩ€昏緫
    const spotlightOverlay = document.querySelector('.spotlight-overlay');
    const spotlightGlow = document.querySelector('.spotlight-glow');

    // 骞虫粦璺熼殢鍙傛暟
    let currentX = 0.5;
    let currentY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    const smoothing = 0.15; // 璺熼殢閫熷害

    document.addEventListener('mousemove', (e) => {
        // 榧犳爣鍧愭爣杞崲鎴愮櫨鍒嗘瘮
        targetX = e.clientX / window.innerWidth;
        targetY = e.clientY / window.innerHeight;
    });

    // 鍔ㄧ敾寰幆
    function animateSpotlight() {
        // 缂撳姩璺熼殢
        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;

        // 鏇存柊娓愬彉涓績浣嶇疆
        const posPercentX = currentX * 100;
        const posPercentY = currentY * 100;

        // 搴旂敤鍒颁袱涓眰
        if (spotlightOverlay) {
            spotlightOverlay.style.background = `
                radial-gradient(
                    circle at ${posPercentX}% ${posPercentY}%,
                    transparent 0%,
                    transparent 120px,
                    rgba(18, 16, 23, 0.2) 250px,
                    rgba(18, 16, 23, 0.4) 100%
                )
            `;
        }

        if (spotlightGlow) {
            spotlightGlow.style.background = `
                radial-gradient(
                    circle at ${posPercentX}% ${posPercentY}%,
                    rgba(129, 140, 248, 0.15) 0%,
                    rgba(129, 140, 248, 0.05) 80px,
                    transparent 180px
                )
            `;
        }
        requestAnimationFrame(animateSpotlight);
    }

    // 鍚姩鍔ㄧ敾 (绉诲姩绔彲閫夊叧闂?
    if (!('ontouchstart' in window)) {
        animateSpotlight();
    }

    // 3. 榧犳爣娉㈢汗鏁堟灉
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'spotlight-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);

        // 鎵╂暎鍔ㄧ敾
        ripple.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(40)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    });

    // 4. Volumetric Data Stream Wave Animation Logic
    const waveCanvas = document.getElementById('dataWaveCanvas');
    if (waveCanvas) {
        const ctx = waveCanvas.getContext('2d');
        let time = 0;

        function resizeCanvas() {
            const container = waveCanvas.parentElement;
            if (!container) return;
            waveCanvas.width = container.offsetWidth;
            waveCanvas.height = container.offsetHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const numLines = 22; // 绾挎潯瀵嗗害
        const pointsPerLine = 100; // 姣忔潯绾跨殑鐐规暟
        const dataPulses = Array.from({ length: 15 }, () => ({
            lineIndex: Math.floor(Math.random() * numLines),
            progress: Math.random(),
            speed: 0.002 + Math.random() * 0.005
        }));

        function drawWave() {
            ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

            const width = waveCanvas.width;
            const height = waveCanvas.height;
            const centerY = height * 0.5;

            for (let i = 0; i < numLines; i++) {
                // 娣卞害璁＄畻: 0 涓鸿儗鏅? 1 涓哄墠鏅?
                const depth = i / numLines;
                const opacity = 0.05 + depth * 0.25;
                const lineWidth = 0.5 + depth * 1.5;
                const amplitude = 40 + depth * 60;
                const freq = 0.002 + depth * 0.002;

                ctx.beginPath();
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = `rgba(77, 207, 255, ${opacity})`;

                const lineOffset = i * 0.5; // 姣忔潯绾跨殑鐩镐綅宸?

                for (let j = 0; j <= pointsPerLine; j++) {
                    const xProgress = j / pointsPerLine;
                    const x = xProgress * width;

                    // 鏍稿績娉㈠姩鏂圭▼: 鍙犲姞澶氬眰姝ｅ鸡娉㈠垱閫犳湁鏈烘劅
                    const wave1 = Math.sin(x * freq + time + lineOffset);
                    const wave2 = Math.sin(x * freq * 2.5 - time * 0.5 + lineOffset);
                    const wave3 = Math.cos(x * freq * 0.8 + time * 1.2);

                    const yOffset = (wave1 * 0.6 + wave2 * 0.3 + wave3 * 0.1) * amplitude;
                    const y = centerY + yOffset + (depth - 0.5) * 100; // 鍒嗗眰鍨傜洿鍒嗗竷

                    if (j === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();

                // 涓烘煇浜涚嚎鏉℃坊鍔犲彂鍏夌矑瀛愶紙鎷撴墤鐐癸級
                if (i % 3 === 0) {
                    ctx.fillStyle = `rgba(164, 130, 255, ${opacity * 1.5})`;
                    for (let j = 0; j <= pointsPerLine; j += 10) {
                        const xProgress = j / pointsPerLine;
                        const x = xProgress * width;
                        const wave1 = Math.sin(x * freq + time + lineOffset);
                        const wave2 = Math.sin(x * freq * 2.5 - time * 0.5 + lineOffset);
                        const yOffset = (wave1 * 0.6 + wave2 * 0.3) * amplitude;
                        const y = centerY + yOffset + (depth - 0.5) * 100;

                        ctx.beginPath();
                        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // 缁樺埗鏁版嵁鑴夊啿 (Data Pulses)
            dataPulses.forEach(pulse => {
                pulse.progress += pulse.speed;
                if (pulse.progress > 1) {
                    pulse.progress = 0;
                    pulse.lineIndex = Math.floor(Math.random() * numLines);
                }

                const depth = pulse.lineIndex / numLines;
                const amplitude = 40 + depth * 60;
                const freq = 0.002 + depth * 0.002;
                const lineOffset = pulse.lineIndex * 0.5;

                const x = pulse.progress * width;
                const wave1 = Math.sin(x * freq + time + lineOffset);
                const wave2 = Math.sin(x * freq * 2.5 - time * 0.5 + lineOffset);
                const yOffset = (wave1 * 0.6 + wave2 * 0.3) * amplitude;
                const y = centerY + yOffset + (depth - 0.5) * 100;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                gradient.addColorStop(0.5, `rgba(77, 207, 255, ${0.4 * depth})`);
                gradient.addColorStop(1, 'rgba(77, 207, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
            });

            time += 0.015;
            requestAnimationFrame(drawWave);
        }

        drawWave();
    }

    // 5. Plexus (Mind Chain) Animation Logic
    const plexusCanvas = document.getElementById('plexusCanvas');
    if (plexusCanvas) {
        const ctx = plexusCanvas.getContext('2d');
        let points = [];
        const maxPoints = 40;
        const connectionDistance = 150;

        function resizePlexus() {
            plexusCanvas.width = plexusCanvas.offsetWidth;
            plexusCanvas.height = plexusCanvas.offsetHeight;
            initPoints();
        }

        function initPoints() {
            points = [];
            for (let i = 0; i < maxPoints; i++) {
                points.push({
                    x: Math.random() * plexusCanvas.width,
                    y: Math.random() * plexusCanvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        }

        window.addEventListener('resize', resizePlexus);
        window.initPlexus = resizePlexus;
        resizePlexus();

        function drawPlexus() {
            ctx.clearRect(0, 0, plexusCanvas.width, plexusCanvas.height);

            // Move points
            points.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > plexusCanvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > plexusCanvas.height) p.vy *= -1;
            });

            // Draw connections
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(164, 130, 255, ${0.1 * (1 - dist / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw points
            points.forEach(p => {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(164, 130, 255, 0.3)';
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(drawPlexus);
        }

        drawPlexus();
    }
});

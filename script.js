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
    const homeView = document.getElementById('homeView');
    const rollEmbedSection = document.getElementById('rollEmbedSection');
    const rollEmbedFrame = document.getElementById('rollEmbedFrame');
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
        { label: 'Bullet Hell', value: 'Bullet Hell', mechanic: 'dense projectile dodging, shooting, and boss phase patterns' },
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

    const OPTION_I18N = {
        zh: {
            type: {
                RPG: { label: 'RPG', value: 'RPG' },
                Puzzle: { label: 'Puzzle', value: 'Puzzle' },
                Action: { label: 'Action', value: 'Action' },
                Roguelike: { label: 'Roguelike', value: 'Roguelike' },
                'Bullet Hell': { label: 'Bullet Hell', value: 'Bullet Hell' },
                Simulation: { label: 'Simulation', value: 'Simulation' },
                Horror: { label: 'Horror', value: 'Horror' },
                Rhythm: { label: 'Rhythm', value: 'Rhythm' },
                Strategy: { label: 'Strategy', value: 'Strategy' },
                Survival: { label: 'Survival', value: 'Survival' }
            },
            style: {
                'Pixel Art': { label: 'Pixel Art', value: 'Pixel Art' },
                'Dark Gothic': { label: 'Dark Gothic', value: 'Dark Gothic' },
                'Anime / Cartoon': { label: 'Anime / Cartoon', value: 'Anime / Cartoon' },
                Minimalist: { label: 'Minimalist', value: 'Minimalist' },
                Cyberpunk: { label: 'Cyberpunk', value: 'Cyberpunk' },
                'Fantasy Illustration': { label: 'Fantasy Illustration', value: 'Fantasy Illustration' },
                'Retro / Lo-Fi': { label: 'Retro / Lo-Fi', value: 'Retro / Lo-Fi' },
                Realistic: { label: 'Realistic 3D', value: 'Realistic 3D' }
            },
            setting: {},
            coreGameplay: {},
            playerGoal: {},
            mainChallenge: {},
            progressionSystem: {},
            difficultyLevel: {}
        },
        ja: {},
        ko: {}
    };

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
        'Awesome! What vibes are we channeling today?',
        'Great choice! What art style should we use?',
        'Perfect! What world or background should the game use?',
        'Now define the moment-to-moment action.',
        'How does the player win or clear the game?',
        'What creates the main pressure or challenge?',
        'How should the player grow stronger?',
        'What difficulty level should we tune for?'
    ];

    const CHAT_I18N = (() => {
        const base = {
            worked: 'processed {time}',
            ready: 'I have enough information to generate the game. Ready to continue?',
            initial: 'Tell me the mini-game you want to generate.',
            inspire: 'Inspire me',
            noIdea: 'Not sure yet',
            create: 'Create',
            addMore: 'Add more detail',
            exitNewIdea: 'Start a new idea',
            editFilled: 'I filled the input with the current plan. Edit it, then send again.',
            promptFallback: 'Please describe the game idea first.',
            prompts: {
                type: 'What game type should this be?',
                style: 'What art style should it use?',
                setting: 'Where does the game take place?',
                coreGameplay: 'What is the core gameplay loop?',
                playerGoal: 'How does the player win?',
                mainChallenge: 'What creates the main challenge?',
                progressionSystem: 'How should the player progress?',
                difficultyLevel: 'What difficulty level should we tune for?'
            },
            titles: {
                type: 'Game Type',
                style: 'Art Style',
                setting: 'Game Setting',
                coreGameplay: 'Core Gameplay',
                playerGoal: 'Player Goal',
                mainChallenge: 'Main Challenge',
                progressionSystem: 'Progression System',
                difficultyLevel: 'Difficulty Level'
            },
            detailedConcept: 'Detailed game concept',
            labels: {
                gameType: 'Game Type',
                artStyle: 'Art Style',
                gameSetting: 'Game Setting',
                background: 'Background / Story',
                coreGameplay: 'Core Gameplay',
                playerGoal: 'Player Goal',
                mainChallenge: 'Main Challenge',
                progressionSystem: 'Progression System',
                difficultyLevel: 'Difficulty Level',
                p0Template: 'P0 Template',
                decision: 'Decision'
            },
            autoReady: 'Auto generation ready',
            manualFallback: 'Manual queue fallback',
            autoPath: 'Auto generation path',
            gameSpecReady: 'P0 GameSpec ready',
            emailSuccess: "All systems go. We will send the generated game to your inbox within 15 working days.",
            anotherSpark: 'Would you like to explore another creative spark?',
            emailLater: 'No problem. You can share an email later if you change your mind.',
            send: 'Send',
            sending: 'Sending...',
            invalidEmail: 'Please enter a valid email address.',
            submitFailed: 'Something went wrong with the submission. Please try again.',
            delayTitle: 'Generation moved to manual queue',
            emailText: 'Please provide your email. We will send the generated game to your inbox.',
            skip: 'Skip for now',
            progressAuto: 'Template matched. Building the P0 GameSpec preview now.',
            progressManual: 'This idea needs manual handling.',
            chatPlaceholder: 'Ask anything',
            webPreview: 'Web preview',
            openPreview: 'Open preview',
            generatedFiles: 'Generated files',
            generatedJsNote: 'Playable runtime, GameSpec, and template preview logic are bundled here.',
            landscapeTip: 'Mobile preview starts in portrait. Rotate your phone for a wider playfield.',
            mainPlaceholder: 'Enter your creative prompt~',
            stepAnalyze: 'Analyzing your prompt...',
            stepAssets: 'Generating game assets...',
            stepBuild: 'Building your game...',
            quickTitle: 'Quick inspiration',
            quickDesc: 'Pick a direction to start faster.',
            quickInspiration: 'Use this direction',
            profileTitle: 'Creative profile',
            profileDesc: 'Choose up to two directions.',
            recommendationsTitle: 'Recommended directions',
            researchTitle: 'Research mode',
            researchSubtitle: 'Let AI refine the game idea.',
            chooseMode: 'Choose mode',
            startProfile: 'Start profile',
            useDirection: 'Use direction',
            directConfirm: 'Confirm and generate',
            planTitle: 'Game plan',
            planBadge: 'AI Plan',
            revise: 'Revise',
            confirm: 'Confirm',
            continuePrompt: 'Continue',
            next: 'Next',
            moreOptions: 'More options',
            generate: 'Generate',
            restart: 'Restart',
            sidebarTitle: 'History',
            gameSpecSidebarTitle: 'GameSpec',
            tools: 'Tools',
            debug: 'Debug',
            apiBase: 'API Base',
            toolUrl: 'Tool URL',
            workspace: 'Workspace',
            currentGameSpec: 'Current GameSpec'
        };
        return { en: base, zh: base, ja: base, ko: base };
    })();

    const PLAN_FIELD_LABELS = (() => {
        const base = {
            hook: 'Hook',
            storyPremise: 'Story Premise',
            coreLoop: 'Core Loop',
            momentToMoment: 'Moment-to-Moment',
            visualDirection: 'Visual Direction',
            enemyDesign: 'Enemy / Challenge Design',
            progressionPlan: 'Progression Plan',
            playerFantasy: 'Player Fantasy',
            prototypeScope: 'P0 Prototype Scope'
        };
        return { en: base, zh: base, ja: base, ko: base };
    })();

    const INSPIRE_PROFILE_DIRECTIONS = ['stable', 'surprise', 'contrast'];
    const PROFILE_SELECTION_LIMIT = 2;

    const INSPIRE_PROFILE_TEXT = (() => {
        const base = {
            chooseMode: 'Choose how to start',
            quickTitle: 'Quick inspiration',
            quickDesc: 'Pick a direction and let AI draft the game.',
            profileTitle: 'Guided profile',
            profileDesc: 'Answer a few focused choices for better routing.',
            startProfile: 'Start guided profile',
            directConfirm: 'Use this direction',
            recommendationsTitle: 'Recommended directions',
            recommendationsHint: 'Pick one direction to continue into AI analysis and game generation.',
            recommendationsFallbackHint: 'AI directions took too long, so I prepared local directions from your profile. Pick one to continue.',
            useDirection: 'Use direction',
            researchTitle: 'AI research mode',
            researchSubtitle: 'Let AI explore a stronger game direction first.',
            continuePrompt: 'Continue',
            next: 'Next',
            skip: 'Skip for now',
            random: 'Random',
            generate: 'Generate',
            restart: 'Restart',
            sidebarTitle: 'Creative Profile',
            gameSpecSidebarTitle: 'GameSpec',
            currentGameSpec: 'Current GameSpec',
            none: 'None',
            directions: {
                stable: 'Stable',
                surprise: 'Surprise',
                contrast: 'Contrast'
            }
        };
        return { en: base, zh: base, ja: base, ko: base };
    })();

    const INSPIRE_PROFILE_DIMENSIONS = [
        {
            key: 'mood',
            title: { en: 'Mood', zh: 'Mood' },
            hint: { en: 'What mood should the game create?', zh: 'What mood should the game create?' },
            impact: { en: 'Affects pacing, color temperature, and tone.', zh: 'Affects pacing, color temperature, and tone.' },
            options: [
                { id: 'happy', label: { en: 'Happy', zh: 'Happy' } },
                { id: 'calm', label: { en: 'Calm', zh: 'Calm' } },
                { id: 'excited', label: { en: 'Excited', zh: 'Excited' } },
                { id: 'focused', label: { en: 'Focused', zh: 'Focused' } },
                { id: 'tired', label: { en: 'Tired', zh: 'Tired' } },
                { id: 'nostalgic', label: { en: 'Nostalgic', zh: 'Nostalgic' } },
                { id: 'curious', label: { en: 'Curious', zh: 'Curious' } },
                { id: 'bold', label: { en: 'Bold', zh: 'Bold' } }
            ]
        },
        {
            key: 'scene',
            title: { en: 'Scene', zh: 'Scene' },
            hint: { en: 'Where should the game fit?', zh: 'Where should the game fit?' },
            impact: { en: 'Affects session length and complexity.', zh: 'Affects session length and complexity.' },
            options: [
                { id: 'short_break', label: { en: 'Short break', zh: 'Short break' } },
                { id: 'weekend', label: { en: 'Weekend', zh: 'Weekend' } },
                { id: 'late_night', label: { en: 'Late night', zh: 'Late night' } },
                { id: 'party', label: { en: 'Party', zh: 'Party' } },
                { id: 'commute', label: { en: 'Commute', zh: 'Commute' } },
                { id: 'work_break', label: { en: 'Work break', zh: 'Work break' } },
                { id: 'rainy_day', label: { en: 'Rainy day', zh: 'Rainy day' } },
                { id: 'cozy_evening', label: { en: 'Cozy evening', zh: 'Cozy evening' } }
            ]
        },
        {
            key: 'state',
            title: { en: 'Desired play state', zh: 'Desired play state' },
            hint: { en: 'What experience do you want?', zh: 'What experience do you want?' },
            impact: { en: 'Affects core loop, challenge, and difficulty.', zh: 'Affects core loop, challenge, and difficulty.' },
            options: [
                { id: 'decompress', label: { en: 'Decompress', zh: 'Decompress' } },
                { id: 'challenge', label: { en: 'Challenge', zh: 'Challenge' } },
                { id: 'immerse', label: { en: 'Immerse', zh: 'Immerse' } },
                { id: 'collect', label: { en: 'Collect', zh: 'Collect' } },
                { id: 'explore', label: { en: 'Explore', zh: 'Explore' } },
                { id: 'mastery', label: { en: 'Mastery', zh: 'Mastery' } },
                { id: 'build', label: { en: 'Build', zh: 'Build' } },
                { id: 'flow', label: { en: 'Flow', zh: 'Flow' } }
            ]
        },
        {
            key: 'vibe',
            title: { en: 'Visual vibe', zh: 'Visual vibe' },
            hint: { en: 'What should it look and feel like?', zh: 'What should it look and feel like?' },
            impact: { en: 'Maps to art style, UI tokens, and asset prompts.', zh: 'Maps to art style, UI tokens, and asset prompts.' },
            options: [
                { id: 'cozy_cute', label: { en: 'Cozy cute', zh: 'Cozy cute' } },
                { id: 'cyber_neon', label: { en: 'Cyber neon', zh: 'Cyber neon' } },
                { id: 'pixel_retro', label: { en: 'Pixel retro', zh: 'Pixel retro' } },
                { id: 'storybook', label: { en: 'Hand-drawn storybook', zh: 'Hand-drawn storybook' } },
                { id: 'animal_island', label: { en: 'Animal island', zh: 'Animal island' } },
                { id: 'watercolor', label: { en: 'Watercolor', zh: 'Watercolor' } },
                { id: 'dark_gothic', label: { en: 'Dark gothic', zh: 'Dark gothic' } },
                { id: 'clay_toy', label: { en: 'Clay toy', zh: 'Clay toy' } }
            ]
        }
    ];

    function localizedProfileDimensions() {
        return INSPIRE_PROFILE_DIMENSIONS;
    }

    const TEMPLATE_CATALOG = [
        {
            id: 'roguelike_survival',
            label: 'Roguelike Survival',
            gameType: 'Roguelike Survival',
            keywords: ['roguelike', 'survival', 'survive', 'wave', 'auto attack', 'vampire', 'level-up', 'upgrade', 'horde'],
            supported: true,
            reason: 'Auto-attack survival, XP pickups, upgrades, enemy waves, and boss pressure.'
        },
        {
            id: 'bullet_hell',
            label: 'Bullet Hell / Flying Shooter',
            gameType: 'Bullet Hell / Flying Shooter',
            keywords: ['bullet hell', 'flying shooter', 'shmup', 'danmaku', 'plane shooter', 'space shooter', 'auto-fire', 'boss phases'],
            supported: true,
            reason: 'HTML5 Canvas flying shooter with auto-fire, bullets, pickups, waves, and staged bosses.'
        }
    ];

    const TEMPLATE_KEYWORD_PATCHES = {};

    TEMPLATE_CATALOG.forEach(template => {
        template.keywords = Array.from(new Set(template.keywords));
    });

    const AUTO_GENERATION_TEMPLATE_IDS = new Set(['roguelike_survival', 'bullet_hell']);

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
    const PAGE_DIAGNOSTIC_KEY = 'droi_page_diagnostics_v1';
    const PAGE_DIAGNOSTIC_WINDOW_MS = 5 * 60 * 1000;
    const APP_SCRIPT_BUILD = '20260530-json-repair';
    const ADMIN_EMAIL_ALLOWLIST = ['liyilin199976@gmail.com'];
    const AI_ANALYSIS_TIMEOUT_MS = 60000;
    const AI_PROFILE_TIMEOUT_MS = 20000;
    const AI_GAME_PLAN_TIMEOUT_MS = 45000;
    const AI_BULLET_PLAN_TIMEOUT_MS = 45000;
    const AI_TEMPLATE_PATCH_TIMEOUT_MS = 60000;
    const isLocalHost = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    const DEFAULT_LOCAL_API_PORT = window.DROI_API_PORT || '3000';
    let API_BASE_URL = window.DROI_API_BASE || (
        isLocalHost && window.location.port && window.location.port !== DEFAULT_LOCAL_API_PORT
            ? `http://127.0.0.1:${DEFAULT_LOCAL_API_PORT}`
            : ''
    );

    function normalizeApiBaseUrl(value) {
        return String(value || '').trim().replace(/\/+$/, '');
    }

    async function loadRuntimeConfig() {
        if (window.DROI_API_BASE) {
            API_BASE_URL = normalizeApiBaseUrl(window.DROI_API_BASE);
            return;
        }
        try {
            const response = await fetch('droi-config.json', { cache: 'no-store' });
            if (!response.ok) return;
            const config = await response.json();
            const apiBase = config.apiBaseUrl || config.apiBase || config.backendUrl || '';
            if (apiBase) API_BASE_URL = normalizeApiBaseUrl(apiBase);
        } catch (error) {
            // Static copies can still run with local fallback; backend errors are shown in the UI.
        }
    }

    function isLocalRuntimeApiBase() {
        if (!isLocalHost) return false;
        if (!API_BASE_URL) return true;
        try {
            const base = new URL(API_BASE_URL, window.location.origin);
            return ['127.0.0.1', 'localhost'].includes(base.hostname);
        } catch (error) {
            return false;
        }
    }
    const PROVIDER_ORDER = ['qwen', 'openai', 'gemini', 'anthropic', 'groq'];
    const PROVIDER_META = {
        qwen: {
            label: 'Qwen',
            icon: 'QW',
            color: '#6c8cff',
            defaultBaseUrl: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
            adapter: 'openai-compatible',
            models: [
                { id: 'qwen3.7-max', label: 'Qwen3.7-Max', reasoningEffort: 'none' }
            ]
        },
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

    function setHomeViewVisible(visible) {
        if (homeView) {
            homeView.style.display = visible ? 'flex' : 'none';
        } else if (mainHero) {
            mainHero.style.display = visible ? 'flex' : 'none';
        }
    }

    function configureRollEmbedApiBase() {
        if (!rollEmbedFrame || !API_BASE_URL) return;
        try {
            const nextUrl = new URL(rollEmbedFrame.getAttribute('src') || rollEmbedFrame.src, window.location.href);
            if (nextUrl.searchParams.get('apiBase') === API_BASE_URL) return;
            nextUrl.searchParams.set('apiBase', API_BASE_URL);
            rollEmbedFrame.src = nextUrl.toString();
        } catch (error) {
            // Keep the static iframe source if URL mutation is not available.
        }
    }

    function getRollEmbedOrigin() {
        if (!rollEmbedFrame) return window.location.origin;
        try {
            return new URL(rollEmbedFrame.getAttribute('src') || rollEmbedFrame.src, window.location.href).origin;
        } catch (error) {
            return window.location.origin;
        }
    }

    function syncRollEmbedViewport() {
        if (!rollEmbedFrame || !rollEmbedFrame.contentWindow) return;
        rollEmbedFrame.contentWindow.postMessage({
            type: 'droi-roll-viewport',
            height: window.innerHeight
        }, getRollEmbedOrigin());
    }

    function scrollToRollPage(pageIndex, offset) {
        if (!rollEmbedSection) return;
        const top = rollEmbedSection.getBoundingClientRect().top + window.scrollY;
        const targetOffset = Number.isFinite(Number(offset))
            ? Math.max(0, Number(offset))
            : Math.max(0, pageIndex) * window.innerHeight;
        window.scrollTo({
            top: top + targetOffset,
            behavior: 'smooth'
        });
    }

    window.addEventListener('message', (event) => {
        if (rollEmbedFrame && event.source !== rollEmbedFrame.contentWindow) return;
        if (event.origin !== getRollEmbedOrigin()) return;
        const data = event.data || {};
        if (!data || typeof data !== 'object' || !String(data.type || '').startsWith('droi-roll-')) return;
        if (data.type === 'droi-roll-ready') {
            const pageCount = Number(data.pageCount) || 1;
            if (rollEmbedSection) {
                rollEmbedSection.style.setProperty('--roll-embed-page-count', String(pageCount));
            }
            syncRollEmbedViewport();
            return;
        }
        if (data.type === 'droi-roll-scroll-to') {
            scrollToRollPage(Number(data.pageIndex) || 0, data.offset);
        }
    });

    window.addEventListener('resize', syncRollEmbedViewport);
    if (rollEmbedFrame) {
        configureRollEmbedApiBase();
        if (rollEmbedSection) {
            rollEmbedSection.style.setProperty('--roll-embed-page-count', '2');
        }
        rollEmbedFrame.addEventListener('load', () => {
            if (rollEmbedSection) {
                rollEmbedSection.style.setProperty('--roll-embed-page-count', '2');
            }
            syncRollEmbedViewport();
        });
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

    function apiUrl(path) {
        return `${API_BASE_URL}${path}`;
    }

    function shouldEnablePageDiagnostics() {
        const params = new URLSearchParams(window.location.search);
        return isLocalHost || params.get('debug') === '1' || localStorage.getItem('droi_debug_enabled') === '1';
    }

    function readDiagnostics() {
        try {
            const records = JSON.parse(localStorage.getItem(PAGE_DIAGNOSTIC_KEY) || '[]');
            return Array.isArray(records) ? records : [];
        } catch (error) {
            return [];
        }
    }

    function writeDiagnostics(records) {
        const cutoff = Date.now() - PAGE_DIAGNOSTIC_WINDOW_MS;
        const next = records
            .filter(item => item && Number(item.ts) >= cutoff)
            .slice(-240);
        localStorage.setItem(PAGE_DIAGNOSTIC_KEY, JSON.stringify(next));
        return next;
    }

    function scrubDiagnosticUrl(value) {
        try {
            const url = new URL(String(value || ''), window.location.href);
            ['code', 'state', 'key', 'token', 'api_key'].forEach(key => {
                if (url.searchParams.has(key)) url.searchParams.set(key, '...');
            });
            return url.pathname.startsWith('/api') ? `${url.origin}${url.pathname}` : url.href;
        } catch (error) {
            return String(value || '').slice(0, 220);
        }
    }

    function recordDiagnostic(type, detail = {}) {
        if (!window.droiDiagnosticsEnabled) return;
        const records = readDiagnostics();
        const entry = {
            ts: Date.now(),
            type,
            build: APP_SCRIPT_BUILD,
            path: window.location.pathname,
            detail
        };
        records.push(entry);
        const next = writeDiagnostics(records);
        window.dispatchEvent(new CustomEvent('droi-diagnostics-updated', { detail: { entry, records: next } }));
    }

    function formatDiagnosticTime(ts) {
        return new Date(ts).toLocaleTimeString([], { hour12: false });
    }

    function renderDiagnosticsPanel() {
        const panel = document.getElementById('droiDiagnosticsPanel');
        const list = document.getElementById('droiDiagnosticsList');
        if (!panel || !list) return;
        const records = writeDiagnostics(readDiagnostics());
        list.innerHTML = records.slice(-80).reverse().map(item => {
            const detail = item.detail || {};
            const title = detail.phase || detail.label || detail.url || detail.message || item.type;
            const meta = [
                detail.method,
                detail.status ? `HTTP ${detail.status}` : '',
                detail.ms != null ? `${detail.ms}ms` : '',
                detail.provider || '',
                detail.model || ''
            ].filter(Boolean).join(' | ');
            return `
                <div class="droi-diagnostic-row droi-diagnostic-${escapeHtml(item.type)}">
                    <strong>${escapeHtml(formatDiagnosticTime(item.ts))} ${escapeHtml(item.type)}</strong>
                    <span>${escapeHtml(String(title || '').slice(0, 180))}</span>
                    ${meta ? `<small>${escapeHtml(meta)}</small>` : ''}
                </div>
            `;
        }).join('') || '<div class="droi-diagnostic-empty">No events in the last 5 minutes.</div>';
    }

    function installDiagnosticsPanel() {
        if (document.getElementById('droiDiagnosticsPanel')) return;
        const style = document.createElement('style');
        style.textContent = `
            .droi-diagnostic-toggle{position:fixed;right:14px;bottom:14px;z-index:99990;border:1px solid rgba(47,124,246,.35);border-radius:999px;background:#111827;color:#fff;padding:9px 12px;font:12px/1.2 Inter,system-ui,sans-serif;box-shadow:0 10px 32px rgba(0,0,0,.28);cursor:pointer}
            .droi-diagnostic-panel{position:fixed;right:14px;bottom:58px;z-index:99991;width:min(520px,calc(100vw - 28px));max-height:min(680px,calc(100vh - 86px));display:none;grid-template-rows:auto auto 1fr;border:1px solid #d7deea;border-radius:8px;background:#fff;color:#1f2a3d;box-shadow:0 22px 70px rgba(22,30,46,.28);font:12px/1.4 Inter,system-ui,sans-serif;overflow:hidden}
            .droi-diagnostic-panel.open{display:grid}
            .droi-diagnostic-head{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border-bottom:1px solid #e4e9f2;background:#f7faff}
            .droi-diagnostic-head strong{font-size:13px}
            .droi-diagnostic-head button,.droi-diagnostic-actions button{border:1px solid #d7e5ff;background:#fff;color:#2f7cf6;border-radius:4px;min-height:28px;padding:0 8px;cursor:pointer}
            .droi-diagnostic-actions{display:flex;gap:8px;align-items:center;padding:8px 12px;border-bottom:1px solid #e4e9f2}
            .droi-diagnostic-actions span{color:#6b778c;margin-left:auto}
            .droi-diagnostic-list{overflow:auto;padding:8px;display:grid;gap:6px}
            .droi-diagnostic-row{display:grid;gap:3px;border:1px solid #e4e9f2;border-radius:6px;background:#fff;padding:8px;overflow-wrap:anywhere}
            .droi-diagnostic-error,.droi-diagnostic-unhandledrejection,.droi-diagnostic-ai-error{border-color:#ffd0cc;background:#fff7f6}
            .droi-diagnostic-fetch-error,.droi-diagnostic-timeout{border-color:#ffe0a3;background:#fffaf0}
            .droi-diagnostic-row small,.droi-diagnostic-empty{color:#6b778c}
        `;
        document.head.appendChild(style);

        const toggle = document.createElement('button');
        toggle.id = 'droiDiagnosticsToggle';
        toggle.className = 'droi-diagnostic-toggle';
        toggle.type = 'button';
        toggle.textContent = 'Diagnostics';
        document.body.appendChild(toggle);

        const panel = document.createElement('section');
        panel.id = 'droiDiagnosticsPanel';
        panel.className = 'droi-diagnostic-panel';
        panel.innerHTML = `
            <div class="droi-diagnostic-head">
                <strong>Droi Diagnostics</strong>
                <button type="button" data-diagnostics-close>Close</button>
            </div>
            <div class="droi-diagnostic-actions">
                <button type="button" data-diagnostics-refresh>Refresh</button>
                <button type="button" data-diagnostics-copy>Copy</button>
                <button type="button" data-diagnostics-clear>Clear</button>
                <span>Last 5 min | ${escapeHtml(APP_SCRIPT_BUILD)}</span>
            </div>
            <div class="droi-diagnostic-list" id="droiDiagnosticsList"></div>
        `;
        document.body.appendChild(panel);
        toggle.addEventListener('click', () => {
            panel.classList.toggle('open');
            renderDiagnosticsPanel();
        });
        panel.querySelector('[data-diagnostics-close]').addEventListener('click', () => panel.classList.remove('open'));
        panel.querySelector('[data-diagnostics-refresh]').addEventListener('click', renderDiagnosticsPanel);
        panel.querySelector('[data-diagnostics-clear]').addEventListener('click', () => {
            localStorage.removeItem(PAGE_DIAGNOSTIC_KEY);
            renderDiagnosticsPanel();
        });
        panel.querySelector('[data-diagnostics-copy]').addEventListener('click', async () => {
            await navigator.clipboard.writeText(JSON.stringify(writeDiagnostics(readDiagnostics()), null, 2));
            recordDiagnostic('operation', { label: 'Diagnostics copied' });
        });
        window.addEventListener('droi-diagnostics-updated', () => {
            if (panel.classList.contains('open')) renderDiagnosticsPanel();
        });
    }

    function installPageDiagnostics() {
        window.droiDiagnosticsEnabled = shouldEnablePageDiagnostics();
        if (!window.droiDiagnosticsEnabled || window.droiDiagnosticsInstalled) return;
        window.droiDiagnosticsInstalled = true;
        writeDiagnostics(readDiagnostics());

        const originalFetch = window.fetch.bind(window);
        window.fetch = async (input, init = {}) => {
            const startedAt = performance.now();
            const url = typeof input === 'string' ? input : input?.url;
            const method = init.method || input?.method || 'GET';
            try {
                const response = await originalFetch(input, init);
                const ms = Math.round(performance.now() - startedAt);
                if (String(url || '').includes('/api/') || ms > 1500 || !response.ok) {
                    recordDiagnostic(response.ok ? 'fetch' : 'fetch-error', {
                        method,
                        url: scrubDiagnosticUrl(url),
                        status: response.status,
                        ms
                    });
                }
                return response;
            } catch (error) {
                recordDiagnostic('fetch-error', {
                    method,
                    url: scrubDiagnosticUrl(url),
                    ms: Math.round(performance.now() - startedAt),
                    message: error.message || String(error)
                });
                throw error;
            }
        };

        ['warn', 'error'].forEach(level => {
            const original = console[level].bind(console);
            console[level] = (...args) => {
                recordDiagnostic(level, {
                    message: args.map(arg => arg && arg.message ? arg.message : String(arg)).join(' ').slice(0, 500)
                });
                original(...args);
            };
        });

        window.addEventListener('error', event => {
            recordDiagnostic('error', {
                message: event.message,
                url: scrubDiagnosticUrl(event.filename),
                line: event.lineno,
                column: event.colno
            });
        });
        window.addEventListener('unhandledrejection', event => {
            const reason = event.reason || {};
            recordDiagnostic('unhandledrejection', {
                message: reason.message || String(reason),
                code: reason.code || '',
                category: reason.category || ''
            });
        });
        document.addEventListener('click', event => {
            const target = event.target.closest('button,a,[role="button"],input,textarea,select');
            if (!target) return;
            const label = target.getAttribute('aria-label') || target.textContent || target.id || target.className || target.tagName;
            recordDiagnostic('operation', {
                label: String(label).trim().slice(0, 160),
                tag: target.tagName,
                id: target.id || ''
            });
        }, true);
        document.addEventListener('DOMContentLoaded', installDiagnosticsPanel);
        if (document.readyState !== 'loading') installDiagnosticsPanel();
        recordDiagnostic('page-load', {
            url: scrubDiagnosticUrl(window.location.href),
            apiBase: API_BASE_URL || window.location.origin,
            build: APP_SCRIPT_BUILD
        });
    }

    installPageDiagnostics();

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

    function createAIFlowError(code, category, title, message, technicalMessage = '', actions = ['retry', 'switch_model', 'check_config', 'manual_queue']) {
        const error = new Error(message || title || code);
        error.aiFlow = true;
        error.code = code;
        error.category = category;
        error.title = title || 'AI generation failed';
        error.message = message || title || code;
        error.technicalMessage = technicalMessage || '';
        error.retryable = ['recoverable_model_failure', 'model_config_failure', 'schema_failure'].includes(category);
        error.manualQueueRecommended = ['capability_unsupported', 'template_compile_failure'].includes(category);
        error.actions = actions;
        return error;
    }

    function classifyAIFlowError(error, phase = 'AI generation') {
        if (error && error.aiFlow) return error;
        const status = error && error.status;
        const backendError = error && error.data && error.data.error && typeof error.data.error === 'object'
            ? error.data.error
            : null;
        if (backendError && backendError.code) {
            return createAIFlowError(
                backendError.code,
                backendError.category || 'recoverable_model_failure',
                backendError.title || `${phase} failed`,
                backendError.message || (error && error.message) || `${phase} failed`,
                backendError.technicalMessage || '',
                backendError.actions || ['retry', 'switch_model', 'check_config', 'manual_queue']
            );
        }
        const backendCode = error && error.data && error.data.code;
        if (backendCode) {
            const backendCategory = error.data.category || (backendCode === 'PATCH_FILE_NOT_ALLOWED' || backendCode === 'PATCH_REQUIRES_RUNTIME_CODE' ? 'template_compile_failure' : 'recoverable_model_failure');
            return createAIFlowError(
                backendCode,
                backendCategory,
                error.data.title || `${phase} failed`,
                error.data.message || (error && error.message) || `${phase} failed`,
                error.data.technicalMessage || error.data.runtimePatchReason || '',
                error.data.actions || ['retry', 'switch_model', 'check_config', 'manual_queue']
            );
        }
        const message = String((error && error.message) || error || 'Unknown AI error');
        const lower = message.toLowerCase();
        if (status === 401 || status === 403 || /api key|auth|permission|unauthorized|forbidden/i.test(message)) {
            return createAIFlowError('MODEL_AUTH_FAILED', 'model_config_failure', 'Current model is not available', 'The selected model cannot be used. Check API key, model access, base URL, or provider settings.', message, ['switch_model', 'check_config', 'manual_queue']);
        }
        if (status === 404 || /not configured|not found|not supported|no configured models/i.test(message)) {
            return createAIFlowError('MODEL_NOT_CONFIGURED', 'model_config_failure', 'Current model is not configured', 'The selected model is not configured or enabled. Switch model or check model configuration.', message, ['switch_model', 'check_config', 'manual_queue']);
        }
        if (status === 429 || /rate limit|quota/i.test(message)) {
            return createAIFlowError('MODEL_RATE_LIMITED', 'recoverable_model_failure', 'Current model is rate limited', 'The selected model is temporarily rate limited or out of quota. Retry later or switch model.', message, ['retry', 'switch_model', 'manual_queue']);
        }
        if (/timeout|timed out/i.test(message)) {
            return createAIFlowError('MODEL_TIMEOUT', 'recoverable_model_failure', 'Current model timed out', 'The request matched the generation flow, but the selected model did not respond in time. Please retry.', message, ['retry']);
        }
        if (status >= 500 || /timeout|timed out|network|fetch failed|econn|dns|503|502/i.test(lower)) {
            return createAIFlowError('MODEL_NETWORK_ERROR', 'recoverable_model_failure', 'Current model call failed', 'Network, VPN, proxy, or provider service may be unavailable. Retry or switch model.', message, ['retry', 'switch_model', 'check_config', 'manual_queue']);
        }
        if (/json|schema|parse/i.test(lower)) {
            return createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI response format is invalid', 'The model response could not be parsed as the required JSON schema. Retry generation or switch model.', message, ['retry', 'switch_model', 'manual_queue']);
        }
        return createAIFlowError('MODEL_CALL_FAILED', 'recoverable_model_failure', `${phase} failed`, message, message, ['retry', 'switch_model', 'check_config', 'manual_queue']);
    }

    function requireActiveAIModel(phase = 'AI generation') {
        const active = getActiveModelMeta();
        if (!active.providerId || !active.modelId || !hasLiveAIProvider(active.providerId)) {
            throw createAIFlowError('MODEL_NOT_CONFIGURED', 'model_config_failure', 'Current model is not configured', `${phase} requires the currently selected model API. Switch to a configured model or check model settings.`, active.label || '', ['switch_model', 'check_config', 'manual_queue']);
        }
        return active;
    }

    function assertPlainObject(value, phase, fieldName = 'response') {
        if (!value || typeof value !== 'object' || Array.isArray(value)) {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI response format is invalid', `${phase} must return a JSON object for ${fieldName}.`, fieldName, ['retry', 'switch_model', 'manual_queue']);
        }
        return value;
    }

    function extractBalancedJsonObject(text) {
        const source = String(text || '');
        const start = source.indexOf('{');
        if (start < 0) return '';
        let depth = 0;
        let inString = false;
        let escaped = false;
        for (let i = start; i < source.length; i += 1) {
            const char = source[i];
            if (inString) {
                if (escaped) {
                    escaped = false;
                } else if (char === '\\') {
                    escaped = true;
                } else if (char === '"') {
                    inString = false;
                }
                continue;
            }
            if (char === '"') {
                inString = true;
            } else if (char === '{') {
                depth += 1;
            } else if (char === '}') {
                depth -= 1;
                if (depth === 0) return source.slice(start, i + 1);
            }
        }
        return source.slice(start);
    }

    function repairCommonJsonFormatting(text) {
        return String(text || '')
            .replace(/^\uFEFF/, '')
            .replace(/^```(?:json)?\s*/i, '')
            .replace(/```$/i, '')
            .replace(/,\s*([}\]])/g, '$1')
            .replace(/([}\]"0-9])\s*\n\s*("[$A-Za-z0-9_.-]+"\s*:)/g, '$1,\n$2')
            .replace(/\b(true|false|null)\s*\n\s*("[$A-Za-z0-9_.-]+"\s*:)/g, '$1,\n$2')
            .replace(/([}\]"0-9])\s*\n\s*([{\[])/g, '$1,\n$2')
            .trim();
    }

    function extractModelJsonObject(content, phase) {
        const raw = String(content || '').trim();
        const fencedMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
        const balanced = extractBalancedJsonObject(fencedMatch ? fencedMatch[1] : raw);
        const candidates = [
            fencedMatch ? fencedMatch[1].trim() : '',
            balanced,
            raw
        ].filter(Boolean);
        try {
            let lastError = null;
            for (const candidate of candidates) {
                try {
                    return assertPlainObject(JSON.parse(candidate), phase);
                } catch (error) {
                    lastError = error;
                }
                try {
                    return assertPlainObject(JSON.parse(repairCommonJsonFormatting(candidate)), phase);
                } catch (error) {
                    lastError = error;
                }
            }
            throw lastError || new Error('No JSON object found.');
        } catch (error) {
            if (error && error.aiFlow) throw error;
            throw createAIFlowError('MODEL_JSON_PARSE_FAILED', 'schema_failure', 'AI response is not valid JSON', `${phase} returned content that could not be parsed as strict JSON.`, error.message || String(error), ['retry', 'switch_model', 'manual_queue']);
        }
    }

    function validateAnalysisResponse(parsed) {
        assertPlainObject(parsed.modules || parsed, 'Game request analysis', 'modules');
        if (!parsed.templateDecision && parsed.gameTemplateDecision && typeof parsed.gameTemplateDecision === 'object') {
            parsed.templateDecision = parsed.gameTemplateDecision;
        }
        if (!parsed.gamePlanningDecision || typeof parsed.gamePlanningDecision !== 'object') {
            parsed.gamePlanningDecision = null;
        }
        if (!parsed.capability && parsed.capabilityDecision && typeof parsed.capabilityDecision === 'object') {
            parsed.capability = {
                supported: parsed.capabilityDecision.supported !== false,
                blockedReasons: Array.isArray(parsed.capabilityDecision.blockedReasons)
                    ? parsed.capabilityDecision.blockedReasons
                    : (parsed.capabilityDecision.reason ? [parsed.capabilityDecision.reason] : [])
            };
        }
        if (!parsed.templateDecision || typeof parsed.templateDecision !== 'object') {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI analysis is missing templateDecision', 'The selected model must decide whether the request maps to bullet_hell, roguelike_survival, unsupported, or null.', '', ['retry', 'switch_model', 'manual_queue']);
        }
        if (!parsed.capability || typeof parsed.capability !== 'object' || typeof parsed.capability.supported !== 'boolean') {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI analysis is missing capability', 'The selected model must return capability.supported and blockedReasons.', '', ['retry', 'switch_model', 'manual_queue']);
        }
        const templateId = parsed.templateDecision.templateId;
        const allowedTemplateIds = ['bullet_hell', 'roguelike_survival', 'unsupported', null, ''];
        if (!allowedTemplateIds.includes(templateId)) {
            throw createAIFlowError('TEMPLATE_NOT_SUPPORTED', 'capability_unsupported', 'Template is not supported', `The model selected unsupported templateId "${templateId}".`, templateId, ['manual_queue']);
        }
        return parsed;
    }

    function validateGamePlanResponse(plan) {
        assertPlainObject(plan, 'Game plan summary', 'game plan');
        const required = ['title', 'hook', 'storyPremise', 'coreLoop', 'momentToMoment', 'visualDirection', 'enemyDesign', 'progressionPlan', 'playerFantasy', 'prototypeScope', 'risk'];
        const missing = required.filter(key => typeof plan[key] !== 'string');
        if (missing.length) {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI game plan is incomplete', `The selected model omitted required GamePlan fields: ${missing.join(', ')}.`, missing.join(', '), ['retry', 'switch_model', 'manual_queue']);
        }
        return plan;
    }

    function validateBulletHellProductPlanResponse(plan) {
        assertPlainObject(plan, 'Bullet Hell product plan', 'Bullet Hell product plan');
        const requiredStrings = ['gameName', 'setting', 'story', 'coreGameplay', 'winCondition', 'progression', 'prototypeSummary'];
        const missingStrings = requiredStrings.filter(key => typeof plan[key] !== 'string' || !plan[key].trim());
        const meta = assertPlainObject(plan.meta, 'Bullet Hell product plan', 'meta');
        const artDirection = assertPlainObject(plan.artDirection, 'Bullet Hell product plan', 'artDirection');
        const bossConfig = assertPlainObject(plan.bossConfig, 'Bullet Hell product plan', 'bossConfig');
        const difficultyTuning = assertPlainObject(plan.difficultyTuning, 'Bullet Hell product plan', 'difficultyTuning');
        const missingNested = [];
        if (typeof meta.description !== 'string' || !meta.description.trim()) missingNested.push('meta.description');
        ['summary', 'backgroundVisual', 'uiToken'].forEach(key => {
            if (typeof artDirection[key] !== 'string' || !artDirection[key].trim()) missingNested.push(`artDirection.${key}`);
        });
        ['bulletColors', 'enemyPalette'].forEach(key => {
            if (!Array.isArray(artDirection[key]) || !artDirection[key].length) missingNested.push(`artDirection.${key}`);
        });
        if (typeof bossConfig.name !== 'string' || !bossConfig.name.trim()) missingNested.push('bossConfig.name');
        if (typeof bossConfig.hp !== 'number') missingNested.push('bossConfig.hp');
        if (!Array.isArray(bossConfig.phases) || !bossConfig.phases.length) missingNested.push('bossConfig.phases');
        if (!Array.isArray(plan.waves) || !plan.waves.length) missingNested.push('waves');
        if (!Array.isArray(plan.enemyTypes) || !plan.enemyTypes.length) missingNested.push('enemyTypes');
        if (!Array.isArray(plan.bossPhases) || !plan.bossPhases.length) missingNested.push('bossPhases');
        ['level', 'enemyHpMultiplier', 'bulletSpeedMultiplier', 'waveInterval', 'bossHp', 'lives', 'shield'].forEach(key => {
            if (difficultyTuning[key] === undefined || difficultyTuning[key] === null || difficultyTuning[key] === '') missingNested.push(`difficultyTuning.${key}`);
        });
        const missing = [...missingStrings, ...missingNested];
        if (missing.length) {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'Bullet Hell product plan is incomplete', `The selected model omitted required Bullet Hell fields: ${missing.join(', ')}.`, missing.join(', '), ['retry', 'switch_model', 'manual_queue']);
        }
        return plan;
    }

    function normalizeTemplatePatchObjectField(value, fallbackPrefix = 'item') {
        if (value && typeof value === 'object' && !Array.isArray(value)) return value;
        if (Array.isArray(value)) {
            return value.reduce((acc, entry, index) => {
                const key = entry && typeof entry === 'object'
                    ? String(entry.id || entry.key || entry.role || entry.name || entry.title || `${fallbackPrefix}_${index + 1}`)
                    : `${fallbackPrefix}_${index + 1}`;
                if (entry && typeof entry === 'object') {
                    acc[key] = entry.prompt || entry.description || entry.value || entry.text || JSON.stringify(entry);
                } else {
                    acc[key] = String(entry || '').trim();
                }
                return acc;
            }, {});
        }
        if (typeof value === 'string' && value.trim()) return { summary: value.trim() };
        return {};
    }

    function validateTemplatePatchPlan(plan, decision) {
        assertPlainObject(plan, 'Template patch generation', 'TemplatePatchPlan');
        if (plan.templateId && plan.templateId !== decision.templateId) {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'TemplatePatchPlan template mismatch', `The model returned templateId "${plan.templateId}" but the selected template is "${decision.templateId}".`, plan.templateId, ['retry', 'switch_model', 'manual_queue']);
        }
        ['userIntentSummary', 'gameName'].forEach(key => {
            if (typeof plan[key] !== 'string' || !plan[key].trim()) {
                throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'TemplatePatchPlan is incomplete', `The model omitted required TemplatePatchPlan field: ${key}.`, key, ['retry', 'switch_model', 'manual_queue']);
            }
        });
        const forbiddenKeys = ['files', 'filePatches', 'runtimePatch', 'codePatch', 'sourcePatch', 'diff', 'patches'];
        const forbidden = forbiddenKeys.filter(key => Object.prototype.hasOwnProperty.call(plan, key));
        if (forbidden.length) {
            throw createAIFlowError('PATCH_FILE_NOT_ALLOWED', 'template_compile_failure', 'Template patch targets are not allowed', `TemplatePatchPlan must not contain direct file/runtime patches: ${forbidden.join(', ')}.`, forbidden.join(', '), ['retry', 'manual_queue']);
        }
        const specPatches = plan.specPatches || {};
        plan.assetPrompts = normalizeTemplatePatchObjectField(plan.assetPrompts, 'assetPrompt');
        assertPlainObject(specPatches, 'Template patch generation', 'specPatches');
        assertPlainObject(plan.settingsPatch, 'Template patch generation', 'settingsPatch');
        assertPlainObject(plan.manifestPatch, 'Template patch generation', 'manifestPatch');
        assertPlainObject(plan.stylePatch, 'Template patch generation', 'stylePatch');
        assertPlainObject(plan.assetPrompts, 'Template patch generation', 'assetPrompts');
        const allowedSpecKeys = decision.templateId === 'roguelike_survival'
            ? ['meta', 'flow', 'waves', 'enemies', 'weapons', 'balance', 'effects', 'spec/waves.json', 'spec/enemies.json', 'spec/weapons.json', 'spec/balance.json', 'spec/effects.json']
            : ['meta', 'flow', 'game', 'coreRules', 'enemyTypes', 'enemyBulletTypes', 'bosses', 'waves', 'difficultyTuning'];
        const invalid = Object.keys(specPatches).filter(key => !allowedSpecKeys.includes(key));
        if (invalid.length) {
            throw createAIFlowError('PATCH_FILE_NOT_ALLOWED', 'template_compile_failure', 'Template patch module is not allowed', `TemplatePatchPlan contains modules outside ${decision.templateId}: ${invalid.join(', ')}.`, invalid.join(', '), ['retry', 'manual_queue']);
        }
        const requiredModules = decision.templateId === 'roguelike_survival'
            ? ['waves', 'enemies', 'weapons', 'balance', 'effects']
            : ['coreRules', 'enemyTypes', 'enemyBulletTypes', 'bosses', 'waves', 'difficultyTuning'];
        const missingModules = requiredModules.filter(key => !specPatches[key] && !specPatches[`spec/${key}.json`]);
        if (missingModules.length) {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'TemplatePatchPlan is missing required template modules', `The selected model must patch these ${decision.templateId} modules: ${missingModules.join(', ')}.`, missingModules.join(', '), ['retry', 'switch_model', 'manual_queue']);
        }
        if (!Object.keys(plan.assetPrompts).length) {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'TemplatePatchPlan is missing asset prompts', 'The model must return assetPrompts for generated visual direction, player, enemies, effects, and UI.', '', ['retry', 'switch_model', 'manual_queue']);
        }
        if (!Array.isArray(plan.playabilityChecklist) || plan.playabilityChecklist.length < 5) {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'TemplatePatchPlan playability checklist is incomplete', 'The model must include at least five playability checklist items covering systems, progression, enemies/bosses, win/fail, and inputs.', '', ['retry', 'switch_model', 'manual_queue']);
        }
        if (typeof plan.requiresRuntimeCodePatch !== 'boolean') {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'TemplatePatchPlan is missing requiresRuntimeCodePatch', 'The model must explicitly state whether runtime code changes are required.', '', ['retry', 'switch_model', 'manual_queue']);
        }
        return plan;
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

    function getCompactModelLabel(label) {
        const cleaned = cleanModelDisplayLabel(label);
        const normalized = cleaned.toLowerCase();
        if (!cleaned || normalized.includes('loading') || normalized.includes('no configured')) return 'AI';
        if (normalized.includes('qwen') && normalized.includes('max')) return 'Qwen Max';
        if (normalized.includes('qwen')) return 'Qwen';
        if (normalized.includes('gemini') && normalized.includes('flash') && normalized.includes('lite')) return 'Gemini Lite';
        if (normalized.includes('gemini') && normalized.includes('flash')) return 'Gemini Flash';
        if (normalized.includes('gemini') && normalized.includes('pro')) return 'Gemini Pro';
        if (normalized.includes('gemini')) return 'Gemini';
        if (normalized.includes('claude')) return 'Claude';
        if (normalized.includes('openai') || normalized.includes('gpt')) return 'GPT';
        if (normalized.includes('grok') || normalized.includes('xai')) return 'Grok';
        return cleaned.length > 14 ? `${cleaned.slice(0, 12).trim()}...` : cleaned;
    }

    function getActiveModelMeta() {
        if (!platformModelsLoaded && !hasConfiguredProvider(aiConfig.activeProvider)) {
            return {
                providerId: '',
                providerLabel: 'Platform AI',
                icon: 'AI',
                color: '#74E5FF',
                modelId: '',
                modelLabel: 'Loading models',
                reasoning: 'none',
                label: 'Loading models'
            };
        }
        if ((platformModelsLoaded && !hasLiveAIProvider(aiConfig.activeProvider)) || (platformAIAvailable && !platformModels.length && !hasConfiguredProvider(aiConfig.activeProvider))) {
            return {
                providerId: '',
                providerLabel: 'Platform AI',
                icon: 'AI',
                color: '#6b6972',
                modelId: '',
                modelLabel: 'No configured models',
                reasoning: 'none',
                label: 'No configured models'
            };
        }
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

    function hasConfiguredProvider(providerId = aiConfig.activeProvider) {
        const provider = aiConfig.providers[providerId];
        return Boolean(provider && provider.enabled && provider.apiKey && provider.apiKey.trim());
    }

    function hasLiveAIProvider(providerId = aiConfig.activeProvider) {
        const provider = aiConfig.providers[providerId];
        return Boolean(platformAIAvailable && provider && provider.enabled) || hasConfiguredProvider(providerId);
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
        try {
            const response = await fetch(apiUrl('/api/models'), { credentials: 'include' });
            if (!response.ok) {
                platformAIAvailable = false;
                return;
            }
            const data = await response.json();
            platformAIAvailable = true;
            normalizePublicModels(data.models || data.publicModels || data);

            if (platformModels.length) {
                const defaultId = data.defaultModel || data.defaultModelId;
                const defaultModel = platformModels.find(item => item.id === defaultId || item.modelId === defaultId) || platformModels[0];
                applyModelSelection(defaultModel);
            }
        } catch (error) {
            // Static preview keeps bundled model defaults.
            platformAIAvailable = false;
        } finally {
            platformModelsLoaded = true;
            updateModelUI();
        }
    }

    async function loadPlatformTemplates() {
        try {
            const response = await fetch(apiUrl('/api/templates/status'), {
                credentials: 'include',
                cache: 'no-store'
            });
            if (!response.ok) return;
            platformTemplateStatus = await response.json();
        } catch (error) {
            platformTemplateStatus = {
                bucketConfigured: false,
                bucketName: '',
                templates: []
            };
        } finally {
            platformTemplatesLoaded = true;
        }
    }

    function getPublishedTemplateStatus(templateId) {
        const id = String(templateId || '').trim();
        return (platformTemplateStatus.templates || []).find(template => (template.templateId || template.id) === id) || null;
    }

    function isPublishedRuntimeTemplate(templateId) {
        const status = getPublishedTemplateStatus(templateId);
        return Boolean(status && status.published);
    }

    function getTemplateAvailabilityError(decision) {
        if (!decision || !decision.templateId || !AUTO_GENERATION_TEMPLATE_IDS.has(decision.templateId)) return '';
        if (isLocalRuntimeApiBase()) return '';
        if (!platformTemplatesLoaded) return 'Template registry is still loading. Please retry in a moment.';
        const status = getPublishedTemplateStatus(decision.templateId);
        if (!status) return `Template "${decision.templateId}" is not registered by the backend.`;
        if (!status.published) {
            return `${status.label || decision.templateLabel || decision.templateId} has no published backend template yet. Upload and publish it in /admin before automatic generation.`;
        }
        return '';
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function compactPlainText(value, maxLength = 1200) {
        const container = document.createElement('div');
        container.innerHTML = String(value || '');
        const text = (container.textContent || container.innerText || String(value || ''))
            .replace(/\s+/g, ' ')
            .trim();
        return text.slice(0, maxLength);
    }

    function t(key, vars = {}) {
        const parts = key.split('.');
        let value = CHAT_I18N[chatLanguage] || CHAT_I18N.en;
        parts.forEach(part => {
            value = value && value[part];
        });
        if (typeof value !== 'string') {
            value = CHAT_I18N.en;
            parts.forEach(part => {
                value = value && value[part];
            });
        }
        value = typeof value === 'string' ? value : key;
        Object.entries(vars).forEach(([name, replacement]) => {
            value = value.replaceAll(`{${name}}`, replacement);
        });
        return value;
    }

    function generatedUiText(key) {
        return t(key);
    }

    function detectChatLanguage(text) {
        const source = String(text || '').trim();
        if (!source) return 'en';
        if (/[\u3040-\u30ff]/.test(source)) return 'ja';
        if (/[\uac00-\ud7af]/.test(source)) return 'ko';
        if ((source.match(/[\u4e00-\u9fff]/g) || []).length >= 2) return 'zh';
        return 'en';
    }

    function setChatLanguageFromText(text) {
        const next = detectChatLanguage(text);
        chatLanguage = CHAT_I18N[next] ? next : 'en';
        updateLocalizedUI();
    }

    function getLocalizedStepTitle(key) {
        return t(`titles.${key}`);
    }

    function getOptionLocaleEntry(item, step) {
        const definition = typeof step === 'object' && step ? step : getStepDefinition(step);
        const key = definition && definition.key;
        if (!key) return null;
        const localeMap = OPTION_I18N[chatLanguage] && OPTION_I18N[chatLanguage][key];
        if (!localeMap) return null;
        return localeMap[item && item.label] || null;
    }

    function getLocalizedOptionLabel(item, step) {
        const entry = getOptionLocaleEntry(item, step);
        return (entry && entry.label) || (item && (item.label || item.value || item.desc)) || '';
    }

    function getLocalizedOptionDesc(item, step) {
        const entry = getOptionLocaleEntry(item, step);
        return (entry && entry.desc) || (item && item.desc) || '';
    }

    function getLocalizedOptionValueForDisplay(item, step) {
        const entry = getOptionLocaleEntry(item, step);
        return (entry && (entry.value || entry.label)) || (item && (item.value || item.label || item.desc)) || '';
    }

    function getBotMessage(step) {
        const definition = getStepDefinition(step);
        return definition
            ? t(`prompts.${definition.key}`)
            : t('promptFallback');
    }

    function getLanguageInstruction() {
        const names = {
            en: 'English',
            zh: 'Simplified Chinese',
            ja: 'Japanese',
            ko: 'Korean'
        };
        return `Use ${names[chatLanguage] || 'English'} for user-facing text.`;
    }

    function bhText(key) {
        const copy = {
            planTitle: 'Bullet Hell / Flying Shooter product plan',
            planBadge: 'Template locked: bullet-hell',
            confirm: 'Confirm and generate',
            revise: 'I want to adjust it',
            aiRequiredTitle: 'AI product plan failed',
            aiRequiredBody: 'This flying shooter path requires an AI-generated product plan first. Please leave an email so we can route it to the production queue.',
            goal: 'Goal',
            challenge: 'Challenge',
            progression: 'Progression',
            difficulty: 'Difficulty',
            boss: 'Boss',
            waves: 'Waves',
            researchTitle: 'Droi is designing the flying shooter',
            researchSubtitle: 'Building a product plan before generation...',
            directConfirm: 'I will turn this plan into the existing bullet-hell template and generate the preview.'
        };
        return copy[key] || key;
    }

    function planLabel(key) {
        return (PLAN_FIELD_LABELS[chatLanguage] && PLAN_FIELD_LABELS[chatLanguage][key]) ||
            PLAN_FIELD_LABELS.en[key] ||
            key;
    }

    function profileText(key) {
        const pack = INSPIRE_PROFILE_TEXT[chatLanguage] || INSPIRE_PROFILE_TEXT.en;
        return pack[key] || INSPIRE_PROFILE_TEXT.en[key] || key;
    }

    function profileDirectionLabel(direction) {
        const pack = INSPIRE_PROFILE_TEXT[chatLanguage] || INSPIRE_PROFILE_TEXT.en;
        const fallbackDirections = INSPIRE_PROFILE_TEXT.en.directions || {};
        return (pack.directions && pack.directions[direction]) ||
            fallbackDirections[direction] ||
            direction;
    }

    function localizedValue(value) {
        if (!value || typeof value !== 'object') return String(value || '');
        return value[chatLanguage] || value.en || value.zh || '';
    }

    function profileOptionLabel(option) {
        return localizedValue(option.label);
    }

    function profileOptionIcon(option, dimension) {
        if (option.icon) return option.icon;
        if (!dimension || !option) return '';
        const iconMap = {
            mood: {
                happy: 'Sun',
                calm: 'Leaf',
                excited: 'Star',
                focused: 'Focus',
                tired: 'Moon',
                nostalgic: 'Shell',
                curious: 'Dot',
                bold: 'Bolt'
            },
            scene: {
                short_break: 'Clock',
                weekend: 'Home',
                late_night: 'Moon',
                party: 'Spark',
                commute: 'Road',
                work_break: 'Cup',
                rainy_day: 'Rain',
                cozy_evening: 'Lamp'
            },
            state: {
                decompress: 'Leaf',
                challenge: 'Peak',
                immerse: 'Portal',
                collect: 'Gem',
                explore: 'Map',
                mastery: 'Crown',
                build: 'Block',
                flow: 'Wave'
            },
            vibe: {
                cozy_cute: 'Heart',
                cyber_neon: 'Pulse',
                pixel_retro: 'Pixel',
                storybook: 'Book',
                animal_island: 'Island',
                watercolor: 'Drop',
                dark_gothic: 'Crest',
                clay_toy: 'Clay'
            }
        };
        return (iconMap[dimension.key] && iconMap[dimension.key][option.id]) || '';
    }

    function profileOptionIconKey(option, dimension) {
        if (!option || !dimension) return '';
        return `${dimension.key}-${option.id}`.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
    }

    function profileOptionInlineHtml(option, dimension) {
        const icon = profileOptionIcon(option, dimension);
        const iconKey = profileOptionIconKey(option, dimension);
        const iconHtml = icon ? `<span class="profile-mood-icon animal-profile-icon" data-profile-icon="${escapeHtml(iconKey)}" aria-hidden="true"><span class="icon-fallback">${escapeHtml(icon)}</span></span>` : '';
        return `${iconHtml}<span>${escapeHtml(profileOptionLabel(option))}</span>`;
    }

    function profileDimensionTitle(dimension) {
        return localizedValue(dimension.title);
    }

    function profileDimensionHint(dimension) {
        return localizedValue(dimension.hint);
    }

    function profileDimensionImpact(dimension) {
        return localizedValue(dimension.impact);
    }

    function setTextIfFound(selector, value) {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    function updateLocalizedUI() {
        if (mainInput) mainInput.placeholder = t('mainPlaceholder');
        if (submitBtn) submitBtn.innerHTML = t('create');
        const chatField = document.getElementById('chatInputField');
        const chatSend = document.getElementById('chatSendBtn');
        const chatMic = document.getElementById('chatMicBtn');
        if (chatField) chatField.placeholder = t('chatPlaceholder');
        if (chatSend) {
            chatSend.title = t('send');
            chatSend.setAttribute('aria-label', t('send'));
        }
        if (chatMoreBtn) {
            const moreTextNode = Array.from(chatMoreBtn.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
            if (moreTextNode) moreTextNode.textContent = ` ${t('moreOptions')}`;
            else chatMoreBtn.appendChild(document.createTextNode(` ${t('moreOptions')}`));
        }
        if (chatMic) chatMic.title = 'Voice input';
        setTextIfFound('#step1 .step-text', t('stepAnalyze'));
        setTextIfFound('#step2 .step-text', t('stepAssets'));
        setTextIfFound('#step3 .step-text', t('stepBuild'));
        const modalTitle = document.querySelector('#emailModal .modal-title');
        const modalText = document.querySelector('#emailModal .modal-text');
        const modalSubmit = document.getElementById('modalEmailSubmitBtn');
        const modalClose = document.getElementById('closeEmailModalBtn');
        if (modalTitle) modalTitle.textContent = t('delayTitle');
        if (modalText) modalText.textContent = t('emailText');
        if (modalSubmit && !modalSubmit.disabled) modalSubmit.textContent = t('send');
        if (modalClose) modalClose.textContent = t('skip');
    }

    class AIService {
        constructor(getConfig, onUsage) {
            this.getConfig = getConfig;
            this.onUsage = onUsage;
        }

        async chat(messages, options = {}) {
            return this.stageChat('/api/chat', messages, options);
        }

        async stageChat(endpoint, messages, options = {}) {
            const config = this.getConfig();
            const providerId = options.provider || config.activeProvider;
            const provider = config.providers[providerId];
            const meta = PROVIDER_META[providerId];

            if (!provider || !meta) throw new Error(`Provider ${providerId} is not supported.`);
            const model = options.model || getProviderModelId(providerId);

            const platformResult = await this.tryPlatformChat(providerId, model, messages, endpoint, options);
            if (platformResult) {
                this.onUsage(providerId, model, platformResult.usage || {});
                return {
                    ...platformResult,
                    providerId,
                    model
                };
            }

            throw createAIFlowError(
                'MODEL_NOT_CONFIGURED',
                'model_config_failure',
                'Current model is not configured',
                `Platform API for ${meta.label} is not configured yet.`,
                providerId,
                ['switch_model', 'check_config', 'manual_queue']
            );
        }

        async tryPlatformChat(providerId, model, messages, endpoint = '/api/chat', options = {}) {
            try {
                const startedAt = performance.now();
                const response = await fetch(apiUrl(endpoint), {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        provider: providerId,
                        model,
                        modelId: model,
                        messages,
                        maxTokens: options.maxTokens
                    })
                });

                if (response.status === 404) {
                    throw createAIFlowError('MODEL_NOT_CONFIGURED', 'model_config_failure', 'Current model is not configured', 'The platform chat endpoint or selected model is not available.', `HTTP ${response.status}`, ['switch_model', 'check_config', 'manual_queue']);
                }
                const data = await this.parseResponse(response);
                platformAIAvailable = true;
                recordDiagnostic('ai-call', {
                    phase: options.phase || endpoint,
                    provider: providerId,
                    model,
                    status: response.status,
                    ms: Math.round(performance.now() - startedAt),
                    totalTokens: data.usage?.total_tokens || data.usage?.totalTokens || 0,
                    completionTokens: data.usage?.completion_tokens || 0
                });
                return {
                    content: data.content || data.message || data.text || '',
                    usage: data.usage || {}
                };
            } catch (error) {
                throw classifyAIFlowError(error, 'Model call');
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
    let platformModelsLoaded = false;
    let platformModels = [];
    let platformTemplatesLoaded = false;
    let platformTemplateStatus = {
        bucketConfigured: false,
        bucketName: '',
        templates: []
    };
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
    let chatLanguage = 'en';
    let chatSelections = createEmptySelections();
    let chatShown = createChatTracking(() => new Set());
    let chatCurrent = createChatTracking(() => []);

    let analysisState = {
        active: false,
        ...createEmptySelections(),
        background: null,
        processing: false,
        revisionMode: false,
        templateDecision: null,
        gamePlanningDecision: null,
        artSkillDecision: null,
        capability: null,
        analysisModelMeta: null,
        finalModelMeta: null,
        workStartedAt: 0,
        modules: createModuleStates()
    };

    function createInspireProfileState() {
        return {
            active: false,
            stepIndex: 0,
            selections: INSPIRE_PROFILE_DIMENSIONS.reduce((acc, dimension) => {
                acc[dimension.key] = [];
                return acc;
            }, {}),
            recommendations: [],
            selectedRecommendation: null
        };
    }

    let inspireProfileState = createInspireProfileState();

    // Global tracking for animation processes to allow interruption
    let generationInterval = null;
    let generationTimeouts = [];
    let botWorkIntervals = [];
    let activeGameCleanups = [];
    let latestGamePlanDraft = '';
    let latestGamePlan = null;
    let latestGenerationPlan = null;
    let latestAIFlowError = null;
    let chatTranscript = [];
    let bulletHellPlanState = {
        active: false,
        confirmed: false,
        originalPrompt: '',
        baseSpec: null,
        plan: null,
        error: null
    };

    function regTimeout(fn, delay) {
        const t = setTimeout(fn, delay);
        generationTimeouts.push(t);
        return t;
    }

    let analysisTimeout = null;

    function clearInspirePromptTimer() {
        if (analysisTimeout) {
            clearTimeout(analysisTimeout);
            analysisTimeout = null;
        }
        const promptContainer = document.getElementById('inspirePromptContainer');
        if (promptContainer) promptContainer.remove();
    }

    function isWaitingForInspirePrompt(step) {
        if (!chatInputField || !chatOptionsList) return false;
        if (chatInputField.value.trim() !== '') return false;
        if (chatStep !== step) return false;
        if (analysisState.processing || analysisState.revisionMode) return false;
        if (bulletHellPlanState.active) return false;
        if (chatOptionsList.children.length > 0) return false;
        if (document.querySelector('.ai-work-card')) return false;
        return true;
    }

    function getStepDefinition(step) {
        return MODULE_STEPS[step] || null;
    }

    function getStepByKey(key) {
        return MODULE_STEPS.findIndex(step => step && step.key === key);
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
        renderInspireProfileSidebar();
    }

    function getModuleSelection(key) {
        return analysisState[key] || chatSelections[key] || null;
    }

    function promptIncludesAny(prompt, terms) {
        const normalized = normalizeAnswerText(prompt);
        return terms.some(term => {
            const value = normalizeAnswerText(term);
            return value && normalized.includes(value);
        });
    }

    function hasExplicitPromptEvidenceForStep(key, prompt) {
        const text = String(prompt || '');
        if (!text.trim()) return false;
        if (key === 'type') {
            const best = scoreTemplatesForText(text)[0];
            return Boolean(best && (best.directHit || best.hits.length > 0 || best.confidence >= 0.7));
        }
        if (key === 'style') {
            return ART_STYLES.some(item => promptIncludesAny(text, [item.label, item.value]));
        }
        if (key === 'setting') {
            return SETTINGS.some(item => promptIncludesAny(text, [item.label, item.value]));
        }
        if (key === 'coreGameplay') {
            return /\b(auto[-\s]?attack|auto[-\s]?fire|manual|aim|dodge|shoot|slash|tower|defen[cs]e|build|craft|puzzle|solve)\b/i.test(text);
        }
        if (key === 'playerGoal') {
            return /\b(surviv(e|es|al)|timer|\d+\s*(minute|min)|boss|defeat|beat|clear|escape|destination|high\s*score|score)\b/i.test(text);
        }
        if (key === 'mainChallenge') {
            return /\b(wave|swarm|enemy|enemies|elite|boss|phase|hazard|trap|resource|ammo|energy|limit)\b/i.test(text);
        }
        if (key === 'progressionSystem') {
            return /\b(xp|experience|level|upgrade|skill\s*tree|skill\s*point|equipment|gear|drop|unlock|craft)\b/i.test(text);
        }
        if (key === 'difficultyLevel') {
            return /\b(easy|casual|normal|medium|hard|difficult|brutal|expert)\b/i.test(text);
        }
        return false;
    }

    function isModuleSelectionComplete(definition) {
        if (!definition) return true;
        const selection = getModuleSelection(definition.key);
        if (!selection) return false;
        if (isBulletHellLocked(analysisState.background || savedPrompt || '', getCurrentGameSpec())) return true;
        const moduleState = analysisState.modules && analysisState.modules[definition.key];
        if (!moduleState) return true;
        if (moduleState.userEdited) return true;
        if (moduleState.status !== 'confirmed') return false;
        return hasExplicitPromptEvidenceForStep(definition.key, analysisState.background || savedPrompt || '');
    }

    function getNextMissingStep() {
        for (let step = 1; step < MODULE_STEPS.length; step += 1) {
            const definition = getStepDefinition(step);
            if (definition && !isModuleSelectionComplete(definition)) return step;
        }
        return null;
    }

    function getModulePrompt(step) {
        const definition = getStepDefinition(step);
        if (!definition) return t('promptFallback');
        return t(`prompts.${definition.key}`);
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

        if (!normalized) return t('promptFallback');
        if (normalized === title || normalized === key) {
            return `${t('promptFallback')} ${getLocalizedStepTitle(definition.key)}`;
        }
        if (systemPhrases.includes(normalized)) {
            return t('promptFallback');
        }
        if (definition.key === 'progressionSystem' && ['progression', 'progression system', 'upgrade', 'upgrades', 'growth', 'grow stronger'].includes(normalized)) {
            return `${t('prompts.progressionSystem')} ${getLocalizedStepTitle('progressionSystem')}`;
        }
        return '';
    }

    function buildClarificationRetryMessage(definition, reason) {
        const step = getStepByKey(definition.key);
        const examples = (definition.pool || []).slice(0, 3).map(item => getLocalizedOptionLabel(item, step)).join(', ');
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

    function handleFreeTextForStep(definition, promptText, onAccepted) {
        if (!definition) return false;
        const reservedReason = getInvalidAnswerReason(promptText, definition);
        const matchedChoice = reservedReason ? null : matchChoice(definition.pool, promptText, 'desc');
        const invalidReason = reservedReason || (matchedChoice ? '' : getInvalidAnswerReason(promptText, definition));
        if (invalidReason) {
            addBotMessage(buildClarificationRetryMessage(definition, invalidReason), () => {
                regTimeout(() => renderChatOptions(getStepByKey(definition.key)), 160);
            });
            return true;
        }
        const selected = matchedChoice || { label: promptText, value: promptText, desc: promptText };
        onAccepted(selected);
        return true;
    }

    function startAnalysisFlow(prompt) {
        if (analysisState.active && analysisState.processing) return;
        clearInspirePromptTimer();
        resetBulletHellPlanState();

        analysisState.active = true;
        analysisState.processing = true;
        MODULE_STEPS.slice(1).forEach(step => {
            analysisState[step.key] = null;
        });
        analysisState.modules = createModuleStates();
        analysisState.background = prompt;
        analysisState.templateDecision = null;
        analysisState.gamePlanningDecision = null;
        analysisState.artSkillDecision = null;
        analysisState.capability = null;
        analysisState.analysisModelMeta = null;
        analysisState.workStartedAt = Date.now();

        const analysisMessage = addBotMessage('', null, { pending: true });

        runPromptAnalysis(prompt, analysisState.workStartedAt, analysisMessage);
    }

    async function runPromptAnalysis(prompt, runStartedAt, pendingMessage) {
        try {
            requireActiveAIModel('Game request analysis');
            await withTimeout(analyzePromptWithAIIfAvailable(prompt), AI_ANALYSIS_TIMEOUT_MS, 'Game request analysis');
        } catch (error) {
            if (!analysisState.active || analysisState.workStartedAt !== runStartedAt) return;
            analysisState.processing = false;
            if (pendingMessage) pendingMessage.remove();
            showAIFlowError(error, {
                phase: 'Game request analysis',
                onRetry: () => {
                    if (!analysisState.active) startAnalysisFlow(prompt);
                    else {
                        analysisState.processing = true;
                        analysisState.workStartedAt = Date.now();
                        const retryMessage = addBotMessage('', null, { pending: true, workType: 'thinking' });
                        runPromptAnalysis(prompt, analysisState.workStartedAt, retryMessage);
                    }
                }
            });
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
            const keywords = [...(template.keywords || []), ...(template.intentAliases || [])];
            const hits = keywords.filter(keyword => intent.includes(String(keyword).toLowerCase()));
            const directHit = intent.includes(template.type) ||
                intent.includes(template.id.replace(/_/g, ' ')) ||
                intent.includes(template.label.toLowerCase());
            const hitScore = Math.min(0.66, hits.length * 0.11);
            const confidence = Math.min(0.98, (directHit ? 0.58 : 0.18) + hitScore + template.confidenceBoost);
            return { ...template, confidence, hits, directHit };
        }).sort((a, b) => (b.confidence - a.confidence) || (b.hits.length - a.hits.length) || Number(b.directHit) - Number(a.directHit));
    }

    function applyP0ClosureDefaults(prompt) {
        const text = String(prompt || '').trim();
        if (text.length < 20) return;
        const normalizedIntent = normalizeGameTypeForTemplate(text, { background: text });
        if (normalizedIntent.locked) {
            setModuleSelection('type', {
                label: normalizedIntent.normalizedGameType,
                value: normalizedIntent.normalizedGameType,
                mechanic: normalizedIntent.genre
            }, 'confirmed', 0.98, false);
        }
        const best = scoreTemplatesForText(text)[0];
        const matched = Boolean(best && best.confidence >= 0.7 && best.hits.length > 0);

        if (matched) {
            if (!getModuleSelection('type')) {
                const typeChoice = GAME_TYPES.find(item => String(item.label).toLowerCase().includes(best.type.split('-')[0])) ||
                    GAME_TYPES.find(item => String(item.label).toLowerCase() === best.label.toLowerCase()) ||
                    (best.id === 'tower_defense' ? GAME_TYPES.find(item => item.label === 'Strategy') : null) ||
                    { label: best.label, value: best.label, mechanic: best.label };
                setModuleSelection('type', typeChoice, 'suggested', best.confidence, false);
            }
            if (!getModuleSelection('style')) setModuleSelection('style', ART_STYLES[0], 'suggested', 0.62, false);
            if (!getModuleSelection('setting')) {
                setModuleSelection('setting', {
                    label: 'Custom World',
                    value: 'the world described in your prompt',
                    desc: text
                }, 'suggested', 0.72, false);
            }
            if (!getModuleSelection('coreGameplay')) {
                const core = best.id === 'tower_defense'
                    ? CORE_GAMEPLAY_OPTIONS[2]
                    : (best.id === 'roguelike_survival' ? CORE_GAMEPLAY_OPTIONS[0] : CORE_GAMEPLAY_OPTIONS[1]);
                setModuleSelection('coreGameplay', core, 'suggested', 0.74, false);
            }
            if (!getModuleSelection('playerGoal')) {
                setModuleSelection('playerGoal', best.id === 'tower_defense' ? PLAYER_GOAL_OPTIONS[2] : PLAYER_GOAL_OPTIONS[0], 'suggested', 0.74, false);
            }
            if (!getModuleSelection('mainChallenge')) {
                setModuleSelection('mainChallenge', best.id === 'bullet_hell' ? MAIN_CHALLENGE_OPTIONS[2] : MAIN_CHALLENGE_OPTIONS[0], 'suggested', 0.7, false);
            }
            if (!getModuleSelection('progressionSystem')) setModuleSelection('progressionSystem', PROGRESSION_OPTIONS[0], 'suggested', 0.65, false);
            if (!getModuleSelection('difficultyLevel')) setModuleSelection('difficultyLevel', DIFFICULTY_OPTIONS[1], 'suggested', 0.65, false);
            return;
        }

        MODULE_STEPS.slice(1).forEach(step => {
            if (getModuleSelection(step.key)) return;
            if (step.key === 'type') {
                setModuleSelection(step.key, { label: 'Custom Request', value: 'custom request', mechanic: 'outside current P0 templates' }, 'suggested', 0.4, false);
            } else if (step.key === 'style') {
                setModuleSelection(step.key, { label: 'Prompt-defined style', value: 'prompt-defined style' }, 'suggested', 0.4, false);
            } else if (step.key === 'setting') {
                setModuleSelection(step.key, { label: 'Custom World', value: 'custom world', desc: text }, 'suggested', 0.45, false);
            } else if (step.key === 'difficultyLevel') {
                setModuleSelection(step.key, DIFFICULTY_OPTIONS[1], 'suggested', 0.5, false);
            } else {
                setModuleSelection(step.key, { label: `Custom ${step.title}`, value: `Custom ${step.title}`, desc: 'Manual queue will clarify this requirement.' }, 'suggested', 0.38, false);
            }
        });
    }

    function applyLocalPromptAnalysis(prompt) {
        const p = prompt.toLowerCase();
        const bulletIntent = normalizeGameTypeForTemplate(prompt, { background: prompt });
        if (bulletIntent.locked) {
            setModuleSelection('type', {
                label: bulletIntent.normalizedGameType,
                value: bulletIntent.normalizedGameType,
                mechanic: bulletIntent.genre
            }, 'confirmed', 0.98, false);
            if (!getModuleSelection('coreGameplay')) {
                setModuleSelection('coreGameplay', {
                    label: 'Move, dodge, shoot, and bomb clear',
                    value: 'Manual movement, focused shooting, bullet dodging, and bomb screen-clear.',
                    desc: 'Bullet hell flying shooter controls and combat loop.'
                }, 'suggested', 0.86, false);
            }
            if (!getModuleSelection('playerGoal')) {
                setModuleSelection('playerGoal', {
                    label: 'Defeat the final Boss',
                    value: 'Clear waves and defeat a final multi-phase Boss.',
                    desc: 'Boss clear win condition.'
                }, 'suggested', 0.86, false);
            }
            if (!getModuleSelection('mainChallenge')) {
                setModuleSelection('mainChallenge', {
                    label: 'Waves and Boss phases',
                    value: 'Enemy wave pressure, projectile patterns, and multi-phase Boss attacks.',
                    desc: 'Escalating bullet patterns and phase changes.'
                }, 'suggested', 0.86, false);
            }
            if (!getModuleSelection('progressionSystem') && /upgrade|power|weapon|drop|shield|life|bomb|升级|武器|掉落|护盾|生命|炸弹/i.test(prompt)) {
                setModuleSelection('progressionSystem', {
                    label: 'Weapon upgrades and pickups',
                    value: 'Power drops, weapon upgrades, bomb energy, shield, and life rewards.',
                    desc: 'Bullet hell progression rewards.'
                }, 'confirmed', 0.86, false);
            }
        }

        matchLocalPool('type', p, GAME_TYPES, 'mechanic');
        matchLocalPool('style', p, ART_STYLES);
        matchLocalPool('setting', p, SETTINGS, 'desc');
        matchLocalPool('difficultyLevel', p, DIFFICULTY_OPTIONS, 'desc');

        if (!getModuleSelection('coreGameplay')) {
            if (/\bauto[-\s]?attack|auto[-\s]?fire|weapon[s]?\s+attack automatically/i.test(prompt)) {
                setModuleSelection('coreGameplay', CORE_GAMEPLAY_OPTIONS[0], 'confirmed', 0.85, false);
            } else if (/\bmanual|aim|dodge|slash|shoot\b/i.test(prompt)) {
                setModuleSelection('coreGameplay', CORE_GAMEPLAY_OPTIONS[1], 'suggested', 0.65, false);
            } else if (/\btower|defen[cs]e|lane\b/i.test(prompt)) {
                setModuleSelection('coreGameplay', CORE_GAMEPLAY_OPTIONS[2], 'suggested', 0.75, false);
            }
        }

        if (!getModuleSelection('playerGoal')) {
            if (/\bsurviv(e|es|al)|\d+\s*(minute|min)|timer\b/i.test(prompt) && /\bboss|defeat\b/i.test(prompt)) {
                setModuleSelection('playerGoal', { label: 'Survive timer and defeat final boss', value: 'Survive a fixed duration, then defeat a final boss.', desc: 'Combined survival and boss clear condition.' }, 'confirmed', 0.85, false);
            } else if (/\bsurviv(e|es|al)|\d+\s*(minute|min)|timer\b/i.test(prompt)) {
                setModuleSelection('playerGoal', PLAYER_GOAL_OPTIONS[0], 'confirmed', 0.8, false);
            } else if (/\bboss|defeat|beat\b/i.test(prompt)) {
                setModuleSelection('playerGoal', PLAYER_GOAL_OPTIONS[1], 'confirmed', 0.8, false);
            }
        }

        if (!getModuleSelection('mainChallenge')) {
            if (/\bswarm|wave|enemy|arm(y|ies)|elite|boss phase/i.test(prompt)) {
                setModuleSelection('mainChallenge', { label: 'Enemy swarms, elites, and boss phases', value: 'Enemy volume, elite pressure, and phased boss encounters.', desc: 'Escalating combat pressure.' }, 'confirmed', 0.85, false);
            }
        }

        if (!getModuleSelection('progressionSystem')) {
            if (/\bxp|experience|level|upgrade|weapon upgrade/i.test(prompt)) {
                setModuleSelection('progressionSystem', PROGRESSION_OPTIONS[0], 'confirmed', 0.85, false);
            } else if (/\bskill tree|skill point/i.test(prompt)) {
                setModuleSelection('progressionSystem', PROGRESSION_OPTIONS[1], 'confirmed', 0.8, false);
            }
        }

        if (!getModuleSelection('setting') && p.length > 30) {
            setModuleSelection('setting', {
                label: 'Custom World',
                value: 'the world described in your prompt',
                desc: prompt
            }, 'suggested', 0.55, false);
        }
    }

    function matchLocalPool(key, promptLower, pool, extraKey) {
        if (getModuleSelection(key)) return;
        const found = pool.find(item => {
            const label = item.label.toLowerCase();
            const value = String(item.value || '').toLowerCase();
            return promptLower.includes(label) || (value && promptLower.includes(value)) || value.split(/\s+/).some(part => part.length > 4 && promptLower.includes(part));
        });
        if (found) setModuleSelection(key, found, 'confirmed', 0.8, false);
    }

    function withTimeout(promise, timeoutMs, phase = 'Model call') {
        let timeoutId = null;
        return Promise.race([
            Promise.resolve(promise).finally(() => {
                if (timeoutId) clearTimeout(timeoutId);
            }),
            new Promise((_, reject) => {
                timeoutId = setTimeout(() => {
                    recordDiagnostic('timeout', { phase, ms: timeoutMs });
                    reject(new Error(`${phase} timed out after ${timeoutMs}ms`));
                }, timeoutMs);
            })
        ]);
    }

    async function analyzePromptWithAIIfAvailable(prompt) {
        const activeModel = requireActiveAIModel('Game request analysis');
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
  "confidence": number,
  "generationRuleDecision": {"ruleId": "web_game_architecture_rules", "allowedEditClass": string, "confidence": number, "reason": string},
  "gamePlanningDecision": {"packId": string, "matchedSkills": string[], "confidence": number, "reason": string, "riskNotes": string[]},
  "gameTemplateDecision": {"templateId": "bullet_hell|roguelike_survival|unsupported|null", "templateLabel": string, "confidence": number, "reason": string},
  "templateDecision": {"templateId": "bullet_hell|roguelike_survival|unsupported|null", "confidence": number, "reason": string},
  "artSkillDecision": {"skillId": string, "label": string, "confidence": number, "reason": string, "matchedKeywords": string[]}|null,
  "capabilityDecision": {"supported": boolean, "blockedReasons": string[], "reason": string},
  "capability": {"supported": boolean, "blockedReasons": string[]}
}
Template mapping:
- flying shooter, plane shooter, space shooter, vertical shooter, shmup, bullet hell, dodge bullets, boss bullet fight => bullet_hell.
- roguelike, roguelite, Vampire Survivors, survivor-like, auto attack, wave survival, level-up choices => roguelike_survival.
Treat genre conventions as suggested, not confirmed, unless the user explicitly stated them. Do not invent complete plans in this step.`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        availableOptions: {
                            gameTypes: GAME_TYPES.map(item => item.value),
                            artStyles: ART_STYLES.map(item => item.value),
                            settings: SETTINGS.map(item => item.value),
                            coreGameplay: CORE_GAMEPLAY_OPTIONS.map(item => item.value),
                            playerGoals: PLAYER_GOAL_OPTIONS.map(item => item.value),
                            mainChallenges: MAIN_CHALLENGE_OPTIONS.map(item => item.value),
                            progression: PROGRESSION_OPTIONS.map(item => item.value),
                            difficulty: DIFFICULTY_OPTIONS.map(item => item.value)
                        },
                        availableGameTemplates: platformTemplateStatus.templates || [],
                        availableArtSkills: platformTemplateStatus.artSkills || [],
                        availableGamePlanningSkills: platformTemplateStatus.gamePlanningSkills || [],
                        requestContext: buildAIRequestContext(prompt)
                    })
                }
        ], {
            provider: activeModel.providerId,
            model: activeModel.modelId,
            maxTokens: 900,
            phase: 'Game request analysis'
        });

        const parsed = validateAnalysisResponse(extractModelJsonObject(response.content, 'Game request analysis'));
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
        analysisState.templateDecision = parsed.templateDecision || null;
        analysisState.gamePlanningDecision = parsed.gamePlanningDecision || null;
        analysisState.artSkillDecision = parsed.artSkillDecision || null;
        analysisState.capability = parsed.capability || null;
        analysisState.analysisModelMeta = {
            ...activeModel,
            responseModel: response.model || activeModel.modelId
        };

        if (!analysisState.setting && parsed.setting) {
            setModuleSelection('setting', {
                label: parsed.setting,
                value: parsed.setting,
                desc: parsed.background || parsed.setting
            }, 'suggested', 0.6, false);
        }

        return true;
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
        if (analysisState.active && (
            (analysisState.templateDecision && analysisState.templateDecision.templateId === 'unsupported') ||
            (analysisState.capability && analysisState.capability.supported === false)
        )) {
            clearInspirePromptTimer();
            const decision = matchTemplate(getCurrentGameSpec());
            showAIFlowError(buildUnsupportedTemplateError(decision), {
                phase: 'Template capability',
                onEditRequest: () => prepareP0RewriteRequest(decision)
            });
            return;
        }

        const nextStep = getNextMissingStep();
        if (nextStep) {
            askClarification(nextStep, getModulePrompt(nextStep));
            return;
        }

        finalizeAnalysis();
    }

    function askClarification(step, msgHtml) {
        chatStep = step;
        addBotMessage(msgHtml, () => {
        regTimeout(() => renderChatOptions(step), 160);

        // 娓呯悊涔嬪墠鐨勮鏃跺櫒
        clearInspirePromptTimer();

        // 3s 寤惰繜鍞よ捣 "Inspire Me" 鎸夐挳閫昏緫 (鍏ㄩ噺鍚屾)
        analysisTimeout = regTimeout(() => {
            // 鍙湁鍦ㄧ敤鎴锋病杈撳叆锛屼笖渚濈劧鍋滅暀鍦ㄥ綋鍓嶆楠ゆ椂鎵嶆樉绀?
            if (isWaitingForInspirePrompt(step)) {
                showInspireMePrompt(step);
            }
        }, 3000);
        });
    }

    function showInspireMePrompt(step) {
        if (!isWaitingForInspirePrompt(step)) return;
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
            if (!isWaitingForInspirePrompt(step)) {
                clearInspirePromptTimer();
                return;
            }
            const bubble = msgDiv.querySelector('#inspireBubble');
            if (bubble) {
                // Remove bubble styling so it looks exactly like the external button
                bubble.className = '';
                bubble.style.padding = '0';
                bubble.style.background = 'transparent';
                bubble.style.boxShadow = 'none';

                bubble.innerHTML = `
                    <div class="inspire-section" style="margin: 0; justify-content: flex-start;">
                        <span class="inspire-text">${escapeHtml(t('noIdea'))}</span>
                        <button type="button" class="inspire-entry-btn" id="chatInspireBtn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sparkle-icon">
                                <path d="M12 3v18M3 12h18M6.3 6.3l11.4 11.4M6.3 17.7l11.4-11.4" opacity="0.3"></path>
                                <path d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8l15.6-15.6" stroke="currentColor"></path>
                            </svg>
                            ${escapeHtml(t('inspire'))}
                        </button>
                    </div>
                `;
                chatHistory.scrollTop = chatHistory.scrollHeight;

                const btn = bubble.querySelector('#chatInspireBtn');
                btn.addEventListener('click', () => {
                    clearInspirePromptTimer();
                    renderInspireModeChoice(step);
                });
            }
        }, 1200);
    }

    function renderInspireModeChoice(resumeStep = 1) {
        const html = [
            `<div class="inspire-profile-kicker">${escapeHtml(t('inspire'))}</div>`,
            `<div class="inspire-mode-question">${escapeHtml(profileText('chooseMode'))}</div>`,
            '<div class="inspire-mode-grid">',
            `<button type="button" class="inspire-mode-btn" data-inspire-mode="quick"><strong>${escapeHtml(profileText('quickTitle'))}</strong><span>${escapeHtml(profileText('quickDesc'))}</span></button>`,
            `<button type="button" class="inspire-mode-btn" data-inspire-mode="profile"><strong>${escapeHtml(profileText('profileTitle'))}</strong><span>${escapeHtml(profileText('profileDesc'))}</span></button>`,
            '</div>'
        ].join('');

        addBotMessage(html, msgDiv => {
            msgDiv.querySelectorAll('[data-inspire-mode]').forEach(button => {
                button.addEventListener('click', () => {
                    msgDiv.querySelectorAll('[data-inspire-mode]').forEach(btn => {
                        btn.style.pointerEvents = 'none';
                        btn.style.opacity = btn === button ? '1' : '0.5';
                    });
                    const mode = button.getAttribute('data-inspire-mode');
                    if (mode === 'profile') {
                        addUserMessage(profileText('startProfile'));
                        startInspireProfileFlow();
                    } else {
                        addUserMessage(profileText('quickInspiration'));
                        askClarification(resumeStep, getBotMessage(resumeStep));
                    }
                });
            });
        });
    }

    function startInspireProfileFlow() {
        inspireProfileState = createInspireProfileState();
        inspireProfileState.active = true;
        renderInspireProfileSidebar();
        renderInspireProfileStep(0);
    }

    function getProfileSelectionLabels(key) {
        const dimension = INSPIRE_PROFILE_DIMENSIONS.find(item => item.key === key);
        const selectedIds = inspireProfileState.selections[key] || [];
        if (!dimension || !selectedIds.length) return [];
        return selectedIds.map(id => {
            const option = dimension.options.find(item => item.id === id);
            return option ? profileOptionLabel(option) : id;
        });
    }

    function getProfilePayload() {
        return INSPIRE_PROFILE_DIMENSIONS.reduce((acc, dimension) => {
            acc[dimension.key] = getProfileSelectionLabels(dimension.key);
            return acc;
        }, {});
    }

    function getProfileSummaryText(limitPerDimension = 2) {
        const parts = [];
        INSPIRE_PROFILE_DIMENSIONS.forEach(dimension => {
            const labels = getProfileSelectionLabels(dimension.key);
            if (!labels.length) return;
            const visible = labels.slice(0, limitPerDimension).join(', ');
            const more = labels.length > limitPerDimension ? ` +${labels.length - limitPerDimension}` : '';
            parts.push(`${visible}${more}`);
        });
        return parts.join(' / ') || profileText('none');
    }

    function getCurrentProfileStepText() {
        const dimension = INSPIRE_PROFILE_DIMENSIONS[inspireProfileState.stepIndex];
        return dimension ? profileDimensionTitle(dimension) : profileText('recommendationsTitle');
    }

    function toggleProfileSelection(key, id) {
        const selected = inspireProfileState.selections[key] || [];
        if (selected.includes(id)) {
            inspireProfileState.selections[key] = selected.filter(item => item !== id);
            return true;
        }
        if (selected.length >= PROFILE_SELECTION_LIMIT) {
            return false;
        }
        inspireProfileState.selections[key] = [...selected, id];
        return true;
    }

    function renderInspireProfileStep(stepIndex) {
        const dimension = INSPIRE_PROFILE_DIMENSIONS[stepIndex];
        if (!dimension) {
            finishInspireProfileSelection();
            return;
        }
        inspireProfileState.stepIndex = stepIndex;
        const isLast = stepIndex === INSPIRE_PROFILE_DIMENSIONS.length - 1;
        const selected = new Set(inspireProfileState.selections[dimension.key] || []);
        const isAtLimit = selected.size >= PROFILE_SELECTION_LIMIT;
        const optionsHtml = dimension.options.map((option, optionIndex) => `
            <button type="button" class="inspire-profile-chip${selected.has(option.id) ? ' selected' : ''}${isAtLimit && !selected.has(option.id) ? ' limit-disabled' : ''}" data-profile-option="${escapeHtml(option.id)}" data-profile-key="${escapeHtml(profileOptionIconKey(option, dimension))}" data-profile-color="${optionIndex % 8}">
                ${profileOptionInlineHtml(option, dimension)}
            </button>
        `).join('');

        const html = `
            <div class="inspire-profile-kicker">${stepIndex + 1}/${INSPIRE_PROFILE_DIMENSIONS.length} ${escapeHtml(profileDimensionTitle(dimension))}</div>
            <div><strong>${escapeHtml(profileDimensionHint(dimension))}</strong></div>
            <div style="margin-top:0.35rem; color:rgba(255,255,255,0.66); font-size:0.82rem; line-height:1.45;">${escapeHtml(profileDimensionImpact(dimension))}</div>
            <div class="inspire-profile-grid">${optionsHtml}</div>
            <div class="profile-selection-count" data-profile-selection-count>${selected.size}/${PROFILE_SELECTION_LIMIT}</div>
            <div class="inspire-profile-controls">
                <button type="button" class="inspire-profile-control" data-profile-skip>${escapeHtml(profileText('skip'))}</button>
                <button type="button" class="inspire-profile-control random" data-profile-random>${escapeHtml(profileText('random'))}</button>
                <button type="button" class="inspire-profile-control primary" data-profile-next>${escapeHtml(isLast ? profileText('generate') : profileText('next'))}</button>
            </div>
        `;

        addBotMessage(html, msgDiv => {
            const refreshLimitState = () => {
                const selectedIds = new Set(inspireProfileState.selections[dimension.key] || []);
                const atLimit = selectedIds.size >= PROFILE_SELECTION_LIMIT;
                msgDiv.querySelectorAll('[data-profile-option]').forEach(button => {
                    const id = button.getAttribute('data-profile-option');
                    button.classList.toggle('selected', selectedIds.has(id));
                    button.classList.toggle('limit-disabled', atLimit && !selectedIds.has(id));
                });
                const countNode = msgDiv.querySelector('[data-profile-selection-count]');
                if (countNode) countNode.textContent = `${selectedIds.size}/${PROFILE_SELECTION_LIMIT}`;
            };
            msgDiv.querySelectorAll('[data-profile-option]').forEach(button => {
                button.addEventListener('click', () => {
                    const changed = toggleProfileSelection(dimension.key, button.getAttribute('data-profile-option'));
                    if (!changed) {
                        button.classList.add('limit-shake');
                        regTimeout(() => button.classList.remove('limit-shake'), 260);
                        return;
                    }
                    refreshLimitState();
                    renderInspireProfileSidebar();
                });
            });

            const advance = skipped => {
                msgDiv.querySelectorAll('button').forEach(button => {
                    button.disabled = true;
                    button.style.pointerEvents = 'none';
                });
                const labels = getProfileSelectionLabels(dimension.key);
                const answer = skipped || !labels.length
                    ? `${profileDimensionTitle(dimension)}: ${profileText('none')}`
                    : `${profileDimensionTitle(dimension)}: ${labels.join(', ')}`;
                addUserMessage(answer);
                renderInspireProfileSidebar();
                regTimeout(() => renderInspireProfileStep(stepIndex + 1), 360);
            };

            const skipBtn = msgDiv.querySelector('[data-profile-skip]');
            const randomBtn = msgDiv.querySelector('[data-profile-random]');
            const nextBtn = msgDiv.querySelector('[data-profile-next]');
            if (skipBtn) skipBtn.addEventListener('click', () => advance(true));
            if (randomBtn) {
                randomBtn.addEventListener('click', () => {
                    const shuffled = [...dimension.options]
                        .sort(() => Math.random() - 0.5)
                        .slice(0, PROFILE_SELECTION_LIMIT)
                        .map(option => option.id);
                    inspireProfileState.selections[dimension.key] = shuffled;
                    refreshLimitState();
                    renderInspireProfileSidebar();
                });
            }
            if (nextBtn) nextBtn.addEventListener('click', () => advance(false));
        });
    }

    async function finishInspireProfileSelection() {
        inspireProfileState.active = false;
        renderInspireProfileSidebar();
        const researchStartedAt = Date.now();
        const pendingMessage = addBotMessage('', null, { pending: true, workType: 'research' });

        try {
            inspireProfileState.recommendations = await generateProfileRecommendations(getProfilePayload());
        } catch (error) {
            console.warn('Profile recommendation failed:', error);
            recordDiagnostic('ai-error', {
                phase: 'Inspiration profile recommendation',
                message: error.message || String(error),
                code: error.code || '',
                category: error.category || ''
            });
            inspireProfileState.recommendations = buildLocalProfileRecommendations(getProfilePayload());
            inspireProfileState.recommendationsFallback = true;
            if (pendingMessage) pendingMessage.remove();
            renderInspireProfileSidebar(true);
            enqueueProfileRecommendations({ fallback: true, error, delay: 0 });
            return;
        }

        inspireProfileState.recommendationsFallback = false;
        const remainingWorkTime = Math.max(0, 1600 - (Date.now() - researchStartedAt));
        if (remainingWorkTime) {
            await new Promise(resolve => setTimeout(resolve, remainingWorkTime));
        }
        if (pendingMessage) pendingMessage.remove();
        renderInspireProfileSidebar(true);
        enqueueProfileRecommendations({ delay: 420 });
    }

    function enqueueProfileRecommendations(options = {}) {
        const delay = Number.isFinite(options.delay) ? options.delay : 420;
        regTimeout(() => {
            addBotMessage(buildProfileRecommendationsHtml(inspireProfileState.recommendations, options), bindProfileRecommendationButtons);
        }, Math.max(0, delay));
    }

    function bindProfileRecommendationButtons(msgDiv) {
        msgDiv.querySelectorAll('[data-profile-rec]').forEach(button => {
            button.addEventListener('click', () => {
                const index = Number(button.getAttribute('data-profile-rec'));
                selectProfileRecommendation(index);
            });
        });
    }

    function buildProfileRecommendationsHtml(recommendations, options = {}) {
        const cards = recommendations.map((rec, index) => `
            <button type="button" class="inspire-recommendation-card rec-${escapeHtml(rec.direction)}" data-profile-rec="${index}">
                <span class="rec-type">${escapeHtml(profileDirectionLabel(rec.direction))}</span>
                <strong>${escapeHtml(rec.title)}</strong>
                <span>${escapeHtml(rec.description)}</span>
                <div class="rec-why">
                    <small>${escapeHtml(rec.reason)}</small>
                </div>
                <div class="rec-dna">${escapeHtml([rec.gameType, rec.artStyle, rec.gameSetting].filter(Boolean).join(' / '))}</div>
                <em>${escapeHtml(profileText('useDirection'))}</em>
            </button>
        `).join('');

        return `
            <div class="inspire-profile-kicker">${escapeHtml(profileText('recommendationsTitle'))}</div>
            <div class="inspire-profile-recommendation-hint${options.fallback ? ' is-fallback' : ''}">
                ${escapeHtml(profileText(options.fallback ? 'recommendationsFallbackHint' : 'recommendationsHint'))}
            </div>
            <div class="inspire-recommendation-list">${cards}</div>
        `;
    }

    function selectProfileRecommendation(index) {
        const recommendation = inspireProfileState.recommendations[index];
        if (!recommendation) return;
        if (analysisState.active) return;
        inspireProfileState.selectedRecommendation = recommendation;
        renderInspireProfileSidebar(true);
        addUserMessage(`${profileDirectionLabel(recommendation.direction)}: ${recommendation.title}`);
        addBotMessage(profileText('continuePrompt'), () => {
            const prompt = buildProfileRecommendationPrompt(recommendation, getProfilePayload());
            savedPrompt = prompt;
            saveToHistory(prompt);
            startAnalysisFlow(prompt);
        });
    }

    function normalizeRecommendation(raw, index) {
        const direction = INSPIRE_PROFILE_DIRECTIONS.includes(raw.direction)
            ? raw.direction
            : INSPIRE_PROFILE_DIRECTIONS[index] || 'stable';
        return {
            direction,
            title: String(raw.title || `${profileDirectionLabel(direction)} Game Idea`).slice(0, 80),
            description: String(raw.description || raw.summary || 'A compact game direction based on the current inspiration profile.').slice(0, 180),
            reason: String(raw.reason || 'Matches the selected mood profile and can enter the existing GameSpec flow.').slice(0, 180),
            gameType: String(raw.gameType || raw.suggestedGameType || (direction === 'surprise' ? 'Bullet Hell / Flying Shooter' : 'Roguelike Survival')),
            artStyle: String(raw.artStyle || 'Readable stylized 2D'),
            gameSetting: String(raw.gameSetting || 'A compact world shaped by the selected vibe.'),
            coreGameplay: String(raw.coreGameplay || 'Short-session movement, collection, combat, and clear progression feedback.')
        };
    }

    async function generateProfileRecommendations(profile) {
        const activeModel = requireActiveAIModel('Inspiration profile recommendation');
        const response = await withTimeout(aiService.chat([
            {
                role: 'system',
                content: `You recommend browser game concepts from a user mood profile. Return strict JSON only: {"recommendations":[{"direction":"stable|surprise|contrast","title":string,"description":string,"reason":string,"gameType":string,"artStyle":string,"gameSetting":string,"coreGameplay":string}]}. Return exactly 3 items in this order: stable, surprise, contrast. Keep each field concise. ${getLanguageInstruction()}`
            },
            {
                role: 'user',
                content: JSON.stringify({
                    profile,
                    allowedGameTypes: ['Roguelike Survival', 'Bullet Hell / Flying Shooter', 'Puzzle Adventure', 'Tower Defense', 'Platform Adventure'],
                    note: 'If the idea is flying shooter, use Game Type "Bullet Hell / Flying Shooter".'
                })
            }
        ], {
            provider: activeModel.providerId,
            model: activeModel.modelId,
            maxTokens: 700,
            phase: 'Inspiration profile recommendation'
        }), AI_PROFILE_TIMEOUT_MS, 'Inspiration profile recommendation');
        const parsed = extractModelJsonObject(response.content, 'Inspiration profile recommendation');
        const recommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations : parsed;
        if (Array.isArray(recommendations) && recommendations.length) {
            return INSPIRE_PROFILE_DIRECTIONS.map((direction, index) => normalizeRecommendation({
                ...(recommendations[index] || {}),
                direction
            }, index));
        }
        throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI profile recommendation is incomplete', 'The selected model must return exactly three recommendations.', '', ['retry', 'switch_model']);
    }

    function hasProfileValue(profile, key, candidates) {
        const values = (profile[key] || []).join(' ').toLowerCase();
        return candidates.some(candidate => values.includes(candidate.toLowerCase()));
    }

    function buildLocalProfileRecommendations(profile) {
        const energetic = hasProfileValue(profile, 'mood', ['excited', 'focused']) || hasProfileValue(profile, 'state', ['challenge']);
        const cozy = hasProfileValue(profile, 'mood', ['calm', 'tired', 'low']) || hasProfileValue(profile, 'state', ['decompress']);
        const cyber = hasProfileValue(profile, 'vibe', ['cyber', 'arcade']);
        const cute = hasProfileValue(profile, 'vibe', ['cozy', 'storybook']);
        const shortSession = hasProfileValue(profile, 'scene', ['commute', 'short_break', 'work_break']);
        const setting = cyber ? 'a neon skyline above a living circuit city'
            : cute ? 'a hand-drawn pocket world with gentle creatures'
                : 'a compact dream world shaped by today\'s mood';
        const artStyle = cyber ? 'Cyber neon arcade'
            : cute ? 'Cozy hand-drawn storybook'
                : 'Clean stylized arcade';
        return [
            {
                direction: 'stable',
                title: cozy ? 'Bloom Drift' : 'Skyline Defender',
                gameType: 'Bullet Hell / Flying Shooter',
                artStyle,
                gameSetting: setting,
                coreGameplay: 'Auto-fire flying shooter with readable projectile patterns, pickups, bombs, shields, and staged bosses.',
                description: 'A compact arcade run that starts friendly and escalates through waves and boss phases.',
                reason: shortSession ? 'Fits a short session with clear controls and immediate feedback.' : 'Matches the selected mood with a focused playable loop.'
            },
            {
                direction: 'surprise',
                title: energetic ? 'Pulse Garden Raid' : 'Pocket Starfall',
                gameType: 'Bullet Hell / Flying Shooter',
                artStyle: cute ? 'Cozy paper-cut arcade' : 'High-contrast arcade',
                gameSetting: cute ? 'floating garden islands above soft clouds' : 'orbital rails and drifting sky platforms',
                coreGameplay: 'Dodge bullets, collect energy, trigger fruit bombs, and defeat 3 to 4 bosses.',
                description: 'A more expressive variation that keeps the bullet-hell base but changes the visual fantasy.',
                reason: 'Adds a stronger theme while preserving the supported flying shooter template.'
            },
            {
                direction: 'contrast',
                title: 'Soft Storm Protocol',
                gameType: 'Bullet Hell / Flying Shooter',
                artStyle: 'Warm rounded UI with readable projectiles',
                gameSetting: 'a peaceful island sky suddenly invaded by patterned storm creatures',
                coreGameplay: 'A gentle-looking shooter with real bullet-dodging pressure, shields, bombs, and boss phases.',
                description: 'Contrasts a calm visual surface with satisfying arcade challenge.',
                reason: 'Useful when the player wants a fresh style without changing the game type.'
            }
        ];
    }

    function buildProfileRecommendationPrompt(recommendation, profile) {
        const profileLines = INSPIRE_PROFILE_DIMENSIONS.map(dimension => {
            const values = profile[dimension.key] && profile[dimension.key].length ? profile[dimension.key].join(', ') : 'none';
            return `${profileDimensionTitle(dimension)}: ${values}`;
        }).join('\n');
        const difficulty = hasProfileValue(profile, 'state', ['challenge']) ? 'Hard' : 'Normal';
        return `Inspiration profile\n${profileLines}\n\nSelected direction: ${profileDirectionLabel(recommendation.direction)}\nTitle: ${recommendation.title}\nGame Type: ${recommendation.gameType}\nArt Style: ${recommendation.artStyle}\nGame Setting: ${recommendation.gameSetting}\nCore Gameplay: ${recommendation.coreGameplay}\nBackground/Story: ${recommendation.description}\nPlayer Goal: Defeat every staged boss encounter.\nMain Challenge: Boss phases and projectile patterns.\nProgression System: Level-up choices and collectible power-ups.\nDifficulty Level: ${difficulty}\nRecommendation reason: ${recommendation.reason}`;
    }

    function getGameSpecSidebarRows() {
        return MODULE_STEPS.slice(1).map(step => {
            const selection = getModuleSelection(step.key);
            if (!selection) return null;
            const label = getLocalizedOptionLabel(selection, step) || selection.label || selection.value || selection.desc || '';
            const desc = getLocalizedOptionDesc(selection, step) || getLocalizedOptionValueForDisplay(selection, step) || '';
            return {
                title: getLocalizedStepTitle(step.key),
                label,
                desc: desc && desc !== label ? desc : ''
            };
        }).filter(Boolean);
    }

    function renderGameSpecSidebar(panel, openSidebar = false) {
        const rows = getGameSpecSidebarRows();
        if (!rows.length) {
            panel.style.display = 'none';
            panel.innerHTML = '';
            return;
        }

        const rowsHtml = rows.map(row => `
            <div class="inspire-profile-row">
                <div class="inspire-profile-label">${escapeHtml(row.title)}</div>
                <div class="inspire-profile-tags">
                    <span class="inspire-profile-tag">${escapeHtml(row.label)}</span>
                </div>
                ${row.desc ? `<div class="gamespec-sidebar-desc">${escapeHtml(row.desc)}</div>` : ''}
            </div>
        `).join('');

        panel.innerHTML = `
            <div class="inspire-profile-card gamespec-sidebar-card">
                <div class="inspire-profile-title">${escapeHtml(profileText('gameSpecSidebarTitle'))}</div>
                <div class="gamespec-sidebar-subtitle">${escapeHtml(profileText('currentGameSpec'))}</div>
                ${rowsHtml}
            </div>
        `;
        panel.style.display = 'block';
        if (openSidebar && historySidebar) historySidebar.classList.add('open');
    }

    function buildInspireProfileCardHtml({ interactive = false, compact = false } = {}) {
        const hasSelections = INSPIRE_PROFILE_DIMENSIONS.some(dimension => (inspireProfileState.selections[dimension.key] || []).length);
        const selected = inspireProfileState.selectedRecommendation;
        const summary = getProfileSummaryText(2);

        const rows = INSPIRE_PROFILE_DIMENSIONS.map(dimension => {
            const selectedIds = new Set(inspireProfileState.selections[dimension.key] || []);
            const isAtLimit = selectedIds.size >= PROFILE_SELECTION_LIMIT;
            const tagHtml = interactive
                ? dimension.options.map((option, optionIndex) => `
                    <button type="button" class="profile-sidebar-chip${selectedIds.has(option.id) ? ' selected' : ''}${isAtLimit && !selectedIds.has(option.id) ? ' limit-disabled' : ''}" data-profile-sidebar-key="${escapeHtml(dimension.key)}" data-profile-sidebar-option="${escapeHtml(option.id)}" data-profile-key="${escapeHtml(profileOptionIconKey(option, dimension))}" data-profile-color="${optionIndex % 8}">
                        ${profileOptionInlineHtml(option, dimension)}
                    </button>
                `).join('')
                : selectedIds.size
                    ? [...selectedIds].map(id => {
                        const option = dimension.options.find(item => item.id === id);
                        return option
                            ? `<span class="inspire-profile-tag profile-tag-with-icon">${profileOptionInlineHtml(option, dimension)}</span>`
                            : `<span class="inspire-profile-tag">${escapeHtml(id)}</span>`;
                    }).join('')
                    : `<span class="inspire-profile-tag">${escapeHtml(profileText('none'))}</span>`;
            return `
                <div class="inspire-profile-row">
                    <div class="inspire-profile-label">${escapeHtml(profileDimensionTitle(dimension))}</div>
                    <div class="${interactive ? 'profile-sidebar-chip-grid' : 'inspire-profile-tags'}">${tagHtml}</div>
                </div>
            `;
        }).join('');

        const currentHtml = selected ? `
            <div class="inspire-profile-current">
                <strong>${escapeHtml(profileDirectionLabel(selected.direction))}: ${escapeHtml(selected.title)}</strong>
                <span>${escapeHtml(selected.description)}</span>
            </div>
        ` : '';

        const emptyHint = !hasSelections && !selected && !inspireProfileState.recommendations.length
            ? `<div class="profile-sidebar-empty">${escapeHtml(profileText('none'))}</div>`
            : '';

        if (interactive) {
            const summaryRows = INSPIRE_PROFILE_DIMENSIONS.map(dimension => {
                const labels = getProfileSelectionLabels(dimension.key);
                const text = labels.length
                    ? `${labels.slice(0, 2).join(', ')}${labels.length > 2 ? ` +${labels.length - 2}` : ''}`
                    : '-';
                return `
                    <div class="profile-context-row">
                        <span>${escapeHtml(profileDimensionTitle(dimension))}</span>
                        <strong>${escapeHtml(text)}</strong>
                    </div>
                `;
            }).join('');

            return `
                <div class="inspire-profile-card chat-context-card">
                    <div class="inspire-profile-title">${escapeHtml(profileText('sidebarTitle'))}</div>
                    <div class="profile-context-status">
                        <small>${escapeHtml(selected ? 'Current pick' : (inspireProfileState.active ? `Step ${inspireProfileState.stepIndex + 1} / ${INSPIRE_PROFILE_DIMENSIONS.length}` : 'Profile'))}</small>
                        <strong>${escapeHtml(selected ? selected.title : getCurrentProfileStepText())}</strong>
                    </div>
                    ${summaryRows}
                    ${currentHtml}
                    <details class="profile-edit-details">
                        <summary>Edit profile</summary>
                        ${rows}
                    </details>
                    <div class="inspire-profile-actions">
                        <button type="button" data-profile-sidebar-restart>${escapeHtml(profileText('restart'))}</button>
                        <button type="button" class="primary" data-profile-sidebar-use ${selected && !analysisState.active ? '' : 'disabled'}>${escapeHtml(profileText('useDirection'))}</button>
                    </div>
                </div>
            `;
        }

        if (compact) {
            return `
                <div class="inspire-profile-card inspire-profile-card-compact">
                    <div class="inspire-profile-title">${escapeHtml(profileText('sidebarTitle'))}</div>
                    <div class="profile-compact-current">
                        <small>${escapeHtml(selected ? profileDirectionLabel(selected.direction) : (inspireProfileState.active ? `Step ${inspireProfileState.stepIndex + 1} / ${INSPIRE_PROFILE_DIMENSIONS.length}` : profileText('currentGameSpec')))}</small>
                        <strong>${escapeHtml(selected ? selected.title : getCurrentProfileStepText())}</strong>
                        <span>${escapeHtml(summary)}</span>
                    </div>
                    <details class="profile-compact-details">
                        <summary>${escapeHtml('Details')}</summary>
                        ${rows}
                        ${currentHtml}
                    </details>
                </div>
            `;
        }

        return `
            <div class="inspire-profile-card">
                <div class="inspire-profile-title">${escapeHtml(profileText('sidebarTitle'))}</div>
                ${emptyHint}
                ${rows}
                ${currentHtml}
                <div class="inspire-profile-actions">
                    <button type="button" data-profile-sidebar-restart>${escapeHtml(profileText('restart'))}</button>
                    <button type="button" class="primary" data-profile-sidebar-use ${selected && !analysisState.active ? '' : 'disabled'}>${escapeHtml(profileText('useDirection'))}</button>
                </div>
            </div>
        `;
    }

    function bindInspireProfileSidebar(panel) {
        if (!panel) return;
        panel.querySelectorAll('[data-profile-sidebar-option]').forEach(button => {
            button.addEventListener('click', () => {
                const key = button.getAttribute('data-profile-sidebar-key');
                const option = button.getAttribute('data-profile-sidebar-option');
                if (!key || !option) return;
                const changed = toggleProfileSelection(key, option);
                if (!changed) {
                    button.classList.add('limit-shake');
                    regTimeout(() => button.classList.remove('limit-shake'), 260);
                    return;
                }
                inspireProfileState.selectedRecommendation = null;
                inspireProfileState.recommendations = [];
                renderInspireProfileSidebar();
            });
        });

        const restartBtn = panel.querySelector('[data-profile-sidebar-restart]');
        const useBtn = panel.querySelector('[data-profile-sidebar-use]');
        if (restartBtn) restartBtn.addEventListener('click', () => {
            openChatView();
            addBotMessage(t('initial'), () => startInspireProfileFlow());
        });
        if (useBtn) useBtn.addEventListener('click', () => {
            if (inspireProfileState.selectedRecommendation) {
                selectProfileRecommendation(inspireProfileState.recommendations.indexOf(inspireProfileState.selectedRecommendation));
            }
        });
    }

    function renderInspireProfileSidebar(openSidebar = false) {
        const panel = document.getElementById('inspireProfilePanel');
        const chatPanel = document.getElementById('chatProfileSidebar');
        const inspireView = document.getElementById('inspireView');
        const hasSelections = INSPIRE_PROFILE_DIMENSIONS.some(dimension => (inspireProfileState.selections[dimension.key] || []).length);
        const selected = inspireProfileState.selectedRecommendation;
        const shouldShowProfile = inspireProfileState.active || hasSelections || selected || inspireProfileState.recommendations.length;
        const shouldShowGameSpec = getGameSpecSidebarRows().length > 0;

        if (!shouldShowProfile) {
            if (panel) renderGameSpecSidebar(panel, openSidebar);
            if (chatPanel) {
                renderGameSpecSidebar(chatPanel, false);
            }
            if (inspireView) inspireView.classList.toggle('has-profile-sidebar', shouldShowGameSpec);
            return;
        }

        if (panel) {
            panel.innerHTML = buildInspireProfileCardHtml({ interactive: false, compact: true });
            panel.style.display = 'block';
            bindInspireProfileSidebar(panel);
        }
        if (chatPanel) {
            chatPanel.innerHTML = buildInspireProfileCardHtml({ interactive: true });
            chatPanel.style.display = 'block';
            bindInspireProfileSidebar(chatPanel);
        }
        if (inspireView) inspireView.classList.add('has-profile-sidebar');
        if (openSidebar && historySidebar) historySidebar.classList.add('open');
    }

    function finalizeAnalysis() {
        clearInspirePromptTimer();
        MODULE_STEPS.slice(1).forEach(step => {
            chatSelections[step.key] = getModuleSelection(step.key);
        });

        askFinalConfirmation();
    }

    function getNextBatch(step) {
        const pool = CHAT_POOLS[step];
        if (!pool || !pool.length) return [];
        let available = pool.map((_, i) => i).filter(i => !chatShown[step].has(i));
        if (available.length < 2) {
            chatShown[step] = new Set(chatCurrent[step]);
            available = pool.map((_, i) => i).filter(i => !chatShown[step].has(i));
        }
        for (let i = available.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [available[i], available[j]] = [available[j], available[i]];
        }
        const picked = available.slice(0, Math.min(2, available.length));
        picked.forEach(i => chatShown[step].add(i));
        chatCurrent[step] = picked;
        return picked.map(i => pool[i]);
    }

    function getOptionIconKey(item, step) {
        const source = `${item.label || ''} ${item.value || ''}`.toLowerCase();
        if (source.includes('gothic')) return 'style-gothic';
        if (source.includes('anime') || source.includes('cartoon')) return 'style-anime';
        if (source.includes('cyber')) return 'style-cyber';
        if (source.includes('pixel')) return 'style-pixel';
        if (source.includes('minimal')) return 'style-minimal';
        if (source.includes('fantasy') || source.includes('medieval')) return 'style-fantasy';
        if (source.includes('retro') || source.includes('lo-fi')) return 'style-retro';
        if (source.includes('realistic') || source.includes('3d')) return 'style-3d';
        if (source.includes('space')) return 'setting-space';
        if (source.includes('water')) return 'setting-water';
        if (source.includes('ice') || source.includes('arctic') || source.includes('frozen')) return 'setting-ice';
        if (source.includes('haunted')) return 'setting-haunted';
        if (source.includes('east')) return 'setting-east';
        if (source.includes('post')) return 'setting-wasteland';
        if (source.includes('auto') || source.includes('swarm')) return 'play-auto';
        if (source.includes('boss')) return 'play-boss';
        if (source.includes('tower')) return 'play-tower';
        if (source.includes('puzzle')) return 'play-puzzle';
        if (source.includes('level') || source.includes('skill')) return 'play-level';
        if (source.includes('drop') || source.includes('equipment')) return 'play-drop';
        if (source.includes('craft')) return 'play-craft';
        if (source.includes('score')) return 'play-score';
        if (source.includes('roguelike')) return 'type-roguelike';
        if (source.includes('bullet')) return 'type-bullet';
        return step === 1 ? 'style-generic' : 'option-generic';
    }

    function getOptionIcon(item, step) {
        const source = `${item.label || ''} ${item.value || ''}`.toLowerCase();
        const exact = {
            rpg: 'RPG',
            puzzle: 'PZL',
            action: 'ACT',
            roguelike: 'ROG',
            'bullet hell': 'BHL',
            simulation: 'SIM',
            horror: 'HOR',
            rhythm: 'RHY',
            strategy: 'STR',
            survival: 'SUR',
            'pixel art': 'Pixel',
            'dark gothic': 'Gothic',
            'anime / cartoon': 'Anime',
            minimalist: 'Minimal',
            cyberpunk: 'Cyber',
            'fantasy illustration': 'Fantasy',
            'retro / lo-fi': 'Retro',
            realistic: '3D',
            'manual action combat': 'ATK',
            'auto-attack survival': 'AUTO',
            'level-up choices': 'LVL',
            easy: 'E',
            normal: 'N',
            hard: 'H',
            nightmare: 'NM'
        };
        const label = String(item.label || '').toLowerCase();
        if (exact[label]) return exact[label];
        if (source.includes('space')) return 'SPC';
        if (source.includes('cyber')) return 'Cyber';
        if (source.includes('gothic')) return 'Gothic';
        if (source.includes('fantasy') || source.includes('medieval')) return 'Fantasy';
        if (source.includes('post')) return 'WST';
        if (source.includes('water')) return 'SEA';
        if (source.includes('east')) return 'EAS';
        if (source.includes('ice') || source.includes('arctic') || source.includes('frozen')) return 'ICE';
        if (source.includes('haunted')) return 'GHT';
        if (source.includes('auto') || source.includes('swarm')) return 'AUTO';
        if (source.includes('boss')) return 'BOSS';
        if (source.includes('tower')) return 'TWR';
        if (source.includes('build')) return 'BLD';
        if (source.includes('puzzle')) return 'PZL';
        if (source.includes('survive') || source.includes('timer')) return 'SUR';
        if (source.includes('destination')) return 'GO';
        if (source.includes('score')) return 'SCORE';
        if (source.includes('level') || source.includes('skill')) return 'LVL';
        if (source.includes('drop') || source.includes('equipment')) return 'DROP';
        if (source.includes('craft')) return 'CRFT';
        return step === 1 ? 'ART' : 'OPT';
    }
    const chatInputField = document.getElementById('chatInputField');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatAttachBtn = document.getElementById('chatAttachBtn');
    const chatFileInput = document.getElementById('chatFileInput');
    const chatAttachmentTray = document.getElementById('chatAttachmentTray');
    const chatMicBtn = document.getElementById('chatMicBtn');
    let chatAttachments = [];
    let voiceRecorder = null;
    let voiceStream = null;
    let voiceChunks = [];
    let voiceStopTimer = null;
    let isListening = false;
    let isTranscribingVoice = false;
    let voiceBaseValue = '';
    const VOICE_MAX_RECORDING_MS = 60000;
    const VOICE_MAX_AUDIO_BYTES = 5 * 1024 * 1024;

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

    function summarizeAttachmentsForAI(attachments = []) {
        return attachments.map(item => ({
            name: item.file.name,
            type: item.file.type || getFileTypeLabel(item.file),
            size: item.file.size,
            sizeLabel: formatFileSize(item.file.size),
            previewAvailable: Boolean(item.previewUrl)
        }));
    }

    function recordChatTurn(role, content, meta = {}) {
        const text = compactPlainText(content, 1800);
        if (!text && !(meta.attachments && meta.attachments.length)) return;
        chatTranscript.push({
            role,
            content: text,
            attachments: meta.attachments || [],
            at: new Date().toISOString()
        });
        chatTranscript = chatTranscript.slice(-24);
    }

    function buildAIRequestContext(userPrompt = '') {
        const activeModel = getActiveModelMeta();
        return {
            currentModel: {
                providerId: activeModel.providerId,
                providerLabel: activeModel.providerLabel,
                modelId: activeModel.modelId,
                modelLabel: activeModel.modelLabel || activeModel.label
            },
            userPrompt,
            chatContext: chatTranscript.slice(-12),
            collectedGameSpec: getCurrentGameSpec(),
            attachmentSummary: chatTranscript
                .flatMap(turn => turn.attachments || [])
                .slice(-8),
            selectedProfile: inspireProfileState.selectedRecommendation || null,
            aiStages: {
                analysisModel: analysisState.analysisModelMeta || null,
                gamePlanModel: analysisState.finalModelMeta || null
            }
        };
    }

    function buildManualQueueContext() {
        const activeModel = getActiveModelMeta();
        const plan = latestGenerationPlan || null;
        const project = plan && plan.generatedProject ? plan.generatedProject : null;
        return {
            submittedAt: new Date().toISOString(),
            prompt: savedPrompt || analysisState.background || '',
            currentModel: {
                providerId: activeModel.providerId,
                providerLabel: activeModel.providerLabel,
                modelId: activeModel.modelId,
                modelLabel: activeModel.modelLabel || activeModel.label
            },
            gameSpec: getCurrentGameSpec(),
            templateDecision: analysisState.templateDecision || (plan && plan.decision) || null,
            gamePlanningDecision: analysisState.gamePlanningDecision || null,
            artSkillDecision: analysisState.artSkillDecision || null,
            capability: analysisState.capability || null,
            aiStages: {
                analysisModel: analysisState.analysisModelMeta || null,
                gamePlanModel: analysisState.finalModelMeta || null,
                templatePatchModel: plan && plan.templatePatchPlan ? plan.templatePatchPlan.modelMeta || null : null
            },
            selectedProfile: inspireProfileState.selectedRecommendation || null,
            bulletHellProductPlan: bulletHellPlanState.plan || null,
            gamePlan: latestGamePlan || (plan && plan.productionPlan) || null,
            templatePatchPlan: plan && plan.templatePatchPlan ? plan.templatePatchPlan : null,
            validationReport: project && project.validationReport ? project.validationReport : null,
            generatedFiles: project && Array.isArray(project.files)
                ? project.files.map(file => ({ path: file.path, kind: file.kind, patched: file.patched, size: file.size }))
                : [],
            lastError: latestAIFlowError,
            chatContext: chatTranscript.slice(-16),
            attachmentSummary: chatTranscript.flatMap(turn => turn.attachments || []).slice(-8)
        };
    }

    function buildManualQueuePrompt() {
        const context = buildManualQueueContext();
        return [
            savedPrompt || analysisState.background || 'Manual game generation request',
            '',
            '--- Droi AI generation context ---',
            JSON.stringify(context, null, 2)
        ].join('\n').slice(0, 12000);
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
        const maxInputHeight = window.innerHeight < 760 ? 132 : 160;
        chatInputField.style.height = 'auto';
        const nextHeight = Math.min(chatInputField.scrollHeight, maxInputHeight);
        chatInputField.style.height = `${nextHeight}px`;
        chatInputField.style.overflowY = chatInputField.scrollHeight > maxInputHeight ? 'auto' : 'hidden';
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
        let countState = 'normal';
        if (length >= maxLength) {
            countState = 'full';
        } else if (length >= maxLength * 0.8) {
            countState = 'warning';
        } else if (length >= maxLength * 0.5) {
            countState = 'mid';
        }
        countDisplay.dataset.countState = countState;
        countDisplay.style.color = '';
    }

    function setChatInputValue(value, options = {}) {
        if (!chatInputField) return;
        const maxLength = getChatInputMaxLength();
        chatInputField.value = String(value || '').slice(0, maxLength);
        updateChatInputHeight();
        updateChatCount();
        if (options.dispatch !== false) {
            chatInputField.dispatchEvent(new Event('input'));
        }
        if (options.focus) {
            chatInputField.focus();
            if (options.cursorToEnd) {
                const len = chatInputField.value.length;
                chatInputField.setSelectionRange(len, len);
            }
        }
    }

    function appendVoiceText(text) {
        if (!chatInputField) return;
        const joined = [voiceBaseValue.trim(), text.trim()].filter(Boolean).join(' ');
        setChatInputValue(joined, { focus: true });
    }

    function setVoiceButtonState(state, title) {
        if (!chatMicBtn) return;
        chatMicBtn.classList.toggle('is-listening', state === 'recording');
        chatMicBtn.classList.toggle('is-transcribing', state === 'transcribing');
        chatMicBtn.setAttribute('aria-pressed', state === 'recording' ? 'true' : 'false');
        chatMicBtn.title = title || 'Voice input';
        chatMicBtn.disabled = state === 'transcribing';
    }

    function getSupportedAudioMimeType() {
        if (!window.MediaRecorder) return '';
        const candidates = [
            'audio/webm;codecs=opus',
            'audio/webm',
            'audio/mp4'
        ];
        return candidates.find(type => MediaRecorder.isTypeSupported(type)) || '';
    }

    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const value = String(reader.result || '');
                resolve(value.includes(',') ? value.split(',').pop() : value);
            };
            reader.onerror = () => reject(reader.error || new Error('Failed to read audio.'));
            reader.readAsDataURL(blob);
        });
    }

    function cleanupVoiceStream() {
        if (voiceStopTimer) {
            clearTimeout(voiceStopTimer);
            voiceStopTimer = null;
        }
        if (voiceStream) {
            voiceStream.getTracks().forEach(track => track.stop());
            voiceStream = null;
        }
    }

    function getSpeechModelId() {
        return getPublicModelIdForProvider('gemini') || getProviderModelId('gemini') || 'gemini-3.1-pro-preview';
    }

    function getPublicModelIdForProvider(providerId) {
        const publicModel = platformModels.find(model => model.providerId === providerId && model.enabled !== false);
        return publicModel ? publicModel.modelId : '';
    }

    async function transcribeVoiceBlob(blob) {
        if (!blob || !blob.size) return;
        if (blob.size > VOICE_MAX_AUDIO_BYTES) {
            throw new Error('Audio is too large. Please keep recordings under 5MB.');
        }
        const audioBase64 = await blobToBase64(blob);
        const response = await fetch(apiUrl('/api/speech/transcribe'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                provider: 'gemini',
                modelId: getSpeechModelId(),
                mimeType: blob.type || 'audio/webm',
                audioBase64
            })
        });
        const data = await parseJsonResponse(response);
        if (data.text && data.text.trim()) {
            appendVoiceText(data.text.trim());
        }
    }

    function stopVoiceRecording() {
        if (!voiceRecorder || voiceRecorder.state === 'inactive') return;
        voiceRecorder.stop();
    }

    async function startVoiceRecording() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
            setVoiceButtonState('idle', 'Voice recording is not supported in this browser.');
            throw new Error('Voice recording is not supported in this browser.');
        }

        const mimeType = getSupportedAudioMimeType();
        voiceBaseValue = chatInputField ? chatInputField.value : '';
        voiceChunks = [];
        voiceStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        voiceRecorder = new MediaRecorder(voiceStream, mimeType ? { mimeType } : undefined);
        voiceRecorder.ondataavailable = event => {
            if (event.data && event.data.size) voiceChunks.push(event.data);
        };
        voiceRecorder.onerror = event => {
            console.warn('Voice recording failed:', event.error || event);
            isListening = false;
            cleanupVoiceStream();
            setVoiceButtonState('idle', 'Voice input');
        };
        voiceRecorder.onstop = async () => {
            const chunks = voiceChunks.slice();
            const type = voiceRecorder && voiceRecorder.mimeType ? voiceRecorder.mimeType : (mimeType || 'audio/webm');
            isListening = false;
            cleanupVoiceStream();
            if (!chunks.length) {
                setVoiceButtonState('idle', 'Voice input');
                return;
            }

            isTranscribingVoice = true;
            setVoiceButtonState('transcribing', 'Transcribing voice...');
            try {
                await transcribeVoiceBlob(new Blob(chunks, { type }));
                setVoiceButtonState('idle', 'Voice input');
            } catch (error) {
                console.warn('Voice transcription failed:', error);
                setVoiceButtonState('idle', `Voice transcription failed: ${error.message}`);
            } finally {
                isTranscribingVoice = false;
                voiceChunks = [];
                voiceRecorder = null;
            }
        };

        voiceRecorder.start();
        isListening = true;
        voiceStopTimer = setTimeout(() => {
            if (isListening) stopVoiceRecording();
        }, VOICE_MAX_RECORDING_MS);
        setVoiceButtonState('recording', 'Recording voice. Click to stop.');
    }

    async function toggleVoiceInput() {
        if (isTranscribingVoice) return;
        if (isListening) {
            stopVoiceRecording();
            return;
        }

        if (chatMicBtn) {
            chatMicBtn.style.transform = 'scale(0.9)';
            setTimeout(() => { chatMicBtn.style.transform = ''; }, 100);
        }
        try {
            await startVoiceRecording();
        } catch (error) {
            console.warn('Voice input failed:', error);
            isListening = false;
            cleanupVoiceStream();
            setVoiceButtonState('idle', `Voice input failed: ${error.message}`);
        }
    }

    function handleChatSubmit() {
        const text = chatInputField.value.trim();
        const attachments = chatAttachments.slice();
        const attachmentSummary = getAttachmentPromptSummary(attachments);
        const promptText = [text, attachmentSummary].filter(Boolean).join('\n\n');
        if (!promptText) return;
        setChatLanguageFromText(promptText);
        const wizardDefinitionBeforeClear = !analysisState.active ? getWizardFreeTextDefinition() : null;

        addUserMessage(text || attachmentSummary, { attachments });
        setChatInputValue('', { dispatch: false });
        clearChatAttachments({ preserveUrls: true });

        // 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柛娑橈攻閸欏繘鏌ｉ幋锝嗩棄闁哄绶氶弻娑樷槈濮楀牊鏁鹃梺鍛婄懃缁绘﹢寮婚敐澶婄闁挎繂妫Λ鍕⒑閸濆嫷鍎庣紒鑸靛哺瀵鈽夊Ο閿嬵潔濠殿喗顨呴悧濠囧极妤ｅ啯鈷戦柛娑橈功閹冲啰绱掔紒姗堣€跨€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倸螞椤撶倣娑㈠礋椤栨稈鎷洪梺鍛婄箓鐎氱兘宕曟惔锝囩＜闁兼悂娼ч崫铏光偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇娴滄粍銇勯幘璺盒㈤柛妯侯嚟閳ь剚顔栭崰鏍€﹂悜钘夋瀬闁归偊鍘肩欢鐐测攽閻樻彃顏柡澶婃啞娣囧﹪鎮欓鍕ㄥ亾閺嶎偅鏆滃┑鐘叉处閸婂潡鏌ㄩ弴鐐测偓鍝ュ閸ф鐓欓柟顖嗗喚鏆㈢紒鐐礃濡嫰婀侀梺鎸庣箓閹冲繘骞嗛崼顫剨闊洦绋掗埛鎴︽煕濞戞﹩鐓繛鍫熸礀閳规垿鎮欑拠褍浼愬銈嗘穿缁插墽鎹㈠┑鍡╂僵妞ゆ挾鍋樼花濠氭⒒娴ｄ警鐒剧紒缁樺姍閹啴鎮滈挊澶岊唵婵犵數濮电喊宥夋偂閻旂厧绠规繛锝庡墮婵¤姤绻涢幊宄板枤閻斿棝鏌ｉ悢宄扮盎鐎规悶鍎靛畷鈩冩綇閵婏絼绨婚梺鍝勫€搁悘婵嬪煕閺冨倻妫柟瑙勫姈椤ュ妫佹径鎰叆婵犻潧妫欓崳娲煙椤栨氨澧︾€规洦鍨跺畷銊︾節閸曨厾妲囬梻浣圭湽閸ㄨ棄顭囪缁傚秷銇愰幒鎾跺幈闁诲函缍嗛崑鍛暦鐏炵偓鍙忓┑鐘插暞閵囨繄鈧娲﹂崑濠傜暦閻旂⒈鏁囬柣妯夸含缁€鍐⒒閸屾瑧顦﹂柟鑺ョ矋閹便劑鎮介崨濠備罕闂佺粯顭堝畷闈涚暤娓氣偓閺屾盯骞囬棃娑樺濠碘槅鍨扮€氫即骞冨Δ鍐╁枂闁告洦鍓涢ˇ銉╂⒑闂堟稓澧涢柟顔煎€块悰顕€宕橀纰辨綂闂侀潧鐗嗛幊宥囨閸洘鈷戦柛娑橈攻婢跺嫰鏌涚€ｎ亝鍤囨い銏★耿閹虫牠鍩￠崘顏庣闯闂備胶顭堥張顒勬嚌妤ｅ啫鐒垫い鎺嶇劍閸婃劗鈧娲橀崝娆撳箖濠婂牊鍤嶉柕澶堝劜閻ｉ亶姊绘担钘変汗妞ゎ厼鐗撻幃妯侯潩鐠鸿櫣鐓戦棅顐㈡处缁嬫帡鎮￠悢鍏肩厪闊洦娲栨牎闂佸摜鍠撻崑銈夊蓟濞戞埃鍋撻敐搴濇喚闁稿孩妫冮弻鈥崇暆鐎ｎ剛鐦堥悗瑙勬礀閻栧吋淇婇悜钘壩ㄧ憸宀勫箖閿濆鈷掑ù锝堟鐢盯鏌熺粙娆剧吋闁轰礁鍟存慨鈧柕鍫濇嚀閹芥洟姊虹紒妯荤叆闁硅绱曠槐鐐哄炊椤剚妫冮弫鎰板川椤撶喐顔夋俊鐐€曟鍝ョ矓閻熼偊娼栭柧蹇撴贡閻瑦绻涢崱妯哄姢闁告捇浜跺娲川婵犲啠鎷归梺鑽ゅ暱閺呮盯顢氶敐鍥ㄥ珰婵炴潙顑嗛～宥呪攽閳藉棗鐏﹂柡鈧柆宥嗗€靛┑鐘崇椤ュ﹥銇勯幇鈺佺仾缂佷緡鍋嗙槐鎺楀箵閹烘垟鎸冮梺鑽ゅ暀閸愶絾鏂€闂佺粯锚閻忔岸寮抽埡鍛厱閻庯綆鍋嗗ú瀛橆殽閻愯鏀荤€垫澘瀚伴獮鍥敆閸屻倖肖濠电姷鏁告繛鈧繛浣冲洦鍋嬪┑鐘插€婚弳锕傛煕濞嗗浚妲虹紒鐘荤畺閺岀喓鈧數顭堟禒婊堟煟閹烘垹绉洪柡灞剧〒閳ь剨缍嗛崑鍛焊椤撱垺鐓冮柦妯侯樈濡叉悂鏌嶇拠鏌ヮ€楅摶锝夋煟閹炬娊顎楀Δ鏃堟⒒閸屾艾鈧兘鎮為敃鈧—鍐锤濡も偓閸屻劌鈹戦崒姘暈闁哄懏绻堥弻銊╁籍閸屾矮澹曞銈庡亝濞茬喖寮婚悢鍏煎€锋い鎺嗗亾濠⒀屽灦閺屾稑顫濋澶婂壎闂佸搫鏈粙鎴︹€﹂妸鈺佺闁靛闄勯鎴︽⒒娴ｅ憡鍟為柛鎴濈秺瀹曟垶绻濋崶褏鐣哄┑掳鍊愰崑鎾绘煃缂佹ɑ宕岀€规洖缍婇、娆撴偩鐏炲ジ鍋楁繝纰夌磿閸嬫垿宕愰妶澶婂偍濡わ絽鍟粈鍌涙叏濡炶浜鹃梺缁樹緱閸ｏ絽鐣峰鈧、娆戝枈鏉堛劎绉遍梻鍌欑窔濞佳囨偋閸℃あ娑樜旀担渚锤濠德板€曢幊蹇涙偂濞嗘挻鐓犻柛锔诲幖椤ｈ偐鎲搁幎濠傛噽绾惧ジ鏌熺紒妯虹瑲闁稿鍎抽埀顒侇問閸犳稑鈻嶉弴鐘亾娴ｅ啫浜归柍褜鍓氱粙鎺椻€﹂崶顒€鍌ㄥù鐘差儐閳锋垹绱撴担鑲℃垿鎮￠妷鈺傜厵闁兼亽鍎抽惌鎺楁煙椤栨碍婀扮紒缁樼箞瀹曠喖顢橀悪鍛簥婵犵數濮伴崹鐓庘枖濞戙垹瀚夋い鎺戝閸氬綊鏌嶈閸撴瑩鈥旈崘顔嘉ч柛鈩冾焽閳规稓绱撻崒姘毙＄紒鑸靛哺閻涱噣寮介鍙ユ睏闂佸湱鍎ょ换鍐疾濠靛鈷戦柟绋挎捣缁犳挻绻涚仦鍌氬闁稿﹥鎸冲濠氬磼濮橆兘鍋撴搴㈩偨婵﹩鍓﹂悞鐣屾喐閺冨牆鐏抽柨鏇炲亞閺佸洭鏌ｅΟ鍨毢缂佹稑绻樺娲礂閼测斂鍋為梺鍝勬噽閸嬬偤骞堥妸鈺佺婵炴潙顑嗛弬鈧梻浣虹帛閿氱痪缁㈠弮閵嗗倿寮婚妷锔惧帗闂備礁鐏濋鍛存倶鐎涙ɑ鍙忓┑鐘插亞閻撹偐鈧娲栭妶鎼佸箖閵忋倕绠掗柟鍝勬娴滈箖鏌熼悜妯虹劸闁绘柨妫涢幉鍛婃償閳埖妞介幃銏ゆ偂鎼淬倖鎲伴梻浣虹帛濮婂宕㈣缁牓宕橀鐣屽幘缂佺偓婢樺畷顒佹櫠閻楀牄浜滈柡鍐ｅ亾閻㈩垽绻濋獮鍐ㄎ旈崘鈺佹瀭闂佸憡娲﹂崜娑⑺囬銏♀拺閺夌偟澧楃粊鐗堛亜閺囧棗娲﹂崑鈺呮煟閹达絾顥夐梺鍗炴喘閺岋繝宕堕妷銉ヮ瀴闂佸搫鎳岄崹铏规崲濞戞瑦缍囬柛鎾楀啫鐓傞梻浣告贡閳峰牓宕戞繝鍥ㄥ仒妞ゆ洍鍋撴鐐叉喘閹囧醇閵忕姴绠洪梻浣侯攰閸嬫劗鎮伴妷鈺佺劦妞ゆ巻鍋撻柛鐔稿濞煎繘宕ㄧ€涙ǚ鎷虹紓浣割儐椤戞瑩宕曢幇鐗堢厵闁荤喓澧楅崰妯活殽閻愭彃鏆欓摶鏍煕濞戝崬鏋熸繛鍛矒閺岀喖鎳栭埡鍕婂鏌嶈閸撴岸宕滃顒夌劷濡わ絽鍟埛鎺懨归敐澶樻濞戞捁灏欑槐鎺楁偐閸愯尙浼岄梺璇″暙閸パ咁啋闁荤姴娲╃亸娆撴偩閸濆嫧鏀介幒鎶藉磹閺囥垹鐤い鏍仜缁愭鏌涢埄鍐姇闁绘挻娲熼弻锟犲炊閵夈儱顬堟繝鈷€鍛暭闁靛洤瀚伴弫鍌滄嫚閹绘帞鐫勬繝娈垮枛閿曘儱顪冮挊澶屾殾妞ゆ劧绠戝敮闂侀潧顦伴崝褏绱炴笟鈧濠氭晲閸涘倹妫冨畷姗€濡搁姀锛勨偓鏉库攽閻樻鏆柍褜鍓欑壕顓㈠箺閻樼數纾兼俊銈呭暙閺嬫盯鏌涢埞鎯т壕婵＄偑鍊栧濠氬磻閹炬番浜滈柡鍥朵簽缁夘喗顨ラ悙杈捐€挎い銏＄懅閸犲﹥娼忛妸褏袩闂傚倸鍊烽懗鍓佸垝椤栫偞鏅濋柕蹇曞閻掔晫鎲搁弮鍫熷仒妞ゆ洍鍋撻柛鈹惧亾濡炪倖甯掔€氼參鍩涢幒妤佺厱閻忕偛澧介幊鍛亜閿旇偐鐣甸柡灞剧洴閹垽鏌ㄧ€ｎ亙娣俊銈囧Х閸嬬偤鎮ч悩姹団偓渚€寮撮姀鈩冩珖闂侀€炲苯澧板瑙勬礉閵囨劙骞掗幘璺哄箥闂傚倸鍊搁崐鎼侇敋椤撱垹绀夌€广儱顦伴悡鏇㈠箹缁顫夐棅顒夊墯閹便劍绻濋崘鈹夸虎濡炪們鍨洪〃濠囧春閳ь剚銇勯幒鎴濃偓濠氭儗閹剧粯鐓熼柕蹇嬪焺閻掗箖鏌ｉ幘瀛樼闁哄瞼鍠栭幃婊冾潨閸℃鏆﹂梻浣虹帛閹歌煤閻旂厧绠栨慨妞诲亾闁诡喗鐟╅獮鎾诲箳閸℃ê鐦遍梻鍌欒兌閹虫捇宕崸妤€绠犻柟閭﹀枟椤洟鏌熼悜姗嗘當缂佺姵绋掗妵鍕箻鐠虹儤姣愰梺鐟板槻濠€杈╂閹惧瓨濯撮柧蹇曟嚀缁楋紕绱撴担鍓插剱閻㈩垽绻濋悰顔跨疀濞戞ê绐涢梺鍝勵槹閸ㄥ綊藝閵娾晜鈷戦柛锔诲幘鐢盯鎮介娑樼缂侇喛宕甸幏鐘裁圭€ｎ偅鏉搁梻浣虹帛閸旀洖顕ｉ崼鏇炵厺闁哄洨浼濋悷閭︾叆闁告洦鍘鹃悿鍕倵濞堝灝鏋熺憸鏉垮暣閸╃偤骞嬮悩顐壕闁挎繂楠告禍鐐烘煕濡粯宕岄柟顔煎槻椤劑宕熼鐘靛帨闁诲氦顫夊ú妯煎垝閹捐绠栭柕蹇嬪€栭崑鍌炲箹鏉堝墽鎮奸柡鍡╁亰濮婄粯鎷呯粵瀣異闂佹悶鍔岄柊锝夊春閳ь剚銇勯幒鎴濐仼缂備讲鏅涢湁闁绘ê妯婇崕鎰版煕婵犲嫭鏆柡灞诲妼閳规垿宕卞▎蹇撴瘓缂傚倷闄嶉崝蹇旀叏閵堝桅闁告洦鍨扮猾宥夋煃瑜滈崜鐔风暦濠靛鍐€妞ゆ劧绲芥惔濠傗攽閻愭潙鐏﹂柣鐕傚缁辩偤宕堕浣哄幈闂佸湱鍋撻〃鍛村疮椤愶附鍋傞柛宀€鍋為埛鎺懨归敐鍕劅闁衡偓閺夊簱鏀芥い鏂挎惈閳ь剚顨婂畷姘跺箳濡も偓缁犲鎮归崶顏勭毢闁伙絾妞藉铏圭磼濡搫袝闂佺绻戦悷鈺佺暦閹达箑宸濋悗娑欘焽閸橀亶姊虹涵鍛劷闁告柨绉瑰鎯般亹閹烘挾鍘甸梻浣哥仢椤戝棝濡靛┑鍥ㄥ弿濠电姴鍟妵婵堚偓瑙勬磸閸斿秶鎹㈠┑瀣闁靛瀵屽鏃堟⒒閸屾瑧鍔嶉悗绗涘厾楦跨疀濞戞锛欓梺鍝勭▉閸樿偐绮婚悙鐑樼厪濠电偟鍋撳▍鍡涙煛閸涱喚绠為柡灞剧〒娴狅箓宕滆閳ь剚甯￠弻娑橆潨閳ь剚绂嶇捄渚綎闁惧繐婀辩壕鍏间繆椤栨碍绂嬪ù婊呭仦缁旂喖寮撮姀鈺傛櫍闂佺粯鏌ㄩ幉锟犳偟閻戣姤鐓涘璺猴功婢ф劙鏌￠崨顔剧畼濠㈣娲熷畷妤冪箔鏉炴壆鐩庨梻浣告惈閸燁偄煤閵堝棛顩查柣鐔煎亰閻斿棛鎲哥€ｎ喖鍨傚ù鐘差儏閽冪喓鈧箍鍎遍悧婊冾瀶閵娾晜鈷戦柛娑橈攻鐏忣亪鏌涢弬鎸庢崳婵″弶鍔欓幃娆撳传閸曨偉鈧灝鈹戦悙鏉戠仸妞ゎ厼娲弫宥呪槈濞嗘垹顔曢柡澶婄墕婢т粙宕氶悧鍫㈢瘈闁逞屽墴閺屽棗顓奸崘锝呬壕闁告稒娼欓惌妤€顭跨捄铏圭伇闁伙箑鐗婄换婵嬫偨闂堟刀銏ゆ煕婵犲嫮甯涢柡鍛版硾閳藉濮€閿涘嫬骞楅梻浣筋潐閸庢娊顢氶銏犖ラ柟鐑橆殕閻撳啰鎲稿鍫濈婵炲棙鍨规稉宥団偓骞垮劚椤︻垳澹曢崸妤佺厱婵°倕鍟╃槐宕囨喐閻楀牆绗氶柛濠傤煼閺岋箑螣娓氼垱笑闂佺顑呯粔鎾煘閹达附鍊烽柡澶嬪灩娴犳悂姊洪懡銈呮殌闁告侗鍨粭澶嬩繆閵堝繒鍒伴柛鐕佸灦閹繝寮撮悢缈犵盎闂佽澹嬮弲娑㈠焵椤掍焦绀嬬€殿喗鎮傞獮瀣晜閻ｅ苯骞楅梻浣筋潐閸庡啿鐣烽鍕闁挎梹鍨濈换鍡樸亜閹板墎纾块柛鏂跨Ф閳ь剙鐏氬妯尖偓姘煎櫍閸┾偓妞ゆ帒锕︾粔鐢告煕閹惧娲撮柟顖欑窔瀹曞ジ鎮㈤搹鍦闂備焦鐪归崹钘夘焽瑜嶉悺顓㈡⒒娴ｄ警鐒鹃柨鏇樺劦楠炲啴宕掗悙顏佸亾娓氣偓瀵噣宕煎┑鍫濆箰闂備礁鎲℃笟妤呭窗濮樿泛鍌ㄩ梺顒€绉甸埛鎴︽煕濠靛棗顏╅柍褜鍏涚划娆撱€佸鎰佹▌闂佺硶鏂侀崑鎾愁渻閵堝棗绗傞柤瀹犲煐閺呭爼妫冨☉鎺撴杸闂佹寧绋戠€氼參寮抽鍌楀亾鐟欏嫭绀堥柛鐘崇墵閵嗕礁鈽夐姀鈩冩珳闂佺硶鍓濊摫闁绘繃绻堝濠氬磼濞嗘帒鍘＄紓渚囧櫘閸ㄨ泛鐣峰┑瀣唨鐟滄粓鎮為懞銉х闁糕剝锚婵銇勯埡鍐ㄥ幋闁哄瞼鍠撶槐鎺楀閻樺磭浜堕梻浣瑰▕閺€閬嶅垂瑜版帗鍎夋い蹇撶墱閺佸洭鏌ｉ幇顓熺稇婵炲懌鍊濆铏圭磼濡偐顓兼繛瀛樼矌閸嬬喎危閹版澘绠虫俊銈咃攻閺呪晠姊洪崗闂磋埅闁稿氦浜崰濠傤吋婢跺鍙勯梺鐓庮潟閸婃洘绂掗柆宥嗙厸閻忕偛澧藉ú瀛橆殽閻愬弶鍠橀柛鈹惧墲閹峰懘鎳栧┑鍕闁宠鍨块崺鍕礃閵娧呫偡闂備胶绮〃鍛存晝椤忓牏宓侀柛顐犲劚鎯熼梺闈涱槸鐎涒晛螞閸愵喖鏄ラ柍褜鍓氶妵鍕箳閸℃ぞ澹曢梺鎹愬吹閸嬬偟鎹㈠☉銏犲耿婵☆垵娅ｆ禒鑲╃磽娴ｆ彃浜炬繝鐢靛Т濞诧箓鎮￠弴銏＄厓闁宠桨绀侀弳鐔兼煃椤栨稒绀嬮柡?        chatOptionsList.innerHTML = '';
        const optContainer = document.getElementById('chatOptionsContainer');
        if (optContainer) optContainer.style.display = 'none';
        clearInspirePromptTimer();

        if (analysisState.revisionMode) {
            if (analysisState.processing) return;
            // 濠电姷鏁告慨鐑藉极閸涘﹥鍙忛柣鎴ｆ閺嬩線鏌涘☉姗堟敾闁告瑥绻橀弻锝夊箣閿濆棭妫勯梺鍝勵儎缁舵岸寮诲☉妯锋婵鐗婇弫楣冩⒑閸涘﹦鎳冪紒缁橈耿瀵鏁愭径濠勵吅闂佹寧绻傚Λ顓炍涢崟顖涒拺闁告繂瀚烽崕搴ｇ磼閼搁潧鍝虹€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝棛绠剧痪顓㈩棑缁♀偓閻庢鍠栭…鐑藉箖閵忋垺鍋橀柍銉ュ帠婢规洟姊哄Ч鍥х仾妞ゆ梹鐗犻幃鐐哄礈瑜夐崑鎾斥槈濞嗘垹鐣肩紓浣介哺閹稿骞忛崨瀛樺仼閻忕偟鏅晶顖炴⒒娴ｄ警鐒鹃柨鏇樺劤閹广垽宕煎┑鎰婵犵數濮电喊宥夊疾濠靛鐓冪憸婊堝礈濠靛鍊堕柟鐑樻尵缁犻箖鏌熼悙顒佺稇闁搞値鍓熼弻娑㈠Ω閳衡偓閹查箖鏌℃担鍝バх€规洖宕埥澶娾枎韫囧海鏁惧┑鐘垫暩婵挳鏁冮妶澶婄疇閹兼番鍔婇埀顒€鍊圭缓浠嬪川婵犲倷缂撴俊鐐€栭悧妤冪矙閹寸姷绠旂憸宥夆€︾捄銊﹀枂闁告洦鍓涢ˇ銊х磽娴ｈ姤銆冪紒顔界懃閻ｇ兘濡搁敂鍓х槇闂佸憡娲﹂崑鍕不濞差亝鈷掗柛灞剧懅椤︼妇绱撳鍜冭含鐎规洘鍨剁换婵嬪炊瑜嶉悗顓熺箾鐎电甯堕柣掳鍔戝畷鏇烆吋閸℃瑧顔曢悗鐟板閸犳洜鑺辨總鍛婄厽闁规崘娉涢弸鎴犵磼缂佹娲存鐐差儔閹瑩妫冨☉鎺戞倕闂傚倷绀侀幉鈥愁潖閻熸壆鏆嗛柟闂寸閽冪喓鈧箍鍎卞ú锕傚窗閸℃稒鐓曢柡鍥ュ妼娴滅偛霉閻撳海鐒告慨濠呮閹风娀鍨鹃搹顐や憾闂備浇宕甸崯鍧楀疾濞戙埄鏁嬮柨婵嗩槸闁卞洭鏌￠崶鈺佷户妞ゆ挻妞藉铏圭磼濮楀棛鍔告俊鐐茬摠閹倸鐣烽崫鍕ㄦ闁靛繆妾ч幏濠氭⒑缁嬫寧婀伴柣鐔村姂瀹曟鐣濋埀顒勬儉椤忓牜鏁囬柣鎰版涧閻撶喖鎮楀▓鍨灍鐟滄澘鍟撮崺銉﹀緞婵犲孩鍍甸梺鎸庣箓閹冲秵绔熼弴鐐╂斀妞ゆ梹鏋绘笟娑㈡煕濡吋娅曟繛鍡愬灲瀹曪絾寰勯崼婊呯泿闂備礁鎼ù鍌涚閻愮數鐭撴い鏂款潟娴滄粓鏌曡箛濠傚⒉缂佲偓鐎ｎ喗鐓涘ù锝囶焾閺嗭綁鏌涢埞鎯т壕婵＄偑鍊栫敮鎺斺偓姘煎弮瀹曟劕鐣￠幍铏杸闂佺粯蓱瑜板啴寮抽弬妫电懓顭ㄩ崟顓犵厜闂佸搫鐬奸崰鏍х暦椤愶箑绀嬫い鎾愁槶閸庣敻寮诲☉婊呯杸闁规儳澧庨崝顖炴⒑閸濆嫭婀扮紒瀣灱閻忔帡姊洪棃鈺佺槣闁告﹢绠栭幃锟犲箻閺傘儲鏂€濡炪倖姊婚妴瀣涘顓犵闁告粌鍟伴幃鍏间繆閸欏濮嶆鐐村浮楠炲﹤鐣烽崶褎鐏堥梺璇″枟缁捇宕洪敓鐘茬＜婵﹢妫跨槐鎻掆攽閻樻鏆滅紒杈ㄦ礋瀹曟垿骞嬮敃鈧壕褰掓煏閸繍妲搁柛灞诲妼閳规垿宕掑顓炴殘闂佺顑呴澶愬蓟閻旂厧绠查柟浼存涧濞堫厾绱撴担鍝勑ｉ柣妤冨Т椤繑绻濆顒勫敹闂佺粯鏌ㄩ崲鏌ョ嵁韫囨稒鈷戦柛婵嗗閺嗘瑩鏌ｅΔ鈧Λ妤咁敊韫囨挴鏀介柛銉ｅ劙缁ㄥ姊洪崫鍕殜闁稿鎹囬弻娑欐償閵忕姭鏋欓梺缁樹緱閸犳牞鐏冮梺鍛婁緱閸犳帡骞忕紒妯肩閺夊牆澧介崚浼存煙鐠囇呯瘈妤犵偛妫濆畷濂稿Ψ閿旀儳骞堥梻浣虹帛濞叉垹绮堟担鍦洸闁规鍠掗崑鎾舵喆閸曨剛顦ㄩ梺鍛婃⒐閻熴儵鎮鹃悜绛嬫晝闁挎洍鍋撻崬顖炴⒑閹稿孩顥嗗┑顔哄€濋、娆撳炊椤掍讲鎷绘繛杈剧悼椤牓藟韫囨稒鐓曢悗锝庝簼閸ｅ綊鎮￠妶鍡樺弿婵＄偠顕ф禍楣冩⒑鐠団€虫珯缂佺粯绻堥獮鍐閵堝棗娈愰梺瀹犳〃缁€浣哄緤婵傚憡鈷掑ù锝堫潐閸嬬娀鏌涙惔顔肩仸鐎规洘绻傞濂稿炊閿旀儳澧鹃梻浣圭湽閸ㄥ綊骞夐敓鐘冲亗闁靛濡囩粻楣冩煙鐎电鍓遍柣鎺嶇矙瀵偊宕奸妷锔规嫼闂佸憡绻傜€氼垳鈧碍澹嗙槐鎺撳緞鐏炶棄骞嬬紒鈩冩尭閵嗘帒顫濋敐鍛闂備礁鎼張顒勬儎椤栫偟宓佹俊顖氱毞閸嬫捇妫冨☉娆愬枑闂佹眹鍊曠€氭澘顫忓ú顏勭閹艰揪绲块悾濂告⒑缁嬫鍎戦柛瀣洴椤㈡岸濡烽埡浣侯槹濡炪倖甯掗崐濠氼敊閺囥垺鈷戦柛锔诲幖閸斿鏌熺粙娆剧吋濠碉繝娼ч埞鎴﹀醇濮橆兛澹曞┑鐐茬墕閻忔繈寮稿▎鎴犵＜妞ゆ梻鏅幊鍥煕閵娾晝鐣虹€殿喕绮欓、姗€鎮欓棃娑樞ら梻鍌欑閹诧繝宕濊箛娑樻闁稿本绋撻々鐑芥煏韫囥儳纾跨紒鈾€鍋撶紓浣稿⒔婢ф鏁嬫繝鈷€鍕弨闁哄瞼鍠栭、娆撴偂鎼存ê浜鹃柛顭戝枤閺嗭附绻涘顔荤凹闁稿﹦鍏橀幃妤€鈽夊▍顓т邯瀹曟繈宕ㄧ€涙ǚ鎷洪柣鐔哥懃鐎氼剟宕濋妶澶嬬厱婵☆垵宕垫晶顒傜磼閺冨倸鏋涚€殿喗鎸抽幃銏ゆ惞鐠団€虫櫗闂傚倷绀佸﹢閬嶅磻閹炬剚鐒芥繛鍡樻尰閸婅法鎲搁悧鍫濈瑲闁绘挻娲熼幃妤呮晲鎼粹€茬凹闁诲繐绻掗弫濠氬蓟瀹ュ牜妾ㄩ梺鍛婃尰缁诲牓鏁愰悙鏉戠窞濠电偞甯＄紓姘辩不濞戞ǚ妲堟俊顖溾拡濡茬兘姊洪悷鏉挎倯闁伙綆浜畷婵嗙暆閸曨剙鈧潡鏌涢…鎴濅簴濞存粍绮撻弻鐔煎传閸曨厜銉╂煕韫囨挾鐒搁柡灞界Ч椤㈡稑鈽夊▎鎴Ч闂備礁婀遍鑼礊娴ｉ€涚箚闁兼悂娼х欢鐐烘倵閿濆骸澧鐐茬Ч濮婂宕掑▎鎴М闂佽绻戠换鍫ャ€侀弽顓炲耿婵炴垶顭傞敂鐣岀瘈闂傚牊绋掓径鍕煕濞嗗繒绠伴柍瑙勫灴閹晠骞撻幒鎾搭唹闂備線娼уú锔炬崲閸曨垰鐒垫い鎺戝枤濞兼劖绻涢崣澶岀煉鐎规洘顨呴～婊堝焵椤掑嫬违濞达綀鍊介悢灏佹瀻闁绘劦鍎烽鍕拻濞达絽鎲￠崯鐐存叏婵犲偆鐓奸柍銉畵瀹曞ジ濡烽妷褍骞嬮梻浣侯攰閹活亪姊介崟顖氱９濡炲绨堕崑鎾绘偡閺夋妫岄梺鍝ュУ閻楁洟鍩㈤幘璇查唶闁哄洨鍟块幏铏圭磽娴ｅ壊鍎撴繛澶嬫礈缁寮婚妷锔惧弳闂佸搫娲﹂敋闁诲繆鏅犻弻锝夋晲閸パ冨箣闂佽鍠楃划宀冪亽闂佸吋绁撮弲婵單ｉ崶顒佲拻濞达綀顫夐崑鐘绘煕鎼淬垻鐭掔€规洘锕㈡俊姝岊槹闁稿鐗犲濠氬磼濮橆兘鍋撻悜鑺ュ殑闁告挷绀侀崹婵囥亜閺嶎偄浠滅紒鈧径鎰厸闁搞儯鍎遍悘鈺呮煟閵堝骸鏋熼柕鍥у楠炲洭宕奸弴鐕佲偓宥夋⒑缂佹ɑ灏ㄩ柛瀣崌濮婄粯鎷呴悷閭﹀殝缂備浇顕ч崐鍧楃嵁婵犲洤绠涢柡澶嬪鏉堝牓姊洪幐搴㈢闁稿﹤缍婇幃锟犲即閻旂繝绨婚梺瑙勬緲婢у海绮欑拠宸唵閻犲搫鎼顓㈡煛鐏炵澧查柟宄版嚇瀹曘劍绻濇惔顫礂闂傚倷绀侀幖顐﹀嫉椤掑倻鐭欓柟鎯ь嚟椤╃兘鏌ㄩ弴鐐测偓鍝ョ矆閸垺鍠愰煫鍥ㄧ⊕閸嬪倿鏌涘畝鈧崑鐐哄煕閹寸姷纾藉ù锝堫嚃閻掍粙鏌嶇粭鍝勨偓婵嬪蓟濞戞瑦鍎熼柍銉ョ－妤犲洨绱撴担鍝ョ劮濡炴潙鎽滈幑銏犫攽鐎ｎ亞鍊為梺闈涱焾閸庮噣宕戦幘缁樼叆閻庯絻鍔嬬花濠氭椤愩垺澶勯柟鍛婃倐椤㈡棃濡舵径瀣幈闁诲函缍嗛崑鍛暦閸曨兙浜滈柨鏇楀亾妞ゆ洦鍘惧Σ鎰板箳閹惧绉堕梺瀹犳〃濡炴帒鈻介鍫熲拺闁荤喐婢樺Σ濠氭煙閾忣偓鑰挎鐐寸墳閵囨劙骞掗幘璺哄Х婵犵數鍋為崹璺侯潩閵娾晛绠熺憸鐗堝笚閳锋帡鏌涚仦鍓ф噮妞わ讣绠撻弻鐔哄枈閸楃偘绨介梺褰掝棑婵炩偓闁诡喗鐟╁畷妤呭川婵犲倸顎忛梻鍌欑閹诧繝骞愰崱娑樺窛妞ゅ繐鎳愰埀顒€宕埞鎴︽偐閸偅姣勬繝娈垮枤閸忔ê顕ｉ锕€绠瑰ù锝呮憸閿涙稑鈹戦悙鏉戠仸妞ゎ厼鍊块幃銏ゅ传閵壯呮闂備礁鎲￠崝锔界鐠哄ソ铏圭矙鎼存挻鏂€闂佺粯顭堥婊冾啅閵夆晜鍊垫慨妯煎帶婢у瓨銇勯姀鈥冲摵闁哄苯妫楅濂稿幢濞嗗繐绠哄┑鐘殿暯濡插懘宕归悽绋跨；闁归偊鍠楅弳婊勭箾閹存瑥鐏柣鎾跺枛閺岀喖骞嗚閹界姷绱掗埀顒傗偓锝庡枟閻撴稓鈧厜鍋撻悗锝庡墰閻﹀牓鎮楃憴鍕闁绘牕鍚嬫穱濠囨倻閽樺）銊ф喐瀹€鍕剦妞ゅ繐鎳愮弧鈧梺姹囧灲濞佳勭閿曞倹鐓曢柕鍫濈凹闁垳鈧娲栭悥鍏间繆濮濆矈妲诲Δ鐘靛仜閻楁挸顫忕紒妯诲缂佹稑顑嗙紞鍫ユ倵鐟欏嫭绀冮柨鏇樺灲閵嗕礁鈻庨幇顔剧槇闂佹悶鍎滈崨顖涚€梻鍌欒兌缁垶宕濋敃鍌氱婵娉涢惌妤呯叓閸ャ劍灏ㄩ柡鈧禒瀣厽婵☆垵顕х徊濠氭煛閸℃瑥浠遍柡灞炬礋瀹曞爼濡歌閻ｅジ姊洪柅鐐茶嫰婢у弶銇勯銏╂Ц閻撱倝鐓崶銊р槈缂佲偓婢跺备鍋撻獮鍨姎婵炶绠戦悾鐑藉矗婢跺瞼鐦堥梻鍌氱墛娓氭宕曡箛鏇犵＜闁逞屽墴瀹曟﹢顢欓悾灞藉汲婵犵數濞€濞佳兾涘▎鎾嶅顭ㄩ崟鈺€绨婚棅顐㈡处濞诧箓鎮炴ィ鍐╃厓閻熸瑥瀚悘鎾煛娴ｅ摜效鐎规洜鍠栭、鏇㈠焺閸愨晝绐旈梻鍌氬€烽懗鍫曗€﹂崼銉︽櫇闁靛鏅涢崹鍌炴煕椤垵鏋ら柡鍡檮缁绘繈妫冨☉娆樻￥闂佸搫妫楀Λ婵嬪蓟濞戙垹鍗抽柕濞垮劚椤亜鈹戦悙鍙夊櫣婵炲樊鍘奸～蹇撁洪鍜佹濠电偞鍨堕懝楣冦€傞崫鍕垫富闁靛牆绻掔槐鎵磼椤旂晫鎳冩い鏇秮椤㈡洟濡堕崒姘闂佹寧绻傛鎼佸几閻斿吋鐓熼柟鎯у船閸旀粎绱掔紒妯肩疄婵☆偄鍟埥澶娾枎濞嗘垹顦┑鐘殿暯濡插懘宕规导瀛樺亱闁规崘顕ч拑鐔兼煃閳轰礁鏆炲┑顖氼嚟缁辨帞鈧綆鍋勯婊勭箾閸繍鐓兼慨濠冩そ瀹曨偊宕熼鍛晧闂備礁鎲″褰掑垂閻㈠壊鏁嬮柨婵嗩槸缁狙囨煙鐎圭姵鐝俊顐㈠暣瀹曟椽鍩€椤掍降浜滈柟鍝勭Х閸忓本銇勯埡鍌氱祷閾绘牠鏌ㄥ┑鍡樺櫣闁哄棛鍋ら弻锝夊箻鐎涙顦伴梺鍝勬湰濞叉ê顕ラ崟顖氶唶婵犻潧妫楄闂傚倷绀佸﹢閬嶅疾椤愶絾鍙忓瀣椤洟鏌熼悜妯烩拻缁炬儳鍚嬫穱濠囶敍濠靛棔姹楅梺姹囧€曠€氼厾鎹㈠┑鍡忔灁闁割煈鍠楅悘鈧梻浣侯焾椤戝棝骞戦崶褜娼栨繛宸簻缁犱即骞栨潏鍓ф偧闁伙綁娼ч埞鎴﹀煡閸℃ぞ绨奸梺鐑╂櫓閸ㄨ鲸绌辨繝鍥х妞ゆ棁鍋愰悿鈧梻浣虹帛椤ㄥ懘鎮ч崘顔肩婵炲樊浜濋埛鎴︽煕閿旇寮鹃柣鎺楃畺閹鈽夐幒鎾寸彇缂備緡鍠楀銊╁箲閸曨垰惟鐟滃繘鏁嶅鍫熲拺缂備焦锕╅悞鐐箾閸涱喗绀€闁伙絽鍢查悾婵嬪礋椤掑倸甯鹃梻浣虹《閸撴繂煤濠婂煻鍥晝閸屾稒鍤夐梺鎸庣箓閹冲寮ㄦ禒瀣厱閻忕偛澧界粻鎾舵偖濮橆兘鏀介柨娑樺娴犳帞绱掗鐣屾噰濠碘€崇摠缁楃喖鍩€椤掆偓椤曪綁顢氶埀顒€鐣烽悡搴樻斀闁糕剝鐟у畷鍝勨攽閿涘嫬浜奸柛濠冪墵楠炴劙鎳￠妶鍥╃厯闂佺懓顕崑鐔笺€呴幓鎹ㄦ棃鏁愰崨顓熸闂佺粯鎸鹃崰鏍蓟閺囷紕鐤€闁哄洨鍊敐澶嬬厱闁绘柨鎼禒閬嶆煛瀹€瀣М妤犵偞顭囬幑鍕倻濡棿閭梻鍌欑閹碱偊鎯屾径宀€绀婂ù锝呭閸ゆ洘銇勯幒鎴濐仼缂佺姳鍗抽獮鏍垝閻熸澘鈷夊┑鐐茬墛椤洨妲愰幘璇茬＜婵炲棙鍔楅妶鏉库攽閻愬樊妲圭紒瀣灴椤㈡岸鏁愭径濠囧敹闂佸搫娲ㄩ崐锝夋晝閸屾稓鍘遍梺鍝勬储閸斿矂寮搁妶澶嬬厽闁靛牆鍊告禍楣冩⒒閸屾瑧鍔嶉悗绗涘懏宕查柛灞惧閸嬫挸顫濋悡搴㈢彎閻庤娲橀悷鈺佺暦閻戠瓔鏁囬柣妯碱暜缁卞啿鈹戦悙鑸靛涧缂傚秮鍋撳┑鐐叉嫅缁插潡寮灏栨婵浜敍婊堟煟閻樺弶绌块悘蹇旂懄閺呰泛鈽夐姀锛勫幍婵炴挻鑹鹃悘婵囨叏閸岀偞鐓曢柍瑙勫劤娴滅偓淇婇悙顏勨偓鏍暜閹烘柡鍋撳鐓庡籍闁诡噯绻濆畷姗€顢欓悾灞藉籍婵犵妲呴崹顖滄媰閿曗偓鍗遍悷娆忓娴滄粓鏌曟竟顖氬暊閺嬪懘姊洪崫鍕拱闁烩晩鍨伴锝夘敋閳ь剙鐣烽幒鎴僵妞ゆ巻鍋撶紒鐙呯稻缁绘繂鈻撻崹顔界亪闂佹寧娲忛崕閬嶁€旈崘鈺冾浄閻庯綆浜為悾娲⒑缂佹ê鐏辨俊顐㈠閻ヮ亣顦归柡宀€鍠撶划娆撳垂椤旀儳绲归梻浣哥枃濡椼劎娆㈤垾鐐解偓鎺撶節濮橆厾鍘梺鍓插亝缁诲啴藟濠婂牊鐓熼煫鍥ь儏閸旀粓鏌曢崶褍顏柡浣稿€婚幏鐘绘嚑椤戞寧顢樺┑锛勫亼閸婃垿宕归崫鍕殕闁归棿绀侀弸渚€鏌熼悧鍫熺凡妤犵偑鍨虹换娑㈠幢濡櫣浠煎┑鈩冨絻濞诧妇鎹㈠┑鍡忔灁闁割煈鍠楅悘宥夋⒑閹稿孩纾甸柡鍛Т閻ｇ兘寮撮姀鈥充缓缂備礁顑堥鎶藉煛閸涱喚鍘撻梺鍛婄箓鐎氼剟鍩€椤掆偓椤嘲鐣烽敐澶婂耿婵炴垶鐟㈤幏娲⒑閸涘﹦绠撻悗姘煎墴瀵櫕绻濋崶銊у幈闁诲函缍嗛崑鍛暦瀹€鍕厸閻忕偛澧介埊鏇㈡煙椤栨稒顥堝┑顔瑰亾闂佺粯锕╅崑鍛存倶閸℃稒鈷掑ù锝堟鐢稑銆掑顓ф疁鐎规洑鍗冲浠嬵敇閵娧呪棨婵犵數濮撮敃銈夋偋閸℃稒鍊块柛顭戝亖娴滄粓鏌熼悜妯虹仴妞ゅ繆鏅犻弻锕傚礃椤忓嫭鐏堥梺鍝勮閸斿矂鍩為幋锕€骞㈡慨妤€妫欓敍渚€姊绘担渚劸婵炲鍏樺畷浼村冀椤撶偠鎽曢梺鍝勬储閸ㄥ綊鏌嬮崶銊х瘈闂傚牊绋掗敍宥夋煕閺傛妲虹紒杈ㄦ崌瀹曟帒顫濆В娆嶅灲閺岋絽螖閳ь剙螞濠靛鏄ラ柣鎰惈缁狅綁鏌ㄩ弮鍥棄闁逞屽墰閸忔﹢寮婚悢铏圭＜婵☆垵娅ｉ鍌涗繆閵堝洤孝婵炲樊鍘奸～蹇涙惞閸︻厾锛滃┑顔筋殔濡瑩鎮惧畡鎵虫斀闁绘劖褰冪痪褏绱掗鑺ュ碍闁伙絿鍏橀弫鎰緞婵犲倻鐛╅梺璇插缁嬫帟褰滈梺褰掓敱濡炶棄顫忓ú顏勬嵍妞ゆ挆鍛Ъ闂佽瀛╃粙鍫ュ疾濠靛洨鐝堕柡鍥ュ灪閸嬨劑鏌涘☉姗堝姛闁告﹢浜堕弻锝嗘償椤栨粎校闂佺顑呴幊搴ㄦ偩瀹勬壆鏆嗛柛鏇ㄥ墰閸樻悂鏌ｈ箛鏇炰户闁哄拋鍋夐崐鎾⒒娴ｅ摜绉烘い銉︽尰缁绘盯鍩€椤掑嫭鐓欑€规洖娲ら埢鍫熴亜閵忥紕澧垫い銏℃礃閹棃鍩勯崘銊︾彺闂備胶顭堥鍡涘箰閹间礁鐓濋柟鎹愵嚙閸ㄥ倹銇勯弮鍌涙珪濞存粌鐖煎缁樻媴閻戞ê娈岄梺瑙勭ゴ閸撴繄鎹㈠☉娆戠瘈闁搞儮鏅涚粊锕傛⒑閸涘﹤濮﹂柛鐘崇墵閿濈偤宕ㄧ€涙鍘梺鍓插亝缁诲啴藟閻愮儤鐓曢幖鎼枙闁垶鏌″畝瀣М闁诡喒鏅犲畷锝嗗緞瀹€濠冃ㄩ梻鍌欑窔閳ь剛鍋涢懟顖涙櫠閸欏绠鹃柛娑卞枟缁€鈧梺瀹狀嚙缁夌鐏冮梺鍛婁緱閸犳帡骞忔繝姘拺缂佸瀵у﹢浼存煠瑜版帞鐣洪柛鈹惧亾濡炪倖甯掔€氬嘲螞閹寸姷纾兼い鏃囧亹婢ф盯鏌熷畡鐗堝殗鐎规洜鍏橀、姗€鎮╅弻銉у磿濠电姷鏁告慨鐑藉极閸涘﹥鍙忛柡澶嬪殮濞差亜围闁搞儜灞绢棥濠电姷鏁告慨鐢靛枈瀹ュ鍋傞柡鍥ュ灪閻撳啴鏌嶆潪鎵槮闁哄棛鍠栭弻宥夋寠婢舵ɑ楔缂備浇椴哥敮锟犵嵁閸ヮ剦鏁囩憸搴ㄦ偪娴ｈ倽鏃堟偐闂堟稐娌梺缁橆殕濞叉繆銇愭担鍓叉富闁靛牆妫楅崸濠囨煕鐎ｎ偅灏柍瑙勫灴閸ㄩ箖鎳犻鍌滃幆闂備礁鎼張顒傜矙閹烘梹宕叉繝闈涱儏绾惧吋绻濇繝鍌氭殶闁告ü绮欏缁樻媴缁涘娈愰梺鍝ュУ椤ㄥ﹪濡撮崘鈺冪瘈闁搞儜鍛毇濠电偛顕慨鎾敄閸℃稑纾婚柕濞炬櫆閻撶喖鏌熼柇锕€澧悽顖樺姂閺屾稓鈧綆鍋呯亸鎵磼缂佹绠炵€规洖鐖兼俊姝岊槻妤犵偛鐗撳铏规嫚閹绘帒姣愮紓鍌氱Т濡繂鐣烽幋锕€宸濇い鏍ㄧ懅閸撱劌顪冮妶鍡樺蔼闁搞劍妞介幃锟犲礃椤忓棛锛濇繛杈剧秬閸嬪倿骞嬪┑鍫熸閻庡厜鍋撻柍褜鍓熼崺鈧い鎺戝枤濞兼劖绻涢崣澶屽⒈缂佽京鍋炵换婵嬪炊閵夈垹浜惧ù锝囩《閺嬪酣鏌熼悙顒佺稇濞寸姴銈搁弻锝堢疀閺囩偘鍝楅梺绋款儐閸旀瑩鐛幇顓炵窞闁归偊鍘搁幏濠氭⒑缁嬫寧婀伴柤褰掔畺閸┾偓妞ゆ帒瀚峰Λ鎴犵磼椤旇偐澧涚紒妤冨枛閸┾偓妞ゆ帒瀚畵浣割熆閼搁潧濮囬柣蹇斿▕閺岀喐锛愭担鍝勫缂傚倸绉撮柊锝夊箖瀹勯偊鐓ラ柛娑卞弾閺嗩參鏌ｉ姀鈺佺仭閻㈩垪鈧磭鏆︾憸鐗堝笒绾惧ジ鏌ｉ幇顒夊殶闁告﹢浜堕幃宄邦煥閸愵喖寮伴梺闈涙閸熸潙鐣烽悡搴樻斀闁割偆鍠愰鎾斥攽閻愬瓨灏伴柛鈺佸暣瀹曟垿骞樼紒妯煎幐闁诲繒鍋涙晶钘壝虹€涙﹩娈介柣鎰级閸犳ɑ淇婇銏犳殭闁宠棄顦埢搴ㄥ箣濠婂嫬鏋ら梻鍌氬€搁崐鐑芥嚄閸洍鈧箓宕奸妷锔芥珖闂侀潧鐗嗛ˇ顐﹀焵椤掑﹦鐣甸柟顔界矒閹稿﹥寰勬惔銏″暫闂傚倷鐒︾€笛兠哄澶婄；闁瑰墽绮幊姘舵煥濠靛棙鍣烽柍褜鍓氱敮鎺楋綖濠靛鍋傞幖杈剧导閻㈣鈹戞幊閸婃牠寮婚妸鈺佺厴闁瑰鍋涚粻鐘绘⒑缁嬪尅鏀绘い銊ユ楠炲牓濡搁埡浣洪獓闂佸湱鍋ㄩ崝宥咁渻娴犲鈧礁顫滈埀顒勫箖濠婂牆骞㈡俊顖濆亹閳?            const lines = promptText.split('\n');
            let customBackground = [];

            lines.forEach(line => {
                const l = line.trim();
                if (!l) return;
                const lowerLine = l.toLowerCase();
                if (lowerLine === 'ai game plan' || lowerLine === 'gamespec modules') return;
                if (/^(title|hook|core loop|visual direction|setting|player fantasy):/i.test(l)) return;

                if (l.startsWith('Game Type:')) {
                    const val = l.replace('Game Type:', '').trim();
                    setModuleSelection('type', { label: val, value: val, mechanic: val });
                } else if (l.startsWith('Art Style:')) {
                    const val = l.replace('Art Style:', '').trim();
                    setModuleSelection('style', { label: val, value: val });
                } else if (l.startsWith('Game Setting:')) {
                    const val = l.replace('Game Setting:', '').trim();
                    setModuleSelection('setting', { label: val, value: val, desc: val });
                } else if (l.startsWith('Core Gameplay:')) {
                    const val = l.replace('Core Gameplay:', '').trim();
                    setModuleSelection('coreGameplay', { label: val, value: val, desc: val });
                } else if (l.startsWith('Player Goal:')) {
                    const val = l.replace('Player Goal:', '').trim();
                    setModuleSelection('playerGoal', { label: val, value: val, desc: val });
                } else if (l.startsWith('Main Challenge:')) {
                    const val = l.replace('Main Challenge:', '').trim();
                    setModuleSelection('mainChallenge', { label: val, value: val, desc: val });
                } else if (l.startsWith('Progression System:')) {
                    const val = l.replace('Progression System:', '').trim();
                    setModuleSelection('progressionSystem', { label: val, value: val, desc: val });
                } else if (l.startsWith('Difficulty Level:')) {
                    const val = l.replace('Difficulty Level:', '').trim();
                    setModuleSelection('difficultyLevel', { label: val, value: val, desc: val });
                } else if (l.startsWith('Background/Story:')) {
                    customBackground.push(l.replace('Background/Story:', '').trim());
                } else {
                    // 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柛娑橈攻閸欏繘鏌ｉ幋锝嗩棄闁哄绶氶弻娑樷槈濮楀牊鏁鹃梺鍛婄懃缁绘﹢寮婚敐澶婄闁挎繂妫Λ鍕⒑閸濆嫷鍎庣紒鑸靛哺瀵鈽夊Ο閿嬵潔濠殿喗顨呴悧濠囧极妤ｅ啯鈷戦柛娑橈功閹冲啰绱掔紒姗堣€跨€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倸螞椤撶倣娑㈠礋椤栨稈鎷洪梺鍛婄箓鐎氱兘宕曟惔锝囩＜闁兼悂娼ч崫铏光偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備浇顕栭崹搴ㄥ礃閿濆棗鐦辩紓鍌氬€风欢锟犲闯椤曗偓瀹曞綊骞庨挊澶岊唹闂侀潧绻掓慨顓炍ｉ崼銉︾厪闊洦娲栧暩濡炪倖鎸诲钘夘潖閾忓湱纾兼俊顖氭惈椤矂姊虹拠鑼鐎光偓缁嬭法鏆﹂悗鍦濡插墽绱撴担浠嬪摵闁圭顭烽獮蹇涘川椤栨粎鐓撳┑鐐叉閸嬫挸鈻撳ú顏呪拻濞达絼璀﹂悞鐐亜閹存繂鏆ｇ€规洘鍔曢埞鎴﹀幢閳轰焦顓块梺鑽ゅТ濞诧妇绮婇弶鎳筹綁宕奸妷锔惧帾闂婎偄娲﹀ú鏍綖瀹ュ鐓忓┑鐘茬箺缁€瀣瑰鍕煉闁哄矉绻濆畷姗€濡搁妷銏犱壕闁告縿鍎查弳婊堟煠閸濄儱浠ù婊勭矋閵囧嫰骞囬鍏肩€惧┑鐐叉噹濞层劎妲愰幒鎾寸秶闁靛绠戦棄宥夋⒑閻熸澘妲婚柟铏耿閻涱噣骞樼拠鑼唺閻庡箍鍎遍幏瀣涘鍫熲拻闁稿本鑹鹃埀顒勵棑缁牊鎷呴崷顓犲骄婵犵數濮村ú銈囧婵犳碍鐓曢柍鈺佸暟閳藉绱掗幇顓ф疁闁哄瞼鍠栭獮鎴﹀箛椤撶姰鈧劖绻濆▓鍨珮闁告挾鍠栧璇差吋閸偅顎囬梻浣告啞閹搁箖宕版惔顭掔稏闊洦姊荤弧鈧┑顔斤供閸撴盯鏁嶅鍐ｆ斀妞ゆ梻鐓鍕殾妞ゆ帒濞傞悜钘夌劦妞ゆ帒鍊荤壕浠嬫煕鐏炲墽鎳呮い锔奸檮閵囧嫰骞嬪┑鍥舵￥闂佽桨绶￠崳锝夊极閹剧粯鍋愰柛娆忣槺閳ь剦鍓熼幃妤呯嵁閸喖濮庡銈忓瘜閸ㄦ娊鎮幆褜鍚嬪璺侯儑閸樺崬顪冮妶鍡楀闁稿﹥娲熷鎼佸籍閸喓鍘卞┑顔姐仜閸嬫挾绱掗悩宕囧ⅹ妞ゎ偄绻愮叅妞ゅ繐瀚槐鍫曟⒑閸涘﹥绀€闁诲繑纰嶉悺蹇撯攽閻樺灚鏆╅柛瀣洴钘濋柡澶嬶紩閸濆嫀鐔兼嚃閳哄啰鍔归梻浣告贡閸庛倝銆冮崨杈剧稏闁告稑鐡ㄩ悡蹇涙煕椤愶絿绠栭柨娑樼У閹便劍绻濋崘顭戝殝缂備胶绮换鍫熸叏閳ь剟鏌ㄥ┑鍡樺櫧闁告﹩鍋婂娲川婵犲啠鎷归梺缁橆殘婵炩偓妤犵偛鍟撮弫鎾绘偐閸欏倶鍔戦弻銊╁棘閸喒鎸冮梺浼欑畱閻楁挸顫忔繝姘＜婵ê宕·鈧紓鍌欑椤戝棛鏁檱濡垽姊虹紒妯哄闁稿簺鍊濋幃锟犲即閵忥紕鍙嗗┑鐘绘涧濡瑩藟閻愮儤鐓忛柛銉ｅ妿缁犵偤鏌″畝鈧崰鏍€佸▎鎾村殐闁冲搫鍞妸銉庢棃鎮╅棃娑楃捕濠电偛妯婇崢鑺ョ┍婵犲洤绠瑰ù锝堝€介妸鈺傜厪濠㈣泛鐗嗛悘顏堟倵濮樺崬鏋涙慨濠傤煼瀹曟帒鈻庨幋鐘靛床婵犵數鍋橀崠鐘诲礂閻樿櫕銇濆┑鈥崇埣瀹曞爼鏁愰崨顒€顥氭繝娈垮枟閿曗晠宕戦崟顐ゆ殼闁糕剝鐟㈤崑鎾舵喆閸曨剛顦ㄥ┑锛勫仒缁瑥顕ｉ锕€绠荤紓浣姑禍褰掓⒑閼测斁鎷￠柛鎿勭畱鍗卞ù鐓庣摠閳锋帒銆掑锝呬壕濠电偘鍖犻崶锝傚亾閿曞倸閱囬柕澶堝劤閿涚喖鏌℃径濠勫闁哄懏绻冪粙澶婎吋婢跺鍙嗗┑鐘绘涧濡厼危瑜版帗鐓冮梺鍨儏缁楁帡妫佹径鎰叆婵犻潧妫欏婵嬫煙閽樺鈧潡寮诲☉銏犖ч柛娑卞幗濞堝姊洪崫鍕拱闁烩晩鍨堕獮鍐煛娴ｇ儤娈鹃梺鎼炲劘閸斿矂宕归柆宥嗏拻濞达絿鎳撻婊呯磼鐠囨彃顏€规洘鍨块幃娆忣啅椤斿吋顔傞梻浣告啞濞诧箓宕归幍顔句笉婵炴垶鐟ｆ禍婊堟煙閻戞ê鐏ュù婊呭仱閺屾盯鎮欓崹顐ｆ瘓濠殿喖锕︾划顖炲箯閸涙潙宸濆┑鐘插€瑰▓妯肩磽閸屾瑧顦︽い鎴濇閺侇噣骞掑鐑╁亾閿曞倸鐐婄憸澶愬几鎼淬劍鐓欓梺顓ㄧ畱婢у鏌涢妶鍐ㄢ偓婵嗩潖閾忓湱纾兼慨妤€妫涢崝椋庣磽娓氬洤娅橀柛銊ョ埣楠炲啴妾辩紒鐘崇洴楠炴瑩宕橀鍕毄闂傚倷娴囬崑鎰扳€﹂崼銏☆偨闂侇剙绋侀弫鍌炴煕椤愩倕鏋庨柍褜鍓欓悥濂稿蓟閵娿儮鏀介柛鈩兠粣娑氱磼閻愵剙鍔ら柕鍫熸倐瀵顓奸崼顐ｎ€囬梻浣告啞閹歌顫濋妸鈺佺闁靛繒濮弨浠嬫倵閿濆簼绨芥い锔芥緲椤啴濡堕崱妯烘殫婵犳鍨伴顓炍ｉ幇鏉跨闁兼亽鍎幏缁樼箾鏉堝墽瀵奸悹鈧敃鍌涘€垮Δ锝呭暞閻撴盯鏌涢顐簻濠⒀勬尦閺岀喖顢欓悙顒傚姽濡炪倧绠戠紞濠囧箰婵犲倵鏀介悗锝庡亞閸欏棝姊洪崫鍕偓褰掝敄濞嗗浚鐒介柣鏃囶問閻熼偊鐓ラ柛鏇ㄥ幘閻撳姊洪崫鍕潶闁告梹鍨甸锝夘敋閳ь剙鐣烽崜浣瑰磯闁绘垶锕╅崬鏌ユ⒒閸屾瑦绁版い鏇嗗懏宕查柟鐑樻尰閸欏繘鏌ｉ姀銏╃劸濡楀懘姊洪崨濠冨闁搞劌銈稿顐﹀炊椤掍胶鍘介梺褰掑亰閸樼晫绱為幋锔界厸閻庯綆鍓欓埢鍫熸叏婵犲嫬鍔嬫繛纰变邯楠炲秹顢欓悡搴€撮梻鍌欑濠€閬嶅箠閹捐秮娲敇閵忋垹绁﹂梺鍛婂姦閸犳牠鎮″☉銏＄厱婵炴垵宕弸娑欑箾閸稑鈧繂顫忓ú顏呭殐闁冲搫锕﹂崝鎼佹⒑鐠囪尙绠茬€光偓缁嬭法鏆︽い鏍嚔濞差亶鏁傞柛娑变簼鐎氫粙姊绘担渚劸闁哄牜鍓熼幃鐑藉Ω閳轰胶顦ч悗鍏夊亾闁告洦鍓涢崢閬嶆煟鎼搭垳绁烽柛鏂挎湰閹便劑宕掑┃鎯т壕閻熸瑥瀚粈鍐╃箾閼碱剙鏋庢い鏇稻缁绘繂顫濋鈹垮姂閺屾洘绔熼姘拱閼叉牗绻濋悽闈浶ｆい鏃€鐗犲畷鏉课旈崨顏佸亾閿曞倸閱囨繝闈涘暞閻忓啫鈹戦悙鏉戠仸缁炬澘绉瑰畷浼村幢濞戞瑧鍙嗛梺鍝勬川閸嬫盯鍩€椤掆偓缂嶅﹤鐣烽幇鐗堝仺闁告稑锕﹂崣鍡椻攽閻樼粯娑ф俊顐ｇ箞椤㈡挸螖閸涱喚鍘搁柣搴秵閸撴瑩寮稿☉銏＄厸鐎光偓鐎ｎ剛袦濡ょ姷鍋為…鍥焵椤掍胶鈯曟い顓炴喘钘濋柕濞у懐锛濇繛杈剧秬濞咃絿鏁☉銏＄厽闁冲搫锕ら悘锕傛煟濞戝崬鏋ら柍褜鍓ㄧ紞鍡樼閺嶎厼缁╁ù鐘差儐閻撴洟鏌嶉埡浣告殺濠㈣锕㈤弻锝夊箻鏉堟崘鈧寧鎱ㄦ繝鍕笡闁瑰嘲鎳樺畷銊︾節閸愩劌澹嶅┑锛勫亼閸婃牠宕归棃娴虫稑鈽夊顒€鐏婂┑鐐叉閹稿摜绮绘繝姘厾闁告稑顭崯蹇旂箾閼测晛鏋涙慨濠冩そ瀹曠兘顢橀悙鎻掝瀱婵＄偑鍊戦崝宀勫箠閹邦喖鍨濋悹鍥ㄧゴ濡插牊绻涢崱妤冃＄紒銊ヮ煼濮婅櫣鎲撮崟顐ゎ槰濠电偛顦扮粙鏍焻鐎涙绡€缁剧増锚婢ц尙鎲搁弶鍨殻闁诡啫鍥у耿婵炴垶宸婚崑鎾诲籍閸繄顦ㄥ銈嗘煥濡插牐顦规鐐寸墱閳ь剚绋掗…鍥╃不濮椻偓閺岋綁鍩℃笟鈧崣鍕叏婵犲啯銇濈€规洦鍋婃俊鐑藉Ψ閿旈敮鍋撴繝姘拺閻庣櫢闄勫妯讳繆閻ｅ瞼纾肩€光偓閸愵喖鎽电紓浣虹帛缁诲牆鐣烽幆閭︽▌闂佸摜鍋涢悥鐓庮潖濞差亜浼犻柛鏇ㄥ墮缁愭盯姊虹粙娆惧剱闁烩晩鍨堕獮濠囧箻鐠囨彃鐎銈嗘椤寮埀顒勬⒑閸︻厼鍔嬪┑鐐诧工閻ｇ兘骞囬弶鍨祮闂侀潧绻掓慨鐑芥偘閵夈儮鏀芥い鏃傜摂閻掔偓绻涙径瀣€掑瑙勬礈閹瑰嫰濡搁姀鐘卞闂佺绻愰ˇ顖涚妤ｅ啯鈷戦柛娑橈攻婢跺嫰鏌涜箛鏃撹€挎鐐茬箳缁辨帒螣閼测晩鍟庨梺鍝勵槸閻楀棙鏅堕悾灞稿亾闂堟稏鍋㈤柟顔肩秺閸┾偓妞ゆ帒瀚弲婵嬫煕鐏炲墽鈽夐柍褜鍓欏锟犲蓟濞戙垹绠绘俊銈傚亾闁硅櫕鍔欓弫宥咁煥閸涱垳锛濋梺绋挎湰閻熝囧礉瀹ュ鐓ユ慨妯垮煐閻撶喖鐓崶銊︹拹閻忓骏绠撻弻锛勪沪缁嬪灝鈷夐梺鐟板槻閹虫劗鍒掑▎鎾崇閹兼番鍩勯崯瀣節閻㈤潧校妞ゆ梹鐗犲畷浼村箳濡も偓绾惧鏌熼崜褏甯涢柍閿嬪灴濮婂宕奸悢鎭掆偓鎺戭熆瑜庡ú妯兼崲濞戞矮娌柛灞惧焹閸嬫挸螖閸愩劌鐏婃繝鐢靛Т濞诧箓寮插┑瀣厱閻忕偛澧介埢鎾绘煙閻ゎ垱顏犵紒杈ㄦ尰缁楃喖宕惰娴狀厼鈹戦悙鎻掔骇闁绘顨婂鏌ュ醇閺囩喎娈ゅ銈嗗笒閸婂鏁嶅鍫熺厽閹兼惌鍨崇粔鐢告煕鐎ｎ亜顏柟顔斤耿閸╋繝宕橀鍡床婵＄偑鍊栧Λ渚€宕戦幇顓熸珷闁挎棃鏁崑鎾舵喆閸曨剛顦ㄩ梺鎸庢磸閸ㄨ棄鐣峰ú顏呭€烽柡澶嬪灩缁愮偤姊洪崨濠勭細闁稿骸鍟块埢鏃堝锤濡や讲鎷婚梺绋挎湰閻熝囁囬敃鍌涚厵缁炬澘宕禍鎵偓瑙勬处閸ㄥ爼銆侀弴銏犵厱婵﹩鍘介妵婵嗏攽閳ュ磭鍩ｇ€规洖宕埢搴∥熸繝姘殔闂傚倷娴囧畷鐢稿窗閹扮増鍋￠柕澹偓閸嬫挸顫濋妷銉ヮ瀴缂備礁鍊哥粔鎾€﹂妸鈺侀唶闁绘柨鎼鎶芥⒒娴ｅ憡鎯堥柛鐕佸亜鐓ら柕鍫濈墱閺嗚京绱撻崒姘偓宄懊归崶褉鏋栨繛鎴烇供閸ゆ洟鏌涢锝嗙濡楀懘姊洪崨濠冨闁搞劌銈稿顐﹀磼閻愬鍘遍梺鍝勬储閸斿本绂嶅┑鍥╃闁割偁鍨荤敮娑氱磼缂佹绠橀柛鐘诧工铻ｇ€瑰嫰顣︽竟鏇㈡倵鐟欏嫭绀€婵炲眰鍊濋幃锟犳偄閸忕厧鈧敻鎮峰▎蹇擃仾缂佲偓閳ь剟鎮楃憴鍕闁告挻绻堥幃姗€骞掗弮鍌滐紲闂佺粯鍔﹂崜娆擃敁濠婂喚娓婚悗娑欘焽閹藉啴鏌嶉鍛弨婵﹤顭峰畷鎺戭潩椤戣棄浜鹃柟闂寸绾惧綊鏌ｉ幋锝呅撻柛銈呭閺屾盯顢曢敐鍡欘槬缂備胶濮锋繛鈧柡宀€鍠栭獮鎴﹀箛闂堟稒顔勯梻浣圭湽閸娿倝宕抽敐澶婄畺鐟滅増甯掔粻鎺楁煙閻戞ê鐏ユい顒€顦甸幃妤冩喆閸曨剛顦ラ悗娈垮枦閸╂牜绮氭潏銊х瘈闁搞儴鍩栭弲顒€鈹戦悙鍙夘棡閻㈩垪鏅犲畷婵嬪川鐎涙ǚ鎷洪梺纭呭亹閸嬫盯鍩€椤掍胶澧悡銈嗘叏濡炶浜炬繝纰夌磿閺佽鐣烽悢纰辨晬婵﹢纭搁崬娲⒒娴ｇ儤鍤€闁宦板妿閹广垹顓奸崱娆樻祫婵犻潧鍊搁幉锟犲煕閹寸姷纾藉ù锝咁潠椤忓棛绠旈柟鐑橆殕閻撶喖鐓崶銊︾叆闁告繂鎼埞鎴︽晬閸曨剚姣堥悗瑙勬礈閸犳牠銆佸☉姗嗘僵濡插本鐗曢弫浠嬫⒒閸屾瑨鍏岄柟铏崌閹椽濡歌瀹曡尙鈧箍鍎卞Λ娑€呭畡鎷旀棃鏁愰崨顓熸闂佹娊鏀遍崹鍧楀蓟閻旂厧绠氶柡澶婃櫇閹剧粯鐓涘〒姘ｅ亾濞存粌鐖奸獮鍐╃鐎ｅ灚鏅┑鐐村灦钃遍悹鍥╁仜閳规垿鎮╅顫濠电偞鎸婚崺鍐磻閹惧瓨鍙忓┑鐘插暞閵囨繃顨ラ悙鏉戝闁诡垱妫冮弫鎰板炊閳哄倹顔撴繝鐢靛Х閺佹悂宕戦悩娲绘晪婵犲﹤鎳愭稉宥夋煙閹咃紞闁哄棴绠撻弻锝夊閵忊晝鍔搁梺缁樺笒閻忔岸濡甸崟顖氱闁糕剝銇炴竟鏇熶繆閻愵亜鈧倖绂嶅鍫濈柈閻庢稒眉缁诲棝鏌涢锝嗙妤犵偑鍨烘穱濠囶敍濠х偓瀚涘┑鈥冲级婢瑰棛妲愰幘璇茬＜婵炲棙鍨肩粣妤呮⒑閸濄儱校闁绘娲熷﹢渚€鎮楅悷鏉款仾閻庢艾鐗撻弫鎰緞婵犲嫮鏉搁梻浣告惈椤﹀啿鈻旈弴銏╂晩濠电姴娲﹂埛鎴︽煕濠靛棗顏╅柍褜鍓氶幃鍌炵嵁閺嶎収鏁冮柨婵嗘祩濞插憡淇婇妶蹇曞埌闁哥噥鍨堕幃锟犲Ψ閿斿墽鐦堥梻鍌氱墛缁嬫帡藟閵徛颁簻閹兼番鍩勫▓鏃堟婢跺绡€濠电姴鍊搁顐︽煟椤撶喎娴柡灞糕偓宕囨殕閻庯綆鍓涜ⅲ缂傚倷鑳舵慨鐢告儎椤栨凹鍤曟い鏇楀亾闁糕斁鍋撳銈嗗笒閸婄兘鎮炴繝鍥ㄧ叆闁哄洨鍋涢埀顒€缍婇幃鈥斥槈濮橈絽浜鹃柛蹇擃槸娴滈箖姊洪柅鐐茶嫰婢у鈧娲戦崡鍐差嚕娴犲鏁囨繝褎鍎虫禍鎯归敐鍥┿€婃俊鎻掔墛閹便劌螖閳ь剙螞濞嗘挸纾介梻鍫熶緱濞撳鏌曢崼婵囶棡閻忓繒鏁婚弻娑㈡偐閸愭彃顫庨梺閫炲苯澧柤鐟板⒔婢规洟顢橀悩鎰佹綗闂佽宕橀褏澹曢崗鑲╃闁糕剝锚閻忋儱鈹戦檱濡嫰鈥旈崘顔嘉ч柛鎰╁妼椤牓姊虹紒姗嗘畷闁瑰憡鎮傞幃楣冩煥鐎ｎ亶鍤ら梺鍝勵槹閸ㄧ敻宕妸銉富闁靛牆妫欑亸鐢告煕鐎ｎ剙浠滈崡杈ㄣ亜閹烘垵顏柍閿嬪灴濮婃椽顢曢妶鍛捕闂佸吋妞块崹閬嶅疾閸洦鏁嶉柣鎰嚟閸橆亪姊洪幖鐐插妧闁告劕褰炵槐鏃€淇婇妶鍥ラ柛瀣仧閺侇噣鏁撻悩闈涚ウ闁诲函缍嗘禍鏍绩娴犲鐓欓梺顓ㄧ細缁ㄨ姤淇婇顐㈢仸婵﹤顭峰畷鎺戔枎閹搭厽袦闂備礁婀遍埛鍫ュ磻婵犲洨宓佸┑鐘叉噽閻も偓濠电偞鍨堕悷銉︾濡ゅ懏鈷戦悹鎭掑妼閺嬫柨鈹戦鑺ュ唉闁归攱鍨块幃銏ゅ礂閼测晛寮虫繝鐢靛█濞佳兾涢鐐嶏綁宕妷褏锛滈梺缁樏壕顓㈠煀閺囥垺鐓忛柛銉戝喚浼冮悗娈垮枟閹告娊骞冨▎鎾崇骇闁瑰鍎愭禒顓炩攽閻樻剚鍟忛柛锝庡灣瀵板﹥绂掔€ｎ偄鍓归梺绋挎湰閸戠懓顭囬弽顓熺叄闊洦鎸荤拹锟犳煟椤撶喓鎳勭紒缁樼洴瀹曞崬螣閸濆嫬袘闂備礁鎲￠幑鍥ㄧ鐠轰警娼栨繛宸簻閹硅埖銇勯幘璺烘瀻婵炲牆鑻埞鎴︽倷閸欏鏋欓梺鍛娒妶鎼併€佸鑸垫櫜濠㈣埖蓱閺呮繈姊洪幐搴㈢５闁稿鎸剧槐鎺楁偐瀹曞洠濮囬梺闈涙搐鐎氫即鐛Ο鍏煎磯闁绘垶顭囬埀顒€顭峰娲川婵犲啰鍙嗛梺纭呮珪閿氭い顐㈢箰鐓ゆい蹇撴噹閳ь剛鍏橀弻锕€螣娓氼垱笑婵犳鍠撻崐婵嬪蓟閿濆牏鐤€闁规儳澧庨澶愭⒑閼姐倕鏆遍柡鍛洴椤㈡岸鏁愭径妯绘櫇闂佹寧娲嶉崑鎾绘煕閹般劌浜惧┑锛勫亼閸婃牠骞愭ィ鍐ㄧ柈闁秆勵殔缁狀垳绱撴担璇＄劷缂佺娀绠栧鍫曞醇濠靛棌鎸冮梺鍛婂笂閸楁娊寮婚悢鍏煎殟闁靛／鍛帨闂備浇妗ㄧ粈浣虹矓閹绢噮鏁囧┑鍌滎焾閻愬﹪鏌嶉崫鍕灕缂佸崬寮舵穱濠囨倷椤忓嫧鍋撻弽顬℃椽寮介鐐电枃闁瑰吋鐣崝宥夊磹閸洘鐓ラ柡鍐ㄧ墛閺嗘粓鏌涚€ｎ偅灏柍缁樻崌瀹曞綊顢欓悾灞奸偗濠碉紕鍋戦崐銈夊矗閸愵喖缁╅弶鍫涘妿閳瑰秴鈹戦悩鍙夋悙缂佺姷鎳撻湁闁挎繂鐗嗛埀顑跨矙閸╋繝宕橀埡浣圭€鹃柣搴″帨閸嬫捇鏌嶈閸撶喖骞婇悙鐑樼劶鐎广儱妫楅埀顒€顭烽弻銈夊箒閹烘垵濮夐梺鐟板槻椤嘲顫忛搹鍦煓闁圭瀛╅幏閬嶆⒑閼姐倕鏆€闁搞儜鍜佹Х闁诲骸绠嶉崕閬嵥囨导鏉戠９闁汇垻鏁哥壕鍏间繆閵堝嫯鍏岄柍钘夘樀閺屾稑顫滈埀顒傜不閺嵮呮殾妞ゆ劧绠戠粈瀣⒒閸喓鈯曢柛濠庡灠閳规垿鎮╅鑲╀紘濠电偛顦伴惄顖炲极閸愵喗鏅濋柛灞剧⊕濞呮牕鈹戦悙鏉戠仧闁搞劍妞介崺娑㈠箣閿旂晫鍘介梺缁樻煥閹诧紕娆㈤弻銉︾厓闂佸灝顑嗛埛鎺旂磼鏉堛劌娴い銏″哺瀹曘劑顢橀悩杈敇闂傚倷娴囬鏍闯椤栨粍宕叉繝闈涱儏缁犳牠鏌曡箛瀣偓鏍吹閸愵喗鐓冮弶鐐村椤︼妇绱掗幓鎺嬪仮婵﹦绮幏鍛喆閸曨偂鍝楅梻浣侯焾鐎垫帡宕圭捄铏规殾婵犻潧妫崥瀣熆鐠虹尨鍔熼柛姗€浜跺娲捶椤撶偛濡哄┑顔硷龚瀹曞灚绔熼弴鐔洪檮闁告稑锕﹂崢钘夆攽椤斿浠滈柛瀣尰缁绘稒鎷呴崘鎻掝伀妞も晠顥撻幉鎼佸籍閸繆鎽曢悗骞垮劚閻楁粌顬婇妸鈺傗拺闁告稑锕ョ亸鎵磼鐠囪尙澧﹂柡浣瑰姍閹瑩寮堕幋鐘电嵁濠电姷鏁搁崑鐐垫暜閹烘绠规い鎰╁劤娴滀粙姊绘担铏瑰笡闁圭鎲￠〃銉╁箹娴ｇ懓鈧泛鈹戦悩鍙夊妞ゃ儱锕ラ妵鍕箛閳轰胶浠炬繝銏ｆ硾鐎氼喚妲愰幒鏂哄亾閿濆骸浜滈柣蹇ラ檮閵囧嫰濮€閻欏懓鍚┑顔硷功缁垶骞忛崨鏉戝窛濠电姴鎳愰、鍛攽閻橆偅濯伴柛鏇炵仛閻ｈ泛顪冮妶搴″箹闁诲繑绻嗛悘鎺楁⒑閸忚偐銈撮柡鍛懅缁厽寰勯幇顓涙嫼闁荤喐鐟ョ€氼剟宕濈捄琛℃斀妞ゆ柨鎼埀顒佺箞楠炲啴鍨鹃弬銉︾€婚梺瑙勫劤椤曨參宕㈤悽鍛婄厽闁绘柨鎽滈幊鍐倵濮樼厧澧柟渚垮姂瀹曞ジ濮€閵忊槄绱℃俊鐐€栭幐鐐叏鐎涙顩查柣鎰靛厵娴滄粓鏌曟繝蹇曞埌闁告棑绠撻弻鐔碱敊閻ｅ本鍣伴悗娈垮枛閻栧ジ鐛€ｎ亖鏀介柟閭﹀幘缁嬪牊绻濋悽闈浶ｆい鏃€鐗犲畷浼村冀椤撶喐娅囬梺鎸庢⒐閸庢娊宕瑰┑鍥ヤ簻闁哄稁鍋勬禒婊呯磼閻欌偓閸ㄥ爼寮诲☉妯锋婵炲棙鍔楃粙鍥倵閻熺増鍟炵紒璇插€块崺鐐哄箣閿旇棄浜归梺鍦帛瀹稿宕戦幘缁樺仭闁逛絻娅曢悘浣糕攽閳藉棗鐏ラ柛瀣姉婢规洘绂掔€ｎ偆鍘遍柣蹇曞仜婢т粙骞婇崨瀛樺仯闁归偊浜滃畵鍡涙煛鐏炲墽娲撮柟顔规櫅閻ｇ兘宕惰閹蜂即姊绘担绛嬪殐闁哥噥鍋婂畷鍗炩枎閹寸偞绶梻鍌欑閹碱偄煤閵娾晛纾绘繛鎴欏灪閸婅泛鈹戦悩鍙夊闁抽攱鍨块弻娑㈠箻閺夋垹绁锋繛瀛樼矌閸嬨倝寮诲☉銏″亹闁惧浚鍋勭壕鎶芥⒑鐠団€虫灓闁哄苯顦垫俊鐢稿箛閺夎法顔婇梺瑙勫礃濞夋稓鏁Δ鍛厽闁绘柨鎽滈惌瀣磼椤旇姤灏柣锝呭槻椤劑宕奸悢铚傜盎闂備礁鍚嬬粊鎾疾濞戞氨鐭堥柨鏇炲€归埛鎴︽煕濞戞﹫宸ュ┑顕嗙畵閺岋綁骞樺畷鍥ь暫濡炪値鍘煎ú顓熶繆閹间礁鐓涢柛灞剧矊鐢鏌ｉ悢鍝ョ煁缂侇喗鎸搁悾宄邦煥閸愮偓鍍靛銈嗘尵婵參寮ㄩ搹顐ょ瘈闁汇垽娼у瓭濠电偠顕滅粻鎾崇暦閹邦厾绡€婵﹩鍘鹃崣鍐ㄢ攽閳藉棗鐏熼悹鈧敃鈧嵄婵炲樊浜濋悡鏇熶繆椤栨粎甯涢柛濠冨姈閹便劍绻濋崨顕呬哗缂備緡鍠楅悷鈺呯嵁閹邦厽鍎熼柕蹇娾偓鎰佷紗婵犵數濮甸鏍窗濡ゅ嫬缍橀梻浣告啞閺屻劑鎯岄崒鐐茬伋闁哄秲鍔庣弧鈧梺鎼炲劥閸╂牠寮查鍫熲拺闂侇偆鍋涢懟顖涙櫠椤斿浜滄い鎰╁灮缁犲磭绱掓潏銊ョ瑨閾伙綁鎮归崶褎鈻曢柍褜鍓氶幑鍥ь潖濞差亜绠氱憸蹇曠不閹惰姤鐓欓柧蹇ｅ亝鐏忕數绱掗鍛籍闁轰焦鎹囬幃鈺呭棘閵夛箑顏归梻鍌欑閹诧紕鎹㈤崒婧惧亾濮樼厧鐏﹂柨婵堝仱閺佸啴宕掑☉姘箞闂備礁鎼崯鐘诲磻閹剧粯鐓曢柕濞у嫭姣堥梺璇″櫍缁犳牠骞冨鍫熷癄濠㈠厜鏂傞崝搴ㄥ箟閸涘﹤绶為柟閭﹀墰閿涙盯姊洪悷鏉库挃缂侇噮鍨跺鏌ュ蓟閵夈儳顔愮紓渚囧枤閹虫挻鏅堕弻銉︾厽闊洦鎸炬晥濠?
                    customBackground.push(l);
                }
            });

            analysisState.background = customBackground.join(' ').trim();
            analysisState.revisionMode = false;
            // 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倿骞夊☉銏犵缂備焦顭囬崢閬嶆⒑闂堟稓澧曢柟鍐查叄椤㈡棃顢橀姀锛勫幐闁诲繒鍋涙晶钘壝虹€涙ǜ浜滈柕蹇婂墲缁€瀣煛娴ｇ懓濮嶇€规洖宕埢搴∥熼幁宥囧仱濮婂宕掑▎鎰偘濡炪倖娲橀悧鐘茬暦瑜版帒绠柦妯侯槺閿涙盯姊洪棃娑氬妞わ箑宕悾鍨瑹閳ь剟寮婚垾鎰佸悑閹艰揪绲肩划鎾绘煙閸忓吋鍎楅柣鎾崇墦瀵偊宕卞☉娆戝帗閻熸粍绮撳畷婊冾潩椤撶姭鏀虫繝鐢靛Т閸熶即姊介崟顖涚厱婵炴垶锕崝鐔兼煕濡寧顥夋い顏勫暣婵″爼宕卞Ο鐑樻闂備線娼荤徊濠氬磿闁秴鐓濋柟鐐墯閻撱儵鏌涢弴鐐典粵妞ゆ梹妫冨铏圭磼濡搫顫屽銈嗘处閸樹粙寮查崼鏇ㄦ晜闁割偆鍠庡▓銊╂⒑瑜版帒浜伴柛妯款潐缁傚秴顭ㄩ崼鐔哄幍闂佸憡绻傜€氼參藟濠婂厾鐟邦煥閸涱厺澹曠紓浣虹帛缁诲倿顢氶妷鈺佸嚑妞ゆ劏鎳囬崑鎾诲即閻斾警娲搁梺闈╁瘜閸樺墽澹曟總绋跨骇闁割偅绋戞俊鍏肩箾閹碱厼鏋熸い銊ｅ劦閹瑩宕ｆ径濠冪亷婵＄偑鍊戦崹娲€﹂崼銉嬪洭骞庨懞銉у幗闂侀潧鐗嗙€氼喚绮ｉ弮鈧幈銊︾節閸愨斂浠㈤悗瑙勬处閸嬪﹤鐣烽悢纰辨晣闁绘ɑ褰冭潕缂傚倸鍊搁崐鐑芥嚄閸撲礁鍨濇い鏍ㄧ矋瀹曟煡鏌涘畝鈧崑鐐哄磻閳哄懏鐓熼柟杈剧稻椤ュ姊洪崡鐐村枠闁哄矉绻濆畷鍫曞煛娴ｉ攱鍩涢梻浣告啞閿氶柟璇х磿閹广垹鈽夊▎鎰Ф闂佸憡鎸嗛崘銊у帓濠电姷鏁搁崑鐐差焽濞嗘垟鍋撳鐓庢灈妞ゆ洏鍎茬换婵嬪炊瑜旈弫婊冣攽鎺抽崐鎰板磻閹剧粯鐓?active 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倿骞夊☉銏犵缂備焦顭囬崢閬嶆⒑闂堟稓澧曢柟鍐查叄椤㈡棃顢橀姀锛勫幐闁诲繒鍋涙晶钘壝虹€涙﹩娈介柣鎰彧閼板潡鏌熷畷鍥р枅妞ゃ垺顨嗗鍕偓锝嗘尰缁挸顫忕紒妯诲閻熸瑥瀚禒鈺呮⒑閸涘﹥鐓ョ紒澶婄埣楠炴垿濮€閵堝懐顦ㄥ銈嗘煥濡插牓鏁冮崒娑氬幈闂佸搫娲㈤崝宀勬倶閻樼粯鐓曢柟鑸妼娴滄儳鈹戦敍鍕杭闁稿﹥鐗犲畷婵嬫晝閳ь剟鈥﹂崸妤€鐒垫い鎺嶇劍閸欏繘鎮峰▎蹇擃伌婵炲牊绮嶉幈銊︾節閸愨斂浠㈤梺鍝勮嫰閹虫﹢骞冨▎鎾村殤閻犺桨璀︽导鍐ㄢ攽閻橆偅濯伴柛鎰╁妷閹稿啰绱撴担浠嬪摵閻㈩垽绻濋獮鍐煛閸涱喗鍎銈嗗姂閸ㄥ銆傞弻銉︹拻濞达綁顥撴稉鑼磽瀹ュ嫮绐旂€殿喓鍔嶅蹇涘煛閸愵亜顦╅梻浣风串缁蹭粙鎯夋總鍛婂剹婵炲棙鎸婚崑锝夋煕閵夘垳鐣遍悗姘叄閺屾盯寮埀顒勫垂閸噮鍤曞┑鐘宠壘閸楁娊鏌ｉ弮鍫缂佹劗鍋涢埞鎴︽倷閺夋垹浠ч梺鎼炲妽濡炰粙銆侀幘鎰佸悑濠㈣泛顑呮禒鈺佲攽椤旂煫顏呮櫠閻ｅ瞼鐭撴い鏃囧Г閸欏繐鈹戦悩鎻掍簽闁绘捁鍋愰埀顒冾潐濞叉鏁幒妤€鐓濋幖娣妼缁狅絾銇勯幘璺烘櫩婵犲﹤鐗婇埛鎺懨归敐鍛暈閻犳劧绻濋弻宥呯暋閹殿喖鈪甸悗瑙勬礃閸ㄥ灝鐣烽崡鐐╂瀻闊洦鎸炬禍鐗堢節閻㈤潧浠滄俊顐ｇ懇瀹曟繂螖閸涱喖浠悷婊呭鐢鎮￠崘顏呭枑婵犲﹤鐗嗙粈鍫熺箾閸℃ɑ灏伴柛瀣ф櫊閺岋綁骞嬮敐鍡╂濡炪値鍋勯幊姗€寮婚妸銉㈡婵☆垯璀︽导鍐ㄢ攽閿涘嫯妾搁柛锝忕到椤繐煤椤忓嫬绐涙繝鐢靛Т鐎氀兾ｉ崼銉︹拺闁圭瀛╃壕鎼佹煕婵犲啰绠炵€规洘妞介崺鈧い鎺嶉檷娴滄粓鏌熼崫鍕棞濞存粍鍎抽埞鎴︽倷閻愬厜鍋撶€ｎ剚宕叉繝闈涙－閸ゆ洟鎮归崶銊с偞婵℃彃鐗撻弻宥夊垂濞戞瑦婢掗梺绋款儐閹瑰洭寮崘顔肩＜婵﹢纭搁崥鍛節閻㈤潧鈻堟繛浣冲洤绠犻柟鐗堟緲缁犳澘顭跨捄鍙峰牓寮ㄦ禒瀣厽闁归偊鍨伴惃娲煙閻ｅ苯啸缂佽鲸甯￠、娆撴嚃閳诡兙鍊濋弻娑㈠箳閹捐櫕璇炲Δ鐘靛仦椤洭骞忛悩缁樺殤闁肩鐏氶崯娲⒒閸屾瑨鍏岀紒顕呭灠铻炲〒姘ｅ亾濠碘剝鎸抽崺鈧い鎺戝閻撴洟鎮楅敐搴′簼鐎规洖鐭傞弻鐔碱敊閹稿寒妫勯梺宕囩帛閹搁箖骞戦崟顖毼╅柕澶堝剾椤忓懐绡€闁汇垽娼ф禒婊勩亜閺囥劌骞楅柟渚垮姂閹粙妫冨☉妯间喊闁诲骸绠嶉崕閬嵥囬娑辨敯闂傚倷绀侀幉鈥趁洪敃鍌氬瀭濞村吋娼欑涵鈧梺瑙勫劶婵倝鎮￠悢鍏肩厸闁告劑鍔嶆径鍕亜韫囨洖鈻堥柡宀嬬秮楠炴﹢鎳犻鍌滃床婵犳鍠栭敃銉ヮ渻閽樺）娑㈠礃閵娿垺顫嶅┑鐐叉閸旀牠宕愰悜鑺モ拺閻犲洦褰冮銏ゆ煟椤撗冩珝鐎规洩绻濆畷妯侯啅椤斿吋顓挎俊鐐€栭崝褏绮婚幋鐘电焼闁告劏鏂傛禍婊堟煛閸愩劍鎼愬ù婊冪秺閺屻劌鈽夊▎鎴犵厜濠殿喖锕ュ钘壩涢崘銊㈡婵﹩鍓﹂弳顐ｇ節绾版ɑ顫婇柛瀣浮瀹曘垽鎳濋幍顔荤綍闂傚倷绀侀幖顐ょ矙娓氣偓瀹曟垿宕卞▎蹇ｆ婵炲濮撮鍡涙偂閺囥垺鍊堕柣鎰絻閳锋棃鏌熼崘鎻掝伀缂佽鲸甯楅幏鍛喆閸曨厼鍤掓俊鐐€ゆ禍婊堝疮閺夋埈鍤曢柛顐ｆ礀缁狅綁鏌ｉ幇顓熺稇闁哄鍨垮缁樻媴閼恒儯鈧啰绱掔拋鍦瘈鐎规洘濞婇弫鎰緞婵犲倻鈧參姊虹拠鈥崇€婚柛娑卞枟椤旀洟姊绘担瑙勫仩闁稿寒鍨跺畷婵嗩吋婢舵ɑ鏅╅梺鍝勬川閸犳挾寮ч埀顒勬⒑濮瑰洤鐏叉繛浣冲啰鎽ラ梻鍌欑劍鐎笛兠鸿箛娑樼９婵°倕鎳庨悞鍨亜閹哄秶顦﹂柛銈庡墴閺屾稑螣閸︻厾鐓撻悗瑙勬礃绾板秶鎹㈠┑瀣闁靛鍎版竟鏇㈡⒒閸屾氨澧涚紒瀣浮楠炲宕妷褎锛忛梺璇″瀻娴ｉ晲鍒掗梻浣筋嚃閸犳銆冩繝鍥ф瀬闁归偊鍘介崕鐔哥節闂堟稓澧涢柡鍛帶閳规垿鎮欏顔兼婵犳鍠曢崡鍐茬暦瑜版帗鍤掗柕鍫濇－濞肩喖姊洪崷顓炲妺妞ゃ劌妫濆畷鎴﹀箣閿旂晫鍘卞┑鐐村灥瀹曨剟鎮橀敐鍥ㄥ仏闁挎梻鏅弧鈧┑鐐茬墕閻忔繈寮稿☉銏＄叆闁哄浂浜滈々顒勬煕閹烘挸娴い銏＄洴閹瑩鎳犻澶婃暩闂傚倷绀侀幉鈩冪瑹濡ゅ懎鍨傞柧蹇ｅ亖娴犳岸鏌熼幆鏉啃撻柛濠勬暬閺屻劌鈹戦崱娆忓毈缂備降鍔岄妶鎼佸蓟閿濆鏅查柛鏇ㄥ亜缁侇喖鈹戦纭峰姛缂侇噮鍨堕獮蹇涘川閺夋垵绐涙繝鐢靛Т閸燁偊寮搁幋婵冩斀闁绘ɑ鍓氶崯蹇涙煕閿濆繒鍒版い顓炴穿椤﹀綊鏌熼钘夊姢闁宠鍨垮畷濂稿閵忋垹骞嗛梻浣藉吹婵灚绂嶆禒瀣鐎广儱鎳夐弸鏂课旈敐鍛殲闁抽攱鍨归惀顏堫敇閻愭潙娅ら悷婊勫Ω閸涱垳锛滈梺缁樏崯鍧楁倶閵夛妇绠鹃柟缁樺笚閸嬨儲鎱ㄦ繝鍕笡闁瑰嘲鎳樺畷銊︾節閸屾稒鐣肩紓鍌氬€风欢锟犲窗閺嶎厽鍋嬮煫鍥ㄦ礀閸ㄦ繈鏌涢銈呮瀾濠殿垰顕槐鎺楊敍濞戞瑧顦ㄩ梺璇茬箣缁舵艾顫忓ú顏咁棃婵炴番鍎遍悧鎾愁嚕閹绘帩鐓ラ柛顐ｇ箘閸橀亶姊虹涵鍛涧闂傚嫬瀚伴幃锟犲即閵忥紕鍘甸梺鍛婃寙閸曨偅鐣梻浣圭湽閸斿秴顪冩禒瀣摕婵炴垶顭傞悢鍏煎殥闁靛牆妫楅崹閬嶆⒒娴ｅ憡鎯堥柡鍫墰缁瑩骞樼拠鑼姦濡炪倖甯掗敃锔剧矓闂堟耽鐟邦煥閸曨厾鐤勯悗瑙勬礀閸熻法鍙呭銈呯箰閹虫劙宕㈤柆宥嗏拺闁革富鍘奸崝瀣煕閳轰緤韬柣鎿冨墴椤㈡绗熼崶顭戝晬闂備胶绮崝姗€骞撻鍫熷殌闁圭绨烘禍婊堟煏韫囥儳纾块柟鍐叉喘閺岀喖顢欓悡搴樻寖婵炲濯寸粻鎾诲箰婵犲啫绶炵€光偓閳ь剟寮舵禒瀣拻闁稿本鑹鹃埀顒佹倐瀹曟劕鐣￠幊濠傜秺瀹曞爼顢楁繝鍕棨濠电姰鍨煎▔娑⑩€﹂鍕亜闁糕剝蓱閸欏繑淇婇悙棰濆殭濞存粓绠栭幃妤冩喆閸曨剛锛橀梺绋挎捣閺佽鐣峰ú顏勭劦妞ゆ帊闄嶆禍婊堟煙閻戞ê鐏ユい蹇ｄ邯閺岋綁骞樼€靛憡鍣伴梺鍝勮閸婃宕版繝鍥х闁绘劕妯婂璇测攽閻愯尙鎽犵紒顔肩Ч瀹曟洜鈧湱濮寸徊?true闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倿骞夊☉銏犵缂備焦顭囬崢杈ㄧ節閻㈤潧孝闁稿﹤缍婂畷鎴﹀Ψ閳哄倻鍘搁柣蹇曞仩椤曆勬叏閸屾壕鍋撳▓鍨珮闁革綇绲介悾閿嬬附閸涘﹤浜滈梺鍛婄☉椤剟宕崼鏇熲拻闁稿本鐟ㄩ崗灞俱亜椤撶偟澧︽い銏＄墵瀹曞崬鈽夊Ο纰卞敹闂備礁鎲￠幐鍡涘礃閵娧傚枈濠碉紕鍋戦崐鏍箰妤ｅ啫纾婚柟閭﹀劦閿濆閱囬柣鏂垮缁犳艾顪冮妶鍡欏缂佽绉瑰畷闈涒枎閹邦喚顔曢梺鍛婄☉濞层倕煤閿曞倸鐓曢柟瀵稿仧缁犻箖鏌ゆ總鍓叉澓闁搞倖鐟﹂〃銉╂倷閹碱厽鐤侀梺鍝勭焿缂嶄線骞冮姀銈呯煑濠㈣泛顑囪ぐ瀣煟鎼淬埄鍟忛柛鐘崇墵閳ワ箓鎮滈挊澶岀暫闂侀潧绻堥崐鏇烆啅濠靛棌鏀介柣妯诲絻椤忣偊鎳栭弽銊х瘈鐎典即鏀卞姗€鍩€椤戭剙鎳庣欢銈吤归悩宸剰闁汇値鍠楅妵鍕冀椤愩垹澹夐梺杞版閼冲爼鍩€椤掆偓缁犲秹宕曢柆宓ュ洦瀵奸弶鎴犲幈闂佺懓顕慨椋庡婵傚憡鍊甸柨婵嗙凹缁ㄨ棄霉閻橆喖鐏柕鍥у楠炴帞鈧綆浜炴禒鐐箾閿濆懏鎼愰柨鏇ㄤ邯閵嗕線寮撮姀鐙€娼婇梺缁橆焾濞呮洟顢欓幒妤佺厽閹兼番鍩勯崯蹇涙煕閻樺磭澧甸柍銉畵閹粓鎸婃径瀣偓顒勬⒑瑜版帒浜伴柛妯垮亹濞嗐垽鎮欏ù瀣杸闂佺粯蓱瑜板啴顢旈幘顔界厱闁绘柨顨庨崕鏃€鎱ㄦ繝鍕笡闁瑰嘲鎳橀幃鐑藉级閸啩鎴炵節閻㈤潧浠滈柣掳鍔岄悾婵堢矙鐠恒劍娈鹃梺纭呮彧缁犳垵顔忓┑瀣厸濠㈣泛顑呴悘锕傚级閸繄澧涚紒缁樼〒閳ь剛鏁搁…鍫㈡暜閸洘鐓熼幒鎶藉礉閹达箑绠栭柍銉︽灱閺嬪酣鏌熼幆褜鍤熼柛姗€浜跺Λ鍛搭敃閵忊€愁槱闂佺懓鎲￠幃鍌炵嵁閸愵喖绠ｉ柨鏃傛櫕閸橀亶鏌熼崗鑲╂殬闁糕晛瀚埢鎾愁煥閸喓鍘搁悗鍏夊亾閻庯綆鍓涜ⅵ婵°倗濮烽崑鐐烘晪闂佷紮绲块崗妯虹暦閹偊妲烽梺鍛婄懄濡炰粙寮婚敐鍡樺劅闁靛繆鏅涢弲閬嶆⒑闂堚晝绉甸柛锝忕到閻ｇ兘骞嬮敃鈧獮銏＄箾閹寸儐鐒介柛鏃撶畱椤啴濡堕崱妤冪懆闂佹寧娲╂俊鍥╁垝閺冨牊鍋ㄩ柛娑橈功閸橀亶姊虹紒妯曟垿宕滃顑芥灁婵犲﹤鐗婇悡娆愩亜閺囩偞顥犵紒鈾€鍋撻柣搴ゎ潐濞叉﹢鏁冮姀銈冣偓渚€寮崼婵嗙獩濡炪倖鎸鹃崰鎾诲焵椤掑倸浜剧紒缁樼箞閹粙妫冨ù韬插灲閺屻劑寮村Ο琛″亾濠靛绠栫憸鏂跨暦閸楃偐鏋庨柟瀵稿Х閸斿爼姊绘担绋款棌闁稿绶氬畷鏇㈠蓟閵夛箑浜楅梺缁樻煥閸氬鎮″☉銏＄厱閻忕偟鍋撻惃鎴澝归悩顔肩伈闁哄瞼鍠栭、娆撴寠婢跺奔绱濋梻浣告惈閺堫剛绮欓幘璇茬劦妞ゆ帒锕︾粔鐢告煕婵犲啰澧垫鐐差儔閺佸啴鍩€椤掍緡鏀伴梻鍌欑閹测€趁洪敃鍌氬瀭濞村吋娼欑涵鈧梺鎯ф禋閸嬪倻鎹㈤崱娑欑厪闁割偅绻傞埀顒€鎲＄粋宥夋倷椤掑倻顔曢柣搴㈢⊕椤洭鎯岀€ｎ喗鐓曢幖杈剧磿閺嬪啴鏌ｈ箛鎾虫殻婵﹨娅ｇ槐鎺戭潨閸絺鍋撻幐搴ｇ濞达絽鍟跨€氼噣銆呴柨瀣瘈濠电姴鍊搁顐ょ磼閻樻彃鈷旈柍褜鍓涢幊鎾寸珶婵犲洤绐楅柡宓苯娈ㄥ銈嗘磵閸嬫捇鏌＄仦鐐鐎规洟浜跺鎾偑閳ь剙危椤旂⒈娓婚柕鍫濋娴滄繄绱掗鑺ュ磳鐎规洘妞介崺鈧い鎺嶉檷娴滄粓鏌熼悜妯虹仴妞ゅ繆鏅濈槐鎺楁偐瀹曞洤鈷岄梺鍝勬湰濞叉繄绮诲☉銏犖ㄧ憸蹇涙晬閻斿吋鈷掗柛灞捐壘椤忊晠鎮楀鐓庡⒋闁炽儻濡囬幑鍕Ω閿曗偓绾绢垶姊虹紒妯虹仸闁挎洍鏅涜灋闁绘劕顕粻楣冩倵濞戞瑯鐒介柣顓熷笧缁辨帡鎮╁畷鍥р拰閻庢鍠栭…鐑藉箖閵忋倖鍋傞幖杈剧秵濡插爼鏌ｉ悢鍝ョ煀缂佺粯甯″顐︻敊鐏忔牗顫嶉梺闈涢獜缁辨洟宕㈤幘缁樷拻濞达絽鎽滄禒銏°亜閹存繃鍤囬柟顔斤耿楠炴﹢顢欓悾灞藉箰闂佽绻掗崑娑欐櫠娴犲鐓″鑸靛姈閻撳啴鏌﹀Ο渚▓婵℃彃鎲￠妵鍕敃閿濆洨鐓夐悗瑙勬礈閸樠囧煘閹达箑骞㈤柍鍝勫€圭粊顕€姊婚崒姘偓鎼佸磹妞嬪海鐭嗗〒姘ｅ亾闁诡喖娼″畷鍫曗€栭浣烘创鐎规洜鍠栭、娑㈠焵椤掑嫬鐐婃い鎺嶇娴犺櫣绱撴担鍓插創闁稿骸顭烽獮妤呭即閵忊檧鎷洪梻鍌氱墛閸楁洟宕奸妷銉ф煣濠电偞鍨崹鍦兜閳ь剟姊洪幆褎绂嬮柛瀣€婚幑銏ゅ幢濡晲绨婚梺鍝勭Р閸斿酣銆傞弻銉︾厵妞ゆ牗姘ㄦ晶娑㈡煏閸パ冾伃妞ゃ垺娲熸慨鈧柍銉ㄦ珪閻忓酣姊绘担绛嬪殐闁哥姵顨婇妴鍐醇閵夈儳鐤呴梺鍦檸閸犳牜绮堢€ｎ偁浜滈柟鐑樺灥娴滄壆绱掓鏍у籍婵﹦绮幏鍛瑹椤栨粌濮兼繝鐢靛仜椤曨參宕楀Ο渚殨妞ゆ劧绲跨弧鈧┑顔斤供閸庣敻濡烽妷锝傚亾閹烘埈娼╅柨婵嗘噸婢规洟鏌ｆ惔銏╁晱闁哥姵顨婇獮鎰版惞椤愶絽寮块梺閫炲苯澧撮柡灞界Ч閸┾剝鎷呴崨濠冾唹闂備胶绮换鍐洪悢濂夋綎婵炲樊浜濋崵鎺楁煏閸繃鍣洪柣搴ㄧ畺濮婃椽鎳￠妶鍛亞婵炲瓨绮犻崜娆擃敋閵夛妇绡€闁搞儜鍜佹Ф闁荤喐绮岄ˇ闈涚暦閹达箑绠婚柟棰佺劍閸嶉潧顪冮妶鍡楃仸闁稿氦娅曠粋鎺楊敊鐏忔牗鏂€濡炪倖姊婚妴瀣礉閻旇櫣纾兼い鏇炴噹閻忥附顨ラ悙鑼鐎规洏鍔戝鍫曞箣濠靛牏宕烘繝鐢靛Х閺佸憡鎱ㄩ幘顔肩９闁荤喐澹嬮弸鏃€淇婇婵嗕汗缁惧彞绮欓弻娑氫沪閸撗勫櫘濡炪倧璁ｉ梽鍕Φ閸曨垰绠ｆ繝闈涙祩濡箓鎮楃憴鍕缂傚秴锕ら悾椋庣矙鐠囩偓妫冮崺鈧い鎺戝閸戠姴銆掑锝呬壕闂佸搫鏈惄顖炵嵁閸ヮ剚顥堟繛鎴炵懅娴滎亪姊洪幖鐐插姕闁圭鍟块～蹇撁洪鍕啇闂佺粯鍔栬ぐ鍐╂叏婢舵劖鈷戦柛婵嗗閸ｈ櫣绱掔拠鑼ⅵ妤犵偛鍟妶锝夊礃閵娾晛鏁归梻浣告惈濞层劑宕崸妤€绠繛宸簼閳锋垿姊婚崼姘珔闁伙附绮撻弻娑樜熼幁鎺戜划閻庤娲樼换鍕焵椤掑﹦绉甸柛鐘愁殜閹€斥枎閹惧鍘甸梻鍌氬€搁顓犳嫻閻楀牅绻嗘い鎰剁到閻忔挳鏌″畝鈧崰鏍偘椤曗偓瀹曞綊顢欓崣銉х闂佽姘﹂～澶娒洪弽褏鏆︽い鎺戝暟娴滀粙姊婚崒姘偓鐢稿磻閹剧粯鐓欓梺顓ㄧ畱閺嬨倖绻涙径濠冨仴婵﹤顭峰畷鎺戔枎閹邦喓鍋樻俊鐐€ら崑鍕囬鐐┾偓锕傚垂椤斻儳鍠撶槐鎺懳熼懡銈呭▏闂備胶鎳撻崥瀣偩椤忓牆绀夌€光偓閳ь剛鍒掓繝姘唨鐟滃寮ㄦ禒瀣厱閻忕偛澧介。鏌ユ煕閻斿搫浠遍柡宀嬬秮楠炴鈧潧鎲￠崳浼存⒑閸濆嫭婀伴柣鈺婂灦閻涱噣宕堕澶嬫櫌闂侀€炲苯澧伴柣銉海椤﹀綊鏌＄仦鍓ф创闁诡喒鏅濈划鐢垫兜閸涱亜浜鹃柛褎顨嗛悡娑㈡倶閻愮數銆婇柛瀣尭閻ｇ兘宕堕妸锔炬殾闂傚倷绶氶埀顒傚仜閼活垱鏅剁€电硶鍋撶憴鍕；闁告鍟块锝嗙鐎ｅ灚鏅ｅ┑鐘欏嫬鍔ゅù婊勫劤闇夐柨婵嗘川閵嗗﹪鏌＄€ｎ亪鍙勯柡宀€鍠撻埀顒傛暩椤牓鍩㈤崼銉︾厓闁荤喐澹嗙粻濠氭煛瀹€瀣ɑ闁诡垱妫冮、娑橆煥閸涘拑缍佸铏圭矙濞嗘儳鍓板┑鈽嗗亝缁诲倿顢氶敐澶婄畾闁煎壊鍏涘Ч妤呮⒑閸︻厼鍔嬮柟鍛婃尦楠炲繒绱掑Ο鑲╊啎闁哄鐗嗘晶浠嬪礆娴煎瓨鐓欓悹鍥囧懐锛熼梺鐟板槻缂嶅﹪宕洪崟顖氱闁挎棁娉曢惄搴繆閻愵亜鈧牠骞愭ィ鍐ㄧ；闁绘柨鎲″▍鐘绘煥閺囩偛鈧綊鎮″☉妯忓綊鏁愰崶鍓佸姼闂佸搫妫寸徊浠嬪煘閹达附鏅柛鏇ㄥ墰閸旂懓顪冮妶蹇涙闁瑰憡濞婂璇测槈濡粍姊归幏鍛矙閹稿孩鍤堥梻鍌欑閹碱偊鎯屾径宀€绀婂ù锝呭閸ゆ洘銇勯幒鎴濃偓鐟扮暦婢舵劖鐓忓┑鐘茬箰閻︽粓鏌涢悙瀛樺€愭慨濠勭帛閹峰懏鎱ㄩ幇銊ヤ壕闁逞屽墴閺屾稓鈧綆鍋呭畷宀勬煛瀹€瀣暠閾伙絽銆掑鐓庣仭鐎涙繈姊绘担濮愨偓鈧柛瀣尭闇夐柣妯烘▕閸庢劙鏌ｉ幘璺烘瀾濞ｅ洤锕、娑樷攽閹邦剚顔勭紓鍌欐祰鐏忔瑧鍒掗鐐参﹂柛鏇ㄥ灠缁犳娊鎮楅敐搴濈敖濞寸厧瀚槐鎾存媴娴犲鎽甸梺鐟版啞閹倿銆佸Ο鑽ら檮缂佸鐏濈粣娑橆渻閵堝棛澧柛鈺佸暣瀹曪綁鎮滃Ο鑲╃槇濠电偛鐗嗛悘婵嬪几濞戙垺鐓ラ柡鍥崝姘亜椤忓嫬鏆炵紒鍌涘笧閳ь剨缍嗘禍鐐烘偩濞差亝鈷戠紓浣姑悘杈ㄤ繆椤愩垹顏柣銉海椤﹀綊鏌″畝鈧崰鎾跺垝濞嗘挸鍨傛い鏃€鍎崇徊褰掓⒒娴ｇ鏆遍柟纰卞亰楠炲﹨绠涘☉妯煎幈闂佺懓顕慨宄拔涢娑栦簻闁规崘娉涙禒锕傛煕閿濆棙銇濋柡宀嬬到閳规垿骞囬鍫濅粣闂備礁鎼悮顐﹀礉閹存繍鍤曢柡澶嬪殾閻斿吋鎯為梺顐ｇ〒缁€鍕⒒閸屾瑨鍏岀紒顕呭灡缁楃喎螖閸涱參妫烽梺鎸庣箓閹虫劙寮抽敂鑺ュ弿婵＄偠顕ф禍鎯ь渻閵堝啫鐏柣鐕傚缂傛挻绂掔€ｎ亜绐涙繝鐢靛Т閸燁垶鎮鹃懜鐢电瘈闁汇垽娼у瓭闂佹眹鍎遍ˇ闈涱嚕閼稿灚鍎熼柟鎯у帠婢规洟姊洪崫鍕偍闁搞劍妞藉鎻掆攽鐎ｎ偆鍘繝銏ｆ硾濡瑥鈻嶉崨瀛樼厽闁靛牆娲ゆ禍楣冩煏閸パ冾伃妤犵偞甯″畷鍗烆渻閹屾闂傚倸鍊风粈渚€鎮块崶顒婄稏濠㈣埖鍔曢崹鍌炴煕瑜庨妵婊堝焵椤戣法顦﹂柍璇查叄楠炴﹢鎼归顐ｎ棨闂傚倷绶氬褔鎮ч崱娆屽亾濮樼厧鏋熸繛鐓庮煼瀵噣宕奸悢鍙夊濠电偠鎻徊浠嬪箟閿熺姴鐤柣鎰劋閻撴瑧绱掔€ｎ偒鍎ラ柣鎾炽偢閺岀喖顢涘顒変純濡炪們鍨洪惄顖炲箖濞嗘挻鍤戞い鎺戝€瑰В?
            analysisState.active = true;
            askFinalConfirmation();
            return;
        }

        if (analysisState.active) {
            if (analysisState.processing) return;
            const nextStep = getNextMissingStep();
            const definition = getStepDefinition(nextStep);
            if (definition) handleFreeTextForStep(definition, promptText, selected => setModuleSelection(definition.key, selected));
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
            const handled = handleFreeTextForStep(definition, promptText, selected => {
                chatSelections[definition.key] = selected;
                renderInspireProfileSidebar(true);
                if (chatStep < MODULE_STEPS.length - 1) {
                    chatStep += 1;
                    addBotMessage(getBotMessage(chatStep), () => {
                        regTimeout(() => renderChatOptions(chatStep), 160);
                    });
                } else {
                    askFinalConfirmation();
                }
            });
            if (handled) return;
        }
    }

    if (chatInputField) {
        chatInputField.addEventListener('input', () => {
            updateChatInputHeight();
            updateChatCount();

            if (chatInputField.value.trim() !== '') {
                clearTimeout(typingTimeout);
                clearInspirePromptTimer();
            }
        });
        chatInputField.addEventListener('keydown', (e) => {
            // Shift + Enter 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倿骞夊☉銏犵缂備焦顭囬崢閬嶆⒑闂堟稓澧曢柟鍐查叄椤㈡棃顢橀姀锛勫幐闁诲繒鍋涙晶钘壝虹€涙ǜ浜滈柕蹇婂墲缁€瀣煛娴ｇ懓濮嶇€规洖宕埢搴∥熼幁宥嗘皑缁辨捇宕掑顑藉亾閻戣姤鍤勯柤绋跨仛閸欏繘姊洪崹顕呭剳缂佺娀绠栭弻宥堫檨闁告挾鍠栧濠氬灳瀹曞洦娈曢梺閫炲苯澧寸€规洑鍗冲浠嬵敇閻樿尙銈﹂梻浣虹《閸撴繈宕欓悷鎷旓絿鎷犲顔藉瘜闂侀潧鐗嗙换鎺楀礆娴煎瓨鐓曢柣鏃堟敱閸嬨儵鏌涢埞鍨姕鐎垫澘瀚伴獮鍥敆閸屻倕鏅梺璇叉唉椤煤閺嵮€鏋栭柨鏇炲€稿洿婵犮垼娉涢鍥储閹剧粯鍋℃繝濠傚閻帞鈧娲樼划宀勫煝鎼淬劌绠ｉ柣妯夸含閻熸繈鏌ｆ惔锛勭暛闁稿酣浜惰棟妞ゆ牗绮岄ˉ姘舵煕瑜庨〃鍡涘煕閹寸偑浜滈柟鍝勬娴滈箖姊洪崨濠庢畷婵炶尙鍠庨悾鐑藉醇閺囥劍鏅㈡繝銏ｆ硾椤戝棗鈻嶉弽顓熲拻濞达綀娅ｇ敮娑㈡煕閺冣偓閻楃偤濡甸幇鏉跨妞ゆ棁妫勯埀顒€鐏氶妵鍕箻閸楃偟浠鹃梺鎶芥敱閸ㄥ湱妲愰幒鏂哄亾閿濆骸浜滄い鏇熺矋缁绘繈鍩€椤掍礁顕遍悗娑欘焽閸橀亶姊虹€圭姵銆冪紒鈧笟鈧鎶芥晲閸ワ絽浜炬繛鍫濈仢閺嬫棃鏌涢弬璺ㄐょ紒顔碱儔楠炴帡寮崫鍕闂佹寧绻傛鍛婄閻愮儤鐓曟慨妞诲亾濞存粌鐖煎濠氭晲閸垻鏉搁梺鍝勬川閸嬫鍒掗懜鐢电瘈闁冲皝鍋撻柛灞剧矌閻撴捇姊虹化鏇熸珔闁挎洦浜滈锝夊箻椤旂⒈娼婇梺鎸庣☉鐎氼剟鐛崼銉︹拺閻犲洦褰冮崵杈╃磽瀹ュ懏顥㈢€规洘绮岄埢搴ㄥ箻瀹曞洤骞掗梻浣稿閸嬩線宕曢弻銉﹀亗婵炴垯鍨洪崐鍫曟煟閹邦剛浠涙繛鍛礋瀹曨垳绮欏▎鐐瘜闂侀潧娲ゅ畷顒勫磹閼姐倗鐜婚柡鍐ㄧ墛閻撴盯鎮橀悙鎻掆挃妞ゎ剝鍋愮槐鎺楁偐瀹曞洦鍒涢悗娈垮櫘閸ｏ絽鐣烽幒鎳崇喎鐣℃０浣割棜闂備礁婀遍崕銈夊箰閸撗呬笉濡わ絽鍟悡鏇㈡煃閳轰礁鏆欏┑顔兼喘閺岋綀绠涙繝鍐╃彆闂侀潧娲ょ€氫即銆侀弴銏℃櫜闁搞儮鏅濋弶浠嬫煟鎼淬値娼愭繛鍙夘焽閸掓帒顓兼径濠勵唵闂佸憡绋掑娆愬閻樼粯鐓忓鑸电〒閸掓澘霉濠娾偓閸楀啿顫忔繝姘＜婵炲棙鍔楅妶鏉款渻閵堝棙鑲犻柛銉戝拋妲遍梻浣风串缁蹭粙鎯夐懖鈺冪焼濠电姴娲﹂悡鏇㈡煃閳轰礁鏆熼柍钘夘槺缁辨帡骞囬褎鐣锋繛锝呮搐閿曨亝淇婇崼鏇炲窛妞ゆ柨鍚嬮鐘绘⒒娴ｅ湱婀介柛濠冾殜瀹曟垿骞橀懜闈涘簥濠电娀娼уú銊у姬閳ь剟姊虹粙鎸庢拱缂侇喖鐭傝矾闁逞屽墴濮婄粯鎷呴搹鐟扮闂佺懓鎽滈崑鎾舵崲濞戙垹鐒垫い鎺戝閻撴稓鈧厜鍋撻柍褜鍓熷畷浼村冀椤撴壕鍋撴担鍓叉建闁逞屽墴楠炲啴濮€閳藉棙效闁硅壈鎻徊楣冨闯椤栫偞鈷掗柛灞剧懅椤︼箓鏌熷ù瀣у亾閹颁焦缍庨梺闈╁瘜閸樺ジ宕瑰┑瀣厵闁硅鍔﹂崵娆撴煢閸愵亜鏋涢柡灞诲妼閳规垿宕卞Ο鐑樼彺闂備浇銆€閸嬫挸霉閻樺樊鍎愰柣鎾寸懇濮婃椽顢橀妸褏鏆犻梺鍛娚戦幃鍌炲蓟濞戙垺鍋愰悹鍥囧啩绱ｉ梻浣哥枃椤宕归崸妞尖偓浣糕枎閹寸偛鍘归梺缁樺灩閺咁偊宕ｅ鍡欑瘈闁汇垽娼ф禒婊堟煙闁垮鐏╃紒杈╁仦缁楃喖鍩€椤掑嫭鍋樻い鏃囨硶閻も偓濠电偞鍨堕悷銉︾閸︻厾纾介柛灞剧懅閸斿秹鏌ㄥ顓犵闁割偅绋戦埀顒佹礋閳ユ棃宕橀鍢壯囨煕閳╁喚娈橀柣鐔村姂濮婅櫣绮欏▎鎯у壈濠碘槅鍋呯换鍌炴偩閻戠瓔鏁嗛柍褜鍓涢崣鍛渻閵堝懐绠伴柟鍐差樀楠炲繒绱掑Ο鑲╊啎闁哄鐗嗘晶鐣屸偓闈涖偢閹綊鍩€椤掑嫭鏅濋柛灞剧☉閳ь剙娼￠弻锝夊箛闂堟稑骞嶆繛瀛樼矋缁捇寮婚悢琛″亾濞戞瑯鐒界紒鐘崇墪椤法鎹勯崫鍕典紑缂備浇椴哥敮鐐垫閹烘嚦鐔煎礂閻撳骸鐏￠梻鍌欒兌绾爼寮笟鈧畷鎴﹀箻閹颁焦瀵岄梺闈涚墕濡绮幒妤佺厱濠电姴瀚弳顒傗偓瑙勬礃閸ㄥ潡鐛鈧幊婊堟濞戞瑧鈧參姊绘担鍛婂暈婵炶绠撳畷婊冣槈閳跺搫娲俊鎼佸煛閸屾瀚奸梻浣侯攰閸嬫劙宕戝☉娆庣箚闁稿繗鍋愮粻鍓х棯椤撱埄妫戠紒鈾€鍋撻梻浣筋嚃閸犳洟宕￠幎濮愨偓浣割潩鐠鸿櫣鍔﹀銈嗗坊閸嬫捇鏌ｉ敐鍥у幋鐎规洖銈稿鎾Ω閿旇姤鐝滄繝鐢靛仩閹活亞绱炴笟鈧鏌ユ嚑椤掑倻锛為梺鍝勬储閸ㄦ椽鍩涢幒鎳ㄥ綊鏁愰崶鍓佸姼濡炪們鍎辩换姗€寮诲☉姘ｅ亾閿濆簼绨奸柛锝勭矙閺岀喖鐛崹顔句紙閻庤娲樼敮鎺楀煡婢跺娼╅柛妤冨仱閻?Enter 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁诡垎鍐ｆ寖闂佺娅曢幑鍥灳閺冨牆绀冩い蹇庣娴滈箖鏌ㄥ┑鍡欏嚬缂併劌銈搁弻鐔兼儌閸濄儳袦闂佸搫鐭夌紞渚€銆佸鈧幃娆撳箹椤撶噥妫ч梻鍌欑窔濞佳兾涘▎鎴炴殰闁圭儤顨愮紞鏍ㄧ節闂堟侗鍎愰柡鍛叀閺屾稑鈽夐崡鐐差潻濡炪們鍎查懝楣冨煘閹寸偛绠犻梺绋匡攻椤ㄥ棝骞堥妸鈺傚€婚柦妯侯槺閿涙稑鈹戦悙鏉戠亶闁瑰磭鍋ゅ畷鍫曨敆娴ｉ晲缂撶紓鍌欑椤戝棛鈧瑳鍥ㄥ€垫い鎺戝閳锋垿鏌ｉ悢鍛婄凡闁抽攱姊荤槐鎺楊敋閸涱厾浠搁悗瑙勬礃閸ㄥ潡鐛崶顒佸亱闁割偁鍨归獮鍫ユ⒒娴ｅ摜绉洪柛瀣躬瀹曞綊骞嶉绛嬫綗闂佹寧娲栭崐褰掓偂閻斿吋鐓忛煫鍥ㄦ礀椤庡矂鏌ｉ幘鍐叉倯闁逛究鍔嶇换婵嬪礋椤撶偟顐奸梻浣烘嚀閸㈡煡骞婂鈧獮鍐倻閼恒儳鍔烽梺鎸庢磵閸嬫挻绻涢崼鐔虹畺缂佺粯绻堥幃浠嬫濞戞鎹曢柣搴㈩問閸犳牠鎮ユ總绋跨畺鐟滄棃骞冮埡鍛殤妞ゆ帊鐒﹂鏇㈡⒒娴ｅ憡璐″褎顨呴…鍨熼懖鈺€绗夐梺鑽ゅ枑閸ｇ銇愰幒鎾存珳闂佹悶鍎辨晶搴ㄥ礉閹间焦鈷戦悹鍥ㄥ絻閻︺劑鏌涘▎蹇撴殭妞ゎ偄绻橀幖褰掑捶椤撶姷鍘梺鑽ゅУ娴滀粙宕濇惔銏狀嚤闁搞儺鍓氶埛鎴犵磼鐎ｎ偒鍎ラ柛搴㈠灴閺屾稓鈧絻鍔岄埀顒佺箞閻涱噣宕橀鑺ユ闂佺粯蓱瑜板啫鐣甸崱娑欌拺缂備焦鈼ら鍫濈柈闁秆勵殔閸戠娀鏌熸潏楣冩闁绘挻鐟╅弻娑滅疀濮橆兛姹楅梺鍝勬閿曘垽寮诲☉銏犳闁告煭銈呮儓闂備胶纭堕弬渚€宕戦幘鎰佹富闁靛牆妫楅崸濠囨煕鐎ｎ偅宕岄柡灞剧洴閹垽宕ㄦ繝鍕枏闂備椒绱徊鍧楀礂濡绻嗘慨婵嗙焾濡茬兘姊虹粙娆惧剱闁瑰憡鎮傞崺銉﹀緞婵炵偓鐎哄銈嗘寙閸岀偛浠愰梻浣虹《閺備線宕?
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
            toggleVoiceInput();
        });
    }

    const voiceBtn = document.querySelector('.voice-btn');

    [voiceBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                btn.style.transform = 'scale(0.9)';
                setTimeout(() => btn.style.transform = '', 100);
                // 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閹冣挃闁硅櫕鎹囬垾鏃堝礃椤忎礁浜鹃柨婵嗙凹缁ㄥジ鏌熼惂鍝ョМ闁哄矉缍侀、姗€鎮欓幖顓燁棧闂備線娼уΛ娆戞暜閹烘缍栨繝闈涱儐閺呮煡鏌涘☉鍗炲妞ゃ儲鑹鹃埞鎴炲箠闁稿﹥顨嗛幈銊╂倻閽樺锛涢梺缁樺姉閸庛倝宕戠€ｎ喗鐓熸俊顖濆吹濠€浠嬫煃瑜滈崗娑氭濮橆剦鍤曢柡澶嬪焾濞尖晠寮堕崼姘殨闁靛繈鍊栭埛鎺懨归敐鍫綈闁稿濞€閺屾稒鎯旈姀掳浠㈤悗瑙勬礃缁捇寮崘顔肩＜婵﹩鍘鹃埀顒夊墴濮婃椽宕ㄦ繝鍌毿曢梺鍝ュУ椤ㄥ﹪骞冮敓鐘参ㄩ柍鍝勫€婚崢鎼佹⒑閹肩偛鍔撮柣鎾崇墕閳绘捇寮Λ鐢垫嚀椤劑宕奸姀銏℃瘒婵犳鍠栭敃銈夊箹椤愶絾娅忛梻浣规偠閸庢粓鍩€椤掑嫬纾婚柟鐐窞閺冨牆宸濇い鎾跺缁遍亶姊绘担绛嬫綈鐎规洘锕㈠畷娲冀瑜忛弳锕傛煕濞嗗浚妲虹紒鈾€鍋撻梻鍌氬€搁悧濠勭矙閹烘埈鍟呮繝闈涚墢绾惧ジ鏌嶉柨顖氫壕闂佺顑嗛幑鍥ь潖缂佹ɑ濯村〒姘煎灣閸旀悂姊洪崫鍕⒈闁告挻鐩畷姘跺箳閹寸姵娈曢梺鍛婃閸嬫劙宕楀鈧畷娲焵椤掍降浜滈柟鐑樺灥椤忣亪鏌嶉柨瀣瑨闂囧鏌ㄥ┑鍡楊伂妞ゆ帞鍠栭弻锝夊箳閺傚じ澹曢梺闈涙搐鐎氫即鐛€ｎ喗鍊烽柤纰卞厸閹綁姊绘担鐑樺殌缂佺姴绉瑰畷纭呫亹閹烘垹鍘撮梺鐟邦嚟婵參宕戦幘缁樻櫜閹煎瓨绻冮幑锝夋⒑绾懎袚婵炶尙鍠栭獮鍐ㄎ旈崨顖氱ウ闂佸壊鐓堥崰鏍ㄦ叏鎼粹槅娓婚柕鍫濈箰閻︽粓鏌涢妸銊ゅ惈闁逞屽墴濞佳囧Χ閹间礁绠栭柍鍝勫暟绾惧吋淇婇婊冨付妤犵偛鐗撳缁樻媴閸涘﹥鍎撳┑鐐茬湴閸ㄨ棄鐣峰┑鍫滄勃闁绘劦鍓氶悵宄邦渻閵堝棙鈷掗柡鍜佸亞缁粯銈ｉ崘鈺冨幈濠电姴锕ら崯顐﹀汲閻旇櫣纾煎鑸得弸鐔兼煙娓氬灝濡界紒缁樼箞瀹曟帡濡堕崶褎鍊梺璇叉唉椤煤濡吋鏆滈柟鐑橆殣缂嶆牗绻濋棃娑卞剾闁轰礁瀚伴幃褰掑箒閹烘垵顬夐梺鍝勬噹閵堢顫忔繝姘＜婵炲棙鍨垫俊浠嬫⒑鐠団€虫灈闁绘牜鍘ч悾宄扳攽閸℃瑦娈曢梺鍛婃处閸撴瑦绂嶉鐐粹拺缂備焦蓱鐏忣參鎮楅崹顐㈡诞鐎规洜鏁诲鎾倷閳哄倹鏉搁梻浣虹帛閿氱痪缁㈠弮閵嗗倿寮婚妷锔惧幐闂佸憡渚楅崰鏍緤缂佹ǜ浜滄い鎾墲绾爼鏌熼悷鏉款伃闁诡噮鍣ｅ鍫曞箣濠垫劖娴嗘繝纰夌磿閸嬫垿宕愰弽顓炵閻犲洤妯婂〒濠氭煢濡警妯堟繛鍏肩墬缁绘稑顔忛鑽ょ泿缂備胶濮抽崡鎶界嵁閺嶃劍缍囬柛鎾楀嫬浠归梻浣风串缂嶄礁顭囪閸╃偤骞嬮敃鈧悡锟犳煕閳╁啨浠﹂柤鍓蹭邯濮婃椽宕ㄦ繝搴ｅ姼婵犮垻鎳撻悧鎾诲箖濡皷鍋撻敐搴℃灍闁抽攱鍨块弻娑樷槈濮楀牊鏁炬繝銏ｆ硾鐎氫即寮诲☉銏犖╅柍琛″亾闁规煡绠栭弻娑㈠煛閸屾粍鍒涘Δ鐘靛仜椤戝骞冨▎鎾村仺婵炲牆鐏濋弲顓㈡⒒閸屾瑨鍏岄柛妯犲洤围闁归棿绫嶉悜钘夌＜闁绘劖褰冮幆鐐测攽閻愬弶顥為柛鏃撶畱閳绘挻绂掔€ｎ偆鍘介梺褰掑亰閸樹粙宕曞Δ浣虹闁割偆鍠愮粈瀣煛鐏炵偓绀嬬€规洘鍎奸ˇ鍙夈亜韫囷絽骞栭柍瑙勫灴閸╁嫰宕橀埡浣插亾閹邦兘鏀介柨娑樺閸樻挳鏌℃担绋库偓鑽ゆ閹烘埈娼ㄩ柛顐犲灮椤ρ勭節閻㈤潧啸闁轰礁鎲￠幈銊╂倻婵劏鍋撻崒鐑嗘晩闁绘劦鍓﹀鐔兼⒑閸濆嫭鍌ㄩ柛銊ョ秺瀵憡绗熼埀顒勫箖瑜版帒鐐婃い蹇撳濮ｃ垽姊洪崫鍕紨缂佺姵鎹囧濠氭晲婢跺﹦鐫勯梺绋挎湰椤ㄥ棛鈧碍鐩鐑樻姜閹殿噮妲紓浣割槺閺佸鐛崼銉ノ╅柕澶樺枟瀵ゆ椽姊虹化鏇炲⒉妞ゃ劌鎳橀敐鐐哄煛閸涱喒鎷洪柡澶屽仒閸楀啿顬婇悜鑺ョ厱濠电姴鍟扮粻鎾淬亜椤愩垻绠崇紒杈ㄥ笒铻ｉ柤娴嬫櫆閸ゅ矂姊绘笟鈧埀顒傚仜閼活垱鏅堕濮愪簻妞ゆ挾鍋炵粚鎸庛亜閿曗偓閻栧ジ寮诲☉銏℃櫜闁告侗鍨虫婵犳鍠栭敃銉ヮ渻閽樺鏆﹂柕濠忓缁♀偓闂佸憡鍔﹂悡鍫澪ｉ柆宥嗏拻濞达絼璀﹂悞鐐亜閹存繃鍤囨鐐诧工椤粓鍩€椤掑嫮宓侀柛鎰靛枟閸嬨劑鏌涘☉姗堟敾婵炲懏鐗犲娲川婵犲啫顦╅梺鍛婏耿缁犳牠寮鍛斀閻庯綆鍋€閹疯櫣绱撴担鍓插剱閻庣瑳鍐胯€垮ù鐓庣摠閻撶姷鎲搁悧鍫濈闁伙絾妞介弻娑㈠煘閹傚濠碉紕鍋戦崐鏍暜閹烘纾归柟闂寸閸屻劑鎮楀☉娅虫垿宕ｈ箛鎾斀闁绘ê寮堕崳鐑樸亜閵夈儺妲归柕鍥у楠炴﹢宕橀崣澶娾偓顖炴倵閸偅绶查悗姘煎幘閹广垹鈹戠€ｎ亞顦伴梺鍓茬厛閸婏綁濡烽埡鍌楁嫽婵炶揪绲块悺鏃堝吹濞嗘挻鐓曢柟瀵稿У濞呮洜绱掓潏鈺佷槐鐎规洖宕埥澶娢熼懖鈺佺倞闂傚倷绀侀幖顐ょ矙娓氣偓瀹曟垿宕ㄩ弶鎴狀槯濠电姴锕ら悧濠囨偂閸愵亝鍠愭繝濠傜墕缁€鍫ユ煟閺傛娈犳繛鍏肩墵閺屟嗙疀濮樺吋缍堥梺鍝ュТ濡繈寮诲☉銏犲嵆闁靛鍎扮花缁樼節濞堝灝鏋ゆい顓炵墦閸╃偤骞嬮敃鈧悡锟犳煕閳╁啨浠︾紒銊ヮ煼閺岋絾鎯旈姀銏㈠彎闂佸憡顨嗘繛濠囨偘椤旇法鐤€婵炴垶顭囬娲⒑閹稿孩顥嗘俊顐㈠缁傚秴顭ㄩ崼鐔叉嫼缂備礁顑堝▔鏇犵不濞差亝鐓曢悗锝庡亜婵秶鈧娲忛崹铏圭矉閹烘柡鍋撻敐搴′簮闁归攱妞藉娲川婵犲嫮鐣甸柣搴㈠嚬閸撶喖宕洪埀顒併亜閹哄棗浜惧┑鐘亾闂侇剙绉撮悞鍨亜閹烘垵鈧骞婂Δ鍛厱闁靛鍨甸幊鎰板汲娴煎瓨鈷掑ù锝囶焾椤ュ繘鏌涚€ｂ晝绐旂€规洘娲熷濠氬Ψ閿曗偓娴滄鈹戦悙鏉戠仧闁搞劍妞藉畷鎰版偨閸涘﹦鍙嗗┑鐘绘涧濡盯宕欓崷顓犵＜闁靛鍔嶉ˉ澶嬨亜椤撯€冲姷妞わ箑纾槐鎺斺偓锝庡亜閻忚京鎲告０浣虹獢婵﹥妞介獮鏍倷閹绘帒螚闁诲骸绠嶉崕閬嶆偋閸℃稑绠氶柛顐ゅ枍缁诲棝鏌ｉ幇鍏哥盎闁逞屽墯閸ㄥ灝鐣疯ぐ鎺撴優闁革富鍘鹃悡鎾绘⒑绾懏褰ч柤闈涚秺閸┾偓妞ゆ帒锕﹂悾闈涒攽閳╁啯鍊愰柛鈹惧墲閹峰懘宕妷褍鏄ユ繝纰夌磿閸嬫垿宕愰弽顓炵闁绘劦鍓欓崹鏃€銇勯幘鍗炵仼缁炬崘宕甸幉鎼佸棘濞嗙偓缍庢繝鐢靛У閼瑰墽澹曢崗鑲╃闁糕剝锚缁楁帡鏌涘鍫㈢？缂佽鲸鎸荤粭鐔煎炊瑜庨悵顕€姊洪幖鐐插濠电偛锕悰顕€骞嬮敃鈧～鍛存煏閸繃鍣芥い锔哄姂濮婃椽妫冨☉鍐蹭紣闁诲孩绋堥弲鐘诲箚閸曨垼鏁嶆慨妯块哺濞堟儳鈹戦濮愪粶闁稿鎹囬弻宥夊Ψ椤栨粎鏆ゅΔ鐘靛仜椤戝骞冨▎鎾村仺缁剧増蓱閻庨亶姊婚崒姘偓鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤掆偓鎼村﹪姊虹粙鎸庢拱缂佸鎸剧划濠氬箚瑜夐弨浠嬫煟濡搫绾у璺哄閺岀喖顢涘鍐ф闂佽鍠栭崲鏌ュ煝鎼淬倗鐤€闁瑰灝鍟╅幃锝夋⒒娴ｈ櫣甯涚紒鐑╁亾闂佸憡顨呴崯鍧楋綖韫囨洜纾兼俊顖濆亹閻﹀牓鏌熼懖鈺勊夐柍褜鍓濈亸顏堝春閸涘瓨鈷掑ù锝呮啞閸熺偤鏌ㄩ弴妯虹伄缂侇喖顭峰浠嬵敇閻愮數鏆伴梻浣告啞濞诧箓宕滃璺虹？闁绘柨鍚嬮悡銉︾節闂堟稒顥炵€瑰憡绻堥弻銊モ槈濞嗘垹鐤勫┑顔硷龚濞咃絿鍒掑▎鎾崇閹兼番鍨虹€氭娊姊绘担钘夊惞闁哥喐鐟╁畷鑸垫媴閸涘﹤鏋犻梺杞扮閸婂綊骞堥妸鈺佺疀妞ゅ繐妫涘▔鍧楁⒒閸屾瑧鍔嶉悗绗涘吘娑欑瑹閳ь剟銆佸鎰佹▌闂佽鍠楅敃銏ゅ极閸愵喖纾兼繛鎴炶壘楠炲秵淇婇悙顏勨偓鏍蓟閵娾晛绠规い鎰剁畱缁€澶嬬節婵犲倹鍣界痪鎯с偢閺屟嗙疀濮樺吋缍堝┑鐐叉噺濞叉粎妲愰幒妤婃晩闁伙絽鏈崳鏉课旈悩闈涗沪闁告梹鐗犻獮鍡涘籍閸繄鍘梺鍦焾妤犳悂宕悜妯诲弿濠电姴瀚敮娑氱磼濡ゅ啫鏋涢柛鈹惧亾濡炪倖甯掔€氼剟鎮為崹顐犱簻闁圭儤鍨甸埀顒€鎲＄粋鎺戭煥閸喓鍘惧┑鐐跺蔼椤曆囨倶閿熺姵鐓涢柛娑卞幘閸╋絾銇勯姀锛勬创闁诡喗鐟ч埀顒傛暩椤牏鏁ィ鍐┾拻濞达綀顫夐崑鐘绘煕鎼淬垻鐭掔€规洘锕㈠畷锝夊Ψ瑜忛敍鐐寸節瀵伴攱婢橀埀顒侇殕閹便劑鎮滈挊澶岋紱闂佺粯鍔曢悘姘跺汲濠婂牊鐓冮柕澶堝劤閿涘秹鏌￠崱顓犵暤闁哄本绋戣灃闁告劑鍔屾竟澶娾攽閻愬瓨灏い顓犲厴瀵鎮㈢喊杈ㄦ櫖闂佺硶鍓濋〃鍡楋耿閻楀牄浜滈柕澶嗘噰閸嬫捇寮妷锔芥澑闂備胶绮敋闁诲繑宀稿鎶藉煛娴ｅ弶鏂€濡炪倖姊归崕鎶藉储鐎电硶鍋撳▓鍨珮闁稿锕ら悾鐑藉Ω閿斿墽鐦堥梺鍛婂姂閸斿本瀵兼惔顫箚闁绘劦浜滈埀顒佺墵楠炴劙宕奸弴鐐茬€梺闈╁瘜閸樺ジ藟濮橆兘鏀介柣妯虹－椤ｆ煡鏌ｉ幘瀵告噰闁哄本鐩獮妯何旈埀顒勫箠鎼达絿绠旈柨鐔哄У閳锋垿鏌熼幆鏉啃撻柡渚€浜堕弻娑㈠Ω閵壯冪厽婵犵绱曢弫璇茬暦閻旂⒈鏁嶆慨姗€纭搁崬娲⒒娴ｈ櫣銆婇柛鎾寸箞婵＄敻鎮欑€靛摜褰鹃梺鍝勬川婵澹曟禒瀣厱閻忕偛澧介幊鍛亜閿斿ジ妾柕鍥у閺佸倻鎷犻懠顑挎婵＄偑鍊戦崹鍝勭暆閹间降鈧礁顫滈埀顒勫箖閵忋倖鎯為柣鐔跺嵆閻涘酣姊婚崒娆戭槮闁圭⒈鍋勭叅闁靛ň鏅涚粣妤呮煙閹规劖纭惧┑顕呭墴閺屽秷顧侀柛鎾寸懇閸╃偤骞嬮敂缁樻櫓闂佸搫鍊堕崐鎾舵閻㈠憡鈷戦柛娑橆煭閼拌法绱掗悩宕囧ⅹ闁伙絿鍏樻慨鈧柕鍫濆閺呮粓姊洪崜鎻掍簽闁哥喎娼￠獮蹇撁洪鍛嫼闂佸憡绋戦敃銉т焊閹殿喗鍠愰柡澶婄仢閺嗙偟绱掗崒姘毙㈤柍瑙勫灴瀹曞ジ濮€椤喚搴婇梻浣藉吹婵潙煤閿曚降浜归柛鎰靛枛濮规煡鏌ｉ幇顔煎妺闁绘挻娲熼弻鐔兼倻濡櫣鍘愰梺琛″亾闁煎鍊楃壕濂稿级閻愭潙顥嬮柣顓熺懅閳ь剝顫夊ú蹇涘礉瀹ュ洦宕叉繝闈涱儏缁€瀣亜閹扳晛鐏い鏃€鍨垮濠氬磼濞嗘帒鍘￠梺纭呮珪閹瑰洤鐣烽妷褉鍋撻敐搴℃灍闁稿鏅滈妵鍕疀閹捐泛顣虹紒鐐劤缂嶅﹪寮婚敓鐘茬倞闁靛鍎虫禒楣冩⒑缁嬫鍎忛柛濠傛健瀵鎮㈤悡搴ｎ吋濡炪倖姊婚埛鍫ュ汲椤撱垺鈷戠紓浣股戠亸顓犵磼缂佹﹫鑰跨€殿喛顕ч埥澶愬閻樻牓鍔戦弻鐔衡偓娑欘焽缁犳捇鏌＄€ｃ劌鈧洟婀侀梺缁樻尭妤犳悂寮抽敐澶嬬厵妞ゆ梻鐡斿▓鏃堟煃缂佹ɑ宕岀€规洖缍婇、娆撴偩鐏炶偐鏁栫紓鍌氬€搁崐椋庢閿熺姴绐楁俊銈呮噺閸嬶繝鏌嶉崫鍕櫣鏉╂繃绻涢幘鏉戠劰闁稿鎸鹃埀顒侇問閸犳骞愰幎鑺ユ櫜闁绘劒璀﹂弫濠囨煕閹炬せ鍋撴俊顐犲妼閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鐘荤嵁閹扮増鍊锋い鎺嶇瀵潡姊婚崒姘卞缂佸鎹囧鎶芥晝閸屾稓鍘介梺鍝勫暙濞诧箓顢旈悩鐢垫／闁告瑣鍎抽惌娆撴煛鐏炲墽銆掑ù鐙呯畵楠炴垿骞囬澶嬵棨闂傚倷绶氶埀顒傚仜閼活垱鏅剁€涙ǜ浜滈柕澶涢檮瀹曞本顨ラ悙鑼闁逞屽墾缂嶅棝宕伴弽顓熷珔闁绘柨鍚嬮悡蹇擃熆鐠鸿櫣澧曢柛鏂诲€濋弻銊モ槈濞嗘垶鍒涘┑顔硷攻濡炶棄鐣烽悜绛嬫晣闁绘劖婢橀ˉ姘舵⒒娴ｅ憡鍟為柟姝岊嚙閻ｆ繈骞栨担鍝ョ暫闂侀潧绻堥崐鏇㈢嵁閵忥紕绠鹃柟瀵稿仧閹冲懘鏌涘鈧粻鏍ь潖妤﹁￥浜归柟鐑樻惈缁辩敻姊虹紒妯洪嚋缂佺姵鍨块崺銉﹀緞鎼搭喗些闂備礁鐤囬～澶愬垂閸фぜ鈧礁鈻庨幘鏉戞異闂佸疇妗ㄧ拋鏌ュ矗濞差亝鈷掑ù锝呮啞閹牓鏌ｉ鐑嗘Ш缂佽京鍋炵粭鐔煎焵椤掑嫭鍋樻い鏂挎閻旂厧绀傞柣鎾虫捣閿涘繘姊绘担铏瑰笡闁搞劌鐖奸垾锕傚炊閵娧屾锤濡炪倕绻愰悧濠囧煕閹烘嚚褰掓晲閸涱喖鏆堥梺璇″灠閻楁捇寮婚敐澶樻晣闁绘垵妫欐闂備胶鎳撶粻宥夊垂瑜版帒鐓橀柟杈剧畱楠炪垺绻涢崱妯哄妞ゆ梹娲樼换婵嗏枔閸喗鐏嶉梺闈涙处閻╊垰鐣烽幋锕€绠婚柡鍌樺劜閺傗偓闂備焦鏋奸弲娑㈠疮椤栫偛纾归柟鎵閻撴稑霉閿濆浂鐒鹃柍褜鍓欏﹢杈╁垝濮樿埖鐒肩€广儱鎳愰、鍛存⒑缂佹ê濮夊褎顨婇幆鍫ｇ疀濞戞瑢鎷婚梺绋挎湰閼归箖鍩€椤掍焦鍊愮€规洘鍔欓幃婊堟嚍閵夈儮鍋撻崸妤佺叆闁哄洨鍋涢埀顒€鎽滅划濠氬冀椤撶喓鍘卞銈嗗姧缁插墽绮堥埀顒傜磼閻愵剙鍔ょ紓宥咃躬瀵鍨鹃幇浣告倯闁硅偐琛ラ埀顒€纾鎴︽⒒娴ｄ警鐒炬い鎴炲灩閹广垹鈹戠€ｎ亣鎽曢悗骞垮劚椤︻垱瀵奸悩缁樼厱闁哄洢鍔屾晶顔界箾閸滃啰绉慨濠冩そ閹稿﹥寰勬繝鍐╊啀闂備礁鎽滄慨鐢稿礉濡ゅ懎绠查柕蹇曞Л濡插牓鏌曡箛鏇炐ユい鎾存そ濮婅櫣绱掑Ο铏逛淮濠碘槅鍋呴惄顖氱暦濠靛鏁嶉柣鎰ˉ閹疯櫣绱撻崒娆戝妽閽冭鲸銇勯妷銉︻棡缂佺粯鐩畷顏堝礃椤忓懎浠瑰┑鐘灱椤煤閻旈鏆︽俊銈呮噺閳锋帡鎮楅棃娑欐喐闁伙絿鍋撴穱濠囨倷椤忓嫧鍋撻弽顓熷亱婵°倕鍟弸鍫⑩偓骞垮劚椤︻垳绮诲鑸电厱妞ゆ劗濮撮崝婊堟煟閹惧娲撮柡灞界Х椤т線鏌涢幘璺烘灈闁靛棔绀侀～婊堝焵椤掍焦鍙忛柍褜鍓熼弻宥夋煥椤栨矮澹曢梻浣哥秺椤ユ挾鍒掗婊勫床婵炴垶鐟︾紞鍥煕閹炬鍟悡鍌炴⒒娴ｄ警鏀版い鏇熺矌閹广垹鈹戠€ｎ剙绁﹂梺绯曞墲缁嬫垿鏌嬮崶顒佺厪濠㈣埖绋撻悾鍗灻归悩顐ｆ珔闁宠鍨块、娆戠驳鐎ｎ剙濮洪梻浣告啞椤棝宕熼褎閿ら梻浣筋潐椤旀牠宕伴幒妤€纾婚柟鎹愬煐閸犲棝鏌涢弴銊ュ妞わ负鍔庣槐鎾存媴缁涘娈梺绋匡工濞硷繝鐛崘顔肩畾鐟滃寮ㄦ禒瀣€甸柨婵嗙凹缁ㄨ姤銇勯敂鑺ョ凡妞ゎ亜鍟存俊鍫曞幢濡も偓椤洭姊虹粙鍖℃敾婵炲弶鐗犻、姘舵晲婢跺á鈺呮煏婢跺牆鐏柡鍌楀亾闂傚倷鑳剁划顖炴晝閳哄懎绐楅柡宥庡幗閸婂爼寮堕崼娑樺缂佺姵鍎抽…璺ㄦ崉娓氼垰鍓冲銈庡墮閵堟悂寮婚敐鍫Щ闂佹椿鍘奸崐鎼侊綖韫囨稒鎯為柛锔诲幘閿涙粌鈹戦埥鍡楃仴鐎规洜鏁诲畷锝夊幢濞戞瑢鎷洪梺鍛婄☉閿曘劍绔熷Ο姹囦簻闁瑰瓨绻嶅Σ鎼佹煟閿濆洤鍘撮柟顔炬櫕缁瑧鎹勯…鎴炐炲┑锛勫亼閸婃牕顫忔繝姘柧妞ゆ劧绠戦崒銊╂煙閸撗呭笡闁绘挾鍠栭弻锝夊箛椤掑娈堕梺宕囩帛閹瑰洭寮诲鍫闂佸憡鎸婚悷鈺佺暦閵忋倕鍐€闁靛ě鍛獎闂備礁鎼ú銊︽叏妞嬪骸顥氬ù鐘差儐閻撴洟鎮橀悙鎻掆挃闁瑰啿瀚槐鎺撴媴鐟欏嫮鍑″銈庝簻閸熶即鍩€椤掍胶鈯曟い顓炴喘楠炴宕橀鐣屽幍缂備焦绋戦鍛閻愮數纾奸弶鍫涘妽鐏忎即鏌熷畡鐗堝殗闁圭厧缍婇幃鐑藉箥椤曞懎浠圭紓鍌氬€搁崐宄懊归崶顒夋晪鐟滄棃骞冭楠炴﹢鎳￠妶鍛偊闂備礁鎲￠崝蹇涘疾濠靛鈧懘鎮滈懞銉モ偓鐢告煥濠靛棝顎楀ù婊嗗Г娣囧﹪顢曢姀鐘虫闂佸疇顫夐崹鍧楀箖濞嗘挸绾ч柟瀵稿С濡楁挻淇婇悙顏勨偓鎴﹀礉瀹€鍕疇婵せ鍋撻柣娑卞枛铻栭柛鎰剁到娴滈箖鏌ㄥ┑鍡涱€楅柡瀣枛閺岋綁骞樼捄鐑樼亪濡ょ姷鍋為悧鏇″絹濡炪倖宸婚崑鎾绘煟閹烘挻銇濋柡灞剧洴閹垺顦版惔锝庡晪闂備礁鎼張顒勬儎椤栫偛绠栭柍鍝勬噹缁犳稑霉閿濆懏璐￠柡澶庮潐娣囧﹪濡堕崶顬儵鏌涚€ｎ剙浠辩€规洖缍婂畷褰掝敊閻愵剚顔曢梻浣筋嚃閸ㄥ爼宕戞繝鍋斤絾銈ｉ崘鈹炬嫼闂佸憡绻傜€氼參鏁嶉弮鍌滅＜闁绘娅曞畷宀€鈧鍠栭…閿嬩繆閹间礁鐓涢柛灞剧煯缁ㄥ姊绘担鍛婂暈缂佽鍊婚埀顒佽壘閹虫ɑ鎱ㄩ埀顒勬煏韫囧鐏柨娑欑矒濮婃椽鏌呴悙鑼跺濠⒀冾嚟閳ь剝顫夊ú姗€鏁冮姀銈冣偓浣糕枎閹炬潙浠奸柣蹇曞仩濡嫮绮婚懡銈囩＝闁稿本鐟ㄩ崗宀勬煕鐎ｎ偅灏い顓炵仢铻ｉ柧蹇氼潐濞堟儳顪冮妶鍡楃瑐闁绘帪绠戦埢宥夋偐閻愭垝绨婚梺鍝勭Р閸斿酣濡撮幒鏃傜＜闁绘宕甸悾娲煛鐏炲墽娲存い銏℃礋婵″爼宕ㄩ閿亾婵犳碍鈷戦柛娑橈攻閻撶喖鏌涙繝鍐疄鐎殿喛顕ч濂稿炊閵娿儲鐎梻浣告啞濞诧箓宕戦崱妯侯嚤鐎光偓閸曨兘鎷洪柣鐘叉礌閳ь剝娅曢悘鈧梻浣告惈閹冲繒鎹㈤崼銉у祦闊洦绋掗崑鎰€掑鐓庣仭娴滄稒绻濋悽闈涗沪婵炲吋鐟╁畷銉р偓锝庡枛缁€澶嬬箾閸℃绂嬫繛鍏肩墬缁绘稑顔忛鑽ょ泿婵炵鍋愭繛鈧柡灞炬礃瀵板嫰宕煎┑鍡楊棟闂備焦瀵х换鍌毭洪悩璇茬；闁规崘顕х粈鍌氼熆鐠虹尨姊楀瑙勬礈缁辨捇宕掑▎鎴М濡炪倖鍨甸悧鍡涘煝閺冨牆鍗抽柕蹇曞У鏉堝牓姊洪幐搴㈢闁稿﹤缍婇幃陇绠涢幙鍐數闁荤姴娲犻埀顒€纾禒姘舵⒑缁嬫鍎愰柟鐟版喘瀵鈽夊锝呬壕闁挎繂楠告禍婵堚偓瑙勬礀閻倿寮婚埄鍐╁闁荤喐婢橀～宥夋⒑鐠団€崇仭婵☆偄鍟村畷娲礋椤栨氨顦ㄥ銈呯箰閸燁垶宕板鑸碘拻闁稿本鑹鹃埀顒傚厴閹虫宕滄担绋跨亰濡炪倖鐗滈崑娑氱不娴煎瓨鍋ｉ柛銉憾濮婂潡鏌涘┑鍡楃弸闁绘梻鍘х粈鍌炴煟閹炬娊顎楃紒銊ｅ劜缁绘繈鎮介棃娑楁勃闂佸壊鐓堥崹璺虹暦瑜版帒鎹舵い鎾跺С缁楀姊洪幐搴ｇ畵婵☆偅绋撳褔鍩€椤掑嫭鈷掗柛灞炬皑婢ф稓绱掔€ｎ偄娴挊鐔兼煥閻斿搫校闁绘挻娲熼弻宥夊传閸曨偅娈繛瀵稿У缁捇骞楅崼鏇炲唨妞ゆ挾鍠撻崢钘夆攽椤斿浠滈柛瀣尰缁绘稒鎷呴崘鎻掝伀妞も晝鍏橀弻銊╁即閻愭祴鍋撹ぐ鎺撳亗闁绘棃鏅茬换鍡涙煏閸繂顏柛蹇撶焸閺岋綁顢橀悢閿嬭癁闂佸搫鏈惄顖炲春閻愬搫绠氱憸灞剧珶閺囩偐鏀介柨娑樺娴滃ジ鏌涙繝鍐⒈闁轰緡鍠楃换婵嬪礋椤掑浠洪梻浣芥硶閸犳挻鎱ㄩ幘顔藉仾妞ゆ洍鍋撻柣鎿冨亰瀹曞爼濡歌婵洭姊虹紒妯诲鞍婵炶尙鍠栧濠氭晲閸涘倻鍠撻幏鐘诲箵閹烘繃娴囧┑鐘垫暩閸嬫盯鎮ф繝鍕灊闁规崘顕ч拑鐔兼煛閸ャ儱鐏╂鐐灪娣囧﹪濡堕崒姘闂備礁鎼Λ娑㈠磻閻旂儤顫曢柟鐑樻⒒绾惧吋淇婇婵嗕汗闁汇倕瀚伴幃妤冩喆閸曨剛顦ㄩ柣銏╁灙閸撴繃绌辨繝鍥ч唶闁哄洨鍋涢懓鍨攽閻愬弶顥為柛銊у枛瀵悂宕卞☉娆屾嫽闂佺鏈懝楣冨焵椤掑倸鍘撮柟顔惧仱閺佸啴宕掑鎲嬬吹闁诲氦顫夊ú鏍洪敃鈧悾鐑藉蓟閵夛妇鍘甸梻渚囧弿缁犳垶鏅舵ィ鍐╃厾闁哄瀵ч崑銉︽叏婵犲啯銇濇い銏☆殜閸┾偓妞ゆ帒鍊婚惌鎾绘煟閵忋埄鐒剧痪鐐娣囧﹪濡堕崟顔煎帯缂備胶濞€缁犳牠寮诲☉銏犵労闁稿繒濯禍婵嬪箞閵婏箑绶炵€光偓閳ь剛澹曟總鍛婄厽婵☆垰鐏濋崥褰掓煟閿濆棙銇濋柡宀嬬磿娴狅箓宕滆閸掓盯姊虹化鏇熸珔閻庢碍婢橀悾宄拔旈崨顔间杭闂侀€炲苯澧紒鍌氱Ч椤㈡棃宕熼鐔割啎婵犵數濞€濞佳囶敄閸涱厽绾繝鐢靛О閸ㄧ厧鈻斿☉銏╂晞闁搞儺鍓欓崒銊╂⒑椤掆偓缁夌敻鍩涢幋锔藉仭婵炲棗绻愰鈺呮煕閺傝鈧妲愰幘鎰佸悑闁告粌鍟抽崥顐︽倵鐟欏嫭澶勯柛瀣躬楠炴牞銇愰幒鎴炲祶濡炪倖鎸炬刊瀵告閼碱剛纾介柛灞捐壘閳ь剛鍏橀幃鐐烘晝閸屾せ鍋撻敃鍌氱倞妞ゎ兘鍓濆浠嬬嵁濮椻偓椤㈡瑩鎮剧仦钘夌婵犵數鍋犻幓顏嗗緤閸ф绠犻柟鎯х摠閸欏繒鈧箍鍎卞ú鐘诲磻閹捐埖鍠嗛柛鏇ㄥ墰閿涙﹢姊洪崨濠冣拹闁搞劌娼℃俊瀛樻媴缁洘鐎婚梺鐟扮摠缁诲啴鎮楅幎鑺ョ厸濠㈣泛锕︽晶鎴︽煕閹捐鎲鹃柟顔哄灮娴滃憡鎷呯憴鍕緫闂傚倷鑳剁划顖濇懌濡炪倖姊归悧鐘差嚕閸愬樊鐓ラ柛娑卞灣閿涙粓鏌℃径濠勫闁告柨绉剁划鍫⑩偓锝庡厴閸嬫挾鎲撮崟顒傤槰闂佹悶鍔嬬徊濠氭倶閹烘鈷戠紓浣股戠亸顓炍旈悩铏€愰柟顔缴戠换婵嬪磼濡や焦鏉搁梻浣虹帛閸旀洖顕ｉ崼鏇€澶愭倷閻戞鍘甸梺鍛婄☉閿曘儵宕愰幇顔瑰亾濞堝灝鏋涢柟璇х磿缁參鎮㈤悡搴ｅ姦濡炪倖甯掔€氼剟鎷戦悢鍏肩厽闁哄啫鍊哥敮鍓佺磼閻橆喖鍔滈柕鍥у瀵噣宕掑Δ浣哥彵闂備礁鎼Λ顓㈠矗閸愵煈娼栭柧蹇撴贡閻瑩鏌涢弻顓滃€曢幆鍫熶繆閻愵亜鈧垿宕曢弻銉ョ闁搞儺鍓欑粻姘舵煃瑜滈崜姘跺Φ閸曨喚鐤€闁规崘娉涢·鈧梻浣侯焾椤戝懘顢栨径鎰摕婵炴垯鍨归悡娑樷攽閻樻彃鈧兘鎳滈鍛閻庢稒顭囬惌瀣磼鐠囨彃顏柛鎺撳笧閳ь剨缍嗘禍鍫曞触鐎ｎ喗鐓曢柍鈺佸暙婵洤霉濠婂嫮绠炴慨濠冩そ瀹曘劍绻濋崒姘兼綂闂備礁鎼幊蹇曟崲閸繄鏆﹂柨婵嗩槸楠炪垺淇婇悙鐢靛笡闁哄倵鍋撻梻鍌欒兌缁垶鈥﹂崶鈺佸灊妞ゆ牗鍩冨Σ鍫㈡喐鎼淬垻鈹嶅┑鐘叉祩閺佸啴鏌ㄥ┑鍡樺窛闁汇倕瀚—鍐Χ閸愩劎浠鹃梺鐟版啞閻℃洟鎮橀崘顔解拺闂侇偆鍋涢懟顖涙櫠閹绢喗鐓冮柕澶樺灣閻ｇ敻鏌熼搹顐疁妞ゃ垺鐩弫鎰板幢閳规儳浜鹃柛銉墯閳锋帒霉閿濆牜娼愰柛瀣█閺屾盯寮捄銊у姱闂佽鍠撻崕鐢稿箖閳╁啯鍎熸い鏂垮悑椤撳潡姊洪懡銈呅㈡繛璇у缁﹪寮堕幊绛圭秮瀹曞ジ濡烽敂鎯у妇闂傚鍋勫ú銈堝闂佺顑嗛幑鍥х暦濡ゅ懎宸濇い鏃傚亾缂嶅酣姊婚崒姘偓鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀极閿熺姴鐐婃い鎺嶇閻у嫭绻濋姀鐘插辅闁哄懏绮撻幆鍕敍閻愯尙鐣哄┑鐐叉濞存岸宕崨顔轰簻闁哄啫娲﹂ˉ澶愭煟閿旂晫鐭掓慨濠勭帛缁楃喖鍩€椤掆偓椤洩顦归柟顔ㄥ洤骞㈡慨妤€妫欓鏃傜磽娴ｅ壊鍎愭い鎴炵懇瀹曠敻寮撮姀锛勫帾婵犵數濮寸换鎰般€呴鍌滅＜闁绘ê鍟块崝銈嗐亜椤撯剝纭堕柟鐟板缁楃喖顢涘顒€顥庣紓鍌氬€风拋鏌ュ磻閹剧粯鍊甸柨婵嗛娴滆姤绻涢崼婊呯煓闁哄矉缍侀獮鍥敇閻旇櫣鈻忛梻浣筋嚙缁绘劙顢氶銏犵劦妞ゆ帒鍠氬鎰箾閸欏鐭掔€规洑鍗冲浠嬵敇濠ф儳浜惧ù锝囩《濡插牊淇婇鐐存暠妞ゎ偄绉撮埞鎴﹀煡閸℃浠╁┑鐘亾闂侇剙绉甸崕澶愭煕濞戞鎽犻柍閿嬪浮閺屾稓浠﹂崜褎鍣銈忚缁犳捇寮婚悢鍝勬瀳闁告鍋橀崰濠囨煢濡崵绠撻棁澶愭煕韫囨挸鎮戠紓宥嗗灴閺屾盯濡搁妷銉㈠亾婵犳艾鐒垫い鎺戝枤濞兼劖绻涢崣澶屽ⅹ閻撱倝鏌ㄩ弴鐐蹭喊缂傚秵鐗犻弻锟犲炊閵夈儳浠鹃梺缁樻尪閸庤尙鎹㈠┑瀣棃婵炴垶鐟辩槐鐐测攽閳╁啫绲荤紓宥咃躬瀵顓兼径瀣弳闁诲函缍嗘禍鐐烘偡閵娾晜鈷掗柛銉戝本鈻堥梺鍝勮閸斿矂鍩為幋锕€骞㈡俊顖滃劋椤忥繝姊绘担鍛婃喐闁哥姵鎹囧畷鎴﹀Χ婢跺﹨鎽曞┑鐐村灟閸ㄦ椽宕戦崟顖涚厱婵犻潧妫楅褎淇婇崣澶婂婵﹥妞藉畷顐﹀礋椤掍焦瀚抽梻浣哄劦閺呪晠宕规导鎼晪闁挎繂顦介弫鍡涙煕鐏炲墽鈽夌痪缁㈠灦濮婃椽妫冨ù銈嗙〒娴狅箓鎳為妷锔惧剑闂傚倸鍊峰ù鍥敋瑜嶉～婵嬫晝閸岋妇绋忔繝銏ｆ硾閳洟宕崟鍨缓闂侀€炲苯澧柣锝囨焿閵囨劙骞掗幋锔芥殔婵犲痉鏉库偓鏇㈠疮椤愩倗鐭堥柨鏇楀亾闁宠鍨块、娆愭叏閹邦亞鎹曢梻浣侯焾椤戝棝骞愭ィ鍐ㄧ劦妞ゆ帊绶￠崯蹇涙煕閿濆骸娅嶇€规洘绮撻幃銏ゆ⒐閹邦喚鐣鹃梻浣虹帛閸ㄥ吋鎱ㄩ妶澶婄柧婵犲﹤鐗婇悡鐘绘煙椤撶喎绗掗柛鏃€绮庣槐?
            });
        }
    });

    function buildAiWorkCard(type = 'thinking') {
        const variants = {
            thinking: {
                title: 'Droi is thinking',
                subtitle: 'Understanding your creative intent...',
                steps: ['Identifying game type', 'Extracting world and gameplay', 'Checking template coverage']
            },
            research: {
                title: 'Droi is researching directions',
                subtitle: 'Finding directions from your inspiration profile...',
                steps: ['Reading your mood profile', 'Matching play rhythm', 'Drafting 3 creative directions']
            },
            shaping: {
                title: 'Droi is shaping your GameSpec',
                subtitle: 'Turning this direction into a buildable game spec...',
                steps: ['Completing core gameplay', 'Checking template fit', 'Preparing generation parameters']
            },
            working: {
                title: 'Droi is working',
                subtitle: 'Building your mini-game preview...',
                steps: ['Generating game assets', 'Assembling gameplay logic', 'Preparing web preview']
            },
            bulletPlan: {
                title: bhText('researchTitle'),
                subtitle: bhText('researchSubtitle'),
                steps: ['Mapping shooter intent', 'Designing boss phases', 'Tuning waves and progression']
            }
        };
        const data = variants[type] || variants.thinking;
        return `
            <div class="ai-work-card" data-work-type="${escapeHtml(type)}">
                <div class="ai-work-head">
                    <span class="ai-work-orb"></span>
                    <span>
                        <strong>${escapeHtml(data.title)}</strong>
                        <small>${escapeHtml(data.subtitle)}</small>
                    </span>
                </div>
                <div class="ai-work-steps">
                    ${data.steps.map((step, index) => `
                        <div class="ai-work-step" style="--step-index:${index};">
                            <span></span>${escapeHtml(step)}
                        </div>
                    `).join('')}
                </div>
                <div class="ai-work-shimmer"></div>
            </div>
        `;
    }

    function scrollChatMessageIntoReadableView(message, mode = 'auto') {
        if (!chatHistory || !message) return;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const historyRect = chatHistory.getBoundingClientRect();
                const messageRect = message.getBoundingClientRect();
                const hasGeneratedSurface = Boolean(message.querySelector(
                    '.inspire-recommendation-list, .generation-result, .ai-work-card, .game-plan-summary, .summary-grid'
                ));
                const shouldAnchorStart = mode === 'start' ||
                    hasGeneratedSurface ||
                    messageRect.height > chatHistory.clientHeight * 0.68;
                if (shouldAnchorStart) {
                    const target = chatHistory.scrollTop + (messageRect.top - historyRect.top) - 18;
                    const maxScroll = Math.max(0, chatHistory.scrollHeight - chatHistory.clientHeight);
                    chatHistory.scrollTop = Math.max(0, Math.min(target, maxScroll));
                } else {
                    chatHistory.scrollTop = chatHistory.scrollHeight;
                }
            });
        });
    }

    function addBotMessage(text, onRendered, options = {}) {
        cleanupChatModelBadges();
        const startedAt = Date.now();
        const isPending = Boolean(options.pending);
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message bot';
        msgDiv.innerHTML = `
            <div class="chat-content-wrap">
                <div class="bot-worked-time">${escapeHtml(t('worked', { time: '0m 0s' }))}</div>
                <div class="chat-bubble ${isPending ? 'ai-work-bubble' : 'typing-indicator'}">
                    ${isPending ? buildAiWorkCard(options.workType || 'thinking') : '<span></span><span></span><span></span>'}
                </div>
            </div>
        `;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        const workedTime = msgDiv.querySelector('.bot-worked-time');
        const updateWorkedTime = () => {
            if (workedTime) workedTime.textContent = t('worked', { time: formatWorkDuration(Date.now() - startedAt) });
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
                recordChatTurn('assistant', finalText, { pending: isPending });
                clearInterval(workInterval);
                botWorkIntervals = botWorkIntervals.filter(interval => interval !== workInterval);
                updateWorkedTime();
                if (typeof onRendered === 'function') {
                    onRendered(msgDiv);
                }
                scrollChatMessageIntoReadableView(msgDiv, options.scrollMode || 'auto');
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

        // 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柛娑橈攻閸欏繘鏌ｉ幋锝嗩棄闁哄绶氶弻娑樷槈濮楀牊鏁鹃梺鍛婄懃缁绘﹢寮婚敐澶婄闁挎繂妫Λ鍕⒑閸濆嫷鍎庣紒鑸靛哺瀵鈽夊Ο閿嬵潔濠殿喗顨呴悧濠囧极妤ｅ啯鈷戦柛娑橈功閹冲啰绱掔紒姗堣€跨€殿喖顭烽弫鎰緞婵犲嫷鍚呮繝鐢靛Т閻忔岸宕濋弽顐ょ婵°倕鎳忛埛鎴︽⒑椤愩倕浠滈柤娲诲灡閺呭爼顢氶埀顒勫蓟濞戞瑧绡€闁稿本绋戞禒鏉懳旈悩闈涗沪闁告梹鐗滈幑銏犫攽鐎ｎ亞顦ㄥ銈呯箰濡顨ラ崟顖涒拻濞达絿顭堥弳閬嶆煙绾板崬浜版い銏＄墵瀹曞爼鍩￠崘顏嗗帬婵＄偑鍊栧Λ鍐极椤曗偓瀹曟垿骞橀懜闈涙瀭闂佸憡娲﹂崜娑㈡晬濮椻偓濮婃椽宕ㄦ繝鍐ｆ嫻闂佹悶鍔庨弫濠氥€佸鑸垫櫜濠㈣泛锕崬鍫曟⒑閸濆嫭宸濋柛瀣枛椤㈡﹢宕崟銊︽杸闂佺粯顭囩划顖氣槈瑜旈弻锝呂旈埀顒勫疮閺夋垹鏆﹂柟杈剧畱缁犵粯绻涢懠顒傚笡闁哄拑缍佸铏圭磼濡櫣浠村┑鈽嗗亝閻熝囧焵椤掑嫭娑ч柣顓炲€搁～蹇撁洪鍜佹濠电偞鍨堕懝楣冦€傚ú顏呪拺缁绢厼鎳忛悵顏堟煕閺冣偓椤ㄥ牓宕氶幒鏃傜＜婵☆垯璀﹂崵銈夋煟鎼淬垻鈯曟い顓炴喘瀹曘垽鎸婃径鍡樻杸闁圭儤濞婂畷鎰板箛閺夎法锛涢梺鐟板⒔缁绘繄鎹㈤崱妯镐簻闁规澘澧庨幃濂告煏閸℃ê娴柡灞剧洴楠炴帡骞橀搹顐ョ檨闁诲氦顫夊ú鏍Χ閸涘﹣绻嗛柣鎴ｆ鍞梺瀹犳〃閻掞箓寮抽鍫熲拻闁稿本鐟ㄩ崗宀€绱掗鍛仩閾荤偛霉閿濆洨銆婇柡瀣Ч閺屻劌鈹戦崱鈺傂ч梺绋块閿曨亪寮诲☉銏╂晝闁绘ɑ褰冩慨鏇㈡⒑閹惰姤鏁遍悽顖ょ節瀵鈽夊顐ｅ媰闂佺粯鍔﹂崜娑樷枔閵堝棛绡€闁冲皝鍋撻柛鏇ㄥ幑閳ь剚甯炵槐鎺撴綇閵娿儳顑傞梺閫炲苯澧剧紓宥呮瀹曟垿宕ㄩ娆戝墾婵炲鍘ч悺銊╂偂濞戙垺鐓曟繛鎴濆船楠炴﹢鏌涢埡瀣ɑ妞ゃ劊鍎甸幃娆撳矗婢跺﹥鐏庨梻浣筋嚃閸燁偊宕惰閸炲爼姊洪棃娑氱濠殿喖顕划濠氭倷閻戞ǚ鎷绘繛杈剧悼閻℃棃宕靛▎鎾寸厱闁瑰濮靛▍鏇犵磼鏉堚晛浠辩€规洖宕埥澶娢熺涵椋庡耿闂傚倷绀侀幉鈩冪瑹濡ゅ懎鍨傛い鏍仦閸婂灝鈹戦悩鎻掓殧濞存粍绮撻弻鐔煎箲閹邦厾銆愰梺鍝勵儏閸婃悂婀佸┑鐘诧工鐎氼噣鎯岀€ｎ喗鐓忛柛銉戝喚浼冨Δ鐘靛仜濞差厼鐣峰鍕闁荤喖顣︽潻妯肩磽閸屾艾鈧兘鎳楅懜鍨弿闁绘垼妫勭壕濠氭煟閹邦剚鎯堝鍛存⒑閸涘﹥澶勯柛銊ゅ嵆閿濈偤宕ㄧ€涙鍘撻梺鑺ッˇ浼村吹閳ь剟姊洪柅鐐茶嫰婢ь喗绻涚涵椋庣瘈鐎殿喖顭烽幃銏㈠枈鏉堛劍娅撻梺鑽ゅ枑閻熴儳鈧凹鍙冮幃闈涱潩閼搁潧鈧敻鎮峰▎蹇擃仾缂佲偓閸愵喗鐓ラ柡鍥悘鈺呮煟閿濆洤鍘撮柡浣瑰姍瀹曞崬螖閸愵亞宓侀梻浣筋嚙缁绘帡宕戝Ο鐓庡灊婵炲棙鎸搁惌妤呮煃閳轰礁鏆熺紒鈾€鍋撻梻浣圭湽閸ㄨ棄顭囪閻☆參姊绘担鍦菇闁稿酣浜惰棟闂傚牊渚楅崵鏇㈡煠缁嬭法浠涢柛搴ｅ枛閺岀喖骞嗚鐢姴顭跨憴鍕闁宠鍨堕獮濠囨煕婵犲啯宕岄柟顔惧仱閺佸啴宕掑杈╁幀闂傚鍋勫ú锔剧矙閹烘鍋傞柣鏂垮悑閻撴瑩寮堕崼婵嗏挃缂佸绮妵鍕Ψ閵夘喗楔闂佹眹鍎烘禍顏堢嵁閸℃凹妾ㄩ梺缁樻尭閵堟悂寮婚垾宕囨殕闁逞屽墴瀹曚即寮介鐐电暫閻熸粍鏌ㄩ悾閿嬬附閸涘﹤浜滈梺鍛婄箓鐎氼剙鈻撻妷褏纾介柛灞剧懆閸忓矂鏌涚€ｎ偅宕岀€规洘娲熼獮搴ｆ喆閿濆倸浜鹃柨鏇炲€归崐濠氭煢濡警妲奸柟鑺ユ礋濮婅櫣绱掑Ο鑽ゅ弳闂佸憡鑹鹃澶婄暦閹扮増鐓ラ悗锝冨妺缁ㄥ姊洪悷鐗堟儓缂佸鍏樺畷妤冧沪閻偄缍婇幃鈩冩償閵忕姵鐏庢繝娈垮枛閿曘劌鈻嶉敐澶婄畺濞村吋娼欓悘鎶芥煕韫囨挻鍣规い銉︾缁绘繈鎮介棃娑楃捕濡炪倖娲﹂崢浠嬪箞閵娾晛绠绘い鏇炴噺閺呯偤姊虹化鏇炲⒉缂佸甯″畷鎴﹀磼閻愬鍘介梺鍝勫暙閻楀﹤鈻嶅鍛＜閻犲洤寮堕ˉ鐐烘煏閸パ冾伃鐎殿喕绮欐俊姝岊槾闁伙絽鐏氱换娑氣偓娑欘焽閻﹦绱撳鍜冭含妤犵偛鍟粋鎺斺偓锝呯仛閺咁剙鈹戦悙鏉戠仸闁糕晛鍟幈銊╁炊閳哄啰锛濇繛杈剧秬濞咃絿鏁☉銏＄厽闁冲搫锕ら悘锕傛煟濞戝崬鏋熺紒缁樼箞瀹曟帒顭ㄩ崟顒傛澓闂傚倷鑳剁划顖炪€冮崨瀛樺亱闁糕剝铔嬮崶顒€鐓涢柛娑卞枓閹锋椽姊虹涵鍛汗闁稿鐩崺鈧い鎺嶇劍缁€瀣煙椤栨凹妲圭紒铏规櫕缁瑧鎹勯妸銉バ曞┑锛勫亼閸婃牕顔忔繝姘；闁瑰墽绮悡鏇熶繆椤栨繂鍚归柣顓熷笧閳ь剝顫夊ú姗€宕归崸妤冨祦婵☆垵鍋愮壕鍏间繆椤栨粌甯舵鐐茬墦濮婄粯鎷呴崨濠冨創濠电偛鐪伴崹钘夌暦濠靛牅娌柣鎰靛墯閻濋攱绻涚€电甯堕柣掳鍔戦幃锟犲即閻旂寮垮┑锛勫仩椤曆勭閻愵剛绠鹃悗娑欘焽閻﹪鏌ｉ弽顐㈠付妞ゆ洩绲剧换婵嗩潩椤撶喐鐝抽梻浣虹《閸撴繈鏁嬮梺鍛婃煥閹冲酣鈥旈崘顔嘉ч柛鈩冪懃椤呯磽娓氬洤鏋涢悗娑掓櫊閹勬償閵婏腹鎷婚梺绋挎湰閻熴劑宕楃仦淇变簻妞ゆ挾鍋熸晶锔姐亜閵忥紕澧电€规洏鍔戝鍫曞箣閻樺灚鐎梻浣烘嚀閸氬鎮鹃鍫濈鐎广儱顦壕濠氭煃閸濆嫬鏆婇柛瀣崌閹兘寮跺▎鍙ョ棯濠电姰鍨婚幊鎾澄涘┑鍡╁殨闁规儼妫勯獮銏＄箾閹寸偟鎳呴柛妯绘崌閹嘲顭ㄩ崟顓犵厜閻庤娲樼划鎾诲箖閵忋倖鍋傞幖娣灪琚ｉ梻鍌欑窔閳ь剛鍋涢懟顖涙櫠椤栫偞鐓忛柛銉戝喚浼冨Δ鐘靛仦鐢繝鐛€ｎ亖鏀介柛銉㈡櫃婢规洖鈹戦悩鍨毄闁稿鐩畷銉р偓锝庡枛缁€澶愭煛瀹ュ骸浜濈€规洖寮剁换娑㈠箣濞嗗繒浠奸梺娲诲幗椤ㄥ懘鈥﹂崸妤佸殝闁汇垺顔栭悘閬嶆⒑闁偛鑻晶顔界箾绾绡€鐎殿喖顭烽崺鍕礃閳轰緡鈧挾绱撴担鍓插剱閻庣瑳鍐ｆ灁缂備焦顭囩弧鈧┑鐐茬墕閻忔繈寮搁幘缁樼厱閻庯綆鍋呭畷灞炬叏婵犲啯銇濋柟顔界懇閹稿﹥寰勬繝鍌傛捇姊虹拠鑼缂佺粯鍨块幃鐤槾闁告帗甯為幏鐘差啅椤旇棄鍏婇梻浣哄帶閹芥粓銆傛禒瀣婵炲樊浜濋崑鈩冪節婵犲倹鍣规い锝呫偢閹粙顢涘☉杈ㄧ杹闂佽桨绀佺粔褰掑箖閵忋倕绀傞柤娴嬫櫅楠炴姊绘担渚敯婵炲拑缍佸畷鎴︽偄閸忕厧浠奸梺姹囧灮椤ｄ粙宕戦幘鏂ユ灁闁割煈鍠楅悘宥夋偡濠婂嫭绶查柛鐔告尦瀹曟椽鎮欓崫鍕吅闂佺粯锕╅崑鍕妤ｅ啯鐓ユ繝闈涙椤庢霉濠婂懎浠遍柡灞剧☉铻ｇ紓浣姑壕鎶芥⒑鐠団€虫灈闁搞垺鐓￠垾锕傚Ω閳轰胶顦板銈嗘尵婵兘宕㈠鍫熺厽閹兼番鍊ゅ鎰箾閸欏鐒介柛鎺撳浮楠炴鎷犻懠顒傛毇闂備線娼х换鍫ュ垂閼姐倗涓嶉柡鍐ㄧ墛閸嬬姵绻涢幋鐐插潑闁稿鎹囧畷妤呭川椤撗勵棥濠电姷鏁搁崑鐐哄箰婵犳艾鏄ラ柛鎰靛枛绾惧鏌熼幆褏浜柛瀣尭閳绘捇宕归鐣屽蒋闂備線娼荤紞鍥╁緤娴犲鍋╅梺鍨儑闂勫嫰鏌涢幘鍐茬骇闁哄懏绻堝娲箰鎼达絿鐣靛┑鈽嗗亝閻熲晠骞冮悽鍓叉晝闁挎棁袙閹峰姊虹粙鎸庢拱闁荤喆鍔戝畷妤€鐣濋埀顒傛閹烘鏁嬮柛娑卞幘娴犳悂鎮楃憴鍕缂佽鍊介悘鍐⒑閸涘﹤濮€闁哄懏绋掔粋鎺楀箳濡や讲鎷洪梻鍌氱墛娓氭危閹绢喗鐓涢柛娑卞枤閵嗘帞绱掗纰辩吋妞ゃ垺绋戦埥澶婎潩妲屾牕鏅梺璇叉捣閹虫挻绔熸繝鍥х獥闁哄洨濮炬慨鍐测攽閸屾碍鍟為柣鎾冲暣濮婃椽宕归鍛壈闂佽绻戦幐鎶藉蓟閿涘嫪娌悹鍥ㄧゴ閸嬫捇寮介鐐电杽闂侀潧艌閺呮稓绮诲☉娆嶄簻闁硅揪绲鹃ˉ澶娒瑰鍫㈢暫闁哄矉绻濆畷鍫曞Ψ閵壯傛偅闂備礁鎲￠崹瑙勭箾閳ь剟鏌″畝鈧崰鎾诲焵椤掍胶鈯曟い顓炴川缁濡烽埡鍌滃幗闂佸搫鍊圭€笛囁夐姀銈嗙厸鐎光偓鐎ｎ剛袦闂佽鍠撻崹钘夌暦椤愶箑绀嬮柛顭戝亝閻︽柨鈹戦敍鍕杭闁稿﹥鍨垮畷鏇㈠箮閽樺锛涢梺缁樻⒒閸庛倝锝為弴銏＄厵闁绘垶锕╁▓鏃傜棯閹冩倯缂佺粯鐩獮瀣倻閸℃瑥濮洪梻浣藉吹閸犲棝宕濋幋婵愭綎闁惧繐鍘滈崑鎾诲捶椤撶倫锝嗐亜閵夈儺妲归柕鍥у閺佸啴鍩€椤掑嫭鍊舵慨妯挎硾缁犵偤鏌曟繛鐐珔闁绘帒鐏氶妵鍕箳閹存繍浠鹃梺缁樻尪閸庤尙鎹㈠☉銏犵闁诲繑妞挎禍顏堛€侀弮鍫濈厸闁稿被鍊栭鏃堟⒑缂佹ê濮岄悘蹇旂懄閺呫儲绻濆▓鍨灈闁挎洩濡囬崚鎺楊敍閻愯尙顔嗛梺鍛婄⊕濞兼瑥顔忓┑鍡忔斀闁绘ɑ褰冮埀顒傛嚀閳绘挸螣閼测晝锛濋梺绋挎湰閻熝囁囬敂濮愪簻闁瑰瓨绻冮ˉ銏⑩偓瑙勬礀缂嶅﹤鐣风粙璇炬棃鍩€椤掑嫬鍑犲〒姘ｅ亾闁哄本鐩獮鍥濞戞瑧浜梺鍝ュ剱閸ㄨ泛顫忛搹鍏夊亾閸︻厼校闁靛棗鍟撮弻銈夊礃閼碱剙鐓熼梺杞扮缁夋挳鍩㈡惔銊ョ缂侇喛顫夌€氬ジ姊洪懡銈呮瀾闁荤喆鍎抽埀顒佸嚬閸撶喕妫㈤柣搴秵娴滃爼鎮㈤崱娆愬枑閹兼番鍔婇埀顒€鍟换婵嬪炊瑜忛悾娲⒑閻愯棄鍔滈柡瀣偢瀵憡鎯旈妸锔惧幍闂侀€涚祷濞呮洖鈻嶉崘顏嗙＜闁靛鍎洪悡鍏兼叏婵犲啯銇濈€规洦鍋婂畷鐔碱敆閳ь剟藝閳轰緡娓婚柕鍫濆暙婵″ジ鏌熼崘鑼缂侇喖顑呴鍏煎緞婵犲嫷妲堕柣鐔哥矊缁绘帗绔熼弴鐔侯浄閻庯綆鍋嗛崢閬嶆煟韫囨洖浠︾€规洘蓱缁旂喎顫滈埀顒勫蓟瀹ュ牜妾ㄩ梺鍛婃尰閻╊垶鐛繝鍥х缂備焦锚娴犵厧鈹戦悩缁樻锭婵☆偒鍘奸…鍥ㄥ鐎涙ê鈧爼鏌ｉ幇顏嗙シ婵℃儳鎲℃穱濠囶敃閻樻彃顫囧┑顔硷工椤嘲鐣烽幒鎴旀瀻闁规惌鍘借ⅵ闂傚倷鑳堕、濠囶敋濠婂懏宕叉繝闈涱儏缁犳牠鏌ｉ幋锝嗩棄閸烆垶姊洪崘宸殐闁告劏鏅涢弸鐘差渻閵堝啫鐏柨鏇樺灲楠炲啴濮€閿涘嫮鎳濆銈嗙墬閻╊垶寮鍐ｆ斀闁绘ê鐏氶弳鈺佲攽椤旇姤灏﹂柡浣稿暣婵¤埖寰勭€ｎ亙缃曞┑鐘垫暩婵潙煤閿曞倸纾婚柛灞剧〒缁犻箖鏌熺€涙鎳冮柣蹇ｄ邯閺岋綁骞樼€涙顦伴梺鍝勬湰濞叉ê顕ラ崟顖氶唶婵犻潧鐗呴惀顏呯節閻㈤潧浠滈柟鍐查叄楠炲﹤顫滈埀顒€顕ｆ繝姘櫖闁告洏鍔屾禍楣冩煥濠靛棝顎楀ù婊勭箖閵囧嫰濡烽妷褍鈪甸梺鍝勫閳ь剙纾弳鍡涙煃瑜滈崜鐔风暦娴兼潙鍐€鐟滃繘寮抽敂鑺ュ弿婵＄偠顕ф禍楣冩倵鐟欏嫭绌跨紒鍙夊劤椤曘儵宕熼鍌滅槇闁硅偐琛ラ幊锝夋偄鐏忎焦鏂€闂佹寧绋戠€氼剚绂嶆總鍛婄厱濠电姴鍟悘瀵糕偓瑙勬礃缁诲啰鎹㈠┑瀣倞鐟滃繘鏁嶉悢鍏尖拺婵懓娲ら悘顔姐亜椤撶偟澧㈢紒顔碱煼瀵粙濡歌椤旀洟姊虹化鏇炲⒉閽冮亶鎮樿箛锝呭籍闁哄矉缍侀、姗€鎮ゆ担鍦殽婵＄偑鍊ら崢鐓庮焽閿熺姴绠犳繝濠傜墛閸庢梹銇勮箛鎾村櫣闁诲繑鎸抽弻鈩冩媴閸濄儛褏鈧娲栧畷顒冪亽闂侀潻瀵岄崢楣冩偩妤ｅ啯鈷掑〒姘ｅ亾婵炰匠鍥ㄥ亱闁糕剝顦哄ú顏勎ч柛娑卞枟閻﹀酣姊婚崒姘偓鐑芥嚄閸洍鈧箓宕奸妷顔芥櫈闂佺硶鍓濋悷褔鎯屽▎鎾寸厵闁硅鍔栫涵楣冩煕閵婏妇绠為柡宀嬬節瀹曟﹢濡搁敃鈧崑宥嗙箾鐎涙鐭婄紓宥咃躬瀵鎮㈤悡搴濈炊闂佸憡娲熷褔宕滈鍕拺缂佸顑欓崕鎰版煙缁嬫鐓兼鐐茬箻瀹曘劑顢涘顒夊殭闂備礁鎼ú銊╁窗閹捐鐒垫い鎺嗗亾妞ゎ厼鍢查～蹇撁洪鍛画闂備緡鍙忕粻鎴濃枔閼哥數绡€婵炲牆鐏濋弸銈夋煕韫囨棑鑰跨€殿噮鍋勯濂稿椽娴ｅ搫寮抽梻浣稿閸嬪棝宕崸妤€绠繛宸簼閳锋帡鏌涚仦鐐殤濠⒀勭〒缁辨帞鈧綆鍋呯亸鐢电磼椤旂⒈鐓肩€规洘锚闇夐悗锝庡亝閺夊憡淇婇悙顏勨偓鏍哄澶婄；闁规儳顕粻鎯归敐鍛毐婵炲眰鍊濋幃?
        regTimeout(() => {
            finishMessage(text);
        }, 1200);

        return {
            element: msgDiv,
            finish: finishMessage,
            remove: removeMessage
        };
    }

    function openManualQueueModal() {
        if (!emailModal) return;
        emailModal.style.display = 'flex';
        emailModal.offsetWidth;
        emailModal.classList.add('active');
        if (modalEmailInput) modalEmailInput.focus();
    }

    function showAIFlowError(error, options = {}) {
        const classified = classifyAIFlowError(error, options.phase || 'AI generation');
        latestAIFlowError = {
            phase: options.phase || 'AI generation',
            code: classified.code,
            category: classified.category,
            title: classified.title,
            message: classified.message,
            technicalMessage: classified.technicalMessage,
            actions: classified.actions || [],
            model: getActiveModelMeta(),
            at: new Date().toISOString()
        };
        const active = getActiveModelMeta();
        const actionSet = new Set(classified.actions || []);
        const buttons = [
            actionSet.has('retry') ? '<button type="button" class="chat-action-btn chat-action-primary" data-ai-error-action="retry">Retry current model</button>' : '',
            actionSet.has('switch_model') ? '<button type="button" class="chat-action-btn" data-ai-error-action="switch_model">Switch model</button>' : '',
            actionSet.has('check_config') ? '<button type="button" class="chat-action-btn" data-ai-error-action="check_config">Check config</button>' : '',
            actionSet.has('edit_request') ? '<button type="button" class="chat-action-btn chat-action-primary" data-ai-error-action="edit_request">Modify to P0</button>' : '',
            actionSet.has('manual_queue') ? '<button type="button" class="chat-action-btn chat-action-edit" data-ai-error-action="manual_queue">Submit email</button>' : ''
        ].filter(Boolean).join('');
        showSettingsStatus(`${classified.title}: ${classified.message}`, classified.retryable ? 'warning' : 'error');
        addBotMessage([
            '<div class="selection-summary ai-error-card">',
            `<div class="summary-title">${escapeHtml(classified.title)}</div>`,
            `<div class="summary-item"><strong>Current model:</strong> ${escapeHtml(active.label || 'Not configured')}</div>`,
            `<div class="summary-item">${escapeHtml(classified.message)}</div>`,
            classified.technicalMessage ? `<div class="summary-item"><strong>Technical:</strong> ${escapeHtml(classified.technicalMessage)}</div>` : '',
            buttons ? `<div class="summary-actions">${buttons}</div>` : '',
            '</div>'
        ].join(''), (msgDiv) => {
            msgDiv.querySelectorAll('[data-ai-error-action]').forEach(button => {
                button.addEventListener('click', () => {
                    const action = button.getAttribute('data-ai-error-action');
                    if (action === 'retry' && typeof options.onRetry === 'function') {
                        msgDiv.querySelectorAll('[data-ai-error-action]').forEach(actionButton => {
                            actionButton.disabled = true;
                            actionButton.style.pointerEvents = 'none';
                        });
                        msgDiv.remove();
                        options.onRetry();
                    } else if (action === 'switch_model') {
                        if (modelSelector) modelSelector.click();
                        if (chatInputField) chatInputField.focus();
                    } else if (action === 'check_config') {
                        if (adminSession && adminSession.isAdmin) {
                            openSettingsModal(classified.message);
                        } else if (modelSelector) {
                            modelSelector.click();
                        }
                    } else if (action === 'edit_request' && typeof options.onEditRequest === 'function') {
                        options.onEditRequest();
                    } else if (action === 'manual_queue') {
                        openManualQueueModal();
                    }
                });
            });
        });
        return classified;
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
        const attachmentSummary = summarizeAttachmentsForAI(attachments);
        recordChatTurn('user', text, { attachments: attachmentSummary });
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
            qwen: 0,
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

        providerEnabled.checked = provider.enabled;
        providerApiKey.value = provider.apiKey || '';
        providerBaseUrl.value = provider.baseUrl || meta.defaultBaseUrl;
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
        provider.enabled = providerEnabled.checked;
        provider.apiKey = providerApiKey.value.trim();
        provider.baseUrl = providerBaseUrl.value.trim() || meta.defaultBaseUrl;
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
        if (activeModelName) activeModelName.textContent = getCompactModelLabel(active.label);
        if (modelSelector) {
            modelSelector.style.setProperty('--model-color', active.color);
            modelSelector.title = hasLiveAIProvider() ? `Current model: ${active.label}` : 'Platform AI is not configured. Configure a model before generating.';
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

    function renderModelDropdown() {
        if (!modelDropdownList) return;
        modelDropdownList.innerHTML = '';

        if (!platformModelsLoaded) {
            modelDropdownList.innerHTML = '<div class="model-empty">Loading configured models...</div>';
        } else if (platformModels.length) {
            const groups = platformModels.reduce((acc, modelConfig) => {
                if (!acc[modelConfig.providerId]) acc[modelConfig.providerId] = [];
                acc[modelConfig.providerId].push(modelConfig);
                return acc;
            }, {});
            PROVIDER_ORDER.forEach(providerId => {
                if (!groups[providerId] || !groups[providerId].length) return;
                renderModelGroup(providerId, groups[providerId]);
            });
        } else if (!platformAIAvailable) {
            modelDropdownList.innerHTML = '<div class="model-empty">Configured models unavailable. Start the backend or set DROI_API_BASE.</div>';
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
        aiConfig.providers[providerId].currentModel = modelId;
        if (reasoningEffort) aiConfig.providers[providerId].reasoningEffort = reasoningEffort;
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
        showSettingsStatus(message || (hasLiveAIProvider() ? 'Platform AI config is ready.' : 'Add a platform API key before enabling live AI replies.'), hasLiveAIProvider() ? 'success' : 'warning');
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
            openAdminAuthModal(`Google admin login is not ready yet. Start the backend at ${API_BASE_URL || window.location.origin} and fill GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET in .env, then this button will redirect to Google.`);
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
            const label = getLocalizedOptionLabel(item, step);
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            const iconKey = getOptionIconKey(item, step);
            btn.innerHTML = `<span class="quick-tag-icon animal-option-icon" data-option-icon="${escapeHtml(iconKey)}" aria-hidden="true"><span class="icon-fallback">${escapeHtml(getOptionIcon(item, step))}</span></span><span>${escapeHtml(label)}</span>`;
            btn.addEventListener('click', () => {
                addUserMessage(label);
                chatOptionsList.innerHTML = '';

                if (analysisState.active) {
                    const definition = getStepDefinition(step);
                    if (definition) setModuleSelection(definition.key, item);
                    continueClarification();
                } else {
                    const definition = getStepDefinition(step);
                    if (definition) {
                        chatSelections[definition.key] = item;
                        renderInspireProfileSidebar(true);
                    }

                    if (step < MODULE_STEPS.length - 1) {
                        chatStep++;
                        setTimeout(() => {
                            addBotMessage(getBotMessage(chatStep), () => {
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
        const isDescriptiveStep = items.some(item => getLocalizedOptionDesc(item, step));

        items.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const icon = getOptionIcon(item, step);
            const iconKey = getOptionIconKey(item, step);
            const label = getLocalizedOptionLabel(item, step);
            const desc = getLocalizedOptionDesc(item, step);

            if (isDescriptiveStep) {
                btn.className = 'quick-tag setting-card';
                btn.innerHTML = `
                    <div class="card-title"><span class="quick-tag-icon animal-option-icon" data-option-icon="${escapeHtml(iconKey)}" aria-hidden="true"><span class="icon-fallback">${escapeHtml(icon)}</span></span><span>${escapeHtml(label)}</span></div>
                    <div class="card-desc">${escapeHtml(desc || getLocalizedOptionValueForDisplay(item, step) || '')}</div>
                `;
            } else {
                btn.className = 'quick-tag';
                btn.innerHTML = `<span class="quick-tag-icon animal-option-icon" data-option-icon="${escapeHtml(iconKey)}" aria-hidden="true"><span class="icon-fallback">${escapeHtml(icon)}</span></span><span>${escapeHtml(label)}</span>`;
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

    }

    function onChatOptionClick(step, item, btn) {
        clearInspirePromptTimer();
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
                renderInspireProfileSidebar(true);
            }
        }

        regTimeout(() => {
            const container = document.getElementById('chatOptionsContainer');
            container.style.display = 'none';
            chatOptionsList.innerHTML = '';

            const label = getLocalizedOptionLabel(item, step);
            const desc = getLocalizedOptionDesc(item, step);
            if (desc) {
                addUserMessage(`<strong>${escapeHtml(label)}</strong><br><span style="font-size: 0.9em; opacity: 0.7; display: block; margin-top: 4px; line-height: 1.4;">${escapeHtml(desc)}</span>`, { html: true });
            } else {
                addUserMessage(label);
            }

            regTimeout(() => {
                if (analysisState.active) {
                    // 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁诡垎鍐ｆ寖闂佺娅曢幑鍥灳閺冨牆绀冩い蹇庣娴滈箖鏌ㄥ┑鍡欏嚬缂併劌銈搁弻鐔兼儌閸濄儳袦闂佸搫鐭夌紞渚€銆佸鈧幃娆撳箹椤撶噥妫ч梻鍌欑窔濞佳兾涘▎鎴炴殰闁圭儤顨愮紞鏍ㄧ節闂堟侗鍎愰柡鍛叀閺屾稑鈽夐崡鐐差潻濡炪們鍎查懝楣冨煘閹寸偛绠犻梺绋匡攻椤ㄥ棝骞堥妸鈺傚€婚柦妯侯槺閿涙稑鈹戦悙鏉戠亶闁瑰磭鍋ゅ畷鍫曨敆娴ｉ晲缂撶紓鍌欑椤戝棛鈧瑳鍥ㄥ€垫い鎺戝閸婂灚顨ラ悙鑼虎闁告梹纰嶉妵鍕晜鐠囪尙浠紓渚囧枛閻楀繘鍩€椤掑﹦绉甸柛瀣╃劍缁傚秴顭ㄩ崼鐔哄幍闂佸憡绻傜€氼喛鍊撮梻浣告啞閺屻劎绮旈悽绋课﹂柛鏇ㄥ灠濡﹢鏌熺粙鍧楊€楅柡瀣Т閳规垿顢欑涵宄板缂備緡鍣崹鍫曠嵁韫囨稑宸濋柡澶嬪灥缁愭稒绻濋悽闈浶㈤柟铏姍閵嗕線宕ㄧ€涙ǚ鎷绘繛杈剧导鐠€锕傛倿閸撗呯＜闁靛闄勯妵婵堚偓瑙勬礃閸旀洟鍩為幋锕€骞㈡繛鍡樺姈椤旀洟姊绘担鍦菇闁搞劌缍婇獮澶愭晸閻樿尙鏌у┑鐘绘涧椤戝棝鎮￠崘顏呭枑婵犲﹤鐗嗙粈鍫ユ煟閺冨倸甯堕柡鍕╁劦閺屾洘寰勫☉姘辨殸缂備礁澧庨崑娑㈠煘閹达附鍊锋い蹇撳娴煎嫰姊洪崫銉バｉ柣妤冨Т椤曪絾绻濆顑┾晝鎲告径鎰；闁瑰墽绮弲鏌ュ箹缁厜鍋撻崘鑼吅闂傚倷鑳堕…鍫ヮ敄閸℃稑绠伴柤濮愬€栧畷鍙夌節闂堟稒锛嶆繛灏栨櫆閵囧嫰骞樼€电硶濮囬柣搴㈣壘閵堢顫忕紒妯肩懝闁逞屽墮椤洭鎳￠妶鍌氫壕闂傚牊绋撻悞鍝モ偓瑙勬磸閸ㄨ棄鐣峰Δ鍛殐闁冲搫锕ラ柨銈夋⒒娴ｈ櫣甯涢柛鏃撶畵瀹曟粌鈽夊鍙樼瑝婵°倧绲介崯顖炴偂閺囥垻鍙撻柛銉ｅ姀婢规ê霉濠婂啰绉洪柡宀€鍠栧畷姗€宕ｆ径濠冪亷闂備礁鎼張顒勬儎椤栫偛鏄ラ柣鎰惈缁犳氨鎲哥仦鍓х彾闁哄洨鍋愰弨浠嬫煥濞戞ê顏╁ù婊冦偢閺屾稒绻濋崘顏勨拡闂佽桨绶￠崳锝夌嵁閹烘嚦鏃堝焵椤掑倸顥氶柛锔诲幗閸犳劙鏌ｅΔ鈧悧鍡欑箔閹烘挻鍙忛柣鐔告緲缁狙囨煏閸パ冾伃妤犵偞甯￠獮瀣攽閹邦亞妫梻鍌欒兌缁垶骞愰懡銈囩煓闁规崘顕ч悞鍨亜閹哄棗浜鹃梺鍛娚戠划鎾崇暦閹达箑绠荤紓浣姑埀顒傛暬閺屻劌鈹戦崱娑扁偓妤€顭胯閸楁娊寮婚敓鐘插耿婵炲棗绻嗛弸鍛存⒑閸濆嫮娼ら柛鏇ㄥ亽閸ゃ倕鈹戦悙鍙夘棡闁搞劎鏁诲畷鍝勭暆閸曨兘鎷洪梻鍌氱墛缁嬫帡藟閻愮儤鍋ㄦい鏍ㄧ☉濞搭噣鏌ㄥ┑鍫濅粶闁宠鍨归埀顒婄秵閸嬪嫭绂嶅Δ鍛厵闁煎湱澧楄ぐ褏绱掗幓鎺嬪仮闁诡喛濮ょ换婵嗩潩椤撴稒瀚藉┑鐐舵彧缁插潡骞婇幘娲绘晪婵犲﹤鎳愮壕濂告倵閿濆骸浜滈柣蹇嬪劦閹藉爼鎮欑€靛摜鐦堥梻鍌氱墛娓氭宕曡箛娑欑參闁告劦浜滈弸娑㈡煛鐏炶濡奸柍瑙勫灴瀹曢亶鍩￠崒鍌冨洦鈷戠紒瀣儥閸庡繘鎮楀顐㈠祮鐎殿喛顕ч埥澶娢熼柨瀣澑闂備礁鎲″ú锕傚磻閸曨剚鍙忛柡鍥ュ灪閳锋垿姊婚崼姘珕闁逞屽厵閸庨潧鐣烽崼鏇炍╃憸宥夌嵁濡ゅ懏鈷戦柣鐔告緲閹垿鏌ｉ敐搴濋偗鐎规洜顢婇妵鎰板箳閹存繃鍎俊鐐€栫敮鎺斺偓姘煎弮閹繝寮撮姀锛勫弳濠电娀娼уΛ娑氱不瀹曞洨纾煎鑸得弸鐔搞亜閵婏絽鍔﹂柟顔界懇楠炴捇骞掗幘鎼晪闂傚倷娴囬鏍窗濡ゅ啫鍨濋柟鎹愵嚙缁犵娀鏌ｉ幇顒佹儓閸烆垶姊洪棃娑辨Ф闁稿﹥顨婂顐ｃ偅閸愨斁鎷婚梺绋挎湰閻熝呯玻閺冨牊鐓冪憸婊堝礈濮樿京鐭欓柟鎯у閻牓姊洪崹顕呭剳缂佺娀绠栭弻娑樷槈閸楃偞鐏嶇紓浣插亾閻庯綆鍏橀崑鎾斥枔閸喗鐝梺鍛婃尵閸犳牕鐣峰ú顏勭劦妞ゆ帊闄嶆禍婊堟煙閻戞ê鐏ユい蹇ｄ邯閺屽秹鏌ㄧ€ｎ亞鐟ㄩ梻鍥ь樀閺屻劌鈹戦崱娆忣杸濡炪倕绻掓繛鈧柟顔荤矙椤㈡稑鈽夊顓炲灡闂備礁缍婇弨閬嶅垂鐠轰警鐒介煫鍥ㄧ☉閻撴盯鏌涚仦鍓ь暡闁诲酣绠栧缁樻媴閸涘﹥鍎撳銈忓瘜閸ㄥ爼骞冨Ο琛℃斀閻庯綆浜濇潏鍫ユ⒑閹稿海绠撴俊顐㈠缁傚秴顭ㄩ崼鐔哄帾闂婎偄娲ら敃銈嗘櫠閸欏浜滈柕澶堝劤婢ф盯鏌曢崶褍顏┑顔瑰亾闂佹枼鏅涢崯浼此囨导瀛樷拺閺夌偞澹嗛ˇ锕傛煕婵犲倹鍋ユ鐐插暣瀹曟粏顦辨繛宀婁邯閺岋箑螣娓氼垱楔濡炪倖姊归崹鍓佹崲濠靛鍋ㄩ梻鍫熷垁閵夆晜鐓涘ù锝堫潐閸婃劗鈧娲橀崹鍧楀箖濞嗘挸浼犻柛鏇ㄥ亞閳ь剦鍙冨娲礈閹绘帊绨煎┑鐐插级閿曘垹鐣烽幋鐘亾閿濆骸鏋熼柣鎾寸洴閺屾盯濡烽敐鍛闂佽绻嗛弲婵堟閹烘鐒垫い鎺嶇缁剁偤鏌熼柇锕€骞橀柛娆忔濮婃椽宕崟顒€绐涢梺绋款儐閻╊垶宕洪埀顒併亜閹哄棗浜剧紓鍌氱Т閿曨亪鐛崘顔肩伋闁哄倶鍎查～宥呪攽椤旀枻鍏紒鑼跺Г缁傚秵銈ｉ崘鈺冨幈闂婎偄娲﹂幖鈺佄ｇ粙妫电懓顭ㄩ崼銏㈡毇闂佸搫鐭夌徊楣冨箚閺冨牜鏁嶆繝濠傛啗閿濆鈷戦柛娑橈攻鐏忔壆绱掔€ｎ偆澧甸柛鈺佹嚇閹粙宕ㄦ繛鐐闂備胶顭堥張顒勬偡閿斿墽鐭堥柣妤€鐗勬禍婊堟煛閸モ晛鏋斿褏鏁搁埀顒冾潐濞叉垿宕￠幎鐣屽祦闁圭儤鍤﹂弮鍫濈劦妞ゆ帒瀚崑顏堟煟閹伴潧澧扮紒鐘荤畺閺岀喓鈧稒顭囬幊鍐煟閹烘挻銇濋柡灞稿墲閹峰懘妫冮埡鍕儓闂備胶绮幖鈺呭磻婵犲倻鏆﹂柛顐ｆ礀鎯熼梺闈涚墕濞层劎绮婚幒妤佲拻濞达綀濮ら妴鍐磼閳ь剚绗熼埀顒勫极閸愵噮鏁傞柛顐ｇ箚閹芥洟姊洪幐搴ｇ畵妞わ富鍨崇划缁樼節濮橆厾鍘甸梺鍛婃尫閼冲爼骞楅崒鐐寸厓鐟滄粓宕滃韬测偓鍐幢濞戞锕傛煕閺囥劌鐏犻崬顖炴⒑闂堟侗妯堥柣蹇旂箚椤︽娊鏌熸笟鍨缂佺粯绻堝畷鎺楀Χ閸パ勫€梺璇叉唉椤煤濡吋鏆滈柟鐑橆殔閻撴繈骞栧ǎ顒€濡肩紒鐙呯稻閵囧嫰骞樼捄鐑樻濠电姴锕ら悧濠囧煕閹烘嚚褰掓晲閸曨噮鍔呴梺琛″亾闁哄绨遍弨鑺ャ亜閺傛寧鎯堥柍褜鍓氶〃濠傜暦濮樿泛绠虫俊銈傚亾缂佺姾宕甸埀顒冾潐濞叉牕煤閿曗偓閳绘挻銈ｉ崘鈹炬嫼闂佸憡绻傜€氬嘲危鐟欏嫨浜滈柟瀵稿仧閹冲洨鈧娲忛崕鎶藉焵椤掑﹦绉靛ù婊冪埣閹垽宕卞☉娆忎化闂佹儳绻掗幊鎾绘儍閹达附鐓曢柡鍐ㄥ€搁弸鎴︽煏閸パ冾伃濠殿喒鍋撻梺缁樏崯鍨枔濡も偓閳规垿顢欑涵閿嬫暰濠碉紕鍋犲Λ鍕偩閻戣棄惟闁挎柨澧介惁鍫ユ⒑缁嬫寧婀伴柛鎴犳嚀椤洭骞樼€靛摜鐦堢紒鍓у钃辨い顐躬閺屾盯濡搁妶鍛ギ闂佽桨绀侀崯鎾€侀弮鍫濈妞ゆ挾鍠愰?continueClarification 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備浇顕栭崹搴ㄥ礃閿濆棗鐦遍梻鍌欒兌椤㈠﹤鈻嶉弴銏犵闁搞儺鍓欓悘鎶芥煛閸愩劎澧曠紒鈧崘鈹夸簻闊洤娴烽ˇ锕€霉濠婂牏鐣洪柡灞诲妼閳规垿宕卞▎蹇撴瘓缂傚倷闄嶉崝宀勫Χ閹间礁钃熼柣鏂垮悑閸庡矂鏌涘┑鍕姕闁稿瑪鍛＝濞达絼绮欓崫娲偨椤栥倗绡€鐎规洘妞介崺鈧い鎺嶉檷娴滄粓鏌熼崫鍕ラ柛蹇撶灱缁辨帡鍩﹂埀顒勫磻閹剧粯鈷掑ù锝堫潐閸嬬娀鏌涙惔顔肩仸鐎规洘绻冮幆鏃堝Ω閵夈儱浜堕梻浣烘嚀婢х晫鍒掗鐐茬；闁斥晛鍟扮弧鈧繝鐢靛Т閸婃悂顢旈锔界厽妞ゆ挾鍠庣粭褔鏌嶈閸撴繈锝炴径濞掑搫螣閻撳骸鐏婇梺瑙勫礃椤曆呯不閺嶎厽鐓忛煫鍥ь儏閳ь剚鐗犲畷鎴﹀磼閻愯尙顔愬┑鐑囩秵閸撴瑩鍩€椤掍胶澧垫鐐差樀閹囧醇閵忋垻妲囬梻浣圭湽閸ㄨ棄顭囪缁傛帡鏁冮崒娑氬幈闂侀潧顭粻鎴﹀礉閸撲焦鍠愰柣妤€鐗忛惌濠囨煃鐟欏嫬鐏撮柛鈺佸瀹曟﹢濡歌閵堢兘姊绘担铏瑰笡妞ゃ劌妫濋獮鎴﹀炊瑜滈崵鏇㈡偣閸ャ劎銈存俊鎻掔墛娣囧﹪顢涘☉姘辩厑濠碘槅鍋勯崯顐︽偩瀹勯偊娼ㄩ柍褜鍓氭穱濠囧箹娴ｈ倽褔鏌涢埄鍐炬畼闁告ê宕埞鎴︽偐閸偅姣勯梺绋款儐閻╊垶銆佸棰濇晣闁绘柨鍢查悘浣割渻閵堝棙灏柛銊ョ秺閹苯螖閸涱喚鍘遍梺瑙勫閺佹悂宕㈠☉娆戠闁稿繗鍋愭晶顒傜磼缂佹鈽夋い鏂跨箻椤㈡瑩鎳￠妶鍥ㄦ櫒婵犵數鍋熼ˉ鎰板磻閹邦厾绠鹃柍褜鍓熼弻锛勪沪閸撗勫垱閻庢鍠楅幐铏繆閹间礁唯闁靛鍨虹€氳棄鈹戦悩娈挎毌婵℃彃鎳樺畷鎴﹀川鐎涙ê鍓銈嗙墬閸戠懓顭囬弽銊х鐎瑰壊鍠曠花鑽も偓鐟版啞缁诲倿鍩為幋锔藉亹闁圭粯甯╅崝澶愭⒑娴兼瑧绉柡鈧潏鈺傚床婵犻潧顑嗛崑銊╂⒒閸喓鈼ョ紒顔肩埣濮婃椽骞愭惔銏紭闂佺锕ョ换鍫ュΥ娴ｅ壊娼╅柤绋跨仛濞呮粓姊虹化鏇炲⒉闁荤啙鍥ㄥ剨闁割偅绺鹃弨鑺ャ亜閺冣偓閺嬬粯绗熷☉銏＄厱婵☆垱瀵чˉ澶愭煃鐠囪尙孝妞ゎ厹鍔戝畷鐔碱敇閻樺灚顫岄梻鍌欑窔濞佳勵殽韫囨洖绶ら柛鎾楀嫬鍘归梺缁樺姦閸忔瑦绂嶅鍫熺厵閻庢稒顭囩粻鏍煕閵堝懏鍠橀柡灞剧洴閸╃偤骞嗚婢规洖鈹戦敍鍕杭闁稿﹥鐗滈弫顕€骞掑Δ鈧壕褰掓煙闂傚顦﹂柛灞诲姂閺岀喓绱掗姀鐘崇亶闂佺粯鎸婚悷锕傚Φ閸曨垰绫嶉柛灞剧矋閹叉ê鈹戦悙鑼缂侇喗鎹囧濠氭偄绾拌鲸鏅╅梺鐓庮潟閸婃鎮￠幘缁樷拺閻犲洠鈧櫕鐏嗙紓渚囧枟閻熲晠鐛崘銊㈡瀻闁规儳纾ˇ褎绻濋姀锝嗙【闁挎洩绲剧粩鐔煎即閻旇櫣鐦堥梺姹囧灲濞佳冪摥闂備礁鎽滈崯鍧楀疾濠靛绠查柕蹇嬪€曢獮銏′繆椤栫偞娅滅紒銊ヮ煼濮婇缚銇愰幒鎴滃枈闂佸摜濮甸悧鏇㈡偤椤撶偐鏀介柣妯诲墯閸熷繘鏌涢悩宕囧⒌鐎规洘鍔橀妵鎰板箳閹寸姷鏉介梻渚€娼ч…顓熶繆閸モ晛濮柍褜鍓熷娲川婵犱胶绻侀梺闈╃秵閸犳绮嬮幒妤€鐓涢柛鎰典簽閿涙繃绻涢幘纾嬪婵炲眰鍊濆鎼佹偄閸忚偐鍘介梺缁樻煥瀵泛鈻嶉崨瀛樼厽闁挎繂顦藉Λ鎴犵磼椤旂晫鎳呴柟椋庡█閹瑩顢楁笟鍥棃闂備胶纭堕弬渚€宕戦幘鎰佹富闁靛牆妫楅崸濠囨煕鐎ｎ偅灏伴柕鍥у瀵挳顢旈崱娅烘粓姊虹拠鈥虫殭闁搞儜鍥ф暪闂備線娼х换鍫ュ春閸曨垰鐤幖娣妽閳锋垿鎮归崶銊ョ祷妞ゆ帇鍨荤槐鎺斺偓锝庡亜濞搭噣鏌嶉妷顖滅暤鐎规洖鐖奸、妤佹媴缁嬪灝顥楅梻浣烘嚀閸氬鎮鹃鍫濆瀭闁煎鍊楁稉宥夋煙椤栧棗鐬奸崬鐢告煟閻樼儤銆冮悹鈧敃鍌氱？闁瑰鍋熺粻楣冩煕濞嗗浚妲归悘蹇ョ畵閺?                    continueClarification();
                } else if (step < MODULE_STEPS.length - 1) {
                    // 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁诡垎鍐ｆ寖闂佺娅曢幑鍥灳閺冨牆绀冩い蹇庣娴滈箖鏌ㄥ┑鍡欏嚬缂併劌銈搁弻鐔兼儌閸濄儳袦闂佸搫鐭夌紞渚€銆佸鈧幃娆撳箹椤撶噥妫ч梻鍌欑窔濞佳兾涘▎鎴炴殰闁圭儤顨愮紞鏍ㄧ節闂堟侗鍎愰柡鍛叀閺屾稑鈽夐崡鐐差潻濡炪們鍎查懝楣冨煘閹寸偛绠犻梺绋匡攻椤ㄥ棝骞堥妸鈺傚€婚柦妯侯槺閿涙盯姊虹紒妯哄闁稿簺鍊濆畷鎴犫偓锝庡枟閻撶喐淇婇婵嗗惞婵犫偓娴犲鐓冪憸婊堝礂濞戞碍顐芥慨姗嗗墻閸ゆ洟鏌熺紒銏犳灈妞ゎ偄鎳橀弻锝呂熼懡銈呯仼闂佹悶鍎崝搴ㄥ储闁秵鈷戦梻鍫熶緱濡插爼鏌涢妸銉︽儓闁宠绉瑰畷鍫曨敆娴ｅ搫骞堟繝纰樻閸ㄦ娊宕㈣閸┿垽宕奸悢绋垮伎婵犵數濮寸€氼喚鏁☉銏＄厵鐎瑰嫮澧楅崵鍥┾偓瑙勬磸閸斿秶鎹㈠┑瀣闁靛鍎遍ˉ鎺撶節绾板纾块柛瀣灴瀹曟劘顦寸紒杈ㄦ尭椤繄鎹勯搹璇℃敤闂備礁鎲￠崝妯间焊濞嗘挸姹查柨鏇炲€归埛鎺楁煕椤愩倕鏋嶇紒鎯伴哺缁绘稓浜搁弽銊︾彆闂侀潧娲ょ€氫即鐛€ｎ喗鍋愰棅顐幗閸曞啯绻濈喊澶岀？闁稿顭囬崚鎺戔枎閹炬緞銉ャ€掑锝呬壕閻庢鍣崳锝呯暦閻撳簶鏀介柛顐亝鏁堟繝寰锋澘鈧鎱ㄩ悜钘夌？闁圭増婢橀崹鍌毭归崗鍏肩稇缂佹劖顨嗛幈銊ノ熼崹顔惧帿闂佺顑呯€氫即寮诲☉銏犵労闁告劦浜栨慨鍥⒑缁嬫鍎滅紓宥勭窔瀵槒顦剁紒鐘崇洴瀵挳鎮㈤柨瀣殮闂傚倷鐒﹂惇褰掑礉瀹ュ鍨傞柛顭戝暎濞戙垹宸濋柟纰卞幗閺呫垺绻濋姀锝嗙【闁挎洏鍊濋敐鐐侯敂閸涱垳顔?Wizard 婵?
                    chatStep = step + 1;
                    addBotMessage(getBotMessage(chatStep), () => {
                        regTimeout(() => renderChatOptions(chatStep), 160);
                    });
                } else {
                    askFinalConfirmation();
                }
            }, 600);
        }, 300);
    }

    function resetBulletHellPlanState() {
        bulletHellPlanState = {
            active: false,
            confirmed: false,
            originalPrompt: '',
            baseSpec: null,
            plan: null,
            error: null
        };
    }

    function normalizeStringList(value, fallback = []) {
        if (Array.isArray(value)) return value.map(item => String(item || '').trim()).filter(Boolean);
        if (typeof value === 'string' && value.trim()) return [value.trim()];
        return fallback;
    }

    function firstText(value, ...fallbackValues) {
        if (typeof value === 'string' && value.trim()) return value.trim();
        if (Array.isArray(value) && value.length) return firstText(value[0], ...fallbackValues);
        if (value && typeof value === 'object') {
            return firstText(value.name || value.title || value.description || value.summary || value.value, ...fallbackValues);
        }
        for (const fallback of fallbackValues) {
            const candidate = firstText(fallback);
            if (candidate) return candidate;
        }
        return '';
    }

    function getBulletHellDifficultyTuning(level = 'Normal') {
        const text = normalizeAnswerText(level);
        if (/nightmare|hardcore|expert|brutal/i.test(text)) {
            return { enemyHpMultiplier: 1.55, bulletSpeedMultiplier: 1.32, waveInterval: 0.72, bossHp: 2600, lives: 2, shield: 0, invincibleTime: 1.2, enemyBulletBudget: 560 };
        }
        if (/hard|difficult|challenge/i.test(text)) {
            return { enemyHpMultiplier: 1.25, bulletSpeedMultiplier: 1.18, waveInterval: 0.82, bossHp: 2200, lives: 3, shield: 1, invincibleTime: 1.5, enemyBulletBudget: 460 };
        }
        if (/easy|casual|relaxed|beginner|friendly/i.test(text)) {
            return { enemyHpMultiplier: 0.78, bulletSpeedMultiplier: 0.82, waveInterval: 1.2, bossHp: 1350, lives: 5, shield: 2, invincibleTime: 2.4, enemyBulletBudget: 260 };
        }
        return { enemyHpMultiplier: 1, bulletSpeedMultiplier: 1, waveInterval: 1, bossHp: 1750, lives: 3, shield: 1, invincibleTime: 1.8, enemyBulletBudget: 360 };
    }
    function normalizeBulletHellProductPlan(rawPlan = {}, baseSpec = getCurrentGameSpec()) {
        const meta = rawPlan.meta || {};
        const bossRaw = rawPlan.bossConfig || rawPlan.boss || {};
        const difficultyRaw = rawPlan.difficultyTuning || {};
        const tuning = {
            ...getBulletHellDifficultyTuning(firstText(difficultyRaw.level, baseSpec.difficultyLevel)),
            ...difficultyRaw
        };
        const enemyTypes = normalizeStringList(rawPlan.enemyTypes, ['Pattern Drone', 'Fan Weaver', 'Ring Lotus']);
        const bossPhases = normalizeStringList(rawPlan.bossPhases || bossRaw.phases, ['Spiral lane pressure', 'Flower spread', 'Burst wall']);
        const waves = Array.isArray(rawPlan.waves) && rawPlan.waves.length
            ? rawPlan.waves
            : [
                { id: 'wave-1', name: 'Approach Pattern', interval: tuning.waveInterval, enemyTypes: enemyTypes.slice(0, 2) },
                { id: 'wave-2', name: 'Crossfire Pattern', interval: Math.max(0.45, tuning.waveInterval * 0.82), enemyTypes },
                { id: 'boss', name: 'Final Boss', interval: 0, enemyTypes: [firstText(bossRaw.name, 'Prism Core')] }
            ];

        return {
            meta: {
                description: firstText(meta.description, firstText(rawPlan.description, baseSpec.background || 'A focused flying shooter prototype.'))
            },
            gameName: firstText(rawPlan.gameName || meta.gameName, `${baseSpec.gameSetting || 'Prism'} Skybreak`),
            artDirection: {
                summary: firstText(rawPlan.artDirection, baseSpec.artStyle || 'Cyber neon readable arcade'),
                bulletColors: normalizeStringList(rawPlan.bulletColors || rawPlan.artDirection?.bulletColors, ['#74E5FF', '#F093FB', '#F8D878']),
                enemyPalette: normalizeStringList(rawPlan.enemyPalette || rawPlan.artDirection?.enemyPalette, ['#8A78FF', '#42A5FF', '#F093FB']),
                backgroundVisual: firstText(rawPlan.backgroundVisual || rawPlan.artDirection?.backgroundVisual, baseSpec.gameSetting || 'Layered cosmic grid'),
                uiToken: firstText(rawPlan.uiToken || rawPlan.artDirection?.uiToken, '#74E5FF')
            },
            setting: firstText(rawPlan.setting || rawPlan.gameSetting, baseSpec.gameSetting || 'Aerial combat zone'),
            story: firstText(rawPlan.story || rawPlan.backgroundStory, baseSpec.background || 'A pilot breaks through hostile signal swarms to defeat the final core.'),
            coreGameplay: firstText(rawPlan.coreGameplay, baseSpec.coreGameplay || 'Move, dodge, shoot, collect power, and use bombs to clear unsafe screens.'),
            winCondition: firstText(rawPlan.winCondition, baseSpec.playerGoal || 'Defeat the final Boss.'),
            bossConfig: {
                name: firstText(bossRaw.name, 'Prism Core'),
                hp: Number(bossRaw.hp || tuning.bossHp || 1750),
                phases: bossPhases.map((phase, index) => ({
                    name: firstText(phase, `Phase ${index + 1}`),
                    hpThreshold: index === 0 ? 0.66 : (index === 1 ? 0.32 : 0),
                    pattern: ['spiral', 'flower', 'burst', 'fan'][index % 4],
                    fireRate: Math.max(0.06, 0.18 - index * 0.035)
                }))
            },
            waves,
            enemyTypes,
            progression: firstText(rawPlan.progression, baseSpec.progressionSystem || 'Weapon upgrades, power drops, bomb energy, shield, and life rewards.'),
            difficultyTuning: tuning,
            prototypeSummary: firstText(rawPlan.prototypeSummary, 'Playable bullet-hell P0: vertical movement, enemy waves, power growth, bomb clear, final Boss, and win/fail states.')
        };
    }

    async function generateBulletHellProductPlan(profile) {
        const activeModel = requireActiveAIModel('Bullet Hell product plan');
        const planProviderId = activeModel.providerId;
        const planModelId = activeModel.modelId;
        const planProviderMeta = PROVIDER_META[planProviderId] || PROVIDER_META.custom;
        const response = await withTimeout(aiService.stageChat('/api/ai/generate-game-plan', [
            {
                role: 'system',
                content: `You are a senior game product designer for HTML5 bullet-hell prototypes. Return strict JSON only. ${getLanguageInstruction()}
Required keys:
{
  "meta": {"description": string},
  "gameName": string,
  "artDirection": {"summary": string, "bulletColors": string[], "enemyPalette": string[], "backgroundVisual": string, "uiToken": string},
  "setting": string,
  "story": string,
  "coreGameplay": string,
  "winCondition": string,
  "bossConfig": {"name": string, "hp": number, "phases": string[]},
  "waves": [{"id": string, "name": string, "interval": number, "enemyTypes": string[]}],
  "enemyTypes": string[],
  "bossPhases": string[],
  "progression": string,
  "difficultyTuning": {"level": string, "enemyHpMultiplier": number, "bulletSpeedMultiplier": number, "waveInterval": number, "bossHp": number, "lives": number, "shield": number},
  "prototypeSummary": string
}
Lock Game Type to "Bullet Hell / Flying Shooter" and genre to "bullet-hell".`
            },
            {
                role: 'user',
                content: JSON.stringify({
                    ...profile,
                    requestContext: buildAIRequestContext(profile.prompt || profile.spec?.background || '')
                })
            }
        ], { provider: planProviderId, model: planModelId }), AI_BULLET_PLAN_TIMEOUT_MS, 'Bullet Hell product plan');
        const parsed = validateBulletHellProductPlanResponse(extractModelJsonObject(response.content, 'Bullet Hell product plan'));
        const responseModel = response.model || planModelId || getProviderModelId(planProviderId);
        analysisState.finalModelMeta = {
            providerId: planProviderId,
            providerLabel: planProviderMeta.label || planProviderId,
            icon: planProviderMeta.icon || 'AI',
            color: planProviderMeta.color || '#74E5FF',
            modelId: responseModel,
            modelLabel: getModelLabel(planProviderId, responseModel),
            reasoning: 'none',
            label: getModelLabel(planProviderId, responseModel)
        };
        return normalizeBulletHellProductPlan(parsed, profile.spec);
    }

    function applyBulletHellPlanToGeneratedSpec(plan, baseSpec = getCurrentGameSpec()) {
        const normalized = normalizeBulletHellProductPlan(plan, baseSpec);
        return {
            ...baseSpec,
            gameType: 'Bullet Hell / Flying Shooter',
            artStyle: normalized.artDirection.summary || baseSpec.artStyle,
            gameSetting: normalized.setting || baseSpec.gameSetting,
            background: normalized.story || normalized.meta.description || baseSpec.background,
            coreGameplay: normalized.coreGameplay || baseSpec.coreGameplay,
            playerGoal: normalized.winCondition || baseSpec.playerGoal,
            mainChallenge: [normalized.bossConfig.phases.map(phase => phase.name).join(', '), baseSpec.mainChallenge].filter(Boolean).join(' | '),
            progressionSystem: normalized.progression || baseSpec.progressionSystem,
            difficultyLevel: firstText(normalized.difficultyTuning.level, baseSpec.difficultyLevel),
            bulletHellProductPlan: normalized
        };
    }

    function buildBulletHellProductPlanHtml(plan) {
        const normalized = normalizeBulletHellProductPlan(plan, bulletHellPlanState.baseSpec || getCurrentGameSpec());
        const dna = ['Bullet Hell / Flying Shooter', normalized.artDirection.summary, normalized.setting].filter(Boolean).join(' / ');
        return [
            '<div class="selection-summary bullet-plan-card">',
            `<div class="summary-title">${escapeHtml(bhText('planTitle'))}</div>`,
            `<div class="generation-status">${escapeHtml(bhText('planBadge'))}</div>`,
            `<div class="summary-name">${escapeHtml(normalized.gameName)}</div>`,
            `<div class="summary-item"><strong>DNA:</strong> ${escapeHtml(dna)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('storyPremise'))}:</strong> ${escapeHtml(normalized.story)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('coreLoop'))}:</strong> ${escapeHtml(normalized.coreGameplay)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(bhText('goal'))}:</strong> ${escapeHtml(normalized.winCondition)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(bhText('boss'))}:</strong> ${escapeHtml(normalized.bossConfig.name)} · ${escapeHtml(String(normalized.bossConfig.phases.length))} phases · HP ${escapeHtml(String(normalized.bossConfig.hp))}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(bhText('waves'))}:</strong> ${escapeHtml(normalized.waves.map(wave => firstText(wave.name || wave.id)).join(' / '))}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(bhText('progression'))}:</strong> ${escapeHtml(normalized.progression)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(bhText('difficulty'))}:</strong> ${escapeHtml(firstText(normalized.difficultyTuning.level, 'Normal'))}</div>`,
            `<div class="summary-item"><strong>Prototype Summary:</strong> ${escapeHtml(normalized.prototypeSummary)}</div>`,
            '</div>'
        ].join('');
    }

    function renderBulletHellPlanActions() {
        const container = document.getElementById('chatOptionsContainer');
        const list = document.getElementById('chatOptionsList');
        if (!container || !list) return;
        if (chatMoreBtn) chatMoreBtn.style.display = 'none';
        container.style.display = 'flex';
        list.innerHTML = '';

        const confirmBtn = document.createElement('button');
        confirmBtn.className = 'chat-action-btn chat-action-primary';
        confirmBtn.textContent = bhText('confirm');
        confirmBtn.addEventListener('click', () => {
            container.style.display = 'none';
            bulletHellPlanState.confirmed = true;
            addUserMessage(confirmBtn.textContent);
            addBotMessage(bhText('directConfirm'), () => {
                composeAndReturn();
            });
        });

        const reviseBtn = document.createElement('button');
        reviseBtn.className = 'chat-action-btn chat-action-edit';
        reviseBtn.textContent = bhText('revise');
        reviseBtn.addEventListener('click', () => {
            container.style.display = 'none';
            analysisState.revisionMode = true;
            latestGamePlan = normalizeGamePlanForGeneration({
                title: bulletHellPlanState.plan.gameName,
                hook: bulletHellPlanState.plan.meta.description,
                storyPremise: bulletHellPlanState.plan.story,
                coreLoop: bulletHellPlanState.plan.coreGameplay,
                visualDirection: bulletHellPlanState.plan.artDirection.summary,
                enemyDesign: `${bulletHellPlanState.plan.enemyTypes.join(', ')}; Boss: ${bulletHellPlanState.plan.bossConfig.name}`,
                progressionPlan: bulletHellPlanState.plan.progression,
                playerFantasy: bulletHellPlanState.plan.winCondition,
                prototypeScope: bulletHellPlanState.plan.prototypeSummary
            }, applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, bulletHellPlanState.baseSpec));
            latestGamePlanDraft = buildGamePlanDraftText(latestGamePlan, applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, bulletHellPlanState.baseSpec));
            if (chatInputField) {
                setChatInputValue(latestGamePlanDraft + '\n\n', { focus: true });
            }
        });

        list.appendChild(confirmBtn);
        list.appendChild(reviseBtn);
        chatHistory.appendChild(container);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function openEmailQueueAfterBulletHellFailure(error) {
        const reason = error && error.message ? error.message : 'AI product plan failed.';
        showSettingsStatus(`Bullet Hell AI product plan failed: ${reason}`, 'warning');
        addBotMessage(
            `<div class="selection-summary"><div class="summary-title">${escapeHtml(bhText('aiRequiredTitle'))}</div><div class="summary-item">${escapeHtml(bhText('aiRequiredBody'))}</div><div class="summary-item"><strong>Error:</strong> ${escapeHtml(reason)}</div></div>`,
            () => {
                regTimeout(() => {
                    if (emailModal) {
                        emailModal.style.display = 'flex';
                        emailModal.offsetWidth;
                        emailModal.classList.add('active');
                        if (modalEmailInput) modalEmailInput.focus();
                    }
                }, 700);
            }
        );
    }

    async function startBulletHellPlanFlow(prompt, spec) {
        clearInspirePromptTimer();
        bulletHellPlanState.active = true;
        bulletHellPlanState.confirmed = false;
        bulletHellPlanState.originalPrompt = prompt || spec.background || '';
        bulletHellPlanState.baseSpec = {
            ...spec,
            gameType: 'Bullet Hell / Flying Shooter'
        };
        bulletHellPlanState.plan = null;
        bulletHellPlanState.error = null;

        const pendingMessage = addBotMessage('', null, { pending: true, workType: 'bulletPlan' });
        try {
            const plan = await generateBulletHellProductPlan({
                prompt: bulletHellPlanState.originalPrompt,
                spec: bulletHellPlanState.baseSpec,
                templateId: 'bullet_hell',
                templateCapabilitySummary: 'HTML5 Canvas flying shooter template with movement, auto/manual shooting, focus movement, bomb clear, enemy waves, boss phases, bullets, pickups, HUD, win/fail, pause, and restart states.',
                mappingTargets: {
                    gameType: 'Bullet Hell / Flying Shooter, genre bullet-hell',
                    artStyle: 'bullet colors, enemy palette, background visuals, UI token, asset prompts',
                    gameSetting: 'game name, enemy names, Boss names, background description',
                    backgroundStory: 'meta.description and generated summary',
                    coreGameplay: 'autoAttack, defaultShootMode, movement, dodge, shooting, bomb screen-clear',
                    playerGoal: 'win condition and final Boss config',
                    mainChallenge: 'waves, enemyTypes, boss phases',
                    progressionSystem: 'weapon upgrades, drops, power, bomb, energy, shield, life rewards',
                    difficultyLevel: 'enemy HP, bullet speed, wave interval, Boss HP, player forgiveness'
                }
            });
            bulletHellPlanState.plan = plan;
            latestGamePlan = normalizeGamePlanForGeneration({
                title: plan.gameName,
                hook: plan.meta.description,
                storyPremise: plan.story,
                coreLoop: plan.coreGameplay,
                visualDirection: plan.artDirection.summary,
                enemyDesign: `${plan.enemyTypes.join(', ')}; Boss: ${plan.bossConfig.name}`,
                progressionPlan: plan.progression,
                playerFantasy: plan.winCondition,
                prototypeScope: plan.prototypeSummary
            }, applyBulletHellPlanToGeneratedSpec(plan, bulletHellPlanState.baseSpec));
            latestGamePlanDraft = buildGamePlanDraftText(latestGamePlan, applyBulletHellPlanToGeneratedSpec(plan, bulletHellPlanState.baseSpec));
            if (pendingMessage) pendingMessage.finish(buildBulletHellProductPlanHtml(plan));
            renderBulletHellPlanActions();
        } catch (error) {
            bulletHellPlanState.error = error;
            if (pendingMessage) pendingMessage.remove();
            showAIFlowError(error, {
                phase: 'Bullet Hell product plan',
                onRetry: () => startBulletHellPlanFlow(prompt, spec)
            });
        }
    }

    async function askFinalConfirmation() {
        clearInspirePromptTimer();
        const spec = getCurrentGameSpec();
        const decision = matchTemplate(spec);
        if (decision.canAutoGenerate && decision.templateId === 'bullet_hell' && !bulletHellPlanState.confirmed) {
            startBulletHellPlanFlow(spec.background, spec);
            return;
        }
        if (!decision.canAutoGenerate) {
            showAIFlowError(buildUnsupportedTemplateError(decision), {
                phase: 'Template capability',
                onEditRequest: () => prepareP0RewriteRequest(decision)
            });
            return;
        }
        const shapingStartedAt = Date.now();
        const pendingMessage = addBotMessage('', null, { pending: true, workType: 'shaping' });
        let summaryHtml = '';
        try {
            summaryHtml = await buildGamePlanSummaryHtml();
        } catch (error) {
            if (pendingMessage) pendingMessage.remove();
            showAIFlowError(error, {
                phase: 'Game plan summary',
                onRetry: () => askFinalConfirmation()
            });
            return;
        }
        const remainingWorkTime = Math.max(0, 1200 - (Date.now() - shapingStartedAt));
        if (remainingWorkTime) {
            await new Promise(resolve => setTimeout(resolve, remainingWorkTime));
        }
        if (pendingMessage) pendingMessage.finish(summaryHtml);
        regTimeout(() => {
            addBotMessage(t('ready'), () => {
                regTimeout(renderFinalActionButtons, 160);
            });
        }, 500);
    }

    async function buildGamePlanSummaryHtml() {
        try {
            const responseModelMeta = requireActiveAIModel('Game plan summary');
            const spec = getCurrentGameSpec();
            const templateDecision = matchTemplate(spec);
            const response = await withTimeout(aiService.stageChat('/api/ai/generate-game-plan', [
                {
                    role: 'system',
                    content: `You are a senior game product designer generating a complete P0 GamePlan for an HTML5 Canvas game template. Return only valid JSON with keys title, hook, storyPremise, coreLoop, momentToMoment, visualDirection, enemyDesign, progressionPlan, playerFantasy, prototypeScope, risk. Keep every value under 48 words, but make each value specific enough to drive template configuration, asset prompts, enemies, progression, and win/fail goals. If the template is roguelike_survival, include survival timeline, auto-weapons, XP pickups, three-choice upgrades, enemy escalation, boss pressure, and victory/fail conditions. If the template is bullet_hell, include waves, bullet patterns, boss phases, dodge/shoot/bomb loop, pickups, and victory/fail conditions. ${getLanguageInstruction()}`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        userSpec: spec,
                        templateDecision,
                        requestContext: buildAIRequestContext(spec.background || savedPrompt || ''),
                        templateCapabilitySummary: templateDecision.templateId === 'roguelike_survival'
                            ? 'Groglike-SOP supports HTML5 Canvas arena survival, auto weapons, XP pickups, level-up choices, waves, enemies, weapons, balance, effects, boss pressure, pause/restart/result states.'
                            : (templateDecision.templateId === 'bullet_hell'
                                ? 'bullet_hell supports HTML5 Canvas flying shooter, movement, auto/manual shooting, focus movement, bomb clear, enemy waves, boss phases, bullets, pickups, HUD, win/fail states.'
                                : 'No automatic template is confirmed.')
                    })
                }
            ], { provider: responseModelMeta.providerId, model: responseModelMeta.modelId }), AI_GAME_PLAN_TIMEOUT_MS, 'Game plan summary');
            const plan = validateGamePlanResponse(extractModelJsonObject(response.content, 'Game plan summary'));
            analysisState.finalModelMeta = {
                ...responseModelMeta,
                responseModel: response.model || responseModelMeta.modelId
            };
            return buildAISummaryHtml(plan);
        } catch (error) {
            throw classifyAIFlowError(error, 'Game plan summary');
        }
    }

    function buildUnsupportedTemplateError(decision = {}) {
        const blockedReasons = analysisState.capability && Array.isArray(analysisState.capability.blockedReasons)
            ? analysisState.capability.blockedReasons.filter(Boolean)
            : [];
        const reason = blockedReasons.length
            ? blockedReasons.join(', ')
            : (decision.reason || decision.fallbackMessage || 'The selected model did not confirm a supported P0 template.');
        const message = [
            'This request is outside the current automatic generation templates.',
            'Current P0 supports HTML5 Canvas Bullet Hell / Flying Shooter and Roguelike Survival.',
            'Modify the request into one of those P0 formats, or submit email for manual production.'
        ].join(' ');
        return createAIFlowError(
            'CAPABILITY_UNSUPPORTED',
            'capability_unsupported',
            'Automatic template is not supported',
            message,
            reason,
            ['edit_request', 'manual_queue']
        );
    }

    function prepareP0RewriteRequest(decision = {}) {
        analysisState.revisionMode = true;
        const current = latestGamePlanDraft || buildGameSpecPlainText(getCurrentGameSpec());
        const rewritePrompt = [
            current,
            '',
            'Please revise this into a P0-supported HTML5 Canvas game.',
            'Choose one:',
            '- Bullet Hell / Flying Shooter: movement, shooting, dodge bullets, bombs, enemy waves, boss phases.',
            '- Roguelike Survival: auto-attack, XP pickups, level-up choices, enemy waves, boss pressure.',
            '',
            `Unsupported reason: ${decision.reason || decision.fallbackMessage || 'No supported template confirmed.'}`
        ].join('\n');
        if (chatInputField) {
            setChatInputValue(rewritePrompt, { focus: true, cursorToEnd: true });
        }
        addBotMessage('Edit the request in the input box, then send it to re-run analysis with the current model.');
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

    function normalizeGamePlanForGeneration(plan = null, spec = getCurrentGameSpec()) {
        const source = plan || {};
        return {
            title: firstText(source.title, spec.gameSetting, 'Generated Game Prototype'),
            hook: firstText(source.hook, spec.background, 'A compact playable game concept.'),
            storyPremise: firstText(source.storyPremise, source.setting, spec.background, spec.gameSetting, 'A focused first playable scenario.'),
            coreLoop: firstText(source.coreLoop, spec.coreGameplay, 'Move, act, collect feedback, and progress.'),
            momentToMoment: firstText(source.momentToMoment, 'The player makes clear short-cycle decisions every few seconds.'),
            visualDirection: firstText(source.visualDirection, spec.artStyle, 'Readable game art direction with clear feedback.'),
            enemyDesign: firstText(source.enemyDesign, source.challengeDesign, spec.mainChallenge, 'Readable challenge rules that escalate over the session.'),
            progressionPlan: firstText(source.progressionPlan, spec.progressionSystem, 'Meaningful upgrades and power growth across the run.'),
            playerFantasy: firstText(source.playerFantasy, spec.playerGoal, 'Step into a clear role and chase a focused goal.'),
            prototypeScope: firstText(source.prototypeScope, 'Build one compact playable loop with win, fail, pause, and restart states.'),
            risk: firstText(source.risk, '')
        };
    }

    function buildProductionBriefText(plan = latestGamePlan, spec = getCurrentGameSpec()) {
        const normalized = normalizeGamePlanForGeneration(plan, spec);
        return [
            `Title: ${normalized.title}`,
            `Hook: ${normalized.hook}`,
            `Story: ${normalized.storyPremise}`,
            `Core Loop: ${normalized.coreLoop}`,
            `Moment-to-Moment: ${normalized.momentToMoment}`,
            `Visual Direction: ${normalized.visualDirection}`,
            `Enemy / Challenge Design: ${normalized.enemyDesign}`,
            `Progression Plan: ${normalized.progressionPlan}`,
            `Player Fantasy: ${normalized.playerFantasy}`,
            `P0 Scope: ${normalized.prototypeScope}`
        ].join('\n');
    }

    function applyProductionPlanToSpec(spec = getCurrentGameSpec(), plan = latestGamePlan) {
        if (!plan) return spec;
        const normalized = normalizeGamePlanForGeneration(plan, spec);
        const backgroundParts = [
            spec.background,
            normalized.hook,
            normalized.storyPremise
        ].filter(Boolean);
        const uniqueBackground = [...new Set(backgroundParts)];
        return {
            ...spec,
            gameSetting: spec.gameSetting || normalized.title,
            background: uniqueBackground.join('\n'),
            coreGameplay: normalized.coreLoop || spec.coreGameplay,
            mainChallenge: normalized.enemyDesign || spec.mainChallenge,
            progressionSystem: normalized.progressionPlan || spec.progressionSystem,
            productionPlan: normalized,
            productionBrief: buildProductionBriefText(normalized, spec)
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

    function normalizeGameTypeForTemplate(prompt = '', spec = getCurrentGameSpec()) {
        const text = normalizeAnswerText([
            prompt,
            spec.gameType,
            spec.background,
            spec.coreGameplay,
            spec.playerGoal,
            spec.mainChallenge
        ].filter(Boolean).join(' '));
        const bulletTerms = [
            'bullet hell', 'danmaku', 'shmup', 'stg', 'flying shooter', 'space shooter',
            'vertical shooter', 'horizontal shooter', 'bullet curtain', 'air shooter',
            'plane shooter', 'auto-fire', 'auto fire', 'projectile patterns', 'boss phases',
            'bullet dodging', 'bomb clear', 'shield pickup', 'shooter'
        ];
        const extraTerms = Array.isArray(TEMPLATE_KEYWORD_PATCHES.bullet_hell) ? TEMPLATE_KEYWORD_PATCHES.bullet_hell : [];
        const hit = [...bulletTerms, ...extraTerms].find(term => {
            const normalizedTerm = normalizeAnswerText(term);
            return normalizedTerm && text.includes(normalizedTerm);
        });
        if (!hit) {
            return { normalizedGameType: spec.gameType || '', templateId: null, genre: null, locked: false, reason: '' };
        }
        return {
            normalizedGameType: 'Bullet Hell / Flying Shooter',
            templateId: 'bullet_hell',
            genre: 'bullet-hell',
            locked: true,
            reason: `Flying shooter intent matched: ${hit}`
        };
    }

    function isBulletHellLocked(prompt = '', spec = getCurrentGameSpec()) {
        return normalizeGameTypeForTemplate(prompt, spec).locked;
    }

    function detectCapabilityExceeded(text) {
        const intent = String(text || '').toLowerCase();
        const blockers = [
            '3d', 'three.js', 'multiplayer', 'online co-op', 'mmo', 'massive open world',
            'virtual reality', 'augmented reality', 'blockchain', 'nft', 'voice chat',
            'networked', 'server authoritative', 'backend multiplayer', 'real-time multiplayer',
            'unreal engine', 'unity project', 'native mobile app', 'ios app', 'android app'
        ];
        const hit = blockers.find(term => {
            if (['3d', 'mmo', 'nft'].includes(term)) return new RegExp(`\\b${term}\\b`).test(intent);
            return intent.includes(term);
        });
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
        const aiCapability = analysisState.capability && analysisState.capability.supported === false
            ? {
                blocked: true,
                reason: `Capability exceeded: ${(analysisState.capability.blockedReasons || []).join(', ') || 'unsupported request'}`
            }
            : null;
        const effectiveCapability = aiCapability || capability;
        const aiDecision = analysisState.templateDecision || null;
        const hasAITemplateDecision = Boolean(aiDecision && Object.prototype.hasOwnProperty.call(aiDecision, 'templateId'));
        if (aiDecision && aiDecision.templateId === 'unsupported') {
            return {
                canAutoGenerate: false,
                templateId: null,
                templateLabel: 'Unsupported request',
                confidence: Number(aiDecision.confidence || 0),
                reason: aiDecision.reason || 'AI marked this request outside current template coverage.',
                fallbackMessage: 'This idea is outside the current automatic template coverage. Please leave an email and we will route it to the manual queue.',
                candidates: []
            };
        }
        const aiTemplateId = aiDecision && AUTO_GENERATION_TEMPLATE_IDS.has(aiDecision.templateId) ? aiDecision.templateId : '';
        const aiConfidence = Number(aiDecision && aiDecision.confidence || 0);
        if (aiTemplateId && aiConfidence >= 0.6 && !capability.blocked) {
            const template = TEMPLATE_CATALOG.find(item => item.id === aiTemplateId);
            const isBullet = aiTemplateId === 'bullet_hell';
            return {
                canAutoGenerate: true,
                templateId: aiTemplateId,
                templateLabel: isBullet ? 'Bullet Hell / Flying Shooter' : (template ? template.label : aiTemplateId),
                templateGenre: isBullet ? 'bullet-hell' : 'roguelike-survival',
                normalizedGameType: isBullet ? 'Bullet Hell / Flying Shooter' : 'Roguelike Survival',
                locked: true,
                confidence: Math.min(0.98, Math.max(0.6, aiConfidence)),
                reason: aiDecision.reason || `AI selected ${template ? template.label : aiTemplateId}.`,
                fallbackMessage: '',
                candidates: template ? [{ ...template, confidence: Math.min(0.98, Math.max(0.6, aiConfidence)), hits: ['ai-template-decision'], directHit: true }] : []
            };
        }
        const normalizedIntent = normalizeGameTypeForTemplate(intent, spec);
        if (normalizedIntent.locked && !capability.blocked) {
            const template = TEMPLATE_CATALOG.find(item => item.id === 'bullet_hell');
            return {
                canAutoGenerate: false,
                templateId: 'bullet_hell',
                templateLabel: 'Bullet Hell / Flying Shooter',
                templateGenre: 'bullet-hell',
                normalizedGameType: normalizedIntent.normalizedGameType,
                locked: false,
                confidence: 0.98,
                reason: hasAITemplateDecision
                    ? `${normalizedIntent.reason}, but the current AI templateDecision did not confirm automatic generation.`
                    : `${normalizedIntent.reason}, but automatic generation requires the selected model to return templateDecision first.`,
                fallbackMessage: hasAITemplateDecision
                    ? 'The current AI template decision did not confirm this as an automatic P0 template. Retry or switch model if this looks wrong.'
                    : 'Automatic generation requires an AI template decision from the selected model. Retry analysis or switch model.',
                candidates: template ? [{ ...template, confidence: 0.98, hits: [normalizedIntent.reason], directHit: true }] : []
            };
        }
        const directType = String(spec.gameType || '').toLowerCase();
        const scored = scoreTemplatesForText(intent).map(template => {
            const keywords = [...(template.keywords || []), ...(template.intentAliases || [])];
            const hits = keywords.filter(keyword => intent.includes(String(keyword).toLowerCase()));
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

        const best = scored[0];
        const templateMatched = Boolean(best && best.confidence >= 0.7);
        const templateCanAutoGenerate = Boolean(best && AUTO_GENERATION_TEMPLATE_IDS.has(best.id));
        const canAutoGenerate = Boolean(templateMatched && templateCanAutoGenerate && !capability.blocked);
        const fallbackMessage = capability.blocked
            ? 'This request includes features outside the current P0 HTML5 template whitelist. Please leave an email and we will route it to the manual queue.'
            : (hasAITemplateDecision
                ? 'The current AI template decision did not confirm an automatic P0 template. Retry or switch model if this looks wrong.'
                : 'Automatic generation requires an AI template decision from the selected model. Retry analysis or switch model.');
        return {
            canAutoGenerate,
            templateId: best ? best.id : null,
            templateLabel: best ? best.label : 'No matching template',
            confidence: best ? best.confidence : 0,
            reason: capability.blocked
                ? capability.reason
                : (templateMatched
                    ? `Local safety matched ${best.label}.`
                    : 'No AI-confirmed P0 template decision is available.'),
            fallbackMessage: canAutoGenerate ? '' : fallbackMessage,
            candidates: scored.slice(0, 3)
        };
    }

    function inferThemePreset(spec = getCurrentGameSpec()) {
        const text = [spec.artStyle, spec.gameSetting, spec.background].filter(Boolean).join(' ').toLowerCase();
        const entries = Object.entries(THEME_PRESETS);
        const matched = entries
            .map(([id, theme]) => ({
                id,
                theme,
                score: theme.keywords.filter(keyword => text.includes(keyword)).length
            }))
            .sort((a, b) => b.score - a.score)[0];
        if (matched && matched.score > 0) return { id: matched.id, ...matched.theme };
        return { id: 'cyberpunk_neon', ...THEME_PRESETS.cyberpunk_neon };
    }

    function buildRuntimeProfile(template) {
        return {
            architecture: template.sourceArchitecture || 'p0-local-preview',
            specMode: template.specMode || 'single-game-spec',
            bootOrder: ['GameSettings', 'GameSpec', 'AssetManifest', 'ThemeRegistry', 'RuntimeSystems', 'CanvasPreview'],
            stateMachine: ['boot', 'loading', 'menu', 'playing', 'paused', 'game_over', 'complete'],
            updateRules: {
                fixedDeltaTime: true,
                noDomQueriesInUpdate: true,
                objectPoolingRequired: true,
                inputActionsOnly: true
            },
            systems: template.systems,
            collision: {
                layers: ['player', 'enemy', 'player_projectile', 'enemy_projectile', 'pickup', 'terrain', 'base'],
                matrix: [
                    ['player', 'enemy'],
                    ['player', 'enemy_projectile'],
                    ['player', 'pickup'],
                    ['enemy', 'player_projectile'],
                    ['base', 'enemy']
                ]
            }
        };
    }

    function buildContentProfile(template, spec, isTowerDefense, isBulletHell, productPlan = null) {
        const bulletPlan = isBulletHell ? normalizeBulletHellProductPlan(productPlan || spec.bulletHellProductPlan || {}, spec) : null;
        const bulletTuning = bulletPlan ? bulletPlan.difficultyTuning : {};
        const primaryWeapon = isTowerDefense ? 'turret_projectile' : (isBulletHell ? 'vulcan_focus_shot' : 'auto_arc_blade');
        const enemyType = isBulletHell ? 'pattern_drone' : (isTowerDefense ? 'lane_runner' : 'runner');
        const bossType = isBulletHell ? 'phase_boss' : 'stage_guardian';
        const enemyHp = isBulletHell ? Math.round(26 * (Number(bulletTuning.enemyHpMultiplier) || 1)) : 30;
        const enemyBulletSpeed = Math.round(170 * (Number(bulletTuning.bulletSpeedMultiplier) || 1));
        const waveInterval = isBulletHell ? Math.max(0.45, Number(bulletTuning.waveInterval) || 1.05) : (isTowerDefense ? 1.25 : 1.8);

        return {
            modules: template.contentModules || ['game', 'manifest'],
            map: {
                width: isBulletHell ? 600 : 1280,
                height: isBulletHell ? 800 : 720,
                worldWidth: isBulletHell ? 600 : (isTowerDefense ? 1280 : 4000),
                worldHeight: isBulletHell ? 800 : (isTowerDefense ? 720 : 4000),
                camera: isBulletHell ? 'fixed-vertical' : (isTowerDefense ? 'fixed-lane' : 'smooth-follow')
            },
            player: {
                enabled: !isTowerDefense,
                start: { x: isBulletHell ? 300 : 640, y: isBulletHell ? 700 : 360 },
                stats: {
                    maxHp: spec.difficultyLevel === 'Hard' || spec.difficultyLevel === 'Nightmare' ? 85 : 120,
                    speed: isBulletHell ? 230 : 220,
                    size: isBulletHell ? 14 : 28,
                    hitboxSize: isBulletHell ? 4 : 18,
                    invincibleTime: isBulletHell ? (Number(bulletTuning.invincibleTime) || 2) : 0.5,
                    lives: isBulletHell ? (Number(bulletTuning.lives) || 3) : 1,
                    shield: isBulletHell ? (Number(bulletTuning.shield) || 0) : 0
                },
                weapons: [primaryWeapon]
            },
            weapons: {
                [primaryWeapon]: {
                    name: primaryWeapon.replace(/_/g, ' '),
                    archetype: isTowerDefense ? 'projectile_turret' : (isBulletHell ? 'multi_projectile' : 'melee_arc'),
                    damage: isTowerDefense ? 18 : (isBulletHell ? 7 : 18),
                    attackInterval: isBulletHell ? 0.075 : (isTowerDefense ? 0.85 : 1.5),
                    range: isTowerDefense ? 320 : (isBulletHell ? 720 : 80),
                    levels: isBulletHell ? 6 : 6,
                    effects: [{ type: isBulletHell || isTowerDefense ? 'projectile' : 'melee_arc', params: { count: isBulletHell ? 2 : 1 } }]
                }
            },
            enemies: {
                [enemyType]: {
                    name: isBulletHell ? (bulletPlan.enemyTypes[0] || 'Pattern Drone') : (isTowerDefense ? 'Lane Runner' : 'Runner'),
                    hp: isBulletHell ? enemyHp : 30,
                    speed: isTowerDefense ? 95 : (isBulletHell ? 56 : 130),
                    size: isBulletHell ? 13 : 24,
                    damage: 8,
                    flags: isBulletHell ? ['shooter'] : [],
                    renderColor: isBulletHell ? (bulletPlan.artDirection.enemyPalette[0] || '#42A5FF') : null
                },
                [bossType]: {
                    name: isBulletHell ? bulletPlan.bossConfig.name : 'Stage Guardian',
                    hp: isBulletHell ? bulletPlan.bossConfig.hp : 800,
                    speed: isBulletHell ? 30 : 90,
                    size: isBulletHell ? 42 : 60,
                    flags: ['boss'],
                    phases: isBulletHell
                        ? bulletPlan.bossConfig.phases
                        : [],
                    renderColor: isBulletHell ? (bulletPlan.artDirection.enemyPalette[1] || bulletPlan.artDirection.uiToken || '#8A78FF') : null
                }
            },
            projectiles: isBulletHell
                ? {
                    enemyBulletTypes: {
                        basic: { speed: enemyBulletSpeed, damage: 10, size: 7 },
                        fast: { speed: Math.round(enemyBulletSpeed * 1.65), damage: 12, size: 5 },
                        large: { speed: Math.round(enemyBulletSpeed * 0.68), damage: 16, size: 12 }
                    },
                    colors: bulletPlan.artDirection.bulletColors,
                    playerBulletBudget: 220,
                    enemyBulletBudget: Number(bulletTuning.enemyBulletBudget) || 320
                }
                : {},
            waves: [{
                id: 'phase1',
                start: 0,
                end: isTowerDefense ? 240 : 300,
                interval: waveInterval,
                types: [enemyType],
                maxCount: isTowerDefense ? 36 : 60
            }],
            progression: isBulletHell
                ? {
                    summary: bulletPlan.progression,
                    maxPowerLevel: 6,
                    powerDrops: true,
                    bombRewards: true,
                    energyRewards: true,
                    shieldRewards: Number(bulletTuning.shield) > 0,
                    lifeRewards: Number(bulletTuning.lives) > 3
                }
                : {},
            productPlan: bulletPlan
        };
    }

    function buildGeneratedGameSpec(spec = getCurrentGameSpec(), decision = matchTemplate(spec)) {
        const template = TEMPLATE_CATALOG.find(item => item.id === decision.templateId) || TEMPLATE_CATALOG[0];
        const isTowerDefense = template.id === 'tower_defense';
        const isBulletHell = template.id === 'bullet_hell';
        const isRoguelike = template.id === 'roguelike_survival';
        const duration = isTowerDefense ? 240 : 300;
        const theme = inferThemePreset(spec);
        const productPlan = isBulletHell ? normalizeBulletHellProductPlan(decision.productPlan || spec.bulletHellProductPlan || {}, spec) : null;
        const content = buildContentProfile(template, spec, isTowerDefense, isBulletHell, productPlan);
        const primaryWeapon = Object.keys(content.weapons)[0];
        const enemyType = Object.keys(content.enemies).find(key => !content.enemies[key].flags.includes('boss')) || 'grunt';

        return {
            meta: {
                gameName: productPlan ? productPlan.gameName : `${spec.gameSetting || 'Custom'} ${template.label}`,
                gameType: productPlan ? 'bullet-hell' : template.type,
                version: 'p0-preview',
                description: productPlan ? productPlan.meta.description : (spec.background || 'Generated from one natural-language prompt.'),
                templateConfidence: Number(decision.confidence.toFixed(2)),
                sourceArchitectures: [template.sourceArchitecture || 'p0-local-preview'],
                prototypeSummary: productPlan ? productPlan.prototypeSummary : '',
                generatedAt: new Date().toISOString()
            },
            template: {
                id: template.id,
                label: productPlan ? 'Bullet Hell / Flying Shooter' : template.label,
                genre: productPlan ? 'bullet-hell' : template.type,
                confidence: Number(decision.confidence.toFixed(2)),
                matchReason: decision.reason,
                specMode: template.specMode,
                gameplayPillars: template.gameplayPillars || []
            },
            engine: {
                renderer: 'canvas',
                fixedDeltaTime: 1 / 60,
                maxEntityCount: isRoguelike ? 2000 : 800,
                mapSize: { width: content.map.width, height: content.map.height },
                runtimeProfile: buildRuntimeProfile(template)
            },
            settings: {
                priority: ['GameSettings', 'GameSpec', 'AssetManifest', 'RuntimeFallbacks'],
                debug: {
                    invincibleMode: false,
                    showHitboxes: false,
                    showFps: true,
                    logCollisions: false
                },
                coreRules: {
                    autoAttack: isBulletHell ? /auto[-\\s]?fire|auto[-\\s]?attack|automatic|always fire/i.test(spec.coreGameplay || '') : true,
                    defaultShootMode: isBulletHell ? (/manual|aim|click|space|trigger/i.test(spec.coreGameplay || '') ? 'manual' : 'auto') : 'auto',
                    lives: isBulletHell ? (content.player.stats.lives || 3) : 1,
                    bombClear: isBulletHell,
                    maxWeaponLevel: 6,
                    objectiveSeconds: duration
                },
                performance: {
                    maxEnemies: isRoguelike ? 2000 : 80,
                    maxPlayerProjectiles: isBulletHell ? 220 : 300,
                    maxEnemyProjectiles: isBulletHell ? 320 : 120,
                    maxParticles: 260,
                    spatialHashCellSize: isRoguelike ? 100 : null,
                    offscreenMargin: 80
                }
            },
            theme: {
                id: theme.id,
                label: theme.label,
                styleLock: theme.styleLock,
                uiTokens: productPlan
                    ? {
                        ...theme.uiTokens,
                        colors: {
                            ...(theme.uiTokens.colors || {}),
                            accent: productPlan.artDirection.uiToken,
                            projectilePrimary: productPlan.artDirection.bulletColors[0],
                            projectileSecondary: productPlan.artDirection.bulletColors[1],
                            enemyPrimary: productPlan.artDirection.enemyPalette[0],
                            enemyBoss: productPlan.artDirection.enemyPalette[1] || productPlan.artDirection.enemyPalette[0]
                        }
                    }
                    : theme.uiTokens,
                audio: {
                    bgm: { main: '' },
                    sfx: ['shoot', 'hit', 'pickup', 'level_up', 'boss', 'game_over']
                },
                balanceMultipliers: theme.balance,
                artPromptRules: [
                    'Reuse the selected style fingerprint for every asset.',
                    'Generate player, enemy, projectile, pickup, UI, and tile assets from one theme anchor.',
                    'Fallback canvas rendering is allowed only when assets are missing or still generating.'
                ]
            },
            systems: template.systems,
            input: {
                devices: ['keyboard', 'pointer', 'touch'],
                actions: {
                    moveLeft: ['ArrowLeft', 'KeyA'],
                    moveRight: ['ArrowRight', 'KeyD'],
                    moveUp: ['ArrowUp', 'KeyW'],
                    moveDown: ['ArrowDown', 'KeyS'],
                    focus: ['ShiftLeft', 'ShiftRight'],
                    shoot: isBulletHell ? ['Space', 'KeyZ'] : ['auto'],
                    bomb: isBulletHell ? ['KeyX'] : [],
                    pause: ['Escape'],
                    confirm: ['Enter']
                }
            },
            assets: {
                manifestPath: 'assets/manifest.json',
                fallback: 'canvas',
                requiredGroups: ['player', 'enemies', 'weapons', 'effects', 'ui', 'audio'],
                generationPrompts: productPlan ? {
                    artStyle: productPlan.artDirection.summary,
                    background: productPlan.artDirection.backgroundVisual,
                    enemyPalette: productPlan.artDirection.enemyPalette,
                    bulletColors: productPlan.artDirection.bulletColors,
                    uiToken: productPlan.artDirection.uiToken
                } : {},
                namingRules: {
                    player: 'asset_player_{id}_{state}_{frame}.png',
                    enemy: 'asset_enemy_{id}_{state}_{frame}.png',
                    weapon: 'asset_weapon_{id}_lv{level}.png',
                    effect: 'asset_effect_{id}.png',
                    ui: 'asset_ui_{component}.png'
                }
            },
            content,
            player: {
                enabled: content.player.enabled,
                components: {
                    position: content.player.start,
                    stats: content.player.stats,
                    input: {
                        controlScheme: 'wasd',
                        shootKey: isBulletHell ? 'space' : 'auto'
                    }
                },
                weapons: [{ type: primaryWeapon, config: { level: 1 } }]
            },
            enemies: {
                [enemyType]: {
                    name: content.enemies[enemyType].name,
                    components: {
                        stats: {
                            hp: content.enemies[enemyType].hp,
                            speed: content.enemies[enemyType].speed,
                            size: content.enemies[enemyType].size,
                            damage: content.enemies[enemyType].damage
                        },
                        render: { color: isBulletHell ? (content.enemies[enemyType].renderColor || '#42a5ff') : theme.uiTokens.colors.danger },
                        behavior: { type: isTowerDefense ? 'follow_path' : 'chase_player' }
                    },
                    spawnWeight: 1
                }
            },
            weapons: content.weapons,
            flow: {
                phases: productPlan
                    ? productPlan.waves.map((wave, index) => ({
                        id: wave.id || `wave-${index + 1}`,
                        name: wave.name || `Wave ${index + 1}`,
                        duration: index === productPlan.waves.length - 1 ? 90 : 45,
                        spawnRules: [{ enemyType, interval: Number(wave.interval) || content.waves[0].interval, maxCount: content.waves[0].maxCount, weight: 1 }],
                        nextPhase: index === productPlan.waves.length - 1 ? 'complete' : `wave-${index + 2}`
                    }))
                    : [{
                        id: 'phase1',
                        name: spec.playerGoal || 'Clear the prototype run',
                        duration,
                        spawnRules: [{ enemyType, interval: content.waves[0].interval, maxCount: content.waves[0].maxCount, weight: 1 }],
                        nextPhase: 'complete'
                    }],
                winCondition: {
                    type: isTowerDefense ? 'protect_base' : (isBulletHell ? 'defeat_boss' : 'survive_timer'),
                    description: productPlan ? productPlan.winCondition : (spec.playerGoal || 'Complete the primary objective.')
                },
                fallback: {
                    emailQueueEnabled: true,
                    maxValidationRetries: 3
                }
            },
            balance: {
                difficulty: spec.difficultyLevel || 'Normal',
                progression: spec.progressionSystem || 'Level-up choices',
                challenge: spec.mainChallenge || 'Escalating enemy pressure',
                hpScaling: isRoguelike ? { enabled: true, increasePerSecond: 0.01, maxMultiplier: 10 } : { enabled: false },
                drops: isBulletHell
                    ? {
                        powerPickupChance: 0.24,
                        bombPickupChance: 0.055,
                        energyPickupChance: 0.12,
                        shieldPickupChance: content.progression.shieldRewards ? 0.035 : 0,
                        lifePickupChance: content.progression.lifeRewards ? 0.018 : 0
                    }
                    : (isRoguelike ? { expPickupChance: 0.8, healthPickupChance: 0.05 } : {}),
                themeMultipliers: theme.balance
            },
            ui: {
                hud: [
                    { type: 'health', position: 'top-left' },
                    { type: 'objective', position: 'top-center' },
                    { type: isBulletHell ? 'bomb_energy' : 'level_progress', position: 'bottom-left' }
                ],
                theme: {
                    artStyle: spec.artStyle || theme.label,
                    tokens: theme.uiTokens
                }
            },
            qualityGates: {
                schemaValidation: true,
                manifestValidation: true,
                canvasPreviewMustBoot: true,
                inputSmokeTest: ['move', 'pause', isBulletHell ? 'shoot' : 'auto_attack'],
                fallbackQueueRequired: true,
                noCrashOnUnmatchedPrompt: true
            },
            runtimeOwnership: [
                'Template runtime owns state machine, input, collision, pause, restart, win, and fail states.',
                'Compiled project owns patched GameSpec/config/manifest files.',
                'Generated asset prompts stay routed through assets/manifest.json.',
                'Validation report must pass before showing playable preview as generated.'
            ]
        };
    }

    function buildGenerationPlan(spec = getCurrentGameSpec(), productionPlan = latestGamePlan) {
        const sourceSpec = bulletHellPlanState.confirmed && bulletHellPlanState.plan
            ? applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, spec)
            : applyProductionPlanToSpec(spec, productionPlan);
        let decision = matchTemplate(sourceSpec);
        const aiDecision = analysisState.templateDecision || null;
        const aiTemplateId = aiDecision && AUTO_GENERATION_TEMPLATE_IDS.has(aiDecision.templateId) ? aiDecision.templateId : '';
        const localCapability = detectCapabilityExceeded(getSpecIntentText(sourceSpec));
        if (!decision.canAutoGenerate && aiTemplateId && !localCapability.blocked) {
            const template = TEMPLATE_CATALOG.find(item => item.id === aiTemplateId);
            const isBullet = aiTemplateId === 'bullet_hell';
            decision = {
                canAutoGenerate: true,
                templateId: aiTemplateId,
                templateLabel: isBullet ? 'Bullet Hell / Flying Shooter' : (template ? template.label : aiTemplateId),
                templateGenre: isBullet ? 'bullet-hell' : 'roguelike-survival',
                normalizedGameType: isBullet ? 'Bullet Hell / Flying Shooter' : 'Roguelike Survival',
                locked: true,
                confidence: Math.min(0.98, Math.max(0.6, Number(aiDecision.confidence || decision.confidence || 0.8))),
                reason: aiDecision.reason || `AI selected ${template ? template.label : aiTemplateId}.`,
                fallbackMessage: '',
                candidates: template ? [{ ...template, confidence: Math.min(0.98, Math.max(0.6, Number(aiDecision.confidence || 0.8))), hits: ['ai-template-decision'], directHit: true }] : []
            };
        }
        const normalizedProductionPlan = bulletHellPlanState.confirmed && bulletHellPlanState.plan
            ? normalizeGamePlanForGeneration({
                title: bulletHellPlanState.plan.gameName,
                hook: bulletHellPlanState.plan.meta.description,
                storyPremise: bulletHellPlanState.plan.story,
                coreLoop: bulletHellPlanState.plan.coreGameplay,
                visualDirection: bulletHellPlanState.plan.artDirection.summary,
                enemyDesign: `${bulletHellPlanState.plan.enemyTypes.join(', ')}; Boss: ${bulletHellPlanState.plan.bossConfig.name}`,
                progressionPlan: bulletHellPlanState.plan.progression,
                playerFantasy: bulletHellPlanState.plan.winCondition,
                prototypeScope: bulletHellPlanState.plan.prototypeSummary
            }, sourceSpec)
            : (productionPlan ? normalizeGamePlanForGeneration(productionPlan, sourceSpec) : null);
        if (bulletHellPlanState.confirmed && bulletHellPlanState.plan && decision.templateId === 'bullet_hell') {
            decision.productPlan = normalizeBulletHellProductPlan(bulletHellPlanState.plan, sourceSpec);
            decision.templateGenre = 'bullet-hell';
            decision.normalizedGameType = 'Bullet Hell / Flying Shooter';
            decision.locked = true;
        }
        return {
            decision,
            productionPlan: normalizedProductionPlan,
            productionBrief: normalizedProductionPlan ? buildProductionBriefText(normalizedProductionPlan, sourceSpec) : '',
            generatedSpec: decision.canAutoGenerate ? buildGeneratedGameSpec(sourceSpec, decision) : null
        };
    }

    function buildTemplatePatchPromptSeed(spec, decision, productionPlan = null) {
        const isBulletHell = decision.templateId === 'bullet_hell';
        const normalizedPlan = productionPlan ? normalizeGamePlanForGeneration(productionPlan, spec) : null;
        const productionBrief = normalizedPlan ? buildProductionBriefText(normalizedPlan, spec) : '';
        const gameName = firstText(normalizedPlan && normalizedPlan.title, spec.gameSetting, isBulletHell ? 'Neon Bullet Storm' : 'Generated Roguelike Survival');
        const intentSummary = productionBrief || [
            spec.gameType,
            spec.gameSetting,
            spec.background,
            spec.coreGameplay,
            spec.playerGoal,
            spec.mainChallenge,
            spec.progressionSystem,
            spec.difficultyLevel
        ].filter(Boolean).join(' | ');
        const visualDirection = firstText(normalizedPlan && normalizedPlan.visualDirection, spec.artStyle, 'Readable 2D game art');
        const enemyDesign = firstText(normalizedPlan && normalizedPlan.enemyDesign, spec.mainChallenge, decision.templateLabel);
        const progressionPlan = firstText(normalizedPlan && normalizedPlan.progressionPlan, spec.progressionSystem, 'meaningful run upgrades');
        const coreLoop = firstText(normalizedPlan && normalizedPlan.coreLoop, spec.coreGameplay, decision.templateLabel);
        return {
            templateId: decision.templateId,
            userIntentSummary: intentSummary,
            productionPlan: normalizedPlan,
            productionBrief,
            gameName,
            settingsPatch: {
                difficulty: spec.difficultyLevel || 'Normal',
                    autoAttack: isBulletHell ? /auto[-\\s]?fire|auto[-\\s]?attack|automatic|always fire/i.test(spec.coreGameplay || '') : true,
                    defaultShootMode: isBulletHell ? (/manual|aim|click|space|trigger/i.test(spec.coreGameplay || '') ? 'manual' : 'auto') : 'auto',
            },
            specPatches: {
                meta: {
                    gameType: isBulletHell ? 'Bullet Hell / Flying Shooter' : 'Roguelike Survival',
                    description: firstText(normalizedPlan && normalizedPlan.hook, spec.background, ''),
                    storyPremise: normalizedPlan ? normalizedPlan.storyPremise : ''
                },
                flow: {
                    goal: firstText(spec.playerGoal, normalizedPlan && normalizedPlan.playerFantasy, ''),
                    coreLoop,
                    challenge: enemyDesign,
                    progression: progressionPlan,
                    prototypeScope: normalizedPlan ? normalizedPlan.prototypeScope : ''
                }
            },
            manifestPatch: {},
            stylePatch: {
                artStyle: spec.artStyle || '',
                setting: spec.gameSetting || '',
                visualDirection
            },
            assetPrompts: {
                'styleProofs.primary': `${visualDirection}. Style proof for ${gameName}; preserve readable gameplay silhouettes.`,
                'player.hero': `Player character for ${gameName}. Player fantasy: ${firstText(normalizedPlan && normalizedPlan.playerFantasy, spec.playerGoal, 'survive and win')}.`,
                'enemies.primary': `Enemy set for ${gameName}. Challenge design: ${enemyDesign}.`,
                'bosses.primary': `Boss or elite pressure for ${gameName}. Use this production brief: ${firstText(normalizedPlan && normalizedPlan.prototypeScope, enemyDesign)}.`,
                'map.primary': `Playable environment for ${gameName}. Story premise: ${firstText(normalizedPlan && normalizedPlan.storyPremise, spec.gameSetting, 'compact arena')}.`,
                'ui.hud': `HUD tokens for ${decision.templateLabel}. Show core loop and progression clearly: ${coreLoop}; ${progressionPlan}.`,
                'effects.primary': `Combat feedback effects for ${coreLoop}. Match visual direction: ${visualDirection}.`
            },
            requiresRuntimeCodePatch: false,
            runtimePatchReason: '',
            playabilityChecklist: [
                `Core loop applied to template config/spec: ${coreLoop}`,
                `Enemy and boss pressure represented through supported template tuning: ${enemyDesign}`,
                `Progression represented through supported upgrade/spec hooks: ${progressionPlan}`,
                'Template runtime owns state machine, input actions, collision, pause, restart, win and fail states.',
                'assets/manifest.json remains the single resource lookup layer.'
            ],
            aiGenerated: false
        };
    }

    async function generateTemplatePatchPlan(spec, decision, productionPlan = null) {
        const promptSeed = buildTemplatePatchPromptSeed(spec, decision, productionPlan);
        const parseAndValidateTemplatePatch = content => validateTemplatePatchPlan(extractModelJsonObject(content, 'Template patch generation'), decision);
        const repairTemplatePatchResponse = async (badContent, parseError, providerId, modelId) => {
            const repairResponse = await withTimeout(aiService.stageChat('/api/ai/generate-template-patch', [
                {
                    role: 'system',
                    content: `You repair malformed JSON for a TemplatePatchPlan. Return one valid JSON object only. No markdown, no prose, no code fences.
Required top-level keys: templateId, userIntentSummary, gameName, settingsPatch, specPatches, manifestPatch, stylePatch, assetPrompts, requiresRuntimeCodePatch, runtimePatchReason, playabilityChecklist.
Rules:
- Preserve the user's game intent and the previous patch content where possible.
- Fix missing commas, invalid quotes, trailing commas, and any non-JSON text.
- Do not output direct file patches, runtime patches, code patches, diffs, or source edits.
- Do not put raw line breaks inside JSON string values; keep strings concise.
- Output must parse with JSON.parse.`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        templateId: decision.templateId,
                        parseError: parseError && (parseError.technicalMessage || parseError.message || String(parseError)),
                        invalidOutput: String(badContent || '').slice(0, 18000),
                        requiredSpecModules: decision.templateId === 'bullet_hell'
                            ? ['coreRules', 'enemyTypes', 'enemyBulletTypes', 'bosses', 'waves', 'difficultyTuning']
                            : ['waves', 'enemies', 'weapons', 'balance', 'effects'],
                        suggestedStructure: {
                            settingsPatch: promptSeed.settingsPatch,
                            specPatches: promptSeed.specPatches,
                            manifestPatch: promptSeed.manifestPatch,
                            stylePatch: promptSeed.stylePatch,
                            assetPrompts: promptSeed.assetPrompts,
                            playabilityChecklist: promptSeed.playabilityChecklist
                        }
                    })
                }
            ], {
                provider: providerId,
                model: modelId,
                maxTokens: 3200,
                phase: 'Template patch JSON repair'
            }), AI_TEMPLATE_PATCH_TIMEOUT_MS, 'Template patch JSON repair');
            recordDiagnostic('ai-json-repair', {
                phase: 'Template patch generation',
                provider: providerId,
                model: modelId
            });
            return parseAndValidateTemplatePatch(repairResponse.content);
        };
        try {
            const activeModel = requireActiveAIModel('Template patch generation');
            const providerId = activeModel.providerId;
            const modelId = activeModel.modelId;
            const response = await withTimeout(aiService.stageChat('/api/ai/generate-template-patch', [
                {
                    role: 'system',
                    content: `You are generating a TemplatePatchPlan for an HTML5 game template. Return strict JSON only with these keys:
templateId, userIntentSummary, gameName, settingsPatch, specPatches, manifestPatch, stylePatch, assetPrompts, requiresRuntimeCodePatch, runtimePatchReason, playabilityChecklist.
Rules:
- Use runtime inheritance. Do not request runtime code patches unless template configuration/spec/manifest cannot express the user request.
- Treat productionPlan and productionBrief as the source of truth for this generation. Translate them into config/spec patches, asset prompts, enemies, progression, goals, and visual direction instead of merely naming the matched template.
- For bullet_hell, lock genre to bullet-hell and Game Type to Bullet Hell / Flying Shooter. specPatches must include coreRules, enemyTypes, enemyBulletTypes, bosses, waves, and difficultyTuning.
- For roguelike_survival, specPatches must include waves, enemies, weapons, balance, and effects. Keep wave, XP, upgrades, boss pressure, pause/restart/result runtime inherited.
- Do not output direct file patches, runtime patches, code patches, diffs, or source edits. Only use settingsPatch, specPatches, manifestPatch, stylePatch, assetPrompts.
- assets must be described through manifestPatch or assetPrompts, never direct paths in game.js.
- No markdown, no explanations, no code fences, no comments.
- Do not put raw line breaks inside string values. Keep every string concise and JSON-escaped.
- Every object property and array item must be comma-separated. Output must parse with JSON.parse.
- playabilityChecklist must include waves/progression, enemies/bosses, win/fail/restart, input actions, collision/object limits. ${getLanguageInstruction()}`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        templateId: decision.templateId,
                        templateLabel: decision.templateLabel,
                        userSpec: spec,
                        requestContext: buildAIRequestContext(spec.background || savedPrompt || ''),
                        productionPlan: promptSeed.productionPlan,
                        productionBrief: promptSeed.productionBrief || latestGamePlanDraft,
                        suggestedStructure: {
                            settingsPatch: promptSeed.settingsPatch,
                            specPatches: promptSeed.specPatches,
                            stylePatch: promptSeed.stylePatch,
                            assetPromptRoles: Object.keys(promptSeed.assetPrompts || {}),
                            playabilityChecklistTopics: promptSeed.playabilityChecklist
                        },
                        templateDefaults: {
                            entry: decision.templateId === 'bullet_hell' ? 'bullet_hell/spec/game.json' : 'Groglike-SOP/template-config.js + spec/*.json',
                            manifest: 'assets/manifest.json',
                            runtimePatchPolicy: 'manual-flow-if-required'
                        }
                    })
                }
            ], {
                provider: providerId,
                model: modelId,
                maxTokens: 3600,
                phase: 'Template patch generation'
            }), AI_TEMPLATE_PATCH_TIMEOUT_MS, 'Template patch generation');
            let parsed;
            try {
                parsed = parseAndValidateTemplatePatch(response.content);
            } catch (parseError) {
                if (parseError && parseError.code === 'MODEL_JSON_PARSE_FAILED') {
                    parsed = await repairTemplatePatchResponse(response.content, parseError, providerId, modelId);
                } else {
                    throw parseError;
                }
            }
            return {
                ...parsed,
                templateId: decision.templateId,
                productionPlan: promptSeed.productionPlan,
                productionBrief: promptSeed.productionBrief,
                aiGenerated: true,
                modelMeta: {
                    providerId,
                    modelId,
                    label: getModelLabel(providerId, response.model || modelId)
                }
            };
        } catch (error) {
            throw classifyAIFlowError(error, 'Template patch generation');
        }
    }

    async function compileTemplateProject(spec, decision, patchPlan) {
        const availabilityError = getTemplateAvailabilityError(decision);
        if (availabilityError) {
            throw createAIFlowError(
                'TEMPLATE_NOT_PUBLISHED',
                'template_compile_failure',
                'Backend template is not published',
                availabilityError,
                decision.templateId || '',
                ['manual_queue']
            );
        }
        const response = await fetch(apiUrl('/api/template-project/compile'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                templateId: decision.templateId,
                spec,
                patchPlan,
                gamePlanningDecision: analysisState.gamePlanningDecision || null,
                gameTemplateDecision: analysisState.templateDecision || null,
                templateDecision: analysisState.templateDecision || null,
                artSkillDecision: analysisState.artSkillDecision || null
            })
        });
        if (response.status === 404) {
            throw createAIFlowError(
                'TEMPLATE_COMPILE_FAILED',
                'template_compile_failure',
                'Template compile API is unavailable',
                'Template compile API returned 404. Restart the local backend so /api/template-project/compile is available, then retry generation.',
                'HTTP 404',
                ['retry', 'manual_queue']
            );
        }
        let data;
        try {
            data = await parseJsonResponse(response);
        } catch (error) {
            const backendCode = error.data && error.data.code;
            if (backendCode === 'PATCH_FILE_NOT_ALLOWED' || backendCode === 'PATCH_REQUIRES_RUNTIME_CODE') throw classifyAIFlowError(error, 'Template compile');
            throw createAIFlowError(
                'TEMPLATE_COMPILE_FAILED',
                'template_compile_failure',
                'Template compile failed',
                error.message || 'Template compile failed.',
                error.status ? `HTTP ${error.status}` : '',
                ['retry', 'manual_queue']
            );
        }
        return data.project || null;
    }

    async function ensureTemplateProject(plan, spec = getCurrentGameSpec()) {
        if (!plan || !plan.decision || !plan.decision.canAutoGenerate) return plan;
        if (!['bullet_hell', 'roguelike_survival'].includes(plan.decision.templateId)) return plan;
        if (plan.generatedProject) return plan;
        const sourceSpec = plan.decision.productPlan && plan.decision.templateId === 'bullet_hell'
            ? applyBulletHellPlanToGeneratedSpec(plan.decision.productPlan, spec)
            : applyProductionPlanToSpec(spec, plan.productionPlan || latestGamePlan);
        const patchPlan = await generateTemplatePatchPlan(sourceSpec, plan.decision, plan.productionPlan || latestGamePlan);
        if (patchPlan.requiresRuntimeCodePatch) {
            throw createAIFlowError(
                'PATCH_REQUIRES_RUNTIME_CODE',
                'template_compile_failure',
                'Template patch needs runtime code',
                patchPlan.runtimePatchReason || 'The selected template needs runtime code changes, so this request must enter the manual production flow.',
                '',
                ['retry', 'manual_queue']
            );
        }
        const project = await compileTemplateProject(sourceSpec, plan.decision, patchPlan);
        plan.templatePatchPlan = patchPlan;
        plan.generatedProject = project;
        return plan;
    }

    function buildEnhancedPlanHtml(plan) {
        return [
            `<div class="summary-title">${escapeHtml(t('detailedConcept'))}</div>`,
            `<div class="summary-name">${escapeHtml(plan.title)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('hook'))}:</strong> ${escapeHtml(plan.hook)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('storyPremise'))}:</strong> ${escapeHtml(plan.storyPremise)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('coreLoop'))}:</strong> ${escapeHtml(plan.coreLoop)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('momentToMoment'))}:</strong> ${escapeHtml(plan.momentToMoment)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('visualDirection'))}:</strong> ${escapeHtml(plan.visualDirection)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('enemyDesign'))}:</strong> ${escapeHtml(plan.enemyDesign)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('progressionPlan'))}:</strong> ${escapeHtml(plan.progressionPlan)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('playerFantasy'))}:</strong> ${escapeHtml(plan.playerFantasy)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('prototypeScope'))}:</strong> ${escapeHtml(plan.prototypeScope)}</div>`
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
            prototypeScope: plan.prototypeScope || 'Build one compact playable loop with win, fail, pause, and restart states.'
        };
        latestGamePlan = normalizeGamePlanForGeneration(safePlan, getCurrentGameSpec());
        latestGamePlanDraft = buildGamePlanDraftText(latestGamePlan);

        return [
            '<div class="selection-summary ai-plan-summary">',
            buildEnhancedPlanHtml(latestGamePlan),
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
        createBtn.innerHTML = t('create');
        createBtn.addEventListener('click', () => {
            createBtn.classList.add('selected');
            container.style.display = 'none';
            composeAndReturn();
        });

        const waitBtn = document.createElement('button');
        waitBtn.className = 'chat-action-btn chat-action-edit';
        waitBtn.innerHTML = t('addMore');
        waitBtn.addEventListener('click', () => {
            waitBtn.classList.add('selected');
            container.style.display = 'none';
            analysisState.revisionMode = true;

            const summaryText = latestGamePlanDraft || buildGamePlanDraftText();

            if (chatInputField) {
                setChatInputValue(summaryText, { focus: false });
                setTimeout(() => {
                    chatInputField.focus();
                    const len = chatInputField.value.length;
                    chatInputField.setSelectionRange(len, len);
                }, 100);
            }
            addBotMessage(t('editFilled'));
        });

        const newIdeaBtn = document.createElement('button');
        newIdeaBtn.className = 'chat-action-btn chat-action-exit';
        newIdeaBtn.innerHTML = t('exitNewIdea');
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

        const params = new URLSearchParams(window.location.search);
        if (params.get('autorun') === '1' && params.get('testPrompt') && !window.__e2eFinalActionAutoConfirmed) {
            window.__e2eFinalActionAutoConfirmed = true;
            regTimeout(() => {
                createBtn.classList.add('selected');
                createBtn.disabled = true;
                container.style.display = 'none';
                composeAndReturn();
            }, 500);
        }
    }

    function estimateGeneratedJsLines(generated) {
        const specLines = JSON.stringify(generated, null, 2).split('\n').length;
        return Math.max(220, specLines + 140);
    }

    const GAME_EDIT_MODULES = [
        {
            id: 'stats',
            label: 'Stats',
            sections: [
                {
                    id: 'combat',
                    label: 'Combat & Rules',
                    helper: 'Game balance and combat tuning.',
                    items: [
                        { id: 'combat.fireRate', title: 'Fire Rate', type: 'number', meta: 'Attack cooldown' },
                        { id: 'combat.damage', title: 'Damage', type: 'number', meta: 'Hit power' },
                        { id: 'combat.range', title: 'Range', type: 'number', meta: 'Attack reach' },
                        { id: 'combat.enemyHp', title: 'Enemy HP', type: 'number', meta: 'Enemy durability' },
                        { id: 'combat.enemySpeed', title: 'Enemy Speed', type: 'number', meta: 'Pressure' },
                        { id: 'combat.wave', title: 'Wave Difficulty', type: 'number', meta: 'Spawn curve' }
                    ]
                },
                {
                    id: 'output',
                    label: 'Output & Runtime',
                    helper: 'Game identity, model, output, and runtime status.',
                    items: [
                        { id: 'output.name', title: 'Game Name', type: 'text', meta: 'Title' },
                        { id: 'output.summary', title: 'Description', type: 'text', meta: 'Pitch' },
                        { id: 'output.model', title: 'Model Used', type: 'text', meta: 'AI model' },
                        { id: 'output.type', title: 'Output Type', type: 'text', meta: 'Web game' },
                        { id: 'output.performance', title: 'Performance', type: 'number', meta: 'FPS target' },
                        { id: 'output.version', title: 'Version', type: 'text', meta: 'Edit state' }
                    ]
                }
            ]
        },
        {
            id: 'media',
            label: 'Media',
            sections: [
                {
                    id: 'visual',
                    label: 'Visual Style',
                    helper: 'map/main, map/obstacles, UI, icons, skills, and pickups.',
                    items: [
                        { id: 'visual.mapMain', title: 'map/main', type: 'image', meta: 'assets/map/main', count: 5 },
                        { id: 'visual.mapObstacles', title: 'map/obstacles', type: 'image', meta: 'assets/map/obstacles', count: 5 },
                        { id: 'visual.ui', title: 'ui', type: 'image', meta: 'assets/ui', count: 12 },
                        { id: 'visual.weaponIcons', title: 'weapons/icons', type: 'image', meta: 'assets/weapons/icons', count: 5 },
                        { id: 'visual.skills', title: 'skills', type: 'image', meta: 'assets/skills', count: 5 },
                        { id: 'visual.pickups', title: 'pickups', type: 'image', meta: 'assets/pickups', count: 5 }
                    ]
                },
                {
                    id: 'art',
                    label: 'Game Art',
                    helper: 'Runtime sprites, attack art, enemies, bosses, and minibosses.',
                    items: [
                        { id: 'art.player', title: 'player/runtime', type: 'image', meta: 'assets/player/runtime', count: 6 },
                        { id: 'art.weaponAttacks', title: 'weapons/attacks', type: 'image', meta: 'assets/weapons/attacks', count: 6 },
                        { id: 'art.enemies', title: 'enemies', type: 'image', meta: 'assets/enemies', count: 8 },
                        { id: 'art.bosses', title: 'bosses', type: 'image', meta: 'assets/bosses', count: 3 },
                        { id: 'art.minibosses', title: 'minibosses', type: 'image', meta: 'assets/minibosses', count: 4 }
                    ]
                },
                {
                    id: 'audio',
                    label: 'Audio & Feel',
                    helper: 'Current effects and future audio/** resources.',
                    items: [
                        { id: 'audio.effects', title: 'effects', type: 'audio', meta: 'assets/effects', count: 5 },
                        { id: 'audio.future', title: 'audio/**', type: 'audio', meta: 'reserved for future audio', count: 0 }
                    ]
                }
            ]
        },
        {
            id: 'code',
            label: 'Code',
            sections: []
        },
        {
            id: 'tools',
            label: 'Tools',
            sections: []
        }
    ];
    const GAME_EDIT_CATEGORIES = GAME_EDIT_MODULES.flatMap(module => module.sections);
    const DROI_GAME_TOOL_PROTOCOL = 'droi-game-tool/v1';
    const DROI_GAME_TOOL_URL_PARAM = new URLSearchParams(window.location.search).get('toolUrl');
    const DROI_GAME_TOOL_BASE_URL = DROI_GAME_TOOL_URL_PARAM || window.DROI_GAME_TOOL_URL || (
        ['127.0.0.1', 'localhost'].includes(window.location.hostname)
            ? 'http://127.0.0.1:5173'
            : 'http://127.0.0.1:5173'
    );
    const DROI_GAME_TOOL_EMBED_AVAILABLE = window.DROI_GAME_TOOL_EMBED_ENABLED === true
        || new URLSearchParams(window.location.search).get('tools') === '1'
        || ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    const DROI_GAME_TOOLS = [
        { id: 'map-studio', title: 'Map Studio', description: 'Map stitching and background extension for Visual Style / map.' },
        { id: 'obstacle-painter', title: 'Obstacle Painter', description: 'Obstacle grid and collision layout editing.' },
        { id: 'image-process', title: 'Image Process', description: 'Crop, resize, matte, outline, and transparent PNG export.' },
        { id: 'character-action', title: 'Character Action', description: 'Character frame/action pack composition.' }
    ];
    const WORKSPACE_NUMERIC_SETTINGS = {
        'combat.fireRate': {
            label: 'Fire Rate',
            helper: 'Lower cooldown means faster auto-fire.',
            min: 0.08,
            max: 1.5,
            step: 0.01,
            defaultValue: 0.55,
            runtimeKey: 'fireRate',
            easy: 0.72,
            normal: 0.55,
            hard: 0.32,
            format: value => `${Number(value).toFixed(2)}s`
        },
        'combat.damage': {
            label: 'Damage',
            helper: 'Bullet hit power applied by the preview runtime.',
            min: 4,
            max: 80,
            step: 1,
            defaultValue: 18,
            runtimeKey: 'damage',
            easy: 26,
            normal: 18,
            hard: 12,
            format: value => `${Math.round(Number(value))}`
        },
        'combat.range': {
            label: 'Attack Range',
            helper: 'Target acquisition range for auto-fire.',
            min: 120,
            max: 760,
            step: 10,
            defaultValue: 420,
            runtimeKey: 'range',
            easy: 560,
            normal: 420,
            hard: 280,
            format: value => `${Math.round(Number(value))}px`
        },
        'combat.enemyHp': {
            label: 'Enemy HP',
            helper: 'Enemy durability multiplier.',
            min: 0.5,
            max: 2,
            step: 0.05,
            defaultValue: 1,
            runtimeKey: 'enemyHpMultiplier',
            easy: 0.75,
            normal: 1,
            hard: 1.35,
            format: value => `${Number(value).toFixed(2)}x`
        },
        'combat.enemySpeed': {
            label: 'Enemy Speed',
            helper: 'Movement pressure multiplier.',
            min: 0.45,
            max: 2.4,
            step: 0.05,
            defaultValue: 1,
            runtimeKey: 'enemySpeedMultiplier',
            easy: 0.75,
            normal: 1,
            hard: 1.35,
            format: value => `${Number(value).toFixed(2)}x`
        },
        'combat.wave': {
            label: 'Wave Intensity',
            helper: 'Spawn pressure multiplier.',
            min: 0.5,
            max: 2,
            step: 0.05,
            defaultValue: 1,
            runtimeKey: 'waveMultiplier',
            easy: 0.75,
            normal: 1,
            hard: 1.3,
            format: value => `${Number(value).toFixed(2)}x`
        },
        'output.performance': {
            label: 'Target FPS',
            helper: 'Runtime performance target stored as a patch.',
            min: 30,
            max: 120,
            step: 5,
            defaultValue: 60,
            runtimeKey: 'targetFps',
            easy: 60,
            normal: 60,
            hard: 90,
            format: value => `${Math.round(Number(value))} FPS`
        }
    };
    const WORKSPACE_MEDIA_STRUCTURE = [
        {
            id: 'visual',
            label: 'Visual Style',
            helper: 'Style proofs, maps, player look, portal and environment art.',
            categories: [
                { id: 'maps', label: 'Maps', path: 'assets/Visual Style/map', targetItemId: 'visual.mapMain', tools: ['map-studio', 'image-process'] },
                { id: 'player', label: 'Player', path: 'assets/Visual Style/player', targetItemId: 'art.player', tools: ['image-process', 'character-action'] },
                { id: 'portal', label: 'Portal', path: 'assets/Visual Style/portal', targetItemId: 'visual.portal', tools: ['image-process'] },
                { id: 'styleProofs', label: 'Style Proofs', path: 'assets/Visual Style/style-proofs', targetItemId: 'visual.styleProofs', tools: ['image-process'] }
            ]
        },
        {
            id: 'art',
            label: 'Game Art',
            helper: 'Runtime objects: enemies, bosses, weapons, pickups, skills and map objects.',
            categories: [
                { id: 'enemies', label: 'Enemies', path: 'assets/Game Art/enemies', targetItemId: 'art.enemies', tools: ['image-process', 'character-action'] },
                { id: 'bosses', label: 'Bosses', path: 'assets/Game Art/bosses', targetItemId: 'art.bosses', tools: ['image-process', 'character-action'] },
                { id: 'weapons', label: 'Weapons', path: 'assets/Game Art/weapons', targetItemId: 'visual.weaponIcons', tools: ['image-process'] },
                { id: 'pickups', label: 'Pickups', path: 'assets/Game Art/pickups', targetItemId: 'visual.pickups', tools: ['image-process'] },
                { id: 'skills', label: 'Skills', path: 'assets/Game Art/skills', targetItemId: 'visual.skills', tools: ['image-process'] }
            ]
        },
        {
            id: 'ui',
            label: 'Ui Art',
            helper: 'Opening, HUD, run entry, buttons and panels.',
            categories: [
                { id: 'opening', label: 'Opening', path: 'assets/Ui Art/opening', targetItemId: 'visual.ui', tools: ['image-process'] },
                { id: 'runEntry', label: 'Run Entry', path: 'assets/Ui Art/run-entry', targetItemId: 'visual.ui', tools: ['image-process'] }
            ]
        },
        {
            id: 'feel',
            label: 'Audio & Feel',
            helper: 'Audio, hit effects and feedback resources.',
            categories: [
                { id: 'effects', label: 'Effects', path: 'assets/Audio & Feel/effects', targetItemId: 'audio.effects', tools: ['image-process'] },
                { id: 'audio', label: 'Audio', path: 'assets/Audio & Feel/audio', targetItemId: 'audio.future', tools: [] }
            ]
        }
    ];

    function clampWorkspaceNumber(value, min, max) {
        const number = Number(value);
        if (!Number.isFinite(number)) return min;
        return Math.max(min, Math.min(max, number));
    }

    function getWorkspaceState(workspace) {
        if (!workspace.__state) {
            workspace.__state = {
                mode: 'beginner',
                historyVersion: 1,
                numericValues: {},
                pendingRuntimePatches: [],
                toolArtifacts: [],
                selectedMediaKey: '',
                selectedMediaAssetId: '',
                mediaImagesCollapsed: false,
                saveWarnings: []
            };
        }
        return workspace.__state;
    }

    function findWorkspaceRuntime(workspace) {
        const owner = workspace && (workspace.__container || workspace.closest('.has-game-workspace') || workspace.parentElement);
        return owner && owner.__gameEditRuntime ? owner.__gameEditRuntime : null;
    }

    function workspaceNumericValue(workspace, itemId) {
        const state = getWorkspaceState(workspace);
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!setting) return 0;
        if (Number.isFinite(Number(state.numericValues[itemId]))) return Number(state.numericValues[itemId]);
        const runtime = findWorkspaceRuntime(workspace);
        const config = runtime && runtime.getConfig ? runtime.getConfig() : {};
        if (Number.isFinite(Number(config[setting.runtimeKey]))) return Number(config[setting.runtimeKey]);
        return setting.defaultValue;
    }

    function normalizeWorkspacePath(path = '') {
        return String(path || '').replace(/\\/g, '/').replace(/^\/+/, '');
    }

    function fileExtension(path = '') {
        const match = String(path).toLowerCase().match(/\.([a-z0-9]+)(?:[?#].*)?$/);
        return match ? match[1] : '';
    }

    function isTextWorkspaceFile(path = '') {
        return ['html', 'js', 'css', 'json', 'md', 'txt', 'svg'].includes(fileExtension(path));
    }

    function workspaceFileBadge(path = '') {
        const ext = fileExtension(path);
        if (ext === 'html') return 'H5';
        if (ext === 'js') return 'JS';
        if (ext === 'css') return 'CSS';
        if (ext === 'json') return 'JSON';
        if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return 'IMG';
        if (['mp3', 'wav', 'ogg'].includes(ext)) return 'AUD';
        if (ext === 'md') return 'MD';
        return 'FIL';
    }

    function droiGameToolUrl(toolId, projectId = 'droi-workspace') {
        const base = DROI_GAME_TOOL_BASE_URL.replace(/\/+$/, '');
        const url = new URL(`${base}/tool/${encodeURIComponent(toolId)}`);
        url.searchParams.set('embed', '1');
        url.searchParams.set('projectId', projectId);
        return url.toString();
    }

    function buildWorkspaceNumericPanelHtml() {
        const numericIds = Object.keys(WORKSPACE_NUMERIC_SETTINGS);
        return `
            <section class="workspace-numeric-panel" data-workspace-numeric-panel>
                <div class="workspace-numeric-head">
                    <div>
                        <strong>Direct numeric controls</strong>
                        <small>Drag to preview. Apply, Reset, or presets create version history and export patches.</small>
                    </div>
                    <span>${numericIds.length}</span>
                </div>
                <div class="workspace-numeric-grid">
                    ${numericIds.map(itemId => {
                        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
                        return `
                            <article class="workspace-numeric-card${itemId === 'combat.enemySpeed' ? ' selected' : ''}" data-numeric-control="${escapeHtml(itemId)}" data-edit-item="${escapeHtml(itemId)}" data-edit-category-id="${escapeHtml(itemId.startsWith('output.') ? 'output' : 'combat')}" data-edit-type="number" data-edit-title="${escapeHtml(setting.label)}">
                                <div class="workspace-numeric-card-head">
                                    <div>
                                        <strong>${escapeHtml(setting.label)}</strong>
                                        <small>${escapeHtml(setting.helper)}</small>
                                    </div>
                                    <output data-numeric-output="${escapeHtml(itemId)}">${escapeHtml(setting.format(setting.defaultValue))}</output>
                                </div>
                                <div class="workspace-numeric-row">
                                    <input type="range" min="${setting.min}" max="${setting.max}" step="${setting.step}" value="${setting.defaultValue}" data-numeric-range="${escapeHtml(itemId)}">
                                    <input type="number" min="${setting.min}" max="${setting.max}" step="${setting.step}" value="${setting.defaultValue}" data-numeric-number="${escapeHtml(itemId)}">
                                </div>
                                <div class="workspace-numeric-presets" aria-label="${escapeHtml(setting.label)} presets">
                                    <button type="button" data-numeric-preset="${escapeHtml(itemId)}" data-preset-value="${setting.easy}">Easy</button>
                                    <button type="button" data-numeric-preset="${escapeHtml(itemId)}" data-preset-value="${setting.normal}">Normal</button>
                                    <button type="button" data-numeric-preset="${escapeHtml(itemId)}" data-preset-value="${setting.hard}">Hard</button>
                                </div>
                                <div class="workspace-numeric-actions">
                                    <button type="button" data-numeric-reset="${escapeHtml(itemId)}">Reset</button>
                                    <button type="button" data-numeric-prompt="${escapeHtml(itemId)}">Prompt</button>
                                    <button type="button" class="primary" data-numeric-apply="${escapeHtml(itemId)}">Apply</button>
                                </div>
                            </article>
                        `;
                    }).join('')}
                </div>
            </section>
        `;
    }

    function findMediaCategory(key) {
        for (const group of WORKSPACE_MEDIA_STRUCTURE) {
            for (const category of group.categories) {
                const candidate = `${group.id}.${category.id}`;
                if (candidate === key) return { group, category, key: candidate };
            }
        }
        return null;
    }

    function classifyMediaGroup(path = '') {
        const normalized = normalizeWorkspacePath(path).toLowerCase();
        if (normalized.includes('assets/visual style/')) return 'visual';
        if (normalized.includes('assets/game art/')) return 'art';
        if (normalized.includes('assets/ui art/')) return 'ui';
        if (normalized.includes('assets/audio & feel/')) return 'feel';
        return '';
    }

    function collectWorkspaceMediaAssets(project, workspace) {
        const state = workspace ? getWorkspaceState(workspace) : { toolArtifacts: [] };
        const rows = [];
        const pushRow = row => {
            const path = normalizeWorkspacePath(row.path || row.src || row.url || row.file || row.name || '');
            if (!path || path.endsWith('/.gitkeep') || path.includes('/_archive/')) return;
            const groupId = row.groupId || classifyMediaGroup(path);
            const matched = WORKSPACE_MEDIA_STRUCTURE.flatMap(group => group.categories.map(category => ({ group, category })))
                .find(entry => groupId === entry.group.id && path.toLowerCase().startsWith(entry.category.path.toLowerCase()));
            const categoryKey = row.categoryKey || (matched ? `${matched.group.id}.${matched.category.id}` : '');
            if (!categoryKey) return;
            rows.push({
                id: row.id || `${categoryKey}:${path}:${rows.length}`,
                categoryKey,
                groupId,
                path,
                file: row.file || path.split('/').pop(),
                url: row.url || row.dataUrl || '',
                status: row.status || 'asset',
                binding: row.binding || row.usage || row.manifestKey || '',
                source: row.source || 'project'
            });
        };

        if (project && project.assetSidebar && Array.isArray(project.assetSidebar.groups)) {
            project.assetSidebar.groups.forEach(group => {
                (group.categories || []).forEach(category => {
                    (category.items || []).forEach(item => pushRow({
                        path: item.src || item.path || item.file || item.manifestKey,
                        file: item.file,
                        status: item.status || 'manifest',
                        binding: item.usage || item.prompt || item.manifestKey,
                        source: 'manifest'
                    }));
                });
            });
        }
        if (project && Array.isArray(project.files)) {
            project.files.forEach(file => pushRow({
                path: file.path,
                status: file.kind || 'file',
                source: 'generated-files'
            }));
        }
        (state.toolArtifacts || []).forEach((artifact, index) => {
            (artifact.files || []).forEach(file => {
                const target = artifact.metadata && artifact.metadata.targetAssetPath ? artifact.metadata.targetAssetPath : '';
                pushRow({
                    id: `artifact:${index}:${file.name || file.path || 'asset'}`,
                    path: normalizeWorkspacePath(file.path || (target ? `${target}/${file.name || 'tool-artifact.png'}` : file.name)),
                    file: file.name,
                    url: file.dataUrl || file.url || '',
                    status: 'tool-export',
                    binding: artifact.metadata && artifact.metadata.targetItemId,
                    source: artifact.toolId || 'tool'
                });
            });
        });
        return rows;
    }

    function buildWorkspaceMediaPanelHtml(project = null, state = {}) {
        const selected = state.selectedMediaKey ? findMediaCategory(state.selectedMediaKey) : null;
        const assets = collectWorkspaceMediaAssets(project, state.__workspace || null);
        if (selected) {
            const items = assets.filter(asset => asset.categoryKey === selected.key);
            return `
                <section class="workspace-media-panel" data-workspace-media-panel>
                    <div class="workspace-media-detail-head">
                        <button type="button" class="workspace-header-btn is-muted" data-media-back>Back</button>
                        <div>
                            <strong>${escapeHtml(selected.category.label)}</strong>
                            <small>${escapeHtml(selected.category.path)}</small>
                        </div>
                        <span>${items.length}</span>
                    </div>
                    ${items.length ? `
                        <div class="workspace-media-asset-grid">
                            ${items.map(asset => `
                                <article class="workspace-media-asset${asset.id === state.selectedMediaAssetId ? ' selected' : ''}" data-media-asset="${escapeHtml(asset.id)}">
                                    <button type="button" class="workspace-media-asset-main" data-media-select="${escapeHtml(asset.id)}">
                                        <span class="workspace-media-thumb${fileExtension(asset.path).match(/mp3|wav|ogg/) ? ' audio' : ''}">
                                            ${asset.url && fileExtension(asset.path).match(/png|jpg|jpeg|webp|gif|svg/) ? `<img src="${escapeHtml(asset.url)}" alt="">` : `<b>${escapeHtml(workspaceFileBadge(asset.path))}</b>`}
                                        </span>
                                        <span>
                                            <strong>${escapeHtml(asset.file || 'asset')}</strong>
                                            <small>${escapeHtml(asset.path)}</small>
                                        </span>
                                    </button>
                                    <div class="workspace-media-asset-actions">
                                        <button type="button" data-media-replace="${escapeHtml(asset.id)}">Replace</button>
                                        <button type="button" data-media-copy="${escapeHtml(asset.path)}">Copy path</button>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    ` : '<div class="workspace-media-empty"><strong>Empty</strong><small>No real assets found in this category yet. Use Replace to create one with Droi-Game-Tool.</small></div>'}
                </section>
            `;
        }
        return `
            <section class="workspace-media-panel" data-workspace-media-panel>
                <div class="workspace-media-head">
                    <div>
                        <strong>Media asset browser</strong>
                        <small>Browse real four-domain assets. Empty categories stay empty instead of showing mock assets.</small>
                    </div>
                    <span>${assets.length}</span>
                </div>
                <div class="workspace-media-group-list">
                    ${WORKSPACE_MEDIA_STRUCTURE.map(group => `
                        <section class="workspace-media-group">
                            <header>
                                <div>
                                    <strong>${escapeHtml(group.label)}</strong>
                                    <small>${escapeHtml(group.helper)}</small>
                                </div>
                                <span>${assets.filter(asset => asset.groupId === group.id).length}</span>
                            </header>
                            <div class="workspace-media-category-grid">
                                ${group.categories.map(category => {
                                    const key = `${group.id}.${category.id}`;
                                    const count = assets.filter(asset => asset.categoryKey === key).length;
                                    return `
                                        <button type="button" class="workspace-media-category-card" data-media-category="${escapeHtml(key)}" data-edit-item="${escapeHtml(category.targetItemId)}" data-edit-category-id="${escapeHtml(group.id)}" data-edit-type="image" data-edit-title="${escapeHtml(category.label)}">
                                            <strong>${escapeHtml(category.label)}</strong>
                                            <small>${escapeHtml(category.path)}</small>
                                            <span>${count}</span>
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                        </section>
                    `).join('')}
                </div>
            </section>
        `;
    }

    function buildWorkspaceCodeFiles(project = null, generated = null, workspace = null) {
        const files = [];
        const addFile = file => {
            const path = normalizeWorkspacePath(file.path || file.name || '');
            if (!path || path.endsWith('/.gitkeep')) return;
            const content = typeof file.content === 'string'
                ? file.content
                : (typeof file.text === 'string' ? file.text : '');
            files.push({
                path,
                language: file.language || fileExtension(path) || 'file',
                kind: file.kind || (path.startsWith('assets/') ? 'asset' : 'source'),
                content,
                size: file.size || (content ? content.length : 0),
                text: isTextWorkspaceFile(path)
            });
        };
        if (project && Array.isArray(project.codeFiles)) project.codeFiles.forEach(addFile);
        if (project && Array.isArray(project.files)) project.files.forEach(addFile);
        if (!files.some(file => file.path === 'index.html')) {
            addFile({
                path: 'index.html',
                language: 'html',
                kind: 'source',
                content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${generated && generated.meta ? generated.meta.gameName : 'Generated Canvas Game'}</title>
</head>
<body>
  <canvas id="game"></canvas>
  <script src="./game.js"></script>
</body>
</html>`
            });
        }
        if (!files.some(file => file.path === 'game.js')) {
            addFile({
                path: 'game.js',
                language: 'js',
                kind: 'runtime',
                content: `// Generated game runtime preview.
// Real uploaded-template projects may hydrate this file from the backend preview URL.
const GAME_TITLE = ${JSON.stringify(generated && generated.meta ? generated.meta.gameName : 'Generated Canvas Game')};
console.log('Droi generated game:', GAME_TITLE);`
            });
        }
        if (!files.some(file => file.path === 'GameSettings.js')) {
            addFile({
                path: 'GameSettings.js',
                language: 'js',
                kind: 'config',
                content: `window.GameSettings = ${JSON.stringify({
                    title: generated && generated.meta ? generated.meta.gameName : 'Generated Canvas Game',
                    editable: true
                }, null, 2)};`
            });
        }
        if (generated && !files.some(file => file.path === 'spec/game.json')) {
            addFile({ path: 'spec/game.json', language: 'json', kind: 'spec', content: JSON.stringify(generated, null, 2) });
        }
        if (!files.some(file => file.path === 'assets/manifest.json')) {
            const assetRows = collectWorkspaceMediaAssets(project, workspace);
            addFile({
                path: 'assets/manifest.json',
                language: 'json',
                kind: 'manifest',
                content: JSON.stringify({
                    assetArchitecture: ['Audio & Feel', 'Game Art', 'Ui Art', 'Visual Style'],
                    assets: assetRows.map(asset => ({ path: asset.path, status: asset.status, binding: asset.binding }))
                }, null, 2)
            });
        }
        if (!files.some(file => file.path === 'generation-report.json')) {
            addFile({
                path: 'generation-report.json',
                language: 'json',
                kind: 'report',
                content: JSON.stringify({
                    generatedAt: new Date().toISOString(),
                    title: generated && generated.meta ? generated.meta.gameName : 'Generated Canvas Game',
                    workspace: 'Droi AI Game Editor'
                }, null, 2)
            });
        }
        const unique = new Map();
        files.forEach(file => unique.set(file.path, file));
        return Array.from(unique.values()).sort((a, b) => a.path.localeCompare(b.path));
    }

    function ensureGeneratedProjectCodeFiles(plan) {
        if (!plan.generatedProject) plan.generatedProject = {};
        if (!Array.isArray(plan.generatedProject.codeFiles)) plan.generatedProject.codeFiles = [];
        return plan.generatedProject.codeFiles;
    }

    function readGeneratedProjectCodeFile(plan, path) {
        const normalized = normalizeWorkspacePath(path);
        const files = buildWorkspaceCodeFiles(plan && plan.generatedProject, plan && plan.generatedSpec, null);
        return files.find(file => file.path === normalized) || null;
    }

    function upsertGeneratedProjectCodeFile(plan, path, content, options = {}) {
        const normalized = normalizeWorkspacePath(path);
        const files = ensureGeneratedProjectCodeFiles(plan);
        const existing = files.find(file => normalizeWorkspacePath(file.path || file.name || '') === normalized);
        const next = {
            path: normalized,
            language: options.language || fileExtension(normalized) || 'txt',
            kind: options.kind || (normalized.startsWith('assets/') ? 'asset' : 'source'),
            content: String(content == null ? '' : content),
            size: String(content == null ? '' : content).length
        };
        if (existing) Object.assign(existing, next);
        else files.push(next);
        return next;
    }

    function parseWorkspaceJsonContent(content, fallback = {}) {
        if (!content) return JSON.parse(JSON.stringify(fallback));
        try {
            return JSON.parse(content);
        } catch (_) {
            return JSON.parse(JSON.stringify(fallback));
        }
    }

    function appendWorkspaceEditEntry(target, entry) {
        if (!Array.isArray(target.workspaceEdits)) target.workspaceEdits = [];
        target.workspaceEdits.push(entry);
        return target;
    }

    function applyWorkspaceFilePatch(workspace, plan, item, prompt, edit = {}) {
        if (!plan || !item) return null;
        const now = new Date().toISOString();
        const target = {
            itemId: item.id,
            category: item.categoryLabel,
            title: item.title,
            type: item.type,
            prompt,
            updatedAt: now
        };
        const patchSummary = {
            schema: 'droi-generated-file-edit/v1',
            target,
            gameplayLocked: true,
            note: 'Post-generation edit applied to current generated project files.'
        };

        const manifestFile = readGeneratedProjectCodeFile(plan, 'assets/manifest.json');
        const manifest = parseWorkspaceJsonContent(manifestFile && manifestFile.content, {
            assetArchitecture: ['Audio & Feel', 'Game Art', 'Ui Art', 'Visual Style'],
            assets: []
        });
        if (!manifest.generation) manifest.generation = {};
        if (!manifest.generation.assetPrompts || typeof manifest.generation.assetPrompts !== 'object') manifest.generation.assetPrompts = {};
        if (!manifest.generation.stylePatch || typeof manifest.generation.stylePatch !== 'object') manifest.generation.stylePatch = {};
        manifest.generation.stylePatch[item.id] = {
            prompt,
            target: `${item.categoryLabel} / ${item.title}`,
            updatedAt: now,
            gameplayLocked: true
        };
        manifest.generation.assetPrompts[item.id] = prompt;
        appendWorkspaceEditEntry(manifest, patchSummary);
        upsertGeneratedProjectCodeFile(plan, 'assets/manifest.json', JSON.stringify(manifest, null, 2), { language: 'json', kind: 'manifest' });

        if (plan.generatedSpec) {
            const spec = JSON.parse(JSON.stringify(plan.generatedSpec));
            if (!spec.workspaceEdits) spec.workspaceEdits = [];
            spec.workspaceEdits.push(patchSummary);
            if (item.type === 'image') {
                spec.visualTheme = {
                    ...(spec.visualTheme || {}),
                    lastEditTarget: item.id,
                    lastEditPrompt: prompt,
                    updatedAt: now
                };
            }
            if (edit && Object.prototype.hasOwnProperty.call(edit, 'value')) {
                spec.runtimeTuning = {
                    ...(spec.runtimeTuning || {}),
                    [item.id]: edit.value,
                    updatedAt: now
                };
            }
            plan.generatedSpec = spec;
            upsertGeneratedProjectCodeFile(plan, 'spec/game.json', JSON.stringify(spec, null, 2), { language: 'json', kind: 'spec' });
            upsertGeneratedProjectCodeFile(plan, 'spec/generated-game-spec.json', JSON.stringify(spec, null, 2), { language: 'json', kind: 'spec' });
        }

        const reportFile = readGeneratedProjectCodeFile(plan, 'generation-report.json');
        const report = parseWorkspaceJsonContent(reportFile && reportFile.content, {
            generatedAt: now,
            title: plan.generatedSpec && plan.generatedSpec.meta ? plan.generatedSpec.meta.gameName : 'Generated Canvas Game',
            workspace: 'Droi AI Game Editor'
        });
        appendWorkspaceEditEntry(report, patchSummary);
        report.lastWorkspaceEdit = patchSummary;
        upsertGeneratedProjectCodeFile(plan, 'generation-report.json', JSON.stringify(report, null, 2), { language: 'json', kind: 'report' });

        upsertGeneratedProjectCodeFile(plan, 'workspace-edits/latest-edit.json', JSON.stringify(patchSummary, null, 2), { language: 'json', kind: 'patch' });
        upsertGeneratedProjectCodeFile(plan, 'workspace-edits/latest-edit.md', [
            '# Latest Workspace Edit',
            '',
            `- Target: ${target.category} / ${target.title}`,
            `- Type: ${target.type}`,
            `- Updated: ${now}`,
            '- Gameplay locked: true',
            '',
            '## User Prompt',
            '',
            prompt
        ].join('\n'), { language: 'md', kind: 'patch' });
        return patchSummary;
    }

    function refreshWorkspaceCodePanel(workspace, plan) {
        const codePanel = workspace.querySelector('[data-edit-module="code"]');
        if (!codePanel) return;
        codePanel.innerHTML = buildCodePanelHtml(plan && plan.generatedProject, plan && plan.generatedSpec);
        bindWorkspaceCodeControls(workspace, plan);
    }

    function buildCodePanelHtml(project = null, generated = null) {
        const files = buildWorkspaceCodeFiles(project, generated, null);
        const firstText = files.find(file => file.text) || files[0];
        return `
            <div class="workspace-code-compact" data-workspace-code-panel>
                <div class="workspace-code-toolbar">
                    <input type="search" placeholder="Search files..." data-code-search>
                    <select data-code-filter aria-label="File type filter">
                        <option value="all">All</option>
                        <option value="html">HTML</option>
                        <option value="js">JS</option>
                        <option value="json">JSON</option>
                        <option value="assets">Assets</option>
                    </select>
                    <button type="button" class="workspace-header-btn" data-code-open-modal>View code</button>
                </div>
                <div class="workspace-code-summary" data-code-summary>
                    <strong>${files.length} files</strong>
                    <small>${escapeHtml(firstText ? firstText.path : 'No file selected')}</small>
                </div>
                <div class="code-workspace-panel compact" data-code-workspace data-code-files="${escapeHtml(JSON.stringify(files))}">
                    <div class="code-file-tree" data-code-file-list>
                        ${files.map(file => `
                            <button type="button" class="code-file${firstText && file.path === firstText.path ? ' active' : ''}" data-code-file="${escapeHtml(file.path)}" data-code-kind="${escapeHtml(file.path.startsWith('assets/') ? 'assets' : fileExtension(file.path))}">
                                <span>${escapeHtml(workspaceFileBadge(file.path))}</span>
                                <strong>${escapeHtml(file.path)}</strong>
                            </button>
                        `).join('')}
                    </div>
                    <div class="code-editor-pane">
                        <div class="code-editor-titlebar" data-code-titlebar>
                            <span class="generated-file-icon">${escapeHtml(firstText ? workspaceFileBadge(firstText.path) : 'DIR')}</span>
                            <strong>${escapeHtml(firstText ? firstText.path : 'Select a file')}</strong>
                            <small>${escapeHtml(firstText ? (firstText.language || 'file') : 'folder')}</small>
                        </div>
                        <pre class="code-preview" aria-label="Generated code preview" data-code-preview><code>${escapeHtml(firstText && firstText.content ? firstText.content : (firstText && firstText.text ? '' : 'Select a text file to preview its contents.'))}</code></pre>
                    </div>
                </div>
            </div>
        `;
    }

    function crc32(bytes) {
        let table = crc32.table;
        if (!table) {
            table = Array.from({ length: 256 }, (_, index) => {
                let c = index;
                for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
                return c >>> 0;
            });
            crc32.table = table;
        }
        let crc = -1;
        bytes.forEach(byte => { crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff]; });
        return (crc ^ -1) >>> 0;
    }

    function uint16(value) {
        return [value & 0xff, (value >>> 8) & 0xff];
    }

    function uint32(value) {
        return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff];
    }

    function createZipBlob(fileEntries) {
        const encoder = new TextEncoder();
        const chunks = [];
        const central = [];
        let offset = 0;
        const now = new Date();
        const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
        const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
        fileEntries.forEach(entry => {
            const name = normalizeWorkspacePath(entry.path);
            const nameBytes = encoder.encode(name);
            const dataBytes = entry.bytes || encoder.encode(String(entry.content || ''));
            const crc = crc32(dataBytes);
            const localHeader = new Uint8Array([
                0x50, 0x4b, 0x03, 0x04,
                ...uint16(20), ...uint16(0), ...uint16(0), ...uint16(dosTime), ...uint16(dosDate),
                ...uint32(crc), ...uint32(dataBytes.length), ...uint32(dataBytes.length),
                ...uint16(nameBytes.length), ...uint16(0)
            ]);
            chunks.push(localHeader, nameBytes, dataBytes);
            central.push({ nameBytes, crc, size: dataBytes.length, offset, dosTime, dosDate });
            offset += localHeader.length + nameBytes.length + dataBytes.length;
        });
        const centralStart = offset;
        central.forEach(entry => {
            const header = new Uint8Array([
                0x50, 0x4b, 0x01, 0x02,
                ...uint16(20), ...uint16(20), ...uint16(0), ...uint16(0), ...uint16(entry.dosTime), ...uint16(entry.dosDate),
                ...uint32(entry.crc), ...uint32(entry.size), ...uint32(entry.size),
                ...uint16(entry.nameBytes.length), ...uint16(0), ...uint16(0), ...uint16(0), ...uint16(0), ...uint32(0), ...uint32(entry.offset)
            ]);
            chunks.push(header, entry.nameBytes);
            offset += header.length + entry.nameBytes.length;
        });
        const centralSize = offset - centralStart;
        chunks.push(new Uint8Array([
            0x50, 0x4b, 0x05, 0x06,
            ...uint16(0), ...uint16(0), ...uint16(central.length), ...uint16(central.length),
            ...uint32(centralSize), ...uint32(centralStart), ...uint16(0)
        ]));
        return new Blob(chunks, { type: 'application/zip' });
    }

    function buildWorkspacePatches(workspace) {
        const state = getWorkspaceState(workspace);
        return {
            schema: 'droi-workspace-patches/v1',
            savedAt: new Date().toISOString(),
            numericValues: state.numericValues || {},
            pendingRuntimePatches: state.pendingRuntimePatches || [],
            toolArtifacts: (state.toolArtifacts || []).map(artifact => ({
                toolId: artifact.toolId,
                artifactType: artifact.artifactType,
                metadata: artifact.metadata || {},
                files: (artifact.files || []).map(file => ({
                    name: file.name || file.path || 'artifact',
                    path: file.path || '',
                    mimeType: file.mimeType || '',
                    url: file.url || '',
                    hasDataUrl: Boolean(file.dataUrl)
                }))
            })),
            selectedTarget: workspace.__selectedItemId || ''
        };
    }

    function buildWorkspaceExportFiles(workspace, plan) {
        const project = plan && plan.generatedProject ? plan.generatedProject : null;
        const generated = plan && plan.generatedSpec ? plan.generatedSpec : null;
        const files = buildWorkspaceCodeFiles(project, generated, workspace).map(file => ({
            path: file.path,
            content: file.content || (file.text ? '' : `Binary or external asset placeholder: ${file.path}\n`)
        }));
        const upsert = (path, content) => {
            const index = files.findIndex(file => file.path === path);
            if (index >= 0) files[index] = { path, content };
            else files.push({ path, content });
        };
        upsert('workspace-patches.json', JSON.stringify(buildWorkspacePatches(workspace), null, 2));
        const warnings = getWorkspaceState(workspace).saveWarnings || [];
        if (warnings.length) upsert('SAVE_WARNINGS.txt', warnings.join('\n'));
        upsert('README_SAVE_NOTE.txt', [
            'Droi AI generated game export.',
            'This ZIP is created from the current browser workspace.',
            'workspace-patches.json stores numeric changes, pending runtime patches and local tool artifacts.',
            'Large external assets may be represented by URLs or placeholders when the browser has no binary file access.'
        ].join('\n'));
        const unique = new Map();
        files.forEach(file => unique.set(normalizeWorkspacePath(file.path), file));
        return Array.from(unique.values()).sort((a, b) => a.path.localeCompare(b.path));
    }

    function safeZipName(name = 'droi-generated-game') {
        return `${String(name || 'droi-generated-game').trim().replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'droi-generated-game'}-generated-game.zip`;
    }

    function saveWorkspaceZip(workspace, plan) {
        const status = workspace.querySelector('[data-workspace-save-status]');
        const button = workspace.querySelector('[data-workspace-save]');
        const generated = plan && plan.generatedSpec ? plan.generatedSpec : null;
        const files = buildWorkspaceExportFiles(workspace, plan);
        if (status) status.textContent = `Saving ${files.length} files...`;
        if (button) button.disabled = true;
        try {
            const zip = createZipBlob(files);
            const url = URL.createObjectURL(zip);
            const link = document.createElement('a');
            link.href = url;
            link.download = safeZipName(generated && generated.meta ? generated.meta.gameName : 'droi-generated-game');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 1500);
            if (status) status.textContent = `Saved ZIP (${files.length} files)`;
            addWorkspaceHistoryRecord(workspace, {
                title: 'Saved project ZIP',
                category: 'Export',
                prompt: 'Save current generated game as ZIP',
                summary: `${files.length} files exported locally.`
            });
            addPreviewChatRecord(workspace, {
                title: 'Save ZIP',
                prompt: 'Export current workspace',
                summary: `Saved ${files.length} files, including workspace-patches.json.`
            });
        } catch (error) {
            if (status) status.textContent = 'Save failed';
            console.error('[Droi] Save ZIP failed', error);
        } finally {
            if (button) button.disabled = false;
        }
    }

    function buildDroiGameToolsHtml() {
        if (!DROI_GAME_TOOL_EMBED_AVAILABLE) {
            return '<div class="droi-game-tools-panel"><strong>Droi-Game-Tool disabled</strong><small>Use ?tools=1&toolUrl=http://127.0.0.1:5173 to enable local tools.</small></div>';
        }
        return `
            <section class="droi-game-tools-panel" data-droi-game-tools>
                <div class="droi-game-tools-head">
                    <span>Droi-Game-Tool</span>
                    <small>Local tool provider: ${escapeHtml(DROI_GAME_TOOL_BASE_URL)}</small>
                </div>
                <div class="droi-game-tools-grid">
                    ${DROI_GAME_TOOLS.map(tool => `
                        <button type="button" class="droi-game-tool-card" data-droi-tool-open="${escapeHtml(tool.id)}">
                            <strong>${escapeHtml(tool.title)}</strong>
                            <small>${escapeHtml(tool.description)}</small>
                        </button>
                    `).join('')}
                </div>
                <p class="droi-game-tools-help">Start local tools in <code>D:\\Codex\\Basic game Components\\Droi-Game-Tool\\frontend</code> with <code>npm run dev</code>.</p>
            </section>
        `;
    }

    function firstArtifactFile(artifact) {
        return artifact && Array.isArray(artifact.files) ? artifact.files.find(file => file && (file.dataUrl || file.url || file.name || file.path)) : null;
    }

    function resolveArtifactTarget(workspace, artifact) {
        return (artifact && artifact.metadata && artifact.metadata.targetItemId)
            || (artifact && artifact.targetItemId)
            || (workspace && workspace.__selectedItemId)
            || (artifact && artifact.artifactType === 'map' ? 'visual.mapMain' : '')
            || (artifact && artifact.artifactType === 'obstacleLayout' ? 'visual.mapObstacles' : '')
            || (artifact && artifact.artifactType === 'actionPack' ? 'art.player' : '')
            || 'art.player';
    }

    function recommendedToolForTarget(targetItemId = '') {
        const text = String(targetItemId || '').toLowerCase();
        if (text.includes('mapobstacles') || text.includes('obstacle')) return 'obstacle-painter';
        if (text.includes('map')) return 'map-studio';
        if (text.includes('player') || text.includes('enemies') || text.includes('boss')) return 'image-process';
        if (text.includes('action')) return 'character-action';
        return 'image-process';
    }

    function handleDroiToolArtifact(workspace, plan, artifact, status = null) {
        if (!workspace || !artifact) return;
        const state = getWorkspaceState(workspace);
        const normalized = artifact.artifact || artifact;
        normalized.metadata = normalized.metadata || {};
        normalized.metadata.targetItemId = normalized.metadata.targetItemId || resolveArtifactTarget(workspace, normalized);
        state.toolArtifacts.push(normalized);
        const file = firstArtifactFile(normalized);
        const targetItemId = normalized.metadata.targetItemId;
        const runtime = findWorkspaceRuntime(workspace);
        let summary = 'Tool artifact recorded. Re-run preview to apply this exported asset.';
        if (file && runtime && runtime.canDirectApply && runtime.applyEdit) {
            runtime.applyEdit({
                itemId: targetItemId,
                assetUrl: file.dataUrl || file.url,
                fileName: file.name || file.path || 'tool-artifact',
                artifact: normalized
            });
            summary = `Tool artifact applied to ${targetItemId}.`;
        } else {
            state.pendingRuntimePatches.push({
                type: 'toolArtifact',
                targetItemId,
                artifactType: normalized.artifactType || 'assetPatch',
                toolId: normalized.toolId || '',
                fileName: file && (file.name || file.path) || '',
                reason: 'Preview runtime cannot apply this artifact directly; re-run preview to use it.'
            });
        }
        addWorkspaceHistoryRecord(workspace, {
            title: `Tool export: ${normalized.toolId || 'Droi-Game-Tool'}`,
            category: 'Art replacement',
            prompt: `Apply ${normalized.artifactType || 'asset'} to ${targetItemId}`,
            summary
        });
        addPreviewChatRecord(workspace, {
            title: 'Tool artifact',
            prompt: `Received ${normalized.artifactType || 'assetPatch'} from ${normalized.toolId || 'Droi-Game-Tool'}`,
            summary
        });
        const mediaPanel = workspace.querySelector('[data-edit-module="media"]');
        if (mediaPanel) {
            state.__workspace = workspace;
            mediaPanel.innerHTML = buildWorkspaceMediaPanelHtml(plan && plan.generatedProject, state);
            bindWorkspaceMediaControls(workspace, plan);
        }
        if (status) status.textContent = summary;
    }

    function openDroiGameToolOverlay(workspace, plan, toolId) {
        const tool = DROI_GAME_TOOLS.find(item => item.id === toolId);
        if (!tool) return;
        const existing = document.querySelector('.droi-tool-overlay.open');
        if (existing) existing.remove();
        const projectId = (plan && plan.generatedProject && (plan.generatedProject.projectId || plan.generatedProject.id)) || 'droi-workspace';
        const overlay = document.createElement('div');
        overlay.className = 'droi-tool-overlay open';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.innerHTML = `
            <div class="droi-tool-shell">
                <header class="droi-tool-shell-head">
                    <span><strong>${escapeHtml(tool.title)}</strong><small data-droi-tool-status>Loading local tool...</small></span>
                    <button type="button" class="droi-tool-close" data-droi-tool-close>Close</button>
                </header>
                <iframe class="droi-tool-frame" src="${escapeHtml(droiGameToolUrl(toolId, projectId))}" title="${escapeHtml(tool.title)}"></iframe>
            </div>
        `;
        document.body.appendChild(overlay);
        const frame = overlay.querySelector('iframe');
        const status = overlay.querySelector('[data-droi-tool-status]');
        const frameOrigin = new URL(frame.src).origin;
        const contextPayload = {
            projectId,
            templateId: plan && plan.decision ? plan.decision.templateId : '',
            previewUrl: plan && plan.generatedProject && plan.generatedProject.previewUrl ? apiUrl(plan.generatedProject.previewUrl) : '',
            assetManifest: plan && plan.generatedProject ? (plan.generatedProject.assetManifest || plan.generatedProject.assetSidebar || null) : null,
            gameSpec: plan ? plan.generatedSpec : null,
            selectedTarget: { itemId: workspace && workspace.__selectedItemId || 'combat.enemySpeed', title: 'Current workspace target' },
            toolHints: { preferredToolId: toolId, returnTo: 'droi-workspace' },
            toolArtifacts: workspace && workspace.__state ? workspace.__state.toolArtifacts : []
        };
        let toolConnected = false;
        const slowToolTimer = window.setTimeout(() => {
            if (!toolConnected && status) {
                status.textContent = 'Tool service is not responding. Start Droi-Game-Tool with npm run dev, then reload this tool.';
            }
        }, 5000);
        const close = () => {
            window.clearTimeout(slowToolTimer);
            overlay.remove();
        };
        const sendContext = () => {
            if (!frame.contentWindow) return;
            frame.contentWindow.postMessage({ type: 'droi.host.context.v1', protocol: DROI_GAME_TOOL_PROTOCOL, project: contextPayload }, frameOrigin);
            if (status) status.textContent = 'Project context sent.';
        };
        const onMessage = event => {
            if (event.origin !== frameOrigin || event.source !== frame.contentWindow) return;
            const data = event.data || {};
            if (data.protocol !== DROI_GAME_TOOL_PROTOCOL) return;
            if (data.type === 'droi.tool.ready.v1' || data.type === 'droi.tool.requestContext.v1') {
                toolConnected = true;
                window.clearTimeout(slowToolTimer);
                sendContext();
            }
            if (data.type === 'droi.tool.exportArtifact.v1') handleDroiToolArtifact(workspace, plan, data.artifact || data, status);
            if (data.type === 'droi.tool.error.v1' && status) status.textContent = data.message || 'Tool error.';
        };
        window.addEventListener('message', onMessage);
        overlay.querySelector('[data-droi-tool-close]').addEventListener('click', () => {
            window.removeEventListener('message', onMessage);
            close();
        });
        activeGameCleanups.push(() => {
            window.removeEventListener('message', onMessage);
            if (overlay.parentElement) overlay.remove();
        });
    }

    function buildEditItemHtml(item, category, selected = false) {
        const count = Number.isFinite(Number(item.count)) ? Number(item.count) : null;
        return `
            <button type="button" class="game-edit-item${selected ? ' selected' : ''}" data-edit-item="${escapeHtml(item.id)}" data-edit-category-id="${escapeHtml(category.id)}" data-edit-type="${escapeHtml(item.type)}" data-edit-title="${escapeHtml(item.title)}">
                <span class="game-edit-item-preview ${escapeHtml(item.type)}" aria-hidden="true"><span>${escapeHtml(item.title.slice(0, 2).toUpperCase())}</span></span>
                <span class="game-edit-item-copy">
                    <strong>${escapeHtml(item.title)}</strong>
                    <small>${escapeHtml(item.meta)}</small>
                </span>
                ${count === null ? '' : `<span class="game-edit-asset-count">${count}</span>`}
            </button>
        `;
    }

    function buildMediaThumbsHtml(item) {
        const cards = Math.min(12, Math.max(0, Number(item.count) || 0));
        if (!cards) {
            return '<div class="workspace-media-empty"><strong>Empty</strong><small>No real assets are registered for this target yet.</small></div>';
        }
        return `
            <div class="media-thumb-grid" aria-hidden="true">
                ${Array.from({ length: cards }).map((_, index) => `
                    <div class="media-thumb-card">
                        <span class="media-thumb-art"></span>
                        <strong>${escapeHtml(item.title || 'Asset')} ${index + 1}</strong>
                        <span>...</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function buildEditSectionHtml(category, sectionIndex, activeSectionId) {
        const expanded = category.id === activeSectionId;
        const selectedItemId = 'visual.mapMain';
        return `
            <section class="game-edit-category${expanded ? ' active' : ''}" data-edit-category="${escapeHtml(category.id)}">
                <button type="button" class="game-edit-category-head" data-edit-category-toggle="${escapeHtml(category.id)}" aria-expanded="${expanded ? 'true' : 'false'}">
                    <span>
                        <strong>${escapeHtml(category.label)}</strong>
                        <small>${escapeHtml(category.helper)}</small>
                    </span>
                    <span class="game-edit-category-count">${category.items.length}</span>
                </button>
                <div class="game-edit-item-grid">
                    ${category.items.map((item, itemIndex) => `
                        ${buildEditItemHtml(item, category, item.id === selectedItemId)}
                        ${expanded && item.type === 'image' && itemIndex === 0 ? buildMediaThumbsHtml(item) : ''}
                    `).join('')}
                </div>
            </section>
        `;
    }

    function buildGameEditSidebarHtml(project = null, generated = null) {
        return `
            <div class="workspace-sidebar-mode-panel" data-workspace-sidebar-mode>
                <div class="workspace-sidebar-mode-head">
                    <strong>Workspace mode</strong>
                    <small>Beginner works on mobile. Advanced is best on desktop.</small>
                </div>
                <div class="workspace-mode-switch sidebar-mode-switch" aria-label="Workspace mode">
                    <button type="button" class="workspace-header-btn active is-mode" data-workspace-mode-set="beginner">Beginner</button>
                    <button type="button" class="workspace-header-btn is-muted is-mode" data-workspace-mode-set="advanced">Advanced</button>
                </div>
                <div class="workspace-compact-mode-warning" data-compact-mode-warning>
                    <strong>Advanced mode is desktop-only for now.</strong>
                    <span>Media, files and local tools need more screen space. Please open this workspace on a PC for the full toolset.</span>
                </div>
            </div>
            <div class="game-edit-tabs" role="tablist" aria-label="Game edit modules">
                ${GAME_EDIT_MODULES.map(module => `
                    <button type="button" class="game-edit-tab${module.id === 'stats' ? ' active' : ''}" data-edit-module-tab="${escapeHtml(module.id)}">${escapeHtml(module.label)}<small>${module.id === 'stats' ? Object.keys(WORKSPACE_NUMERIC_SETTINGS).length : (module.id === 'media' ? WORKSPACE_MEDIA_STRUCTURE.length : (module.id === 'tools' ? DROI_GAME_TOOLS.length : buildWorkspaceCodeFiles(project, generated, null).length))}</small></button>
                `).join('')}
            </div>
            ${GAME_EDIT_MODULES.map(module => `
                <div class="game-edit-module${module.id === 'stats' ? ' active' : ''}" data-edit-module="${escapeHtml(module.id)}">
                    ${module.id === 'code'
                        ? buildCodePanelHtml(project, generated)
                        : module.id === 'tools'
                            ? buildDroiGameToolsHtml()
                            : module.id === 'media'
                                ? buildWorkspaceMediaPanelHtml(project, {})
                                : buildWorkspaceNumericPanelHtml()}
                </div>
            `).join('')}
        `;
    }

    function buildAssetStatusHtml(status) {
        const safeStatus = String(status || 'Inherited');
        return `<span class="asset-status asset-status-${escapeHtml(safeStatus.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}">${escapeHtml(safeStatus)}</span>`;
    }

    function buildProductionAssetSidebarHtml(project) {
        if (!project || !project.assetSidebar) return buildGameEditSidebarHtml();
        const groups = project.assetSidebar.groups || [];
        return `
            <div class="production-assets-sidebar" data-production-assets>
                <div class="production-sidebar-summary">
                    <strong>Production Assets</strong>
                    <small>${escapeHtml(project.templateLabel || 'Template project')} · ${escapeHtml(project.validationReport && project.validationReport.ok ? 'Validated' : 'Needs review')}</small>
                </div>
                ${groups.map(group => {
                    const categories = group.categories || [];
                    if (!categories.length) return '';
                    return `
                        <section class="asset-group">
                            <div class="asset-group-title"><span>${escapeHtml(group.group)}</span><small>${categories.reduce((sum, category) => sum + (category.total || 0), 0)}</small></div>
                            ${categories.map(category => `
                                <details class="asset-category" ${category.defaultOpen ? 'open' : ''}>
                                    <summary><span>${escapeHtml(category.category)}</span><small>${category.total}${category.overflow ? ` · +${category.overflow}` : ''}</small></summary>
                                    <div class="asset-node-list">
                                        ${(category.items || []).map(item => `
                                            <button type="button" class="asset-node" data-asset-node>
                                                <span class="asset-node-thumb">${escapeHtml(item.previewable ? 'IMG' : (item.prompt ? 'AI' : 'FB'))}</span>
                                                <span class="asset-node-main">
                                                    <strong>${escapeHtml(item.manifestKey)}</strong>
                                                    <small>${escapeHtml(item.usage || item.src || item.prompt || 'manifest asset')}</small>
                                                </span>
                                                ${buildAssetStatusHtml(item.status)}
                                            </button>
                                        `).join('')}
                                    </div>
                                </details>
                            `).join('')}
                        </section>
                    `;
                }).join('')}
                <div class="production-validation">
                    <strong>Validation</strong>
                    ${((project.validationReport && project.validationReport.checks) || []).map(check => `<span class="${check.ok ? 'ok' : 'warn'}">${check.ok ? 'OK' : 'Review'} · ${escapeHtml(check.label)}</span>`).join('')}
                </div>
            </div>
        `;
    }

    function buildGeneratedFilesHtml(generated, project) {
        const files = project && Array.isArray(project.files) && project.files.length
            ? project.files
            : [{ path: 'game.js', kind: 'runtime', language: 'js', patched: true, size: estimateGeneratedJsLines(generated) }];
        return `
            <div class="generated-files-card generated-workspace-files-card">
                <div class="generated-files-title">${escapeHtml(generatedUiText('generatedFiles'))}</div>
                ${files.slice(0, 12).map(file => `
                    <div class="generated-file-row">
                        <span class="generated-file-icon" aria-hidden="true">${escapeHtml((file.language || file.kind || 'file').slice(0, 3).toUpperCase())}</span>
                        <span class="generated-file-main"><strong>${escapeHtml(file.path)}</strong><small>${escapeHtml(file.patched ? 'Patched template file' : 'Inherited template file')}</small></span>
                        <span class="generated-file-delta">${escapeHtml(file.kind || '')}</span>
                    </div>
                `).join('')}
                ${files.length > 12 ? `<div class="generated-file-more">+${files.length - 12} inherited template files</div>` : ''}
            </div>
        `;
    }

    function buildGeneratedEditWorkspaceHtml(generated, project = null) {
        const previewUrl = project && project.previewUrl ? apiUrl(project.previewUrl) : '';
        const previewMarkup = previewUrl
            ? `<iframe class="template-preview-frame" src="${escapeHtml(previewUrl)}" title="${escapeHtml(generated.meta.gameName)} playable template preview" loading="lazy"></iframe>`
            : '<canvas class="game-preview-canvas" width="640" height="360" tabindex="0" aria-label="Playable generated game preview"></canvas>';
        return [
            '<div class="generated-game-page is-beginner-mode" data-game-workspace data-workspace-mode="beginner">',
            '<header class="workspace-header generated-page-header">',
            '<div class="workspace-title-block">',
            '<small>GENERATED GAME PAGE</small>',
            `<strong data-generated-game-title>${escapeHtml(generated.meta.gameName)}</strong>`,
            '<span>Playable HTML5 Canvas game - ready to edit and export</span>',
            '<div class="workspace-status-strip" aria-label="Generated game status">',
            '<span class="workspace-status-pill success">Generated</span>',
            '<span class="workspace-status-pill success">Playable</span>',
            '<span class="workspace-status-pill">v1</span>',
            '<span class="workspace-status-pill" data-workspace-mode-label>Beginner mode</span>',
            '<span class="workspace-status-pill warn">Unsaved changes</span>',
            '</div>',
            '</div>',
            '<div class="workspace-header-actions">',
            `<button type="button" class="workspace-header-btn primary-action" data-game-action="preview" data-preview-url="${escapeHtml(previewUrl)}">Preview / Play</button>`,
            '<button type="button" class="workspace-header-btn secondary-action" data-workspace-save>Save ZIP</button>',
            '<span class="workspace-save-state" data-workspace-save-status>Ready to save</span>',
            '<div class="workspace-mode-switch" aria-label="Workspace mode">',
            '<button type="button" class="workspace-header-btn active is-mode" data-workspace-mode-set="beginner">Beginner</button>',
            '<button type="button" class="workspace-header-btn is-muted is-mode" data-workspace-mode-set="advanced">Advanced</button>',
            '</div>',
            '</div>',
            '</header>',
            '<div class="workspace-body page-workbench" aria-label="Generated game page workbench">',
            '<aside class="change-history-sidebar version-history-panel page-region" aria-label="Version history">',
            '<button type="button" class="workspace-panel-toggle workspace-panel-toggle-left" data-workspace-panel-toggle="history" aria-label="Toggle change history" aria-expanded="false">&lsaquo;</button>',
            '<div class="workspace-panel-head">',
            '<span>Version History</span>',
            '<small>Page-level changes, exports and reusable prompts.</small>',
            '</div>',
            '<div class="change-history-list" data-edit-history-list>',
            '<button type="button" class="change-history-record initial-version" data-history-prompt="Initial generated version">',
            '<span class="change-record-top"><strong><em>v1</em>Initial generation</strong><small>System</small></span>',
            `<span class="change-record-prompt">${escapeHtml(generated.meta.gameName)}</span>`,
            '<span class="change-record-meta">Playable base version generated. Beginner mode is ready for numeric tuning; Advanced mode unlocks media, files and tools.</span>',
            '</button>',
            '</div>',
            '</aside>',
            '<main class="game-preview-column game-workspace-panel" aria-label="Playable game workspace">',
            '<div class="playable-shell">',
            '<button type="button" class="mobile-game-preview-toggle" data-game-action="mobile-preview-toggle" aria-expanded="false">Open game preview</button>',
            '<section class="playable-preview-card" aria-label="Playable preview">',
            '<div class="generated-preview-hero">',
            '<span>Playable Preview</span>',
            `<strong data-generated-game-title>${escapeHtml(generated.meta.gameName)}</strong>`,
            '<small>Click the preview or press Focus to control the game.</small>',
            '<div class="preview-hero-badges" aria-label="Preview status"><b>v1</b><b>Playable</b></div>',
            '</div>',
            '<div class="game-preview-actions preview-card-actions">',
            '<button type="button" class="game-preview-btn" data-game-action="restart">Restart</button>',
            '<button type="button" class="game-preview-btn" data-game-action="pause">Focus</button>',
            `<button type="button" class="game-preview-btn web-preview-trigger" data-game-action="preview" data-preview-url="${escapeHtml(previewUrl)}">Open preview</button>`,
            '</div>',
            '<div class="game-preview-viewport">',
            previewMarkup,
            '</div>',
            '<p class="preview-card-hint">Playable first: test the game, then pick an edit target on the right or describe a change below.</p>',
            '</section>',
            '<div class="game-preview-chat-panel" data-preview-chat-panel>',
            '<div class="preview-chat-title-row">',
            '<strong>Edit Conversation</strong>',
            '<span aria-hidden="true">v1</span>',
            '</div>',
            `<p class="preview-chat-lead">${escapeHtml(generated.meta.description || 'Create a playable mini-game and open the post-generation editing workspace.')}</p>`,
            '<ul class="preview-chat-points">',
            `<li>${escapeHtml(generated.flow.winCondition.description)}</li>`,
            '<li>Select a target on the right, then describe the change. Results and AI feedback appear here.</li>',
            '</ul>',
            '<div class="preview-chat-user-bubble">Ok, create it!</div>',
            `<div class="preview-chat-time">${escapeHtml(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))}</div>`,
            `<p class="preview-chat-assistant-note">I've created <strong>${escapeHtml(generated.meta.gameName)}</strong> as a playable preview. Pick a target in Edit Tools, describe the change below, and I will apply or record it for this run.</p>`,
            '<div class="preview-chat-edit-status" data-workspace-edit-context><strong>Ready for edits:</strong> Tell me what to change. I will infer art, numbers, audio, or files from your prompt. <small>Pick a target in Tools only when you want precise control.</small></div>',
            '</div>',
            '</div>',
            '</main>',
            '<aside class="game-edit-sidebar edit-tools-panel page-region" aria-label="Edit tools and project resources">',
            '<button type="button" class="workspace-panel-toggle workspace-panel-toggle-right" data-workspace-panel-toggle="edit" aria-label="Toggle game edit sidebar" aria-expanded="false">&rsaquo;</button>',
            '<div class="workspace-panel-head">',
            '<span>Edit Tools / Resources</span>',
            '<small>Choose a target, tune values, inspect assets, or export files.</small>',
            '</div>',
            buildGameEditSidebarHtml(project, generated),
            '</aside>',
            '</div>',
            '</div>'
        ].join('');
    }

    function buildProductionPlanAppliedHtml(plan) {
        const productionPlan = plan.productionPlan || (plan.templatePatchPlan && plan.templatePatchPlan.productionPlan) || latestGamePlan;
        if (!productionPlan) return '';
        const normalized = normalizeGamePlanForGeneration(productionPlan, plan.generatedSpec || getCurrentGameSpec());
        return [
            '<div class="selection-summary ai-plan-summary production-applied-summary">',
            '<div class="summary-title">Production brief applied to template</div>',
            `<div class="summary-name">${escapeHtml(normalized.title)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('hook'))}:</strong> ${escapeHtml(normalized.hook)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('coreLoop'))}:</strong> ${escapeHtml(normalized.coreLoop)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('enemyDesign'))}:</strong> ${escapeHtml(normalized.enemyDesign)}</div>`,
            `<div class="summary-item"><strong>${escapeHtml(planLabel('progressionPlan'))}:</strong> ${escapeHtml(normalized.progressionPlan)}</div>`,
            '</div>'
        ].join('');
    }

    function modelMetaDisplay(meta) {
        if (!meta) return '';
        return meta.label || meta.modelLabel || meta.modelId || meta.responseModel || meta.providerId || '';
    }

    function buildAiPipelineSummaryHtml(plan, project) {
        const stages = [
            { label: 'Analysis', meta: analysisState.analysisModelMeta },
            { label: 'GamePlan', meta: analysisState.finalModelMeta },
            { label: 'TemplatePatch', meta: plan.templatePatchPlan && plan.templatePatchPlan.modelMeta }
        ].filter(stage => modelMetaDisplay(stage.meta));
        const checks = project && project.validationReport && Array.isArray(project.validationReport.checks)
            ? project.validationReport.checks
            : [];
        return [
            '<div class="selection-summary ai-pipeline-summary">',
            '<div class="summary-title">AI pipeline</div>',
            stages.length
                ? `<div class="summary-item"><strong>Models:</strong> ${stages.map(stage => `${escapeHtml(stage.label)} ${escapeHtml(modelMetaDisplay(stage.meta))}`).join(' / ')}</div>`
                : '',
            project && project.validationReport
                ? `<div class="summary-item"><strong>Validation report:</strong> ${escapeHtml(project.validationReport.ok ? 'Passed' : 'Needs review')}</div>`
                : '',
            checks.length
                ? `<div class="summary-item validation-inline">${checks.map(check => `<span class="${check.ok ? 'ok' : 'warn'}">${check.ok ? 'OK' : 'Review'} · ${escapeHtml(check.label)}</span>`).join('')}</div>`
                : '',
            '</div>'
        ].join('');
    }

    function buildGeneratedSpecHtml(plan) {
        const decision = plan.decision || matchTemplate(getCurrentGameSpec());
        const project = plan.generatedProject || null;
        const generationModel = plan.templatePatchPlan && plan.templatePatchPlan.modelMeta
            ? plan.templatePatchPlan.modelMeta
            : (analysisState.finalModelMeta || analysisState.analysisModelMeta || null);
        const modelLabel = modelMetaDisplay(generationModel);
        const generated = plan.generatedSpec;
        if (!generated) {
            return [
                '<div class="selection-summary ai-error-card">',
                '<div class="summary-title">Generated GameSpec is missing</div>',
                '<div class="summary-item">The generation flow did not produce a validated GameSpec. Retry the current model or submit this request to the manual queue.</div>',
                '</div>'
            ].join('');
        }
        return [
            '<div class="generation-result">',
            `<div class="generation-status">${escapeHtml(t('autoPath'))}</div>`,
            `<div class="generation-title">${escapeHtml(t('gameSpecReady'))}</div>`,
            `<div class="generation-meta"><span>${escapeHtml(decision.templateLabel)}</span><span>${Math.round(decision.confidence * 100)}% match</span>${modelLabel ? `<span>AI: ${escapeHtml(modelLabel)}</span>` : ''}</div>`,
            buildAiPipelineSummaryHtml(plan, project),
            buildProductionPlanAppliedHtml(plan),
            '<div class="generated-workspace-topbar">',
            '<div class="generated-web-card">',
            '<div class="generated-web-main">',
            '<span class="generated-web-icon" aria-hidden="true">WEB</span>',
            '<span>',
            `<strong>${escapeHtml(generatedUiText('webPreview'))}</strong>`,
            `<small>${escapeHtml(generated.meta.gameName)}</small>`,
            '</span>',
            '</div>',
            `<button type="button" class="game-preview-btn web-preview-trigger" data-game-action="preview" data-preview-url="${escapeHtml(project && project.previewUrl ? apiUrl(project.previewUrl) : '')}">${escapeHtml(generatedUiText('openPreview'))}</button>`,
            '</div>',
            '</div>',
            buildGeneratedEditWorkspaceHtml(generated, project),
            buildGeneratedFilesHtml(generated, project),
            '</div>'
        ].join('');
    }

    function showAutoGenerationResult(plan) {
        addBotMessage(buildGeneratedSpecHtml(plan), msgDiv => {
            msgDiv.classList.add('has-game-workspace');
            const inputArea = document.querySelector('.chat-input-wrapper');
            if (inputArea) inputArea.style.display = '';
            chatHistory.classList.remove('is-generating');
            mountGeneratedGamePreview(msgDiv, plan);
            initGameEditWorkspace(msgDiv, plan);
            scrollChatMessageIntoReadableView(msgDiv, 'start');
        });
    }

    function findGameEditItem(itemId) {
        for (const category of GAME_EDIT_CATEGORIES) {
            const item = category.items.find(candidate => candidate.id === itemId);
            if (item) return { ...item, categoryId: category.id, categoryLabel: category.label };
        }
        if (String(itemId || '').startsWith('code.')) {
            const title = itemId.replace('code.', '') || 'code.html';
            return { id: itemId, title, type: 'code', meta: 'Generated source file', categoryId: 'code', categoryLabel: 'Code' };
        }
        return null;
    }

    function promptIncludesAny(prompt, terms) {
        const text = String(prompt || '').toLowerCase();
        return terms.some(term => text.includes(String(term).toLowerCase()));
    }

    function inferWorkspaceEditTargetFromPrompt(prompt, fallbackItemId = '') {
        if (!prompt) return fallbackItemId || 'visual.mapMain';
        if (promptIncludesAny(prompt, [
            '美术', '视觉', '画风', '风格', '配色', '色彩', '颜色', '背景', '地图', '场景', '动森', '可爱', '圆润',
            'art style', 'visual style', 'visual', 'style', 'theme', 'palette', 'color', 'background', 'map', 'scene',
            'animal island', 'cozy', 'cute', 'watercolor', 'pixel', 'gothic', 'cyber', 'neon'
        ])) return 'visual.mapMain';
        if (promptIncludesAny(prompt, ['玩家', '主角', '飞船', '角色', 'player', 'ship', 'fighter', 'character', 'glider'])) return 'art.player';
        if (promptIncludesAny(prompt, ['敌人', '小怪', 'enemy', 'enemies', 'mob'])) return 'art.enemies';
        if (promptIncludesAny(prompt, ['boss', 'bosses', '首领'])) return 'art.bosses';
        if (promptIncludesAny(prompt, ['子弹', '弹幕', '攻击特效', 'bullet', 'projectile', 'shot', 'attack art'])) return 'art.weaponAttacks';
        if (promptIncludesAny(prompt, ['ui', 'hud', '按钮', '界面', '菜单', 'panel', 'button'])) return 'visual.ui';
        if (promptIncludesAny(prompt, ['音效', '音乐', '声音', 'audio', 'sound', 'music', 'bgm'])) return 'audio.effects';
        if (promptIncludesAny(prompt, ['射速', '攻击频率', 'fire rate', 'cooldown'])) return 'combat.fireRate';
        if (promptIncludesAny(prompt, ['伤害', 'damage', 'power'])) return 'combat.damage';
        if (promptIncludesAny(prompt, ['血量', '生命', 'hp', 'health'])) return 'combat.enemyHp';
        if (promptIncludesAny(prompt, ['速度', 'speed'])) return 'combat.enemySpeed';
        if (promptIncludesAny(prompt, ['难度', '波次', 'difficulty', 'wave'])) return 'combat.wave';
        return fallbackItemId || 'visual.mapMain';
    }

    function workspaceEditSummaryForItem(item, prompt) {
        if (!item) return 'Edit request recorded for the current generated game.';
        if (item.type === 'image') {
            return `${item.categoryLabel} / ${item.title} art prompt recorded. Gameplay and numeric rules stay unchanged; re-run or export patches to apply this visual direction.`;
        }
        if (item.type === 'audio') {
            return `${item.categoryLabel} / ${item.title} prompt recorded. Audio generation is queued as a workspace patch for the next runtime/export step.`;
        }
        if (item.type === 'code') {
            return `${item.title} edit request recorded. Code changes are kept as a patch request instead of changing runtime code directly.`;
        }
        return `Edit request recorded for ${item.categoryLabel} / ${item.title}.`;
    }

    function createWorkspaceAssetDataUrl(prompt, label) {
        const seed = Array.from(String(prompt || label)).reduce((sum, char) => sum + char.charCodeAt(0), 0);
        const hueA = seed % 360;
        const hueB = (hueA + 72) % 360;
        const assetCanvas = document.createElement('canvas');
        assetCanvas.width = 256;
        assetCanvas.height = 256;
        const assetCtx = assetCanvas.getContext('2d');
        const gradient = assetCtx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, `hsl(${hueA} 92% 62%)`);
        gradient.addColorStop(1, `hsl(${hueB} 88% 54%)`);
        assetCtx.fillStyle = '#050716';
        assetCtx.fillRect(0, 0, 256, 256);
        assetCtx.fillStyle = gradient;
        assetCtx.beginPath();
        assetCtx.arc(128, 112, 72, 0, Math.PI * 2);
        assetCtx.fill();
        assetCtx.fillStyle = 'rgba(255,255,255,0.92)';
        assetCtx.font = '900 24px Inter, sans-serif';
        assetCtx.textAlign = 'center';
        assetCtx.fillText(String(label || 'AI').slice(0, 14), 128, 214);
        return assetCanvas.toDataURL('image/png');
    }

    function inferMechanicValue(itemId, prompt, current = 1) {
        const text = String(prompt || '').toLowerCase();
        const percentMatch = text.match(/(\d+(?:\.\d+)?)\s*%/);
        const ratio = percentMatch ? Number(percentMatch[1]) / 100 : 0.2;
        const wantsLower = /lower|reduce|slower|less|decrease|weaker|easier|smaller|down|nerf/i.test(text);
        const wantsHigher = /higher|increase|faster|more|raise|stronger|harder|larger|up|buff/i.test(text);
        const direction = wantsLower && !wantsHigher ? -1 : 1;
        if (itemId === 'combat.fireRate') {
            return Math.max(0.08, Math.min(1.5, current * (direction > 0 ? 1 - ratio : 1 + ratio)));
        }
        if (itemId === 'combat.damage') {
            return Math.max(4, Math.min(80, current * (direction > 0 ? 1 + ratio : 1 - ratio)));
        }
        if (itemId === 'combat.enemySpeed') {
            return Math.max(0.45, Math.min(2.4, current * (direction > 0 ? 1 + ratio : 1 - ratio)));
        }
        return current;
    }
    function addWorkspaceHistoryRecord(workspace, record) {
        const historyRoot = workspace.__historySidebar || workspace;
        const list = historyRoot.querySelector('[data-edit-history-list]');
        const empty = historyRoot.querySelector('[data-edit-history-empty]');
        if (!list) return;
        if (empty) empty.remove();
        const state = getWorkspaceState(workspace);
        state.historyVersion = Math.max(1, Number(state.historyVersion || 1)) + 1;
        const versionLabel = record.version || `v${state.historyVersion}`;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'change-history-record';
        button.dataset.historyPrompt = record.prompt;
        button.innerHTML = `
            <span class="change-record-top">
                <strong><em>${escapeHtml(versionLabel)}</em>${escapeHtml(record.title)}</strong>
                <small>${escapeHtml(record.category)}</small>
            </span>
            <span class="change-record-prompt">${escapeHtml(record.prompt)}</span>
            <span class="change-record-meta">${escapeHtml(record.summary)}</span>
        `;
        button.addEventListener('click', () => {
            const input = chatInputField;
            if (!input) return;
            setChatInputValue(record.prompt, { focus: true, cursorToEnd: true });
        });
        list.prepend(button);
    }

    function addPreviewChatRecord(workspace, record) {
        const panel = workspace.querySelector('[data-preview-chat-panel]');
        const status = panel ? panel.querySelector('[data-workspace-edit-context]') : null;
        if (!panel || !record) return;
        const userBubble = document.createElement('div');
        userBubble.className = 'preview-chat-user-bubble';
        userBubble.textContent = record.prompt;
        const time = document.createElement('div');
        time.className = 'preview-chat-time';
        time.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const response = document.createElement('p');
        response.className = 'preview-chat-assistant-note';
        response.innerHTML = `<strong>${escapeHtml(record.title)}</strong> updated. ${escapeHtml(record.summary)}`;
        if (status) {
            panel.insertBefore(userBubble, status);
            panel.insertBefore(time, status);
            panel.insertBefore(response, status);
        } else {
            panel.appendChild(userBubble);
            panel.appendChild(time);
            panel.appendChild(response);
        }
        panel.scrollTop = panel.scrollHeight;
    }

    function ensureWorkspaceAiWorkStyles() {
        if (document.getElementById('workspaceAiWorkStyles')) return;
        const style = document.createElement('style');
        style.id = 'workspaceAiWorkStyles';
        style.textContent = `
            .workspace-ai-work-card {
                display: grid;
                gap: 0.52rem;
                padding: 0.72rem 0.78rem;
                border-radius: 14px;
                border: 1px solid rgba(116, 229, 255, 0.18);
                background: linear-gradient(135deg, rgba(94, 231, 255, 0.1), rgba(139, 92, 246, 0.08)), rgba(8, 12, 28, 0.76);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
                color: rgba(241, 245, 249, 0.92);
            }
            .workspace-ai-work-card.done {
                border-color: rgba(34, 197, 94, 0.22);
                background: linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(94, 231, 255, 0.06)), rgba(8, 12, 28, 0.78);
            }
            .workspace-ai-work-head {
                display: flex;
                align-items: center;
                gap: 0.46rem;
            }
            .workspace-ai-work-head span {
                display: grid;
                place-items: center;
                width: 1.15rem;
                height: 1.15rem;
                border-radius: 999px;
                background: rgba(94, 231, 255, 0.14);
                color: #9befef;
                font-size: 0.72rem;
                font-weight: 900;
            }
            .workspace-ai-work-card.done .workspace-ai-work-head span {
                background: rgba(34, 197, 94, 0.16);
                color: #86efac;
            }
            .workspace-ai-work-head strong {
                font-size: 0.78rem;
                color: #f8fafc;
            }
            .workspace-ai-work-card p,
            .workspace-ai-work-card li,
            .workspace-ai-work-card small {
                margin: 0;
                color: rgba(203, 213, 225, 0.74);
                font-size: 0.68rem;
                line-height: 1.45;
            }
            .workspace-ai-work-card ol {
                display: grid;
                gap: 0.28rem;
                margin: 0;
                padding-left: 1.15rem;
            }
            .workspace-ai-file-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.34rem;
                padding-top: 0.08rem;
            }
            .workspace-ai-file-list small {
                flex-basis: 100%;
                color: rgba(155, 239, 255, 0.72);
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.04em;
            }
            .workspace-ai-file-list code {
                max-width: 100%;
                padding: 0.18rem 0.38rem;
                border-radius: 7px;
                background: rgba(15, 23, 42, 0.82);
                border: 1px solid rgba(148, 163, 184, 0.16);
                color: #dbeafe;
                font-size: 0.62rem;
                white-space: normal;
                word-break: break-word;
            }
        `;
        document.head.appendChild(style);
    }

    function addWorkspaceAssistantStatus(workspace, options = {}) {
        ensureWorkspaceAiWorkStyles();
        const panel = workspace.querySelector('[data-preview-chat-panel]');
        const anchor = panel ? panel.querySelector('[data-workspace-edit-context]') : null;
        if (!panel) return null;
        const card = document.createElement('div');
        card.className = `workspace-ai-work-card ${options.state === 'done' ? 'done' : 'working'}`;
        if (options.id) card.dataset.workStatusId = options.id;
        const steps = Array.isArray(options.steps) ? options.steps : [];
        const files = Array.isArray(options.files) ? options.files : [];
        card.innerHTML = [
            '<div class="workspace-ai-work-head">',
            `<span aria-hidden="true">${options.state === 'done' ? '✓' : '•'}</span>`,
            `<strong>${escapeHtml(options.title || (options.state === 'done' ? 'Changes applied' : 'Working on your change'))}</strong>`,
            '</div>',
            options.body ? `<p>${escapeHtml(options.body)}</p>` : '',
            steps.length ? `<ol>${steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}</ol>` : '',
            files.length ? [
                '<div class="workspace-ai-file-list">',
                '<small>Updated files</small>',
                files.map(file => `<code>${escapeHtml(file)}</code>`).join(''),
                '</div>'
            ].join('') : ''
        ].join('');
        if (anchor) panel.insertBefore(card, anchor);
        else panel.appendChild(card);
        panel.scrollTop = panel.scrollHeight;
        return card;
    }

    function updateWorkspaceAssistantStatus(workspace, id, options = {}) {
        const panel = workspace.querySelector('[data-preview-chat-panel]');
        const existing = panel ? panel.querySelector(`[data-work-status-id="${CSS.escape(id)}"]`) : null;
        if (existing) existing.remove();
        return addWorkspaceAssistantStatus(workspace, { ...options, id });
    }

    function scrollPreviewChatToLatest(workspace, behavior = 'auto') {
        if (!workspace || !workspace.isConnected) return;
        const panel = workspace.querySelector('[data-preview-chat-panel]');
        if (!panel) return;
        const scroll = () => {
            panel.scrollTop = panel.scrollHeight;
            const latest = panel.querySelector('[data-workspace-edit-context]') || panel.lastElementChild;
            if (latest && latest.scrollIntoView) {
                latest.scrollIntoView({ behavior, block: 'end', inline: 'nearest' });
            }
        };
        scroll();
        window.setTimeout(scroll, 80);
    }

    function addWorkspaceSystemNotice(workspace, title, summary, prompt = 'Workspace notice') {
        if (!workspace || !workspace.isConnected) return;
        addPreviewChatRecord(workspace, {
            title: title || 'Workspace',
            prompt,
            summary: summary || ''
        });
    }

    function updateNumericControlDisplay(workspace, itemId, value) {
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!setting) return;
        const safeValue = clampWorkspaceNumber(value, setting.min, setting.max);
        workspace.querySelectorAll(`[data-numeric-range="${CSS.escape(itemId)}"], [data-numeric-number="${CSS.escape(itemId)}"]`).forEach(input => {
            input.value = safeValue;
        });
        workspace.querySelectorAll(`[data-numeric-output="${CSS.escape(itemId)}"]`).forEach(output => {
            output.textContent = setting.format(safeValue);
        });
    }

    function applyWorkspaceNumericValue(workspace, itemId, value, options = {}) {
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!setting) return;
        const state = getWorkspaceState(workspace);
        const safeValue = clampWorkspaceNumber(value, setting.min, setting.max);
        state.numericValues[itemId] = safeValue;
        updateNumericControlDisplay(workspace, itemId, safeValue);
        const runtime = findWorkspaceRuntime(workspace);
        const edit = { itemId, value: safeValue, runtimeKey: setting.runtimeKey, source: 'direct-control' };
        let summary = `${setting.label} preview value is ${setting.format(safeValue)}.`;
        if (runtime && runtime.canDirectApply && runtime.applyEdit) {
            runtime.applyEdit(edit);
            summary = `${setting.label} applied to the current preview as ${setting.format(safeValue)}.`;
        } else {
            const existing = state.pendingRuntimePatches.find(patch => patch.type === 'numeric' && patch.itemId === itemId);
            const patch = {
                type: 'numeric',
                itemId,
                runtimeKey: setting.runtimeKey,
                value: safeValue,
                reason: 'Preview iframe cannot apply this value directly; re-run preview to use it.'
            };
            if (existing) Object.assign(existing, patch);
            else state.pendingRuntimePatches.push(patch);
            summary = `${setting.label} recorded as ${setting.format(safeValue)}. Re-run preview to apply it.`;
        }
        if (options.commit) {
            addWorkspaceHistoryRecord(workspace, {
                title: setting.label,
                category: 'Numeric tuning',
                prompt: `Set ${setting.label} to ${setting.format(safeValue)}`,
                summary
            });
            addPreviewChatRecord(workspace, {
                title: setting.label,
                prompt: `Set ${setting.label} = ${setting.format(safeValue)}`,
                summary
            });
        }
    }

    function bindWorkspaceNumericControls(workspace) {
        Object.keys(WORKSPACE_NUMERIC_SETTINGS).forEach(itemId => updateNumericControlDisplay(workspace, itemId, workspaceNumericValue(workspace, itemId)));
        workspace.querySelectorAll('[data-numeric-range], [data-numeric-number]').forEach(input => {
            const itemId = input.dataset.numericRange || input.dataset.numericNumber;
            input.addEventListener('input', () => applyWorkspaceNumericValue(workspace, itemId, input.value, { commit: false }));
            input.addEventListener('change', () => applyWorkspaceNumericValue(workspace, itemId, input.value, { commit: false }));
        });
        workspace.querySelectorAll('[data-numeric-apply]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.dataset.numericApply;
                const input = workspace.querySelector(`[data-numeric-number="${CSS.escape(itemId)}"]`);
                applyWorkspaceNumericValue(workspace, itemId, input ? input.value : workspaceNumericValue(workspace, itemId), { commit: true });
            });
        });
        workspace.querySelectorAll('[data-numeric-reset]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.dataset.numericReset;
                const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
                if (setting) applyWorkspaceNumericValue(workspace, itemId, setting.defaultValue, { commit: true });
            });
        });
        workspace.querySelectorAll('[data-numeric-preset]').forEach(button => {
            button.addEventListener('click', () => {
                applyWorkspaceNumericValue(workspace, button.dataset.numericPreset, button.dataset.presetValue, { commit: true });
            });
        });
        workspace.querySelectorAll('[data-numeric-prompt]').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.dataset.numericPrompt;
                const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
                const value = workspaceNumericValue(workspace, itemId);
                if (chatInputField && setting) {
                    setChatInputValue(`Set ${setting.label} to ${setting.format(value)} and keep the core gameplay unchanged.`, { focus: true, cursorToEnd: true });
                }
            });
        });
    }

    function bindWorkspaceMediaControls(workspace, plan) {
        const state = getWorkspaceState(workspace);
        state.__workspace = workspace;
        const mediaPanel = workspace.querySelector('[data-edit-module="media"]');
        const render = () => {
            if (!mediaPanel) return;
            mediaPanel.innerHTML = buildWorkspaceMediaPanelHtml(plan && plan.generatedProject, state);
            bindWorkspaceMediaControls(workspace, plan);
        };
        workspace.querySelectorAll('[data-media-category]').forEach(button => {
            button.addEventListener('click', () => {
                state.selectedMediaKey = button.dataset.mediaCategory;
                workspace.__selectedItemId = button.dataset.editItem || workspace.__selectedItemId;
                render();
            });
        });
        workspace.querySelectorAll('[data-media-back]').forEach(button => {
            button.addEventListener('click', () => {
                state.selectedMediaKey = '';
                render();
            });
        });
        workspace.querySelectorAll('[data-media-select]').forEach(button => {
            button.addEventListener('click', () => {
                state.selectedMediaAssetId = button.dataset.mediaSelect;
                const assets = collectWorkspaceMediaAssets(plan && plan.generatedProject, workspace);
                const asset = assets.find(item => item.id === state.selectedMediaAssetId);
                if (asset) {
                    workspace.__selectedItemId = findMediaCategory(asset.categoryKey)?.category.targetItemId || workspace.__selectedItemId;
                    if (chatInputField) {
                        chatInputField.placeholder = `Describe how to replace or polish ${asset.file}...`;
                    }
                }
                render();
            });
        });
        workspace.querySelectorAll('[data-media-replace]').forEach(button => {
            button.addEventListener('click', () => {
                state.selectedMediaAssetId = button.dataset.mediaReplace;
                const assets = collectWorkspaceMediaAssets(plan && plan.generatedProject, workspace);
                const asset = assets.find(item => item.id === state.selectedMediaAssetId);
                const target = asset ? findMediaCategory(asset.categoryKey)?.category.targetItemId : workspace.__selectedItemId;
                workspace.__selectedItemId = target || workspace.__selectedItemId;
                const toolId = recommendedToolForTarget(workspace.__selectedItemId);
                if (DROI_GAME_TOOL_EMBED_AVAILABLE) {
                    openDroiGameToolOverlay(workspace, plan, toolId);
                } else if (chatInputField) {
                    setChatInputValue(`Replace ${asset ? asset.path : 'the selected asset'} with a new visual asset, keeping gameplay unchanged.`, { focus: true, cursorToEnd: true });
                }
            });
        });
        workspace.querySelectorAll('[data-media-copy]').forEach(button => {
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(button.dataset.mediaCopy || '');
                } catch (error) {
                    if (chatInputField) setChatInputValue(button.dataset.mediaCopy || '', { focus: true, cursorToEnd: true });
                }
            });
        });
    }

    function bindWorkspaceCodeControls(workspace, plan) {
        const project = plan && plan.generatedProject ? plan.generatedProject : null;
        const generated = plan && plan.generatedSpec ? plan.generatedSpec : null;
        const files = buildWorkspaceCodeFiles(project, generated, workspace);
        const findFile = path => files.find(file => file.path === path);
        const renderFile = (root, path) => {
            const file = findFile(path);
            const titlebar = root.querySelector('[data-code-titlebar]');
            const preview = root.querySelector('[data-code-preview] code');
            const summary = root.querySelector('[data-code-summary]');
            root.querySelectorAll('[data-code-file]').forEach(button => button.classList.toggle('active', button.dataset.codeFile === path));
            if (summary) summary.innerHTML = `<strong>${files.length} files</strong><small>${escapeHtml(file ? file.path : 'Directory selected')}</small>`;
            if (titlebar) {
                titlebar.innerHTML = `
                    <span class="generated-file-icon">${escapeHtml(file ? workspaceFileBadge(file.path) : 'DIR')}</span>
                    <strong>${escapeHtml(file ? file.path : 'Directory')}</strong>
                    <small>${escapeHtml(file ? (file.language || 'file') : 'folder')}</small>
                `;
            }
            if (preview) {
                preview.textContent = file
                    ? (file.text ? (file.content || '') : `Binary or external asset\n${file.path}\n\nUse Save ZIP to export references and workspace patches.`)
                    : 'Select a file to preview. Folder selections intentionally keep this pane empty.';
            }
        };
        const applyFilter = root => {
            const search = String(root.querySelector('[data-code-search]')?.value || '').toLowerCase();
            const filter = root.querySelector('[data-code-filter]')?.value || 'all';
            root.querySelectorAll('[data-code-file]').forEach(button => {
                const path = button.dataset.codeFile || '';
                const kind = button.dataset.codeKind || '';
                const matchSearch = !search || path.toLowerCase().includes(search);
                const matchFilter = filter === 'all' || kind === filter || (filter === 'assets' && path.startsWith('assets/'));
                button.style.display = matchSearch && matchFilter ? '' : 'none';
            });
        };
        workspace.querySelectorAll('[data-code-file]').forEach(button => {
            button.addEventListener('click', () => renderFile(workspace, button.dataset.codeFile));
        });
        workspace.querySelectorAll('[data-code-search], [data-code-filter]').forEach(control => {
            control.addEventListener('input', () => applyFilter(workspace));
            control.addEventListener('change', () => applyFilter(workspace));
        });
        workspace.querySelectorAll('[data-code-open-modal]').forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.createElement('div');
                modal.className = 'workspace-code-modal open';
                modal.innerHTML = `
                    <div class="workspace-code-modal-backdrop" data-code-modal-close></div>
                    <div class="workspace-code-modal-shell">
                        <header class="workspace-code-modal-head">
                            <div><span>Generated source</span><strong>Code tree and file preview</strong></div>
                            <button type="button" class="workspace-code-modal-close" data-code-modal-close>Close</button>
                        </header>
                        ${buildCodePanelHtml(project, generated)}
                    </div>
                `;
                document.body.appendChild(modal);
                document.body.classList.add('workspace-code-modal-open');
                const close = () => {
                    modal.remove();
                    document.body.classList.remove('workspace-code-modal-open');
                };
                modal.querySelectorAll('[data-code-modal-close]').forEach(closeButton => closeButton.addEventListener('click', close));
                modal.querySelectorAll('[data-code-file]').forEach(fileButton => fileButton.addEventListener('click', () => renderFile(modal, fileButton.dataset.codeFile)));
                modal.querySelectorAll('[data-code-search], [data-code-filter]').forEach(control => {
                    control.addEventListener('input', () => applyFilter(modal));
                    control.addEventListener('change', () => applyFilter(modal));
                });
            });
        });
    }

    let activeGameEditSubmitCleanup = null;

    function initGameEditWorkspace(container, plan) {
        const workspace = container.querySelector('[data-game-workspace]');
        if (!workspace) return;
        document.body.classList.add('game-edit-workspace-active');
        const historySidebar = workspace.querySelector('.change-history-sidebar');
        const editSidebar = workspace.querySelector('.game-edit-sidebar');
        workspace.__historySidebar = historySidebar || workspace;
        workspace.__editSidebar = editSidebar || workspace;
        const topbar = container.querySelector('.generated-workspace-topbar');
        const filesCard = container.querySelector('.generated-workspace-files-card');
        let auxPanel = null;
        const useLegacyAuxPanel = !workspace.classList.contains('generated-game-page');
        if (useLegacyAuxPanel) {
            auxPanel = document.createElement('aside');
            auxPanel.className = 'workspace-aux-panel';
            auxPanel.setAttribute('aria-label', 'Workspace output links');
            const auxToggle = document.createElement('button');
            auxToggle.type = 'button';
            auxToggle.className = 'workspace-aux-toggle';
            auxToggle.textContent = 'Preview & files';
            auxToggle.setAttribute('aria-expanded', 'false');
            auxPanel.appendChild(auxToggle);
            if (topbar) {
                auxPanel.appendChild(topbar);
                topbar.classList.add('workspace-aux-card');
            }
            if (filesCard) {
                auxPanel.appendChild(filesCard);
                filesCard.classList.add('workspace-aux-card');
            }
            if (auxPanel.children.length) document.body.appendChild(auxPanel);
            auxToggle.addEventListener('click', () => {
                const open = !auxPanel.classList.contains('open');
                auxPanel.classList.toggle('open', open);
                auxToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        } else {
            if (topbar) topbar.setAttribute('hidden', '');
            if (filesCard) filesCard.setAttribute('hidden', '');
        }
        const historyToggle = historySidebar ? historySidebar.querySelector('[data-workspace-panel-toggle="history"]') : null;
        const editToggle = editSidebar ? editSidebar.querySelector('[data-workspace-panel-toggle="edit"]') : null;
        const mobileDrawerControls = workspace.classList.contains('generated-game-page')
            ? [
                { side: 'history', label: 'Version history', glyph: '\u2039', panel: historySidebar, originalToggle: historyToggle },
                { side: 'edit', label: 'Edit tools', glyph: '\u203a', panel: editSidebar, originalToggle: editToggle }
            ].filter(control => control.panel)
            : [];
        mobileDrawerControls.forEach(control => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `mobile-workspace-drawer-toggle mobile-workspace-drawer-toggle-${control.side}`;
            button.dataset.mobileWorkspaceDrawer = control.side;
            button.setAttribute('aria-label', control.label);
            button.setAttribute('aria-expanded', 'false');
            button.textContent = control.glyph;
            document.body.appendChild(button);
            control.button = button;
        });
        const setWorkspaceDrawerOpen = (control, open) => {
            if (!control || !control.panel) return;
            control.panel.classList.toggle('open', open);
            if (control.originalToggle) control.originalToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            if (control.button) {
                control.button.setAttribute('aria-expanded', open ? 'true' : 'false');
                control.button.classList.toggle('open', open);
            }
        };
        mobileDrawerControls.forEach(control => {
            control.button.addEventListener('click', () => {
                const open = !control.panel.classList.contains('open');
                mobileDrawerControls.forEach(other => {
                    if (other !== control) setWorkspaceDrawerOpen(other, false);
                });
                setWorkspaceDrawerOpen(control, open);
            });
        });
        const mobileViewSwitch = workspace.classList.contains('generated-game-page')
            ? document.createElement('div')
            : null;
        let setMobilePreviewMode = () => {};
        if (mobileViewSwitch) {
            mobileViewSwitch.className = 'mobile-workspace-view-switch';
            mobileViewSwitch.setAttribute('aria-label', 'Mobile workspace view');
            mobileViewSwitch.innerHTML = `
                <button type="button" class="active" data-mobile-workspace-view="chat" aria-pressed="true">Chat</button>
                <button type="button" data-mobile-workspace-view="preview" aria-pressed="false">Preview</button>
            `;
            document.body.appendChild(mobileViewSwitch);
            const playableShell = workspace.querySelector('.playable-shell');
            const mobilePreviewToggle = workspace.querySelector('[data-game-action="mobile-preview-toggle"]');
            const updateMobileViewSwitch = () => {
                const previewOpen = Boolean(playableShell && playableShell.classList.contains('preview-open'));
                mobileViewSwitch.querySelectorAll('[data-mobile-workspace-view]').forEach(button => {
                    const active = button.dataset.mobileWorkspaceView === (previewOpen ? 'preview' : 'chat');
                    button.classList.toggle('active', active);
                    button.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
            };
            setMobilePreviewMode = mode => {
                if (!playableShell || !mobilePreviewToggle) return;
                const shouldPreview = mode === 'preview';
                const isPreviewOpen = playableShell.classList.contains('preview-open');
                if (shouldPreview !== isPreviewOpen) {
                    mobilePreviewToggle.click();
                }
                updateMobileViewSwitch();
                window.setTimeout(updateMobileViewSwitch, 80);
                if (!shouldPreview) scrollPreviewChatToLatest(workspace, 'smooth');
            };
            mobileViewSwitch.querySelectorAll('[data-mobile-workspace-view]').forEach(button => {
                button.addEventListener('click', () => {
                    mobileDrawerControls.forEach(control => setWorkspaceDrawerOpen(control, false));
                    setMobilePreviewMode(button.dataset.mobileWorkspaceView);
                    workspace.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });
            });
            if (mobilePreviewToggle) {
                mobilePreviewToggle.addEventListener('click', () => window.setTimeout(updateMobileViewSwitch, 80));
            }
            updateMobileViewSwitch();
        }
        if (historyToggle) {
            historyToggle.addEventListener('click', () => {
                const open = !historySidebar.classList.contains('open');
                historySidebar.classList.toggle('open', open);
                historyToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                const mobileControl = mobileDrawerControls.find(control => control.side === 'history');
                if (mobileControl && mobileControl.button) {
                    mobileControl.button.setAttribute('aria-expanded', open ? 'true' : 'false');
                    mobileControl.button.classList.toggle('open', open);
                }
            });
        }
        if (editToggle) {
            editToggle.addEventListener('click', () => {
                const open = !editSidebar.classList.contains('open');
                editSidebar.classList.toggle('open', open);
                editToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                const mobileControl = mobileDrawerControls.find(control => control.side === 'edit');
                if (mobileControl && mobileControl.button) {
                    mobileControl.button.setAttribute('aria-expanded', open ? 'true' : 'false');
                    mobileControl.button.classList.toggle('open', open);
                }
            });
        }
        activeGameCleanups.push(() => {
            if (auxPanel && auxPanel.parentElement) auxPanel.remove();
            mobileDrawerControls.forEach(control => {
                if (control.button && control.button.parentElement) control.button.remove();
            });
            if (mobileViewSwitch && mobileViewSwitch.parentElement) mobileViewSwitch.remove();
            document.body.classList.remove('game-edit-workspace-active');
        });
        const context = workspace.querySelector('[data-workspace-edit-context]');
        const editRoot = workspace.__editSidebar || workspace;
        workspace.__container = container;
        workspace.__plan = plan;
        const state = getWorkspaceState(workspace);
        state.__workspace = workspace;
        let selectedItem = null;

        function setWorkspaceMode(mode) {
            const compactWorkspace = window.matchMedia ? window.matchMedia('(max-width: 1023px)').matches : false;
            if (mode === 'advanced' && compactWorkspace) {
                const warning = workspace.querySelector('[data-compact-mode-warning]');
                if (warning) {
                    warning.classList.add('show');
                    warning.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                workspace.querySelectorAll('[data-workspace-mode-set]').forEach(button => {
                    const active = button.dataset.workspaceModeSet === 'beginner';
                    button.classList.toggle('active', active);
                    button.classList.toggle('is-muted', !active);
                    button.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
                addPreviewChatRecord(workspace, {
                    title: 'Advanced mode unavailable on this screen',
                    prompt: 'Open Advanced mode',
                    summary: 'Advanced tools need the desktop workspace. Please open this generated game on a PC to use Media, Code and local tools.'
                });
                return;
            }
            const nextMode = mode === 'advanced' ? 'advanced' : 'beginner';
            const wasMode = workspace.dataset.workspaceMode;
            state.mode = nextMode;
            workspace.dataset.workspaceMode = nextMode;
            workspace.classList.toggle('is-advanced-mode', nextMode === 'advanced');
            workspace.classList.toggle('is-beginner-mode', nextMode !== 'advanced');
            const warning = workspace.querySelector('[data-compact-mode-warning]');
            if (warning) warning.classList.toggle('show', nextMode === 'advanced' && compactWorkspace);
            const modeLabel = workspace.querySelector('[data-workspace-mode-label]');
            if (modeLabel) modeLabel.textContent = nextMode === 'advanced' ? 'Advanced mode' : 'Beginner mode';
            workspace.querySelectorAll('[data-workspace-mode-set]').forEach(button => {
                const active = button.dataset.workspaceModeSet === nextMode;
                button.classList.toggle('active', active);
                button.classList.toggle('is-muted', !active);
                button.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            if (nextMode !== 'advanced') {
                const statsTab = editRoot.querySelector('[data-edit-module-tab="stats"]');
                if (statsTab) statsTab.click();
            }
            if (nextMode === 'advanced' && wasMode && wasMode !== 'advanced') {
                addPreviewChatRecord(workspace, {
                    title: 'Advanced mode',
                    prompt: 'Switch to Advanced workspace',
                    summary: 'Advanced mode shows media assets, files and the local Droi-Game-Tool set.'
                });
            }
        }

        workspace.querySelectorAll('[data-workspace-mode-set]').forEach(button => {
            button.addEventListener('click', () => setWorkspaceMode(button.dataset.workspaceModeSet));
        });
        setWorkspaceMode('beginner');

        function closeMobilePreviewForChat() {
            const mobilePreviewMedia = window.matchMedia ? window.matchMedia('(max-width: 720px)') : null;
            if (mobilePreviewMedia && !mobilePreviewMedia.matches) return;
            const shell = workspace.querySelector('.playable-shell');
            const toggle = workspace.querySelector('[data-game-action="mobile-preview-toggle"]');
            if (!shell || !shell.classList.contains('preview-open')) return;
            shell.classList.remove('preview-open');
            if (toggle) {
                toggle.textContent = 'Open game preview';
                toggle.setAttribute('aria-expanded', 'false');
            }
            const runtime = container.__gameEditRuntime;
            if (runtime && runtime.setPaused) runtime.setPaused(true);
            setMobilePreviewMode('chat');
            scrollPreviewChatToLatest(workspace, 'smooth');
        }

        function setNeutralEditContext() {
            if (context) {
                context.innerHTML = '<strong>Ready for edits:</strong> Describe the change below. I will route art, numbers, audio, or files automatically. <small>Open Tools to pick a precise target.</small>';
            }
            if (chatInputField) {
                chatInputField.placeholder = 'Describe what to change, e.g. make the art style softer...';
            }
        }

        function selectItem(itemId) {
            selectedItem = findGameEditItem(itemId) || selectedItem;
            workspace.__selectedItemId = itemId;
            editRoot.querySelectorAll('[data-edit-item]').forEach(button => {
                button.classList.toggle('selected', button.dataset.editItem === itemId);
            });
            if (context && selectedItem) {
                context.innerHTML = `<strong>Editing:</strong> ${escapeHtml(selectedItem.categoryLabel)} / ${escapeHtml(selectedItem.title)} <small>Impact: ${escapeHtml(selectedItem.helper || selectedItem.meta || 'Affects the current generated game.')}</small>`;
            }
            if (chatInputField && selectedItem) {
                chatInputField.placeholder = `Describe how to edit ${selectedItem.title}...`;
            }
            closeMobilePreviewForChat();
        }

        function applyWorkspacePrompt(prompt) {
            if (!prompt) return false;
            const inferredItemId = inferWorkspaceEditTargetFromPrompt(prompt, selectedItem ? selectedItem.id : '');
            const inferredItem = findGameEditItem(inferredItemId);
            if (inferredItem) {
                selectedItem = inferredItem;
                workspace.__selectedItemId = inferredItem.id;
                editRoot.querySelectorAll('[data-edit-item]').forEach(button => {
                    button.classList.toggle('selected', button.dataset.editItem === inferredItem.id);
                });
                if (context) {
                    context.innerHTML = `<strong>Editing:</strong> ${escapeHtml(inferredItem.categoryLabel)} / ${escapeHtml(inferredItem.title)} <small>Inferred from your prompt. Gameplay template remains locked.</small>`;
                }
                if (chatInputField) {
                    chatInputField.placeholder = `Describe how to edit ${inferredItem.title}...`;
                }
            }
            if (!selectedItem) return false;
            const runtime = container.__gameEditRuntime;
            const currentConfig = runtime && runtime.getConfig ? runtime.getConfig() : {};
            const editState = getWorkspaceState(workspace);
            let summary = workspaceEditSummaryForItem(selectedItem, prompt);
            const edit = { itemId: selectedItem.id, prompt };
            const workStatusId = `workspace-edit-${Date.now()}`;
            addWorkspaceAssistantStatus(workspace, {
                id: workStatusId,
                state: 'working',
                title: 'Applying your edit',
                body: `I inferred this as ${selectedItem.categoryLabel} / ${selectedItem.title}.`,
                steps: [
                    'Read the current generated game workspace.',
                    'Map the prompt to the correct editable target.',
                    'Prepare file patches without changing the locked base gameplay.'
                ]
            });

            if (selectedItem.id === 'art.player') {
                edit.assetUrl = createWorkspaceAssetDataUrl(prompt, 'Player');
                summary = 'Player image preview updated in the canvas runtime.';
            } else if (selectedItem.type === 'image') {
                edit.assetUrl = createWorkspaceAssetDataUrl(prompt, selectedItem.title);
                const existing = editState.pendingRuntimePatches.find(patch => patch.type === 'visual-prompt' && patch.itemId === selectedItem.id);
                const patch = {
                    type: 'visual-prompt',
                    itemId: selectedItem.id,
                    category: selectedItem.categoryLabel,
                    title: selectedItem.title,
                    prompt,
                    reason: 'Visual prompt recorded in the workspace; re-run preview/export patches to apply it to generated assets.'
                };
                if (existing) Object.assign(existing, patch);
                else editState.pendingRuntimePatches.push(patch);
                summary = `${selectedItem.categoryLabel} / ${selectedItem.title} art style request recorded. I kept the base gameplay locked and queued this as a visual patch for this generated game.`;
            } else if (selectedItem.id === 'combat.fireRate') {
                edit.value = inferMechanicValue(selectedItem.id, prompt, currentConfig.fireRate || 0.55);
                summary = `Fire rate cooldown set to ${edit.value.toFixed(2)}s.`;
            } else if (selectedItem.id === 'combat.damage') {
                edit.value = inferMechanicValue(selectedItem.id, prompt, currentConfig.damage || 18);
                summary = `Damage set to ${Math.round(edit.value)}.`;
            } else if (selectedItem.id === 'combat.enemySpeed') {
                edit.value = inferMechanicValue(selectedItem.id, prompt, currentConfig.enemySpeedMultiplier || 1);
                summary = `Enemy speed multiplier set to ${edit.value.toFixed(2)}x.`;
            } else if (selectedItem.type === 'audio') {
                const existing = editState.pendingRuntimePatches.find(patch => patch.type === 'audio-prompt' && patch.itemId === selectedItem.id);
                const patch = {
                    type: 'audio-prompt',
                    itemId: selectedItem.id,
                    category: selectedItem.categoryLabel,
                    title: selectedItem.title,
                    prompt,
                    reason: 'Audio prompt recorded in the workspace; audio generation/export is a later runtime step.'
                };
                if (existing) Object.assign(existing, patch);
                else editState.pendingRuntimePatches.push(patch);
                summary = `${selectedItem.categoryLabel} / ${selectedItem.title} audio request recorded for this workspace.`;
            }

            if (runtime && runtime.applyEdit) runtime.applyEdit(edit);
            const filePatch = applyWorkspaceFilePatch(workspace, plan, selectedItem, prompt, edit);
            if (filePatch) refreshWorkspaceCodePanel(workspace, plan);
            const updatedFiles = filePatch ? [
                'assets/manifest.json',
                'spec/game.json',
                'spec/generated-game-spec.json',
                'generation-report.json',
                'workspace-edits/latest-edit.json',
                'workspace-edits/latest-edit.md'
            ] : [];
            updateWorkspaceAssistantStatus(workspace, workStatusId, {
                state: 'done',
                title: 'Edit applied to generated files',
                body: filePatch
                    ? `${summary} The Code panel and Save ZIP now include this patch.`
                    : summary,
                steps: filePatch ? [
                    `Target: ${selectedItem.categoryLabel} / ${selectedItem.title}`,
                    'Base gameplay template stayed locked.',
                    'Generated file patches were refreshed in the Code panel.'
                ] : [
                    `Target: ${selectedItem.categoryLabel} / ${selectedItem.title}`,
                    'Edit request was recorded in the workspace.'
                ],
                files: updatedFiles
            });
            workspace.__editVersion = (workspace.__editVersion || 0) + 1;
            addWorkspaceHistoryRecord(workspace, {
                title: selectedItem.title,
                category: selectedItem.categoryLabel,
                prompt,
                summary: filePatch ? `${summary} Generated project files updated.` : summary
            });
            addPreviewChatRecord(workspace, {
                title: selectedItem.title,
                prompt,
                summary: filePatch ? `${summary} I also updated the generated files in the Code panel.` : summary
            });
            closeMobilePreviewForChat();
            return true;
        }

        function submitFromBottomInput(event) {
            if (!chatInputField || !workspace.isConnected) return;
            const prompt = chatInputField.value.trim();
            if (!prompt) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            if (applyWorkspacePrompt(prompt)) {
                setChatInputValue('', { dispatch: true });
            }
        }

        editRoot.querySelectorAll('[data-edit-module-tab]').forEach(button => {
            button.addEventListener('click', () => {
                const moduleId = button.dataset.editModuleTab;
                editRoot.querySelectorAll('[data-edit-module-tab]').forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.editModuleTab === moduleId);
                });
                editRoot.querySelectorAll('[data-edit-module]').forEach(panel => {
                    panel.classList.toggle('active', panel.dataset.editModule === moduleId);
                });
                const firstItem = editRoot.querySelector(`[data-edit-module="${moduleId}"] [data-edit-item]`);
                if (firstItem) selectItem(firstItem.dataset.editItem);
            });
        });

        editRoot.querySelectorAll('[data-droi-tool-open]').forEach(button => {
            button.addEventListener('click', () => {
                openDroiGameToolOverlay(workspace, plan, button.dataset.droiToolOpen);
            });
        });

        const saveButton = workspace.querySelector('[data-workspace-save]');
        if (saveButton) saveButton.addEventListener('click', () => saveWorkspaceZip(workspace, plan));

        editRoot.querySelectorAll('[data-edit-category-toggle]').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.editCategoryToggle;
                const section = Array.from(editRoot.querySelectorAll('[data-edit-category]'))
                    .find(candidate => candidate.dataset.editCategory === id);
                if (!section) return;
                const expanded = !section.classList.contains('active');
                section.classList.toggle('active', expanded);
                button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            });
        });

        editRoot.querySelectorAll('[data-edit-item]').forEach(button => {
            button.addEventListener('click', () => {
                selectItem(button.dataset.editItem);
                if (chatInputField) chatInputField.focus();
            });
        });

        bindWorkspaceNumericControls(workspace);
        bindWorkspaceMediaControls(workspace, plan);
        bindWorkspaceCodeControls(workspace, plan);

        if (activeGameEditSubmitCleanup) activeGameEditSubmitCleanup();
        let workspaceSubmitLock = false;
        const onSendClick = event => {
            if (event.target && event.target.closest && event.target.closest('#chatSendBtn')) {
                submitFromBottomInput(event);
            }
        };
        const onSendPointer = event => {
            if (!event.target || !event.target.closest || !event.target.closest('#chatSendBtn')) return;
            if (!chatInputField || !chatInputField.value.trim()) return;
            if (workspaceSubmitLock) return;
            workspaceSubmitLock = true;
            submitFromBottomInput(event);
            setTimeout(() => {
                workspaceSubmitLock = false;
            }, 0);
        };
        const onInputKeydown = event => {
            if (event.key === 'Enter' && !event.shiftKey) submitFromBottomInput(event);
        };
        if (chatSendBtn) chatSendBtn.addEventListener('click', onSendClick, true);
        document.addEventListener('pointerdown', onSendPointer, true);
        if (chatInputField) chatInputField.addEventListener('keydown', onInputKeydown, true);
        activeGameEditSubmitCleanup = () => {
            if (chatSendBtn) chatSendBtn.removeEventListener('click', onSendClick, true);
            document.removeEventListener('pointerdown', onSendPointer, true);
            if (chatInputField) chatInputField.removeEventListener('keydown', onInputKeydown, true);
        };

        setNeutralEditContext();
        scrollPreviewChatToLatest(workspace);
        const workspaceTestEditPrompt = new URLSearchParams(window.location.search).get('testWorkspaceEditPrompt');
        if (workspaceTestEditPrompt && !workspace.__testWorkspaceEditApplied) {
            workspace.__testWorkspaceEditApplied = true;
            regTimeout(() => {
                applyWorkspacePrompt(workspaceTestEditPrompt);
                scrollPreviewChatToLatest(workspace, 'auto');
            }, 250);
        }
    }

    function mountGeneratedGamePreview(container, plan) {
        const previewFrame = container.querySelector('.template-preview-frame');
        if (previewFrame) {
            const restartBtn = container.querySelector('[data-game-action="restart"]');
            const pauseBtn = container.querySelector('[data-game-action="pause"]');
            const previewButtons = container.querySelectorAll('[data-game-action="preview"]');
            const mobilePreviewToggle = container.querySelector('[data-game-action="mobile-preview-toggle"]');
            const playableShell = container.querySelector('.playable-shell');
            if (restartBtn) restartBtn.addEventListener('click', () => {
                previewFrame.src = previewFrame.src;
            });
            if (pauseBtn) {
                pauseBtn.textContent = 'Focus';
                pauseBtn.addEventListener('click', () => previewFrame.focus());
            }
            previewButtons.forEach(previewButton => {
                previewButton.addEventListener('click', () => {
                    const url = previewButton.dataset.previewUrl || previewFrame.src;
                    if (url) {
                        window.open(url, '_blank', 'noopener');
                        return;
                    }
                    const workspace = container.querySelector('[data-game-workspace]');
                    addWorkspaceSystemNotice(workspace, 'Preview / Play', 'No external preview URL is available for this demo. The playable iframe remains active in the center preview card.', 'Preview URL unavailable');
                });
            });
            if (mobilePreviewToggle && playableShell) {
                mobilePreviewToggle.addEventListener('click', () => {
                    const open = !playableShell.classList.contains('preview-open');
                    playableShell.classList.toggle('preview-open', open);
                    mobilePreviewToggle.textContent = open ? 'Close game preview' : 'Open game preview';
                    mobilePreviewToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
            }
            container.__gameEditRuntime = {
                kind: 'iframe',
                canDirectApply: false,
                applyEdit() {},
                getConfig() { return {}; },
                reset() { previewFrame.src = previewFrame.src; },
                setPaused() {}
            };
            return;
        }
        const canvas = container.querySelector('.game-preview-canvas');
        if (!canvas || !plan || !plan.generatedSpec) return;
        const spec = plan.generatedSpec;
        const isTowerDefense = spec.meta.gameType === 'tower-defense';
        const isBulletHell = spec.meta.gameType === 'bullet-hell';
        const mobilePortrait = window.matchMedia && window.matchMedia('(max-width: 720px) and (orientation: portrait)').matches;
        const usePortraitPreview = Boolean(isBulletHell && mobilePortrait);
        canvas.width = usePortraitPreview ? 360 : 640;
        canvas.height = usePortraitPreview ? 640 : 360;
        canvas.dataset.orientation = usePortraitPreview ? 'portrait' : 'landscape';
        const ctx = canvas.getContext('2d');
        const content = spec.content || {};
        const productPlan = content.productPlan || {};
        const enemyConfig = content.enemies && Object.values(content.enemies).find(enemy => !(enemy.flags || []).includes('boss'));
        const bossConfig = content.enemies && Object.values(content.enemies).find(enemy => (enemy.flags || []).includes('boss'));
        const projectileConfig = content.projectiles || {};
        const bulletPalette = projectileConfig.colors || ['#F093FB', '#74E5FF', '#F8D878'];
        const enemyBulletSpeed = projectileConfig.enemyBulletTypes && projectileConfig.enemyBulletTypes.basic
            ? projectileConfig.enemyBulletTypes.basic.speed
            : 145;
        const keys = new Set();
        let rafId = 0;
        let paused = false;
        let lastTime = performance.now();
        let spawnTimer = 0;
        let attackTimer = 0;
        let enemyShotTimer = 0;
        let bossShotTimer = 0;

        const base = { x: canvas.width / 2, y: canvas.height / 2, hp: isTowerDefense ? 160 : 0 };
        const playerStats = spec.player.components.stats;
        const player = { x: canvas.width / 2, y: canvas.height / 2, r: 12, hp: playerStats.maxHp, speed: playerStats.speed };
        const state = { time: 0, score: 0, level: 1, power: 1, bombs: isBulletHell ? 2 : 0, over: false, won: false, bossSpawned: false, boss: null, enemies: [], bullets: [], enemyBullets: [], towers: [] };
        const runtimeConfig = {
            fireRate: isBulletHell ? 0.22 : 0.55,
            damage: 18,
            enemySpeedMultiplier: 1,
            enemyHpMultiplier: 1,
            waveMultiplier: 1,
            range: isBulletHell ? 420 : 160,
            targetFps: 60,
            playerImage: null,
            playerImageUrl: ''
        };

        function resetGame() {
            player.x = canvas.width / 2;
            player.y = canvas.height / 2;
            player.hp = playerStats.maxHp;
            base.hp = isTowerDefense ? 160 : 0;
            state.time = 0;
            state.score = 0;
            state.level = 1;
            state.power = 1;
            state.bombs = isBulletHell ? 2 : 0;
            state.over = false;
            state.won = false;
            state.bossSpawned = false;
            state.boss = null;
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
            if (pauseBtn) pauseBtn.textContent = 'Pause';
            canvas.focus();
        }

        function setPaused(nextPaused) {
            paused = Boolean(nextPaused);
            if (pauseBtn) pauseBtn.textContent = paused ? 'Resume' : 'Pause';
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
                hp: (isBulletHell ? (enemyConfig ? enemyConfig.hp : 22) : 30) * runtimeConfig.enemyHpMultiplier,
                speed: isTowerDefense ? 44 : (isBulletHell ? (enemyConfig ? enemyConfig.speed : 70) : 58),
                cd: Math.random()
            });
        }

        function shootFrom(x, y, tx, ty, hostile = false, speedOverride = null, damageOverride = null, color = null) {
            const dx = tx - x;
            const dy = ty - y;
            const dist = Math.hypot(dx, dy) || 1;
            const list = hostile ? state.enemyBullets : state.bullets;
            const speed = speedOverride || (hostile ? enemyBulletSpeed : 260);
            list.push({
                x,
                y,
                vx: dx / dist * speed,
                vy: dy / dist * speed,
                r: hostile ? 4 : 5,
                damage: damageOverride || (hostile ? 8 : runtimeConfig.damage),
                life: hostile ? 4 : 2.2,
                color
            });
        }

        function spawnBoss() {
            if (!isBulletHell || state.bossSpawned) return;
            state.bossSpawned = true;
            state.boss = {
                x: canvas.width / 2,
                y: Math.max(90, canvas.height * 0.18),
                r: 34,
                hp: bossConfig ? bossConfig.hp : 1500,
                maxHp: bossConfig ? bossConfig.hp : 1500,
                name: bossConfig ? bossConfig.name : 'Prism Core',
                phases: (bossConfig && bossConfig.phases && bossConfig.phases.length) ? bossConfig.phases : [{ pattern: 'spiral', fireRate: 0.12 }]
            };
        }

        function currentBossPhase() {
            if (!state.boss) return null;
            const hpRatio = state.boss.hp / state.boss.maxHp;
            return state.boss.phases.find(phase => hpRatio > Number(phase.hpThreshold || 0)) || state.boss.phases[state.boss.phases.length - 1];
        }

        function fireBossPattern() {
            if (!state.boss) return;
            const phase = currentBossPhase();
            const pattern = phase && phase.pattern ? phase.pattern : 'spiral';
            const count = pattern === 'burst' ? 18 : (pattern === 'flower' ? 14 : 10);
            const baseAngle = state.time * (pattern === 'spiral' ? 2.8 : 1.2);
            for (let i = 0; i < count; i += 1) {
                const angle = baseAngle + (Math.PI * 2 * i / count);
                const speed = enemyBulletSpeed * (pattern === 'burst' ? 1.18 : 1);
                state.enemyBullets.push({
                    x: state.boss.x,
                    y: state.boss.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    r: pattern === 'flower' ? 5 : 4,
                    damage: 9,
                    life: 4.8,
                    color: bulletPalette[i % bulletPalette.length]
                });
            }
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
            if (!isBulletHell && state.time >= 60) {
                state.over = true;
                state.won = true;
            }
            if (isBulletHell && !state.bossSpawned && (state.time >= 26 || state.score >= 14)) {
                spawnBoss();
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
                spawnTimer = Math.max(0.24, (isBulletHell ? 0.85 : 1.15 - state.time * 0.006) / Math.max(0.5, runtimeConfig.waveMultiplier));
            }

            attackTimer -= dt;
            if (!isTowerDefense && attackTimer <= 0) {
                const target = state.boss || nearestEnemy(player.x, player.y, runtimeConfig.range);
                if (target) {
                    if (isBulletHell || keys.has('Space')) {
                        shootFrom(player.x, player.y, target.x, target.y);
                    } else {
                        target.hp -= runtimeConfig.damage;
                    }
                }
                attackTimer = runtimeConfig.fireRate;
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
            if (isBulletHell && state.boss) {
                bossShotTimer -= dt;
                const phase = currentBossPhase();
                if (bossShotTimer <= 0) {
                    fireBossPattern();
                    bossShotTimer = phase && phase.fireRate ? Math.max(0.08, Number(phase.fireRate) * 4.2) : 0.55;
                }
            }

            state.enemies.forEach(enemy => {
                const tx = isTowerDefense ? base.x : player.x;
                const ty = isTowerDefense ? base.y : player.y;
                const dx = tx - enemy.x;
                const dy = ty - enemy.y;
                const dist = Math.hypot(dx, dy) || 1;
                enemy.x += dx / dist * enemy.speed * runtimeConfig.enemySpeedMultiplier * dt;
                enemy.y += dy / dist * enemy.speed * runtimeConfig.enemySpeedMultiplier * dt;
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
                if (state.boss && state.boss.hp > 0 && Math.hypot(state.boss.x - bullet.x, state.boss.y - bullet.y) < state.boss.r + bullet.r) {
                    state.boss.hp -= bullet.damage;
                    bullet.life = 0;
                }
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
            state.power = Math.min(6, 1 + Math.floor(state.score / 5));
            state.bullets = state.bullets.filter(bullet => bullet.life > 0);
            state.enemyBullets = state.enemyBullets.filter(bullet => bullet.life > 0);
            if (state.boss && state.boss.hp <= 0) {
                state.boss = null;
                state.over = true;
                state.won = true;
            }

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
                if (runtimeConfig.playerImage && runtimeConfig.playerImage.complete) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(player.x, player.y, player.r + 4, 0, Math.PI * 2);
                    ctx.clip();
                    ctx.drawImage(runtimeConfig.playerImage, player.x - player.r - 4, player.y - player.r - 4, (player.r + 4) * 2, (player.r + 4) * 2);
                    ctx.restore();
                } else {
                    ctx.fillStyle = '#88f3d2';
                    ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2); ctx.fill();
                }
            }

            state.enemies.forEach(enemy => {
                ctx.fillStyle = isBulletHell ? '#42a5ff' : '#ff6b6b';
                ctx.beginPath(); ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2); ctx.fill();
            });
            if (state.boss) {
                ctx.fillStyle = productPlan.artDirection && productPlan.artDirection.uiToken ? productPlan.artDirection.uiToken : '#8A78FF';
                ctx.beginPath(); ctx.arc(state.boss.x, state.boss.y, state.boss.r, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.font = '12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(state.boss.name, state.boss.x, state.boss.y - state.boss.r - 14);
                ctx.fillStyle = 'rgba(255,255,255,0.18)';
                ctx.fillRect(state.boss.x - 80, state.boss.y - state.boss.r - 9, 160, 4);
                ctx.fillStyle = '#F093FB';
                ctx.fillRect(state.boss.x - 80, state.boss.y - state.boss.r - 9, 160 * Math.max(0, state.boss.hp / state.boss.maxHp), 4);
                ctx.textAlign = 'left';
            }
            state.bullets.forEach(bullet => {
                ctx.fillStyle = '#facc15';
                ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2); ctx.fill();
            });
            state.enemyBullets.forEach(bullet => {
                ctx.fillStyle = bullet.color || '#ff5fd2';
                ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2); ctx.fill();
            });

            ctx.fillStyle = 'rgba(5,8,12,0.72)';
            ctx.fillRect(12, 12, 265, isBulletHell ? 88 : 64);
            ctx.fillStyle = '#fff';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText(`Time ${Math.floor(state.time)}s / Score ${state.score} / Lv ${state.level}`, 24, 36);
            ctx.fillText(isTowerDefense ? `Base HP ${Math.max(0, Math.floor(base.hp))}` : `HP ${Math.max(0, Math.floor(player.hp))}`, 24, 58);
            if (isBulletHell) {
                ctx.fillText(`Power ${state.power} / Bomb ${state.bombs}`, 24, 78);
            }
            ctx.fillStyle = 'rgba(255,255,255,0.62)';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(isTowerDefense ? 'Auto towers defend the base' : (isBulletHell ? 'WASD move, Space/Z shoot, X bomb' : 'WASD/Arrows move, Space fires'), 360, 30);

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
            if (isBulletHell && event.code === 'KeyX' && state.bombs > 0 && !state.over) {
                state.bombs -= 1;
                state.enemyBullets = [];
                state.enemies.forEach(enemy => { enemy.hp -= 18; });
            }
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
        const previewButtons = container.querySelectorAll('[data-game-action="preview"]');
        const mobilePreviewToggle = container.querySelector('[data-game-action="mobile-preview-toggle"]');
        const playableShell = container.querySelector('.playable-shell');
        const mobilePreviewMedia = window.matchMedia ? window.matchMedia('(max-width: 720px)') : null;
        container.__gameEditRuntime = {
            kind: 'canvas',
            canDirectApply: true,
            applyEdit(edit = {}) {
                if (edit.itemId === 'art.player' && edit.assetUrl) {
                    const img = new Image();
                    img.onload = () => {
                        runtimeConfig.playerImage = img;
                        runtimeConfig.playerImageUrl = edit.assetUrl;
                    };
                    img.src = edit.assetUrl;
                }
                if (edit.itemId === 'combat.fireRate' && Number.isFinite(Number(edit.value))) {
                    runtimeConfig.fireRate = Math.max(0.08, Math.min(1.5, Number(edit.value)));
                    attackTimer = Math.min(attackTimer, runtimeConfig.fireRate);
                }
                if (edit.itemId === 'combat.damage' && Number.isFinite(Number(edit.value))) {
                    runtimeConfig.damage = Math.max(4, Math.min(80, Number(edit.value)));
                }
                if (edit.itemId === 'combat.enemySpeed' && Number.isFinite(Number(edit.value))) {
                    runtimeConfig.enemySpeedMultiplier = Math.max(0.45, Math.min(2.4, Number(edit.value)));
                }
                if (edit.itemId === 'combat.enemyHp' && Number.isFinite(Number(edit.value))) {
                    runtimeConfig.enemyHpMultiplier = Math.max(0.5, Math.min(2, Number(edit.value)));
                }
                if (edit.itemId === 'combat.wave' && Number.isFinite(Number(edit.value))) {
                    runtimeConfig.waveMultiplier = Math.max(0.5, Math.min(2, Number(edit.value)));
                }
                if (edit.itemId === 'combat.range' && Number.isFinite(Number(edit.value))) {
                    runtimeConfig.range = Math.max(120, Math.min(760, Number(edit.value)));
                }
                if (edit.itemId === 'output.performance' && Number.isFinite(Number(edit.value))) {
                    runtimeConfig.targetFps = Math.max(30, Math.min(120, Number(edit.value)));
                }
            },
            getConfig() {
                return {
                    fireRate: runtimeConfig.fireRate,
                    damage: runtimeConfig.damage,
                    enemySpeedMultiplier: runtimeConfig.enemySpeedMultiplier,
                    enemyHpMultiplier: runtimeConfig.enemyHpMultiplier,
                    waveMultiplier: runtimeConfig.waveMultiplier,
                    range: runtimeConfig.range,
                    targetFps: runtimeConfig.targetFps,
                    playerImageUrl: runtimeConfig.playerImageUrl
                };
            },
            reset() {
                resetGame();
            },
            setPaused(nextPaused) {
                setPaused(nextPaused);
            }
        };
        previewButtons.forEach(previewButton => {
            previewButton.addEventListener('click', () => {
                const url = previewButton.dataset.previewUrl || '';
                if (url) {
                    window.open(url, '_blank', 'noopener');
                    return;
                }
                canvas.scrollIntoView({ block: 'center', behavior: 'smooth' });
                canvas.focus();
                const workspace = container.querySelector('[data-game-workspace]');
                addWorkspaceSystemNotice(workspace, 'Preview / Play', 'This demo uses an inline playable canvas, so there is no external preview URL. The canvas has been focused for keyboard control.', 'Inline preview focused');
            });
        });
        if (restartBtn) restartBtn.addEventListener('click', resetGame);
        if (pauseBtn) pauseBtn.addEventListener('click', () => {
            setPaused(!paused);
            canvas.focus();
        });
        if (mobilePreviewToggle && playableShell) {
            mobilePreviewToggle.addEventListener('click', () => {
                const workspace = container.querySelector('[data-game-workspace]');
                const editVersion = workspace ? (workspace.__editVersion || 0) : 0;
                const isOpen = playableShell.classList.contains('preview-open');
                if (!isOpen) {
                    playableShell.classList.add('preview-open');
                    mobilePreviewToggle.textContent = 'Close game preview';
                    mobilePreviewToggle.setAttribute('aria-expanded', 'true');
                    playableShell.__previewOpenEditVersion = editVersion;
                    if (editVersion > (playableShell.__lastPreviewRefreshVersion || 0)) {
                        resetGame();
                        playableShell.__lastPreviewRefreshVersion = editVersion;
                    } else {
                        setPaused(false);
                    }
                    canvas.focus();
                    return;
                }
                playableShell.classList.remove('preview-open');
                mobilePreviewToggle.textContent = 'Open game preview';
                mobilePreviewToggle.setAttribute('aria-expanded', 'false');
                if (editVersion > (playableShell.__previewOpenEditVersion || 0)) {
                    resetGame();
                    playableShell.__lastPreviewRefreshVersion = editVersion;
                }
                setPaused(true);
            });
        }
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
        if (mobilePreviewMedia && mobilePreviewMedia.matches) setPaused(true);
        rafId = requestAnimationFrame(loop);
    }

    function composeAndReturn() {
        clearInspirePromptTimer();
        const spec = bulletHellPlanState.confirmed && bulletHellPlanState.plan
            ? applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, getCurrentGameSpec())
            : getCurrentGameSpec();
        const generationPlan = buildGenerationPlan(spec);
        latestGenerationPlan = generationPlan;
        savedPrompt = `Your Concept: ${spec.background}
Game Type: ${spec.gameType}
Art Style: ${spec.artStyle}
Setting: ${spec.gameSetting}
Core Gameplay: ${spec.coreGameplay}
Player Goal: ${spec.playerGoal}
Main Challenge: ${spec.mainChallenge}
Progression System: ${spec.progressionSystem}
Difficulty Level: ${spec.difficultyLevel}
P0 Template Decision: ${generationPlan.decision.canAutoGenerate ? 'auto' : 'fallback'}
Template: ${generationPlan.decision.templateLabel}
Confidence: ${Math.round(generationPlan.decision.confidence * 100)}%`;

        regTimeout(() => {
            // Focus on the final summary by scrolling it to the top
            const messages = chatHistory.querySelectorAll('.chat-message');
            const summaryMessage = messages[messages.length - 1];
            if (summaryMessage) {
                summaryMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            chatHistory.classList.add('is-generating');

            // UI Transition: hide chat input
            const inputArea = document.querySelector('.chat-input-wrapper');
            if (inputArea) inputArea.style.display = 'none';

            // Move progress bar into chat
            progressContainer.style.display = 'flex';
            chatHistory.appendChild(progressContainer);

            // Ensure scroll to see the progress bar
            regTimeout(() => {
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }, 100);

            // Start animation
            runGenerationAnimation(generationPlan);
        }, 1200);
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

        clearInspirePromptTimer();

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

        chatLanguage = 'en';
        inspireProfileState = createInspireProfileState();
        chatStep = 1;
        chatSelections = createEmptySelections();
        chatShown = createChatTracking(() => new Set());
        chatCurrent = createChatTracking(() => []);
        latestGamePlanDraft = '';
        latestGamePlan = null;
        latestGenerationPlan = null;
        latestAIFlowError = null;
        resetBulletHellPlanState();
        analysisState = {
            active: false,
            ...createEmptySelections(),
            background: null,
            processing: false,
            revisionMode: false,
            templateDecision: null,
            gamePlanningDecision: null,
            artSkillDecision: null,
            capability: null,
            analysisModelMeta: null,
            finalModelMeta: null,
            workStartedAt: 0,
            modules: createModuleStates()
        };
        chatTranscript = [];

        chatHistory.innerHTML = '';
        chatHistory.classList.remove('is-generating');
        chatOptionsList.innerHTML = '';

        const optContainer = document.getElementById('chatOptionsContainer');
        if (optContainer) optContainer.style.display = 'none';
        if (chatMoreBtn) chatMoreBtn.style.display = 'inline-flex';

        if (chatInputField) {
            setChatInputValue('', { dispatch: false });
        }
        clearChatAttachments();

        const chatInputWrapper = document.querySelector('.chat-input-wrapper');
        if (chatInputWrapper) chatInputWrapper.style.display = '';
        if (modelSwitchNotice) {
            modelSwitchNotice.style.display = 'none';
            modelSwitchNotice.classList.remove('is-hiding');
        }
        updateLocalizedUI();
        renderInspireProfileSidebar();
    }

    function openChatView() {
        setHomeViewVisible(false);
        inspireView.style.display = 'flex';

        if (successStateContainer) successStateContainer.style.display = 'none';
        if (form) form.style.display = 'flex';

        resetChatStateOnly();
    }

    function openInspireView() {
        openChatView();

        // Initial chat flow
        regTimeout(() => {
            addBotMessage(t('initial'), () => {
                regTimeout(() => {
                addUserMessage(t('inspire'));
                regTimeout(() => {
                    renderInspireModeChoice(1);
                }, 800);
                }, 350);
            });
        }, 400);
    }

    function openCreateChatView(prompt) {
        openChatView();
        setChatLanguageFromText(prompt);
        addUserMessage(prompt);
        startAnalysisFlow(prompt);
        regTimeout(() => { if (chatInputField) chatInputField.focus(); }, 500);
    }

    const E2E_TEST_PROMPTS = {
        'roguelike-stage1': 'Generate a playable Roguelike survival game where a hero explores random rooms, fights waves of enemies, collects XP, chooses upgrades, and tries to defeat a final boss.'
    };

    function openEditWorkspaceDemo() {
        openChatView();
        chatLanguage = 'en';
        const spec = {
            gameType: 'Bullet Hell / Flying Shooter',
            artStyle: 'Cozy Animal Island / Warm Rounded Paper-Cut UI',
            gameSetting: 'Bloom Drift',
            background: 'A cozy animal-island inspired bullet-hell flying shooter set above a floating village island and soft clouds.',
            coreGameplay: 'Pilot a tiny leaf-wing glider with auto-fire, dodge readable flower projectile patterns, collect shields, fruit bombs, and energy blossoms.',
            playerGoal: 'Clear staged waves and defeat 3 to 4 island guardian bosses without changing the base flying shooter gameplay.',
            mainChallenge: 'Readable bullet patterns, boss phases, limited safe space, bomb timing, and gradual difficulty escalation.',
            progressionSystem: 'Shield blossoms, fruit bombs, glider upgrades, score combo, wave progression, and staged boss battles.',
            difficultyLevel: 'Normal',
            outputPackage: {
                mode: 'fixed',
                preview: true,
                exportProjectFolder: true
            }
        };
        analysisState.templateDecision = {
            templateId: 'bullet_hell',
            confidence: 0.95,
            reason: 'Local edit workspace demo seed for Bullet Hell / Flying Shooter.'
        };
        analysisState.gamePlanningDecision = {
            packId: 'game_planning_skills',
            planningPackVersion: 'demo',
            matchedSkills: ['shooter-design-skill', 'animal-crossing-art-style-skill', 'html5-game-generation-skill', 'gameplay-quality-check-skill'],
            confidence: 0.95,
            reason: 'Demo workspace mirrors the backend game planning knowledge decision shape.',
            riskNotes: []
        };
        analysisState.artSkillDecision = {
            skillId: 'animal_island_ui',
            label: 'Animal Island UI',
            confidence: 0.88,
            reason: 'Local demo uses warm rounded animal-island art direction.'
        };
        analysisState.capability = { supported: true, blockedReasons: [] };
        const plan = buildGenerationPlan(spec);
        addUserMessage('Create a cozy animal-island bullet-hell flying shooter and open the post-generation editing workspace.');
        regTimeout(() => {
            showAutoGenerationResult(plan);
        }, 120);
    }

    async function openCreateChatViewAfterModelsReady(prompt) {
        const startedAt = Date.now();
        while (!platformModelsLoaded && Date.now() - startedAt < 10000) {
            await new Promise(resolve => regTimeout(resolve, 120));
        }
        openCreateChatView(prompt);
    }

    const startupParams = new URLSearchParams(window.location.search);
    const startupTestPrompt = startupParams.get('testPrompt');
    const shouldAutoRunTestPrompt = startupParams.get('autorun') === '1'
        && startupTestPrompt
        && E2E_TEST_PROMPTS[startupTestPrompt];
    const shouldAutoOpenWorkspaceDemo = startupParams.get('demo') === 'edit-workspace'
        || startupParams.get('workspace') === 'edit'
        || (window.location.port === '5502' && window.location.pathname === '/' && !window.location.search);
    if (shouldAutoRunTestPrompt) {
        regTimeout(() => openCreateChatViewAfterModelsReady(E2E_TEST_PROMPTS[startupTestPrompt]), 300);
    } else if (shouldAutoOpenWorkspaceDemo) {
        regTimeout(openEditWorkspaceDemo, 300);
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

    // Initialize History
    loadHistory();
    cleanupChatModelBadges();
    renderProviderList();
    syncProviderEditor();
    updateModelUI();
    updateLocalizedUI();
    loadRuntimeConfig().then(() => {
        configureRollEmbedApiBase();
        loadPlatformModels();
        loadPlatformTemplates();
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
        emailSubmitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = modalEmailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(t('invalidEmail'));
                return;
            }

            modalEmailSubmitBtn.disabled = true;
            modalEmailSubmitBtn.textContent = t('sending');

            fetch(apiUrl('/api/waitlist'), {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    prompt: buildManualQueuePrompt(),
                    context: buildManualQueueContext(),
                    subject: 'New Droi AI Manual Game Generation Request'
                })
            })
                .then(async response => {
                    modalEmailSubmitBtn.disabled = false;
                    modalEmailSubmitBtn.textContent = t('send');

                    if (response.ok) {
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
                        addBotMessage(t('emailSuccess'));
                        addBotMessage(t('anotherSpark'));

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
                                    ${escapeHtml(t('exitNewIdea'))}
                                </button>
                            </div>
                        </div>
                    `;
                        chatHistory.appendChild(msgDiv);
                        chatHistory.scrollTop = chatHistory.scrollHeight;

                        msgDiv.querySelector('#chatNewIdeaBtn').addEventListener('click', resetChat);
                    } else {
                        const data = await response.json().catch(() => ({}));
                        throw new Error(data.error || "Form submission failed");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert(t('submitFailed'));
                    modalEmailSubmitBtn.disabled = false;
                    modalEmailSubmitBtn.textContent = t('send');
                });
        });
    }

    if (closeEmailModalBtn) {
        closeEmailModalBtn.addEventListener('click', () => {
            emailModal.classList.remove('active');
            setTimeout(() => { emailModal.style.display = 'none'; }, 300);

            addBotMessage(t('emailLater'));
            addBotMessage(t('anotherSpark'));

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
                            ${escapeHtml(t('exitNewIdea'))}
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
        setHomeViewVisible(true);

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
        mainInput.placeholder = t('mainPlaceholder');
        form.classList.remove('email-mode');
        form.classList.add('prompt-mode');

        // Reset Button UI
        submitBtn.innerHTML = t('create');
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

    function showPromptValidation(message) {
        if (charCountWarning) {
            charCountWarning.style.display = 'block';
            charCountWarning.style.color = '#ef4444';
            charCountWarning.textContent = message;
        }
        if (form) form.classList.add('input-error');
        if (mainInput) {
            mainInput.setAttribute('aria-invalid', 'true');
            mainInput.focus();
        }
    }

    function clearPromptValidation() {
        if (charCountWarning && mainInput.value.length < 1500) {
            charCountWarning.style.display = 'none';
            charCountWarning.textContent = '';
            charCountWarning.style.color = 'var(--accent-yellow)';
        }
        if (form) form.classList.remove('input-error');
        if (mainInput) mainInput.removeAttribute('aria-invalid');
    }

    // Textarea Auto-resize and Cursor Logic
    mainInput.addEventListener('input', function () {
        if (currentMode === 'prompt') {
            const length = this.value.length;
            const remaining = 2000 - length;
            if (this.value.trim()) {
                form.classList.remove('input-error');
                this.removeAttribute('aria-invalid');
            }

            // Show warning if over 1500 chars
            if (length >= 1500) {
                charCountWarning.style.display = 'block';
                charCountWarning.textContent = `Up to 2000 characters. ${remaining} characters left.`;
                if (remaining <= 100) {
                    charCountWarning.style.color = '#ef4444'; // Red if very close
                } else {
                    charCountWarning.style.color = 'var(--accent-yellow)';
                }
            } else if (this.value.trim()) {
                clearPromptValidation();
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
        mainInput.placeholder = t('mainPlaceholder');
        mainInput.value = savedPrompt; // Restore their text

        // Auto-resize textarea to fit restored prompt
        mainInput.style.height = 'auto';
        mainInput.style.height = (mainInput.scrollHeight) + 'px';

        submitBtn.innerHTML = t('create');
        submitBtn.disabled = false;

        if (statsContainer) statsContainer.style.display = 'flex';
        if (inspireSection) inspireSection.style.display = 'flex';
        mainInput.focus();
    });

    // Animation Sequence Logic with Progress Bar
    async function runGenerationAnimation(generationPlan = null) {
        const plan = generationPlan || buildGenerationPlan();
        window.__lastGenerationPlanDecision = plan.decision || null;
        const autoPath = Boolean(plan.decision && plan.decision.canAutoGenerate);
        progressContainer.style.display = 'flex';
        statsContainer.style.display = 'none';
        progressMessage.style.display = 'none';
        if (progressMessage) {
            progressMessage.textContent = autoPath
                ? t('progressAuto')
                : (plan.decision && plan.decision.fallbackMessage) || t('progressManual');
        }

        if (progressBarFill) progressBarFill.style.width = '0%';
        if (progressText) progressText.textContent = '0%';
        if (progressBarBg) progressBarBg.style.display = 'block';

        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step3 = document.getElementById('step3');

        const completeStep = (stepElement) => {
            stepElement.classList.remove('active');
            stepElement.classList.add('completed');
        };

        const activateStep = (stepElement) => {
            stepElement.classList.add('active');
        };

        [step1, step2, step3].forEach(stepElement => {
            if (!stepElement) return;
            stepElement.classList.remove('active', 'completed');
        });

        let currentProgress = 0;
        const targetProgress = autoPath ? 92 : Math.floor(Math.random() * (92 - 82 + 1)) + 82;

        // Start Progress Bar
        generationInterval = setInterval(() => {
            currentProgress += 1;
            if (currentProgress > targetProgress) currentProgress = targetProgress;
            if (progressBarFill) progressBarFill.style.width = currentProgress + '%';
            if (progressText) progressText.textContent = currentProgress + '%';

            if (currentProgress >= targetProgress) {
                clearInterval(generationInterval);
                generationInterval = null;
                if (progressMessage) progressMessage.style.display = 'block';

                generationTimeouts.push(setTimeout(async () => {
                    if (autoPath) {
                        try {
                            if (progressMessage) {
                                progressMessage.style.display = 'block';
                                progressMessage.textContent = 'Sending the production brief to the template planner and compiling the playable project...';
                            }
                            latestGenerationPlan = plan;
                            await ensureTemplateProject(plan);
                            completeStep(step3);
                            if (progressBarFill) progressBarFill.style.width = '100%';
                            if (progressText) progressText.textContent = '100%';
                            progressContainer.style.display = 'none';
                            showAutoGenerationResult(plan);
                        } catch (error) {
                            progressContainer.style.display = 'none';
                            chatHistory.classList.remove('is-generating');
                            const inputArea = document.querySelector('.chat-input-wrapper');
                            if (inputArea) inputArea.style.display = '';
                            showAIFlowError(classifyAIFlowError(error, 'Template generation'), {
                                phase: 'Template generation',
                                onRetry: () => runGenerationAnimation(plan)
                            });
                        }
                    } else {
                        if (emailModal) {
                            emailModal.style.display = 'flex';
                            emailModal.offsetWidth;
                            emailModal.classList.add('active');
                            modalEmailInput.focus();
                        }
                    }
                }, autoPath ? 900 : 2000));
            }
        }, autoPath ? 95 : 120);

        // Start Steps Sequence asynchronously
        // Step 1: ~3 seconds
        activateStep(step1);
        await new Promise(r => {
            const t = setTimeout(r, 3000);
            generationTimeouts.push(t);
        });
        completeStep(step1);

        // Step 2: ~3 seconds
        activateStep(step2);
        await new Promise(r => {
            const t = setTimeout(r, 3000);
            generationTimeouts.push(t);
        });
        completeStep(step2);

        // Step 3
        activateStep(step3);
        // Step 3 never explicitly completes, it gets interrupted by the progress bar reaching its limit
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputValue = mainInput.value.trim();

        if (currentMode === 'prompt') {
            if (!inputValue) {
                showPromptValidation('Describe the game idea first, then click Create.');
                return;
            }

            savedPrompt = inputValue;
            saveToHistory(savedPrompt);
            localStorage.removeItem('droi_prompt_draft');

            // 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁诡垎鍐ｆ寖闂佺娅曢幑鍥灳閺冨牆绀冩い蹇庣娴滈箖鏌ㄥ┑鍡欏嚬缂併劌銈搁弻鐔兼儌閸濄儳袦闂佸搫鐭夌紞渚€銆佸鈧幃娆撳箹椤撶噥妫ч梻鍌氬€稿ú銈壦囬悽绋胯摕闁靛鍎弨浠嬫煕閳锯偓閺呮粍鏅ユ繝鐢靛仜閻°劑宕垫惔銊ョ９婵犻潧顑呴拑鐔兼煏閸繍妲哥紒鐙欏洦鐓欑紒瀣健椤庢霉閻樿櫕灏﹂柟顔筋殔閳绘捇宕归鐣屼邯闂備胶绮悧婊堝储瑜旈幃楣冩倻閼恒儱浜楅柟鍏兼儗閸犳宕撻棃娑辨富闁靛牆妫欑亸鐢告煕閻樿櫕宕勯柕鍥ㄥ姍瀹曘劎鈧稒菤閹风粯绻涙潏鍓хК妞ゎ偄顦靛畷鎴︽偐缂佹鍘遍梺鍝勫€藉▔鏇″€撮梻浣烘嚀缁犲秹宕归挊澶屾殾婵せ鍋撴い銏＄懇瀹曞弶寰勫☉姘辨殼闂佸搫鏈惄顖氼嚕閹绢喖惟闁靛／鍌氭憢闂傚倷绀侀幉锟犲礉韫囨稑纾婚柟鍓х節缁诲棝鏌ｉ幇鍏哥盎闁逞屽墯閻楃姴鐣峰┑瀣櫇闁逞屽墴閳ワ箓宕稿Δ鈧悞鍨亜閹烘垵鈧崵澹曢崗绗轰簻闁哄啫鍊哥敮鑸点亜閿濆懐锛嶇紒杈ㄥ笚濞煎繘濡搁敃鈧棄宥夋⒑閻熸澘妲婚柟铏耿閻涱噣骞樼拠鑼唺閻庡箍鍎遍幏瀣涘鍐ｆ斀闁绘ê鐏氶弳鈺佲攽椤旇宓嗙€规洝顫夌缓鐣岀矙閹稿孩袣闂備礁鎼粙渚€宕㈤懖鈺冪焼濠㈣埖鍔栭悡娑氣偓骞垮劚妤犳悂鐛Δ鍛厱閻庯綆浜滈埀顒€婀遍幑銏犫槈閵忕姴鑰垮┑鈽嗗灥椤曆囨瀹ュ鈷戠紓浣股戠亸鐢告煕閻樺磭澧电€殿喖顭烽幃銏㈡偘閳ュ厖澹曢梺姹囧灩閹测€斥枍濠婂懐纾奸弶鍫亝閻濐亪鏌曢崶褍顏紒鐘崇洴楠炴鎹勬笟顖涙緫闂傚倷鑳堕…鍫ユ晝閵堝拋鐒介柨鐔哄Т閽冪喖鏌ㄥ┑鍡╂Ц缂佺姵鐩濠氬醇閻旇　妲堝銈庡亽閸嬪棛妲愰幘瀛樺闁告繂瀚ч弸鍛磽娴ｅ搫校闁绘濞€閻涱噣宕橀妸搴ｅ枔閹瑰嫰濡歌濠㈡垿姊绘担鍛婃儓闁哥噥鍋婂畷鎰板箹娓氬﹦绋忛悷婊冪Ч閸╃偤骞嬮敂钘夆偓鐑芥煕濞嗗浚妲告繛鍜冪秮濮婃椽骞愭惔銏狀槱婵炲瓨绮犳禍婊堫敋閿濆棛绡€婵﹩鍘藉▍鏍⒑閸涘﹥澶勫ù婊勭箞瀹曠喖宕橀鐣屽幗闂佺粯锚瀵埖寰勯崟顓熷枑闁哄鐏濋弳锝夋煥濠靛牆浠辩€规洖鐖奸、妤佹媴缁洖浜鹃柛顭戝亞缁犻箖鏌涢锝囩畼濞寸姰鍨介弻锛勨偓锝庡墮閺嬫盯鏌″畝鈧崰鏍х暦閵婏妇绡€闁稿本顨嗛悘鍡樹繆閵堝洤啸闁稿鐩畷顖烆敃閿曗偓閻撴繈骞栫划瑙勵潑闁搞倖顨嗙换婵嬫濞戞瑯妫￠柣鐘冲姧缁绘繈寮诲鍫闂佸憡鎸堕崝搴ｆ閻愬搫骞㈡俊顖溾拡濞茬鈹戦悙鍙夘棡闁告梹顨婇幃鐢稿醇閺囩喓鍘搁梺鎼炲劘閸庨亶鎮橀鍫熺厓闂佸灝顑呴悘鎾煛鐏炲墽鈽夐柍钘夘槸椤粓宕煎┑鍡╂浆缂傚倸鍊搁崐鎼佸磹閻熸壆鏆嗛柟闂寸閽冪喐绻涢幋鐐垫噭闁稿海鍠栭弻鏇＄疀鐎ｎ亞浠奸悗娈垮枔閸旀垿骞冨Δ鍐╁枂闁告洦鍓涢敍娑㈡⒑閸涘娈旈柛鐔锋健閹箖鎮滈挊澶岊攨闂佺粯鍔忛弲婊堬綖瀹ュ應鏀介柣鎰级椤ョ偤鏌涢妸鈺傛锭妞ゆ洩缍侀獮搴ㄦ嚍閵夈垺瀚藉┑鐐舵彧缁蹭粙骞夐敓鐘茬畾闁割偆鍠撶粻楣冩倶閻愭彃鈧憡鎱ㄩ崒婧惧亾鐟欏嫭绀冮柛銊ф暬閸┿儲寰勯幇顒夋綂闂佺粯锕㈠褎鎱ㄩ敂鎴掔箚闁绘劦浜滈埀顒佺墪椤斿繑绻濆顒傦紱闂佺懓澧界划顖炴偂濞嗘挻鐓犻柟顓熷笒閸斻倝鏌ｉ鐐电劯闁哄本鐩獮鎺楀箻閾忣偉鐧侀梻浣告贡椤掕尙鎹㈠┑鍥︾箚闁割偅娲栭獮銏′繆閵堝嫯鍏岄柍褜鍓﹂崣鍐潖缂佹ɑ濯撮柛娑橈工閺嗗牆鈹戦悙棰濆殝缂佺姵鎸搁悾鐑藉鎺抽崑鍛存煕閹邦喖浜鹃柡鍛櫊濮婃椽宕崟顒€鍋嶉梺鎼炲妽濡炰粙宕哄☉銏犵闁挎梻鏅崢鐢电磽娴ｅ壊鍎愰悗绗涘洤绠查柨婵嗘川绾惧ジ鏌ｅΟ鎸庣彧閻忓浚鍙冮幗鍫曞冀椤撶喓鍘藉┑鈽嗗灠閹碱偆鐥閺屾盯鎮㈤崫鍕闂佸搫鐭夌换婵嗙暦閵娾晩鏁囬柣妯垮皺閸樿姤淇婇悙顏勨偓鎴﹀垂濞差亝鍋＄憸搴ｇ矉瀹ュ绠瑰ù锝囶焾閸炪劑姊洪棃娑辩叚闂傚嫬瀚…鍧楀箣閿旇В鎷婚梺绋挎湰閻熴劑宕楀畝鍕厱閻庯絻鍔屾慨鍌溾偓瑙勬礃濞茬喖寮婚崱妤婂悑闁告侗鍨遍悞楣冩⒒娴ｄ警娼掗柛鏇炵仛閻ｅ墎绱撴担鍝勑ｉ柣妤冨█瀵鎮㈢悰鈥充壕闁汇垺顔栭悞楣冨疮閸濄儳纾奸柣鎰靛墮缁€鍐煕鐎ｎ偄濮夋俊鍙夊姍楠炴鈧稒锚椤庢捇鏌ｉ悩鍙夌カ缂佽鲸娲熷畷婵嗙暋閹佃櫕鏂€闂佺粯鍔栧娆戝緤缂佹ǜ浜滈柡鍥ュ妼瀵噣鏌涢埞鎯т壕婵＄偑鍊栫敮鎺楀窗濮橆剦鐒介柟閭﹀幘缁犻箖鏌熺紒妯虹缂佺姾宕甸埀顒冾潐濞叉鎹㈤崼銉у祦閻庯綆鍠楅弲婊堟偠濞戞巻鍋撻崗鍛棜濠电偞鎸婚崺鍐磻閹惧灈鍋撳▓鍨灍闁规瓕娅曢幈銊╁焵椤掑嫭鐓熸繛鍡楄嫰娴滄儳鈹戦悙闈涘付闁挎洏鍊濋垾鏃堝礃椤斿槈褔骞栫划鍏夊亾閼艰泛鐒婚梻鍌欑閹诧繝鏁嬫繝鈷€鍡椥撶紒鏃傚枛瀵挳鎮╅崘鑼紡闂備線娼ц噹闁告粌鍟伴梻顖炴⒒閸屾瑨鍏屾い顓炵墦瀵敻顢楅崟顒€娈炴俊銈忕到閸燁偊鎮為崹顐犱簻闁瑰搫妫楁禍楣冩⒑閹肩偛鐏柣鎾偓绛硅€垮〒姘ｅ亾婵﹥妞介獮鏍倷閹绘帒顫戦梻浣告啞閺屻劑鏁冮妷褏鐭夐柟鐑橆殔闁卞洭鏌曟径娑橆洭闁告鏁诲濠氬磼濮橆兘鍋撻幖渚囨晪妞ゆ挴鎳為崶顒佹櫆闁告挆鍜冪床闂備胶绮敋缁剧虎鍙冨畷锝夊焵椤掑嫭鈷戦柛婵嗗濠€浼存煟閳哄﹤鐏″ǎ鍥э躬閹粓鎸婃径宀婂悈婵犵數濞€濞佳兠洪妶鍛瀺闁靛牆鎳夐弨浠嬫煟閹邦垰鐨哄褎鐩弻娑欐償閵忕姭鏋欓梺绯曟櫇閸嬨倝鐛€ｎ喗鏅滅紓浣股戝▍鎾斥攽閻樻剚鍟忛柛鐘愁殜瀹曟繈骞掗弬鍨亰闂佸壊鍋呭ú姗€鍩涢幋鐘电＜閻庯綆鍋掗崕銉╂煕鎼淬垹濮嶉柡宀€鍠撶划娆忊枎閸撗冩倯闂備線娼уΛ妤呭疮鐎涙ü绻嗛柣鎴ｆ閻撴盯鏌涚仦鎯х劰闁稿鎹囬幃婊堟嚍閵壯冨箞婵犵數鍋涘Λ妤€霉濮橆儵鐔煎醇閻斿墎绠氬銈嗗姉婵挳宕濆顓滀簻妞ゅ繐瀚弳锝呪攽閳╁啫鍔剁紒鐘崇☉閳藉鈻庡Ο宄颁壕鐎广儱妫涚弧鈧梺姹囧灲濞佳勭濠婂牊鐓ラ柡鍥ュ妺缁ㄧ粯銇勯弴顏嗙ɑ缂佺粯绻傞～婵嬵敇閻斿摜褰搁梻鍌欑閹测剝绗熷Δ浣侯洸婵犻潧顑呭Λ姗€鏌嶈閸撶喎顫忕紒妯诲閻熸瑥瀚禒鈺呮⒑缁嬪灝鐦ㄩ柛锝忕到椤曪綁骞撻幒鍡樻杸闁诲函缍嗛崑鍕婵傚憡鈷掗柛灞炬皑婢ф稑銆掑顓ф當闁靛棙甯楃换婵嗩潩椤撶姴甯鹃梻浣稿閸嬪懐鎹㈤崟顖氱闁革富鍘剧壕濂告煏婵炲灝鍔撮柣鎾炽偢閺岋紕浠﹂崜褎鍒涢梺璇″枔閸ㄦ椽藝閻楀牊鍎熼柕蹇娾偓铏亪濠电姷鏁搁崕鎴犲緤閽樺娲Χ婢跺娅囧銈呯箰鐎氼噣寮抽敃鈧埞鎴﹀磼濠婂海鍔搁梺鍛婎殕婵炲﹪寮婚敐澶婄疀妞ゆ洖鎳忓▓鎵磽娴ｇ鑸圭€殿喖澧庨幑銏犫攽鐎ｎ偄浠洪梻鍌氱墛缁嬫劕鈻介鍫熲拺闁硅偐鍋涙俊濂告煟閺嵮佸仮妤犵偛鍟撮幃鍧楊敍閿濆棌鏋嗛梻鍌欑窔濞佳兠洪敃鍌氱婵炲棗绻掗弳锕傛煕椤愶絾绀€闁绘挻鐩弻娑㈠箛閸忓憡鍊ｇ紓浣介哺婵炲﹤顫忕紒妯诲濞撴凹鍨抽崝鎼佹⒑閸濆嫮澧遍柛鎾跺枛楠炲啴鎮块锝喰梻浣告贡閺屽锝炴径灞稿亾娴ｅ啫浜归柍褜鍓氱粙鎺椻€﹂崶顒€鍌ㄩ梺顒€绉甸埛鎴︽煙缁嬫寧鎹ｇ紒鐘虫尭铻栭柣妯活問閻掗箖鏌嶇拠鑼㈡い鎾炽偢瀹曞爼鏁愰崨顒€顥氶梺鑽ゅ枑閻熴儳鈧凹鍘剧划鍫ュ焵椤掑倻纾介柛灞炬皑瀛濋梺鎸庢处娴滎亪鎮伴鐣岀瘈闁稿被鍊楅崣鍡涙⒑閸撴彃浜濈紒璇插钘濈憸鏂款潖濞差亜宸濆┑鐘插缁变即姊虹粙鍨劉濠电偛锕獮鍐倷椤戞儳浜濋梺鍛婂姀閺備線骞忕紒妯肩閺夊牆澧介崚鐗堢節閳ь剟宕￠悜鍥偓鍨归悩宸剱闁绘挻娲熼弻鏇熺箾閸喖濮堕梺缁樻尭閵堟悂寮诲澶娢ㄦい鏍ㄧ矌閺嗐倝鎮楃憴鍕闁靛牆鎲￠幈銊╁焵椤掑嫭鐓忛煫鍥ь儏閻忣噣鏌涢弬璺ㄥ煟婵﹨娅ｉ幏鐘诲箵閹烘垶鐦ｇ紓鍌氬€哥粔鏉懳涘┑鍡欐殾闁瑰鍋炴刊鎾煕閿旇寮炬繛鑼焾閳规垿鎮╃拠褍浼愰梺缁橆殔閿曨亪骞冮垾鏂ユ瀻闁规儳顕崢鍗炩攽閻樼粯娑ф俊顐ｎ殜椤㈡棃顢曢敂钘夋異闂佸搫璇炵仦鎯х槣闂備線娼ч悧鍡欐崲濡ゅ拋鏁囨繛宸簼閳锋帡鏌涢弴銊ヤ簻妞ゅ浚鍘奸埞鎴︽晬閸曨剚姣堥悗瑙勬礈閸犳牠銆佸Δ浣瑰缂佸鐏濋煢闂傚倸鍊风欢姘焽瑜忛幑銏ゅ幢濞戞鍔﹀銈嗗坊閸嬫挾鐥紒銏犲籍闁轰礁绉归獮妯尖偓闈涙憸閻﹀牆鈹戦悙鑼闁诲繑绻堝绋库槈閵忥紕鍙嗛梺鍝勬处閿氶柛鏃€纰嶉妵鍕敂閸曨偅娈婚梺鍦焾閿曘儱顕ラ崟顓濇勃闁绘劦鍓﹂崯搴ㄦ⒒閸屾瑧绐旀繛浣冲洠鈧箓顢橀悢鍓佺畾闂佹悶鍎弲娑欐叏椤掑嫭鐓冪憸婊堝礈閻斿娼栭柧蹇撴贡閻瑩鏌熺粙鍨劉闁瑰嘲宕—鍐Χ閸℃顦ㄩ梺鍦焾閸熷潡顢氶敐澶婄妞ゆ棁妫勬禍婊堟⒑閹呯妞ゆ洘鐗犲畷顖涙償閵婏腹鎷洪柣鐘叉处瑜板啴顢楅姀銏㈢＜閻庯綆鍋勫ù顕€鏌嶉妷顖滅暤鐎规洖鐖奸、妤佹媴缁嬪灝顥楅梺璇查閸樻粓宕戦幘缁樼厱闁哄洢鍔屾晶浼存煕濮椻偓娴滃爼寮婚敐鍡樺劅妞ゆ牗绮庨妶鐑芥⒑閸涘﹥鐓ラ柣顓炲€垮畷娲焵椤掍降浜滈柟鍝勭Х閸忓瞼绱掗悩闈涗槐闁哄矉绲介埥澶愬础閻愬褰庨柣搴ゎ潐濞叉﹢鏁冮姀鈥茬箚闁归棿绀侀～鍛存煥濞戞ê顏ら柛瀣尰缁绘繂顫濋娑欏闂佽崵鍠愰悷銉р偓姘煎墴瀹曟繈濡舵径瀣幈闂佺粯妫冮ˉ鎾寸閵忋倖鐓熼柨婵嗘处閺嗩剛鈧娲栧畷顒勫煡婢跺ň鏋庨悘鐐村劤椤忓綊姊婚崒姘偓鎼佸磹閹间焦鍋嬪┑鐘插閻瑩鏌熼幆褍顣冲☉鎾崇У閹便劌顫滈崱妤€绠崇紓浣筋嚙濡繈寮婚敐鍛瀻闁归偊鍠楅崳褍鈹戦悙鑼勾闁稿﹥顨堥崚鎺撶節濮樺吋鏅梺缁樺姇椤曨參宕ｉ崟顖涱棅妞ゆ劑鍨烘径鍕煙濮濆苯鍚归柟宄扮秺閺佸秹宕熼鐕傜础闂備胶顢婇～澶愬礉閺嶎厔澶嬪緞閹邦収姊挎繝銏ｅ煐閸旀牠鎮￠妷锔剧瘈闂傚牊绋掗ˉ鐐烘煕閿濆牜娼愰柕鍥у婵＄兘濡疯椤旀帡姊洪崫鍕拱缂佸甯￠獮鍡涘籍閸繍娼婇梺鐐藉劜婵炲﹪鎮楅搹鍦＝闁稿本鐟ㄩ崗宀€绱掗鍛仯缂侇喗鐟╅獮鎺楀箣椤撶偞顔傞梻浣告啞濞诧箓宕㈤幖浣哥；闁瑰墽绮弲鏌ュ箹缁厜鍋撻懠顒佹櫦濠碉紕鍋戦崐褏鈧潧鐭傚畷銏ゅ礈瑜庨～鏇㈡煙閹屽殶闁荤喎缍婇弻娑㈠Ψ閹存繂顏ù婊庝簼娣囧﹪鎮欓鍕ㄥ亾閵堝鍌ㄥΔ锝呭暙缁€鍌涙叏濡炶浜鹃梺缁樹緱閸ｏ絽鐣峰鈧俊鎼佸閿涘嫧鍋撴繝姘拺闁革富鍘兼禍鐐箾閸忚偐鎳囬柛鈹惧亾濡炪倖甯掗崐鑽ゆ暜濞戞〒搴ㄥ炊瑜濋煬顒併亜閵忥紕鈽夋い顓滃姂瀹曟﹢濡搁妶鍥х婵犲痉鏉库偓妤佹叏閻戣棄纾绘繛鎴欏灪閸嬪鏌熼悙顒€澧繛鍏肩墬缁绘稑顔忛鑽ゅ嚬闂佺顑戠换婵嬪蓟閳╁啫绶為悗锝庝憾閸ゅ姊虹粙娆剧叕闁搞劏娉涢～蹇涙倻濡警鍤ゅ┑鐐叉閸ㄨ鐗庢繝鐢靛仜閻°劎鍒掗悩宕囶洸婵犲﹤鐗婇崑鈺侇渻鐎ｎ亜顒㈤柛鐘叉閺屾盯寮撮妸銉ョ闂佷紮绠戦悧鍡涘煘閹达富鏁婇柡鍌樺€撶欢鐢告⒑閸涘﹥灏伴柣鈺婂灦楠炲啴鏁撻悩鑼吅闂佹寧妫佽闁归攱妞藉缁樼瑹閸パ傜敖闂佺顑嗛惄顖炲箠閻旂⒈鏁嶆繛鎴炵懄閻濈兘鏌ｆ惔銏⑩姇閽冮亶鏌涘▎蹇曠闁宠鍨块幃鈺呭箵閹烘挻顔夐梻渚€娼уú锔炬崲閸愨晝鈹嶅┑鐘叉祩閺佸啴鏌曡箛鏇炐ｆ繛鍫弮濮婅櫣鈧湱濮甸ˉ澶嬨亜閿旇鐏﹂柛鈹垮灪閹棃鍩堥妷褍鏋庨悡銈囩磽娴ｇ櫢鍏Δ鐘茬箻濮婂宕掑顑藉亾閹间礁纾归柣鎴ｅГ閸ゅ嫰鏌涢锝嗙闁稿被鍔庨幉鎼佸棘鐠恒劍娈惧銈嗙墱閸嬫盯鏌ㄩ妶鍡曠箚闁靛牆瀚ˇ锕€霉濠婂骸鐏＄紒缁樼箞濡啫鈽夊Ο宄颁壕濠电姵鍩冮埀顒婄畵瀹曞ジ濡烽妷銉ユ尋闂備線娼чˇ顐﹀疾濠婂牊鍋傞柛鎰典簼閸犳劖绻濇繝鍌滃缂佲偓閸喐鍙忔俊顖涘绾儳顩奸崨瀛樷拺闁告稑锕ユ径鍕煕閵婏箑顥嬬紒顔碱煼楠炲酣鎳為妷褍骞嶉梻浣告贡閳峰牓宕㈡總鍛婂€堕柣妯荤ゴ閺€鑺ャ亜閺冨倹娅曢柕鍡樺笧缁辨帗娼忛妸锕€闉嶉梺鐟板槻閹虫ê鐣峰鍫濈煑濠㈣鍘归崝鎴濐潖閻戞ɑ濮滈柟娈垮櫘濡差喖顪冮妶搴″箹闁搞垺鐓￠、姘舵晲閸ャ劌鐝板┑鐐存綑椤戝棝锝炲鍛斀妞ゆ梹鏋婚崗顒傜磼閼艰泛袚缂佸倸绉甸妶锝夊礃閳哄啫寮虫繝鐢靛█濞佳兾涘┑瀣垫晛婵°倐鍋撻棁澶嬬節婵犲倸顏柣顓炵灱缁辨帗娼忛妸銉х懆闁剧粯鐗曢湁闁挎繂鎳忛崯鐐烘偣閸モ晛浠辨慨濠冩そ瀹曨偊宕熼纰变純缂傚倷绀侀ˇ顖涙櫠鎼粹垾锝夊箛閺夎法顔婇梺鐟板暱绾绢參宕伴幘璇茬闁绘绮崵鎴炪亜閹烘埈妲规繛鍫濈秺濮婂宕掑▎鎴М婵犫拃鍛珪闁告帗甯￠、娑㈡倷閺夋垳缃曢梻浣告惈濞层垽宕归搹鍦笉闁圭儤顨嗛埛鎺懨归敐鍥ㄥ殌妞ゆ洘绮庣槐鎺旀嫚閹绘巻鍋撻懗顖涱棨闂備浇濮ら敋闁挎稑顦埥澶愬閻樻鍚呴梻浣虹帛椤洭寮幖浣规櫖婵犲﹤鐗婇埛鎴犵磽娴ｅ厜妫ㄦい蹇撶墛閸嬵亪鏌涢妷锝呭闁绘繆鍩栨穱濠囶敍濞戞碍鑿囨繛瀛樼矋缁秹濡甸崟顔剧杸闁圭偓鍓氭禒濂告⒑閸濆嫭锛旂紒韫矙閸╃偤骞嬮敃鈧悘宕団偓瑙勬礀濞层倝鎮￠悢鍏煎€甸悷娆忓缁€鈧悗瑙勬处閸撶喖宕洪姀鈩冨劅闁靛牆娲ㄩ弶鎼佹⒑閹稿海绠撴俊顐ｇ懇钘濆瀣捣绾句粙鏌涚仦鎹愬闁逞屽墰閸忔﹢骞婂Δ鍛唶闁哄洨鍋熼敍娑㈡⒑閸︻厼浜鹃柛鎾村哺閹垽宕卞Ο鍦畾濡炪倖鐗楃换鍌涚瑜版帗鐓熸い鎾跺枑鐏忕敻鏌熼崣澶嬪€愰柟顔ㄥ洤閱囨繝闈涚墱閸庡矂鏌ｆ惔銈庢綈闁规悂顥撳▎銏狀潩鐠洪缚鎽曞┑鐐村灟閸ㄥ綊鎮炲ú顏呯厱闁规澘鍚€缁ㄥ瓨淇婇幓鎺斿ⅵ婵﹦绮幏鍛矙閼愁垰鐓樻繝鐢靛仜濡﹪宕ｉ崘顭戝殨濠电姵纰嶉弲鎻掝熆鐠虹尨鍔熼柣顐㈠濮婅櫣绮欓幐搴㈡嫳缂備緡鍠栭柊锝夊箚娓氣偓瀹曞ジ濮€閵忣澁绱?            mainInput.style.height = 'auto';

            openCreateChatView(savedPrompt);
        }
    });

    // 1. 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倿骞夊☉銏犵缂備焦顭囬崢閬嶆⒑闂堟稓澧曢柟鍐查叄椤㈡棃顢橀姀锛勫幐闁诲繒鍋涙晶钘壝虹€涙ǜ浜滈柕蹇婂墲缁€瀣煛娴ｇ懓濮嶇€规洖宕埢搴♀枎閹寸姭鏁嶉梻鍌氬€搁崐椋庢濮樿泛鐒垫い鎺戝€告禒婊堟煠濞茶鐏￠柡鍛埣瀹曟粏顦寸痪鎯с偢閺岋絽螣閹稿海褰ч柣蹇撴禋閸欏啴寮婚敐澶嬫櫜濠㈣泛顑嗛弳鐘电磽娴ｈ姤顏犻柡鍜佸亞閸掓帒鈻庤箛濠冪€婚梺缁樺姦閸撴稓绮旈柆宥嗏拻闁稿本鐟ㄩ崗宀勬煕鐎ｃ劌濮傜€规洘娲熼弻鍡楊吋閸涱垱鐒鹃梺鑽ゅУ娴滀粙宕濊箛鏃€鍙忛柟鎯板Г閻撳繐顭跨捄鐑橆棡婵炲懎妫濋弻宥夋煥鐎ｎ亞鐟ㄩ梻鍥ь樀閺屻劌鈹戦崱妯虹獩闂佺妫勯崐鍦崲濞戙垹绀傞柣鎾抽椤苯顪冮妶搴″箹婵炵》绻濋獮鍐倻閼恒儱浜遍梺鍓插亽閸嬪懘鏁嶆笟鈧缁樻媴閸涘﹥鍎撻梺纭呮珪閹告悂鍩㈤弬搴撴婵犲﹤鎳嶇花鐑芥⒒閸屾瑧顦﹂柟娴嬪墲缁楃喎螖閸涱厼鍋嶆俊銈忕到閸燁垶寮查浣虹闁瑰瓨鐟ラ悘顏堟煟閹捐泛鏋涙鐐寸墵楠炴牠顢橀悙鍏稿寲缂傚倷绀侀ˇ閬嶅极婵犳艾钃熸繛鎴欏灪閸嬫劙鏌涢幇顓炵祷闁圭晫鏁婚幃妤冩喆閸曨剛鈹涚紓鍌氱С缁舵岸鎮伴鍢夌喖鎳栭埡鍐跨床婵犵妲呴崹鎶藉储瑜旈悰顕€宕奸妷锔规嫽婵炴挻鍩冮崑鎾寸箾娴ｅ啿姣濋妸鈺佺劦妞ゆ帒鍊荤壕濂告煠閼圭増纭剧悮姘箾閿濆懏鎼愰柨鏇ㄤ簻閻ｉ绮欑拠鐐⒐閹峰懘宕崟顐ょ懖闂傚倸鍊峰ù鍥ㄦ叏閵堝鏅俊鐐€х粻鎺懳涢崟顔句航闂備線鈧偛鑻晶瀛樻叏婵犲啯銇濈€规洦鍋婂畷鐔碱敇閻樻彃蝎缂傚倸鍊峰ù鍥ㄣ仈缁嬫５娲偄閻撳孩妲梺閫炲苯澧柕鍥у楠炴帡骞嬮姘潬闁诲骸鍘滈崑鎾寸箾閹存瑥鐏柣鎾寸洴閺屾稑鈽夐崡鐐寸亾缂備胶濮甸…鍥╂閹烘鏁嬮柛鈩冪懅琚﹂柣搴㈩問閸ｎ噣宕抽敐鍛殾濠靛倸鎲￠崑鍕煕濠靛棗顏╃紒鐘卞嵆濮婅櫣鎷犻弻銉偓妤呮煕濡崵鐭掔€规洘鍨块獮妯肩磼濡厧甯楅柣鐔哥矋缁挸鐣峰鍫熷亜濡炲瀛╁▓鐐箾閺夋垵鎮戞繛鍏肩懇瀹曟﹢鍩€椤掆偓椤啴濡堕崱妯烘殫婵犳鍠栭顓犲垝婵犲洦鏅濋柛灞剧▓閹疯櫣绱掔紒銏犲箹闁瑰啿绻楅妵鎰槾缂佽鲸甯￠幃鈺呭礃閼碱兛鎮ｇ紓鍌欑贰閸犳盯顢氳閸┿儲寰勯幇顒夋綂闂佹娊鏁崑鎾绘煙瀹勯偊鐓兼慨濠冩そ瀹曟粓骞撻幒宥囨晼闂備礁鎽滄慨鐢稿箲閸ヮ剙鏄ュ┑鐘叉搐閸楁娊鏌ｉ弮鍌滅瘈缂併劌顭峰娲传閸曨偀鍋撻幖浣瑰€舵繝闈涱儛閺佸倹銇勯幇鈺佲偓妤冨婵傜绾ч柛顐ｇ☉婵＄晫鈧娲栭惉濂稿焵椤掑喚娼愭繛鍙夘焽閺侇噣骞掑Δ鈧悡婵嬪箹濞ｎ剙濡肩紒鐘冲▕閺岀喓鈧稒顭囩粻鎾绘煠閸偄濮堢紒缁樼箞閹粙妫冨ù璁圭稻閵囧嫰寮埀顒勬偋閻樿尙鏆﹂悷娆忓椤曢亶鏌熺喊鍗炲箺闁哄拋浜滈—鍐Χ閸℃ê鏆楁繝娈垮枤閺佸鏁愰悙鍝勫嵆闁靛骏绱曢崢浠嬫⒑瑜版帒浜伴柛鎿勭畵瀹曠敻鎮㈤崗鑲╁幗闂佺粯妫冮ˉ鎾剁矓濞差亝鐓涢悘鐐垫櫕鍟稿銇卞倻绐旈柡灞剧洴楠炴鈧潧鎲￠崳鏉款渻閵堝啫鐏€光偓閹间礁鏋侀柟鐗堟緲楠炪垺绻涢崱妯虹仼婵℃彃娲︾换婵嗏枔閸喗鐏嶉梺鎸庢磵閺呯姴鐣烽姀銈呯闁兼祴鏅╁ú绋库攽閻樿宸ラ柣妤€锕崺娑㈠箣閻樼數锛滈柣搴秵閸樼晫娑甸崜浣虹＜闁绘娅曢妵婵嬫煛鐏炲墽銆掗柍褜鍓ㄧ紞鍡涘磻閸曨剚鍙忕€广儱娲犻崑鎾舵喆閸曨剛顦ㄧ紓浣筋嚙閻楁捇鐛崘顭戠叆闁割偆鍠庡▓鐔兼⒑闂堟侗妲堕柛銊ㄦ閳ь剚鑹鹃妶绋款潖缂佹ɑ濯撮柛娑橈龚绾偓婵＄偑鍊ら崢濂告偋韫囨稑鐒垫い鎺嶈兌閳绘捇鏌￠崨顔剧畺缂佹梻鍠栧鎾閳ュ厖缂撻梻浣告啞缁嬫垿鏁冮敃鍌氬偍闂侇剙绉甸悡鐔煎箹閹碱厼鐏ｇ紒澶屾暬閺屾稓鈧綆浜濋崳钘壝瑰鍕€愰柟顔ㄥ洤閱囨繛鎴烆殘閻╁酣姊绘笟鈧褔鈥﹂鐘茬筏濞寸姴顑呯粈澶愭煥閺囩偛鈧綊鎮″▎鎰╀簻闁哄啫鍊瑰▍鏇㈡煙閸愬弶澶勬い銊ｅ劦閹瑧鈧數顭堥埛灞筋渻閵堝啫鐏柨鏇樺灲楠炲啴濮€閵堝棗鈧粯淇婇婵嗗惞婵″弶锕㈠濠氬磼濮橆兘鍋撻幖浣哥９鐎瑰嫭鍣磋ぐ鎺戠倞妞ゆ帒顦伴弲顏堟⒑閸濆嫮鈻夐柛妯恒偢濮婂顢涘☉鏍︾盎闂佸搫娲﹂〃鍛妤ｅ啯鍊甸悷娆忓绾惧鏌涘Δ鈧崯鍧楊敋閿濆棛顩烽悗锝呯仛閺咃綁姊虹紒妯哄婵炰匠鍥╁祦閻庯綆鍠楅埛鎺懨归敐鍥у妺闁搞倐鍋撴俊鐐€栧ú锕傚储娴犲绠為柕濞炬櫓閺佸洭鏌曡箛鏇炐ラ柨娑欑洴濮婃椽鎮烽弶搴撴寖缂備緡鍣崹璺侯嚕閺屻儱钃熼柕澶堝劤椤旀劗绱撴笟鍥ф灈闁告ɑ绮撳畷鎴﹀箻缂佹ê娈ゅ銈嗗笒閸婃悂鎮￠崘顔解拻闁稿本鑹鹃埀顒勵棑缁牊鎷呴棃鈺勨偓鍧楁⒑椤掆偓缁夋挳鎷戦悢濂夌唵閻犲搫褰块崼銉ュ嚑鐎广儱顦伴悡銉︾節闂堟稒顥炲璺哄閵囧嫰顢曢敐鍡欘槹闂佸搫鐬奸崰鏍嵁閸℃凹妲鹃梺鍦櫕婵挳鍩為幋锔绘晬婵炴垶鐟ラ崬澶愭⒑閸濆嫭婀伴柣鈺婂灦閻涱喖顫滈埀顒€顕ｉ崼鏇炵闁绘鍋ｉ崑锟犳⒒閸屾瑧顦﹂柟璇х節楠炴垿宕惰閻掔晫鎲搁弮鍫濇槬闁绘劕鎼粻锝夋煥閺冨洦顥夐柍褜鍓熼ˉ鎾诲焵椤掑倹鍤€濠㈢懓锕畷鏉课旀担瑙勭彙濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴烇供閸ゆ洟鏌涢幘鑼槮闁搞劍绻堥獮鏍庨鈧俊鑲╃磼閳ь剟宕卞☉娆戝幍闂佺粯鍨惰摫閻忓繒鏁哥槐鎺楀煢閳ь剟宕戦幘瀵哥瘈婵炲牆鐏濋弸鐔兼煥閺囨娅婄€规洏鍨藉畷妤呮嚃閳哄﹥閿ら梻鍌欑贰閸撴瑧绮旈悽绋跨厱闁硅揪闄勯悡鏇㈡煙閻愵剚缍戠紒鑼额嚙闇夋繝濠傚缁犳绱掓潏銊ョ闁逞屽墾缂嶅棝宕戦崟顒佸弿濠㈣埖鍔栭悡鐘参旈敃鈧锟犲传閾忓湱纾肩紓浣诡焽缁犳挻銇勯锝囩疄妞ゃ垺锚閳藉鈻庤箛锝勭椽闂傚倸鍊搁崐椋庣矆娴ｉ潻鑰块梺顒€绉埀顒婄畵瀹曞ジ鍩楅埡浣峰濠电偞鍨剁敮妤€鈻嶆繝鍥ㄧ厵妞ゆ洖妫涚弧鈧繝纰夌磿閸忔﹢宕洪敓鐘茬＜婵犲﹤鍟粻娲⒒閸屾凹鐓柛瀣鐓ら柨鏇楀亾妞ゎ偄绻橀幊锟犲Χ閸ワ妇鐟濋梻浣烘嚀婢х晫鍒掗鐐村亗闁绘柨鍚嬮悡銉︾節闂堟稒顥炲璺哄閺岋繝宕遍埡浣割潾闂侀€炲苯澧叉い顐㈩槸鐓ら柡宓懏娈惧銈嗗笒鐎氼剟鎮″┑瀣閺夊牆澧界€靛吋绻涘畝濠侀偗闁哄瞼鍠撻埀顒佺⊕閿氱紒妤佸笚閵囧嫰濡烽敂缁㈡殹缂備胶绮换鍫ュ箖娴犲顥堟繛鎴烆殘閹规洟姊绘担铏瑰笡妞ゃ劌鎳庤灋婵犻潧顑呯粻鏍ㄤ繆椤栨縿鈧偓闁衡偓娴犲鍊甸柨婵嗙凹缁ㄥ鏌涢妶鍡楃伌婵﹨娅ｇ槐鎺懳熼懡銈呭汲闂備礁鎲￠懝楣冾敄婢舵劕绠栭柨鐔哄У閸嬪嫰鏌涜箛姘汗闁告鏁哥槐鎾诲磼濞嗘挻顎栭梺鎼炲妼缂嶅﹪骞冨鈧幃鈺侇啅椤旀儳鏁搁柣鐔哥矊濮橈箓濡甸幇鏉跨妞ゆ挾鍋熼崐鎺楁⒒閸屾瑧鍔嶉柟顔肩埣瀹曟洖顭ㄩ崘鎯ф倯闂佸壊鍋呯换鍐磿閹剧粯鈷掗柛灞剧懄缁佺増銇勯弴鐔哄⒌鐎规洘婢樿灃闁告劑鍔岄悘濠囨⒑鐟欏嫬绀冩い鏇嗗懐涓嶉柡澶婄氨閺€浠嬫煟濡绲婚柡鍡樼懅缁辨帡宕滄担闀愭闂佽鍠楅敃銏ゅ箖濞嗘挻鍤嬫繛鍫熷椤ュ绱撻崒娆掑厡濠殿噣鏀遍弲璺何旈崘鈺佸簥濠电娀娼ч鍡涘磻閵娾晜鈷掗柛顐ゅ枔閳笺儵鏌涘┑鍥舵疁婵﹨娅ｉ幉鎾礋椤戝彞鎴峰┑鐐茬摠缁酣宕戝☉銏╂晪闁靛濡囩弧鈧梺鎼炲劀閸ャ劍娈斿┑鐘殿暜缁辨洟宕戦悢鐓庣？闁汇垻顭堢壕濠氭煙閸撗呭笡闁哄懏绻堥弻娑氫沪閹冩懙闂佸摜鍋犲▔娑㈠煘閹达附鍋愮紓浣股戦柨顓㈡⒑閸濄儱娅忛柛銊ョ埣楠炲啫螣閼姐倗鎳濋梺閫炲苯澧い顐㈢箰鐓ゆい蹇撴媼濡啫鈹戦悙鏉戠仸闁煎綊绠栭妴鍌炲传閸曘劍鏂€闂佸疇妫勫Λ妤佺濠靛牏纾奸悗锝庡亝鐏忣厽銇勯弴顏嗙К妞わ箑缍婇弻娑㈠煘閹傚濠碉紕鍋戦崐鏍暜閹烘柡鍋撳鐓庡籍闁糕晜鐩獮瀣倷閺夋垵浼庨梻浣藉吹閸犳挻鏅跺Δ鍛闁规壆澧楅悡鐔肩叓閸ャ劍灏紒鐙欏懐纾肩紓浣诡焽閳洟鏌熷畡鐗堝殗鐎规洘锕㈤獮鎾诲箳閹炬惌鍟€闂傚倷鑳堕幊鎾伙綖閺囥垹纾块梻鍫熶緱濞兼牕鈹戦悩瀹犲缁炬儳鍚嬬换娑㈠幢濡櫣浠存繝纰樷偓鑼煓闁哄矉绲鹃幆鏃堟晲閸ャ劌娈戦梻浣侯焾缁绘帗绻涢埀顒傜磽閸屾稒鐨戠紒顔款嚙閳藉螣闁垮娼旀繝纰樻閸ㄦ娊濡寸€ｎ剚顫曢柣銏犳啞閳锋帡鏌涚仦鎹愬闁逞屽墯閹倿骞冭缁绘繈宕熼鐘靛幆闂備浇顫夊畷姗€顢氳鏁堥柡灞诲劜閻撱儵鏌￠崘銊モ偓鐟扳枍閺囩姷纾奸柍閿亾闁稿鎹囧濠氬磼濮橆兘鍋撻幖浣瑰亱濠电姴瀚惌娆撴煙閻戞﹩娈曢柛濠傜仢铻栭柨婵嗘噹閺嗙偤鏌ｉ幘瀵告创闁哄本鐩獮鍥煛娴ｅ壊鐎峰┑鐘媰閸曨剛顦紓浣介哺鐢繝宕洪埀顒併亜閹烘垵顏╃紒鈧崘顔界厓闁荤喕鍩囨禒鎺旂磼閵娿儺鐓兼俊顐㈡嚇椤㈡洟濮€閳ユ剚妲遍梻浣告贡椤牓鈥﹂悿顖涳紓闂備胶绮…鍥╁垝椤栫偞鍋傞柡鍥ュ灪閻撴盯鏌涢幇鈺佸濠㈣泛瀚惀顏堫敇閵忋垻鏆梺鍝勮嫰缁夊爼骞夐幘顔肩妞ゆ劑鍊撶槐婵嬫⒒娴ｇ瓔鍤冮柛鐘冲浮瀵煡鎮╁Ч鍥ｅ亾娴ｇ硶鏋庨柟鐐綑濞堟劙姊虹€圭姰鈧偓闁稿鎸剧槐鎺撴綇椤帟鈧寧鎱ㄦ繝鍕笡闁瑰嘲鎳橀幖褰掔嵁鎼存挸浜惧┑鐘叉处閻撴盯鏌涘☉鍗炴灓闁活厽甯￠弻鐔碱敊閵娿儲澶勯柛瀣姍閺屻倗鍠婇崡鐐差潽濠电偛鐗婇崕鎶藉煘閹达附鍋愮紓浣股戦柨顓烆渻閵堝棗鐏ラ柟铏悾鐑芥晸閻樿尙顔呴梺鍏间航閸庢娊宕㈤挊澶嗘斀闁宠棄妫楅悘銉︾箾閸滃啰绋荤紒鍌涘笒閳藉濮€閿涘嫬寮虫繝鐢靛仦閸ㄥ爼鈥﹂崶鈺冧笉濠电姵纰嶉悡娆愩亜閺冨倸甯舵俊鑼帛閵囧嫰顢樺鍐潎閻庤娲滈崰鏍€佸Δ浣哥窞閻庯絽鐏氶ˉ鍫ユ⒒娴ｇ瓔鍤欓悗娑掓櫊椤㈡瑩寮介鐐电崶濠电偞鍨崺鍕极鐎ｎ剚鍠愰柡鍐ㄧ墑閳ь兛绀侀～婊堝焵椤掆偓閻ｅ嘲螖閸涱喖浜楅柟鑹版彧缁插潡鎮伴灏栨斀闁绘ê鐏氶弳鈺佲攽椤旇棄鈻曢柟铏殜瀹曞ジ寮撮悢灏佸亾瀹勬壋鏀介柣妯哄级婢跺嫰鏌嶉柨瀣瑨闂囧鏌ㄥ┑鍡樺櫤闁哥喓鍋ら弻娑㈡偄閸濆嫪娌紓浣虹帛缁嬫捇骞忛悩渚Ь闂佷紮绲块弫鎼佸焵椤掑喚娼愭繛鍙夛耿瀹曞綊宕稿Δ鈧弰銉╂煃瑜滈崜姘跺Φ閸曨垰绠抽柟瀛樼箥娴犻箖姊虹紒妯诲鞍婵炶尙鍠栭獮鍐ㄎ旈崨顔芥珳闁硅偐琛ラ埀顒冨皺閸戝綊姊虹拠鑼缂佺粯鍨剁粩鐔煎幢濞嗘劦娼熼梺鍦劋濮婅崵澹曢崗闂寸箚妞ゆ牗绻傛禍褰掓煟閿濆娑фい顏勫暣婵¤埖鎯旈垾鑼嚬缂傚倷娴囬褔鎮ч幘璇参ュù锝堝€介弮鍫濆窛妞ゆ挾濯寸槐鍙夌節閻㈤潧孝闁挎洏鍊楅埀顒佸嚬閸ｏ綁宕洪埀顒併亜閹烘埈妲告繛鍛У閹便劍绻濋崒銈囧悑閻庤娲樼敮鎺楀煝鎼淬劌绠ｆい鎾跺晿濠婂牊鈷掑ù锝囩摂濞兼劗绱掓担瑙勫唉闁糕斁鍋撳銈嗗笒閸熸媽鈪垫繝鐢靛仜濡﹥绂嶅┑瀣柧婵犻潧顑嗛悡鏇㈡倶閻愭潙绀冨瑙勶耿閺岋絾鎯旈鐓庣睄濠殿喖锕︾划顖滅箔閻旂厧鐐婄憸宥夛綖閳哄啰纾藉ù锝呭濡叉椽鏌℃担绛嬪殭闁伙絿鍏橀獮瀣晝閳ь剛澹曟總鍛婄厽闁归偊鍓﹂崵鐔兼煕濡湱鐭欐慨濠冩そ瀹曨偊宕熼锝嗩唲闂備胶绮〃鍛存晝閵堝鐓濈€广儱鎷嬮悡銉╂煕濞戝崬鐏ｉ柨娑欑矒閺岋綁鎮╅崣澶嬫倷閻庢鍠栭悥鑹版＂闂侀潧绻堥崐鏍偂濞戙垺鍊堕柣鎰版涧娴滃墽绱掗埀顒傗偓锝庡厴閸嬫挾鎲撮崟顒傤槶闂佸憡顭嗛崶褏鍘撮梺纭呮彧缁犳垿鎮欐繝鍕枑閹兼惌鐓堥弫鍌炴煥閻斿搫校闁抽攱甯掗妴鎺戭潩閿濆懍澹曟繝鐢靛仩婢瑰牆鐣烽棃娑卞殫濠电姴鍟ㄩ崑鍛存煕閹扳晛濡块柣锝嗘そ濮婅櫣绮欑捄銊т紘闂佺顑嗛惄顖炲箯閹达附鍋勯柛蹇氬亹閸樹粙姊洪崫鍕殭闁稿﹤鎽滈弫顕€宕滄担铏癸紲闂佺粯锚閻忔岸寮抽鍕厸鐎光偓閳ь剟宕伴弽顓炵畺婵犲﹤鍚橀悢鍏兼優闂侇偅绋掗崰姘舵⒒閸屾瑧顦︽繝鈧柆宥佲偓锕傚醇閵夈儳鏌堥梺鍝勵槹閸╁牆顭囬弽銊х鐎瑰壊鍠曠花濂告煟閹烘埈鐓奸柡宀嬬秮楠炲洭顢涘铏毐闂佽瀛╃喊宥咁熆濮椻偓閳ワ箓鎳楅锝喰╅柣搴㈩問閸犳牠鎮ラ崗闂寸箚闁汇垻顭堢粈瀣亜閺嶇數绋婚柡鍛箞濮婃椽妫冨☉姘辩暰闂佸搫鎳忕划搴ㄦ偡瑜斿缁樻媴閾忕懓绗￠梺鍦焾閻栫厧鐣烽幇顑芥斀閻庯綆鍋勬禍妤€顪冮妶鍡楀Ё缂佺姵鍨块幃娆愮節閸ャ劎鍘繝鐢靛€埀顒勫磻閹剧繝绻嗛柟缁樺笧婢с垻绱掓潏銊ユ诞闁诡喗鐟╅、妤呭焵椤掑嫬绀夐柕鍫濇缁犲墽鐥銏╂缂佲檧鍋撻柣搴㈩問閸犳牠鈥﹂悜钘夋瀬鐎广儱顦粈瀣亜韫囨挻鍣瑰┑顖欏嵆濮婃椽鎳￠妶鍛呫垺绻涚拠褏鐣抽柕鍥ㄥ姍瀹曟﹢鍩￠崒姘紟闂佺澹堥幓顏嗗緤鐠恒劌顥氶柦妯侯棦瑜版帗鏅查柛娑卞枟閸庢捇鏌″蹇曠瘈闁诡喗顨婂畷妤佸緞婵犱礁顥氶梻鍌欑缂嶅﹤螞鐠恒劎鐭嗗〒姘ｅ亾闁归攱鍨块幃銏ゅ礂閼测晛寮抽梻浣虹帛閺屻劑骞栭銏㈡懃缂傚倸鍊风拋鏌ュ磻閹剧粯鐓曢柟浼存涧閺嬬喖鏌ｉ幘宕囩闁宠鍨块幃娆撳箣濠靛棙娈梺鍝勵儍閸婃繈寮婚埄鍐ㄧ窞閻庯綆鍋勯埀顒佸姈閹便劍绻濋崟顓炵闂佺懓鍢查幊妯虹暦閵婏妇绡€闁告劑鍔屾竟宥夋⒒閸屾瑨鍏岄柟铏崌瀹曨垳鎹勯妸锕€搴婂┑顔姐仜閸嬫挻顨ラ悙鎻掓殻闁轰焦鎹囬幃鈺呮惞椤愶綆浠ч梻鍌欒兌缁垶鈥﹂崼顫剨妞ゅ繐鐗嗙粻娲煛閸モ晛浜归柡鈧禒瀣厽闁归偊鍘界紞鎴︽煟韫囨洖鏋涢柡灞剧洴婵℃瓕顦抽柛銈傚亾闂備浇妗ㄧ欢锟犲闯閿濆拋娼栫紓浣股戞刊鎾煟閻旂厧浜伴柛銈咁儑缁辨挻鎷呯粵瀣闂佺锕ゅ锟犳偘椤旂晫绡€闁告劏鏅涢崝鍛存⒑闂堟单鍫ュ箠閸ヮ剙纾婚柟鎹愵嚙閸愨偓闂侀潧顭堥崕宕囩玻閻愬绡€闁汇垽娼ф禒褔鏌涚€ｎ偅宕岀€殿噮鍓熼崺鈧い鎺嶆缁诲棝鏌ｉ幇鍏哥盎闁逞屽墯閻楁洜鍙呴梺鍝勭▉閻忔稑鈽夊Ο閿嬵潔闂侀潧绻掓慨鐑剿囬锝囩閻庣數顭堢敮鍫曟煟鎺抽崝鎴﹀春濞戙垹绠ｉ柨鏃囨娴犲搫顪冮妶鍡欏缂佽弓绮欏鎼佸Χ婢跺鍘遍梺鍦劋閺屻劑銆傛總鍛婄厪闁搞儜鍐句純濡炪們鍨哄ú鐔告叏閳ь剟鏌曡箛瀣労闁哥偠娅ｇ槐鎾诲磼濞嗘劗銈版俊鐐存綑閹芥粓寮鈧獮鎺楀即閻樿精鍩呴梻鍌欐祰瀹曞灚鎱ㄩ弶鎳ㄦ椽濡堕崨鍌滃枑缁绘繈宕惰閸旓箑顪冮妶鍡楃瑐闁绘帪绠戦悾椋庝沪閻愵剙寮挎繝鐢靛Т閸燁垶濡靛┑鍫氬亾鐟欏嫭纾搁柛鏂跨Ф閹广垹鈹戠€ｎ亞顦板銈嗘尵婵兘鎮伴妷鈺傗拻闁稿本鐟ㄩ崗灞俱亜椤撶偟澧曟い顐ｇ箞閺佸啴鍩€椤掑嫬鐓濈€广儱顦崡铏亜椤愵偄鍘撮柛瀣崌瀹曟﹢濡搁姀锛勨偓濠氭椤愩垺鎼愰柨鏇樺劦瀵剟鍩€椤掑嫭鈷掑ù锝堟鐢盯鏌ㄥ鑸电厽闊洦鏌ㄩ崫铏光偓娈垮枟婵炲﹪宕洪敓鐘插窛妞ゆ梹鍎抽獮鍫ユ⒑鐠囨彃鍤辩紓宥呮瀹曟垿骞樼紒妯烘畬闁荤姵浜介崝澶愬磻閹捐埖鍠嗛柛鏇ㄥ墰椤︻厽绻濋悽闈涗汗闁稿鎹囧铏规嫚閳ヨ櫕鐏€闂佸搫鎳忕换鍫ョ嵁韫囨稒鍋愰悹鍥皺椤斿矂姊洪崷顓炲妺婵﹨顕ч悾鐑藉传閸曘劍鏂€闂佹寧绋戠€氼剚绂嶆總鍛婄厱濠电姴鍟版晶鐢告煙椤斻劌鍚橀弮鍫濈闁靛鍎虫禍浼存⒑閻熸澘鎮戦柣锝庝邯瀹曟繂鐣濋崟顐わ紲闂侀潧艌閺呮粓鎮￠悢闀愮箚妞ゆ牗绻傛禍褰掓偨椤栨稓娲撮柡灞界Ч閺屻劎鈧綆浜為悷銊╂⒒閸パ屾█闁哄被鍔岄埞鎴﹀幢濞嗗浚鏉告俊鐐€曠换鎺撶箾閳ь剟鏌熼鑽ょ煓妞ゃ垺绋戦埥澶婎潩椤撶偛鐏￠梻鍌欑閹碱偊寮甸鍕剮妞ゆ牗绋愮换鍡樻叏濠靛棛鐒炬俊鎻掝煼閺岋綁濮€閳轰胶浠╅梺缁樼墪閵堟悂鐛Δ鍛唶闁哄洨鍠庨埀顒傚厴閺岋綁骞嬮悜鍡欏姺闂佸憡锕㈡禍璺侯潖濞差亜浼犻柛鏇ㄥ墮閸嬪秹姊洪崨濠冪叆闁活厼鍊块幃浼搭敊绾拌鲸寤洪梺閫炲苯澧寸€殿喖顭烽弫鎰緞濡粯娅嶉梻浣虹帛閸旀牠骞嗙仦杞挎盯鏁冮崒娑掓嫼闂佸憡绻傜€氼厼锕㈤幍顔剧＜閻庯綆鍋呯亸鎵磼閸屾稑娴柡浣稿暣瀹曟帒顫濇鏍ㄐら梺鑽ゅ枑缁矂藝椤栨繄浜遍梻浣稿暱閹碱偊宕幍顔碱棜闁芥ê顥㈣ぐ鎺撴櫜闁搞儮鏅滈幉姗€姊洪幖鐐测偓鏍偡閿旂晫鈹嶅┑鐘叉祩閺佸啴鏌ㄥ┑鍡樺闁革絿澧楃换婵堝枈婢跺瞼锛熼梺杞版祰椤曆囨偩閻戣姤鍋勭痪鎷岄哺閺咁剙鈹戦鏂や緵闁告挻鐟╁顐﹀Χ婢跺鎷绘繛鎾村焹閸嬫挻绻涙担鍐叉礌閳ь剨绠撳畷濂稿Ψ閵壯屾Х闁诲骸鍘滈崑鎾绘煕閺囩儑宸ユい锔诲灦閸╃偤骞嬮悩顐壕闁挎繂楠告禍鎰版煙闁垮銇濋柡宀嬬秮閹晠宕ｆ径宀婃Ш闂備線鈧偛鑻晶鍙夌箾閸涱喗绀嬮柟顔矫鍏煎緞鐎Ｑ勫闂備胶顢婇崑鎰板磻濞戞瑤绻嗛柛蹇氬亹缁犻箖鎮樿箛鏃傚ⅳ闁稿鎹囬獮鍥ㄦ媴閸涘鍚?querySelectorAll 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽弫鎰緞婵犲嫷鍚呴梻浣瑰缁诲倿骞夊☉銏犵缂備焦顭囬崢閬嶆⒑闂堟稓澧曢柟鍐查叄椤㈡棃顢橀姀锛勫幐闁诲繒鍋涙晶钘壝虹€涙ǜ浜滈柕蹇婂墲缁€瀣煛娴ｇ懓濮嶇€规洖宕埢搴♀枎閹存繃鐏庨梻鍌氬€搁崐椋庢濮樿泛鐒垫い鎺戝€告禒婊堟煠濞茶鐏︾€规洏鍨介獮鏍ㄦ媴閸︻厼骞楅梻浣侯攰濞咃綁宕戝☉顫偓鍛搭敆閸曨剛鍘靛Δ鐘靛仜閻忔繈鎮橀埡鍛厓閻熸瑥瀚悘鈺呮煃瑜滈崜銊х礊閸℃顩查柣鎰惈绾惧綊鏌ｉ幇顔煎妺闁稿鍓濈换婵囩節閸屾碍娈诲銈呭椤ㄥ﹤鐣烽埄鍐╃秶闁靛绲肩花濠氭⒑閸︻厼鍔嬮柛銊ф暬椤㈡棃顢旈崼鐔哄帗闂備礁鐏濋鍛存倶閹绢喗鐓涢悘鐐插⒔閳藉鏌嶇憴鍕伌鐎规洖宕灃濠电姳鑳剁壕濠氭⒒閸屾瑧顦﹂柣銈呮喘椤㈡俺顦归挊婵嬫煟閵忋埄鐒鹃柦鍐枑缁绘盯骞嬮悜鍡欏姱闂佺粯姊婚崢褔宕归崒娑栦簻闁哄啫鍊荤敮娑㈡煟椤愩垻绠崇紒杈ㄦ崌瀹曟帒鈻庨幋锝囩崶闂備礁鎽滄慨鐢告偋閻樿鐏抽柨鏇炲€归崐濠氭煢濡警妲洪柣锝嗘そ閹嘲顭ㄩ崟顒傚弳闂佷紮缍侀弨杈╃紦娴犲宸濆┑鐘插€风花濠氭煟鎼达絾鍤€閻庢矮鍗抽妴鍌炴晜閻愵剦娼熼梺缁樻煥閻ㄦ繈寮ㄦ禒瀣厽婵☆垵娅ｆ禒娑㈡煛閸″繑娅呴柍瑙勫灴閹瑩鍩℃担宄邦棜婵犵數濮烽弫鎼佸磻濮椻偓瀹曠娀鎮╃拠鑼槯闂佺粯鍔﹂崜娑㈠煡婢跺浜滄い鎾寸矊婵倻鈧娲栭妶鎼併€佸Δ鍛＜婵犙呭亾閿涘牓姊婚崒姘偓鐑芥倿閿旈敮鍋撶粭娑樺幘閸濆嫷鍚嬪璺猴功閿涙盯姊洪悷鏉库挃缂侇噮鍨惰棢闁糕剝顨忛悢鍡涙偣鏉炴媽顒熼柛搴㈠灩缁辨帡鍩﹂埀顒勫磻閹炬枼鏀介柣妯虹仛閺嗏晛鈹戦鑺ュ唉鐎规洘鍔欓獮鏍ㄦ媴閸涘﹨绶㈤梻浣虹帛濡礁鈻嶉敐鍥ь棜闁绘挸瀵掗悢鍡涙偣鏉炴媽顒熼柛搴㈠姍閺屾洟宕堕妸褏鐤勯梺鍝勫閳ь剙纾弳鍡涙倵閿濆骸澧伴柨娑氬枑缁绘稓鈧數顭堥鎾剁磼閻樿櫕灏柣锝呭槻椤劑宕遍埡鍌傤亪姊绘担鍛婂暈閻㈩垱顨堢划娆撳箳閺冣偓瀹曞弶绻濋棃娑氬闁哄鐗嗛…璺ㄦ崉閾忓湱浼囬梺鎸庣〒閸犳牕顫忛搹鍦煓閻犳亽鍔庨澶愭⒑閹稿孩纾搁柛銊ㄥГ娣囧﹦鈧稒蓱婵绱掗娑欑闁诲骸顭峰娲捶椤撶偘澹曞┑鐐插悑閻燂妇绮嬪鍛傛棃宕ㄩ鎯у箥闂備胶顭堢换鎰板触鐎ｎ喖纾挎俊銈呮噺閻撴洟鏌ｅΟ璇插婵炲牊娲滅槐鎺楀磼濮樻瘷褍鈹戦垾宕囧煟鐎规洖鐖奸崺锟犲礃鐠恒劑妫烽梻鍌氬€烽懗鍫曗€﹂崼銉ュ珘妞ゆ帒瀚崵灞轿旈敐鍛殭闁绘帒鐏氶妵鍕箳閹存繍浼屽┑鈽嗗亝閸ㄥ潡寮婚悢椋庢殝闂侇叏绠戦崜鍫曟倵濞堝灝鏋涙い顓㈡敱娣囧﹪鎮滈挊澹┿劎鎲稿┑鍫燁潟?
    function createStarlights() {
        const container = document.querySelector('.starlights');
        if (!container) return;
        container.innerHTML = '';

        const colors = ['rgba(164, 130, 255, 0.9)', 'rgba(240, 147, 251, 0.9)', 'rgba(129, 140, 248, 0.9)'];
        const count = 200;

        for (let i = 0; i < count; i += 1) {
            const star = document.createElement('div');
            star.className = 'starlight';

            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = i % 3 === 0 ? '0.9' : (i % 3 === 1 ? '0.7' : '0.5');

            const color = colors[Math.floor(Math.random() * colors.length)];
            star.style.background = color;
            star.style.boxShadow = `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 36}px`);
            star.style.setProperty('--drift-y', `${(Math.random() - 0.5) * 24}px`);

            const duration = Math.random() * 4 + 3;
            const delay = Math.random() * 5;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `-${delay}s`;

            container.appendChild(star);
        }
    }
    function initCosmicScrollDepth() {
        let ticking = false;
        const update = () => {
            document.documentElement.style.setProperty('--scroll-depth', String(Math.round(window.scrollY)));
            ticking = false;
        };
        const requestUpdate = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
    }

    createStarlights();
    initCosmicScrollDepth();
    const spotlightOverlay = document.querySelector('.spotlight-overlay');
    const spotlightGlow = document.querySelector('.spotlight-glow');
    if (!('ontouchstart' in window) && (spotlightOverlay || spotlightGlow)) {
        let currentX = 0.5;
        let currentY = 0.5;
        let targetX = 0.5;
        let targetY = 0.5;
        const animateSpotlight = () => {
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;
            const posPercentX = currentX * 100;
            const posPercentY = currentY * 100;
            if (spotlightOverlay) {
                spotlightOverlay.style.background = `radial-gradient(circle at ${posPercentX}% ${posPercentY}%, transparent 0%, transparent 120px, rgba(18,16,23,0.22) 250px, rgba(18,16,23,0.42) 100%)`;
            }
            if (spotlightGlow) {
                spotlightGlow.style.background = `radial-gradient(circle at ${posPercentX}% ${posPercentY}%, rgba(129,140,248,0.15) 0%, rgba(129,140,248,0.05) 80px, transparent 180px)`;
            }
            requestAnimationFrame(animateSpotlight);
        };
        document.addEventListener('mousemove', event => {
            targetX = event.clientX / Math.max(1, window.innerWidth);
            targetY = event.clientY / Math.max(1, window.innerHeight);
        });
        animateSpotlight();
    }

    const plexusCanvas = document.getElementById('plexusCanvas');
    if (plexusCanvas) {
        const ctx = plexusCanvas.getContext('2d');
        let points = [];
        const maxPoints = 40;
        const connectionDistance = 150;
        const resizePlexus = () => {
            plexusCanvas.width = plexusCanvas.offsetWidth;
            plexusCanvas.height = plexusCanvas.offsetHeight;
            points = Array.from({ length: maxPoints }, () => ({
                x: Math.random() * plexusCanvas.width,
                y: Math.random() * plexusCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            }));
        };
        const drawPlexus = () => {
            ctx.clearRect(0, 0, plexusCanvas.width, plexusCanvas.height);
            points.forEach(point => {
                point.x += point.vx;
                point.y += point.vy;
                if (point.x < 0 || point.x > plexusCanvas.width) point.vx *= -1;
                if (point.y < 0 || point.y > plexusCanvas.height) point.vy *= -1;
            });
            for (let i = 0; i < points.length; i += 1) {
                for (let j = i + 1; j < points.length; j += 1) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(164,130,255,${0.1 * (1 - dist / connectionDistance)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }
            points.forEach(point => {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(164,130,255,0.3)';
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(drawPlexus);
        };
        window.addEventListener('resize', resizePlexus);
        window.initPlexus = resizePlexus;
        resizePlexus();
        drawPlexus();
    }
});


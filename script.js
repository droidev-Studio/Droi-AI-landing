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
    const heroFocusSequence = document.getElementById('heroFocusSequence');
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

    const TEMPLATE_CATALOG = [];

    const TEMPLATE_KEYWORD_PATCHES = {};

    TEMPLATE_CATALOG.forEach(template => {
        template.keywords = Array.from(new Set(template.keywords));
    });

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

    const homeIntroState = {
        active: false,
        complete: false,
        timers: [],
        resizeBound: false
    };

    function clearHomeIntroTimers() {
        homeIntroState.timers.forEach(timer => window.clearTimeout(timer));
        homeIntroState.timers = [];
    }

    function scheduleHomeIntroStep(fn, delay) {
        const timer = window.setTimeout(fn, delay);
        homeIntroState.timers.push(timer);
        return timer;
    }

    function calculateHomeIntroPath() {
        if (!heroFocusSequence || !inspireEntryBtn) return false;
        const icon = inspireEntryBtn.querySelector('.sparkle-icon') || inspireEntryBtn;
        const rect = icon.getBoundingClientRect();
        if (!rect.width || !rect.height) return false;
        const compact = window.innerWidth <= 720;
        const startX = Math.round(window.innerWidth * (compact ? 0.7 : 0.72));
        const startY = Math.round(window.innerHeight * (compact ? 0.18 : 0.16));
        const endX = Math.round(rect.left + rect.width / 2);
        const endY = Math.round(rect.top + rect.height / 2);
        heroFocusSequence.style.setProperty('--spark-start-x', `${startX}px`);
        heroFocusSequence.style.setProperty('--spark-start-y', `${startY}px`);
        heroFocusSequence.style.setProperty('--spark-end-x', `${endX}px`);
        heroFocusSequence.style.setProperty('--spark-end-y', `${endY}px`);
        heroFocusSequence.style.setProperty('--spark-travel-x', `${endX - startX}px`);
        heroFocusSequence.style.setProperty('--spark-travel-y', `${endY - startY}px`);
        return true;
    }

    function completeHomeIntroSequence() {
        if (!heroFocusSequence) return;
        clearHomeIntroTimers();
        homeIntroState.active = false;
        homeIntroState.complete = true;
        document.body.classList.remove('home-intro-sequence', 'home-meteor-hit');
        document.body.classList.add('home-composer-revealed', 'home-intro-complete');
    }

    function beginHomeIntroSequence() {
        if (!heroFocusSequence || !homeView || !inspireEntryBtn || !form) return;
        if (homeView.style.display === 'none') return;
        clearHomeIntroTimers();
        homeIntroState.active = true;
        homeIntroState.complete = false;
        document.body.classList.remove('home-meteor-hit', 'home-composer-revealed', 'home-intro-complete');

        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!calculateHomeIntroPath() || reducedMotion) {
            completeHomeIntroSequence();
            return;
        }

        document.body.classList.add('home-intro-sequence');
        scheduleHomeIntroStep(() => document.body.classList.add('home-meteor-hit'), 1080);
        scheduleHomeIntroStep(() => {
            document.body.classList.remove('home-intro-sequence');
            document.body.classList.add('home-composer-revealed');
        }, 1420);
        scheduleHomeIntroStep(completeHomeIntroSequence, 2050);

        if (!homeIntroState.resizeBound) {
            homeIntroState.resizeBound = true;
            window.addEventListener('resize', () => {
                if (homeIntroState.active && !homeIntroState.complete) {
                    calculateHomeIntroPath();
                }
            });
        }
    }

    function bindHomeIntroEarlyCompletion() {
        [inspireEntryBtn, mainInput, submitBtn].forEach(element => {
            if (!element) return;
            element.addEventListener('pointerdown', () => {
                if (homeIntroState.active) completeHomeIntroSequence();
            });
            element.addEventListener('focus', () => {
                if (homeIntroState.active) completeHomeIntroSequence();
            });
        });
    }

    function setHomeViewVisible(visible) {
        if (homeView) {
            homeView.style.display = visible ? 'flex' : 'none';
        } else if (mainHero) {
            mainHero.style.display = visible ? 'flex' : 'none';
        }
        if (visible) {
            window.setTimeout(beginHomeIntroSequence, 60);
        } else {
            clearHomeIntroTimers();
            homeIntroState.active = false;
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
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI analysis is missing templateDecision', 'The selected model must decide whether the request maps to a backend availableGameTemplates templateId, unsupported, or null.', '', ['retry', 'switch_model', 'manual_queue']);
        }
        if (!parsed.capability || typeof parsed.capability !== 'object' || typeof parsed.capability.supported !== 'boolean') {
            throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'AI analysis is missing capability', 'The selected model must return capability.supported and blockedReasons.', '', ['retry', 'switch_model', 'manual_queue']);
        }
        const templateId = normalizeTemplateId(parsed.templateDecision.templateId);
        if (templateId && templateId !== 'unsupported') {
            const status = getTemplateStatus(templateId);
            if (status && !parsed.templateDecision.templateLabel) {
                parsed.templateDecision.templateLabel = status.label || templateId;
            }
        }
        parsed.templateDecision.templateId = templateId || parsed.templateDecision.templateId;
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
        const specPatches = {
            ...(plan.contentPatch && typeof plan.contentPatch === 'object' && !Array.isArray(plan.contentPatch) ? plan.contentPatch : {}),
            ...(plan.specPatches && typeof plan.specPatches === 'object' && !Array.isArray(plan.specPatches) ? plan.specPatches : {})
        };
        plan.specPatches = specPatches;
        plan.contentPatch = specPatches;
        plan.assetPrompts = normalizeTemplatePatchObjectField(plan.assetPrompts, 'assetPrompt');
        assertPlainObject(specPatches, 'Template patch generation', 'specPatches');
        assertPlainObject(plan.settingsPatch, 'Template patch generation', 'settingsPatch');
        assertPlainObject(plan.manifestPatch, 'Template patch generation', 'manifestPatch');
        assertPlainObject(plan.stylePatch, 'Template patch generation', 'stylePatch');
        assertPlainObject(plan.assetPrompts, 'Template patch generation', 'assetPrompts');
        const allowedSpecModules = getTemplatePatchAllowedModules(decision.templateId);
        const requiredSpecModules = getTemplatePatchRequiredModules(decision.templateId);
        if (allowedSpecModules.length) {
            const invalid = Object.keys(specPatches).filter(key => !allowedSpecModules.includes(key));
            if (invalid.length) {
                throw createAIFlowError('PATCH_FILE_NOT_ALLOWED', 'template_compile_failure', 'Template patch module is not allowed', `TemplatePatchPlan contains modules outside ${decision.templateId}: ${invalid.join(', ')}.`, invalid.join(', '), ['retry', 'manual_queue']);
            }
        }
        if (requiredSpecModules.length) {
            const missingModules = requiredSpecModules.filter(key => !specPatches[key] && !specPatches[`spec/${key}.json`]);
            if (missingModules.length) {
                throw createAIFlowError('MODEL_SCHEMA_INVALID', 'schema_failure', 'TemplatePatchPlan is missing required template modules', `The selected model must patch these ${decision.templateId} modules: ${missingModules.join(', ')}.`, missingModules.join(', '), ['retry', 'switch_model', 'manual_queue']);
            }
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
        if (platformTemplatesLoadPromise) return platformTemplatesLoadPromise;
        platformTemplatesLoadPromise = (async () => {
            try {
                const response = await fetch(apiUrl('/api/templates/status'), {
                    credentials: 'include',
                    cache: 'no-store'
                });
                if (!response.ok) return;
                const data = await response.json();
                platformTemplateStatus = {
                    ...data,
                    templates: Array.isArray(data.templates) ? data.templates : []
                };
            } catch (error) {
                platformTemplateStatus = {
                    bucketConfigured: false,
                    bucketName: '',
                    templates: []
                };
            } finally {
                platformTemplatesLoaded = true;
            }
        })().finally(() => {
            platformTemplatesLoadPromise = null;
        });
        return platformTemplatesLoadPromise;
    }

    async function ensurePlatformTemplatesLoaded() {
        if (platformTemplatesLoaded) return platformTemplateStatus;
        await loadPlatformTemplates();
        return platformTemplateStatus;
    }

    function normalizeTemplateId(value) {
        const id = String(value || '').trim();
        return id || '';
    }

    function getPlatformTemplates() {
        return Array.isArray(platformTemplateStatus.templates) ? platformTemplateStatus.templates : [];
    }

    function getTemplateStatus(templateId) {
        const id = normalizeTemplateId(templateId);
        return getPlatformTemplates().find(template => normalizeTemplateId(template.templateId || template.id) === id) || null;
    }

    function collectTemplateMetadataList(status, keys) {
        if (!status || typeof status !== 'object') return [];
        const architecture = status.assetArchitecture && typeof status.assetArchitecture === 'object'
            ? status.assetArchitecture
            : {};
        const sources = [status, architecture, status.routingHints || {}];
        const values = [];
        sources.forEach(source => {
            keys.forEach(key => {
                const value = source && source[key];
                if (Array.isArray(value)) values.push(...value);
                else if (typeof value === 'string') values.push(...value.split(/[,;\n]/));
            });
        });
        return Array.from(new Set(values.map(value => String(value || '').trim()).filter(Boolean)));
    }

    function collectTemplateRoutingKeywords(template) {
        const routingHints = template && template.routingHints && typeof template.routingHints === 'object'
            ? template.routingHints
            : {};
        const hintValues = Object.values(routingHints).flatMap(value => {
            if (Array.isArray(value)) return value;
            if (typeof value === 'string') return value.split(/[,;\n]/);
            return [];
        });
        return Array.from(new Set([
            ...(Array.isArray(template.keywords) ? template.keywords : []),
            ...(Array.isArray(template.capabilityTags) ? template.capabilityTags : []),
            ...(Array.isArray(template.intentAliases) ? template.intentAliases : []),
            ...hintValues
        ].map(value => String(value || '').trim()).filter(Boolean)));
    }

    function getPublishedTemplateStatus(templateId) {
        const status = getTemplateStatus(templateId);
        return status && status.published === true ? status : null;
    }

    function isCompileReadyRuntimeTemplate(templateId) {
        const status = getTemplateStatus(templateId);
        return Boolean(status && status.published === true && status.compileReady === true);
    }

    function getTemplateDisplayLabel(templateId, fallbackLabel = '') {
        const status = getTemplateStatus(templateId);
        return (status && status.label) || fallbackLabel || templateId || 'No matching template';
    }

    function getTemplateCatalogEntry(templateId) {
        const id = normalizeTemplateId(templateId);
        const status = getTemplateStatus(id) || {};
        if (status && normalizeTemplateId(status.templateId || status.id)) {
            const label = status.label || id;
            return {
                id,
                label,
                gameType: status.gameType || status.gameTypeLabel || label,
                type: normalizeAnswerText(status.gameType || status.gameTypeLabel || label || id).replace(/\s+/g, '-'),
                keywords: collectTemplateRoutingKeywords(status),
                capabilityTags: Array.isArray(status.capabilityTags) ? status.capabilityTags : [],
                routingHints: status.routingHints || {},
                assetArchitecture: status.assetArchitecture || {},
                supported: status.published === true && status.compileReady === true,
                reason: status.knowledgeSummary || `Backend registered template ${id}.`,
                confidenceBoost: 0
            };
        }
        const label = status.label || id;
        return {
            id,
            label,
            gameType: label,
            type: id.replace(/_/g, '-'),
            keywords: Array.isArray(status.keywords) ? status.keywords : [],
            capabilityTags: Array.isArray(status.capabilityTags) ? status.capabilityTags : [],
            routingHints: status.routingHints || {},
            assetArchitecture: status.assetArchitecture || {},
            supported: false,
            reason: status.knowledgeSummary || `Template ${id} is not available from the backend registry.`,
            confidenceBoost: 0
        };
    }

    function getTemplateCapabilitySummary(templateId) {
        const status = getTemplateStatus(templateId);
        if (status) {
            return [
                status.label || templateId,
                status.knowledgeSummary || '',
                Array.isArray(status.keywords) && status.keywords.length ? `Keywords: ${status.keywords.join(', ')}` : '',
                Array.isArray(status.capabilityTags) && status.capabilityTags.length ? `Capabilities: ${status.capabilityTags.join(', ')}` : '',
                status.assetArchitecture && Object.keys(status.assetArchitecture).length ? `Asset architecture: ${JSON.stringify(status.assetArchitecture).slice(0, 900)}` : ''
            ].filter(Boolean).join('\n');
        }
        return templateId
            ? `No backend-published template capability metadata is confirmed for "${templateId}".`
            : 'No automatic template is confirmed.';
    }

    function getTemplatePatchRequiredModules(templateId) {
        const status = getTemplateStatus(templateId);
        return collectTemplateMetadataList(status, ['requiredSpecModules', 'specModules', 'patchModules']);
    }

    function getTemplatePatchAllowedModules(templateId) {
        const status = getTemplateStatus(templateId);
        return collectTemplateMetadataList(status, ['allowedSpecModules', 'specModules', 'patchModules']);
    }

    function getTemplateDefaultsForPrompt(templateId) {
        const status = getTemplateStatus(templateId) || {};
        const architecture = status.assetArchitecture && typeof status.assetArchitecture === 'object'
            ? status.assetArchitecture
            : {};
        return {
            entry: status.entry || status.runtimeEntry || architecture.entry || architecture.runtimeEntry || `${templateId}/template-config`,
            manifest: status.manifest || architecture.manifest || 'assets/manifest.json',
            runtimePatchPolicy: 'manual-flow-if-required',
            assetArchitecture: architecture
        };
    }

    function getAvailableGameTemplatesForAI() {
        return getPlatformTemplates()
            .filter(template => template && template.published === true && template.compileReady === true)
            .map(template => {
                const templateId = normalizeTemplateId(template.templateId || template.id);
                return {
                    templateId,
                    label: template.label || templateId,
                    knowledgeSummary: template.knowledgeSummary || '',
                    keywords: Array.isArray(template.keywords) ? template.keywords : [],
                    capabilityTags: Array.isArray(template.capabilityTags) ? template.capabilityTags : [],
                    routingHints: template.routingHints || {},
                    assetArchitecture: template.assetArchitecture || {},
                    gameType: template.gameType || template.gameTypeLabel || '',
                    compileReady: template.compileReady === true
                };
            })
            .filter(template => template.templateId);
    }

    function getPlatformArtSkills() {
        return Array.isArray(platformTemplateStatus.artSkills) ? platformTemplateStatus.artSkills : [];
    }

    function normalizeSkillId(value) {
        return String(value || '').trim().toLowerCase().replace(/-/g, '_');
    }

    function getAvailableArtSkillsForAI(templateId = '') {
        const publishedSkills = getPlatformArtSkills()
            .filter(skill => skill && skill.published === true)
            .map(skill => ({
                skillId: skill.skillId || skill.id,
                id: skill.skillId || skill.id,
                label: skill.label || skill.name || skill.skillId || skill.id,
                keywords: Array.isArray(skill.keywords) ? skill.keywords : [],
                capabilityTags: Array.isArray(skill.capabilityTags) ? skill.capabilityTags : [],
                routingHints: skill.routingHints || {},
                published: true
            }))
            .filter(skill => skill.skillId);
        if (!templateId) return publishedSkills;
        const template = getTemplateStatus(templateId);
        const supported = collectTemplateMetadataList(template, ['supportedArtSkills', 'artSkills', 'allowedArtSkills']);
        if (!supported.length) return publishedSkills;
        const supportedSet = new Set(supported.map(normalizeSkillId));
        return publishedSkills.filter(skill => supportedSet.has(normalizeSkillId(skill.skillId)) || supportedSet.has(normalizeSkillId(skill.label)));
    }

    function resolveCompileArtSkillDecision(templateId, artSkillDecision = analysisState.artSkillDecision) {
        if (!artSkillDecision || typeof artSkillDecision !== 'object') return null;
        const requestedId = artSkillDecision.skillId || artSkillDecision.id;
        if (!requestedId) return null;
        const available = getAvailableArtSkillsForAI(templateId);
        const matched = available.find(skill => {
            const normalizedRequested = normalizeSkillId(requestedId);
            return normalizeSkillId(skill.skillId || skill.id) === normalizedRequested ||
                normalizeSkillId(skill.label) === normalizedRequested;
        });
        if (matched) {
            return {
                ...artSkillDecision,
                skillId: matched.skillId || matched.id,
                label: artSkillDecision.label || matched.label
            };
        }
        recordDiagnostic('art-skill-downgrade', {
            templateId,
            skillId: requestedId,
            reason: 'Art skill is not published or not exposed by /api/templates/status; compiling with ordinary artStyle instead.'
        });
        return null;
    }

    function getBackendTemplateRoutingCatalog() {
        return getAvailableGameTemplatesForAI().map(template => {
            const templateId = normalizeTemplateId(template.templateId);
            const label = template.label || templateId;
            return {
                id: templateId,
                label,
                gameType: template.gameType || label,
                type: normalizeAnswerText(template.gameType || label || templateId).replace(/\s+/g, '-'),
                keywords: collectTemplateRoutingKeywords(template),
                capabilityTags: Array.isArray(template.capabilityTags) ? template.capabilityTags : [],
                routingHints: template.routingHints || {},
                assetArchitecture: template.assetArchitecture || {},
                supported: true,
                confidenceBoost: 0,
                reason: template.knowledgeSummary || `Backend published compileReady template ${templateId}.`
            };
        }).filter(template => template.id);
    }

    function getRegisteredBackendTemplateRoutingCatalog() {
        return getPlatformTemplates()
            .filter(template => template && template.published === true)
            .map(template => {
                const templateId = normalizeTemplateId(template.templateId || template.id);
                const label = template.label || templateId;
                return {
                    id: templateId,
                    label,
                    gameType: template.gameType || template.gameTypeLabel || label,
                    type: normalizeAnswerText(template.gameType || template.gameTypeLabel || label || templateId).replace(/\s+/g, '-'),
                    keywords: collectTemplateRoutingKeywords(template),
                    capabilityTags: Array.isArray(template.capabilityTags) ? template.capabilityTags : [],
                    routingHints: template.routingHints || {},
                    assetArchitecture: template.assetArchitecture || {},
                    supported: template.compileReady === true,
                    compileReady: template.compileReady === true,
                    compilerSupported: template.compilerSupported === true,
                    confidenceBoost: 0,
                    reason: template.knowledgeSummary || `Backend registered template ${templateId}.`
                };
            })
            .filter(template => template.id);
    }

    function getTemplateAvailabilityError(decision) {
        if (!decision || !decision.templateId || decision.templateId === 'unsupported') return '';
        if (!platformTemplatesLoaded) return 'Template registry is still loading. Please retry in a moment.';
        const status = getTemplateStatus(decision.templateId);
        if (!status) return `Template "${decision.templateId}" is not registered by the backend.`;
        if (!status.published) {
            return `${status.label || decision.templateLabel || decision.templateId} has no published backend template yet. Upload and publish it in /admin before automatic generation.`;
        }
        if (status.compileReady !== true) {
            return `${status.label || decision.templateLabel || decision.templateId} is registered, but is not compileReady yet. Route this request to the email/manual queue until the backend template can compile automatically.`;
        }
        return '';
    }

    function scoreTemplateCatalogForText(text, catalog = []) {
        const intent = String(text || '').toLowerCase();
        return catalog.map(template => {
            const templateType = template.type || template.gameType || template.id.replace(/_/g, ' ');
            const keywords = [...(template.keywords || []), ...(template.intentAliases || [])];
            const hits = keywords.filter(keyword => intent.includes(String(keyword).toLowerCase()));
            const directHit = intent.includes(String(templateType).toLowerCase()) ||
                intent.includes(template.id.replace(/_/g, ' ')) ||
                intent.includes(template.label.toLowerCase());
            const hitScore = Math.min(0.66, hits.length * 0.11);
            const confidence = Math.min(0.98, (directHit ? 0.58 : 0.18) + hitScore + (Number(template.confidenceBoost) || 0));
            return { ...template, type: templateType, confidence, hits, directHit };
        }).sort((a, b) => (b.confidence - a.confidence) || (b.hits.length - a.hits.length) || Number(b.directHit) - Number(a.directHit));
    }

    function getRegisteredTemplateMatch(spec = getCurrentGameSpec()) {
        const best = scoreTemplateCatalogForText(getSpecIntentText(spec), getRegisteredBackendTemplateRoutingCatalog())[0];
        return best && best.confidence >= 0.7 ? best : null;
    }

    function getTemplateProductPlanFlow(templateId) {
        const status = getTemplateStatus(templateId) || {};
        const routingHints = status.routingHints && typeof status.routingHints === 'object'
            ? status.routingHints
            : {};
        return String(status.productPlanFlow || routingHints.productPlanFlow || routingHints.planFlow || '').trim().toLowerCase();
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
    let platformTemplatesLoadPromise = null;
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
        return scoreTemplateCatalogForText(text, getBackendTemplateRoutingCatalog());
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
                const templateSignals = [
                    best.label,
                    best.gameType,
                    best.type,
                    best.reason,
                    ...(best.keywords || []),
                    ...(best.capabilityTags || [])
                ].filter(Boolean).join(' ').toLowerCase();
                const core = /defend|tower|strategy|base|lane/.test(templateSignals)
                    ? CORE_GAMEPLAY_OPTIONS[2]
                    : (/survive|survival|wave|horde|arena/.test(templateSignals)
                        ? CORE_GAMEPLAY_OPTIONS[0]
                        : CORE_GAMEPLAY_OPTIONS[1]);
                setModuleSelection('coreGameplay', core, 'suggested', 0.74, false);
            }
            if (!getModuleSelection('playerGoal')) {
                const templateSignals = [
                    best.label,
                    best.gameType,
                    best.type,
                    best.reason,
                    ...(best.keywords || []),
                    ...(best.capabilityTags || [])
                ].filter(Boolean).join(' ').toLowerCase();
                setModuleSelection('playerGoal', /defend|tower|strategy|base|lane/.test(templateSignals) ? PLAYER_GOAL_OPTIONS[2] : PLAYER_GOAL_OPTIONS[0], 'suggested', 0.74, false);
            }
            if (!getModuleSelection('mainChallenge')) {
                const templateSignals = [
                    best.label,
                    best.gameType,
                    best.type,
                    best.reason,
                    ...(best.keywords || []),
                    ...(best.capabilityTags || [])
                ].filter(Boolean).join(' ').toLowerCase();
                setModuleSelection('mainChallenge', /bullet|projectile|shooter|boss|pattern/.test(templateSignals) ? MAIN_CHALLENGE_OPTIONS[2] : MAIN_CHALLENGE_OPTIONS[0], 'suggested', 0.7, false);
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
        const templateIntent = normalizeGameTypeForTemplate(prompt, { background: prompt });
        if (templateIntent.locked) {
            setModuleSelection('type', {
                label: templateIntent.normalizedGameType,
                value: templateIntent.normalizedGameType,
                mechanic: templateIntent.genre
            }, 'confirmed', 0.98, false);
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
        await ensurePlatformTemplatesLoaded();
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
  "gameTemplateDecision": {"templateId": string|"unsupported"|null, "templateLabel": string, "confidence": number, "reason": string},
  "templateDecision": {"templateId": string|"unsupported"|null, "confidence": number, "reason": string},
  "artSkillDecision": {"skillId": string, "label": string, "confidence": number, "reason": string, "matchedKeywords": string[]}|null,
  "capabilityDecision": {"supported": boolean, "blockedReasons": string[], "reason": string},
  "capability": {"supported": boolean, "blockedReasons": string[]}
}
Template selection:
- availableGameTemplates is the backend registry subset that is published and compileReady for automatic generation.
- Choose templateDecision.templateId only from availableGameTemplates[].templateId. Use each template's knowledgeSummary, keywords, capabilityTags, routingHints, and assetArchitecture to decide.
- If no availableGameTemplates entry matches the request, return "unsupported" or null and set capability.supported=false with a clear blocked reason.
- Do not invent template ids and do not rely on a hardcoded frontend whitelist.
Art skill selection:
- Choose artSkillDecision only from availableArtSkills[].skillId.
- If no published availableArtSkills entry matches the visual request, return artSkillDecision=null and preserve the visual direction in artStyle/background text.
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
                        availableGameTemplates: getAvailableGameTemplatesForAI(),
                        availableArtSkills: getAvailableArtSkillsForAI(),
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

        // Clear the previous timer before scheduling the next prompt nudge.
        clearInspirePromptTimer();

        // Delay the "Inspire Me" suggestion so it only appears if the user stays idle.
        analysisTimeout = regTimeout(() => {
            // Only show the nudge when the current step is still waiting for user input.
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
        const baseMaxInputHeight = window.innerHeight < 760 ? 132 : 160;
        const isEditing = document.activeElement === chatInputField;
        const isWorkspaceComposer = Boolean(chatInputField.closest('.chat-input-bar.unified-pill')) && document.body.classList.contains('game-edit-workspace-active');
        const editingMaxInputHeight = Math.min(
            window.innerWidth <= 720 ? 260 : 320,
            Math.max(baseMaxInputHeight, Math.round(window.innerHeight * (window.innerWidth <= 720 ? 0.34 : 0.42)))
        );
        const maxInputHeight = isWorkspaceComposer && isEditing ? editingMaxInputHeight : baseMaxInputHeight;
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

        // Once the user sends a prompt, hide the guided option shortcuts.
        const optContainer = document.getElementById('chatOptionsContainer');
        if (optContainer) optContainer.style.display = 'none';
        clearInspirePromptTimer();

        if (analysisState.revisionMode) {
            if (analysisState.processing) return;
            const lines = promptText.split('\n');
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
                    customBackground.push(l);
                }
            });

            analysisState.background = customBackground.join(' ').trim();
            analysisState.revisionMode = false;
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
            const activeWorkspace = document.querySelector('[data-game-workspace]');
            if (activeWorkspace && activeWorkspace.isConnected) {
                scheduleWorkspaceSnapshotSave(activeWorkspace, activeWorkspace.__plan || activeWorkspace.__generationPlan, 'chat_draft');
            }
        });
        chatInputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleChatSubmit();
            }
        });
        chatInputField.addEventListener('focus', () => {
            document.querySelector('.chat-input-bar').style.borderColor = 'rgba(124, 93, 250, 0.4)';
            updateChatInputHeight();
        });
        chatInputField.addEventListener('blur', () => {
            document.querySelector('.chat-input-bar').style.borderColor = 'rgba(0,0,0,0.05)';
            updateChatInputHeight();
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

        // Once the user sends a prompt, hide the guided option shortcuts.
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

            if (analysisState.active) {
                regTimeout(() => {
                    const optionsContainer = document.getElementById('chatOptionsContainer');
                    const hasVisibleOptions = Boolean(
                        optionsContainer &&
                        optionsContainer.style.display !== 'none' &&
                        chatOptionsList.children.length
                    );
                    const hasActiveReply = Boolean(document.querySelector(
                        '.chat-message.bot .typing-indicator, .ai-work-card, .game-plan-summary, .ai-plan-summary, .generated-game-page'
                    ));
                    if (!hasVisibleOptions && !hasActiveReply) {
                        continueClarification();
                    }
                }, 2600);
            }

            regTimeout(() => {
                if (analysisState.active) {
                } else if (step < MODULE_STEPS.length - 1) {
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
            `<div class="summary-item"><strong>${escapeHtml(bhText('boss'))}:</strong> ${escapeHtml(normalized.bossConfig.name)} 路 ${escapeHtml(String(normalized.bossConfig.phases.length))} phases 路 HP ${escapeHtml(String(normalized.bossConfig.hp))}</div>`,
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
        if (decision.canAutoGenerate && getTemplateProductPlanFlow(decision.templateId) === 'bullet_hell' && !bulletHellPlanState.confirmed) {
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
            recordDiagnostic('local-fallback', {
                phase: 'Game plan summary',
                message: error && (error.message || String(error))
            });
            summaryHtml = buildAISummaryHtml(buildLocalGamePlanFallback(spec, decision));
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
                    content: `You are a senior game product designer generating a complete P0 GamePlan for an HTML5 Canvas game template. Return only valid JSON with keys title, hook, storyPremise, coreLoop, momentToMoment, visualDirection, enemyDesign, progressionPlan, playerFantasy, prototypeScope, risk. Keep every value under 48 words, but make each value specific enough to drive the selected backend template metadata, templateCapabilitySummary, asset prompts, enemies, progression, and win/fail goals. Do not assume a fixed frontend gameplay whitelist; use only the selected backend template capability summary and user request. ${getLanguageInstruction()}`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        userSpec: spec,
                        templateDecision,
                        requestContext: buildAIRequestContext(spec.background || savedPrompt || ''),
                        templateCapabilitySummary: getTemplateCapabilitySummary(templateDecision.templateId)
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
        const registeredMatch = decision.templateId
            ? getTemplateCatalogEntry(decision.templateId)
            : getRegisteredTemplateMatch(getCurrentGameSpec());
        const matchedStatus = registeredMatch && registeredMatch.id
            ? getTemplateStatus(registeredMatch.id)
            : null;
        const registeredNotReadyMessage = matchedStatus && matchedStatus.published === true && matchedStatus.compileReady !== true
            ? `${matchedStatus.label || registeredMatch.label || registeredMatch.id} is registered, but compileReady is not true. compilerSupported=true is diagnostic only and cannot unlock automatic compile.`
            : '';
        const reason = blockedReasons.length
            ? blockedReasons.join(', ')
            : (registeredNotReadyMessage || decision.reason || decision.fallbackMessage || 'The selected model did not confirm a supported P0 template.');
        const availableTemplates = getAvailableGameTemplatesForAI();
        const availableLabel = availableTemplates.length
            ? availableTemplates.map(template => template.label || template.templateId).join(', ')
            : 'No backend templates are currently published and compileReady.';
        const registeredLine = registeredNotReadyMessage
            ? `Matched registered template: ${registeredNotReadyMessage}`
            : '';
        const nextStepMessage = registeredNotReadyMessage
            ? 'Publish the matching backend template with compileReady=true, or submit email for manual production while the template is not ready.'
            : 'Publish a matching template with compileReady=true, revise the request, or submit email for manual production.';
        const actions = registeredNotReadyMessage ? ['manual_queue'] : ['edit_request', 'manual_queue'];
        const message = [
            'This request cannot enter automatic generation from the backend Templates registry.',
            `Available automatic templates: ${availableLabel}`,
            registeredLine,
            nextStepMessage
        ].filter(Boolean).join(' ');
        return createAIFlowError(
            'CAPABILITY_UNSUPPORTED',
            'capability_unsupported',
            'Automatic template is not supported',
            message,
            reason,
            actions
        );
    }

    function prepareP0RewriteRequest(decision = {}) {
        analysisState.revisionMode = true;
        const current = latestGamePlanDraft || buildGameSpecPlainText(getCurrentGameSpec());
        const availableTemplates = getAvailableGameTemplatesForAI();
        const registeredMatch = decision.templateId
            ? getTemplateCatalogEntry(decision.templateId)
            : getRegisteredTemplateMatch(getCurrentGameSpec());
        const matchedStatus = registeredMatch && registeredMatch.id
            ? getTemplateStatus(registeredMatch.id)
            : null;
        const templateLines = availableTemplates.length
            ? availableTemplates.map(template => `- ${template.label || template.templateId}: ${template.knowledgeSummary || template.keywords.join(', ') || template.templateId}`)
            : (matchedStatus && matchedStatus.published === true && matchedStatus.compileReady !== true
                ? [
                    `- ${matchedStatus.label || registeredMatch.label || registeredMatch.id}: registered but compileReady is not true. User wording cannot change this backend status; route to email/manual queue or publish the backend template with compileReady=true.`
                ]
                : [
                    '- No backend template is currently published and compileReady. Upload and publish a matching Template first, or collect the request by email/manual queue.'
                ]);
        const rewritePrompt = [
            current,
            '',
            'Please revise this into a backend published and compileReady HTML5 Canvas game template.',
            'Choose one available template direction:',
            ...templateLines,
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

    function buildLocalGamePlanFallback(spec = getCurrentGameSpec(), decision = matchTemplate(spec)) {
        const templateLabel = decision.templateLabel || 'Selected Backend Template';
        return normalizeGamePlanForGeneration({
            title: firstText(spec.gameSetting, 'Generated Game Prototype'),
            hook: firstText(spec.background, `A compact ${templateLabel} prototype with clear controls and fast feedback.`),
            storyPremise: firstText(spec.background, spec.gameSetting, 'A focused first-playable scenario built from the current GameSpec.'),
            coreLoop: firstText(spec.coreGameplay, 'Perform the core action loop, read threats, collect rewards, and progress toward a clear win state.'),
            momentToMoment: 'Read the playfield, make short tactical choices, avoid failure pressure, and use rewards at the right moment.',
            visualDirection: firstText(spec.artStyle, 'Readable stylized 2D art with strong silhouettes and clear combat feedback.'),
            enemyDesign: firstText(spec.mainChallenge, 'Challenges escalate through readable enemy behavior, hazards, goals, or timed pressure.'),
            progressionPlan: firstText(spec.progressionSystem, 'Level-up choices and pickup rewards create visible power growth.'),
            playerFantasy: firstText(spec.playerGoal, 'Survive the run and prove mastery of the template loop.'),
            prototypeScope: 'One playable HTML5 Canvas loop with movement, combat, progression, pause, restart, win, and fail states.'
        }, spec);
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
        const matches = getBackendTemplateRoutingCatalog().map(template => {
            const terms = [
                template.label,
                template.gameType,
                template.type,
                template.id && template.id.replace(/_/g, ' '),
                ...(template.keywords || []),
                ...(Array.isArray(TEMPLATE_KEYWORD_PATCHES[template.id]) ? TEMPLATE_KEYWORD_PATCHES[template.id] : [])
            ];
            const hits = terms.filter(term => {
                const normalizedTerm = normalizeAnswerText(term);
                return normalizedTerm && text.includes(normalizedTerm);
            });
            return { template, hits };
        }).filter(item => item.hits.length);
        if (!matches.length) {
            return { normalizedGameType: spec.gameType || '', templateId: null, genre: null, locked: false, reason: '' };
        }
        matches.sort((a, b) => b.hits.length - a.hits.length);
        const best = matches[0];
        return {
            normalizedGameType: best.template.gameType || best.template.label,
            templateId: best.template.id,
            genre: best.template.type || best.template.id.replace(/_/g, '-'),
            locked: true,
            reason: `Backend template intent matched: ${best.hits[0]}`
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
        const aiTemplateId = normalizeTemplateId(aiDecision && aiDecision.templateId);
        const aiConfidence = Number(aiDecision && aiDecision.confidence || 0);
        if (aiTemplateId) {
            const template = getTemplateCatalogEntry(aiTemplateId);
            const availabilityError = getTemplateAvailabilityError({
                templateId: aiTemplateId,
                templateLabel: aiDecision.templateLabel || template.label
            });
            if (availabilityError || aiConfidence < 0.6 || effectiveCapability.blocked) {
                const reason = availabilityError ||
                    (effectiveCapability.blocked ? effectiveCapability.reason : 'AI template decision confidence is below the automatic generation threshold.');
                return {
                    canAutoGenerate: false,
                    templateId: aiTemplateId,
                    templateLabel: getTemplateDisplayLabel(aiTemplateId, aiDecision.templateLabel || template.label),
                    templateGenre: template.type || aiTemplateId.replace(/_/g, '-'),
                    normalizedGameType: template.gameType || template.label,
                    locked: true,
                    confidence: Math.min(0.98, Math.max(0, aiConfidence)),
                    reason,
                    fallbackMessage: reason,
                    candidates: [{ ...template, confidence: Math.min(0.98, Math.max(0, aiConfidence)), hits: ['ai-template-decision'], directHit: true }]
                };
            }
            return {
                canAutoGenerate: true,
                templateId: aiTemplateId,
                templateLabel: getTemplateDisplayLabel(aiTemplateId, aiDecision.templateLabel || template.label),
                templateGenre: template.type || aiTemplateId.replace(/_/g, '-'),
                normalizedGameType: template.gameType || template.label,
                locked: true,
                confidence: Math.min(0.98, Math.max(0.6, aiConfidence)),
                reason: aiDecision.reason || `AI selected ${template.label || aiTemplateId}.`,
                fallbackMessage: '',
                candidates: [{ ...template, confidence: Math.min(0.98, Math.max(0.6, aiConfidence)), hits: ['ai-template-decision'], directHit: true }]
            };
        }
        const normalizedIntent = normalizeGameTypeForTemplate(intent, spec);
        if (normalizedIntent.locked && !capability.blocked) {
            const template = getTemplateCatalogEntry(normalizedIntent.templateId);
            return {
                canAutoGenerate: false,
                templateId: normalizedIntent.templateId,
                templateLabel: getTemplateDisplayLabel(normalizedIntent.templateId, template.label),
                templateGenre: normalizedIntent.genre,
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
        const canAutoGenerate = false;
        const fallbackMessage = capability.blocked
            ? 'This request includes features outside the current automatic generation capability. Please leave an email and we will route it to the manual queue.'
            : (hasAITemplateDecision
                ? 'The current AI template decision did not confirm a backend published and compileReady template. Retry or switch model if this looks wrong.'
                : 'Automatic generation requires an AI template decision from the backend available template registry. Retry analysis or switch model.');
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
        const template = getTemplateCatalogEntry(decision.templateId);
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
                    autoAttack: /auto[-\\s]?fire|auto[-\\s]?attack|automatic|always fire/i.test(spec.coreGameplay || ''),
                    defaultShootMode: /manual|aim|click|space|trigger/i.test(spec.coreGameplay || '') ? 'manual' : 'auto',
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
        const aiTemplateId = normalizeTemplateId(aiDecision && aiDecision.templateId);
        const localCapability = detectCapabilityExceeded(getSpecIntentText(sourceSpec));
        if (!decision.canAutoGenerate && aiTemplateId && aiTemplateId !== 'unsupported' && isCompileReadyRuntimeTemplate(aiTemplateId) && !localCapability.blocked) {
            const template = getTemplateCatalogEntry(aiTemplateId);
            decision = {
                canAutoGenerate: true,
                templateId: aiTemplateId,
                templateLabel: getTemplateDisplayLabel(aiTemplateId, aiDecision.templateLabel || template.label),
                templateGenre: template.type || aiTemplateId.replace(/_/g, '-'),
                normalizedGameType: template.gameType || template.label,
                locked: true,
                confidence: Math.min(0.98, Math.max(0.6, Number(aiDecision.confidence || decision.confidence || 0.8))),
                reason: aiDecision.reason || `AI selected ${template.label || aiTemplateId}.`,
                fallbackMessage: '',
                candidates: [{ ...template, confidence: Math.min(0.98, Math.max(0.6, Number(aiDecision.confidence || 0.8))), hits: ['ai-template-decision'], directHit: true }]
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
        if (bulletHellPlanState.confirmed && bulletHellPlanState.plan && getTemplateProductPlanFlow(decision.templateId) === 'bullet_hell') {
            decision.productPlan = normalizeBulletHellProductPlan(bulletHellPlanState.plan, sourceSpec);
            decision.templateGenre = decision.templateGenre || (decision.templateId || '').replace(/_/g, '-');
            decision.normalizedGameType = decision.normalizedGameType || decision.templateLabel || decision.templateId;
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
        const normalizedPlan = productionPlan ? normalizeGamePlanForGeneration(productionPlan, spec) : null;
        const productionBrief = normalizedPlan ? buildProductionBriefText(normalizedPlan, spec) : '';
        const gameName = firstText(normalizedPlan && normalizedPlan.title, spec.gameSetting, 'Generated Game Prototype');
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
        const specPatches = {
            meta: {
                gameType: decision.normalizedGameType || decision.templateLabel || decision.templateId || spec.gameType || 'Backend Template Game',
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
        };
        return {
            templateId: decision.templateId,
            userIntentSummary: intentSummary,
            productionPlan: normalizedPlan,
            productionBrief,
            gameName,
            settingsPatch: {
                difficulty: spec.difficultyLevel || 'Normal',
                autoAttack: /auto[-\\s]?fire|auto[-\\s]?attack|automatic|always fire/i.test(spec.coreGameplay || ''),
                defaultShootMode: /manual|aim|click|space|trigger/i.test(spec.coreGameplay || '') ? 'manual' : 'auto',
            },
            specPatches,
            contentPatch: specPatches,
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
Optional compatibility key: contentPatch. If present, it must mirror specPatches.
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
                        requiredSpecModules: getTemplatePatchRequiredModules(decision.templateId),
                        suggestedStructure: {
                            settingsPatch: promptSeed.settingsPatch,
                            specPatches: promptSeed.specPatches,
                            contentPatch: promptSeed.contentPatch,
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
                    content: `You are generating a TemplatePatchPlan for a backend-selected HTML5 game template. Return strict JSON only with these keys:
templateId, userIntentSummary, gameName, settingsPatch, specPatches, contentPatch, manifestPatch, stylePatch, assetPrompts, requiresRuntimeCodePatch, runtimePatchReason, playabilityChecklist.
 Rules:
 - Use runtime inheritance. Do not request runtime code patches unless template configuration/spec/manifest cannot express the user request.
 - Treat productionPlan and productionBrief as the source of truth for this generation. Translate them into config/spec patches, asset prompts, enemies, progression, goals, and visual direction instead of merely naming the matched template.
 - Follow templateCapabilitySummary and templateDefaults from the user payload. If requiredSpecModules is non-empty, cover those modules in specPatches.
 - contentPatch is a backend compatibility mirror of specPatches. Keep contentPatch and specPatches equivalent.
 - Backend Template metadata is the capability source. Do not assume a template supports hybrid modifiers, Magic Tower mechanics, or specific patch modules unless the provided metadata exposes them.
 - Do not output direct file patches, runtime patches, code patches, diffs, or source edits. Only use settingsPatch, specPatches/contentPatch, manifestPatch, stylePatch, assetPrompts.
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
                        templateCapabilitySummary: getTemplateCapabilitySummary(decision.templateId),
                        userSpec: spec,
                        requestContext: buildAIRequestContext(spec.background || savedPrompt || ''),
                        productionPlan: promptSeed.productionPlan,
                        productionBrief: promptSeed.productionBrief || latestGamePlanDraft,
                        suggestedStructure: {
                            settingsPatch: promptSeed.settingsPatch,
                            specPatches: promptSeed.specPatches,
                            contentPatch: promptSeed.contentPatch,
                            stylePatch: promptSeed.stylePatch,
                            assetPromptRoles: Object.keys(promptSeed.assetPrompts || {}),
                            playabilityChecklistTopics: promptSeed.playabilityChecklist
                        },
                        requiredSpecModules: getTemplatePatchRequiredModules(decision.templateId),
                        templateDefaults: getTemplateDefaultsForPrompt(decision.templateId)
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

    function buildLocalTemplatePatchPlan(spec, decision, productionPlan = null) {
        const promptSeed = buildTemplatePatchPromptSeed(spec, decision, productionPlan);
        return {
            ...promptSeed,
            templateId: decision.templateId,
            productionPlan: promptSeed.productionPlan,
            productionBrief: promptSeed.productionBrief,
            requiresRuntimeCodePatch: false,
            runtimePatchReason: '',
            aiGenerated: false,
            modelMeta: {
                providerId: 'local',
                modelId: 'fallback',
                label: 'Local fallback'
            }
        };
    }

    function normalizeTemplatePatchForCompile(patchPlan) {
        const specPatches = {
            ...(patchPlan && patchPlan.contentPatch && typeof patchPlan.contentPatch === 'object' && !Array.isArray(patchPlan.contentPatch) ? patchPlan.contentPatch : {}),
            ...(patchPlan && patchPlan.specPatches && typeof patchPlan.specPatches === 'object' && !Array.isArray(patchPlan.specPatches) ? patchPlan.specPatches : {})
        };
        return {
            ...(patchPlan || {}),
            specPatches,
            contentPatch: specPatches
        };
    }

    async function compileTemplateProject(spec, decision, patchPlan) {
        const availabilityError = getTemplateAvailabilityError(decision);
        if (availabilityError) {
            throw createAIFlowError(
                'TEMPLATE_NOT_COMPILE_READY',
                'capability_unsupported',
                'Backend template is not ready for automatic compile',
                availabilityError,
                decision.templateId || '',
                ['manual_queue']
            );
        }
        const normalizedPatchPlan = normalizeTemplatePatchForCompile(patchPlan);
        const compileArtSkillDecision = resolveCompileArtSkillDecision(decision.templateId);
        const response = await fetch(apiUrl('/api/template-project/compile'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                templateId: decision.templateId,
                spec,
                patchPlan: normalizedPatchPlan,
                contentPatch: normalizedPatchPlan.contentPatch,
                gamePlanningDecision: analysisState.gamePlanningDecision || null,
                gameTemplateDecision: analysisState.templateDecision || null,
                templateDecision: analysisState.templateDecision || null,
                artSkillDecision: compileArtSkillDecision
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
        if (plan.generatedProject) return plan;
        const sourceSpec = plan.decision.productPlan && getTemplateProductPlanFlow(plan.decision.templateId) === 'bullet_hell'
            ? applyBulletHellPlanToGeneratedSpec(plan.decision.productPlan, spec)
            : applyProductionPlanToSpec(spec, plan.productionPlan || latestGamePlan);
        let patchPlan;
        try {
            patchPlan = await generateTemplatePatchPlan(sourceSpec, plan.decision, plan.productionPlan || latestGamePlan);
        } catch (error) {
            recordDiagnostic('template-patch-fallback', {
                phase: 'Template patch generation',
                message: error && (error.message || String(error))
            });
            patchPlan = buildLocalTemplatePatchPlan(sourceSpec, plan.decision, plan.productionPlan || latestGamePlan);
        }
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
        let project;
        try {
            project = await compileTemplateProject(sourceSpec, plan.decision, patchPlan);
        } catch (error) {
            if (error && error.aiFlow && error.code === 'TEMPLATE_NOT_COMPILE_READY') throw error;
            recordDiagnostic('backend-template-compile', {
                phase: 'Template compile',
                message: error && (error.message || String(error))
            });
            throw classifyAIFlowError(error, 'Template compile');
        }
        plan.templatePatchPlan = normalizeTemplatePatchForCompile(patchPlan);
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
                schemaVersion: 1,
                workspaceId: '',
                projectId: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                mode: 'beginner',
                generatedView: 'preview',
                activeToolTab: 'stats',
                historyVersion: 1,
                historyRecords: [],
                numericValues: {},
                committedNumericValues: {},
                draftNumericValues: {},
                dirtyNumericValues: {},
                numericDraftBaseValues: {},
                selectedNumericItemId: 'combat.enemySpeed',
                pendingRuntimePatches: [],
                toolArtifacts: [],
                selectedMediaKey: '',
                selectedMediaAssetId: '',
                mediaImagesCollapsed: false,
                codeSelectedPath: '',
                codeSelectedFolder: '',
                exportState: {},
                saveWarnings: []
            };
        }
        return workspace.__state;
    }

    const WORKSPACE_INDEXED_DB_NAME = 'droi_workspace_runtime';
    const WORKSPACE_INDEXED_DB_VERSION = 1;
    const WORKSPACE_STORE = 'workspaces';
    const WORKSPACE_CURRENT_STORE = 'current';
    const WORKSPACE_SNAPSHOT_DEBOUNCE_MS = 700;
    let workspaceDbPromise = null;
    const workspaceSnapshotTimers = new WeakMap();

    function workspaceStorageAvailable() {
        return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';
    }

    function openWorkspaceRuntimeDb() {
        if (!workspaceStorageAvailable()) return Promise.resolve(null);
        if (workspaceDbPromise) return workspaceDbPromise;
        workspaceDbPromise = new Promise(resolve => {
            const request = window.indexedDB.open(WORKSPACE_INDEXED_DB_NAME, WORKSPACE_INDEXED_DB_VERSION);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(WORKSPACE_STORE)) {
                    db.createObjectStore(WORKSPACE_STORE, { keyPath: 'workspaceId' });
                }
                if (!db.objectStoreNames.contains(WORKSPACE_CURRENT_STORE)) {
                    db.createObjectStore(WORKSPACE_CURRENT_STORE, { keyPath: 'key' });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => {
                console.warn('[Droi] IndexedDB unavailable for workspace snapshots', request.error);
                resolve(null);
            };
            request.onblocked = () => resolve(null);
        });
        return workspaceDbPromise;
    }

    async function workspaceDbPut(storeName, value) {
        const db = await openWorkspaceRuntimeDb();
        if (!db) return false;
        return new Promise(resolve => {
            const tx = db.transaction(storeName, 'readwrite');
            tx.objectStore(storeName).put(value);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => {
                console.warn('[Droi] Workspace snapshot write failed', tx.error);
                resolve(false);
            };
        });
    }

    async function workspaceDbGet(storeName, key) {
        const db = await openWorkspaceRuntimeDb();
        if (!db) return null;
        return new Promise(resolve => {
            const tx = db.transaction(storeName, 'readonly');
            const request = tx.objectStore(storeName).get(key);
            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => {
                console.warn('[Droi] Workspace snapshot read failed', request.error);
                resolve(null);
            };
        });
    }

    function safeWorkspaceIdSegment(value = 'workspace') {
        return String(value || 'workspace').trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'workspace';
    }

    function localWorkspaceId(seed = '') {
        const segment = safeWorkspaceIdSegment(seed || `local-${Date.now()}`);
        return `ws_local_${segment}`;
    }

    function isWorkspaceDemoModeEnabled(params = new URLSearchParams(window.location.search)) {
        return params.get('debugWorkspaceDemo') === '1' || params.get('debugWorkspaceDemo') === 'true';
    }

    function resolveWorkspaceProjectId(plan) {
        const project = plan && plan.generatedProject ? plan.generatedProject : null;
        const generated = plan && plan.generatedSpec ? plan.generatedSpec : null;
        const params = new URLSearchParams(window.location.search);
        return (
            (project && (project.projectId || project.id || project.slug)) ||
            (generated && generated.meta && (generated.meta.projectId || generated.meta.gameId || generated.meta.gameName)) ||
            (isWorkspaceDemoModeEnabled(params) && params.get('demo') ? `demo-${params.get('demo')}` : '') ||
            'demo-edit-workspace'
        );
    }

    function ensureWorkspaceIdentity(workspace, plan) {
        const state = getWorkspaceState(workspace);
        const projectId = state.projectId || resolveWorkspaceProjectId(plan);
        const workspaceId = workspace.dataset.workspaceId || state.workspaceId || localWorkspaceId(projectId);
        state.projectId = projectId;
        state.workspaceId = workspaceId;
        if (!state.createdAt) state.createdAt = new Date().toISOString();
        workspace.dataset.workspaceId = workspaceId;
        workspace.dataset.projectId = projectId;
        return { workspaceId, projectId };
    }

    function stripSensitiveWorkspaceKeys(value) {
        const blocked = /(^|_|\b)(api[-_]?key|providerapi[-_]?key|authorization|secret|rawcredential|access[-_]?token|refresh[-_]?token)(\b|_|$)/i;
        const seen = new WeakSet();
        const scrub = input => {
            if (input == null) return input;
            if (typeof input !== 'object') return input;
            if (seen.has(input)) return undefined;
            seen.add(input);
            if (Array.isArray(input)) return input.map(scrub).filter(item => item !== undefined);
            const output = {};
            Object.entries(input).forEach(([key, item]) => {
                if (blocked.test(key)) return;
                const scrubbed = scrub(item);
                if (scrubbed !== undefined) output[key] = scrubbed;
            });
            return output;
        };
        return scrub(value);
    }

    function collectWorkspaceUiState(workspace) {
        const state = getWorkspaceState(workspace);
        const editRoot = workspace.__editSidebar || workspace;
        const activeToolTab = editRoot.querySelector('[data-edit-module-tab].active')?.dataset.editModuleTab || state.activeToolTab || 'stats';
        return {
            generatedView: workspace.dataset.generatedView || state.generatedView || 'chat',
            workspaceMode: workspace.dataset.workspaceMode || state.mode || 'beginner',
            activeToolTab,
            selectedItemId: workspace.__selectedItemId || '',
            selectedNumericItemId: state.selectedNumericItemId || '',
            selectedMediaKey: state.selectedMediaKey || '',
            selectedMediaAssetId: state.selectedMediaAssetId || '',
            codeSelectedPath: state.codeSelectedPath || '',
            codeSelectedFolder: state.codeSelectedFolder || ''
        };
    }

    function collectWorkspaceDraft(workspace) {
        return {
            chatInput: chatInputField ? chatInputField.value : '',
            placeholder: chatInputField ? chatInputField.placeholder : '',
            savedAt: new Date().toISOString()
        };
    }

    function collectWorkspaceNumericDraft(workspace) {
        const state = getWorkspaceState(workspace);
        return {
            draftNumericValues: { ...(state.draftNumericValues || {}) },
            dirtyNumericValues: { ...(state.dirtyNumericValues || {}) },
            numericDraftBaseValues: { ...(state.numericDraftBaseValues || {}) },
            committedNumericValues: { ...(state.committedNumericValues || {}) }
        };
    }

    function collectWorkspaceHistoryRecords(workspace) {
        const state = getWorkspaceState(workspace);
        if (Array.isArray(state.historyRecords) && state.historyRecords.length) {
            return state.historyRecords.map(record => ({ ...record }));
        }
        const root = workspace.__historySidebar || workspace;
        return Array.from(root.querySelectorAll('.change-history-record')).map(button => {
            const version = button.querySelector('.change-record-top em')?.textContent || '';
            const titleText = button.querySelector('.change-record-top strong')?.textContent || '';
            return {
                version,
                title: titleText.replace(version, '').trim() || 'Workspace change',
                category: button.querySelector('.change-record-top small')?.textContent || 'Local',
                prompt: button.dataset.historyPrompt || button.querySelector('.change-record-prompt')?.textContent || '',
                summary: button.querySelector('.change-record-meta')?.textContent || '',
                trustLevel: button.dataset.historyTrust || 'local_draft',
                createdAt: button.dataset.historyCreatedAt || new Date().toISOString()
            };
        });
    }

    function collectWorkspaceSnapshot(workspace, plan) {
        const identity = ensureWorkspaceIdentity(workspace, plan);
        const state = getWorkspaceState(workspace);
        const now = new Date().toISOString();
        state.updatedAt = now;
        return stripSensitiveWorkspaceKeys({
            schemaVersion: 1,
            workspaceId: identity.workspaceId,
            projectId: identity.projectId,
            createdAt: state.createdAt || now,
            updatedAt: now,
            storageMode: 'local-first',
            cloudCheckpoint: false,
            uiState: collectWorkspaceUiState(workspace),
            draft: collectWorkspaceDraft(workspace),
            numericDraft: collectWorkspaceNumericDraft(workspace),
            patches: buildWorkspacePatches(workspace),
            history: collectWorkspaceHistoryRecords(workspace),
            exportState: { ...(state.exportState || {}) }
        });
    }

    async function persistWorkspaceSnapshot(workspace, plan, reason = 'workspace') {
        if (!workspace || !workspace.isConnected) return false;
        const snapshot = collectWorkspaceSnapshot(workspace, plan || workspace.__plan || workspace.__generationPlan);
        snapshot.reason = reason;
        const ok = await workspaceDbPut(WORKSPACE_STORE, snapshot);
        if (ok) {
            await workspaceDbPut(WORKSPACE_CURRENT_STORE, { key: 'activeWorkspaceId', workspaceId: snapshot.workspaceId, updatedAt: snapshot.updatedAt });
        }
        return ok;
    }

    function scheduleWorkspaceSnapshotSave(workspace, plan, reason = 'workspace') {
        if (!workspace) return;
        const existing = workspaceSnapshotTimers.get(workspace);
        if (existing) window.clearTimeout(existing);
        const timer = window.setTimeout(() => {
            workspaceSnapshotTimers.delete(workspace);
            persistWorkspaceSnapshot(workspace, plan || workspace.__plan || workspace.__generationPlan, reason);
        }, WORKSPACE_SNAPSHOT_DEBOUNCE_MS);
        workspaceSnapshotTimers.set(workspace, timer);
    }

    async function loadWorkspaceSnapshot(workspace, plan) {
        const identity = ensureWorkspaceIdentity(workspace, plan);
        try {
            return await workspaceDbGet(WORKSPACE_STORE, identity.workspaceId);
        } catch (error) {
            console.warn('[Droi] Workspace snapshot restore failed', error);
            return null;
        }
    }

    function mergeWorkspaceSnapshotIntoState(workspace, snapshot) {
        if (!snapshot) return null;
        const state = getWorkspaceState(workspace);
        state.workspaceId = snapshot.workspaceId || state.workspaceId;
        state.projectId = snapshot.projectId || state.projectId;
        state.createdAt = snapshot.createdAt || state.createdAt;
        state.updatedAt = snapshot.updatedAt || state.updatedAt;
        const ui = snapshot.uiState || {};
        state.mode = ui.workspaceMode || state.mode;
        state.generatedView = ui.generatedView || state.generatedView;
        state.activeToolTab = ui.activeToolTab || state.activeToolTab;
        state.selectedNumericItemId = ui.selectedNumericItemId || state.selectedNumericItemId;
        state.selectedMediaKey = ui.selectedMediaKey || state.selectedMediaKey || '';
        state.selectedMediaAssetId = ui.selectedMediaAssetId || state.selectedMediaAssetId || '';
        state.codeSelectedPath = ui.codeSelectedPath || state.codeSelectedPath || '';
        state.codeSelectedFolder = ui.codeSelectedFolder || state.codeSelectedFolder || '';
        const numericDraft = snapshot.numericDraft || {};
        state.draftNumericValues = { ...(numericDraft.draftNumericValues || {}) };
        state.dirtyNumericValues = { ...(numericDraft.dirtyNumericValues || {}) };
        state.numericDraftBaseValues = { ...(numericDraft.numericDraftBaseValues || {}) };
        state.committedNumericValues = { ...(numericDraft.committedNumericValues || state.committedNumericValues || {}) };
        const patches = snapshot.patches || {};
        state.numericValues = { ...(patches.numericValues || state.numericValues || {}) };
        state.pendingRuntimePatches = Array.isArray(patches.pendingRuntimePatches) ? patches.pendingRuntimePatches : state.pendingRuntimePatches || [];
        state.toolArtifacts = Array.isArray(patches.toolArtifacts) ? patches.toolArtifacts : state.toolArtifacts || [];
        state.historyRecords = Array.isArray(snapshot.history) ? snapshot.history : [];
        state.exportState = snapshot.exportState || state.exportState || {};
        return snapshot;
    }

    function findWorkspaceRuntime(workspace) {
        const owner = workspace && (workspace.__container || workspace.closest('.has-game-workspace') || workspace.parentElement);
        return owner && owner.__gameEditRuntime ? owner.__gameEditRuntime : null;
    }

    function workspaceRuntimeNumericValue(workspace, itemId) {
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!setting) return 0;
        const runtime = findWorkspaceRuntime(workspace);
        const config = runtime && runtime.getConfig ? runtime.getConfig() : {};
        if (Number.isFinite(Number(config[setting.runtimeKey]))) return Number(config[setting.runtimeKey]);
        return setting.defaultValue;
    }

    function ensureWorkspaceCommittedNumericValue(workspace, itemId) {
        const state = getWorkspaceState(workspace);
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!setting) return 0;
        if (!state.committedNumericValues) state.committedNumericValues = {};
        if (Number.isFinite(Number(state.committedNumericValues[itemId]))) {
            return Number(state.committedNumericValues[itemId]);
        }
        const value = Number.isFinite(Number(state.numericValues[itemId]))
            ? Number(state.numericValues[itemId])
            : workspaceRuntimeNumericValue(workspace, itemId);
        state.committedNumericValues[itemId] = clampWorkspaceNumber(value, setting.min, setting.max);
        return state.committedNumericValues[itemId];
    }

    function workspaceNumericValue(workspace, itemId) {
        const state = getWorkspaceState(workspace);
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!setting) return 0;
        if (Number.isFinite(Number(state.draftNumericValues && state.draftNumericValues[itemId]))) return Number(state.draftNumericValues[itemId]);
        if (Number.isFinite(Number(state.numericValues[itemId]))) return Number(state.numericValues[itemId]);
        return ensureWorkspaceCommittedNumericValue(workspace, itemId);
    }

    function workspaceCommittedNumericValue(workspace, itemId) {
        return ensureWorkspaceCommittedNumericValue(workspace, itemId);
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

    function isImageWorkspaceFile(path = '') {
        return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(fileExtension(path));
    }

    function isAudioWorkspaceFile(path = '') {
        return ['mp3', 'wav', 'ogg'].includes(fileExtension(path));
    }

    function workspaceFileKind(path = '', file = null) {
        const normalized = normalizeWorkspacePath(path);
        const ext = fileExtension(normalized);
        if (normalized.endsWith('assets/manifest.json')) return 'manifest';
        if (normalized.startsWith('spec/')) return 'spec';
        if (normalized.includes('generation-report')) return 'report';
        if (normalized.startsWith('assets/')) return isImageWorkspaceFile(normalized) ? 'image' : (isAudioWorkspaceFile(normalized) ? 'audio' : 'asset');
        if (file && file.kind) return file.kind;
        return ext || 'file';
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

    function workspaceFileName(path = '') {
        const normalized = normalizeWorkspacePath(path);
        return normalized.split('/').filter(Boolean).pop() || normalized || 'project';
    }

    function formatWorkspaceFileSize(size = 0) {
        const numeric = Number(size) || 0;
        if (numeric >= 1024 * 1024) return `${(numeric / 1024 / 1024).toFixed(1)} MB`;
        if (numeric >= 1024) return `${(numeric / 1024).toFixed(1)} KB`;
        return `${numeric} B`;
    }

    const WORKSPACE_STANDARD_ASSET_DIRS = [
        'assets/Audio & Feel',
        'assets/Audio & Feel/audio',
        'assets/Audio & Feel/effects',
        'assets/Game Art',
        'assets/Game Art/bosses',
        'assets/Game Art/enemies',
        'assets/Game Art/map',
        'assets/Game Art/minibosses',
        'assets/Game Art/pickups',
        'assets/Game Art/skills',
        'assets/Game Art/weapons',
        'assets/Ui Art',
        'assets/Ui Art/opening',
        'assets/Ui Art/run-entry',
        'assets/Visual Style',
        'assets/Visual Style/map',
        'assets/Visual Style/player',
        'assets/Visual Style/portal',
        'assets/Visual Style/style-proofs'
    ];

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
                        <small>Adjust drafts freely. History is written only when you apply changes.</small>
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
                            </article>
                        `;
                    }).join('')}
                </div>
                <div class="workspace-numeric-apply-bar" data-numeric-apply-bar>
                    <div>
                        <strong data-numeric-apply-title>No numeric changes</strong>
                        <small data-numeric-apply-summary>Move sliders or choose presets, then apply once.</small>
                    </div>
                    <div class="workspace-numeric-apply-actions">
                        <button type="button" data-numeric-reset-selected>Reset selected</button>
                        <button type="button" class="primary" data-numeric-apply-all disabled" disabled>Apply changes</button>
                    </div>
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
                text: isTextWorkspaceFile(path),
                url: file.url || file.src || '',
                dataUrl: file.dataUrl || '',
                mimeType: file.mimeType || file.type || ''
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

    function buildAnimalIslandThemeCss(theme = buildAnimalIslandVisualTheme()) {
        const colors = theme.colors || {};
        return [
            '/* DROI_ANIMAL_ISLAND_THEME: generated by workspace visual edit. */',
            ':root {',
            `  --droi-animal-sky: ${colors.sky || '#9fdff2'};`,
            `  --droi-animal-grass: ${colors.grass || '#8bd47a'};`,
            `  --droi-animal-wood: ${colors.wood || '#b9804f'};`,
            `  --droi-animal-cream: ${colors.cream || '#fff6df'};`,
            `  --droi-animal-leaf: ${colors.leaf || '#4f9f63'};`,
            `  --droi-animal-star: ${colors.star || '#ffd95a'};`,
            '}',
            '.game-root, body {',
            '  background: linear-gradient(180deg, var(--droi-animal-sky) 0%, #b7edd8 44%, var(--droi-animal-grass) 100%);',
            '  color: #31523a;',
            '}',
            '.hud, .game-hud, .panel, .stat-panel {',
            '  background: rgba(255, 246, 223, 0.9);',
            '  border: 2px solid rgba(185, 128, 79, 0.38);',
            '  border-radius: 18px;',
            '  box-shadow: 0 12px 0 rgba(98, 63, 39, 0.12), 0 18px 32px rgba(60, 98, 70, 0.18);',
            '}',
            'canvas {',
            '  border-radius: 16px;',
            '  border: 2px solid rgba(255, 246, 223, 0.95);',
            '  background: linear-gradient(180deg, var(--droi-animal-sky) 0%, #8ee5cf 45%, var(--droi-animal-grass) 100%);',
            '}'
        ].join('\n');
    }

    function buildAnimalIslandStyleSvg(theme = buildAnimalIslandVisualTheme()) {
        const colors = theme.colors || {};
        return [
            '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" role="img" aria-label="Animal island visual style sheet">',
            `  <rect width="512" height="512" rx="48" fill="${colors.sky || '#9fdff2'}"/>`,
            `  <path d="M0 302 C94 260 142 330 236 292 C330 254 398 282 512 242 V512 H0 Z" fill="${colors.grass || '#8bd47a'}"/>`,
            `  <path d="M70 372 H258 Q282 372 282 396 V444 H46 V396 Q46 372 70 372 Z" fill="${colors.wood || '#b9804f'}"/>`,
            `  <rect x="76" y="392" width="176" height="30" rx="15" fill="${colors.cream || '#fff6df'}"/>`,
            `  <path d="M354 175 C392 112 456 146 446 210 C436 276 356 282 328 238 C302 198 322 162 354 175 Z" fill="${colors.leaf || '#4f9f63'}"/>`,
            `  <path d="M390 152 C382 188 358 214 328 238" fill="none" stroke="${colors.cream || '#fff6df'}" stroke-width="10" stroke-linecap="round"/>`,
            `  <path d="M146 136 L162 174 L204 178 L172 204 L182 246 L146 224 L110 246 L120 204 L88 178 L130 174 Z" fill="${colors.star || '#ffd95a'}"/>`,
            '</svg>'
        ].join('\n');
    }

    function applyWorkspaceFilePatch(workspace, plan, item, prompt, edit = {}) {
        if (!plan || !item) return null;
        const now = new Date().toISOString();
        const visualTheme = edit && edit.visualTheme && edit.visualTheme.id === 'animal_island'
            ? edit.visualTheme
            : null;
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
            gameplayLocked: true,
            visualTheme: visualTheme ? visualTheme.id : undefined
        };
        manifest.generation.assetPrompts[item.id] = prompt;
        if (visualTheme) {
            manifest.generation.visualTheme = visualTheme;
            manifest.generation.assetReplacements = {
                ...(manifest.generation.assetReplacements || {}),
                [item.id]: 'assets/animal-island-style.svg'
            };
        }
        appendWorkspaceEditEntry(manifest, patchSummary);
        upsertGeneratedProjectCodeFile(plan, 'assets/manifest.json', JSON.stringify(manifest, null, 2), { language: 'json', kind: 'manifest' });

        if (plan.generatedSpec) {
            const spec = JSON.parse(JSON.stringify(plan.generatedSpec));
            if (!spec.workspaceEdits) spec.workspaceEdits = [];
            spec.workspaceEdits.push(patchSummary);
            if (item.type === 'image') {
                spec.visualTheme = {
                    ...(spec.visualTheme || {}),
                    ...(visualTheme || {}),
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
        const updatedFiles = [
            'assets/manifest.json',
            'spec/game.json',
            'spec/generated-game-spec.json',
            'generation-report.json',
            'workspace-edits/latest-edit.json',
            'workspace-edits/latest-edit.md'
        ];
        if (visualTheme) {
            const themeCss = buildAnimalIslandThemeCss(visualTheme);
            const themeSvg = buildAnimalIslandStyleSvg(visualTheme);
            upsertGeneratedProjectCodeFile(plan, 'style/animal-island-theme.css', themeCss, { language: 'css', kind: 'style' });
            upsertGeneratedProjectCodeFile(plan, 'assets/animal-island-style.svg', themeSvg, { language: 'svg', kind: 'asset' });
            updatedFiles.push('style/animal-island-theme.css', 'assets/animal-island-style.svg');
            const cssCandidates = ['bullet-hell.css', 'style.css', 'styles.css', 'game.css'];
            const existingCss = cssCandidates
                .map(path => ({ path, file: readGeneratedProjectCodeFile(plan, path) }))
                .find(entry => entry.file && typeof entry.file.content === 'string');
            if (existingCss && !existingCss.file.content.includes('DROI_ANIMAL_ISLAND_THEME')) {
                upsertGeneratedProjectCodeFile(
                    plan,
                    existingCss.path,
                    `${existingCss.file.content.trim()}\n\n${themeCss}\n`,
                    { language: existingCss.file.language || 'css', kind: existingCss.file.kind || 'style' }
                );
                updatedFiles.push(existingCss.path);
            }
        }
        patchSummary.updatedFiles = updatedFiles;
        return patchSummary;
    }

    function refreshWorkspaceCodePanel(workspace, plan) {
        const codePanel = workspace.querySelector('[data-edit-module="code"]');
        if (!codePanel) return;
        codePanel.innerHTML = buildCodePanelHtml(plan && plan.generatedProject, plan && plan.generatedSpec);
        bindWorkspaceCodeControls(workspace, plan);
    }

    function createCodeTreeFolder(name = '', path = '', depth = 0, virtual = false) {
        return {
            type: 'folder',
            name,
            path,
            depth,
            virtual,
            children: new Map(),
            fileCount: 0
        };
    }

    function buildCodeFileTree(files = []) {
        const root = createCodeTreeFolder('Generated project', '', -1, true);
        const ensureFolder = folderPath => {
            const normalized = normalizeWorkspacePath(folderPath);
            if (!normalized) return root;
            const parts = normalized.split('/').filter(Boolean);
            let current = root;
            let cursor = '';
            parts.forEach((part, index) => {
                cursor = cursor ? `${cursor}/${part}` : part;
                if (!current.children.has(part)) {
                    current.children.set(part, createCodeTreeFolder(part, cursor, index, true));
                }
                current = current.children.get(part);
            });
            return current;
        };
        files.forEach(file => {
            const normalized = normalizeWorkspacePath(file.path);
            if (!normalized || normalized.endsWith('/.gitkeep')) return;
            const parts = normalized.split('/').filter(Boolean);
            if (!parts.length) return;
            let current = root;
            let cursor = '';
            parts.slice(0, -1).forEach((part, index) => {
                cursor = cursor ? `${cursor}/${part}` : part;
                if (!current.children.has(part)) {
                    current.children.set(part, createCodeTreeFolder(part, cursor, index, false));
                }
                current = current.children.get(part);
            });
            const fileName = parts[parts.length - 1];
            current.children.set(fileName, {
                type: 'file',
                name: fileName,
                path: normalized,
                depth: parts.length - 1,
                file,
                kind: workspaceFileKind(normalized, file)
            });
        });
        const hasAssets = files.some(file => normalizeWorkspacePath(file.path).startsWith('assets/'));
        if (hasAssets) WORKSPACE_STANDARD_ASSET_DIRS.forEach(ensureFolder);
        const sortChildren = node => {
            if (node.type !== 'folder') return;
            const sorted = Array.from(node.children.values()).sort((a, b) => {
                if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
                return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
            });
            node.children = sorted;
            node.fileCount = 0;
            sorted.forEach(child => {
                if (child.type === 'folder') {
                    sortChildren(child);
                    node.fileCount += child.fileCount;
                } else {
                    node.fileCount += 1;
                }
            });
        };
        sortChildren(root);
        return root;
    }

    function codeTreeNodeMatches(node, search = '', filter = 'all') {
        if (node.type === 'folder') return true;
        const path = node.path.toLowerCase();
        const kind = node.kind || workspaceFileKind(node.path, node.file);
        const ext = fileExtension(node.path);
        const searchOk = !search || path.includes(search);
        const filterOk = filter === 'all'
            || kind === filter
            || ext === filter
            || (filter === 'assets' && node.path.startsWith('assets/'))
            || (filter === 'images' && isImageWorkspaceFile(node.path));
        return searchOk && filterOk;
    }

    function filterCodeTreeNode(node, search = '', filter = 'all') {
        if (node.type === 'file') return codeTreeNodeMatches(node, search, filter) ? node : null;
        const ownMatch = search && node.path.toLowerCase().includes(search);
        const children = (node.children || [])
            .map(child => filterCodeTreeNode(child, search, filter))
            .filter(Boolean);
        if (!children.length && !ownMatch) {
            const keepVirtualAssetFolder = !search && (filter === 'all' || filter === 'assets') && node.virtual && node.path.startsWith('assets/');
            if (!keepVirtualAssetFolder) return null;
        }
        return { ...node, children, fileCount: children.reduce((sum, child) => sum + (child.type === 'folder' ? child.fileCount : 1), 0) };
    }

    function renderCodeTreeNode(node, options = {}) {
        const selectedPath = options.selectedPath || '';
        const forceOpen = Boolean(options.forceOpen);
        if (node.type === 'file') {
            const kind = workspaceFileKind(node.path, node.file);
            return `
                <button type="button" class="code-file code-tree-file${selectedPath === node.path ? ' active selected' : ''}" style="--depth:${node.depth}" data-code-file="${escapeHtml(node.path)}" data-code-kind="${escapeHtml(kind)}">
                    <span class="code-file-icon ${escapeHtml(kind)}">${escapeHtml(workspaceFileBadge(node.path))}</span>
                    <strong class="code-tree-name" title="${escapeHtml(node.path)}">${escapeHtml(node.name)}</strong>
                    <small>${escapeHtml(fileExtension(node.path) || kind)}</small>
                </button>
            `;
        }
        const isOpen = forceOpen || node.depth <= 1;
        return `
            <details class="code-tree-folder" style="--depth:${Math.max(0, node.depth)}" data-code-folder="${escapeHtml(node.path)}" ${isOpen ? 'open' : ''}>
                <summary data-code-folder-summary="${escapeHtml(node.path)}">
                    <span class="code-tree-caret" aria-hidden="true"></span>
                    <span class="code-file-icon folder">DIR</span>
                    <strong class="code-tree-name" title="${escapeHtml(node.path || node.name)}">${escapeHtml(node.name || 'Generated project')}</strong>
                    <small>${node.fileCount} files</small>
                </summary>
                <div class="code-tree-children">
                    ${(node.children || []).map(child => renderCodeTreeNode(child, options)).join('')}
                </div>
            </details>
        `;
    }

    function renderCodeTreeHtml(files = [], selectedPath = '', search = '', filter = 'all') {
        const root = buildCodeFileTree(files);
        const normalizedSearch = String(search || '').trim().toLowerCase();
        const filteredRoot = filterCodeTreeNode(root, normalizedSearch, filter) || root;
        const children = filteredRoot.children || [];
        if (!children.length) {
            return '<div class="code-tree-empty">No files match this filter.</div>';
        }
        return `
            <div class="code-tree-list">
                ${children.map(child => renderCodeTreeNode(child, { selectedPath, forceOpen: Boolean(normalizedSearch) })).join('')}
            </div>
        `;
    }

    function codePreviewUrl(file) {
        if (!file) return '';
        if (file.dataUrl) return file.dataUrl;
        if (file.url) return apiUrl(file.url);
        if (typeof file.content === 'string' && file.content.startsWith('data:image/')) return file.content;
        return '';
    }

    function renderCodePreviewContent(file = null, folderPath = '') {
        if (!file) {
            const label = folderPath || 'Generated project';
            return `
                <div class="code-preview-empty">
                    <strong>${escapeHtml(label)}</strong>
                    <p>This is a virtual folder in the generated project. Select a file to preview its contents.</p>
                </div>
            `;
        }
        if (file.text) {
            return `<pre class="code-preview-text"><code>${escapeHtml(file.content || '')}</code></pre>`;
        }
        if (isImageWorkspaceFile(file.path)) {
            const url = codePreviewUrl(file);
            return `
                <div class="code-preview-asset">
                    ${url ? `<img class="code-preview-image" src="${escapeHtml(url)}" alt="${escapeHtml(file.path)}">` : '<div class="code-preview-image-placeholder">Image reference</div>'}
                    <dl>
                        <div><dt>Path</dt><dd>${escapeHtml(file.path)}</dd></div>
                        <div><dt>Type</dt><dd>${escapeHtml(file.mimeType || fileExtension(file.path) || 'image')}</dd></div>
                        <div><dt>Size</dt><dd>${escapeHtml(formatWorkspaceFileSize(file.size))}</dd></div>
                        <div><dt>Source</dt><dd>${url ? 'Previewable in browser workspace' : 'Reference or placeholder; exported through Save ZIP when available'}</dd></div>
                    </dl>
                </div>
            `;
        }
        if (isAudioWorkspaceFile(file.path)) {
            return `
                <div class="code-preview-asset">
                    <div class="code-preview-image-placeholder">Audio resource</div>
                    <dl>
                        <div><dt>Path</dt><dd>${escapeHtml(file.path)}</dd></div>
                        <div><dt>Type</dt><dd>${escapeHtml(file.mimeType || fileExtension(file.path) || 'audio')}</dd></div>
                        <div><dt>Size</dt><dd>${escapeHtml(formatWorkspaceFileSize(file.size))}</dd></div>
                    </dl>
                </div>
            `;
        }
        return `
            <div class="code-preview-asset">
                <div class="code-preview-image-placeholder">Binary / external asset</div>
                <dl>
                    <div><dt>Path</dt><dd>${escapeHtml(file.path)}</dd></div>
                    <div><dt>Type</dt><dd>${escapeHtml(file.mimeType || fileExtension(file.path) || 'file')}</dd></div>
                    <div><dt>Size</dt><dd>${escapeHtml(formatWorkspaceFileSize(file.size))}</dd></div>
                </dl>
            </div>
        `;
    }

    function buildCodePanelHtml(project = null, generated = null) {
        const files = buildWorkspaceCodeFiles(project, generated, null);
        const firstText = files.find(file => file.text) || files[0];
        return `
            <div class="workspace-code-compact" data-workspace-code-panel>
                <div class="workspace-code-toolbar">
                    <input type="search" placeholder="绛涢€夋枃浠?.." data-code-search>
                    <select data-code-filter aria-label="File type filter">
                        <option value="all">All</option>
                        <option value="html">HTML</option>
                        <option value="js">JS</option>
                        <option value="css">CSS</option>
                        <option value="json">JSON</option>
                        <option value="assets">Assets</option>
                        <option value="images">Images</option>
                    </select>
                    <button type="button" class="workspace-header-btn" data-code-open-modal>View code</button>
                </div>
                <div class="workspace-code-summary" data-code-summary>
                    <strong>${files.length} files</strong>
                    <small>${escapeHtml(firstText ? firstText.path : 'No file selected')}</small>
                </div>
                <div class="code-workspace-panel compact" data-code-workspace data-code-files="${escapeHtml(JSON.stringify(files))}">
                    <div class="code-file-tree" data-code-file-list>
                        ${renderCodeTreeHtml(files, firstText ? firstText.path : '')}
                    </div>
                    <div class="code-editor-pane">
                        <div class="code-editor-titlebar" data-code-titlebar>
                            <span class="generated-file-icon code-file-icon ${escapeHtml(firstText ? workspaceFileKind(firstText.path, firstText) : 'folder')}">${escapeHtml(firstText ? workspaceFileBadge(firstText.path) : 'DIR')}</span>
                            <strong>${escapeHtml(firstText ? firstText.path : 'Select a file')}</strong>
                            <small>${escapeHtml(firstText ? (firstText.language || 'file') : 'folder')}</small>
                        </div>
                        <div class="code-preview" aria-label="Generated code preview" data-code-preview>${renderCodePreviewContent(firstText)}</div>
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
        const identity = ensureWorkspaceIdentity(workspace, workspace.__plan || workspace.__generationPlan);
        return stripSensitiveWorkspaceKeys({
            schema: 'droi-workspace-patches/v1',
            schemaVersion: 1,
            workspaceId: identity.workspaceId,
            projectId: identity.projectId,
            storageMode: 'local-first',
            cloudCheckpoint: false,
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
        });
    }

    function buildWorkspaceSessionExport(workspace, plan) {
        const identity = ensureWorkspaceIdentity(workspace, plan);
        const state = getWorkspaceState(workspace);
        return stripSensitiveWorkspaceKeys({
            schemaVersion: 1,
            contractVersion: '1.0',
            workspaceId: identity.workspaceId,
            projectId: identity.projectId,
            storageMode: 'local-first',
            cloudCheckpoint: false,
            createdAt: state.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            note: 'P0 local-first browser workspace snapshot. No backend session/task is created by this export.'
        });
    }

    function buildWorkspaceExportManifest(workspace, plan, fileCount = 0) {
        const identity = ensureWorkspaceIdentity(workspace, plan);
        const state = getWorkspaceState(workspace);
        return stripSensitiveWorkspaceKeys({
            contractVersion: '1.0',
            storageMode: 'local-first',
            cloudCheckpoint: false,
            workspaceId: identity.workspaceId,
            projectId: identity.projectId,
            exportId: state.exportState && state.exportState.exportId ? state.exportState.exportId : localWorkspaceId(`export-${Date.now()}`),
            exportedAt: new Date().toISOString(),
            fileCount,
            includes: [
                'generated project files',
                'workspace-session.json',
                'workspace-ui-state.json',
                'workspace-draft.json',
                'workspace-local-history.json',
                'workspace-patches.json'
            ],
            excludes: [
                'apiKey',
                'providerApiKey',
                'Authorization',
                'raw credentials'
            ]
        });
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
        const sessionExport = buildWorkspaceSessionExport(workspace, plan);
        const uiStateExport = collectWorkspaceUiState(workspace);
        const draftExport = {
            draft: collectWorkspaceDraft(workspace),
            numericDraft: collectWorkspaceNumericDraft(workspace)
        };
        const historyExport = {
            schemaVersion: 1,
            trustLevel: 'local_draft',
            history: collectWorkspaceHistoryRecords(workspace)
        };
        upsert('workspace-session.json', JSON.stringify(sessionExport, null, 2));
        upsert('workspace-ui-state.json', JSON.stringify(stripSensitiveWorkspaceKeys(uiStateExport), null, 2));
        upsert('workspace-draft.json', JSON.stringify(stripSensitiveWorkspaceKeys(draftExport), null, 2));
        upsert('workspace-local-history.json', JSON.stringify(stripSensitiveWorkspaceKeys(historyExport), null, 2));
        upsert('workspace-patches.json', JSON.stringify(buildWorkspacePatches(workspace), null, 2));
        const warnings = getWorkspaceState(workspace).saveWarnings || [];
        if (warnings.length) upsert('SAVE_WARNINGS.txt', warnings.join('\n'));
        upsert('export-manifest.json', JSON.stringify(buildWorkspaceExportManifest(workspace, plan, files.length + 1), null, 2));
        upsert('README_SAVE_NOTE.txt', [
            'Droi AI generated game export.',
            'This ZIP is created from the current browser workspace.',
            'This is a local-first export: browser draft, UI state, local history and patches are included.',
            'workspace-patches.json stores numeric changes, pending runtime patches and local tool artifacts.',
            'No API keys, provider keys, Authorization headers or raw credentials are included.',
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
        const state = getWorkspaceState(workspace);
        state.exportState = {
            exportId: localWorkspaceId(`export-${Date.now()}`),
            exportedAt: new Date().toISOString(),
            storageMode: 'local-first',
            cloudCheckpoint: false
        };
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
                summary: `Saved ${files.length} files, including workspace metadata and workspace-patches.json.`
            });
            scheduleWorkspaceSnapshotSave(workspace, plan, 'export');
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
        scheduleWorkspaceSnapshotSave(workspace, plan, 'tool_artifact');
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
            <div class="tools-topbar" aria-label="Tool actions">
                <span class="tools-save-indicator" data-workspace-save-status>Changes saved</span>
                <button type="button" class="tools-publish-btn" title="Publish is not enabled in this local demo">Publish</button>
                <button type="button" class="tools-save-btn" data-workspace-save>Save Changes</button>
            </div>
            <div class="game-edit-tabs" role="tablist" aria-label="Game edit modules">
                ${GAME_EDIT_MODULES.map(module => `
                    <button type="button" class="game-edit-tab${module.id === 'stats' ? ' active' : ''}${module.id !== 'stats' ? ' advanced-only' : ''}" data-edit-module-tab="${escapeHtml(module.id)}">${escapeHtml(module.id === 'stats' ? 'Home' : module.id === 'tools' ? 'Tools' : module.label)}<small>${module.id === 'stats' ? Object.keys(WORKSPACE_NUMERIC_SETTINGS).length : (module.id === 'media' ? WORKSPACE_MEDIA_STRUCTURE.length : (module.id === 'tools' ? DROI_GAME_TOOLS.length : buildWorkspaceCodeFiles(project, generated, null).length))}</small></button>
                `).join('')}
            </div>
            <div class="workspace-advanced-lock-hint" data-advanced-lock-hint hidden>Switch to Advanced to inspect assets, files, and local tools.</div>
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
            <div class="workspace-sidebar-mode-panel" data-workspace-sidebar-mode>
                <div class="workspace-sidebar-mode-head">
                    <strong>Mode</strong>
                    <small>Beginner keeps core controls simple. Advanced unlocks media, files and local tools.</small>
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
                    <small>${escapeHtml(project.templateLabel || 'Template project')} 路 ${escapeHtml(project.validationReport && project.validationReport.ok ? 'Validated' : 'Needs review')}</small>
                </div>
                ${groups.map(group => {
                    const categories = group.categories || [];
                    if (!categories.length) return '';
                    return `
                        <section class="asset-group">
                            <div class="asset-group-title"><span>${escapeHtml(group.group)}</span><small>${categories.reduce((sum, category) => sum + (category.total || 0), 0)}</small></div>
                            ${categories.map(category => `
                                <details class="asset-category" ${category.defaultOpen ? 'open' : ''}>
                                    <summary><span>${escapeHtml(category.category)}</span><small>${category.total}${category.overflow ? ` 路 +${category.overflow}` : ''}</small></summary>
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
                    ${((project.validationReport && project.validationReport.checks) || []).map(check => `<span class="${check.ok ? 'ok' : 'warn'}">${check.ok ? 'OK' : 'Review'} 路 ${escapeHtml(check.label)}</span>`).join('')}
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
            '<div class="generated-game-page is-beginner-mode" data-game-workspace data-workspace-mode="beginner" data-generated-view="preview">',
            '<div class="workspace-body generated-page-layout page-workbench" aria-label="Generated game page workbench">',
            '<aside class="change-history-sidebar version-history-panel page-region" aria-label="Version history">',
            '<button type="button" class="workspace-panel-toggle workspace-panel-toggle-left" data-workspace-panel-toggle="history" aria-label="Toggle change history" aria-expanded="false">&lsaquo;</button>',
            '<div class="workspace-panel-head">',
            '<span>Version History</span>',
            '<small>Page-level changes, exports and reusable prompts.</small>',
            '</div>',
            '<div class="change-history-list" data-edit-history-list>',
            `<button type="button" class="change-history-record initial-version" data-history-prompt="${escapeHtml(generated.meta.description || 'Initial generated version')}">`,
            '<span class="change-record-top"><strong><em>v1</em>Initial generation</strong><small>System</small></span>',
            `<span class="change-record-prompt">${escapeHtml(generated.meta.gameName)}</span>`,
            '<span class="change-record-meta">Playable base version generated. Beginner mode is ready for numeric tuning; Advanced mode unlocks media, files and tools.</span>',
            '</button>',
            '</div>',
            '</aside>',
            '<main class="game-preview-column generated-main-panel game-workspace-panel" aria-label="Playable game workspace">',
            '<div class="generated-main-header">',
            '<div class="workspace-title-block">',
            '<small>GAME WORKSPACE</small>',
            `<strong data-generated-game-title>${escapeHtml(generated.meta.gameName)}</strong>`,
            '<span class="workspace-artifact-status"><b>Playable v1</b><i>Ready for conversational edits</i></span>',
            '</div>',
            '<div class="generated-view-switch" role="tablist" aria-label="Generated game view">',
            '<button type="button" data-generated-view-set="chat" aria-pressed="false">Chat</button>',
            '<button type="button" class="active" data-generated-view-set="preview" aria-pressed="true">Preview / Play</button>',
            '</div>',
            '</div>',
            '<div class="playable-shell generated-view-shell preview-open">',
            '<button type="button" class="mobile-game-preview-toggle" data-game-action="mobile-preview-toggle" aria-expanded="true">Close game preview</button>',
            '<section class="generated-chat-view" data-generated-view-panel="chat" aria-label="Generated conversation">',
            '<div class="game-preview-chat-panel" data-preview-chat-panel>',
            '<div class="preview-chat-title-row">',
            '<strong>Editing thread</strong>',
            '<span aria-hidden="true">v1 playable</span>',
            '</div>',
            '<div class="preview-chat-user-bubble">Ok, create it!</div>',
            `<div class="preview-chat-time">${escapeHtml(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))}</div>`,
            `<p class="preview-chat-assistant-note">Created <strong>${escapeHtml(generated.meta.gameName)}</strong>. Play it first, then describe the next edit below. I will route style, balance, controls, assets, or files automatically.</p>`,
            '<div class="workspace-prompt-chips" aria-label="Suggested edit prompts">',
            '<button type="button" class="workspace-prompt-chip" data-workspace-prompt="Make the visual style warmer and more polished, while keeping the same gameplay.">Change art style</button>',
            '<button type="button" class="workspace-prompt-chip" data-workspace-prompt="Tune the difficulty so the first minute feels fair but still exciting.">Tune difficulty</button>',
            '<button type="button" class="workspace-prompt-chip" data-workspace-prompt="Replace or polish the player character art and keep the hitbox readable.">Replace player art</button>',
            '<button type="button" class="workspace-prompt-chip" data-workspace-prompt="Improve the controls and feedback so the game feels easier to start and play.">Edit controls</button>',
            '</div>',
            '<div class="preview-chat-edit-status" data-workspace-edit-context><strong>Ready for edits:</strong> Describe the change in the input below. <small>Open Tools only when you need a precise target.</small></div>',
            '</div>',
            '</section>',
            '<section class="generated-preview-view playable-preview-card" data-generated-view-panel="preview" aria-label="Playable preview">',
            '<div class="workspace-stage-toolbar">',
            '<div class="workspace-stage-label"><span>Playable stage</span><strong>Start screen ready</strong></div>',
            '<div class="game-preview-actions preview-card-actions" aria-label="Playable controls">',
            '<button type="button" class="game-preview-btn game-preview-btn-primary" data-game-action="pause">Start / Focus</button>',
            '<button type="button" class="game-preview-btn" data-game-action="restart">Restart</button>',
            '<button type="button" class="game-preview-btn" data-generated-view-set="chat">Edit</button>',
            `<button type="button" class="game-preview-btn web-preview-trigger" data-game-action="preview" data-preview-url="${escapeHtml(previewUrl)}">Open</button>`,
            '</div>',
            '</div>',
            '<div class="game-preview-viewport">',
            previewMarkup,
            '</div>',
            '</section>',
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
                ? `<div class="summary-item validation-inline">${checks.map(check => `<span class="${check.ok ? 'ok' : 'warn'}">${check.ok ? 'OK' : 'Review'} 路 ${escapeHtml(check.label)}</span>`).join('')}</div>`
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
            '缇庢湳', '瑙嗚', '鐢婚', '椋庢牸', '閰嶈壊', '鑹插僵', '棰滆壊', '鑳屾櫙', '鍦板浘', '鍦烘櫙', '鍔ㄦ．', '鍙埍', '鍦嗘鼎',
            'art style', 'visual style', 'visual', 'style', 'theme', 'palette', 'color', 'background', 'map', 'scene',
            'animal island', 'cozy', 'cute', 'watercolor', 'pixel', 'gothic', 'cyber', 'neon'
        ])) return 'visual.mapMain';
        if (promptIncludesAny(prompt, ['鐜╁', '涓昏', '椋炶埞', '瑙掕壊', 'player', 'ship', 'fighter', 'character', 'glider'])) return 'art.player';
        if (promptIncludesAny(prompt, ['enemy', 'enemies', 'mob', 'foe', 'creep', 'hostile'])) return 'art.enemies';
        if (promptIncludesAny(prompt, ['boss', 'bosses', '棣栭'])) return 'art.bosses';
        if (promptIncludesAny(prompt, ['瀛愬脊', '寮瑰箷', '鏀诲嚮鐗规晥', 'bullet', 'projectile', 'shot', 'attack art'])) return 'art.weaponAttacks';
        if (promptIncludesAny(prompt, ['ui', 'hud', '鎸夐挳', '鐣岄潰', '鑿滃崟', 'panel', 'button'])) return 'visual.ui';
        if (promptIncludesAny(prompt, ['闊虫晥', '闊充箰', '澹伴煶', 'audio', 'sound', 'music', 'bgm'])) return 'audio.effects';
        if (promptIncludesAny(prompt, ['shooting', 'attack speed', 'fire rate', 'cooldown'])) return 'combat.fireRate';
        if (promptIncludesAny(prompt, ['浼ゅ', 'damage', 'power'])) return 'combat.damage';
        if (promptIncludesAny(prompt, ['hp', 'health', 'life', 'enemy health'])) return 'combat.enemyHp';
        if (promptIncludesAny(prompt, ['閫熷害', 'speed'])) return 'combat.enemySpeed';
        if (promptIncludesAny(prompt, ['闅惧害', '娉㈡', 'difficulty', 'wave'])) return 'combat.wave';
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

    function isAnimalIslandPrompt(prompt = '') {
        const text = String(prompt || '').toLowerCase();
        return /animal\s*crossing|animal\s*island|cozy\s*island|villager|leaf\s*icon|wooden\s*sign|pastel\s*grass|soft\s*grass|cute\s*friendly|nook|\u52a8\u68ee|\u52a8\u7269\u68ee\u53cb\u4f1a/.test(text);
    }

    function buildAnimalIslandVisualTheme(prompt = '') {
        return {
            id: 'animal_island',
            label: 'Cozy Animal Island',
            prompt,
            colors: {
                sky: '#9fdff2',
                grass: '#8bd47a',
                deepGrass: '#55b86c',
                cream: '#fff6df',
                wood: '#b9804f',
                leaf: '#4f9f63',
                star: '#ffd95a',
                flower: '#f58fb0',
                water: '#6fc7d8',
                ink: '#31523a',
                hudBg: 'rgba(255, 246, 223, 0.9)',
                hudBorder: 'rgba(185, 128, 79, 0.38)',
                grid: 'rgba(89, 126, 93, 0.18)',
                player: '#f7fbff',
                enemy: '#f58fb0',
                boss: '#b9804f',
                playerBullet: '#ffd95a',
                enemyBullet: '#6fc7d8'
            },
            shapes: {
                radius: 18,
                bullets: 'soft stars and bubbles',
                ui: 'rounded wooden signs with cream panels'
            }
        };
    }

    function drawAnimalIslandMiniAsset(assetCtx, label, theme) {
        const colors = theme.colors || {};
        const sky = assetCtx.createLinearGradient(0, 0, 0, 256);
        sky.addColorStop(0, colors.sky || '#9fdff2');
        sky.addColorStop(0.62, '#b7edd8');
        sky.addColorStop(1, colors.grass || '#8bd47a');
        assetCtx.fillStyle = sky;
        assetCtx.fillRect(0, 0, 256, 256);
        assetCtx.fillStyle = colors.deepGrass || '#55b86c';
        assetCtx.beginPath();
        assetCtx.moveTo(0, 178);
        assetCtx.bezierCurveTo(44, 156, 74, 192, 116, 174);
        assetCtx.bezierCurveTo(164, 150, 194, 164, 256, 138);
        assetCtx.lineTo(256, 256);
        assetCtx.lineTo(0, 256);
        assetCtx.closePath();
        assetCtx.fill();
        assetCtx.fillStyle = colors.wood || '#b9804f';
        assetCtx.roundRect(44, 172, 168, 58, 18);
        assetCtx.fill();
        assetCtx.fillStyle = colors.cream || '#fff6df';
        assetCtx.roundRect(58, 186, 140, 30, 15);
        assetCtx.fill();
        assetCtx.fillStyle = colors.leaf || '#4f9f63';
        assetCtx.beginPath();
        assetCtx.ellipse(178, 70, 34, 52, 0.7, 0, Math.PI * 2);
        assetCtx.fill();
        assetCtx.strokeStyle = colors.cream || '#fff6df';
        assetCtx.lineWidth = 5;
        assetCtx.beginPath();
        assetCtx.moveTo(160, 100);
        assetCtx.quadraticCurveTo(176, 80, 190, 42);
        assetCtx.stroke();
        assetCtx.fillStyle = colors.star || '#ffd95a';
        assetCtx.beginPath();
        assetCtx.moveTo(74, 54);
        assetCtx.lineTo(84, 78);
        assetCtx.lineTo(110, 80);
        assetCtx.lineTo(90, 96);
        assetCtx.lineTo(96, 122);
        assetCtx.lineTo(74, 108);
        assetCtx.lineTo(52, 122);
        assetCtx.lineTo(58, 96);
        assetCtx.lineTo(38, 80);
        assetCtx.lineTo(64, 78);
        assetCtx.closePath();
        assetCtx.fill();
        assetCtx.fillStyle = colors.ink || '#31523a';
        assetCtx.font = '900 20px Inter, sans-serif';
        assetCtx.textAlign = 'center';
        assetCtx.fillText(String(label || 'Island').slice(0, 13), 128, 209);
    }

    function createWorkspaceAssetDataUrl(prompt, label, visualTheme = null) {
        if ((visualTheme && visualTheme.id === 'animal_island') || isAnimalIslandPrompt(prompt)) {
            const theme = visualTheme || buildAnimalIslandVisualTheme(prompt);
            const animalCanvas = document.createElement('canvas');
            animalCanvas.width = 256;
            animalCanvas.height = 256;
            const animalCtx = animalCanvas.getContext('2d');
            drawAnimalIslandMiniAsset(animalCtx, label, theme);
            return animalCanvas.toDataURL('image/png');
        }
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
    function createWorkspaceHistoryButton(workspace, record) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `change-history-record${record.initial ? ' initial-version' : ''}`;
        button.dataset.historyPrompt = record.prompt || '';
        button.dataset.historyTrust = record.trustLevel || 'local_draft';
        button.dataset.historyCreatedAt = record.createdAt || new Date().toISOString();
        button.innerHTML = `
            <span class="change-record-top">
                <strong><em>${escapeHtml(record.version || 'v1')}</em>${escapeHtml(record.title || 'Workspace change')}</strong>
                <small>${escapeHtml(record.category || 'Local')}</small>
            </span>
            <span class="change-record-prompt">${escapeHtml(record.prompt || '')}</span>
            <span class="change-record-meta">${escapeHtml(record.summary || '')}</span>
        `;
        button.addEventListener('click', () => {
            const input = chatInputField;
            if (!input) return;
            setChatInputValue(record.prompt || '', { focus: true, cursorToEnd: true });
        });
        return button;
    }

    function replaceWorkspaceHistoryRecords(workspace, records = []) {
        const historyRoot = workspace.__historySidebar || workspace;
        const list = historyRoot.querySelector('[data-edit-history-list]');
        if (!list || !Array.isArray(records) || !records.length) return;
        const state = getWorkspaceState(workspace);
        const normalized = records.map(record => ({
            version: record.version || 'v1',
            title: record.title || 'Workspace change',
            category: record.category || 'Local',
            prompt: record.prompt || '',
            summary: record.summary || '',
            trustLevel: record.trustLevel || 'local_draft',
            createdAt: record.createdAt || new Date().toISOString(),
            initial: record.initial || record.version === 'v1'
        }));
        list.innerHTML = '';
        normalized.forEach(record => list.appendChild(createWorkspaceHistoryButton(workspace, record)));
        state.historyRecords = normalized;
        state.historyVersion = normalized.reduce((max, record) => {
            const match = String(record.version || '').match(/v(\d+)/i);
            return Math.max(max, match ? Number(match[1]) : 1);
        }, 1);
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
        const normalized = {
            version: versionLabel,
            title: record.title || 'Workspace change',
            category: record.category || 'Local',
            prompt: record.prompt || '',
            summary: record.summary || '',
            trustLevel: record.trustLevel || 'local_draft',
            createdAt: record.createdAt || new Date().toISOString()
        };
        state.historyRecords = [normalized, ...(state.historyRecords || []).filter(item => item.version !== normalized.version)];
        const button = createWorkspaceHistoryButton(workspace, normalized);
        list.prepend(button);
        scheduleWorkspaceSnapshotSave(workspace, workspace.__plan || workspace.__generationPlan, 'history');
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
            `<span aria-hidden="true">${options.state === 'done' ? 'OK' : '...'}</span>`,
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

    function updateNumericApplyBar(workspace) {
        if (!workspace) return;
        const state = getWorkspaceState(workspace);
        const dirtyEntries = Object.entries(state.dirtyNumericValues || {}).filter(([itemId, value]) => {
            const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
            return setting && Number.isFinite(Number(value));
        });
        const count = dirtyEntries.length;
        const title = workspace.querySelector('[data-numeric-apply-title]');
        const summary = workspace.querySelector('[data-numeric-apply-summary]');
        const applyButton = workspace.querySelector('[data-numeric-apply-all]');
        if (title) title.textContent = count ? `${count} draft change${count > 1 ? 's' : ''}` : 'No numeric changes';
        if (summary) {
            summary.textContent = count
                ? dirtyEntries.slice(0, 2).map(([itemId, value]) => {
                    const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
                    return `${setting.label}: ${setting.format(value)}`;
                }).join(' · ') + (count > 2 ? ` · +${count - 2} more` : '')
                : 'Move sliders or choose presets, then apply once.';
        }
        if (applyButton) {
            applyButton.disabled = !count;
            applyButton.classList.toggle('disabled', !count);
            applyButton.textContent = count ? 'Apply changes' : 'No changes';
        }
    }

    function previewWorkspaceNumericValue(workspace, itemId, value) {
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!setting) return;
        const state = getWorkspaceState(workspace);
        const safeValue = clampWorkspaceNumber(value, setting.min, setting.max);
        state.selectedNumericItemId = itemId;
        state.draftNumericValues[itemId] = safeValue;
        const committedValue = workspaceCommittedNumericValue(workspace, itemId);
        if (Math.abs(Number(committedValue) - safeValue) < 0.000001) {
            delete state.draftNumericValues[itemId];
            delete state.dirtyNumericValues[itemId];
            delete state.numericDraftBaseValues[itemId];
        } else {
            if (!Number.isFinite(Number(state.numericDraftBaseValues[itemId]))) {
                state.numericDraftBaseValues[itemId] = committedValue;
            }
            state.dirtyNumericValues[itemId] = safeValue;
        }
        updateNumericControlDisplay(workspace, itemId, safeValue);
        workspace.querySelectorAll('[data-numeric-control]').forEach(card => {
            card.classList.toggle('selected', card.dataset.numericControl === itemId);
        });
        const runtime = findWorkspaceRuntime(workspace);
        const edit = { itemId, value: safeValue, runtimeKey: setting.runtimeKey, source: 'direct-control' };
        if (runtime && runtime.canDirectApply && runtime.applyEdit) {
            runtime.applyEdit(edit);
        }
        updateNumericApplyBar(workspace);
        scheduleWorkspaceSnapshotSave(workspace, workspace.__plan || workspace.__generationPlan, 'numeric_draft');
    }

    function commitWorkspaceNumericChanges(workspace) {
        const state = getWorkspaceState(workspace);
        const dirtyEntries = Object.entries(state.dirtyNumericValues || {}).filter(([itemId, value]) => {
            const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
            return setting && Number.isFinite(Number(value));
        });
        if (!dirtyEntries.length) {
            updateNumericApplyBar(workspace);
            return;
        }
        const runtime = findWorkspaceRuntime(workspace);
        const summaries = [];
        dirtyEntries.forEach(([itemId, value]) => {
            const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
            const safeValue = clampWorkspaceNumber(value, setting.min, setting.max);
            const previousValue = Number.isFinite(Number(state.numericDraftBaseValues && state.numericDraftBaseValues[itemId]))
                ? Number(state.numericDraftBaseValues[itemId])
                : workspaceCommittedNumericValue(workspace, itemId);
            state.numericValues[itemId] = safeValue;
            if (!state.committedNumericValues) state.committedNumericValues = {};
            state.committedNumericValues[itemId] = safeValue;
            state.draftNumericValues[itemId] = safeValue;
            delete state.numericDraftBaseValues[itemId];
            const edit = { itemId, value: safeValue, runtimeKey: setting.runtimeKey, source: 'direct-control-apply' };
            if (runtime && runtime.canDirectApply && runtime.applyEdit) {
                runtime.applyEdit(edit);
            } else {
                const existing = state.pendingRuntimePatches.find(patch => patch.type === 'numeric' && patch.itemId === itemId);
                const patch = {
                    type: 'numeric',
                    itemId,
                    runtimeKey: setting.runtimeKey,
                    value: safeValue,
                    reason: 'Committed numeric change; re-run preview to apply if the runtime cannot update live.'
                };
                if (existing) Object.assign(existing, patch);
                else state.pendingRuntimePatches.push(patch);
            }
            updateNumericControlDisplay(workspace, itemId, safeValue);
            summaries.push(`${setting.label} ${setting.format(previousValue)} -> ${setting.format(safeValue)}`);
        });
        state.dirtyNumericValues = {};
        const runtimeSummary = runtime && runtime.canDirectApply && runtime.applyEdit
            ? 'Applied to the current preview.'
            : 'Recorded. Re-run preview to apply.';
        const summary = `Applied ${summaries.length} numeric change${summaries.length > 1 ? 's' : ''}: ${summaries.join(', ')}. ${runtimeSummary}`;
        addWorkspaceHistoryRecord(workspace, {
            title: 'Numeric tuning',
            category: 'Numeric tuning',
            prompt: 'Apply numeric changes',
            summary
        });
        addPreviewChatRecord(workspace, {
            title: 'Numeric tuning',
            prompt: 'Apply numeric changes',
            summary
        });
        updateNumericApplyBar(workspace);
        scheduleWorkspaceSnapshotSave(workspace, workspace.__plan || workspace.__generationPlan, 'numeric_apply');
    }

    function applyWorkspaceNumericValue(workspace, itemId, value, options = {}) {
        previewWorkspaceNumericValue(workspace, itemId, value);
        if (options.commit) commitWorkspaceNumericChanges(workspace);
    }

    function resetWorkspaceNumericDraft(workspace, itemId) {
        const setting = WORKSPACE_NUMERIC_SETTINGS[itemId];
        if (!workspace || !setting) return;
        const state = getWorkspaceState(workspace);
        const baseValue = Number.isFinite(Number(state.numericDraftBaseValues && state.numericDraftBaseValues[itemId]))
            ? Number(state.numericDraftBaseValues[itemId])
            : workspaceCommittedNumericValue(workspace, itemId);
        const safeValue = clampWorkspaceNumber(baseValue, setting.min, setting.max);
        state.selectedNumericItemId = itemId;
        delete state.draftNumericValues[itemId];
        delete state.dirtyNumericValues[itemId];
        delete state.numericDraftBaseValues[itemId];
        updateNumericControlDisplay(workspace, itemId, safeValue);
        workspace.querySelectorAll('[data-numeric-control]').forEach(card => {
            card.classList.toggle('selected', card.dataset.numericControl === itemId);
        });
        const runtime = findWorkspaceRuntime(workspace);
        if (runtime && runtime.canDirectApply && runtime.applyEdit) {
            runtime.applyEdit({ itemId, value: safeValue, runtimeKey: setting.runtimeKey, source: 'direct-control-reset' });
        }
        updateNumericApplyBar(workspace);
        scheduleWorkspaceSnapshotSave(workspace, workspace.__plan || workspace.__generationPlan, 'numeric_reset');
    }

    function bindWorkspaceNumericControls(workspace) {
        Object.keys(WORKSPACE_NUMERIC_SETTINGS).forEach(itemId => ensureWorkspaceCommittedNumericValue(workspace, itemId));
        Object.keys(WORKSPACE_NUMERIC_SETTINGS).forEach(itemId => updateNumericControlDisplay(workspace, itemId, workspaceNumericValue(workspace, itemId)));
        updateNumericApplyBar(workspace);
        workspace.querySelectorAll('[data-numeric-control]').forEach(card => {
            card.addEventListener('click', () => {
                const itemId = card.dataset.numericControl;
                if (!WORKSPACE_NUMERIC_SETTINGS[itemId]) return;
                getWorkspaceState(workspace).selectedNumericItemId = itemId;
                workspace.querySelectorAll('[data-numeric-control]').forEach(candidate => {
                    candidate.classList.toggle('selected', candidate.dataset.numericControl === itemId);
                });
                scheduleWorkspaceSnapshotSave(workspace, workspace.__plan || workspace.__generationPlan, 'numeric_select');
            });
        });
        workspace.querySelectorAll('[data-numeric-range], [data-numeric-number]').forEach(input => {
            const itemId = input.dataset.numericRange || input.dataset.numericNumber;
            input.addEventListener('input', () => previewWorkspaceNumericValue(workspace, itemId, input.value));
            input.addEventListener('change', () => previewWorkspaceNumericValue(workspace, itemId, input.value));
        });
        workspace.querySelectorAll('[data-numeric-apply-all]').forEach(button => {
            button.addEventListener('click', () => {
                commitWorkspaceNumericChanges(workspace);
            });
        });
        workspace.querySelectorAll('[data-numeric-reset-selected]').forEach(button => {
            button.addEventListener('click', () => {
                const state = getWorkspaceState(workspace);
                const itemId = state.selectedNumericItemId || 'combat.enemySpeed';
                resetWorkspaceNumericDraft(workspace, itemId);
            });
        });
        workspace.querySelectorAll('[data-numeric-preset]').forEach(button => {
            button.addEventListener('click', () => {
                previewWorkspaceNumericValue(workspace, button.dataset.numericPreset, button.dataset.presetValue);
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
                scheduleWorkspaceSnapshotSave(workspace, plan, 'media_category');
                render();
            });
        });
        workspace.querySelectorAll('[data-media-back]').forEach(button => {
            button.addEventListener('click', () => {
                state.selectedMediaKey = '';
                scheduleWorkspaceSnapshotSave(workspace, plan, 'media_back');
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
                scheduleWorkspaceSnapshotSave(workspace, plan, 'media_select');
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
                scheduleWorkspaceSnapshotSave(workspace, plan, 'media_replace');
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
        let selectedPath = getWorkspaceState(workspace).codeSelectedPath || (files.find(file => file.text) || files[0] || {}).path || '';
        const renderTitlebar = (root, file = null, folderPath = '') => {
            const titlebar = root.querySelector('[data-code-titlebar]');
            if (!titlebar) return;
            if (file) {
                const kind = workspaceFileKind(file.path, file);
                titlebar.innerHTML = `
                    <span class="generated-file-icon code-file-icon ${escapeHtml(kind)}">${escapeHtml(workspaceFileBadge(file.path))}</span>
                    <strong>${escapeHtml(file.path)}</strong>
                    <small>${escapeHtml(file.language || fileExtension(file.path) || kind)}</small>
                `;
                return;
            }
            titlebar.innerHTML = `
                <span class="generated-file-icon code-file-icon folder">DIR</span>
                <strong>${escapeHtml(folderPath || 'Generated project')}</strong>
                <small>folder</small>
            `;
        };
        const updateSummary = (root, label) => {
            const summary = root.querySelector('[data-code-summary]');
            if (summary) summary.innerHTML = `<strong>${files.length} files</strong><small>${escapeHtml(label)}</small>`;
        };
        const markActiveNode = (root, path, type = 'file') => {
            root.querySelectorAll('[data-code-file]').forEach(button => button.classList.toggle('active', type === 'file' && button.dataset.codeFile === path));
            root.querySelectorAll('[data-code-folder-summary]').forEach(summary => summary.classList.toggle('active', type === 'folder' && summary.dataset.codeFolderSummary === path));
        };
        const renderFile = (root, path) => {
            const file = findFile(path);
            const preview = root.querySelector('[data-code-preview]');
            selectedPath = file ? file.path : selectedPath;
            const state = getWorkspaceState(workspace);
            state.codeSelectedPath = selectedPath;
            state.codeSelectedFolder = '';
            markActiveNode(root, file ? file.path : '', 'file');
            updateSummary(root, file ? file.path : 'File not found');
            renderTitlebar(root, file);
            if (preview) preview.innerHTML = renderCodePreviewContent(file);
            scheduleWorkspaceSnapshotSave(workspace, plan, 'code_file');
        };
        const renderFolder = (root, folderPath = '') => {
            const preview = root.querySelector('[data-code-preview]');
            const state = getWorkspaceState(workspace);
            state.codeSelectedPath = '';
            state.codeSelectedFolder = folderPath;
            markActiveNode(root, folderPath, 'folder');
            updateSummary(root, folderPath || 'Generated project');
            renderTitlebar(root, null, folderPath);
            if (preview) preview.innerHTML = renderCodePreviewContent(null, folderPath);
            scheduleWorkspaceSnapshotSave(workspace, plan, 'code_folder');
        };
        const refreshTree = root => {
            const search = String(root.querySelector('[data-code-search]')?.value || '').toLowerCase();
            const filter = root.querySelector('[data-code-filter]')?.value || 'all';
            const fileList = root.querySelector('[data-code-file-list]');
            if (fileList) fileList.innerHTML = renderCodeTreeHtml(files, selectedPath, search, filter);
        };
        const bindCodeRoot = root => {
            if (!root || root.__codeTreeBound) return;
            root.__codeTreeBound = true;
            root.addEventListener('click', event => {
                const fileButton = event.target.closest('[data-code-file]');
                if (fileButton && root.contains(fileButton)) {
                    renderFile(root, fileButton.dataset.codeFile);
                    return;
                }
                const folderSummary = event.target.closest('[data-code-folder-summary]');
                if (folderSummary && root.contains(folderSummary)) {
                    renderFolder(root, folderSummary.dataset.codeFolderSummary || '');
                }
            });
            root.querySelectorAll('[data-code-search], [data-code-filter]').forEach(control => {
                control.addEventListener('input', () => refreshTree(root));
                control.addEventListener('change', () => refreshTree(root));
            });
        };
        bindCodeRoot(workspace);
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
                bindCodeRoot(modal);
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
                { side: 'history', label: 'History', panel: historySidebar, originalToggle: historyToggle },
                { side: 'edit', label: 'Tools', panel: editSidebar, originalToggle: editToggle }
            ].filter(control => control.panel)
            : [];
        mobileDrawerControls.forEach(control => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `mobile-workspace-drawer-toggle mobile-workspace-drawer-toggle-${control.side}`;
            button.dataset.mobileWorkspaceDrawer = control.side;
            button.setAttribute('aria-label', control.label);
            button.setAttribute('aria-expanded', 'false');
            button.innerHTML = `<span class="mobile-drawer-label">${escapeHtml(control.label)}</span>`;
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
        const mobileViewSwitch = null;
        const compactViewSwitch = workspace.classList.contains('generated-game-page')
            ? document.createElement('div')
            : null;
        if (compactViewSwitch) {
            compactViewSwitch.className = 'compact-workspace-view-switch';
            compactViewSwitch.setAttribute('aria-label', 'Workspace view');
            compactViewSwitch.innerHTML = `
                <button type="button" data-generated-view-set="chat" data-compact-generated-view-set="chat" aria-pressed="false">Chat</button>
                <button type="button" data-generated-view-set="preview" data-compact-generated-view-set="preview" aria-pressed="true">Preview</button>
            `;
            document.body.appendChild(compactViewSwitch);
        }

        function syncCompactViewSwitch(view = workspace.dataset.generatedView || 'preview') {
            if (!compactViewSwitch) return;
            compactViewSwitch.querySelectorAll('[data-compact-generated-view-set]').forEach(button => {
                const active = button.dataset.compactGeneratedViewSet === view;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        }

        function stabilizeCompactGeneratedView(view) {
            const compactMedia = window.matchMedia
                ? window.matchMedia('(max-width: 1180px), (hover: none) and (pointer: coarse) and (max-width: 1366px)')
                : null;
            if (compactMedia && !compactMedia.matches) return;
            const apply = () => {
                if (view === 'preview') {
                    window.scrollTo(0, 0);
                    const chatScroller = document.querySelector('.chat-history');
                    if (chatScroller) chatScroller.scrollTop = 0;
                    workspace.scrollTop = 0;
                } else {
                    scrollPreviewChatToLatest(workspace, 'auto');
                }
            };
            apply();
            window.setTimeout(apply, 80);
        }

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
            if (compactViewSwitch && compactViewSwitch.parentElement) compactViewSwitch.remove();
            document.body.classList.remove('game-edit-workspace-active');
        });
        const context = workspace.querySelector('[data-workspace-edit-context]');
        const editRoot = workspace.__editSidebar || workspace;
        const modeLabel = workspace.querySelector('[data-workspace-mode-label]');
        workspace.__container = container;
        workspace.__plan = plan;
        workspace.__generationPlan = plan;
        const state = getWorkspaceState(workspace);
        ensureWorkspaceIdentity(workspace, plan);
        state.__workspace = workspace;
        if (!state.historyRecords.length) state.historyRecords = collectWorkspaceHistoryRecords(workspace);
        let selectedItem = null;

        function syncWorkspaceModeButtons(activeMode) {
            const buttons = new Set([
                ...workspace.querySelectorAll('[data-workspace-mode-set]'),
                ...editRoot.querySelectorAll('[data-workspace-mode-set]')
            ]);
            buttons.forEach(button => {
                const active = button.dataset.workspaceModeSet === activeMode;
                button.classList.toggle('active', active);
                button.classList.toggle('is-muted', !active);
                button.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        }

        function setWorkspaceMode(mode) {
            const compactWorkspace = window.matchMedia ? window.matchMedia('(max-width: 1023px)').matches : false;
            if (mode === 'advanced' && compactWorkspace) {
                const warning = workspace.querySelector('[data-compact-mode-warning]');
                if (warning) {
                    warning.classList.add('show');
                    warning.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                syncWorkspaceModeButtons('beginner');
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
            if (modeLabel) modeLabel.textContent = nextMode === 'advanced' ? 'Advanced mode' : 'Beginner mode';
            syncWorkspaceModeButtons(nextMode);
            editRoot.querySelectorAll('[data-edit-module-tab]').forEach(tab => {
                const locked = nextMode !== 'advanced' && tab.dataset.editModuleTab !== 'stats';
                tab.classList.toggle('is-locked', locked);
                tab.setAttribute('aria-disabled', locked ? 'true' : 'false');
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
            scheduleWorkspaceSnapshotSave(workspace, plan, 'workspace_mode');
        }

        workspace.querySelectorAll('[data-workspace-mode-set]').forEach(button => {
            button.addEventListener('click', () => setWorkspaceMode(button.dataset.workspaceModeSet));
        });
        setWorkspaceMode('beginner');

        if (historySidebar) {
            historySidebar.addEventListener('click', event => {
                const record = event.target && event.target.closest ? event.target.closest('[data-history-prompt]') : null;
                if (!record) return;
                const prompt = record.dataset.historyPrompt || '';
                if (!prompt || !chatInputField) return;
                setChatInputValue(prompt, { focus: true, cursorToEnd: true, dispatch: true });
                setGeneratedView('chat');
            });
        }

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

        function setGeneratedView(view) {
            const nextView = view === 'preview' ? 'preview' : 'chat';
            workspace.dataset.generatedView = nextView;
            state.generatedView = nextView;
            const shell = workspace.querySelector('.playable-shell');
            if (shell) shell.classList.toggle('preview-open', nextView === 'preview');
            workspace.querySelectorAll('[data-generated-view-set]').forEach(button => {
                const active = button.dataset.generatedViewSet === nextView;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            const toggle = workspace.querySelector('[data-game-action="mobile-preview-toggle"]');
            if (toggle) {
                toggle.textContent = nextView === 'preview' ? 'Close game preview' : 'Open game preview';
                toggle.setAttribute('aria-expanded', nextView === 'preview' ? 'true' : 'false');
            }
            syncCompactViewSwitch(nextView);
            stabilizeCompactGeneratedView(nextView);
            if (nextView === 'chat') scrollPreviewChatToLatest(workspace, 'smooth');
            scheduleWorkspaceSnapshotSave(workspace, plan, 'generated_view');
        }

        workspace.querySelectorAll('[data-generated-view-set]').forEach(button => {
            button.addEventListener('click', () => {
                mobileDrawerControls.forEach(control => setWorkspaceDrawerOpen(control, false));
                workspace.__userChangedGeneratedView = true;
                setGeneratedView(button.dataset.generatedViewSet);
            });
        });
        if (compactViewSwitch) {
            compactViewSwitch.querySelectorAll('[data-compact-generated-view-set]').forEach(button => {
                button.addEventListener('click', () => {
                    mobileDrawerControls.forEach(control => setWorkspaceDrawerOpen(control, false));
                    workspace.__userChangedGeneratedView = true;
                    setGeneratedView(button.dataset.compactGeneratedViewSet);
                });
            });
            syncCompactViewSwitch(workspace.dataset.generatedView || 'preview');
        }

        workspace.querySelectorAll('[data-workspace-prompt]').forEach(button => {
            button.addEventListener('click', () => {
                const prompt = button.dataset.workspacePrompt || '';
                if (prompt && chatInputField) {
                    setChatInputValue(prompt, { focus: true, cursorToEnd: true, dispatch: true });
                }
                setGeneratedView('chat');
            });
        });

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
            if (WORKSPACE_NUMERIC_SETTINGS[itemId]) {
                getWorkspaceState(workspace).selectedNumericItemId = itemId;
            }
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
            scheduleWorkspaceSnapshotSave(workspace, plan, 'selected_item');
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
            const animalIslandTheme = isAnimalIslandPrompt(prompt) ? buildAnimalIslandVisualTheme(prompt) : null;
            if (animalIslandTheme && selectedItem.type === 'image') {
                edit.visualTheme = animalIslandTheme;
            }
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
                edit.assetUrl = createWorkspaceAssetDataUrl(prompt, 'Player', animalIslandTheme);
                summary = animalIslandTheme
                    ? 'Player art and the generated project theme were replaced with the cozy animal-island style.'
                    : 'Player image preview updated in the canvas runtime.';
            } else if (selectedItem.type === 'image') {
                edit.assetUrl = createWorkspaceAssetDataUrl(prompt, selectedItem.title, animalIslandTheme);
                const patchType = animalIslandTheme ? 'visual-replacement' : 'visual-prompt';
                const existing = editState.pendingRuntimePatches.find(patch => patch.type === patchType && patch.itemId === selectedItem.id);
                const patch = {
                    type: patchType,
                    itemId: selectedItem.id,
                    category: selectedItem.categoryLabel,
                    title: selectedItem.title,
                    prompt,
                    visualTheme: animalIslandTheme ? animalIslandTheme.id : undefined,
                    reason: animalIslandTheme
                        ? 'Animal-island visual replacement applied to runtime preview and generated project files.'
                        : 'Visual prompt recorded in the workspace; re-run preview/export patches to apply it to generated assets.'
                };
                if (existing) Object.assign(existing, patch);
                else editState.pendingRuntimePatches.push(patch);
                summary = animalIslandTheme
                    ? `${selectedItem.categoryLabel} / ${selectedItem.title} replaced with a cozy animal-island visual theme while keeping gameplay locked.`
                    : `${selectedItem.categoryLabel} / ${selectedItem.title} art style request recorded. I kept the base gameplay locked and queued this as a visual patch for this generated game.`;
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
            const updatedFiles = filePatch ? (filePatch.updatedFiles || [
                'assets/manifest.json',
                'spec/game.json',
                'spec/generated-game-spec.json',
                'generation-report.json',
                'workspace-edits/latest-edit.json',
                'workspace-edits/latest-edit.md'
            ]) : [];
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
            scheduleWorkspaceSnapshotSave(workspace, plan, 'workspace_prompt');
            return true;
        }

        function showWorkspaceAdvancedHint(moduleId) {
            const hint = editRoot.querySelector('[data-advanced-lock-hint]');
            const labelMap = { media: 'Media assets', code: 'Code files', tools: 'Local tools' };
            const label = labelMap[moduleId] || 'This tool';
            if (hint) {
                hint.hidden = false;
                hint.textContent = `${label} are available in Advanced mode. Switch to Advanced to inspect assets, files, and local tools.`;
                window.clearTimeout(hint.__hideTimer);
                hint.__hideTimer = window.setTimeout(() => {
                    hint.hidden = true;
                }, 3600);
            }
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

        function setActiveEditModule(moduleId, options = {}) {
            const currentMode = getWorkspaceState(workspace).mode || workspace.dataset.workspaceMode || 'beginner';
            if (!options.force && currentMode !== 'advanced' && moduleId !== 'stats') {
                showWorkspaceAdvancedHint(moduleId);
                return false;
            }
            editRoot.querySelectorAll('[data-edit-module-tab]').forEach(tab => {
                tab.classList.toggle('active', tab.dataset.editModuleTab === moduleId);
            });
            editRoot.querySelectorAll('[data-edit-module]').forEach(panel => {
                panel.classList.toggle('active', panel.dataset.editModule === moduleId);
            });
            state.activeToolTab = moduleId;
            if (!options.skipSelect) {
                const firstItem = editRoot.querySelector(`[data-edit-module="${moduleId}"] [data-edit-item]`);
                if (firstItem) selectItem(firstItem.dataset.editItem);
            }
            if (!options.silent) scheduleWorkspaceSnapshotSave(workspace, plan, 'tool_tab');
            return true;
        }

        editRoot.querySelectorAll('[data-edit-module-tab]').forEach(button => {
            button.addEventListener('click', () => {
                setActiveEditModule(button.dataset.editModuleTab);
            });
        });

        editRoot.querySelectorAll('[data-droi-tool-open]').forEach(button => {
            button.addEventListener('click', () => {
                openDroiGameToolOverlay(workspace, plan, button.dataset.droiToolOpen);
            });
        });

        workspace.querySelectorAll('[data-workspace-save]').forEach(saveButton => {
            saveButton.addEventListener('click', () => saveWorkspaceZip(workspace, plan));
        });

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

        async function restoreLocalWorkspaceSnapshot() {
            const snapshot = await loadWorkspaceSnapshot(workspace, plan);
            if (!snapshot || !workspace.isConnected) return false;
            mergeWorkspaceSnapshotIntoState(workspace, snapshot);
            const restoredState = getWorkspaceState(workspace);
            const ui = snapshot.uiState || {};
            if (Array.isArray(snapshot.history) && snapshot.history.length) {
                replaceWorkspaceHistoryRecords(workspace, snapshot.history);
            }
            Object.keys(WORKSPACE_NUMERIC_SETTINGS).forEach(itemId => {
                ensureWorkspaceCommittedNumericValue(workspace, itemId);
                updateNumericControlDisplay(workspace, itemId, workspaceNumericValue(workspace, itemId));
            });
            updateNumericApplyBar(workspace);
            if (ui.workspaceMode) setWorkspaceMode(ui.workspaceMode);
            if (ui.activeToolTab) setActiveEditModule(ui.activeToolTab, { force: ui.workspaceMode === 'advanced', skipSelect: true, silent: true });
            if (restoredState.selectedMediaKey) {
                const mediaPanel = workspace.querySelector('[data-edit-module="media"]');
                if (mediaPanel) {
                    mediaPanel.innerHTML = buildWorkspaceMediaPanelHtml(plan && plan.generatedProject, restoredState);
                    bindWorkspaceMediaControls(workspace, plan);
                }
            }
            if (restoredState.codeSelectedPath || restoredState.codeSelectedFolder) {
                refreshWorkspaceCodePanel(workspace, plan);
            }
            if (ui.selectedItemId) {
                selectItem(ui.selectedItemId);
            } else if (restoredState.selectedNumericItemId) {
                selectItem(restoredState.selectedNumericItemId);
            }
            if (ui.generatedView) setGeneratedView(ui.generatedView);
            if (snapshot.draft && typeof snapshot.draft.chatInput === 'string' && snapshot.draft.chatInput) {
                setChatInputValue(snapshot.draft.chatInput, { dispatch: true, cursorToEnd: true });
            } else {
                updateChatCount();
            }
            if (snapshot.draft && snapshot.draft.placeholder && chatInputField && !chatInputField.placeholder.includes('Describe how to edit')) {
                chatInputField.placeholder = snapshot.draft.placeholder;
            }
            return true;
        }

        setNeutralEditContext();
        scrollPreviewChatToLatest(workspace);
        const workspaceParams = new URLSearchParams(window.location.search);
        const workspaceDemoEnabled = isWorkspaceDemoModeEnabled(workspaceParams);
        const forcePreviewOnLoad = workspaceDemoEnabled && workspaceParams.get('demo') === 'edit-workspace';
        const workspaceTestEditPrompt = workspaceDemoEnabled ? workspaceParams.get('testWorkspaceEditPrompt') : '';
        restoreLocalWorkspaceSnapshot().then(() => {
            if (forcePreviewOnLoad && !workspace.__userChangedGeneratedView) setGeneratedView('preview');
            scrollPreviewChatToLatest(workspace);
            if (workspaceTestEditPrompt && !workspace.__testWorkspaceEditApplied) {
                workspace.__testWorkspaceEditApplied = true;
                regTimeout(() => {
                    applyWorkspacePrompt(workspaceTestEditPrompt);
                    scrollPreviewChatToLatest(workspace, 'auto');
                }, 250);
            }
        });
    }

    function inlineScriptJson(value) {
        return JSON.stringify(value == null ? null : value).replace(/</g, '\\u003c');
    }

    function buildStandalonePlayableHtml(plan, runtimeConfig = {}) {
        const spec = plan && plan.generatedSpec ? plan.generatedSpec : buildGeneratedGameSpec();
        const title = spec && spec.meta && spec.meta.gameName ? spec.meta.gameName : 'Generated Canvas Game';
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - Play</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; background: #060913; color: #f8fafc; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { display: grid; place-items: center; padding: 24px; overflow: hidden; }
    .page { width: min(1120px, 100%); display: grid; gap: 14px; }
    header { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
    h1 { margin: 0; font-size: clamp(22px, 4vw, 38px); letter-spacing: 0; }
    p { margin: 6px 0 0; color: rgba(203, 213, 225, 0.72); font-size: 14px; }
    .actions { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
    button { min-height: 40px; padding: 0 16px; border: 1px solid rgba(94, 231, 255, 0.26); border-radius: 10px; background: rgba(15, 23, 42, 0.86); color: #f8fafc; font: inherit; font-weight: 850; cursor: pointer; }
    button:hover { border-color: rgba(94, 231, 255, 0.62); background: rgba(30, 41, 59, 0.9); }
    .stage { position: relative; border: 1px solid rgba(94, 231, 255, 0.32); border-radius: 16px; overflow: hidden; background: radial-gradient(circle at 50% 0%, rgba(94, 231, 255, 0.12), transparent 36%), #020617; box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42); }
    canvas { display: block; width: 100%; aspect-ratio: 16 / 9; outline: none; }
    .hint { display: flex; justify-content: space-between; gap: 16px; color: rgba(203, 213, 225, 0.68); font-size: 13px; }
    @media (max-width: 720px) {
      body { padding: 12px; }
      header, .hint { display: grid; }
      .actions { justify-content: stretch; }
      button { width: 100%; }
    }
  </style>
</head>
<body>
  <main class="page">
    <header>
      <div>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(spec && spec.meta ? spec.meta.description || 'Playable generated preview.' : 'Playable generated preview.')}</p>
      </div>
      <div class="actions">
        <button type="button" id="restartBtn">Restart</button>
        <button type="button" id="pauseBtn">Pause</button>
      </div>
    </header>
    <section class="stage">
      <canvas id="game" width="960" height="540" tabindex="0" aria-label="${escapeHtml(title)} playable canvas"></canvas>
    </section>
    <div class="hint">
      <span>Move with WASD or Arrow keys. Space/Z fires. X clears bullets when bombs are available.</span>
      <span id="statusText">Click the canvas to focus.</span>
    </div>
  </main>
  <script>
    const SPEC = ${inlineScriptJson(spec)};
    const CONFIG = ${inlineScriptJson(runtimeConfig || {})};
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const restartBtn = document.getElementById('restartBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const statusText = document.getElementById('statusText');
    const meta = SPEC.meta || {};
    const content = SPEC.content || {};
    const enemiesSpec = content.enemies || {};
    const enemyConfig = Object.values(enemiesSpec).find(enemy => !(enemy.flags || []).includes('boss')) || {};
    const bossConfig = Object.values(enemiesSpec).find(enemy => (enemy.flags || []).includes('boss')) || {};
    const projectileConfig = content.projectiles || {};
    const palette = projectileConfig.colors || ['#5ee7ff', '#f093fb', '#f8d878', '#88f3d2'];
    const playerStats = (((SPEC.player || {}).components || {}).stats) || {};
    const isBulletHell = /bullet|shooter/i.test(meta.gameType || '');
    const keys = new Set();
    const config = {
      fireRate: Number.isFinite(Number(CONFIG.fireRate)) ? Number(CONFIG.fireRate) : (isBulletHell ? 0.22 : 0.55),
      damage: Number.isFinite(Number(CONFIG.damage)) ? Number(CONFIG.damage) : 18,
      range: Number.isFinite(Number(CONFIG.range)) ? Number(CONFIG.range) : 420,
      enemySpeedMultiplier: Number.isFinite(Number(CONFIG.enemySpeedMultiplier)) ? Number(CONFIG.enemySpeedMultiplier) : 1,
      enemyHpMultiplier: Number.isFinite(Number(CONFIG.enemyHpMultiplier)) ? Number(CONFIG.enemyHpMultiplier) : 1,
      waveMultiplier: Number.isFinite(Number(CONFIG.waveMultiplier)) ? Number(CONFIG.waveMultiplier) : 1
    };
    const visualTheme = CONFIG.visualTheme || {};
    const themeColors = visualTheme.colors || {};
    const player = { x: canvas.width / 2, y: canvas.height * 0.72, r: 14, hp: Number(playerStats.maxHp) || 120, speed: Number(playerStats.speed) || 220 };
    const state = { time: 0, score: 0, level: 1, bombs: isBulletHell ? 2 : 0, over: false, won: false, paused: false, awaitingStart: true, enemies: [], bullets: [], enemyBullets: [], boss: null, bossSpawned: false, spawnTimer: 0, fireTimer: 0, enemyShotTimer: 0, bossShotTimer: 0 };
    let last = performance.now();

    function reset() {
      player.x = canvas.width / 2;
      player.y = canvas.height * 0.72;
      player.hp = Number(playerStats.maxHp) || 120;
      Object.assign(state, { time: 0, score: 0, level: 1, bombs: isBulletHell ? 2 : 0, over: false, won: false, paused: false, awaitingStart: true, enemies: [], bullets: [], enemyBullets: [], boss: null, bossSpawned: false, spawnTimer: 0, fireTimer: 0, enemyShotTimer: 0, bossShotTimer: 0 });
      pauseBtn.textContent = 'Start';
      statusText.textContent = 'Ready';
      canvas.focus();
    }

    function startGame() {
      if (!state.awaitingStart) return false;
      state.awaitingStart = false;
      state.paused = false;
      last = performance.now();
      pauseBtn.textContent = 'Pause';
      statusText.textContent = 'Running';
      canvas.focus();
      return true;
    }

    function spawnEnemy() {
      const side = Math.floor(Math.random() * 4);
      const points = [
        { x: -24, y: Math.random() * canvas.height },
        { x: canvas.width + 24, y: Math.random() * canvas.height },
        { x: Math.random() * canvas.width, y: -24 },
        { x: Math.random() * canvas.width, y: canvas.height + 24 }
      ];
      const p = points[side];
      state.enemies.push({
        x: p.x,
        y: p.y,
        r: 12,
        hp: (Number(enemyConfig.hp) || 28) * config.enemyHpMultiplier,
        speed: (Number(enemyConfig.speed) || 76) * config.enemySpeedMultiplier,
        color: palette[state.enemies.length % palette.length]
      });
    }

    function spawnBoss() {
      state.bossSpawned = true;
      state.boss = {
        x: canvas.width / 2,
        y: 96,
        r: 38,
        hp: Number(bossConfig.hp) || 1200,
        maxHp: Number(bossConfig.hp) || 1200,
        name: bossConfig.name || 'Sky Guardian'
      };
    }

    function shoot(x, y, tx, ty, hostile = false, speed = hostile ? 150 : 380, damage = hostile ? 8 : config.damage) {
      const dx = tx - x;
      const dy = ty - y;
      const d = Math.hypot(dx, dy) || 1;
      (hostile ? state.enemyBullets : state.bullets).push({ x, y, vx: dx / d * speed, vy: dy / d * speed, r: hostile ? 5 : 5, life: hostile ? 5 : 2.5, damage, color: hostile ? palette[Math.floor(Math.random() * palette.length)] : '#f8d878' });
    }

    function nearestTarget() {
      let target = state.boss || null;
      let best = target ? Math.hypot(target.x - player.x, target.y - player.y) : config.range;
      for (const enemy of state.enemies) {
        const d = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (d < best) {
          target = enemy;
          best = d;
        }
      }
      return target;
    }

    function update(dt) {
      if (state.awaitingStart || state.paused || state.over) return;
      state.time += dt;
      const mx = (keys.has('ArrowRight') || keys.has('KeyD') ? 1 : 0) - (keys.has('ArrowLeft') || keys.has('KeyA') ? 1 : 0);
      const my = (keys.has('ArrowDown') || keys.has('KeyS') ? 1 : 0) - (keys.has('ArrowUp') || keys.has('KeyW') ? 1 : 0);
      const len = Math.hypot(mx, my) || 1;
      player.x = Math.max(player.r, Math.min(canvas.width - player.r, player.x + mx / len * player.speed * dt));
      player.y = Math.max(player.r, Math.min(canvas.height - player.r, player.y + my / len * player.speed * dt));

      state.spawnTimer -= dt;
      if (state.spawnTimer <= 0) {
        spawnEnemy();
        state.spawnTimer = Math.max(0.25, 0.9 / config.waveMultiplier);
      }
      if (isBulletHell && !state.bossSpawned && (state.time > 24 || state.score >= 18)) spawnBoss();

      state.fireTimer -= dt;
      if (state.fireTimer <= 0 && (keys.has('Space') || keys.has('KeyZ') || isBulletHell)) {
        const target = nearestTarget();
        if (target) shoot(player.x, player.y, target.x, target.y);
        state.fireTimer = config.fireRate;
      }

      state.enemyShotTimer -= dt;
      if (state.enemyShotTimer <= 0) {
        state.enemies.slice(0, 8).forEach(enemy => shoot(enemy.x, enemy.y, player.x, player.y, true));
        state.enemyShotTimer = 1.1;
      }
      if (state.boss) {
        state.bossShotTimer -= dt;
        if (state.bossShotTimer <= 0) {
          for (let i = 0; i < 16; i += 1) {
            const angle = state.time * 1.8 + Math.PI * 2 * i / 16;
            state.enemyBullets.push({ x: state.boss.x, y: state.boss.y, vx: Math.cos(angle) * 150, vy: Math.sin(angle) * 150, r: 5, life: 5, damage: 9, color: palette[i % palette.length] });
          }
          state.bossShotTimer = 0.72;
        }
      }

      for (const enemy of state.enemies) {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const d = Math.hypot(dx, dy) || 1;
        enemy.x += dx / d * enemy.speed * dt;
        enemy.y += dy / d * enemy.speed * dt;
        if (d < enemy.r + player.r) {
          player.hp -= 12;
          enemy.hp = 0;
        }
      }

      [...state.bullets, ...state.enemyBullets].forEach(b => { b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; });
      for (const bullet of state.bullets) {
        for (const enemy of state.enemies) {
          if (enemy.hp > 0 && Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < enemy.r + bullet.r) {
            enemy.hp -= bullet.damage;
            bullet.life = 0;
          }
        }
        if (state.boss && Math.hypot(state.boss.x - bullet.x, state.boss.y - bullet.y) < state.boss.r + bullet.r) {
          state.boss.hp -= bullet.damage;
          bullet.life = 0;
        }
      }
      for (const bullet of state.enemyBullets) {
        if (Math.hypot(player.x - bullet.x, player.y - bullet.y) < player.r + bullet.r) {
          player.hp -= bullet.damage;
          bullet.life = 0;
        }
      }

      const before = state.enemies.length;
      state.enemies = state.enemies.filter(enemy => enemy.hp > 0);
      state.score += before - state.enemies.length;
      state.level = 1 + Math.floor(state.score / 8);
      state.bullets = state.bullets.filter(b => b.life > 0);
      state.enemyBullets = state.enemyBullets.filter(b => b.life > 0);
      if (state.boss && state.boss.hp <= 0) {
        state.boss = null;
        state.over = true;
        state.won = true;
      }
      if (player.hp <= 0) {
        state.over = true;
        state.won = false;
      }
      statusText.textContent = state.paused ? 'Paused' : 'Running';
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (visualTheme.id === 'animal_island') {
        const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grd.addColorStop(0, themeColors.sky || '#9fdff2');
        grd.addColorStop(0.56, '#b7edd8');
        grd.addColorStop(1, themeColors.deepGrass || '#55b86c');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = themeColors.grass || '#8bd47a';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.7);
        ctx.bezierCurveTo(canvas.width * 0.24, canvas.height * 0.6, canvas.width * 0.38, canvas.height * 0.76, canvas.width * 0.56, canvas.height * 0.68);
        ctx.bezierCurveTo(canvas.width * 0.76, canvas.height * 0.58, canvas.width * 0.88, canvas.height * 0.72, canvas.width, canvas.height * 0.62);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      } else {
        const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grd.addColorStop(0, '#101a38');
        grd.addColorStop(1, '#071018');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.strokeStyle = themeColors.grid || 'rgba(148, 163, 184, 0.08)';
      for (let x = 0; x < canvas.width; x += 48) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      ctx.fillStyle = themeColors.player || '#88f3d2';
      ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = themeColors.leaf || 'rgba(136, 243, 210, 0.28)';
      ctx.beginPath(); ctx.arc(player.x, player.y, config.range, 0, Math.PI * 2); ctx.stroke();
      state.enemies.forEach(enemy => { ctx.fillStyle = themeColors.enemy || enemy.color; ctx.beginPath(); ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2); ctx.fill(); });
      if (state.boss) {
        ctx.fillStyle = themeColors.boss || '#8b5cf6';
        ctx.beginPath(); ctx.arc(state.boss.x, state.boss.y, state.boss.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fillRect(state.boss.x - 90, state.boss.y - 56, 180, 6);
        ctx.fillStyle = themeColors.flower || '#f093fb';
        ctx.fillRect(state.boss.x - 90, state.boss.y - 56, 180 * Math.max(0, state.boss.hp / state.boss.maxHp), 6);
      }
      state.bullets.forEach(b => { ctx.fillStyle = themeColors.playerBullet || b.color; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); });
      state.enemyBullets.forEach(b => { ctx.fillStyle = themeColors.enemyBullet || b.color; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = themeColors.hudBg || 'rgba(2, 6, 23, 0.72)';
      ctx.fillRect(16, 16, 290, 84);
      ctx.fillStyle = themeColors.ink || '#f8fafc';
      ctx.font = '16px system-ui, sans-serif';
      ctx.fillText('HP ' + Math.max(0, Math.round(player.hp)) + ' / Score ' + state.score + ' / Lv ' + state.level, 30, 46);
      ctx.fillText('Damage ' + config.damage + ' / Range ' + config.range, 30, 72);
      if (isBulletHell) ctx.fillText('Bombs ' + state.bombs, 30, 92);
      if (state.awaitingStart) {
        ctx.fillStyle = 'rgba(0,0,0,0.42)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = themeColors.cream || '#f8fafc';
        ctx.textAlign = 'center';
        ctx.font = 'bold 46px system-ui, sans-serif';
        ctx.fillText(meta.gameName || 'Start Game', canvas.width / 2, canvas.height / 2 - 30);
        ctx.fillStyle = themeColors.playerBullet || '#facc15';
        ctx.font = 'bold 28px system-ui, sans-serif';
        ctx.fillText('Start Game', canvas.width / 2, canvas.height / 2 + 14);
        ctx.fillStyle = 'rgba(248,250,252,0.82)';
        ctx.font = '16px system-ui, sans-serif';
        ctx.fillText('Click the game or press Space / Enter', canvas.width / 2, canvas.height / 2 + 48);
        ctx.textAlign = 'left';
      }
      if (state.over) {
        ctx.fillStyle = 'rgba(0,0,0,0.66)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = state.won ? '#88f3d2' : '#ff8b8b';
        ctx.textAlign = 'center';
        ctx.font = 'bold 42px system-ui, sans-serif';
        ctx.fillText(state.won ? 'Prototype Cleared' : 'Run Failed', canvas.width / 2, canvas.height / 2);
        ctx.font = '18px system-ui, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText('Press Restart to play again', canvas.width / 2, canvas.height / 2 + 36);
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

    window.addEventListener('keydown', event => {
      keys.add(event.code);
      if (state.awaitingStart && ['Space', 'Enter', 'KeyZ'].includes(event.code)) {
        startGame();
        event.preventDefault();
        return;
      }
      if (event.code === 'KeyX' && state.bombs > 0) {
        state.bombs -= 1;
        state.enemyBullets = [];
        state.enemies.forEach(enemy => { enemy.hp -= 24; });
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) event.preventDefault();
    });
    window.addEventListener('keyup', event => keys.delete(event.code));
    canvas.addEventListener('click', () => { canvas.focus(); startGame(); });
    restartBtn.addEventListener('click', reset);
    pauseBtn.addEventListener('click', () => { if (startGame()) return; state.paused = !state.paused; pauseBtn.textContent = state.paused ? 'Resume' : 'Pause'; canvas.focus(); });
    reset();
    requestAnimationFrame(loop);
  <\/script>
</body>
</html>`;
    }

    function openGeneratedPlayablePage(container, plan, preferredUrl = '') {
        const previewFrame = container && container.querySelector ? container.querySelector('.template-preview-frame') : null;
        const url = preferredUrl || (previewFrame && previewFrame.src) || '';
        const runtime = container && container.__gameEditRuntime;
        const runtimeConfig = runtime && runtime.getConfig ? runtime.getConfig() : {};
        const shouldUsePatchedLocalPlayable = runtimeConfig && runtimeConfig.visualTheme && runtimeConfig.visualTheme.id === 'animal_island';
        if (url && !shouldUsePatchedLocalPlayable) {
            window.open(url, '_blank', 'noopener');
            return;
        }
        const html = buildStandalonePlayableHtml(plan, runtimeConfig);
        const blob = new Blob([html], { type: 'text/html' });
        const blobUrl = URL.createObjectURL(blob);
        const opened = window.open(blobUrl, '_blank');
        if (opened) opened.opener = null;
        window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
        if (!opened) {
            const workspace = container && container.querySelector ? container.querySelector('[data-game-workspace]') : null;
            addWorkspaceSystemNotice(workspace, 'Preview / Play', 'The browser blocked the playable page popup. Allow popups for this local page and try again.', 'Playable page blocked');
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
                    openGeneratedPlayablePage(container, plan, previewButton.dataset.previewUrl || previewFrame.src || '');
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
            let iframeVisualTheme = null;
            const renderIframeThemeOverlay = () => {
                const host = previewFrame.parentElement;
                if (!host) return;
                host.querySelectorAll('.iframe-visual-theme-overlay').forEach(node => node.remove());
                if (!iframeVisualTheme || iframeVisualTheme.id !== 'animal_island') return;
                const colors = iframeVisualTheme.colors || {};
                const overlay = document.createElement('div');
                overlay.className = 'iframe-visual-theme-overlay animal-island-overlay';
                overlay.innerHTML = `
                    <span class="animal-island-overlay-sky"></span>
                    <span class="animal-island-overlay-leaf"></span>
                    <span class="animal-island-overlay-sign">${escapeHtml(iframeVisualTheme.label || 'Animal Island')}</span>
                    <span class="animal-island-overlay-flower flower-a"></span>
                    <span class="animal-island-overlay-flower flower-b"></span>
                `;
                overlay.style.setProperty('--animal-sky', colors.sky || '#9fdff2');
                overlay.style.setProperty('--animal-grass', colors.grass || '#8bd47a');
                overlay.style.setProperty('--animal-wood', colors.wood || '#b9804f');
                overlay.style.setProperty('--animal-cream', colors.cream || '#fff6df');
                overlay.style.setProperty('--animal-leaf', colors.leaf || '#4f9f63');
                overlay.style.setProperty('--animal-flower', colors.flower || '#f58fb0');
                host.appendChild(overlay);
            };
            container.__gameEditRuntime = {
                kind: 'iframe',
                canDirectApply: true,
                applyEdit(edit = {}) {
                    if (edit.visualTheme && edit.visualTheme.id === 'animal_island') {
                        iframeVisualTheme = edit.visualTheme;
                        renderIframeThemeOverlay();
                    }
                },
                getConfig() { return iframeVisualTheme ? { visualTheme: iframeVisualTheme } : {}; },
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
        const state = { time: 0, score: 0, level: 1, power: 1, bombs: isBulletHell ? 2 : 0, over: false, won: false, awaitingStart: true, bossSpawned: false, boss: null, enemies: [], bullets: [], enemyBullets: [], towers: [] };
        const runtimeConfig = {
            fireRate: isBulletHell ? 0.22 : 0.55,
            damage: 18,
            enemySpeedMultiplier: 1,
            enemyHpMultiplier: 1,
            waveMultiplier: 1,
            range: isBulletHell ? 420 : 160,
            targetFps: 60,
            playerImage: null,
            playerImageUrl: '',
            visualTheme: null
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
            state.awaitingStart = true;
            if (pauseBtn) pauseBtn.textContent = 'Start';
            canvas.focus();
        }

        function startGame() {
            if (!state.awaitingStart) return false;
            state.awaitingStart = false;
            paused = false;
            lastTime = performance.now();
            if (pauseBtn) pauseBtn.textContent = 'Pause';
            canvas.focus();
            return true;
        }

        function setPaused(nextPaused) {
            if (state.awaitingStart) {
                paused = false;
                if (pauseBtn) pauseBtn.textContent = 'Start';
                return;
            }
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
            if (state.awaitingStart || paused || state.over) return;
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
            const visualTheme = runtimeConfig.visualTheme || {};
            const themeColors = visualTheme.colors || {};
            if (visualTheme.id === 'animal_island') {
                const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
                sky.addColorStop(0, themeColors.sky || '#9fdff2');
                sky.addColorStop(0.52, '#b7edd8');
                sky.addColorStop(1, themeColors.deepGrass || '#55b86c');
                ctx.fillStyle = sky;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = themeColors.grass || '#8bd47a';
                ctx.beginPath();
                ctx.moveTo(0, canvas.height * 0.7);
                ctx.bezierCurveTo(canvas.width * 0.25, canvas.height * 0.6, canvas.width * 0.38, canvas.height * 0.76, canvas.width * 0.55, canvas.height * 0.68);
                ctx.bezierCurveTo(canvas.width * 0.75, canvas.height * 0.58, canvas.width * 0.88, canvas.height * 0.72, canvas.width, canvas.height * 0.62);
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fill();
            } else {
                ctx.fillStyle = '#071018';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.strokeStyle = themeColors.grid || 'rgba(120,185,255,0.08)';
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
                    ctx.fillStyle = themeColors.player || '#88f3d2';
                    ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2); ctx.fill();
                }
            }

            state.enemies.forEach(enemy => {
                ctx.fillStyle = themeColors.enemy || (isBulletHell ? '#42a5ff' : '#ff6b6b');
                ctx.beginPath(); ctx.arc(enemy.x, enemy.y, enemy.r, 0, Math.PI * 2); ctx.fill();
            });
            if (state.boss) {
                ctx.fillStyle = themeColors.boss || (productPlan.artDirection && productPlan.artDirection.uiToken ? productPlan.artDirection.uiToken : '#8A78FF');
                ctx.beginPath(); ctx.arc(state.boss.x, state.boss.y, state.boss.r, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.font = '12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(state.boss.name, state.boss.x, state.boss.y - state.boss.r - 14);
                ctx.fillStyle = 'rgba(255,255,255,0.18)';
                ctx.fillRect(state.boss.x - 80, state.boss.y - state.boss.r - 9, 160, 4);
                ctx.fillStyle = themeColors.flower || '#F093FB';
                ctx.fillRect(state.boss.x - 80, state.boss.y - state.boss.r - 9, 160 * Math.max(0, state.boss.hp / state.boss.maxHp), 4);
                ctx.textAlign = 'left';
            }
            state.bullets.forEach(bullet => {
                ctx.fillStyle = themeColors.playerBullet || '#facc15';
                ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2); ctx.fill();
            });
            state.enemyBullets.forEach(bullet => {
                ctx.fillStyle = themeColors.enemyBullet || bullet.color || '#ff5fd2';
                ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2); ctx.fill();
            });

            ctx.fillStyle = themeColors.hudBg || 'rgba(5,8,12,0.72)';
            ctx.fillRect(12, 12, 265, isBulletHell ? 88 : 64);
            ctx.fillStyle = themeColors.ink || '#fff';
            ctx.font = '14px Inter, sans-serif';
            ctx.fillText(`Time ${Math.floor(state.time)}s / Score ${state.score} / Lv ${state.level}`, 24, 36);
            ctx.fillText(isTowerDefense ? `Base HP ${Math.max(0, Math.floor(base.hp))}` : `HP ${Math.max(0, Math.floor(player.hp))}`, 24, 58);
            if (isBulletHell) {
                ctx.fillText(`Power ${state.power} / Bomb ${state.bombs}`, 24, 78);
            }
            ctx.fillStyle = 'rgba(255,255,255,0.62)';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(isTowerDefense ? 'Auto towers defend the base' : (isBulletHell ? 'WASD move, Space/Z shoot, X bomb' : 'WASD/Arrows move, Space fires'), 360, 30);

            if (state.awaitingStart) {
                ctx.fillStyle = 'rgba(0,0,0,0.42)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = themeColors.cream || '#fff';
                ctx.font = 'bold 30px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(spec && spec.meta && spec.meta.gameName ? spec.meta.gameName : 'Start Game', canvas.width / 2, canvas.height / 2 - 26);
                ctx.fillStyle = themeColors.playerBullet || '#facc15';
                ctx.font = 'bold 22px Inter, sans-serif';
                ctx.fillText('Start Game', canvas.width / 2, canvas.height / 2 + 10);
                ctx.fillStyle = 'rgba(255,255,255,0.82)';
                ctx.font = '13px Inter, sans-serif';
                ctx.fillText('Tap the game or press Space / Enter', canvas.width / 2, canvas.height / 2 + 36);
                ctx.textAlign = 'left';
            }

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
            if (state.awaitingStart && ['Space', 'Enter', 'KeyZ'].includes(event.code)) {
                startGame();
                event.preventDefault();
                return;
            }
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
            if (startGame()) return;
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
                if (edit.visualTheme && edit.visualTheme.id === 'animal_island') {
                    runtimeConfig.visualTheme = edit.visualTheme;
                }
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
                    playerImageUrl: runtimeConfig.playerImageUrl,
                    visualTheme: runtimeConfig.visualTheme
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
                openGeneratedPlayablePage(container, plan, previewButton.dataset.previewUrl || '');
            });
        });
        if (restartBtn) restartBtn.addEventListener('click', resetGame);
        if (pauseBtn) pauseBtn.addEventListener('click', () => {
            if (startGame()) return;
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
        if (!plan.decision.canAutoGenerate) {
            regTimeout(() => {
                showAIFlowError(buildUnsupportedTemplateError(plan.decision), {
                    phase: 'Template capability',
                    onEditRequest: () => prepareP0RewriteRequest(plan.decision)
                });
            }, 120);
            return;
        }
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
    const shouldAutoOpenWorkspaceDemo = isWorkspaceDemoModeEnabled(startupParams) && (
        startupParams.get('demo') === 'edit-workspace'
        || startupParams.get('workspace') === 'edit'
        || (window.location.port === '5502' && window.location.pathname === '/' && !window.location.search)
    );
    if (shouldAutoRunTestPrompt) {
        regTimeout(() => openCreateChatViewAfterModelsReady(E2E_TEST_PROMPTS[startupTestPrompt]), 300);
    } else if (shouldAutoOpenWorkspaceDemo) {
        regTimeout(openEditWorkspaceDemo, 300);
    } else {
        bindHomeIntroEarlyCompletion();
        window.setTimeout(beginHomeIntroSequence, 120);
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


            openCreateChatView(savedPrompt);
        }
    });

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

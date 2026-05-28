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

    const CHAT_I18N = {
        en: {
            worked: 'processed {time}',
            ready: "I've collected all the basic information. Ready to generate the game! Shall we start?",
            initial: 'Hey there! What kind of game do you want to create?',
            inspire: 'Inspire Me',
            noIdea: 'No idea? Just',
            create: 'Create',
            addMore: 'Add More in Chat',
            exitNewIdea: 'Exit & New Idea',
            editFilled: "Sure! I've filled the summary into the input box. Feel free to edit or add more details!",
            promptFallback: 'What should we define next?',
            prompts: {
                type: 'What kind of game should this be?',
                style: 'What art style should we use?',
                setting: 'What world or background should the game use?',
                coreGameplay: 'What should the player mainly do moment to moment?',
                playerGoal: 'How does the player win or clear the game?',
                mainChallenge: 'What should create the main pressure or challenge?',
                progressionSystem: 'How should the player grow stronger?',
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
                background: 'Background/Story',
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
            emailSuccess: "All systems go! Your game assets and logic are finalized. We'll send it to your inbox within 15 working days",
            anotherSpark: 'Would you like to explore another creative spark?',
            emailLater: 'No problem! You can always share an email with me later if you change your mind.',
            send: 'Send',
            sending: 'Sending...',
            invalidEmail: 'Please enter a valid email address.',
            submitFailed: 'Something went wrong with the submission. Please try again.',
            delayTitle: 'Apologies for the delay',
            emailText: 'Please provide your personal email, and we will send the generated game to your inbox~',
            skip: 'Skip for now',
            progressAuto: 'Template matched. Building the P0 GameSpec preview now.',
            progressManual: 'This idea needs manual handling.',
            chatPlaceholder: 'Ask anything',
            webPreview: 'Web preview',
            openPreview: 'Open preview',
            generatedFiles: 'Generated files',
            generatedJsNote: 'Playable runtime, GameSpec, and local fallback logic are bundled here.',
            landscapeTip: 'Mobile preview starts in portrait. Rotate your phone for a wider playfield.',
            mainPlaceholder: 'Enter your creative prompt~',
            stepAnalyze: 'Analyzing your prompt...',
            stepAssets: 'Generating game assets...',
            stepBuild: 'Building your game...'
        },
        zh: {
            worked: '已处理 {time}',
            ready: '我已经收集完基础信息，可以开始生成游戏。现在开始吗？',
            initial: '你好！你想创建什么样的游戏？',
            inspire: '给我灵感',
            noIdea: '没有想法？试试',
            create: '生成',
            addMore: '继续补充',
            exitNewIdea: '退出并创建新想法',
            editFilled: '可以。我已把方案摘要填入输入框，你可以继续编辑或补充细节。',
            promptFallback: '接下来需要定义什么？',
            prompts: {
                type: '你想做什么类型的游戏？',
                style: '你想使用什么美术风格？',
                setting: '游戏发生在什么世界或背景中？',
                coreGameplay: '玩家每一刻主要做什么？',
                playerGoal: '玩家如何获胜或通关？',
                mainChallenge: '主要压力或挑战来自哪里？',
                progressionSystem: '玩家如何成长或变强？',
                difficultyLevel: '希望按什么难度调校？'
            },
            titles: {
                type: '游戏类型',
                style: '美术风格',
                setting: '游戏设定',
                coreGameplay: '核心玩法',
                playerGoal: '玩家目标',
                mainChallenge: '主要挑战',
                progressionSystem: '成长系统',
                difficultyLevel: '难度等级'
            },
            detailedConcept: '详细游戏概念',
            labels: {
                gameType: '游戏类型',
                artStyle: '美术风格',
                gameSetting: '游戏设定',
                background: '背景/故事',
                coreGameplay: '核心玩法',
                playerGoal: '玩家目标',
                mainChallenge: '主要挑战',
                progressionSystem: '成长系统',
                difficultyLevel: '难度等级',
                p0Template: 'P0 模板',
                decision: '决策'
            },
            autoReady: '可自动生成',
            manualFallback: '手动队列兜底',
            autoPath: '自动生成路径',
            gameSpecReady: 'P0 GameSpec 已就绪',
            emailSuccess: '已准备就绪！你的游戏资产和逻辑已整理完成，我们会在 15 个工作日内发送到你的邮箱。',
            anotherSpark: '要继续探索另一个创意吗？',
            emailLater: '没问题。如果你改变主意，之后也可以再留下邮箱。',
            send: '发送',
            sending: '发送中...',
            invalidEmail: '请输入有效的邮箱地址。',
            submitFailed: '提交时出现问题，请稍后重试。',
            delayTitle: '抱歉需要等待',
            emailText: '请留下你的个人邮箱，我们会把生成后的游戏发送到你的邮箱~',
            skip: '暂时跳过',
            progressAuto: '已匹配模板，正在构建 P0 GameSpec 预览。',
            progressManual: '这个想法需要人工处理。',
            chatPlaceholder: '输入你的想法',
            mainPlaceholder: '输入你的游戏创意~',
            stepAnalyze: '正在分析你的创意...',
            stepAssets: '正在生成游戏资产...',
            stepBuild: '正在构建你的游戏...'
        },
        ja: {
            worked: '処理済み {time}',
            ready: '基本情報をすべて収集しました。ゲーム生成を開始しますか？',
            initial: 'こんにちは！どんなゲームを作りたいですか？',
            inspire: 'アイデアを見る',
            noIdea: '迷ったら',
            create: '生成',
            addMore: 'チャットで追加',
            exitNewIdea: '終了して新しい案へ',
            editFilled: '概要を入力欄に入れました。自由に編集したり詳細を追加できます。',
            promptFallback: '次に何を決めましょうか？',
            prompts: {
                type: 'どんな種類のゲームにしますか？',
                style: 'どんなアートスタイルにしますか？',
                setting: 'ゲームの世界観や舞台は何ですか？',
                coreGameplay: 'プレイヤーは主に何をしますか？',
                playerGoal: 'プレイヤーはどう勝利またはクリアしますか？',
                mainChallenge: '主なプレッシャーや挑戦は何ですか？',
                progressionSystem: 'プレイヤーはどう成長しますか？',
                difficultyLevel: '難易度はどの程度にしますか？'
            },
            titles: {
                type: 'ゲームタイプ',
                style: 'アートスタイル',
                setting: 'ゲーム設定',
                coreGameplay: 'コアゲームプレイ',
                playerGoal: 'プレイヤー目標',
                mainChallenge: '主な挑戦',
                progressionSystem: '成長システム',
                difficultyLevel: '難易度'
            },
            detailedConcept: '詳細なゲームコンセプト',
            labels: {
                gameType: 'ゲームタイプ',
                artStyle: 'アートスタイル',
                gameSetting: 'ゲーム設定',
                background: '背景/ストーリー',
                coreGameplay: 'コアゲームプレイ',
                playerGoal: 'プレイヤー目標',
                mainChallenge: '主な挑戦',
                progressionSystem: '成長システム',
                difficultyLevel: '難易度',
                p0Template: 'P0 テンプレート',
                decision: '判定'
            },
            autoReady: '自動生成可能',
            manualFallback: '手動キューへ移行',
            autoPath: '自動生成ルート',
            gameSpecReady: 'P0 GameSpec 準備完了',
            emailSuccess: '準備完了です。ゲーム素材とロジックを整理しました。15営業日以内にメールでお送りします。',
            anotherSpark: '別のアイデアも試しますか？',
            emailLater: '問題ありません。必要になったら後でメールを共有できます。',
            send: '送信',
            sending: '送信中...',
            invalidEmail: '有効なメールアドレスを入力してください。',
            submitFailed: '送信に失敗しました。もう一度お試しください。',
            delayTitle: 'お待たせしてすみません',
            emailText: '個人メールを入力してください。生成したゲームをメールでお送りします。',
            skip: '今はスキップ',
            progressAuto: 'テンプレートに一致しました。P0 GameSpec プレビューを構築中です。',
            progressManual: 'このアイデアは手動対応が必要です。',
            chatPlaceholder: '何でも入力',
            mainPlaceholder: 'ゲームのアイデアを入力~',
            stepAnalyze: 'アイデアを分析中...',
            stepAssets: 'ゲーム素材を生成中...',
            stepBuild: 'ゲームを構築中...'
        },
        ko: {
            worked: '처리됨 {time}',
            ready: '기본 정보를 모두 수집했습니다. 게임 생성을 시작할까요?',
            initial: '안녕하세요! 어떤 게임을 만들고 싶나요?',
            inspire: '아이디어 보기',
            noIdea: '아이디어가 없다면',
            create: '생성',
            addMore: '채팅에서 추가',
            exitNewIdea: '나가서 새 아이디어',
            editFilled: '요약을 입력창에 넣었습니다. 자유롭게 수정하거나 세부 내용을 추가하세요.',
            promptFallback: '다음에는 무엇을 정할까요?',
            prompts: {
                type: '어떤 유형의 게임인가요?',
                style: '어떤 아트 스타일을 사용할까요?',
                setting: '게임의 세계관이나 배경은 무엇인가요?',
                coreGameplay: '플레이어가 주로 무엇을 하나요?',
                playerGoal: '플레이어는 어떻게 승리하거나 클리어하나요?',
                mainChallenge: '주요 압박이나 도전은 무엇인가요?',
                progressionSystem: '플레이어는 어떻게 성장하나요?',
                difficultyLevel: '난이도는 어느 정도로 맞출까요?'
            },
            titles: {
                type: '게임 유형',
                style: '아트 스타일',
                setting: '게임 설정',
                coreGameplay: '핵심 플레이',
                playerGoal: '플레이어 목표',
                mainChallenge: '주요 도전',
                progressionSystem: '성장 시스템',
                difficultyLevel: '난이도'
            },
            detailedConcept: '상세 게임 콘셉트',
            labels: {
                gameType: '게임 유형',
                artStyle: '아트 스타일',
                gameSetting: '게임 설정',
                background: '배경/스토리',
                coreGameplay: '핵심 플레이',
                playerGoal: '플레이어 목표',
                mainChallenge: '주요 도전',
                progressionSystem: '성장 시스템',
                difficultyLevel: '난이도',
                p0Template: 'P0 템플릿',
                decision: '판정'
            },
            autoReady: '자동 생성 가능',
            manualFallback: '수동 큐로 전환',
            autoPath: '자동 생성 경로',
            gameSpecReady: 'P0 GameSpec 준비 완료',
            emailSuccess: '준비가 끝났습니다. 게임 에셋과 로직을 정리했습니다. 15영업일 이내에 이메일로 보내드리겠습니다.',
            anotherSpark: '다른 아이디어도 탐색할까요?',
            emailLater: '괜찮습니다. 마음이 바뀌면 나중에 이메일을 공유할 수 있습니다.',
            send: '보내기',
            sending: '보내는 중...',
            invalidEmail: '유효한 이메일 주소를 입력하세요.',
            submitFailed: '제출 중 문제가 발생했습니다. 다시 시도하세요.',
            delayTitle: '기다리게 해서 죄송합니다',
            emailText: '개인 이메일을 입력하면 생성된 게임을 보내드리겠습니다.',
            skip: '지금은 건너뛰기',
            progressAuto: '템플릿이 매칭되었습니다. P0 GameSpec 미리보기를 구성 중입니다.',
            progressManual: '이 아이디어는 수동 처리가 필요합니다.',
            chatPlaceholder: '무엇이든 입력',
            mainPlaceholder: '게임 아이디어 입력~',
            stepAnalyze: '아이디어 분석 중...',
            stepAssets: '게임 에셋 생성 중...',
            stepBuild: '게임 구성 중...'
        }
    };

    let chatLanguage = 'en';
    const PLAN_FIELD_LABELS = {
        en: {
            hook: 'Hook',
            storyPremise: 'Story Premise',
            coreLoop: 'Core Loop',
            momentToMoment: 'Moment-to-Moment',
            visualDirection: 'Visual Direction',
            enemyDesign: 'Enemy / Challenge Design',
            progressionPlan: 'Progression Plan',
            playerFantasy: 'Player Fantasy',
            prototypeScope: 'P0 Prototype Scope'
        },
        zh: {
            hook: '亮点',
            storyPremise: '故事前提',
            coreLoop: '核心循环',
            momentToMoment: '即时玩法',
            visualDirection: '视觉方向',
            enemyDesign: '敌人/挑战设计',
            progressionPlan: '成长规划',
            playerFantasy: '玩家幻想',
            prototypeScope: 'P0 原型范围'
        },
        ja: {
            hook: 'フック',
            storyPremise: 'ストーリー前提',
            coreLoop: 'コアループ',
            momentToMoment: '瞬間ごとの体験',
            visualDirection: 'ビジュアル方針',
            enemyDesign: '敵/チャレンジ設計',
            progressionPlan: '成長計画',
            playerFantasy: 'プレイヤーファンタジー',
            prototypeScope: 'P0 プロトタイプ範囲'
        },
        ko: {
            hook: '핵심 매력',
            storyPremise: '스토리 전제',
            coreLoop: '핵심 루프',
            momentToMoment: '순간 플레이',
            visualDirection: '비주얼 방향',
            enemyDesign: '적/도전 설계',
            progressionPlan: '성장 계획',
            playerFantasy: '플레이어 판타지',
            prototypeScope: 'P0 프로토타입 범위'
        }
    };

    const INSPIRE_PROFILE_DIRECTIONS = ['stable', 'surprise', 'contrast'];
    const PROFILE_SELECTION_LIMIT = 2;

    const INSPIRE_PROFILE_TEXT = {
        en: {
            chooseMode: 'How would you like to find a game idea?',
            quickTitle: 'Quick inspiration',
            quickDesc: 'Use the existing GameSpec path and pick from game design options.',
            profileTitle: 'Mood-based recommendation',
            profileDesc: 'Choose today\'s mood, scene, state, and visual vibe first.',
            startProfile: 'Mood-based recommendation',
            quickInspiration: 'Quick inspiration',
            skip: 'Skip',
            next: 'Next',
            generate: 'Generate 3 directions',
            selected: 'Selected',
            useDirection: 'Use this direction',
            restart: 'Choose again',
            sidebarTitle: 'Inspiration profile',
            gameSpecSidebarTitle: 'GameSpec choices',
            currentGameSpec: 'Current selections',
            recommendationsTitle: 'Choose one direction',
            generating: 'Reading your mood profile and shaping 3 game directions...',
            continuePrompt: 'Great. I will turn this direction into a game generation prompt.',
            none: 'Any',
            directions: {
                stable: 'Steady',
                surprise: 'Surprise',
                contrast: 'Contrast'
            }
        },
        zh: {
            chooseMode: '你想怎样找一个游戏灵感？',
            quickTitle: '快速灵感',
            quickDesc: '保持现有 GameSpec 路径，直接从游戏设计选项里挑。',
            profileTitle: '按心情推荐',
            profileDesc: '先选择今天的心情、场景、状态和视觉气质。',
            startProfile: '按心情推荐',
            quickInspiration: '快速灵感',
            skip: '跳过',
            next: '下一项',
            generate: '生成 3 个方向',
            selected: '已选择',
            useDirection: '使用该方向',
            restart: '重新选择',
            sidebarTitle: '灵感画像',
            gameSpecSidebarTitle: 'GameSpec 选择',
            currentGameSpec: '当前已选项',
            recommendationsTitle: '选择一个方向',
            generating: '正在读取你的灵感画像，生成 3 个游戏方向...',
            continuePrompt: '好的。我会把这个方向转成游戏生成 prompt。',
            none: '不限',
            directions: {
                stable: '稳妥',
                surprise: '惊喜',
                contrast: '反差'
            }
        }
    };

    const INSPIRE_PROFILE_DIMENSIONS = [
        {
            key: 'mood',
            title: { en: 'Mood', zh: '心情' },
            hint: { en: 'What is your mood today?', zh: '今天你更接近哪种心情？' },
            impact: { en: 'Affects pacing, pressure, color temperature, and recommendation tone.', zh: '影响游戏节奏、压力强度、色彩温度和推荐语气。' },
            options: [
                { id: 'happy', label: { en: 'Happy', zh: '开心' } },
                { id: 'calm', label: { en: 'Calm', zh: '平静' } },
                { id: 'excited', label: { en: 'Excited', zh: '兴奋' } },
                { id: 'low', label: { en: 'Low', zh: '低落' } },
                { id: 'irritated', label: { en: 'Irritated', zh: '烦躁' } },
                { id: 'tired', label: { en: 'Tired', zh: '疲惫' } },
                { id: 'focused', label: { en: 'Focused', zh: '专注' } },
                { id: 'empty', label: { en: 'Blank', zh: '放空' } },
                { id: 'lonely', label: { en: 'Lonely', zh: '孤独' } },
                { id: 'nostalgic', label: { en: 'Nostalgic', zh: '怀旧' } }
            ]
        },
        {
            key: 'scene',
            title: { en: 'Scene', zh: '场景' },
            hint: { en: 'Where or when will this idea fit?', zh: '这个灵感更适合现在的哪个场景？' },
            impact: { en: 'Affects session length, control complexity, and feedback density.', zh: '影响单局时长、操作复杂度和反馈密度。' },
            options: [
                { id: 'commute', label: { en: 'Commute', zh: '通勤' } },
                { id: 'work_break', label: { en: 'Work break', zh: '工作间隙' } },
                { id: 'after_study', label: { en: 'After study', zh: '学习后' } },
                { id: 'before_sleep', label: { en: 'Before sleep', zh: '睡前' } },
                { id: 'late_night', label: { en: 'Late night', zh: '深夜独处' } },
                { id: 'weekend', label: { en: 'Weekend', zh: '周末' } },
                { id: 'party', label: { en: 'Party', zh: '聚会' } },
                { id: 'travel', label: { en: 'Travel', zh: '旅行' } },
                { id: 'short_break', label: { en: 'Short break', zh: '碎片时间' } }
            ]
        },
        {
            key: 'state',
            title: { en: 'State', zh: '状态' },
            hint: { en: 'What experience do you want right now?', zh: '你现在想获得什么体验？' },
            impact: { en: 'Affects core gameplay, player goal, challenge, and difficulty.', zh: '影响核心玩法、玩家目标、主要挑战和难度。' },
            options: [
                { id: 'decompress', label: { en: 'Decompress', zh: '想解压' } },
                { id: 'challenge', label: { en: 'Challenge', zh: '想挑战' } },
                { id: 'immerse', label: { en: 'Immerse', zh: '想沉浸' } },
                { id: 'power', label: { en: 'Power fantasy', zh: '想爽快' } },
                { id: 'collect', label: { en: 'Collect', zh: '想收集' } },
                { id: 'explore', label: { en: 'Explore', zh: '想探索' } },
                { id: 'create', label: { en: 'Create', zh: '想创造' } },
                { id: 'social', label: { en: 'Social', zh: '想社交' } },
                { id: 'pass_time', label: { en: 'Pass time', zh: '想打发时间' } }
            ]
        },
        {
            key: 'vibe',
            title: { en: 'Visual vibe', zh: '视觉气质' },
            hint: { en: 'What should the game look and feel like?', zh: '这个游戏看起来和玩起来应该是什么气质？' },
            impact: { en: 'Maps to art style, setting, UI tokens, naming, and asset prompts.', zh: '映射到美术风格、游戏设定、UI token、命名和资源 prompt。' },
            options: [
                { id: 'cyber_neon', label: { en: 'Cyber neon', zh: '赛博霓虹' } },
                { id: 'pixel_retro', label: { en: 'Pixel retro', zh: '像素复古' } },
                { id: 'storybook', label: { en: 'Hand-drawn fairy tale', zh: '手绘童话' } },
                { id: 'mono_minimal', label: { en: 'Monochrome minimal', zh: '黑白极简' } },
                { id: 'steampunk', label: { en: 'Steampunk', zh: '蒸汽朋克' } },
                { id: 'eastern_fantasy', label: { en: 'Eastern fantasy', zh: '东方幻想' } },
                { id: 'space_scifi', label: { en: 'Space sci-fi', zh: '太空科幻' } },
                { id: 'wasteland', label: { en: 'Wasteland', zh: '末日废土' } },
                { id: 'cozy_cute', label: { en: 'Cozy cute', zh: '可爱治愈' } },
                { id: 'dark_gothic', label: { en: 'Dark gothic', zh: '暗黑哥特' } },
                { id: 'low_poly', label: { en: 'Low poly', zh: '低多边形' } },
                { id: 'arcade_pop', label: { en: 'Arcade pop', zh: '街机高饱和' } }
            ]
        }
    ];

    Object.assign(CHAT_I18N.zh, {
        worked: '已处理 {time}',
        ready: '我已经收集完基础信息，可以开始生成游戏。现在开始吗？',
        initial: '你好！你想创建什么样的游戏？',
        inspire: '给我灵感',
        noIdea: '没有想法？试试',
        create: '生成',
        addMore: '继续补充',
        exitNewIdea: '退出并创建新想法',
        editFilled: '可以。我已经把方案摘要填入输入框，你可以继续编辑或补充细节。',
        promptFallback: '接下来需要定义什么？',
        detailedConcept: '详细游戏概念',
        autoReady: '可自动生成',
        manualFallback: '转入人工队列',
        autoPath: '自动生成路径',
        gameSpecReady: 'P0 GameSpec 已就绪',
        emailSuccess: '已准备就绪！你的游戏资产和逻辑已经整理完成，我们会在 15 个工作日内发送到你的邮箱。',
        anotherSpark: '要继续探索另一个创意吗？',
        emailLater: '没问题。如果你改变主意，之后也可以再留下邮箱。',
        send: '发送',
        sending: '发送中...',
        invalidEmail: '请输入有效的邮箱地址。',
        submitFailed: '提交时出现问题，请稍后重试。',
        delayTitle: '抱歉需要等待',
        emailText: '请留下你的个人邮箱，我们会把生成后的游戏发送到你的邮箱~',
        skip: '暂时跳过',
        progressAuto: '已匹配模板，正在构建 P0 GameSpec 预览。',
        progressManual: '这个想法需要人工处理。',
        chatPlaceholder: '输入你的想法',
        webPreview: '网页预览',
        openPreview: '打开预览',
        generatedFiles: '生成的文件',
        generatedJsNote: '可玩运行时、GameSpec 和本地兜底逻辑都已合并到这个文件。',
        landscapeTip: '手机端默认竖屏预览，建议横屏体验更完整的操作区域。',
        mainPlaceholder: '输入你的游戏创意~',
        stepAnalyze: '正在分析你的创意...',
        stepAssets: '正在生成游戏资产...',
        stepBuild: '正在构建你的游戏...'
    });
    Object.assign(CHAT_I18N.zh.prompts, {
        type: '你想做什么类型的游戏？',
        style: '你想使用什么美术风格？',
        setting: '游戏发生在什么世界或背景中？',
        coreGameplay: '玩家每一刻主要做什么？',
        playerGoal: '玩家如何获胜或通关？',
        mainChallenge: '主要压力或挑战来自哪里？',
        progressionSystem: '玩家如何成长或变强？',
        difficultyLevel: '希望按什么难度调校？'
    });
    Object.assign(CHAT_I18N.zh.titles, {
        type: '游戏类型',
        style: '美术风格',
        setting: '游戏设定',
        coreGameplay: '核心玩法',
        playerGoal: '玩家目标',
        mainChallenge: '主要挑战',
        progressionSystem: '成长系统',
        difficultyLevel: '难度等级'
    });
    Object.assign(CHAT_I18N.zh.labels, {
        gameType: '游戏类型',
        artStyle: '美术风格',
        gameSetting: '游戏设定',
        background: '背景/故事',
        coreGameplay: '核心玩法',
        playerGoal: '玩家目标',
        mainChallenge: '主要挑战',
        progressionSystem: '成长系统',
        difficultyLevel: '难度等级',
        p0Template: 'P0 模板',
        decision: '决策'
    });
    Object.assign(PLAN_FIELD_LABELS.zh, {
        hook: '亮点',
        storyPremise: '故事前提',
        coreLoop: '核心循环',
        momentToMoment: '即时玩法',
        visualDirection: '视觉方向',
        enemyDesign: '敌人/挑战设计',
        progressionPlan: '成长规划',
        playerFantasy: '玩家幻想',
        prototypeScope: 'P0 原型范围'
    });
    Object.assign(INSPIRE_PROFILE_TEXT.zh, {
        chooseMode: '你想怎样找到一个游戏灵感？',
        quickTitle: '快速灵感',
        quickDesc: '保留现有 GameSpec 路径，直接从游戏设计选项里挑。',
        profileTitle: '按心情推荐',
        profileDesc: '先选择今天的心情、场景、状态和视觉气质。',
        startProfile: '按心情推荐',
        quickInspiration: '快速灵感',
        skip: '跳过',
        next: '下一项',
        generate: '生成 3 个方向',
        selected: '已选择',
        useDirection: '使用该方向',
        restart: '重新选择',
        sidebarTitle: '灵感画像',
        gameSpecSidebarTitle: 'GameSpec 选择',
        currentGameSpec: '当前已选项',
        recommendationsTitle: '选择一个方向',
        generating: '正在读取你的灵感画像，生成 3 个游戏方向...',
        continuePrompt: '好的。我会把这个方向转成游戏生成 prompt。',
        none: '不限',
        directions: {
            stable: '稳妥',
            surprise: '惊喜',
            contrast: '反差'
        }
    });

    const ZH_PROFILE_DIMENSION_COPY = {
        mood: {
            title: '心情',
            hint: '今天你的心情更接近哪种？',
            impact: '影响游戏节奏、压力强度、色彩温度和推荐语气。',
            options: {
                happy: '开心',
                calm: '平静',
                excited: '兴奋',
                low: '低落',
                irritated: '烦躁',
                tired: '疲惫',
                focused: '专注',
                empty: '放空',
                lonely: '孤独',
                nostalgic: '怀旧'
            }
        },
        scene: {
            title: '场景',
            hint: '这个灵感更适合现在的哪个场景？',
            impact: '影响单局时长、操作复杂度和反馈密度。',
            options: {
                commute: '通勤',
                work_break: '工作间隙',
                after_study: '学习后',
                before_sleep: '睡前',
                late_night: '深夜独处',
                weekend: '周末',
                party: '聚会',
                travel: '旅行',
                short_break: '碎片时间'
            }
        },
        state: {
            title: '状态',
            hint: '你现在想获得什么体验？',
            impact: '影响核心玩法、玩家目标、主要挑战和难度。',
            options: {
                decompress: '想解压',
                challenge: '想挑战',
                immerse: '想沉浸',
                power: '想爽快',
                collect: '想收集',
                explore: '想探索',
                create: '想创造',
                social: '想社交',
                pass_time: '想打发时间'
            }
        },
        vibe: {
            title: '视觉气质',
            hint: '这个游戏看起来和玩起来应该是什么气质？',
            impact: '映射到美术风格、游戏设定、UI token、命名和资源 prompt。',
            options: {
                cyber_neon: '赛博霓虹',
                pixel_retro: '像素复古',
                storybook: '手绘童话',
                mono_minimal: '黑白极简',
                steampunk: '蒸汽朋克',
                eastern_fantasy: '东方幻想',
                space_scifi: '太空科幻',
                wasteland: '末日废土',
                cozy_cute: '可爱治愈',
                dark_gothic: '暗黑哥特',
                low_poly: '低多边形',
                arcade_pop: '街机高饱和'
            }
        }
    };
    INSPIRE_PROFILE_DIMENSIONS.forEach(dimension => {
        const copy = ZH_PROFILE_DIMENSION_COPY[dimension.key];
        if (!copy) return;
        dimension.title.zh = copy.title;
        dimension.hint.zh = copy.hint;
        dimension.impact.zh = copy.impact;
        dimension.options.forEach(option => {
            if (copy.options[option.id]) option.label.zh = copy.options[option.id];
        });
    });

    const TEMPLATE_CATALOG = [
        {
            id: 'roguelike_survival',
            label: 'Roguelike Survival',
            type: 'roguelike',
            keywords: ['roguelike', 'survival', 'survive', 'wave', 'auto attack', 'vampire', 'level-up', 'upgrade', '肉鸽', '生存', '割草', '波次', '自动攻击', '升级'],
            sourceArchitecture: 'Groglike-SOP',
            specMode: 'module-spec',
            contentModules: ['minimal', 'weapons', 'enemies', 'waves', 'balance', 'effects', 'manifest'],
            gameplayPillars: ['auto-weapons', 'xp-pickups', 'level-up-options', 'survival-timeline'],
            systems: ['input', 'movement', 'collision', 'combat', 'spawn', 'pickup', 'health', 'progression', 'reward', 'animation', 'render_canvas'],
            confidenceBoost: 0.16
        },
        {
            id: 'bullet_hell',
            label: 'Bullet Hell',
            type: 'bullet-hell',
            keywords: ['bullet hell', 'danmaku', 'shooter', 'shoot', 'dodge', 'projectile', 'boss phase', '弹幕', '射击', '子弹', '躲避', 'boss', '首领'],
            sourceArchitecture: 'bullet_hell',
            intentAliases: ['flying shooter', 'space shooter', 'vertical shooter', 'horizontal shooter', 'shmup', 'stg', 'bullet curtain', 'air shooter', '飞行射击', '飞机大战', '纵版射击', '横版射击', '弹幕射击', '移动射击'],
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
    const ADMIN_EMAIL_ALLOWLIST = ['liyilin199976@gmail.com'];
    const AI_ANALYSIS_TIMEOUT_MS = 6000;
    const isLocalHost = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    const DEFAULT_LOCAL_API_PORT = window.DROI_API_PORT || '3000';
    const API_BASE_URL = window.DROI_API_BASE || (
        isLocalHost && window.location.port && window.location.port !== DEFAULT_LOCAL_API_PORT
            ? `http://127.0.0.1:${DEFAULT_LOCAL_API_PORT}`
            : ''
    );
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

    function scrollToRollPage(pageIndex) {
        if (!rollEmbedSection) return;
        const top = rollEmbedSection.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: top + Math.max(0, pageIndex) * window.innerHeight,
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
            scrollToRollPage(Number(data.pageIndex) || 0);
        }
    });

    window.addEventListener('resize', syncRollEmbedViewport);
    if (rollEmbedFrame) {
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

    function getLocalFallbackMeta() {
        return { icon: 'LF', label: 'Local Fallback', color: '#6b6972' };
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

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
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
        if (chatLanguage === 'zh') {
            const zhReadable = {
                webPreview: '网页预览',
                openPreview: '打开预览',
                generatedFiles: '生成的文件',
                generatedJsNote: '可玩运行时、GameSpec 和本地兜底逻辑都已合并到这个文件。',
                landscapeTip: '手机端默认竖屏预览，建议横屏体验更完整的操作区域。'
            };
            if (zhReadable[key]) return zhReadable[key];
        }
        const zh = {
            webPreview: '网页预览',
            openPreview: '打开预览',
            generatedFiles: '生成的文件',
            generatedJsNote: '可玩运行时、GameSpec 和本地兜底逻辑已合并到这个文件。',
            landscapeTip: '手机端默认竖屏预览，建议横屏体验更完整的操作区域。'
        };
        return chatLanguage === 'zh' ? (zh[key] || t(key)) : t(key);
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
            en: {
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
            },
            zh: {
                planTitle: '飞行射击 / Bullet Hell 产品方案',
                planBadge: '模板已锁定：bullet-hell',
                confirm: '确认并生成',
                revise: '我想调整一下',
                aiRequiredTitle: 'Gemini 产品方案生成失败',
                aiRequiredBody: '飞行射击路径需要先完成 AI 产品方案。请留下邮箱，我们会进入人工生产队列。',
                goal: '目标',
                challenge: '挑战',
                progression: '成长',
                difficulty: '难度',
                boss: 'Boss',
                waves: '波次',
                researchTitle: 'Droi 正在设计飞行射击方案',
                researchSubtitle: '先生成产品方案，再进入模板生成...',
                directConfirm: '我会把这个方案注入现有 bullet-hell 模板并生成预览。'
            }
        };
        if (chatLanguage === 'zh') {
            const zhReadable = {
                planTitle: '飞行射击 / Bullet Hell 产品方案',
                planBadge: '模板已锁定：bullet-hell',
                confirm: '确认并生成',
                revise: '我想调整一下',
                aiRequiredTitle: 'AI 产品方案生成失败',
                aiRequiredBody: '飞行射击路径需要先完成 AI 产品方案。请留下邮箱，我们会进入人工生产队列。',
                goal: '目标',
                challenge: '挑战',
                progression: '成长',
                difficulty: '难度',
                boss: 'Boss',
                waves: '波次',
                researchTitle: 'Droi 正在设计飞行射击方案',
                researchSubtitle: '先生成产品方案，再进入模板生成...',
                directConfirm: '我会把这个方案注入现有 bullet-hell 模板并生成预览。'
            };
            if (zhReadable[key]) return zhReadable[key];
        }
        const pack = copy[chatLanguage] || copy.en;
        return pack[key] || copy.en[key] || key;
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
        return (pack.directions && pack.directions[direction]) ||
            INSPIRE_PROFILE_TEXT.en.directions[direction] ||
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
        if (!dimension || dimension.key !== 'mood') return '';
        const moodIcons = {
            happy: '☀',
            calm: '◌',
            excited: '⚡',
            low: '☁',
            irritated: '!',
            tired: '☾',
            focused: '◎',
            empty: '○',
            lonely: '◇',
            nostalgic: '◷'
        };
        return moodIcons[option.id] || '';
    }

    function profileOptionInlineHtml(option, dimension) {
        const icon = profileOptionIcon(option, dimension);
        const iconHtml = icon ? `<span class="profile-mood-icon" aria-hidden="true">${escapeHtml(icon)}</span>` : '';
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
    let platformModelsLoaded = false;
    let platformModels = [];
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
        if (analysisTimeout) clearTimeout(analysisTimeout);
        resetBulletHellPlanState();

        analysisState.active = true;
        analysisState.processing = true;
        MODULE_STEPS.slice(1).forEach(step => {
            analysisState[step.key] = null;
        });
        analysisState.modules = createModuleStates();
        analysisState.background = prompt;
        analysisState.workStartedAt = Date.now();

        const analysisMessage = addBotMessage('', null, { pending: true });

        runPromptAnalysis(prompt, analysisState.workStartedAt, analysisMessage);
    }

    async function runPromptAnalysis(prompt, runStartedAt, pendingMessage) {
        applyLocalPromptAnalysis(prompt);

        if (getNextMissingStep() !== null) {
            try {
                await withTimeout(analyzePromptWithAIIfAvailable(prompt), AI_ANALYSIS_TIMEOUT_MS);
            } catch (error) {
                console.warn('AI analysis timed out, using local extraction:', error);
            }
        }

        applyP0ClosureDefaults(prompt);

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

    function withTimeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) => {
                setTimeout(() => reject(new Error(`Timed out after ${timeoutMs}ms`)), timeoutMs);
            })
        ]);
    }

    async function analyzePromptWithAIIfAvailable(prompt) {
        if (!hasLiveAIProvider()) return false;

        try {
            const response = await aiService.chat([
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
  "background": string|null
}
Treat genre conventions as suggested, not confirmed, unless the user explicitly stated them.`
                },
                {
                    role: 'user',
                    content: `Game types: ${GAME_TYPES.map(item => item.value).join(', ')}
Art styles: ${ART_STYLES.map(item => item.value).join(', ')}
Settings: ${SETTINGS.map(item => item.value).join(', ')}
Core gameplay options: ${CORE_GAMEPLAY_OPTIONS.map(item => item.value).join(', ')}
Player goal options: ${PLAYER_GOAL_OPTIONS.map(item => item.value).join(', ')}
Main challenge options: ${MAIN_CHALLENGE_OPTIONS.map(item => item.value).join(', ')}
Progression options: ${PROGRESSION_OPTIONS.map(item => item.value).join(', ')}
Difficulty options: ${DIFFICULTY_OPTIONS.map(item => item.value).join(', ')}
Prompt: ${prompt}`
                }
            ]);

            const jsonMatch = response.content.match(/\{[\s\S]*\}/);
            const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response.content);
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

            if (!analysisState.setting && parsed.setting) {
                setModuleSelection('setting', {
                    label: parsed.setting,
                    value: parsed.setting,
                    desc: parsed.background || parsed.setting
                }, 'suggested', 0.6, false);
            }

            return true;
        } catch (error) {
            console.warn('AI analysis failed, using local fallback:', error);
            showSettingsStatus(`AI analysis failed: ${error.message}. Local fallback is active.`, 'warning');
            return false;
        }
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
                    if (analysisTimeout) {
                        clearTimeout(analysisTimeout);
                        analysisTimeout = null;
                    }
                    msgDiv.remove();
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
        return parts.join(' · ') || profileText('none');
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
        const optionsHtml = dimension.options.map(option => `
            <button type="button" class="inspire-profile-chip${selected.has(option.id) ? ' selected' : ''}${isAtLimit && !selected.has(option.id) ? ' limit-disabled' : ''}" data-profile-option="${escapeHtml(option.id)}">
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
            const nextBtn = msgDiv.querySelector('[data-profile-next]');
            if (skipBtn) skipBtn.addEventListener('click', () => advance(true));
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
            inspireProfileState.recommendations = buildLocalProfileRecommendations(getProfilePayload());
        }

        const remainingWorkTime = Math.max(0, 1600 - (Date.now() - researchStartedAt));
        if (remainingWorkTime) {
            await new Promise(resolve => setTimeout(resolve, remainingWorkTime));
        }
        if (pendingMessage) pendingMessage.remove();
        renderInspireProfileSidebar(true);
        regTimeout(() => {
            addBotMessage(buildProfileRecommendationsHtml(inspireProfileState.recommendations), msgDiv => {
                msgDiv.querySelectorAll('[data-profile-rec]').forEach(button => {
                    button.addEventListener('click', () => {
                        const index = Number(button.getAttribute('data-profile-rec'));
                        selectProfileRecommendation(index);
                    });
                });
            });
        }, 420);
    }

    function buildProfileRecommendationsHtml(recommendations) {
        const cards = recommendations.map((rec, index) => `
            <button type="button" class="inspire-recommendation-card rec-${escapeHtml(rec.direction)}" data-profile-rec="${index}">
                <span class="rec-type">${escapeHtml(profileDirectionLabel(rec.direction))}</span>
                <strong>${escapeHtml(rec.title)}</strong>
                <span>${escapeHtml(rec.description)}</span>
                <div class="rec-why">
                    <small>${escapeHtml(rec.reason)}</small>
                </div>
                <div class="rec-dna">${escapeHtml([rec.gameType, rec.artStyle, rec.gameSetting].filter(Boolean).join(' · '))}</div>
                <em>${escapeHtml(profileText('useDirection'))}</em>
            </button>
        `).join('');

        return `
            <div class="inspire-profile-kicker">${escapeHtml(profileText('recommendationsTitle'))}</div>
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
        if (hasLiveAIProvider()) {
            try {
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
                ]), AI_ANALYSIS_TIMEOUT_MS);
                const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response.content);
                const recommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations : parsed;
                if (Array.isArray(recommendations) && recommendations.length) {
                    return INSPIRE_PROFILE_DIRECTIONS.map((direction, index) => normalizeRecommendation({
                        ...(recommendations[index] || {}),
                        direction
                    }, index));
                }
            } catch (error) {
                console.warn('AI profile recommendation failed, using local fallback:', error);
            }
        }

        return buildLocalProfileRecommendations(profile);
    }

    function hasProfileValue(profile, key, candidates) {
        const values = (profile[key] || []).join(' ').toLowerCase();
        return candidates.some(candidate => values.includes(candidate.toLowerCase()));
    }

    function buildLocalProfileRecommendations(profile) {
        const energetic = hasProfileValue(profile, 'mood', ['excited', '兴奋', 'focused', '专注']) || hasProfileValue(profile, 'state', ['challenge', '挑战', 'power', '爽快']);
        const cozy = hasProfileValue(profile, 'mood', ['calm', '平静', 'tired', '疲惫', 'low', '低落']) || hasProfileValue(profile, 'state', ['decompress', '解压']);
        const cyber = hasProfileValue(profile, 'vibe', ['cyber', '赛博', 'arcade', '街机']);
        const cute = hasProfileValue(profile, 'vibe', ['cozy', '可爱', 'storybook', '童话']);
        const shortSession = hasProfileValue(profile, 'scene', ['commute', '通勤', 'short', '碎片', 'work break', '工作间隙']);
        const setting = cyber ? 'a neon skyline above a living circuit city'
            : cute ? 'a hand-drawn pocket world with gentle creatures'
                : 'a compact dream world shaped by today\'s mood';
        const artStyle = cyber ? 'Cyber neon arcade with high-contrast bullets'
            : cute ? 'Cozy hand-drawn storybook with soft UI tokens'
                : 'Stylized 2D with clear silhouettes and mood-driven color tokens';
        const session = shortSession ? '3-5 minute sessions' : 'short repeatable sessions';

        return [
            normalizeRecommendation({
                direction: 'stable',
                title: cozy ? 'Soft Loop Garden' : 'Mood Runner Protocol',
                description: cozy
                    ? `A gentle roguelike survival loop tuned for ${session}, low punishment, and satisfying growth.`
                    : `A readable roguelike action loop tuned for ${session}, steady upgrades, and clear goals.`,
                reason: 'The safe choice turns the profile into a familiar loop with predictable rewards.',
                gameType: 'Roguelike Survival',
                artStyle,
                gameSetting: setting,
                coreGameplay: 'Move, auto-attack, collect XP, choose upgrades, survive waves, and defeat a final boss.'
            }, 0),
            normalizeRecommendation({
                direction: 'surprise',
                title: cyber || energetic ? 'Neon Sky Bloom' : 'Cloudline Bullet Waltz',
                description: `A flying shooter direction with expressive bullet patterns, dodge rhythm, bombs, and a final boss.`,
                reason: 'The surprise choice adds stronger motion and spectacle while still staying template-ready.',
                gameType: 'Bullet Hell / Flying Shooter',
                artStyle: cyber ? artStyle : 'Dreamy sky arcade with bright projectile color language',
                gameSetting: cyber ? setting : 'floating islands above a dusk-colored sky',
                coreGameplay: 'Focused movement, shooting, dodging, bomb clears, power-ups, waves, and multi-phase boss attacks.'
            }, 1),
            normalizeRecommendation({
                direction: 'contrast',
                title: energetic ? 'Quiet Relic Courier' : 'Bright Panic Arcade',
                description: energetic
                    ? 'A calmer exploration game that contrasts high energy with discovery, relic collection, and route planning.'
                    : 'A sharper arcade challenge that turns a quiet mood into quick reactions and high feedback.',
                reason: 'The contrast choice deliberately bends the mood profile into a fresher creative direction.',
                gameType: energetic ? 'Puzzle Adventure' : 'Bullet Hell / Flying Shooter',
                artStyle: energetic ? 'Muted relic-fantasy 2D with soft highlights' : artStyle,
                gameSetting: energetic ? 'an abandoned archive full of shifting doors and memory artifacts' : setting,
                coreGameplay: energetic
                    ? 'Explore rooms, solve spatial gates, collect relics, and reach a destination.'
                    : 'Dodge dense patterns, shoot enemies, charge bombs, and beat a final boss.'
            }, 2)
        ];
    }

    function buildProfileRecommendationPrompt(recommendation, profile) {
        const profileLines = INSPIRE_PROFILE_DIMENSIONS.map(dimension => {
            const values = profile[dimension.key] && profile[dimension.key].length ? profile[dimension.key].join(', ') : profileText('none');
            return `${profileDimensionTitle(dimension)}: ${values}`;
        }).join('\n');
        return `Inspiration profile\n${profileLines}\n\nSelected direction: ${profileDirectionLabel(recommendation.direction)}\nTitle: ${recommendation.title}\nGame Type: ${recommendation.gameType}\nArt Style: ${recommendation.artStyle}\nGame Setting: ${recommendation.gameSetting}\nCore Gameplay: ${recommendation.coreGameplay}\nBackground/Story: ${recommendation.description}\nPlayer Goal: ${recommendation.gameType.toLowerCase().includes('bullet') ? 'Defeat a final boss encounter.' : 'Survive, progress, and complete a clear run objective.'}\nMain Challenge: ${recommendation.gameType.toLowerCase().includes('bullet') ? 'Boss phases and projectile patterns.' : 'Enemy swarm pressure with readable escalation.'}\nProgression System: Level-up choices and collectible power-ups.\nDifficulty Level: ${hasProfileValue(profile, 'state', ['challenge', '挑战']) ? 'Hard' : 'Normal'}\nRecommendation reason: ${recommendation.reason}`;
    }

    function getGameSpecSidebarRows() {
        return MODULE_STEPS.slice(1).map(step => {
            const selection = getModuleSelection(step.key);
            if (!selection) return null;
            const label = selection.label || selection.value || selection.desc || '';
            const desc = selection.desc || selection.value || '';
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
                ? dimension.options.map(option => `
                    <button type="button" class="profile-sidebar-chip${selectedIds.has(option.id) ? ' selected' : ''}${isAtLimit && !selectedIds.has(option.id) ? ' limit-disabled' : ''}" data-profile-sidebar-key="${escapeHtml(dimension.key)}" data-profile-sidebar-option="${escapeHtml(option.id)}">
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
                        <summary>${escapeHtml(chatLanguage === 'zh' ? '展开详情' : 'Details')}</summary>
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

    function getOptionIcon(item, step) {
        const source = `${item.label || ''} ${item.value || ''}`.toLowerCase();
        const exact = {
            rpg: '🧙',
            puzzle: '🧩',
            action: '⚡',
            roguelike: '🎲',
            'bullet hell': '🚀',
            simulation: '🌿',
            horror: '👁',
            rhythm: '🎵',
            strategy: '♟',
            survival: '⛺',
            'pixel art': '▦',
            'dark gothic': '🕯',
            'anime / cartoon': '🎨',
            minimalist: '◌',
            cyberpunk: '🌐',
            'fantasy illustration': '🗡',
            'retro / lo-fi': '📼',
            realistic: '◈',
            'manual action combat': '⚔',
            'auto-attack survival': '✹',
            'level-up choices': '⬆',
            easy: '🌱',
            normal: '◆',
            hard: '🔥',
            nightmare: '☠'
        };
        const label = String(item.label || '').toLowerCase();
        if (exact[label]) return exact[label];
        if (source.includes('space')) return '✦';
        if (source.includes('cyber')) return '🌐';
        if (source.includes('fantasy') || source.includes('medieval')) return '🏰';
        if (source.includes('post')) return '⚠';
        if (source.includes('water')) return '≈';
        if (source.includes('east')) return '⛩';
        if (source.includes(' ice ') || source.includes('arctic') || source.includes('frozen')) return '❄';
        if (source.includes('haunted')) return '☾';
        if (source.includes('auto') || source.includes('swarm')) return '✹';
        if (source.includes('boss')) return '♛';
        if (source.includes('tower')) return '⬡';
        if (source.includes('build')) return '▣';
        if (source.includes('puzzle')) return '🧩';
        if (source.includes('survive') || source.includes('timer')) return '⏱';
        if (source.includes('destination')) return '➜';
        if (source.includes('score')) return '★';
        if (source.includes('level') || source.includes('skill')) return '⬆';
        if (source.includes('drop') || source.includes('equipment')) return '◆';
        if (source.includes('craft')) return '⚒';
        return step === 1 ? '✦' : '◆';
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
        chatInputField.focus();
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
            // 淇妯″紡锛氳В鏋愮敤鎴峰彲鑳界殑鏀瑰姩
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
                    // 娌℃湁浠讳綍鏍囩鐨勮锛岃涓鸿儗鏅ˉ鍏?
                    customBackground.push(l);
                }
            });

            analysisState.background = customBackground.join(' ').trim();
            analysisState.revisionMode = false;
            // 纭繚 active 鐘舵€佷緷鐒朵负 true锛岀淮鎸佸湪鍒嗘瀽娴佷腑
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
        if (activeModelName) activeModelName.textContent = active.label;
        if (modelSelector) {
            modelSelector.style.setProperty('--model-color', active.color);
            modelSelector.title = hasLiveAIProvider() ? `Current model: ${active.label}` : 'Platform AI is not configured. Local fallback is active.';
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
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.innerHTML = `<span class="quick-tag-icon">${escapeHtml(getOptionIcon(item, step))}</span><span>${escapeHtml(item.label)}</span>`;
            btn.addEventListener('click', () => {
                addUserMessage(item.label);
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
        const isDescriptiveStep = items.some(item => item.desc);

        items.forEach((item, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            const icon = getOptionIcon(item, step);

            if (isDescriptiveStep) {
                btn.className = 'quick-tag setting-card';
                btn.innerHTML = `
                    <div class="card-title"><span class="quick-tag-icon">${escapeHtml(icon)}</span><span>${escapeHtml(item.label)}</span></div>
                    <div class="card-desc">${escapeHtml(item.desc || item.value || '')}</div>
                `;
            } else {
                btn.className = 'quick-tag';
                btn.innerHTML = `<span class="quick-tag-icon">${escapeHtml(icon)}</span><span>${escapeHtml(item.label)}</span>`;
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
        if (/nightmare|hardcore|噩梦|专家|极难/.test(text)) {
            return { enemyHpMultiplier: 1.55, bulletSpeedMultiplier: 1.32, waveInterval: 0.72, bossHp: 2600, lives: 2, shield: 0, invincibleTime: 1.2, enemyBulletBudget: 560 };
        }
        if (/hard|困难|高难/.test(text)) {
            return { enemyHpMultiplier: 1.25, bulletSpeedMultiplier: 1.18, waveInterval: 0.82, bossHp: 2200, lives: 3, shield: 1, invincibleTime: 1.5, enemyBulletBudget: 460 };
        }
        if (/easy|casual|简单|轻松/.test(text)) {
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
            readmeSummary: firstText(rawPlan.readmeSummary, 'Playable bullet-hell P0: vertical movement, enemy waves, power growth, bomb clear, final Boss, and win/fail states.')
        };
    }

    function getBulletHellPlanProvider() {
        return ['gemini', 'qwen'].find(providerId => hasLiveAIProvider(providerId)) || '';
    }

    async function generateBulletHellProductPlan(profile) {
        const planProviderId = getBulletHellPlanProvider();
        if (!planProviderId) {
            throw new Error('No configured Gemini or Qwen model is available for the product-plan step.');
        }
        const planModelId = getPublicModelIdForProvider(planProviderId) || getProviderModelId(planProviderId);
        const planProviderMeta = PROVIDER_META[planProviderId] || PROVIDER_META.custom;
        const response = await aiService.chat([
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
  "readmeSummary": string
}
Lock Game Type to "Bullet Hell / Flying Shooter" and genre to "bullet-hell".`
            },
            {
                role: 'user',
                content: JSON.stringify(profile)
            }
        ], { provider: planProviderId, model: planModelId });
        const jsonMatch = response.content.match(/\{[\s\S]*\}/);
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response.content);
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
        let dna = [
            'Bullet Hell / Flying Shooter',
            normalized.artDirection.summary,
            normalized.setting
        ].filter(Boolean).join(' · ');
        dna = ['Bullet Hell / Flying Shooter', normalized.artDirection.summary, normalized.setting].filter(Boolean).join(' / ');
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
            `<div class="summary-item"><strong>README:</strong> ${escapeHtml(normalized.readmeSummary)}</div>`,
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
                prototypeScope: bulletHellPlanState.plan.readmeSummary
            }, applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, bulletHellPlanState.baseSpec));
            latestGamePlanDraft = buildGamePlanDraftText(latestGamePlan, applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, bulletHellPlanState.baseSpec));
            if (chatInputField) {
                chatInputField.value = latestGamePlanDraft + '\n\n';
                chatInputField.style.height = 'auto';
                chatInputField.style.height = chatInputField.scrollHeight + 'px';
                chatInputField.focus();
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
                mappingTargets: {
                    gameType: 'Bullet Hell / Flying Shooter, genre bullet-hell',
                    artStyle: 'bullet colors, enemy palette, background visuals, UI token, asset prompts',
                    gameSetting: 'game name, enemy names, Boss names, background description',
                    backgroundStory: 'meta.description, README, generated summary',
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
                prototypeScope: plan.readmeSummary
            }, applyBulletHellPlanToGeneratedSpec(plan, bulletHellPlanState.baseSpec));
            latestGamePlanDraft = buildGamePlanDraftText(latestGamePlan, applyBulletHellPlanToGeneratedSpec(plan, bulletHellPlanState.baseSpec));
            if (pendingMessage) pendingMessage.finish(buildBulletHellProductPlanHtml(plan));
            renderBulletHellPlanActions();
        } catch (error) {
            bulletHellPlanState.error = error;
            if (pendingMessage) pendingMessage.remove();
            openEmailQueueAfterBulletHellFailure(error);
        }
    }

    async function askFinalConfirmation() {
        const spec = getCurrentGameSpec();
        if (isBulletHellLocked(spec.background, spec) && !bulletHellPlanState.confirmed) {
            startBulletHellPlanFlow(spec.background, spec);
            return;
        }
        const shapingStartedAt = Date.now();
        const summaryPromise = buildGamePlanSummaryHtml();
        const pendingMessage = addBotMessage('', null, { pending: true, workType: 'shaping' });
        const summaryHtml = await summaryPromise;
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
        if (!hasLiveAIProvider()) {
            analysisState.finalModelMeta = getLocalFallbackMeta();
            return buildFallbackGamePlanHtml();
        }

        try {
            const responseModelMeta = getActiveModelMeta();
            const spec = getCurrentGameSpec();
            const response = await aiService.chat([
                {
                    role: 'system',
                    content: `You are a concise game production designer. Return only valid JSON with keys title, hook, storyPremise, coreLoop, momentToMoment, visualDirection, enemyDesign, progressionPlan, playerFantasy, prototypeScope, risk. Keep every value under 26 words. Make the plan specific enough to drive template configuration, asset prompts, enemies, progression, and win/fail goals. ${getLanguageInstruction()}`
                },
                {
                    role: 'user',
                    content: JSON.stringify(spec)
                }
            ]);
            const jsonMatch = response.content.match(/\{[\s\S]*\}/);
            const plan = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response.content);
            analysisState.finalModelMeta = responseModelMeta;
            return buildAISummaryHtml(plan);
        } catch (error) {
            console.warn('AI game plan failed, using fallback summary:', error);
            showSettingsStatus(`AI game plan failed: ${error.message}. Local fallback is active.`, 'warning');
            analysisState.finalModelMeta = getLocalFallbackMeta();
            return buildFallbackGamePlanHtml();
        }
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
            '飞行射击', '飞机大战', '纵版射击', '横版射击', '弹幕', '弹幕射击', '移动射击'
        ];
        const hit = bulletTerms.find(term => {
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
        const normalizedIntent = normalizeGameTypeForTemplate(intent, spec);
        if (normalizedIntent.locked && !capability.blocked) {
            const template = TEMPLATE_CATALOG.find(item => item.id === 'bullet_hell');
            return {
                canAutoGenerate: true,
                templateId: 'bullet_hell',
                templateLabel: 'Bullet Hell / Flying Shooter',
                templateGenre: 'bullet-hell',
                normalizedGameType: normalizedIntent.normalizedGameType,
                locked: true,
                confidence: 0.98,
                reason: `${normalizedIntent.reason}. Template genre locked to bullet-hell.`,
                fallbackMessage: '',
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
        const canAutoGenerate = Boolean(!capability.blocked && templateMatched && templateCanAutoGenerate);
        const fallbackMessage = capability.blocked
            ? 'This request includes features outside the current P0 HTML5 template whitelist. Please leave an email and we will route it to the manual queue.'
            : (templateMatched && !templateCanAutoGenerate
                ? `Matched ${best.label}, but only Roguelike Survival and Bullet Hell / Flying Shooter are enabled for automatic generation. Please leave an email and we will route it to the manual queue.`
                : 'This idea is outside the current automatic template coverage. Please leave an email and we will route it to the manual queue.');
        return {
            canAutoGenerate,
            templateId: best ? best.id : null,
            templateLabel: best ? best.label : 'No matching template',
            confidence: best ? best.confidence : 0,
            reason: capability.blocked
                ? capability.reason
                : (canAutoGenerate
                    ? `Matched ${best.label} from ${best.hits.slice(0, 4).join(', ')}.`
                    : (templateMatched && !templateCanAutoGenerate
                        ? `Matched ${best.label}, but it is outside the current automatic generation whitelist.`
                        : 'No P0 template reached the 70% confidence threshold.')),
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
                readmeSummary: productPlan ? productPlan.readmeSummary : '',
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
                    autoAttack: isBulletHell ? /auto|自动/i.test(spec.coreGameplay || '') : true,
                    defaultShootMode: isBulletHell ? (/manual|手动|focus|精准/i.test(spec.coreGameplay || '') ? 'manual' : 'auto') : 'auto',
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
            missingRuntimeLogic: [
                'Persist generated GameSpec and email queue to backend storage.',
                'Load and validate external manifest assets before replacing canvas fallbacks.',
                'Compile common GameSpec into full template folders for bullet hell and roguelike runtimes.',
                'Apply ThemeRegistry CSS variables, audio routing, and art prompts to generated assets.'
            ]
        };
    }

    function buildGenerationPlan(spec = getCurrentGameSpec(), productionPlan = latestGamePlan) {
        const sourceSpec = bulletHellPlanState.confirmed && bulletHellPlanState.plan
            ? applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, spec)
            : applyProductionPlanToSpec(spec, productionPlan);
        const decision = matchTemplate(sourceSpec);
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
                prototypeScope: bulletHellPlanState.plan.readmeSummary
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

    function getTemplatePatchProvider() {
        return ['gemini', 'qwen'].find(providerId => hasLiveAIProvider(providerId)) || '';
    }

    function buildLocalTemplatePatchPlan(spec, decision, productionPlan = null) {
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
                autoAttack: isBulletHell ? true : undefined,
                defaultShootMode: isBulletHell ? 'auto' : undefined
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
        const fallbackPlan = buildLocalTemplatePatchPlan(spec, decision, productionPlan);
        const providerId = getTemplatePatchProvider();
        if (!providerId) return fallbackPlan;
        try {
            const modelId = getPublicModelIdForProvider(providerId) || getProviderModelId(providerId);
            const response = await withTimeout(aiService.chat([
                {
                    role: 'system',
                    content: `You are generating a TemplatePatchPlan for an HTML5 game template. Return strict JSON only with these keys:
templateId, userIntentSummary, gameName, settingsPatch, specPatches, manifestPatch, stylePatch, assetPrompts, requiresRuntimeCodePatch, runtimePatchReason, playabilityChecklist.
Rules:
- Use runtime inheritance. Do not request runtime code patches unless template configuration/spec/manifest cannot express the user request.
- Treat productionPlan and productionBrief as the source of truth for this generation. Translate them into config/spec patches, asset prompts, enemies, progression, goals, and visual direction instead of merely naming the matched template.
- For bullet_hell, lock genre to bullet-hell and Game Type to Bullet Hell / Flying Shooter.
- For roguelike_survival, keep wave, XP, upgrades, boss pressure, pause/restart/result runtime inherited.
- assets must be described through manifestPatch or assetPrompts, never direct paths in game.js.
- playabilityChecklist must include waves/progression, enemies/bosses, win/fail/restart, input actions, collision/object limits. ${getLanguageInstruction()}`
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        templateId: decision.templateId,
                        templateLabel: decision.templateLabel,
                        userSpec: spec,
                        productionPlan: fallbackPlan.productionPlan,
                        productionBrief: fallbackPlan.productionBrief || latestGamePlanDraft,
                        templateDefaults: {
                            entry: decision.templateId === 'bullet_hell' ? 'bullet_hell/spec/game.json' : 'Groglike-SOP/template-config.js + spec/*.json',
                            manifest: 'assets/manifest.json',
                            runtimePatchPolicy: 'manual-flow-if-required'
                        }
                    })
                }
            ], { provider: providerId, model: modelId }), AI_ANALYSIS_TIMEOUT_MS);
            const jsonMatch = response.content.match(/\{[\s\S]*\}/);
            const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response.content);
            return {
                ...fallbackPlan,
                ...parsed,
                templateId: decision.templateId,
                productionPlan: fallbackPlan.productionPlan,
                productionBrief: fallbackPlan.productionBrief,
                assetPrompts: { ...fallbackPlan.assetPrompts, ...(parsed.assetPrompts || {}) },
                playabilityChecklist: Array.isArray(parsed.playabilityChecklist) && parsed.playabilityChecklist.length
                    ? parsed.playabilityChecklist
                    : fallbackPlan.playabilityChecklist,
                aiGenerated: true
            };
        } catch (error) {
            console.warn('TemplatePatchPlan AI step failed, using deterministic template patch plan:', error);
            return fallbackPlan;
        }
    }

    async function compileTemplateProject(spec, decision, patchPlan) {
        const response = await fetch(apiUrl('/api/template-project/compile'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                templateId: decision.templateId,
                spec,
                patchPlan
            })
        });
        if (response.status === 404) {
            throw new Error('Template compile API returned 404. Restart the local backend so /api/template-project/compile is available, then retry generation.');
        }
        const data = await parseJsonResponse(response);
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
            throw new Error(patchPlan.runtimePatchReason || 'The selected template needs runtime code changes, so this request must enter the manual production flow.');
        }
        const project = await compileTemplateProject(sourceSpec, plan.decision, patchPlan);
        plan.templatePatchPlan = patchPlan;
        plan.generatedProject = project;
        return plan;
    }

    function buildLocalEnhancedPlan(spec = getCurrentGameSpec(), decision = matchTemplate(spec)) {
        const templateId = decision.templateId || '';
        const isBulletHell = templateId === 'bullet_hell';
        const isRoguelike = templateId === 'roguelike_survival';
        const isTowerDefense = templateId === 'tower_defense';
        const settingName = spec.gameSetting || 'Custom World';
        const artStyle = spec.artStyle || 'Readable arcade';
        const difficulty = spec.difficultyLevel || 'Normal';

        if (isBulletHell) {
            return {
                title: 'Neon Prism Storm',
                hook: 'A precision dodging shooter where the player cuts through corporate signal swarms and dismantles a boss core phase by phase.',
                storyPremise: 'The city is controlled by hostile broadcast towers. The pilot enters the aerial grid to break the transmission chain before it locks the district down.',
                coreLoop: 'Read bullet patterns, slip through narrow lanes, fire focused shots, collect power drops, and spend bomb energy when the screen becomes unsafe.',
                momentToMoment: 'The player alternates between fast movement for repositioning and focus movement for micro-dodging. Each wave teaches a pattern that returns harder in the boss fight.',
                visualDirection: `Use ${artStyle} as the rendering style, with dark streets, high-contrast projectile colors, clean silhouettes, and readable warning effects instead of repeated neon decoration.`,
                enemyDesign: 'Drones use aimed shots, weavers create fan lanes, lotus enemies build ring pressure, and the boss rotates through spiral, flower, and burst phases.',
                progressionPlan: 'Level-up choices increase shot count, spread control, bomb recharge, graze score, or shield capacity without hiding the player hitbox.',
                playerFantasy: 'The player should feel like a calm ace pilot surviving impossible traffic through skill, timing, and disciplined resource use.',
                prototypeScope: `P0 scope: one playable stage in ${settingName}, one enemy wave table, one multi-phase boss, keyboard movement, shooting, pause, win and fail states tuned for ${difficulty}.`
            };
        }

        if (isRoguelike) {
            return {
                title: 'Signal Run Survivors',
                hook: 'A compact survival run where automatic weapons evolve while enemies close in from every direction.',
                storyPremise: `The player is trapped in ${settingName}. Every minute raises pressure, forcing quick upgrade decisions and movement routes through enemy density.`,
                coreLoop: 'Move to survive, let weapons trigger automatically, collect XP, choose upgrades, recover health when possible, and prepare for elite spikes.',
                momentToMoment: 'The player kites swarms, cuts through weak edges, risks dives for XP, and repositions before elites or boss pressure collapses the safe area.',
                visualDirection: `Use ${artStyle} with clear attack telegraphs, bright pickup readability, strong enemy silhouettes, and UI that keeps cooldowns and level progress visible.`,
                enemyDesign: 'Basic enemies create density, elites force directional movement, and the boss tests the current build with higher health and stronger contact pressure.',
                progressionPlan: `${spec.progressionSystem || 'Level-up choices'} should offer weapon growth, passive stat boosts, area control, cooldown reduction, and survivability tradeoffs.`,
                playerFantasy: 'The player should feel like they are building a broken run from small upgrades while barely staying ahead of the swarm.',
                prototypeScope: `P0 scope: one survival arena, escalating spawn rate, XP pickups, three upgrade choices per level, one elite class, one boss objective, and ${difficulty} tuning.`
            };
        }

        if (isTowerDefense) {
            return {
                title: 'Last Line Protocol',
                hook: 'A short defense prototype where the player places towers, reads enemy lanes, and protects a fragile base.',
                storyPremise: `Enemy waves are pushing through ${settingName}. The player has limited build windows to stabilize lanes before pressure compounds.`,
                coreLoop: 'Place towers, watch lanes, upgrade weak points, survive wave spikes, and keep the base alive until the final wave ends.',
                momentToMoment: 'The player reacts to leaks, spends resources on range or damage, and adjusts placement to cover bends and enemy clusters.',
                visualDirection: `Use ${artStyle} with clear lane contrast, readable tower ranges, distinct projectile colors, and compact HUD feedback.`,
                enemyDesign: 'Runners test early coverage, armored units punish low damage, and fast units expose path gaps.',
                progressionPlan: `${spec.progressionSystem || 'Upgrade choices'} should unlock stronger towers, temporary buffs, and repair decisions between waves.`,
                playerFantasy: 'The player should feel like a tactical operator turning a weak defense into a controlled kill zone.',
                prototypeScope: `P0 scope: one path, two tower types, several enemy waves, base health, basic upgrades, and ${difficulty} tuning.`
            };
        }

        return {
            title: `${settingName} Prototype`,
            hook: 'A custom game idea that needs manual production because it falls outside the current automatic template set.',
            storyPremise: spec.background || `A custom concept set in ${settingName}.`,
            coreLoop: spec.coreGameplay || 'The core loop still needs manual design clarification.',
            momentToMoment: 'The team should clarify player verbs, failure pressure, session length, and what makes each decision interesting.',
            visualDirection: `Use ${artStyle}, but lock the exact asset style before production so characters, UI, effects, and environments stay consistent.`,
            enemyDesign: spec.mainChallenge || 'Challenge design needs manual breakdown.',
            progressionPlan: spec.progressionSystem || 'Progression needs manual breakdown.',
            playerFantasy: 'The desired player fantasy needs a more specific design pass before automatic generation.',
            prototypeScope: 'Manual queue scope: clarify mechanics, pick a supported runtime or create a new template, then generate a testable prototype.'
        };
    }

    function buildFallbackGamePlanHtml() {
        const spec = getCurrentGameSpec();
        const decision = matchTemplate(spec);
        const plan = buildLocalEnhancedPlan(spec, decision);
        latestGamePlan = normalizeGamePlanForGeneration(plan, spec);
        latestGamePlanDraft = buildGamePlanDraftText(latestGamePlan, spec);
        return [
            '<div class="selection-summary">',
            buildEnhancedPlanHtml(latestGamePlan),
            '</div>'
        ].join('');
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
        }
    ];
    const GAME_EDIT_CATEGORIES = GAME_EDIT_MODULES.flatMap(module => module.sections);

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
        const cards = Math.min(12, Math.max(3, Number(item.count) || 3));
        return `
            <div class="media-thumb-grid" aria-hidden="true">
                ${Array.from({ length: cards }).map(() => `
                    <div class="media-thumb-card">
                        <span class="media-thumb-art"></span>
                        <strong>player_soldier_idle</strong>
                        <span>⋮</span>
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

    function buildCodePanelHtml() {
        return `
            <div class="code-workspace-panel">
                <div class="code-file-tree">
                    <span class="code-tree-root">src</span>
                    <button type="button" class="code-file active" data-edit-item="code.html" data-edit-category-id="code" data-edit-type="code" data-edit-title="code.html">code.html</button>
                    <button type="button" class="code-file" data-edit-item="code.config" data-edit-category-id="code" data-edit-type="code" data-edit-title="config">config</button>
                    <button type="button" class="code-file" data-edit-item="code.lib" data-edit-category-id="code" data-edit-type="code" data-edit-title="lib">lib</button>
                    <button type="button" class="code-file" data-edit-item="code.assetMap" data-edit-category-id="code" data-edit-type="code" data-edit-title="asset_map">asset_map</button>
                </div>
                <pre class="code-preview" aria-label="Generated code preview"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Neon Dungeon Roguelike Survival&lt;/title&gt;
  &lt;style&gt;
    :root {
      --player-speed: 220;
      --fire-rate: 0.55s;
      --enemy-speed: 1;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;canvas id="game"&gt;&lt;/canvas&gt;
  &lt;script src="./game.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
            </div>
        `;
    }

    function buildGameEditSidebarHtml() {
        return `
            <div class="game-edit-tabs" role="tablist" aria-label="Game edit modules">
                ${GAME_EDIT_MODULES.map(module => `
                    <button type="button" class="game-edit-tab${module.id === 'media' ? ' active' : ''}" data-edit-module-tab="${escapeHtml(module.id)}">${escapeHtml(module.label)}</button>
                `).join('')}
            </div>
            ${GAME_EDIT_MODULES.map(module => `
                <div class="game-edit-module${module.id === 'media' ? ' active' : ''}" data-edit-module="${escapeHtml(module.id)}">
                    ${module.id === 'code'
                        ? buildCodePanelHtml()
                        : module.sections.map((section, index) => buildEditSectionHtml(section, index, module.id === 'media' ? 'visual' : (module.id === 'stats' ? 'combat' : ''))).join('')}
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
            '<div class="generated-game-workspace" data-game-workspace>',
            '<aside class="change-history-sidebar" aria-label="Game edit history">',
            '<button type="button" class="workspace-panel-toggle workspace-panel-toggle-left" data-workspace-panel-toggle="history" aria-label="Toggle change history" aria-expanded="false">›</button>',
            '<div class="workspace-panel-head">',
            '<span>Change History</span>',
            '<small>Click a record to reuse its prompt.</small>',
            '</div>',
            '<div class="change-history-list" data-edit-history-list>',
            '<div class="change-history-empty" data-edit-history-empty>No edits yet. Choose an item on the right, then describe the change in the bottom chat input.</div>',
            '</div>',
            '</aside>',
            '<main class="game-preview-column">',
            '<div class="playable-shell">',
            '<button type="button" class="mobile-game-preview-toggle" data-game-action="mobile-preview-toggle" aria-expanded="false">Open game preview</button>',
            '<div class="game-preview-viewport">',
            previewMarkup,
            '</div>',
            '<div class="game-preview-chat-panel" data-preview-chat-panel>',
            '<div class="preview-chat-title-row">',
            `<strong>${escapeHtml(generated.meta.gameName)}</strong>`,
            '<span aria-hidden="true">v</span>',
            '</div>',
            `<p class="preview-chat-lead">${escapeHtml(generated.meta.description || 'Create a playable mini-game and open the post-generation editing workspace.')}</p>`,
            '<ul class="preview-chat-points">',
            `<li>${escapeHtml(generated.flow.winCondition.description)}</li>`,
            '<li>Use the bottom prompt to request visual, media, rule, or runtime changes.</li>',
            '</ul>',
            '<div class="preview-chat-user-bubble">Ok, create it!</div>',
            `<div class="preview-chat-time">${escapeHtml(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))}</div>`,
            `<p class="preview-chat-assistant-note">I've created <strong>${escapeHtml(generated.meta.gameName)}</strong> as a playable canvas preview. Select an editable target from the side panel, describe the change in the bottom prompt, and I will apply the update to the current run.</p>`,
            '<p class="preview-chat-assistant-note">Every edit you make will appear here as a conversation record, while the left history keeps reusable prompts for quick follow-up.</p>',
            '<div class="preview-chat-edit-status" data-workspace-edit-context>Editing: Visual Style / map/main</div>',
            '</div>',
            '<div class="game-preview-actions">',
            '<button type="button" class="game-preview-btn" data-game-action="restart">Restart</button>',
            '<button type="button" class="game-preview-btn" data-game-action="pause">Pause</button>',
            '</div>',
            '</div>',
            '</main>',
            '<aside class="game-edit-sidebar" aria-label="Game edit tools">',
            '<button type="button" class="workspace-panel-toggle workspace-panel-toggle-right" data-workspace-panel-toggle="edit" aria-label="Toggle game edit sidebar" aria-expanded="false">‹</button>',
            '<div class="workspace-panel-head">',
            `<span>${project ? 'Project Resource Sidebar' : 'Game Edit Sidebar'}</span>`,
            `<small>${project ? 'Manifest assets, prompts, config and validation.' : 'Choose what to edit, then describe how.'}</small>`,
            '</div>',
            project ? buildProductionAssetSidebarHtml(project) : buildGameEditSidebarHtml(),
            '</aside>',
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

    function buildGeneratedSpecHtml(plan) {
        const decision = plan.decision || matchTemplate(getCurrentGameSpec());
        const project = plan.generatedProject || null;
        const generated = plan.generatedSpec || buildGeneratedGameSpec({
            gameType: 'Roguelike Survival',
            artStyle: 'Cyberpunk',
            gameSetting: 'Neon Dungeon',
            background: 'Generated local preview for the AI game editing workspace.',
            coreGameplay: 'Move, attack, dodge, and survive waves.',
            playerGoal: 'Clear the prototype run.',
            mainChallenge: 'Escalating enemy pressure.',
            progressionSystem: 'Level-up choices.',
            difficultyLevel: 'Normal',
            outputPackage: { mode: 'fixed', preview: true, exportProjectFolder: true }
        }, decision);
        return [
            '<div class="generation-result">',
            `<div class="generation-status">${escapeHtml(t('autoPath'))}</div>`,
            `<div class="generation-title">${escapeHtml(t('gameSpecReady'))}</div>`,
            `<div class="generation-meta"><span>${escapeHtml(decision.templateLabel)}</span><span>${Math.round(decision.confidence * 100)}% match</span></div>`,
            buildProductionPlanAppliedHtml(plan),
            '<div class="generated-workspace-topbar">',
            '<div class="generated-web-card">',
            '<div class="generated-web-main">',
            '<span class="generated-web-icon" aria-hidden="true">🌐</span>',
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
        const wantsLower = /lower|reduce|slower|less|decrease|weaker|降低|减少|慢|弱/.test(text);
        const wantsHigher = /higher|increase|faster|more|raise|stronger|提高|增加|快|强/.test(text);
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
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'change-history-record';
        button.dataset.historyPrompt = record.prompt;
        button.innerHTML = `
            <span class="change-record-top">
                <strong>${escapeHtml(record.title)}</strong>
                <small>${escapeHtml(record.category)}</small>
            </span>
            <span class="change-record-prompt">${escapeHtml(record.prompt)}</span>
            <span class="change-record-meta">${escapeHtml(record.summary)}</span>
        `;
        button.addEventListener('click', () => {
            const input = chatInputField;
            if (!input) return;
            input.value = record.prompt;
            input.focus();
            input.dispatchEvent(new Event('input'));
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

    let activeGameEditSubmitCleanup = null;

    function initGameEditWorkspace(container, plan) {
        const workspace = container.querySelector('[data-game-workspace]');
        if (!workspace) return;
        document.body.classList.add('game-edit-workspace-active');
        const historySidebar = workspace.querySelector('.change-history-sidebar');
        const editSidebar = workspace.querySelector('.game-edit-sidebar');
        if (historySidebar && historySidebar.parentElement !== document.body) {
            document.body.appendChild(historySidebar);
            historySidebar.classList.add('workspace-side-panel');
            workspace.__historySidebar = historySidebar;
        }
        if (editSidebar && editSidebar.parentElement !== document.body) {
            document.body.appendChild(editSidebar);
            editSidebar.classList.add('workspace-side-panel');
            workspace.__editSidebar = editSidebar;
        }
        const topbar = container.querySelector('.generated-workspace-topbar');
        const filesCard = container.querySelector('.generated-workspace-files-card');
        const auxPanel = document.createElement('aside');
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
        const historyToggle = historySidebar ? historySidebar.querySelector('[data-workspace-panel-toggle="history"]') : null;
        const editToggle = editSidebar ? editSidebar.querySelector('[data-workspace-panel-toggle="edit"]') : null;
        if (historyToggle) {
            historyToggle.addEventListener('click', () => {
                const open = !historySidebar.classList.contains('open');
                historySidebar.classList.toggle('open', open);
                historyToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        }
        if (editToggle) {
            editToggle.addEventListener('click', () => {
                const open = !editSidebar.classList.contains('open');
                editSidebar.classList.toggle('open', open);
                editToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        }
        activeGameCleanups.push(() => {
            if (historySidebar && historySidebar.parentElement) historySidebar.remove();
            if (editSidebar && editSidebar.parentElement) editSidebar.remove();
            if (auxPanel && auxPanel.parentElement) auxPanel.remove();
            document.body.classList.remove('game-edit-workspace-active');
        });
        const context = workspace.querySelector('[data-workspace-edit-context]');
        const editRoot = workspace.__editSidebar || workspace;
        let selectedItem = findGameEditItem('visual.mapMain');

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
        }

        function selectItem(itemId) {
            selectedItem = findGameEditItem(itemId) || selectedItem;
            editRoot.querySelectorAll('[data-edit-item]').forEach(button => {
                button.classList.toggle('selected', button.dataset.editItem === itemId);
            });
            if (context && selectedItem) {
                context.textContent = `Editing: ${selectedItem.categoryLabel} / ${selectedItem.title}`;
            }
            if (chatInputField && selectedItem) {
                chatInputField.placeholder = `Describe how to edit ${selectedItem.title}...`;
            }
            closeMobilePreviewForChat();
        }

        function applyWorkspacePrompt(prompt) {
            if (!prompt || !selectedItem) return false;
            const runtime = container.__gameEditRuntime;
            const currentConfig = runtime && runtime.getConfig ? runtime.getConfig() : {};
            let summary = 'Edit request recorded for the current generated game.';
            const edit = { itemId: selectedItem.id, prompt };

            if (selectedItem.id === 'art.player') {
                edit.assetUrl = createWorkspaceAssetDataUrl(prompt, 'Player');
                summary = 'Player image preview updated in the canvas runtime.';
            } else if (selectedItem.id === 'combat.fireRate') {
                edit.value = inferMechanicValue(selectedItem.id, prompt, currentConfig.fireRate || 0.55);
                summary = `Fire rate cooldown set to ${edit.value.toFixed(2)}s.`;
            } else if (selectedItem.id === 'combat.damage') {
                edit.value = inferMechanicValue(selectedItem.id, prompt, currentConfig.damage || 18);
                summary = `Damage set to ${Math.round(edit.value)}.`;
            } else if (selectedItem.id === 'combat.enemySpeed') {
                edit.value = inferMechanicValue(selectedItem.id, prompt, currentConfig.enemySpeedMultiplier || 1);
                summary = `Enemy speed multiplier set to ${edit.value.toFixed(2)}x.`;
            } else if (selectedItem.id === 'audio.bgm') {
                summary = 'BGM edit recorded. Real audio generation endpoint is the next integration step.';
            }

            if (runtime && runtime.applyEdit) runtime.applyEdit(edit);
            workspace.__editVersion = (workspace.__editVersion || 0) + 1;
            addWorkspaceHistoryRecord(workspace, {
                title: selectedItem.title,
                category: selectedItem.categoryLabel,
                prompt,
                summary
            });
            addPreviewChatRecord(workspace, {
                title: selectedItem.title,
                prompt,
                summary
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
                chatInputField.value = '';
                chatInputField.style.height = 'auto';
                chatInputField.dispatchEvent(new Event('input'));
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

        if (activeGameEditSubmitCleanup) activeGameEditSubmitCleanup();
        const onSendClick = event => submitFromBottomInput(event);
        const onInputKeydown = event => {
            if (event.key === 'Enter' && !event.shiftKey) submitFromBottomInput(event);
        };
        if (chatSendBtn) chatSendBtn.addEventListener('click', onSendClick, true);
        if (chatInputField) chatInputField.addEventListener('keydown', onInputKeydown, true);
        activeGameEditSubmitCleanup = () => {
            if (chatSendBtn) chatSendBtn.removeEventListener('click', onSendClick, true);
            if (chatInputField) chatInputField.removeEventListener('keydown', onInputKeydown, true);
        };

        selectItem(selectedItem.id);
    }

    function mountGeneratedGamePreview(container, plan) {
        const previewFrame = container.querySelector('.template-preview-frame');
        if (previewFrame) {
            const restartBtn = container.querySelector('[data-game-action="restart"]');
            const pauseBtn = container.querySelector('[data-game-action="pause"]');
            const previewBtn = container.querySelector('[data-game-action="preview"]');
            const mobilePreviewToggle = container.querySelector('[data-game-action="mobile-preview-toggle"]');
            const playableShell = container.querySelector('.playable-shell');
            if (restartBtn) restartBtn.addEventListener('click', () => {
                previewFrame.src = previewFrame.src;
            });
            if (pauseBtn) {
                pauseBtn.textContent = 'Focus';
                pauseBtn.addEventListener('click', () => previewFrame.focus());
            }
            if (previewBtn) previewBtn.addEventListener('click', () => {
                const url = previewBtn.dataset.previewUrl || previewFrame.src;
                if (url) window.open(url, '_blank', 'noopener');
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
                hp: isBulletHell ? (enemyConfig ? enemyConfig.hp : 22) : 30,
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
                spawnTimer = Math.max(0.35, isBulletHell ? 0.85 : 1.15 - state.time * 0.006);
            }

            attackTimer -= dt;
            if (!isTowerDefense && attackTimer <= 0) {
                const target = state.boss || nearestEnemy(player.x, player.y, isBulletHell ? 420 : 160);
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
        const previewBtn = container.querySelector('[data-game-action="preview"]');
        const mobilePreviewToggle = container.querySelector('[data-game-action="mobile-preview-toggle"]');
        const playableShell = container.querySelector('.playable-shell');
        const mobilePreviewMedia = window.matchMedia ? window.matchMedia('(max-width: 720px)') : null;
        container.__gameEditRuntime = {
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
            },
            getConfig() {
                return {
                    fireRate: runtimeConfig.fireRate,
                    damage: runtimeConfig.damage,
                    enemySpeedMultiplier: runtimeConfig.enemySpeedMultiplier,
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
        if (previewBtn) previewBtn.addEventListener('click', () => {
            canvas.scrollIntoView({ block: 'center', behavior: 'smooth' });
            canvas.focus();
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
        const spec = bulletHellPlanState.confirmed && bulletHellPlanState.plan
            ? applyBulletHellPlanToGeneratedSpec(bulletHellPlanState.plan, getCurrentGameSpec())
            : getCurrentGameSpec();
        const generationPlan = buildGenerationPlan(spec);
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

        // 鐩存帴杩涘叆鐢熸垚娴佺▼锛屾枃妗堝凡鍦?askFinalConfirmation 涓睍绀鸿繃
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

        chatLanguage = 'en';
        inspireProfileState = createInspireProfileState();
        chatStep = 1;
        chatSelections = createEmptySelections();
        chatShown = createChatTracking(() => new Set());
        chatCurrent = createChatTracking(() => []);
        latestGamePlanDraft = '';
        latestGamePlan = null;
        resetBulletHellPlanState();
        analysisState = {
            active: false,
            ...createEmptySelections(),
            background: null,
            processing: false,
            revisionMode: false,
            finalModelMeta: null,
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

    function openEditWorkspaceDemo() {
        openChatView();
        chatLanguage = 'en';
        const spec = {
            gameType: 'Roguelike Survival',
            artStyle: 'Cyberpunk',
            gameSetting: 'Neon Dungeon',
            background: 'A neon dungeon survival game where the player clears waves, gathers XP, and unlocks unstable spells.',
            coreGameplay: 'Move, auto-attack nearby enemies, dodge pressure, collect XP, and survive escalating waves.',
            playerGoal: 'Survive the timed prototype run and clear enough enemies to complete the stage.',
            mainChallenge: 'Escalating enemy pressure, limited health, and increasingly dense waves.',
            progressionSystem: 'Level-up choices improve attack speed, damage, range, and survivability.',
            difficultyLevel: 'Normal',
            outputPackage: {
                mode: 'fixed',
                preview: true,
                exportProjectFolder: true
            }
        };
        const plan = buildGenerationPlan(spec);
        addUserMessage('Create a playable mini-game and open the post-generation editing workspace.');
        regTimeout(() => {
            showAutoGenerationResult(plan);
        }, 120);
    }

    const startupParams = new URLSearchParams(window.location.search);
    const shouldAutoOpenWorkspaceDemo = startupParams.get('demo') === 'edit-workspace'
        || startupParams.get('workspace') === 'edit'
        || (window.location.port === '5502' && window.location.pathname === '/' && !window.location.search);
    if (shouldAutoOpenWorkspaceDemo) {
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
    loadPlatformModels();

    refreshAdminSession();

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
                    prompt: savedPrompt,
                    subject: 'New Droi AI Waitlist Submission (Inspire Me)'
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
                            addBotMessage(`<div class="selection-summary"><div class="summary-title">Template generation needs review</div><div class="summary-item">${escapeHtml(error.message || 'Template compile failed. Please route this request to the manual production flow.')}</div></div>`);
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
            star.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 36}px`);
            star.style.setProperty('--drift-y', `${(Math.random() - 0.5) * 24}px`);

            // 闅忔満鍔ㄧ敾鏃堕暱鍜屽欢杩?
            const duration = Math.random() * 4 + 3; // 3s - 7s
            const delay = Math.random() * 5; // 0s - 5s
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `-${delay}s`; // 璐熷欢杩熻鍔ㄧ敾鐩存帴浠ヤ笉鍚岃繘搴﹀紑濮?

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

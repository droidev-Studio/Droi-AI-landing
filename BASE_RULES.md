# Droi AI 基础规则 v0.2

本规则合并了 `GAME_BUILD_SOP.md`、`游戏主题风格系统_产品文档_v1.0.md`，并参考了 `bullet_hell` 与 `Groglike-SOP` 两套基础游戏架构。当前阶段目标不是覆盖所有游戏类型，而是把一句自然语言需求稳定转换为可验证的 `GameSpec`，再进入可玩预览或邮箱兜底队列。

## 1. P0 闭环

用户输入一句自然语言后，必须走完以下链路：

1. `Prompt -> TemplateMatch`
2. `CapabilityGate -> CommonGameSpec`
3. `ThemeStyleLock -> RuntimePreview`
4. 自动路径失败时进入 `EmailFallback`

任何未命中模板、超出 P0 能力、缺少资产或校验失败的情况，都不能卡死或崩溃，必须给出明确兜底说明并进入邮箱收集。

## 2. P0 类型边界

Phase 1 只优先支持 2D HTML5 action game 原型：

- `roguelike_survival`：参考 `Groglike-SOP`，核心是自动武器、刷怪、经验拾取、升级选项、时间线和 Boss。
- `bullet_hell`：参考 `bullet_hell`，核心是移动闪避、弹幕、擦弹、Bomb、Boss 阶段和投射物预算。
- `tower_defense`：当前本地 P0 预览模板，核心是守点、路径、塔攻击和波次压力。

暂不自动生成：3D、多人联网、MMO、大型开放世界、VR/AR、链游、服务端权威同步、复杂编辑器。命中这些需求时进入邮箱兜底。

## 3. 架构分层

生成游戏的文件与运行时遵循固定优先级：

1. `GameSettings.js`：调参最高优先级，放 DEBUG、CORE_RULES、PLAYER、WEAPONS、ENEMIES、BOSSES、DROPS、HUD、FEEL、AUDIO、PERFORMANCE。
2. `spec/*.json`：结构化内容，放 game、waves、progression、levels、entities、weapons、enemies、balance、effects。
3. `assets/manifest.json`：只负责资源映射，不放玩法规则。
4. runtime code：只实现系统，不硬编码可配置内容。
5. UI/CSS/theme：只负责界面和表现，不反向污染玩法数据。

启动顺序固定为：`GameSettings -> GameSpec -> AssetManifest -> ThemeRegistry -> RuntimeSystems -> CanvasPreview`。

## 4. 公共 GameSpec 格式

所有模板最终收敛为同一个公共结构。bullet hell 可以来自单一 `spec/game.json`，roguelike 可以来自多个 `spec/*.json`，但进入 Droi AI 后都必须归一化为：

```json
{
  "meta": {
    "gameName": "string",
    "gameType": "roguelike|bullet-hell|tower-defense",
    "version": "p0-preview",
    "description": "string",
    "templateConfidence": 0.0,
    "sourceArchitectures": ["bullet_hell|Groglike-SOP"]
  },
  "template": {
    "id": "roguelike_survival",
    "label": "Roguelike Survival",
    "confidence": 0.0,
    "specMode": "single-game-spec|module-spec",
    "gameplayPillars": []
  },
  "engine": {
    "renderer": "canvas",
    "fixedDeltaTime": 0.0166667,
    "maxEntityCount": 800,
    "mapSize": { "width": 1280, "height": 720 },
    "runtimeProfile": {}
  },
  "settings": {
    "priority": ["GameSettings", "GameSpec", "AssetManifest", "RuntimeFallbacks"],
    "debug": {},
    "coreRules": {},
    "performance": {}
  },
  "theme": {
    "id": "cyberpunk_neon",
    "label": "Cyberpunk Neon",
    "styleLock": {},
    "uiTokens": {},
    "audio": {},
    "balanceMultipliers": {},
    "artPromptRules": []
  },
  "input": {
    "devices": ["keyboard", "pointer", "touch"],
    "actions": {}
  },
  "assets": {
    "manifestPath": "assets/manifest.json",
    "fallback": "canvas",
    "requiredGroups": ["player", "enemies", "weapons", "effects", "ui", "audio"],
    "namingRules": {}
  },
  "content": {
    "modules": [],
    "map": {},
    "player": {},
    "weapons": {},
    "enemies": {},
    "projectiles": {},
    "waves": []
  },
  "flow": {
    "phases": [],
    "winCondition": {},
    "fallback": {}
  },
  "balance": {},
  "ui": {},
  "qualityGates": {}
}
```

## 5. 两套参考架构映射

`bullet_hell` 映射：

- `spec/game.json -> meta/coreRules/map/player/playerWeapons/enemyBulletTypes/enemyTypes/waves/bosses`
- `spec/schema.json -> CommonGameSpec schemaValidation`
- `assets/manifest.json -> assets.requiredGroups/player/enemies/bosses/pickups/bullets/effects/ui/audio`
- `GameSettings.js -> settings.debug/coreRules/player/weapons/drops/enemies/bosses/feel/audio/performance`
- runtime 系统：`InputSystem`、`PlayerControlSystem`、`PlayerShootSystem`、`EnemySpawnSystem`、`BulletPatternSystem`、`CollisionSystem`、`PickupSystem`、`HudSystem`、`RenderSystem`

`Groglike-SOP` 映射：

- `spec/minimal.json -> meta/map/systems/initialEntities/flow`
- `spec/weapons.json -> content.weapons`
- `spec/enemies.json -> content.enemies`
- `spec/waves.json -> content.waves/flow`
- `spec/balance.json -> balance/settings.performance`
- `spec/effects.json -> content.effects`
- `assets/manifest.json -> assets manifest with weapons/player/enemies/bosses/skills/pickups/effects/ui/tiles/styleProofs`
- `spec/schema.js -> schemaValidation and effect whitelist`
- runtime 系统：`AssetRuntime`、`ConfigManager`、`InputController`、`RewardSystem`、`ProgressionSystem`、`SpawnDirector`、`SystemPipeline`、`SpatialHashGrid`、`SaveManager`

## 6. 主题风格锁规则

主题系统不是单纯换色，而是同时锁定美术、UI、音频和数值倾向。每个主题必须包含：

- `meta`：主题名称、描述、兼容游戏类型、版本、作者、是否高级主题。
- `styleLock`：preset、anchorImage、fingerprint、promptOverrides。
- `ui.tokens`：颜色、字体、圆角、阴影、组件皮肤、动效。
- `audio`：BGM、SFX、默认音量。
- `balance`：敌人压力、玩家容错、经济收益、节奏修正。
- `compatibleGameTypes`：声明可用于哪些模板。

首批主题池：

- `animal_island`：温暖、柔和、手作、低压力，适合轻松生存或休闲策略。
- `three_kingdoms_ink`：水墨、历史战场、强剪影，适合 roguelike 生存与武器升级。
- `cyberpunk_neon`：霓虹、高饱和、弹幕清晰，适合 bullet hell。
- `dark_gothic`：深色、哥特、压迫感，适合高难生存。
- `pixel_retro`：像素、街机、低分辨率清晰反馈，适合快速原型。

生成资产时必须围绕同一个 `styleLock.fingerprint` 生产 player、enemy、weapon、effect、pickup、tile、UI，不能每个资源单独漂移风格。资产未生成完成时允许 canvas fallback，但需要在 GameSpec 中标记。

## 7. 运行时硬规则

- 使用 `deltaTime` 或 fixed timestep，不用 `setTimeout` 写核心玩法逻辑。
- 输入只通过 action 抽象，不在玩法系统里直接读 DOM。
- update 循环中不做 DOM query。
- 生成实体必须走对象池或预算上限。
- 碰撞必须有 layer/matrix，不能散落在各系统里。
- 资源只能从 manifest 读取，不能绕过 manifest 直接写路径。
- 所有模板必须有 state machine：`boot/loading/menu/playing/paused/game_over/complete`。
- fallback rendering 只能用于资产缺失、加载失败或 P0 预览。

## 8. 当前还需要补充的逻辑

- CommonGameSpec 的独立 schema 文件和前端校验器。
- 从公共 GameSpec 编译到完整模板目录的导出器。
- 后端持久化：保存 prompt、GameSpec、邮箱兜底队列、生成状态。
- ThemeRegistry 和 ThemeApplier：真正应用 CSS variables、音频、风格锁 prompt。
- AssetManifest 校验：路径存在性、尺寸、锚点、用途、缺失 fallback。
- bullet hell 的真实弹幕模式编译器：spiral、flower、burst、aimed、ring、fan。
- roguelike 的升级池、掉落、奖励、被动技能、武器等级 patch 的完整映射。
- 运行时质量门：自动启动、移动、攻击、暂停、失败/胜利状态 smoke test。
- 后台模型路由：把 GPT/Gemini/Claude/Grok 的模型选择与生成任务队列绑定。
- 导出结构：生成 `index.html/game.css/game.js/GameSettings.js/spec/assets/manifest.json` 的项目包。

## 9. 验收标准

P0 完成度以闭环为准：

- 一句自然语言输入必须得到自动路径或邮箱兜底路径。
- 自动路径必须显示公共 `GameSpec`，并启动一个可交互 canvas 预览。
- 未命中、超范围、资源缺失、schema 失败不能崩溃。
- 主题风格必须在 GameSpec 中有 `theme.styleLock` 和 `uiTokens`。
- GameSpec 必须保留可追溯字段：template、sourceArchitectures、qualityGates。

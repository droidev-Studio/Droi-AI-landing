# Droi AI 网页总 PRD

## 1. 产品定位

Droi AI 是一个面向普通玩家和游戏创作者的 AI 游戏生成网页。用户通过自然语言描述游戏想法，系统自动整理需求、匹配后台已发布的游戏模板知识库和美术 Skill，并生成一个可直接试玩的 HTML5 Canvas 游戏预览。

产品第一阶段不追求覆盖所有游戏类型，而是优先把少数已验证模板做成稳定闭环。

当前 P0 自动生成范围：

- 飞行射击 / 弹幕射击
- 肉鸽生存 / 割草生存
- 2D HTML5 Canvas 浏览器游戏

当前不自动生成：

- 3D
- 多人联网
- MMO
- 大型开放世界
- 原生 App
- 链游
- 复杂服务端运行时

超出范围时进入人工队列或提示用户改写成 P0 支持类型。

## 2. 核心目标

- 用户一句话描述游戏，就能进入 AI 辅助生成流程。
- AI 必须真实调用后台模型接口，不只做前端假逻辑。
- 后台模板包作为“游戏知识库”参与路由，而不是只靠包名或写死规则。
- 美术资源 Skill 作为独立风格层参与生成，但不把 React/UI 组件直接塞进 Canvas 游戏。
- 生成结果必须输出统一的四域 `assets/` 架构，便于网页数值表和资源面板识别。
- 玩家端不暴露 `.droi/` 内部规则文档。

## 3. 目标用户

- 普通玩家：输入想法，快速看到可试玩游戏。
- 游戏创作者：通过模板和美术 Skill 快速生成 P0 原型。
- 管理员/运营：上传模板包、美术 Skill、配置模型、维护 Showcase。
- 内部开发者：扩展模板知识库、生成规则和资源架构。

## 4. 用户流程

### 4.1 玩家生成流程

```text
打开网页
  -> 输入游戏想法
  -> AI 分析需求
  -> AI 匹配游戏模板知识库
  -> AI 匹配美术 Skill
  -> 用户确认
  -> AI 生成 GamePlan
  -> AI 生成 TemplatePatchPlan
  -> 后端 compile
  -> 展示可试玩预览
```

### 4.2 Inspire Me 流程

```text
点击 Inspire Me
  -> 用户选择偏好
  -> 系统整理 GameSpec
  -> AI 校验模板命中
  -> 进入生成流程
```

### 4.3 失败兜底流程

触发条件：

- 没有命中已发布模板
- 命中模板但当前不支持自动编译
- 超出 P0 能力
- AI JSON schema 不合规
- 后端 compile 失败
- Art Skill 安装失败

处理方式：

- 明确展示自动生成被截断的原因。
- 终止当前自动生成流程，不继续假装生成。
- 引导用户填写邮箱。
- 告知用户游戏将在 15 个工作日内生成完成，并发送到填写的邮箱。
- 不允许页面卡死、静默失败或只显示技术错误。

## 5. 后台管理需求

### 5.1 模型配置

后台支持配置多个模型 Provider：

- Qwen
- Gemini
- OpenAI
- Anthropic

当前默认建议：

- `qwen-plus` 作为默认生成模型。
- 不默认使用慢模型跑复杂流程。

### 5.2 Google 管理员登录

后台只允许管理员登录。登录状态使用后端签名 Cookie 缓存 2 小时。

要求：

- Cookie `HttpOnly`
- 后端签名防篡改
- 退出登录清空 Cookie
- Cloud Run 重启后 2 小时内仍保持登录

### 5.3 Game Templates / 游戏知识库

后台 Template 页面用于上传和发布游戏模板包。

模板包内部优先读取：

```text
.droi/DROI_TEMPLATE.md
```

兼容 fallback：

```text
DROI_TEMPLATE.md
README.md
```

可选读取：

```text
.droi/GAME_RULES.md
.droi/AI_USAGE.md
.droi/DESIGN_PROMPT.md
.droi/MANIFEST.md
```

后台保存：

- `knowledgeSummary`
- `keywords`
- `gameTypeLabel`
- `capabilityTags`
- `routingHints`
- `assetArchitecture`

只有 `published` 且 `valid` 的模板参与 AI 路由。

#### 5.3.1 Markdown Authoring Standard / 模型稳定调用写法

模板知识 Markdown 必须采用“英文结构 + 英文核心关键词 + 中文解释补充”的写法。  
原因：英文标题和关键词更适合后端解析、AI 路由和长期维护；中文用于表达业务语义，但不能替代英文关键词。

必须遵守：

- 文件名使用英文固定名：`.droi/DROI_TEMPLATE.md`、`.droi/GAME_RULES.md`、`.droi/AI_USAGE.md`、`.droi/DESIGN_PROMPT.md`、`.droi/MANIFEST.md`。
- 章节名使用英文固定标题，可追加中文说明，但英文标题不能缺失。
- `Routing Keywords` 必须英文优先；中文关键词放到 `Chinese Keywords` 作为补充。
- `Game Type Label`、`Capability Tags`、`Routing Hints` 使用英文稳定字段。
- 中文解释只写在说明段落里，不作为唯一匹配依据。

推荐入口模板：

```md
# DROI_TEMPLATE

## Knowledge Summary
中文说明这个模板适合什么游戏、核心玩法、运行时限制和生成边界。

## Game Type Label
Bullet Hell / Flying Shooter

## Routing Keywords
- bullet hell
- flying shooter
- shoot em up
- shmup
- vertical shooter
- side scrolling shooter
- dodge bullets
- enemy waves
- boss phases
- player aircraft
- projectile patterns

## Chinese Keywords
- 飞行射击
- 弹幕
- 纵版射击
- 横版射击
- Boss 战

## Capability Tags
- HTML5 Canvas
- 2D shooter
- enemy waves
- boss phases
- pickups
- HUD

## Routing Hints
- shouldMatchWhen: 用户想做 flying shooter、bullet hell、shmup、dodge bullets、boss phases。
- shouldNotMatchWhen: 用户想做 roguelike survival、tower defense、card game、business simulation、pure platformer。

## Generation Notes
中文说明 AI 使用模板时必须遵守的规则，例如只改配置、不绕过 manifest、不生成旧 assets 路径。
```

### 5.4 Art Skills / 美术资源 Skills

后台 Art Skills 用于注册或上传美术风格能力。

示例：

```text
guokaigdg/animal-island-ui
```

Art Skill 只影响：

- 美术方向
- UI token
- 资源 prompt
- stylePatch
- assets/manifest.json
- generation-report.json

P0 不直接把 React 组件导入 Canvas 游戏。

## 6. AI 路由设计

AI 分析结果应包含：

```json
{
  "generationRuleDecision": {},
  "gameTemplateDecision": {},
  "templateDecision": {},
  "artSkillDecision": {},
  "capabilityDecision": {}
}
```

字段含义：

- `generationRuleDecision`：命中的通用生成规则层。
- `gameTemplateDecision`：根据模板知识库命中的游戏模板。
- `templateDecision`：兼容当前编译器的模板选择字段。
- `artSkillDecision`：命中的美术 Skill。
- `capabilityDecision`：是否允许自动生成。

路由原则：

- 先读后台已发布模板知识。
- 再让 AI 判断。
- 再用关键词兜底。
- 用户 prompt 里的任意 GitHub 地址不能直接执行。
- 未发布模板和 Skill 不参与自动调用。

## 7. 生成项目标准架构

生成项目根目录：

```text
game_root/
  index.html
  game.js
  template-config.js
  GameSettings.js
  spec/
    game.json
    minimal.json
    waves.json
    enemies.json
    weapons.json
    balance.json
    effects.json
  assets/
    Audio & Feel/
    Game Art/
    Ui Art/
    Visual Style/
    manifest.json
  generation-report.json
```

`GameSettings.js` 是高频调参入口。  
`spec/*.json` 是结构化玩法数据。  
`assets/manifest.json` 是唯一资源登记表。  
`game.js` 只实现运行时系统，不散落业务数值和资源路径。

## 8. Assets 四域标准

最终生成的 `assets/` 必须使用：

```text
assets/
  Audio & Feel/
    audio/
    effects/

  Game Art/
    bosses/
    enemies/
    map/
    minibosses/
    pickups/
    skills/
    weapons/

  Ui Art/
    opening/
    run-entry/

  Visual Style/
    map/
    player/
    portal/
    style-proofs/

  manifest.json
```

规则：

- `Ui Art` 是最终目录名，不使用 `ui-art`。
- `_archive/` 不参与读取、校验、路由或生成输出。
- manifest 不能引用 `_archive`。
- manifest 中所有 `src` 必须指向四域目录。
- 旧路径需要迁移：
  - `assets/ui-art/*` -> `assets/Ui Art/*`
  - `assets/ui/*` -> `assets/Ui Art/*`
  - `assets/enemies/*` -> `assets/Game Art/enemies/*`
  - `assets/player/*` -> `assets/Visual Style/player/*`
  - `assets/effects/*` -> `assets/Audio & Feel/effects/*`

## 9. 前端体验要求

- 第一屏是可使用体验，不做纯营销页。
- 聊天生成流程必须显示 AI 正在处理的阶段。
- 生成进度不能假装固定秒数完成；自动生成路径应跟随真实 AI 调用阶段推进。
- 报错必须能让用户知道失败在哪一步，并进入邮箱收集截断流程。
- 移动端不能丢页面内容或关键导航。
- 生成后的游戏预览必须可玩、可重试、可进入资源/数值编辑面板。

## 10. 验收标准

- 本地和线上前端都调用同一套后端 API。
- `/api/templates/status` 返回已发布模板知识和 `assetArchitecture`。
- 后台上传模板后能显示 Knowledge、Keywords、Assets 校验状态。
- 输入“动物森友会风格飞行射击”时：
  - 命中 `bullet_hell`
  - 命中 `animal_island_ui`
- 生成项目包含四域 assets 目录。
- `assets/manifest.json` 存在，且路径不再使用旧 `ui-art`。
- `generation-report.json` 记录模板、规则、美术 Skill 和能力决策。
- 普通玩家看不到 `.droi/` 原始规则。
- 原有飞行射击和肉鸽生存流程不被破坏。

## 11. 非目标

- P0 不做完整 3D 游戏生成。
- P0 不做多人联网服务端。
- P0 不执行用户上传包里的任意脚本。
- P0 不把 React 美术组件直接导入 Canvas runtime。
- P0 不承诺任意自定义模板都能自动编译；可先作为知识库参与路由。

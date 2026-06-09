# Droi AI Landing

Droi AI Landing is the public frontend for an AI-assisted HTML5 game generation workflow. Users describe a game idea, the frontend collects or infers the game spec, the backend routes the request through published template knowledge, and the system compiles a playable browser game preview.

The current P0 automatic generation path focuses on 2D HTML5 Canvas games, especially:

- Bullet Hell / Flying Shooter
- Roguelike Survival

Custom game templates and art skills can be registered in the backend admin console as a knowledge base. Published knowledge is used by AI routing, but internal template rules are not exposed to players.

## Architecture

```text
Player frontend
  -> AI chat / inspire flow
  -> GameSpec collection
  -> Backend AI model calls
  -> Template knowledge routing
  -> Art skill routing
  -> Template patch planning
  -> HTML5 Canvas compile
  -> Playable generated preview
```

The backend is deployed separately on Cloud Run. The frontend reads the public backend URL from `droi-config.json`.

```json
{
  "apiBaseUrl": "https://droi-ai-backend-dev-hugvbpaebq-de.a.run.app"
}
```

`droi-config.json` is safe to publish. API keys, Google admin auth, template storage, backend source, and model provider configuration are managed server-side.

## Core Features

- Conversational game idea intake.
- Inspire flow for guided game concept selection.
- AI model routing through the backend.
- Published game template knowledge matching.
- Published art skill matching.
- Backend template compile into a playable HTML5 Canvas preview.
- Generated project report with model trace, template decision, art skill decision, and asset architecture.
- Admin-managed showcase game cards.
- Admin-managed model provider configuration.
- Admin-managed template and art skill registry.

## Template Knowledge

Uploaded templates are treated as a game knowledge base. The backend reads internal Markdown docs from the package:

```text
.droi/DROI_TEMPLATE.md
.droi/GAME_RULES.md
.droi/AI_USAGE.md
.droi/DESIGN_PROMPT.md
.droi/MANIFEST.md
```

Fallback entry files are also supported:

```text
DROI_TEMPLATE.md
README.md
```

The backend extracts:

- `knowledgeSummary`
- `keywords`
- `gameTypeLabel`
- `capabilityTags`
- `routingHints`
- `assetArchitecture`

These fields are used for AI routing. Raw internal Markdown is not shown to players.

### Template Markdown Style

For stable model routing, template Markdown should use English structure and English-first keywords, with Chinese used as explanation:

```md
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
- dodge bullets
- enemy waves
- boss phases

## Chinese Keywords
- 飞行射击
- 弹幕
- 纵版射击
- Boss 战

## Capability Tags
- HTML5 Canvas
- 2D shooter
- enemy waves
- boss phases
- HUD

## Routing Hints
- shouldMatchWhen: 用户想做 flying shooter、bullet hell、shmup、dodge bullets、boss phases。
- shouldNotMatchWhen: 用户想做 roguelike survival、tower defense、card game、business simulation。
```

See [droi-template-authoring-standard.md](docs-backend/droi-template-authoring-standard.md) for the full authoring standard.

## Generated Asset Standard

Generated game projects must use the four-domain `assets/` structure:

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

`assets/manifest.json` is the single source of truth for resource lookup. Runtime code should not hardcode asset paths.

## Local Preview

Serve this folder with a static server:

```bash
python -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/
```

Opening `index.html` directly from `file://` can block `droi-config.json` and API calls. Use a local static server for testing.

## Backend

The backend is a separate private service. It handles:

- AI provider API keys
- Model calls
- Google admin login
- Template registry
- Art skill registry
- Cloud storage
- Game compile API
- Generated artifacts

The frontend should not contain provider API keys or admin secrets.

## Key Files

```text
index.html          Main landing and chat UI
style.css           Frontend styling
script.js           AI chat, routing, generation, preview workflow
droi-config.json    Public backend URL
showcase/           Showcase roll pages
docs-frontend/      Frontend E2E and regression docs
docs-backend/       Backend API, template, and workspace runtime contracts
ui-design/          UI design reviews and exported visual assets
```

## Verification

Recommended checks after frontend or generation-flow changes:

```bash
node --check script.js
```

Recommended backend checks are run from the backend repository:

```bash
node --check backend/server.js
node --check admin.js
npm run test:backend
```

The backend test suite currently expects a root `script.js` in the private backend repository for one client-secret scan test. If that file is absent, that test can fail with `ENOENT` even when backend syntax and compile checks pass.

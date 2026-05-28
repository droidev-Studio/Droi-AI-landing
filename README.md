# Droi AI Landing

Droi AI is a landing page and chat prototype for AI-first mini-game generation.

The current P0 flow is model-required:

1. The user selects an enabled model.
2. The frontend sends analysis, game-plan, and TemplatePatchPlan stages to the backend.
3. The backend proxies the selected model API.
4. The backend compiles a playable HTML5 Canvas preview from the selected P0 template and the AI-generated TemplatePatchPlan.

The app must not claim a game was AI-generated when the selected model or template compiler fails.

## P0 Supported Templates

- `bullet_hell`: bullet hell, flying shooter, space shooter, vertical shooter, plane shooter, shmup, boss bullet fights.
- `roguelike_survival`: roguelike survival, Vampire Survivors-style games, arena survival, auto-attack survival, level-up choices.

Unsupported or capability-exceeded requests should show a clear recoverable error or manual handoff path instead of pretending generation succeeded.

## Local Setup

```bash
npm start
```

Then open:

```text
http://localhost:3000/
```

The backend serves both the static page and the API routes.

If the static frontend is hosted separately from the backend, copy `droi-config.example.json` to `droi-config.json` and set `apiBaseUrl` to the deployed backend:

```json
{
  "apiBaseUrl": "https://your-backend.example.com"
}
```

You can also set `window.DROI_API_BASE` before loading `script.js` when injecting runtime config from a hosting platform:

```html
<script>
  window.DROI_API_BASE = "https://your-backend.example.com";
</script>
```

## Environment

Copy `.env.example` to `.env` and fill only the providers you want to enable.

```bash
copy .env.example .env
```

Supported variables:

- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GROQ_API_KEY`
- `WEB3FORMS_ACCESS_KEY` for optional backend-only manual queue forwarding

Optional base URL overrides are also listed in `.env.example`.

Do not commit `.env`. It is ignored by git.

## API Routes

- `GET /api/models`
- `POST /api/chat`
- `POST /api/ai/analyze-game-request`
- `POST /api/ai/generate-game-plan`
- `POST /api/ai/generate-template-patch`
- `POST /api/template-project/compile`
- `POST /api/waitlist`

Generated preview projects are written under `backend/data/generated/` and served from `/generated/...`.

## Checks

```bash
npm run check
npm run test:backend
```

`npm run check` validates JavaScript syntax for the frontend and backend. `npm run test:backend` verifies template matching, TemplatePatchPlan validation, and compile output.

# Phase 1 AI Platform Contract

Phase 1 does not expose API-key configuration to normal users. Normal users only choose an AI model from the chat header dropdown. All model calls should go through the platform backend.

For the product-level AI requirements-analysis workflow, see [Interactive AI Game Spec Workflow](interactive-ai-game-spec-workflow.md).

## UI Preservation Rule

AI provider integration must not change the chat page's visual structure unless the change is explicitly requested as a UI redesign.

- Do not add provider badges, model chips, avatars, labels, cards, or extra wrappers inside assistant messages.
- Do not change spacing, bubble layout, option button layout, typography, colors, or animation timing as part of backend/model work.
- Keep model/provider information inside the model selector, admin panel, logs, or usage views only.
- If a model call needs telemetry, record it in usage data instead of rendering it in the chat conversation.
- Any future chat-message markup change must be treated as a separate UI task and verified against the existing design before merging.

## Local Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and fill in Google OAuth credentials:

```bash
copy .env.example .env
```

3. Start the backend:

```bash
npm run dev:backend
```

The backend listens on `http://127.0.0.1:3000` by default. When the frontend is opened at `http://127.0.0.1:4173`, it automatically sends API calls to `http://127.0.0.1:3000`.

## User Flow

- Public users see Google Login, Discord, the chat UI, and the model dropdown.
- Public users do not see API-key settings.
- Model switching only affects the next AI response.
- Chat requests call `POST /api/chat` with the selected provider/model and messages.
- If the backend is not available in static preview, the frontend keeps using local fallback copy.

## Admin Flow

- Admins sign in with Google through `GET /auth/google`.
- The backend decides whether the user is an admin.
- The admin email allowlist must live on the backend. Current product owner admin: `liyilin199976@gmail.com`.
- Only when `GET /api/session` returns `isAdmin: true` does the frontend show `Admin AI Config`.
- Admin API keys are submitted to the backend and must be stored server-side only.
- The frontend intentionally strips API keys before writing any AI config to localStorage.

## Required Backend Endpoints

### `GET /api/session`

Returns the signed-in Google user and role.

```json
{
  "email": "liyilin199976@gmail.com",
  "isAdmin": true,
  "googleConfigured": true
}
```

The frontend only shows admin controls when `isAdmin` is true. A temporary development-only `devAllowlist: true` flag can also allow the known product-owner email during local backend development, but production should rely on backend role checks.

If this endpoint returns 404 or `googleConfigured: false` in static preview, the Google Login button will not navigate to `/auth/google`; it shows an in-app notice instead. This prevents users from landing on a blank or unconfigured auth route before the backend is connected.

### `GET /api/models`

Returns platform-enabled models for the public dropdown.

```json
{
  "defaultModel": "gpt-5.5",
  "models": [
    {
      "id": "gpt-5.5",
      "provider": "openai",
      "model": "gpt-5.5",
      "label": "GPT 5.5",
      "reasoningEffort": "low",
      "enabled": true
    }
  ]
}
```

The frontend treats this response as a strict allowlist. When this endpoint is available, only enabled models returned here appear in the public dropdown.

### `POST /api/chat`

Request:

```json
{
  "provider": "openai",
  "model": "gpt-5.5",
  "modelId": "gpt-5.5",
  "messages": [
    { "role": "user", "content": "Create a cyberpunk puzzle game" }
  ]
}
```

Response:

```json
{
  "content": "AI response text",
  "usage": {
    "prompt_tokens": 100,
    "completion_tokens": 200,
    "total_tokens": 300
  }
}
```

### `POST /api/admin/ai-config`

Requires an admin session. Receives provider API keys and model routing config, persists secrets server-side, and never returns raw API keys to the browser.

### `POST /api/admin/ai-config/test`

Requires an admin session. Tests a provider configuration from the server and returns a short status message.

```json
{
  "message": "OpenAI connection ok"
}
```

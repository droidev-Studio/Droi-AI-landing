# Backend Deployment Checklist

This project needs a deployed Node backend for AI-first generation. GitHub Pages can host the static frontend, but it cannot run `backend/server.js`.

## 1. Deploy The Backend

Deploy this repository as a Node service or Docker service.

Render Blueprint:

```text
render.yaml
```

Import the repository in Render, use the blueprint, then fill provider API keys in the Render environment variable UI. The blueprint marks provider keys as `sync: false`, so secrets are not committed.

Node start command:

```bash
npm start
```

Docker:

```bash
docker build -t droi-ai-backend .
docker run -p 3000:3000 --env-file .env droi-ai-backend
```

## 2. Configure Environment Variables

Required for the service:

```text
PORT=3000
FRONTEND_ORIGIN=https://droidev-studio.github.io
MODEL_REQUEST_TIMEOUT_MS=60000
```

Enable at least one model provider:

```text
OPENAI_API_KEY=
GEMINI_API_KEY=
ANTHROPIC_API_KEY=
GROQ_API_KEY=
```

Optional manual queue forwarding:

```text
WEB3FORMS_ACCESS_KEY=
WEB3FORMS_ENDPOINT=https://api.web3forms.com/submit
```

Do not expose these values in the browser or commit `.env`.

## 3. Verify The Backend

Health check:

```text
GET https://your-backend.example.com/api/health
```

Readiness check:

```text
GET https://your-backend.example.com/api/ready
```

`/api/ready` must return `200` before the static frontend can generate games. If it returns `503 MODEL_NOT_CONFIGURED`, configure at least one provider API key.

## 4. Verify Repository CI

GitHub Actions runs on pushes and pull requests to `main`:

```text
.github/workflows/ci.yml
```

It runs:

```bash
npm ci
npm run check
npm run test:backend
```

## 5. Connect GitHub Pages

Create `droi-config.json` in the static frontend deployment:

```json
{
  "apiBaseUrl": "https://your-backend.example.com"
}
```

The frontend loads this file before calling `/api/models`. Without it, GitHub Pages will only show recoverable backend/model errors and will not fake generation.

## 6. Expected P0 Runtime

After configuration:

- `/api/models` returns enabled models.
- User-selected model drives analysis, game plan, and TemplatePatchPlan.
- `/api/template-project/compile` returns generated files and a preview URL.
- The preview URL is served from the backend `/generated/...` route.

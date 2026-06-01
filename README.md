# Droi AI Landing

Public static frontend for Droi AI.

The backend is deployed separately on Cloud Run and is discovered through `droi-config.json`:

```json
{
  "apiBaseUrl": "https://droi-ai-backend-dev-585034669241.asia-east1.run.app"
}
```

`droi-config.json` is safe to publish because it only contains the public backend URL. API keys, Admin code, backend source, deployment files, and server-side configuration live outside this repository.

## Run Locally

Serve the folder with any static server, then open the local URL in a browser.

```bash
python -m http.server 8080
```

The page reads `droi-config.json`, then calls the Cloud Run backend for model lists, chat generation, and showcase game cards.

Opening `index.html` directly from `file://` may be blocked by browser security rules. Use a local static server when testing locally.

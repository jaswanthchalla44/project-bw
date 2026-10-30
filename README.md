# Deploy Test App

A small Node.js + Express web app. The backend serves the static frontend from `public/` and keeps an in-memory visit counter (it resets on restart; no database).

## Running

```bash
npm install
npm start
```

## Endpoints

| Method | Path          | Description                                                        |
|--------|---------------|--------------------------------------------------------------------|
| GET    | `/`           | Increments the visit counter and serves `public/index.html`        |
| GET    | `/api/status` | Returns `{ "time": "<ISO 8601 server time>", "visits": <count> }` (does not increment) |
| GET    | `/health`     | Returns `{ "status": "ok" }`                                       |

Other files under `public/` are served as static assets.

## Port

Listens on `0.0.0.0:3000`. Set the `PORT` environment variable to use a different port.

## Deployment

This app runs as the systemd service `project-app`.

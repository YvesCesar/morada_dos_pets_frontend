# Docker Development Environment

## Architecture

- All Docker files live in the `docker/` directory
- **Two services** defined in `docker/docker-compose.yml`:
  - `app` — Node 22 Alpine dev server (Vite on port 5173)
  - `e2e` — Playwright official image with Chromium (profile-gated, on-demand)
- `docker/Dockerfile` builds the `app` image: copies `package.json`/`package-lock.json`, runs `npm ci`
- Build context is `..` (project root) so `COPY` in Dockerfile accesses `package.json` etc.
- Source code is **bind-mounted** (not copied) — edits on host reflect immediately via Vite HMR
- `node_modules` uses an **anonymous volume** to isolate container deps from host

## Quick Reference

| Command | Purpose |
|---------|---------|
| `docker compose -f docker/docker-compose.yml up` | Start dev server (port 5173) |
| `docker compose -f docker/docker-compose.yml up --build` | Rebuild image and start (after dependency changes) |
| `docker compose -f docker/docker-compose.yml down` | Stop and remove containers |
| `docker compose -f docker/docker-compose.yml down -v` | Stop, remove containers and volumes (reset node_modules) |
| `docker compose -f docker/docker-compose.yml exec app sh` | Shell into running container |
| `docker compose -f docker/docker-compose.yml exec app npm run test:run` | Run unit tests |
| `docker compose -f docker/docker-compose.yml exec app npm run lint` | Run linter |
| `docker compose -f docker/docker-compose.yml exec app npm run type-check` | TypeScript check |
| `docker compose -f docker/docker-compose.yml run --rm app npm run build` | Production build |
| `docker compose -f docker/docker-compose.yml run --rm e2e` | Run Playwright E2E tests |

## When to Rebuild

Rebuild the image (`docker compose -f docker/docker-compose.yml up --build`) after:
- Changes to `package.json` or `package-lock.json`
- Changes to `Dockerfile`

Source code changes do **not** require rebuilding — they are reflected immediately via the bind mount and Vite HMR.

## Service: `e2e` (Playwright)

- Uses `mcr.microsoft.com/playwright:v1.58.2-noble` — Chromium is pre-installed
- Gated behind `profiles: [e2e]` — does **not** start with `docker compose -f docker/docker-compose.yml up`
- Runs `npm ci` before tests (the anonymous volume has no deps initially)
- Sets `BASE_URL=http://app:5173` so Playwright connects to the `app` service via Docker internal network
- Sets `SKIP_WEB_SERVER=true` so `playwright.config.ts` skips launching its own dev server

To run E2E tests:
```bash
docker compose -f docker/docker-compose.yml run --rm e2e
```

## Volume Strategy

| Mount | Purpose |
|-------|---------|
| `..:/app` | Bind-mount project root for hot-reload |
| `/app/node_modules` | Anonymous volume — container uses its own deps, not host's |

If dependencies get out of sync:
```bash
docker compose -f docker/docker-compose.yml down -v && docker compose -f docker/docker-compose.yml up --build
```
The `-v` flag removes anonymous volumes, forcing a fresh `npm ci` on next build.

## Network

- Vite dev server binds to `0.0.0.0:5173` inside the container (via `--host` flag in docker-compose command)
- Port 5173 is forwarded to the host — access at `http://localhost:5173`
- HMR WebSocket works automatically through the forwarded port
- `CHOKIDAR_USEPOLLING=true` ensures file watchers work on all host OS types (macOS/Windows Docker Desktop)
- The `e2e` service reaches the dev server via `http://app:5173` (Docker internal DNS)

## Key Files

| File | Role |
|------|------|
| `docker/Dockerfile` | Dev image definition (Node 22 Alpine + npm ci) |
| `docker/docker-compose.yml` | Service orchestration, volumes, ports, env vars |
| `.dockerignore` | Excludes node_modules/dist/etc from build context (lives at project root) |
| `playwright.config.ts` | Reads `BASE_URL` and `SKIP_WEB_SERVER` env vars for Docker compatibility |

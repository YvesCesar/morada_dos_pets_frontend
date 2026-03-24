# Contributing to Morada dos Pets

Technical guide for developers who want to clone, run, and contribute to the project.

## Stack

- **Framework:** Vue.js 3 (Composition API + `<script setup>`)
- **Language:** TypeScript
- **Build tool:** Vite
- **Styling:** SCSS (7-1 architecture, BEM, CSS variables)
- **State management:** Pinia
- **Routing:** Vue Router
- **Form validation:** Zod + VeeValidate
- **Input masks:** Maska
- **Unit tests:** Vitest + Vue Test Utils
- **E2E tests:** Playwright
- **Containerization:** Docker + Docker Compose

## Prerequisites

### Running manually

- **Node.js** `^20.19.0` or `>=22.12.0`
- **npm** (included with Node.js)

### Running with Docker

- **Docker** and **Docker Compose** installed

## Environment setup

### 1. Clone the repository

```bash
git clone https://github.com/YvesCesar/morada-dos-pets-frontend.git
cd morada-dos-pets-frontend
```

### 2a. Manual setup (without Docker)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The server will be available at `http://localhost:5173`.

### 2b. Docker setup

```bash
# Start development server
docker compose -f docker/docker-compose.yml up

# Rebuild the image (after dependency changes)
docker compose -f docker/docker-compose.yml up --build
```

The server will be available at `http://localhost:5173`.

To stop containers:

```bash
# Stop containers
docker compose -f docker/docker-compose.yml down

# Stop and remove volumes (full node_modules reset)
docker compose -f docker/docker-compose.yml down -v
```

To access the container shell:

```bash
docker compose -f docker/docker-compose.yml exec app sh
```

## Available commands

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with hot-reload |
| `npm run build` | Production build (type-check + vite build) |
| `npm run preview` | Preview of the production build |

### Code quality

| Command | Description |
|---------|-------------|
| `npm run type-check` | TypeScript type checking |
| `npm run lint` | ESLint with auto-fix |
| `npm run format` | Prettier formatting |

### Testing

| Command | Description |
|---------|-------------|
| `npm test` | Vitest in watch mode |
| `npm run test:run` | Vitest single run (CI) |
| `npm run test:coverage` | Vitest with coverage report |
| `npm run test:e2e` | E2E tests with Playwright |
| `npm run test:e2e:ui` | Playwright with interactive UI |
| `npm run test:e2e:headed` | Playwright in headed mode (visible browser) |

### Testing with Docker

```bash
# Unit tests inside the container
docker compose -f docker/docker-compose.yml exec app npm run test:run

# E2E tests (uses official Playwright image with Chromium)
docker compose -f docker/docker-compose.yml run --rm e2e
```

## Project structure

```
src/
├── assets/styles/    # Centralized SCSS (7-1 architecture)
├── components/
│   ├── layout/       # Header, Footer, DashboardLayout
│   ├── sections/     # Page sections organized by route
│   └── shared/       # Reusable components (modals, badges, cards)
├── composables/      # Reusable logic (useCarousel, useFocusTrap, etc.)
├── config/           # Constants (badge colors, input masks)
├── data/             # Static data and dashboard mock data
├── schemas/          # Zod validation schemas
├── stores/           # Pinia stores (auth, appointments, pets, etc.)
├── types/            # TypeScript interfaces
├── views/            # Page components (route-level)
└── router/           # Route configuration + navigation guards
tests/                # Unit tests (mirrors src/ structure)
e2e/                  # Playwright E2E tests
docker/               # Dockerfile and docker-compose.yml
```

## Code conventions

### Vue Single File Components (SFCs)

- Required order: `<script setup lang="ts">` → `<template>`
- **No `<style>` blocks** in SFCs — styles are centralized in `src/assets/styles/`
- **PascalCase** naming for components

### SCSS

- **BEM** naming (`.block__element--modifier`)
- Module system with `@use`/`@forward` (never `@import`)
- CSS variables defined in `src/assets/styles/abstracts/_variables.scss`

### TypeScript

- Interfaces and types in `src/types/index.ts` — never define inline
- Composables with `use` prefix (e.g., `useCarousel`)
- Schemas with `Schema` suffix in camelCase (e.g., `loginSchema`)

### Required patterns

1. Static data in `/data/` — never inline arrays in components
2. Reusable logic in `/composables/` with barrel exports
3. Config constants in `/config/` — no magic numbers
4. Views are thin — delegate to section components
5. Forms use Zod + VeeValidate — never just HTML `required`
6. Masks via `v-maska` directive — never manual `@input` formatters
7. Stores use Composition API: `defineStore('name', () => { ... })`

### Accessibility

- `:aria-expanded` on toggleable elements (dropdowns, menus)
- `useEscapeKey` on dismissible overlays (modals, dropdowns)
- `useFocusTrap`, `role="dialog"`, `aria-modal="true"` on modals
- `aria-live="polite"` on form error messages
- Never remove `outline` on `:focus` without adding a `:focus-visible` replacement

## Authentication system (mock)

The dashboard works without a backend — authentication is based on mock data with `localStorage` persistence.

| Credentials | Role |
|-------------|------|
| `admin@admin.com` / `admin` | Administrator |
| `customer@customer.com` / `customer` | Customer |

Protected routes use `meta` fields (`requiresAuth`, `requiresAdmin`, `requiresCustomer`, `guestOnly`) with navigation guards in the router.

## Testing

### Unit tests (Vitest)

- Located in `tests/`, mirroring the `src/` structure
- Helpers available in `tests/helpers.ts` (`mountWithPlugins`, `freshPinia`, etc.)
- Global setup in `tests/setup.ts`

### E2E tests (Playwright)

- Located in `e2e/`, organized by feature
- Auth via `localStorage` injection (`e2e/helpers/auth.ts`)
- Configuration in `playwright.config.ts`

## Recommended IDE

[VS Code](https://code.visualstudio.com/) with the [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (disable Vetur if installed).

Useful browser extensions:
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) (Chrome/Edge)
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) (Firefox)

## Additional documentation

For deeper details on specific areas, see the `AGENTS.md` files in their respective folders:

| File | Area |
|------|------|
| `src/assets/styles/AGENTS.md` | SCSS architecture, tokens, mixins, breakpoints |
| `src/components/sections/AGENTS.md` | Page section composition |
| `src/components/layout/AGENTS.md` | Layout components |
| `src/composables/AGENTS.md` | Available composables |
| `src/schemas/AGENTS.md` | Zod and VeeValidate validation |
| `src/router/AGENTS.md` | Routes and navigation guards |
| `src/stores/AGENTS.md` | Pinia stores |
| `tests/AGENTS.md` | Testing patterns |
| `e2e/AGENTS.md` | Playwright E2E tests |
| `docker/AGENTS.md` | Docker environment |

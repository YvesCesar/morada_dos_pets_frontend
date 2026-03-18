# CLAUDE.md

Vue.js 3 SPA (TypeScript, Composition API, Vite, SCSS, Pinia, Vue Router) for Morada dos Pets pet shop.

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build (type-check + vite build)
npm run type-check   # TypeScript check
npm run lint         # ESLint with auto-fix
npm run format       # Prettier
npm test             # Vitest watch mode
npm run test:run     # Vitest single run (CI)
npm run test:coverage # Vitest with coverage
npm run test:e2e     # Playwright E2E tests
npm run test:e2e:ui  # Playwright interactive UI mode
npm run test:e2e:headed # Playwright headed mode
```

## Directory Structure

```
src/
├── assets/           # Images, SCSS stylesheets
│   └── styles/       # Centralized SCSS (7-1 pattern, no <style> in SFCs)
│       ├── abstracts/ # Variables, mixins (no CSS output)
│       ├── base/      # Reset, body defaults
│       ├── components/ # Global classes (.btn, .form-*, .badge, .dashboard-table)
│       ├── mixins/    # Reusable @mixin (hero-banner, auth-card, pricing-card, etc.)
│       ├── layout/    # Header, footer, dashboard layout
│       ├── shared/    # Shared component styles
│       ├── pages/     # Page-specific section styles
│       └── views/     # View-level layout styles
├── components/
│   ├── layout/       # AppHeader, AppFooter, DashboardLayout, NotificationBell, ProfileDropdown
│   ├── sections/     # Page sections organized by route (includes dashboard subfolders)
│   └── shared/       # Reusable components (BaseModal, ConfirmModal, DashboardStatsSection, DashboardFilterBar, ServiceBadge, StatusBadge, BenefitsSection, ImagesCarousel, ServicesCards, ServiceTabs)
├── composables/      # Reusable logic (barrel export via index.ts)
├── config/           # App constants (carousel dimensions, service/status badge colors)
├── data/             # Static data + mock data for dashboard (barrel export via index.ts)
├── stores/           # Pinia stores (auth, appointments, coupons, notifications, pets, prices, testimonials, users)
├── types/            # TypeScript interfaces (barrel export via index.ts)
├── views/            # Route-level page components
└── router/           # Vue Router config + navigation guards
tests/
├── setup.ts              # Global setup (localStorage reset, polyfills)
├── helpers.ts            # Test utilities (withSetup, freshPinia, mountWithPlugins, createMockTouchEvent)
├── composables/          # Composable unit tests
├── stores/               # Pinia store tests
└── components/shared/    # Shared component tests
e2e/
├── helpers/auth.ts       # Auth helpers (localStorage injection via addInitScript)
├── public/               # Public page tests (home, navigation, services, contact, about)
├── auth/                 # Auth flow tests (login, registration, guards)
├── dashboard/            # Dashboard tests (admin, customer, coupons, users, prices, testimonials, profile, settings)
├── shared/               # Shared component tests (header)
└── payment/              # Payment wizard tests
```

## Code Conventions

- **SFC order:** `<script setup lang="ts">` → `<template>` (no `<style>` blocks — styles are centralized in `src/assets/styles/`)
- **Components:** PascalCase. **Composables:** `use` prefix. **Data/config:** camelCase. **Types:** PascalCase.
- **CSS:** BEM naming (`.block__element--modifier`) + SCSS with CSS variables from `src/assets/styles/abstracts/_variables.scss`
- **SCSS:** `@use`/`@forward` module system (never `@import`). Mixins imported with `as *`

## Mandatory Patterns

1. Static data in `/data/` — never inline arrays in components
2. Types in `/types/index.ts` — never define interfaces inline
3. Reusable logic in `/composables/` — extract shared behavior
4. Config constants in `/config/` — no magic numbers in components
5. Views compose sections — keep views thin, delegate to section components
6. Reuse existing shared components before creating new ones (DRY)
7. Use barrel exports — import from `@/composables`, `@/data`, `@/types`
8. Stores use Composition API style — `defineStore('name', () => { ... })` with `use*Store` naming
9. Dashboard pages wrap content in `DashboardLayout` component (provides title/subtitle header)
10. Route auth via meta fields — `requiresAuth`, `requiresAdmin`, `requiresCustomer`, `guestOnly`
11. Mock data lives in `/data/dashboard.ts` — dashboard currently runs without a backend (localStorage persistence)
12. Tests in `tests/` — mirror `src/` structure, use Vitest + @vue/test-utils, helpers from `tests/helpers.ts`
13. E2E tests in `e2e/` — use Playwright, auth via localStorage injection (`e2e/helpers/auth.ts`)

## Dashboard System

The app includes an authenticated dashboard with two roles:

- **Admin** (`/dashboard/admin`): manages appointments, users, coupons, prices, testimonials
- **Customer** (`/dashboard/cliente`): views pets, appointments, submits testimonials
- **Shared pages**: profile (`/dashboard/perfil`), settings (`/dashboard/configuracoes`), change password (`/dashboard/alterar-senha`)

Auth is mock-based (hardcoded users in `/data/dashboard.ts`, persisted in localStorage). Navigation guards in the router redirect unauthenticated users to `/entrar`.

## Deep Reference (AGENTS.md)

Agents should read these only when working on the related area:

| File | When to read |
|------|-------------|
| `src/assets/styles/AGENTS.md` | Styling, SCSS architecture, design tokens, mixins, responsive breakpoints |
| `src/components/sections/AGENTS.md` | Creating/editing page sections, understanding page composition |
| `src/components/layout/AGENTS.md` | Layout components (header, footer, dashboard layout, dropdowns) |
| `src/composables/AGENTS.md` | Using or creating composables (carousel, swipe, viewport, masks, photo upload) |
| `src/router/AGENTS.md` | Adding/modifying routes, navigation guards, auth redirects |
| `src/stores/AGENTS.md` | Pinia stores, auth flow, CRUD patterns, mock data |
| `tests/AGENTS.md` | Writing tests, test patterns, helpers, mocking strategies |
| `e2e/AGENTS.md` | Writing E2E tests, Playwright patterns, auth helper, selectors |

## Figma Integration

When Figma links are provided, use the Figma MCP to extract design data and assets.

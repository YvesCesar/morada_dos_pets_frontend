# CLAUDE.md

Vue.js 3 SPA (TypeScript, Composition API, Vite, Pinia, Vue Router) for Morada dos Pets pet shop.

## Commands

```bash
npm run dev          # Dev server
npm run build        # Production build (type-check + vite build)
npm run type-check   # TypeScript check
npm run lint         # ESLint with auto-fix
npm run format       # Prettier
```

## Directory Structure

```
src/
├── assets/           # Images, global styles, static files
├── components/
│   ├── layout/       # AppHeader, AppFooter
│   ├── sections/     # Page sections organized by route
│   └── shared/       # Reusable components (BenefitsSection, ImagesCarousel, ServicesCards, ServiceTabs)
├── composables/      # Reusable logic (barrel export via index.ts)
├── config/           # App constants (carousel dimensions, etc.)
├── data/             # Static data (barrel export via index.ts)
├── stores/           # Pinia stores
├── types/            # TypeScript interfaces (barrel export via index.ts)
├── views/            # Route-level page components
└── router/           # Vue Router config
```

## Code Conventions

- **SFC order:** `<script setup lang="ts">` → `<template>` → `<style scoped>`
- **Components:** PascalCase. **Composables:** `use` prefix. **Data/config:** camelCase. **Types:** PascalCase.
- **CSS:** BEM naming (`.block__element--modifier`) + CSS variables from `src/assets/styles/variables.css`

## Mandatory Patterns

1. Static data in `/data/` — never inline arrays in components
2. Types in `/types/index.ts` — never define interfaces inline
3. Reusable logic in `/composables/` — extract shared behavior
4. Config constants in `/config/` — no magic numbers in components
5. Views compose sections — keep views thin, delegate to section components
6. Reuse existing shared components before creating new ones (DRY)
7. Use barrel exports — import from `@/composables`, `@/data`, `@/types`

## Deep Reference (AGENTS.md)

Agents should read these only when working on the related area:

| File | When to read |
|------|-------------|
| `src/assets/styles/AGENTS.md` | Styling, CSS variables, design tokens, responsive breakpoints |
| `src/components/sections/AGENTS.md` | Creating/editing page sections, understanding page composition |
| `src/composables/AGENTS.md` | Using or creating composables (carousel, swipe, viewport) |
| `src/router/AGENTS.md` | Adding/modifying routes, understanding navigation |

## Figma Integration

When Figma links are provided, use the Figma MCP to extract design data and assets.

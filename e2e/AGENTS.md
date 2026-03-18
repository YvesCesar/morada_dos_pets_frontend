# E2E Tests (Playwright)

## Structure

```
e2e/
├── helpers/auth.ts       # Auth helpers (localStorage injection)
├── public/               # Public pages (home, navigation, services, contact, about)
├── auth/                 # Auth flows (login, registration, route guards)
├── dashboard/            # Dashboard CRUD (admin, customer, coupons, users, prices, testimonials, profile, settings)
├── shared/               # Cross-cutting (header guest vs authenticated)
└── payment/              # Payment wizard multi-step
```

## Auth Helper (`e2e/helpers/auth.ts`)

Uses `page.addInitScript()` to inject `morada_auth` into localStorage before navigation. The auth store reads from localStorage on `init()`, so the injected data is picked up automatically.

```ts
import { loginAsAdmin, loginAsCustomer, clearAuth } from '../helpers/auth'

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page)   // injects admin user into localStorage
  await page.goto('/dashboard/admin')
})
```

- `loginAsAdmin(page)` — injects admin user (id: `u1`, email: `admin@admin.com`)
- `loginAsCustomer(page)` — injects customer user (id: `u2`, email: `customer@customer.com`)
- `clearAuth(page)` — removes auth from localStorage
- Login via UI is tested only in `auth/login.spec.ts`

## Selector Priorities

1. `getByRole()` — buttons, links, headings
2. `getByLabel()` — form inputs with labels
3. `getByText()` — visible text content
4. BEM class selectors — fallback for structural elements (`.header__nav`, `.dashboard-stats__card`)

## Key Patterns

### Masked Inputs
Use `pressSequentially()` instead of `fill()` to trigger `@input` handlers that apply masks:
```ts
await page.locator('#cpf').pressSequentially('12345678900')
await expect(page.locator('#cpf')).toHaveValue('123.456.789-00')
```

### Teleported Modals
No special handling needed — Playwright sees the full rendered DOM including teleported content.

### Alert Dialogs
```ts
const dialogPromise = page.waitForEvent('dialog')
await page.getByRole('button', { name: 'Enviar' }).click()
const dialog = await dialogPromise
await dialog.accept()
```

### Mobile Viewport
```ts
await page.setViewportSize({ width: 375, height: 667 })
```

### SPA Navigation Verification
```ts
await page.getByRole('link', { name: 'Serviços' }).click()
await page.waitForURL('/servicos')
```

## Naming Conventions

- Files: `{feature}.spec.ts` (e.g., `login.spec.ts`, `admin.spec.ts`)
- Test describes: match feature name
- Tests: descriptive sentences describing the user action and expected outcome

## Running Tests

```bash
npm run test:e2e          # Headless (CI)
npm run test:e2e:ui       # Interactive UI mode
npm run test:e2e:headed   # Headed browser
```

## Configuration

- Config: `playwright.config.ts` (project root)
- Browser: Chromium only
- Base URL: `http://localhost:5173`
- Dev server started automatically via `webServer` config
- Retries: 1 in CI, 0 locally
- Traces: on first retry
- Screenshots: only on failure

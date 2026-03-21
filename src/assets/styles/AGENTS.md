# SCSS Architecture & Design System

Centralized SCSS architecture using the 7-1 pattern. **No `<style>` blocks in Vue SFCs** — all styles live here.

## Directory Structure

```
src/assets/styles/
├── main.scss              # Entry point (import order matters)
├── abstracts/
│   ├── _variables.scss    # CSS custom properties (:root)
│   └── _mixins.scss       # respond-to, flex-center, flex-between, flex-column, container, text-ellipsis, sr-only
├── base/
│   └── _reset.scss        # CSS reset, Google Fonts, body defaults, .container, .sr-only
├── components/            # Global reusable classes
│   ├── _buttons.scss      # .btn, .btn--primary, .btn--outline, .btn--danger, .action-btn
│   ├── _forms.scss        # .form-group, .form-field, .form-label, .form-input, .form-select, .form-error-message
│   ├── _tables.scss       # .dashboard-table (wrapper, th, td, actions, empty)
│   ├── _cards.scss        # .card--dashboard, .card--pricing
│   ├── _modals.scss       # .base-modal, .confirm-modal
│   └── _badges.scss       # .badge with --success, --danger, --warning, --neutral, --admin
├── mixins/                # @mixin definitions (no CSS output)
│   ├── _hero-banner.scss  # @mixin hero-banner, hero-banner-variant, auth-banner
│   ├── _auth-card.scss    # @mixin auth-card (shared LoginCard/RegisterCard base)
│   ├── _payment-method.scss # @mixin payment-method (shared credit/debit)
│   ├── _dashboard-table.scss # @mixin dashboard-table (shared table + action btns)
│   ├── _dashboard-form.scss  # @mixin dashboard-form (shared modal forms)
│   └── _pricing-card.scss # @mixin pricing-card-section (shared pricing grids)
├── layout/                # Layout component styles
│   ├── _header.scss       # AppHeader
│   ├── _footer.scss       # AppFooter
│   ├── _dashboard-layout.scss
│   ├── _notification-bell.scss
│   └── _profile-dropdown.scss
├── shared/                # Shared component styles
│   ├── _service-cards.scss
│   ├── _service-tabs.scss
│   ├── _benefits.scss
│   ├── _images-carousel.scss
│   ├── _stats.scss
│   ├── _filter-bar.scss
│   └── _appointment-detail.scss
├── pages/                 # Page-specific section styles
│   ├── _home.scss, _services.scss, _dog-spa.scss, _dog-taxi.scss
│   ├── _hospedagem.scss, _quem-somos.scss, _contact.scss
│   ├── _auth.scss (login + register)
│   ├── _payment.scss
│   ├── _dashboard-admin.scss, _dashboard-customer.scss
│   ├── _users.scss, _coupons.scss, _prices.scss
│   ├── _testimonials-admin.scss
│   ├── _profile.scss, _settings.scss
│   └── _index.scss (barrel)
└── views/                 # View-level layout styles
    └── _views.scss
```

## Import Order (main.scss)

1. **abstracts** — variables + mixins (no output)
2. **base** — reset + body defaults
3. **components** — global reusable classes
4. **layout** — header, footer, dashboard
5. **shared** — shared component styles
6. **pages** — page sections
7. **views** — view layouts

## Responsive Breakpoints

Use the `respond-to` mixin from `abstracts/_mixins.scss`:

```scss
@use '../abstracts/mixins' as *;

.my-component {
  width: 100%;

  @include respond-to(wide)    { /* ≤1400px */ }
  @include respond-to(desktop) { /* ≤1200px */ }
  @include respond-to(tablet)  { /* ≤992px  */ }
  @include respond-to(mobile)  { /* ≤768px  */ }
  @include respond-to(small)   { /* ≤480px  */ }
}
```

## Available Mixins

| Mixin | File | Purpose |
|-------|------|---------|
| `hero-banner($height, $content-left)` | `_hero-banner.scss` | Standard page hero banner (6 pages) |
| `hero-banner-variant($height, $content-left)` | `_hero-banner.scss` | Quem-somos/Contato banner variant |
| `auth-banner` | `_hero-banner.scss` | Login/Register banner |
| `auth-card` | `_auth-card.scss` | Login/Register card base |
| `payment-method` | `_payment-method.scss` | Credit/Debit payment form |
| `dashboard-table` | `_dashboard-table.scss` | Admin table + action buttons |
| `dashboard-form` | `_dashboard-form.scss` | Admin modal form |
| `pricing-card-section($bottom-padding)` | `_pricing-card.scss` | Pricing card grid |

## How to Add Styles

1. **New page section**: Add to `pages/_pagename.scss`, forward in `pages/_index.scss`
2. **New shared component**: Add to `shared/`, forward in `shared/_index.scss`
3. **New global class**: Add to appropriate `components/` file
4. **New mixin**: Add to `mixins/`, forward in `mixins/_index.scss`
5. **New design token**: Add to `abstracts/_variables.scss`

Always use `@use` (never `@import`). Import mixins with `as *` for unqualified access.

## Colors

| Variable | Usage |
|----------|-------|
| `--color-primary` | Main brand (dark brown `#291000`) |
| `--color-primary-light` | Accent/highlight (gold `#dbb947`) |
| `--color-secondary` | Light backgrounds (`#fbf8ed`) |
| `--color-text` | Body text (`#1e1e1e`) |
| `--color-text-muted` | Secondary text (`#5f5d5d`) |
| `--color-danger` / `--color-danger-light` | Error states |
| `--color-success` / `--color-success-light` | Success states |
| `--color-warning` / `--color-warning-light` | Warning states |
| `--color-divider-brown` | Section dividers |
| `--color-error` | Form validation error |
| `--color-border-grey` | General borders |

## Typography

- **Fonts:** `--font-primary` (Quicksand), `--font-logo` (Rammetto One)
- **Sizes:** `--text-xs` (14px) → `--text-4xl` (48px), `--text-badge` (0.8125rem)
- **Weights:** `--font-regular` (400), `--font-medium` (500), `--font-semibold` (600), `--font-bold` (700)

## Spacing & Radius

- **Spacing:** `--spacing-xs` (8px) → `--spacing-3xl` (96px)
- **Radius:** `--radius-sm` (6px), `--radius-md` (12px), `--radius-lg` (21px), `--radius-card` (14px), `--radius-auth` (15px), `--radius-pricing` (10px)
- **Shadows:** `--shadow-card`, `--shadow-pricing`, `--shadow-modal`

## Naming Convention

BEM: `.block__element--modifier`. All classes are global (no scoped styles).

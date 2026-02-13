# Design System Variables

All CSS variables are defined in `variables.css`. Reference this file when styling components.

## Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-primary` | `#291000` | Main brand color (dark brown) |
| `--color-primary-light` | `#dbb947` | Accent/highlight (gold) |
| `--color-secondary` | `#fbf8ed` | Light backgrounds |
| `--color-white` | `#ffffff` | White |
| `--color-black` | `#000000` | Black |
| `--color-text` | `#1e1e1e` | Body text |
| `--color-text-muted` | `#5f5d5d` | Secondary text |

## Typography

- **Fonts:** `--font-primary` (Quicksand), `--font-logo` (Rammetto One)
- **Sizes:** `--text-xs` (14px) → `--text-4xl` (48px)
- **Weights:** `--font-regular` (400), `--font-medium` (500), `--font-semibold` (600), `--font-bold` (700)

## Spacing

`--spacing-xs` (8px) → `--spacing-3xl` (96px)

## Border Radius

`--radius-sm` (6px), `--radius-md` (12px), `--radius-lg` (21px), `--radius-full` (50%)

## Transitions

`--transition-fast` (150ms), `--transition-base` (300ms), `--transition-slow` (500ms)

## Layout

- `--container-max`: 1440px
- `--container-padding`: responsive (135px desktop → 16px mobile)

## Z-index

`--z-header` (100), `--z-modal` (200), `--z-tooltip` (300)

## Responsive Breakpoints

Container padding adjusts at: 1200px, 992px, 768px, 480px.
Font sizes `--text-2xl` to `--text-4xl` reduce at 768px.

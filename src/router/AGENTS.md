# Router

All routes are defined in `index.ts`. Lazy-loaded except HomeView.

## Public Routes

| Path | Name | View | Lazy |
|------|------|------|------|
| `/` | home | HomeView | No |
| `/quem-somos` | quem-somos | QuemSomosView | Yes |
| `/servicos` | servicos | ServicosView | Yes |
| `/servicos/dog-spa` | dog-spa | DogSpaView | Yes |
| `/servicos/hospedagem` | hospedagem | HospedagemView | Yes |
| `/servicos/dog-taxi` | dog-taxi | DogTaxiView | Yes |
| `/servicos/pagamento` | pagamento | PagamentoView | Yes |
| `/contato` | contato | ContatoView | Yes |
| `/entrar` | entrar | EntrarView | Yes |
| `/cadastro` | cadastro | CadastroView | Yes |

## Dashboard Routes (authenticated)

| Path | Name | View | Meta |
|------|------|------|------|
| `/dashboard/admin` | admin-dashboard | AdminDashboardView | `requiresAuth`, `requiresAdmin` |
| `/dashboard/cliente` | customer-dashboard | CustomerDashboardView | `requiresAuth`, `requiresCustomer` |
| `/dashboard/perfil` | profile | ProfileView | `requiresAuth` |
| `/dashboard/configuracoes` | settings | SettingsView | `requiresAuth` |
| `/dashboard/alterar-senha` | change-password | ChangePasswordView | `requiresAuth` |
| `/dashboard/cupons` | coupons | CouponsView | `requiresAuth`, `requiresAdmin` |
| `/dashboard/precos` | prices | PricesView | `requiresAuth`, `requiresAdmin` |
| `/dashboard/usuarios` | users | UsersView | `requiresAuth`, `requiresAdmin` |
| `/dashboard/depoimentos` | testimonials | TestimonialsView | `requiresAuth`, `requiresAdmin` |

## Route Meta Fields

- `requiresAuth` — user must be logged in; redirects to `/entrar` if not
- `requiresAdmin` — user must have `admin` role; customers redirected to `/dashboard/cliente`
- `requiresCustomer` — user must have `customer` role; admins redirected to `/dashboard/admin`
- `guestOnly` — only for unauthenticated users (`/entrar`, `/cadastro`); authenticated users redirected to their dashboard

## Navigation Guards (`beforeEach`)

1. `guestOnly` + authenticated → redirect to role-based dashboard
2. `requiresAuth` + not authenticated → `/entrar`
3. `requiresAdmin` + not admin → customer dashboard or `/entrar`
4. `requiresCustomer` + not customer → admin dashboard or `/entrar`

## Behavior

- `scrollBehavior` always returns `{ top: 0 }` (pages start at top)
- Uses `createWebHistory` (HTML5 history mode)
- Auth state is read from `useAuthStore` (Pinia)

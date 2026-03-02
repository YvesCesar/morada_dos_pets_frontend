# Pinia Stores

All stores use Composition API style: `defineStore('name', () => { ... })`.
Import by name: `import { useAuthStore } from '@/stores/auth'`.

## Store Catalog

| Store | File | Purpose |
|-------|------|---------|
| `useAuthStore` | `auth.ts` | Mock login/logout, role detection, profile update, localStorage persistence |
| `useAppointmentsStore` | `appointments.ts` | Appointment listing with service/period filters |
| `useCouponsStore` | `coupons.ts` | Coupon CRUD + validation for payment flow |
| `useNotificationsStore` | `notifications.ts` | User notifications with unread count |
| `usePetsStore` | `pets.ts` | Customer pet CRUD (client-side) |
| `usePricesStore` | `prices.ts` | Price management — reads from data files, admin can edit (reactive) |
| `useTestimonialsStore` | `testimonials.ts` | Testimonial CRUD + admin approval flow |
| `useUsersStore` | `users.ts` | User CRUD for admin |
| `useCounterStore` | `counter.ts` | Example counter (scaffold) |

## Auth Flow

1. `useAuthStore` auto-calls `init()` on creation — restores session from `localStorage`
2. `login(email, password)` checks against hardcoded credentials (`admin@admin.com` / `customer@customer.com`)
3. Matching user is loaded from `mockUsers` in `@/data/dashboard`
4. `user` ref + `isAuthenticated`, `isAdmin`, `isCustomer` computed getters drive the UI
5. `logout()` clears `user` and removes the localStorage key
6. `updateProfile(data)` merges partial data into current user
7. `loginAs(user)` allows admin to impersonate a user

## Mock Data Pattern

- All initial data comes from `@/data/dashboard.ts` (mock arrays)
- Stores copy mock data into `ref()` on initialization
- CRUD operations mutate the reactive refs (no backend calls)
- Auth persists to `localStorage` under key `morada_auth`

## Conventions

- Naming: `use*Store` (e.g. `useAuthStore`, `usePetsStore`)
- Always use Composition API: `defineStore('name', () => { ... })`
- Expose only what's needed via `return { ... }`
- Use `computed` for derived state (filters, counts, role checks)
- Types come from `@/types` — never define inline interfaces

# Layout Components

Structural wrappers that frame the app shell and dashboard chrome.

## Components

### AppHeader

Top navigation bar. Behavior changes based on auth state:
- **Unauthenticated:** standard nav links + "Entrar" button
- **Authenticated:** hides public nav, shows `NotificationBell` + `ProfileDropdown`

### AppFooter

Site-wide footer with links and social icons. Visible on all public pages; hidden on dashboard.

### DashboardLayout

Wrapper for every dashboard page. Provides a consistent header with title and optional subtitle.

```vue
<DashboardLayout title="Meu Painel" subtitle="Bem-vindo de volta!">
  <!-- page sections go here -->
</DashboardLayout>
```

**Props:** `title` (required), `subtitle` (optional)

### NotificationBell

Bell icon with unread count badge. Toggles a dropdown listing recent notifications.
Uses `useNotificationsStore` for data.

### ProfileDropdown

User avatar + name that opens a dropdown with role-based submenu links (defined in `@/data/submenu.ts`).
- **Admin:** Dashboard, Usuários, Cupons, Preços, Depoimentos, Configurações
- **Customer:** Meu Painel, Perfil, Configurações

Includes a logout button that calls `useAuthStore().logout()`.

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/quem-somos',
      name: 'quem-somos',
      component: () => import('../views/QuemSomosView.vue'),
    },
    {
      path: '/servicos',
      name: 'servicos',
      component: () => import('../views/ServicosView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contato',
      name: 'contato',
      component: () => import('../views/ContatoView.vue'),
    },
    {
      path: '/entrar',
      name: 'entrar',
      component: () => import('../views/EntrarView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/CadastroView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/servicos/dog-spa',
      name: 'dog-spa',
      component: () => import('../views/DogSpaView.vue'),
    },
    {
      path: '/servicos/hospedagem',
      name: 'hospedagem',
      component: () => import('../views/HospedagemView.vue'),
    },
    {
      path: '/servicos/dog-taxi',
      name: 'dog-taxi',
      component: () => import('../views/DogTaxiView.vue'),
    },
    {
      path: '/servicos/pagamento',
      name: 'pagamento',
      component: () => import('../views/PagamentoView.vue'),
    },
    // Dashboard routes
    {
      path: '/dashboard/admin',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/dashboard/cliente',
      name: 'customer-dashboard',
      component: () => import('../views/CustomerDashboardView.vue'),
      meta: { requiresAuth: true, requiresCustomer: true },
    },
    {
      path: '/dashboard/perfil',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/configuracoes',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/alterar-senha',
      name: 'change-password',
      component: () => import('../views/ChangePasswordView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard/cupons',
      name: 'coupons',
      component: () => import('../views/CouponsView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/dashboard/precos',
      name: 'prices',
      component: () => import('../views/PricesView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/dashboard/usuarios',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/dashboard/depoimentos',
      name: 'testimonials',
      component: () => import('../views/TestimonialsView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return authStore.isAdmin ? '/dashboard/admin' : '/dashboard/cliente'
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/entrar'
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return authStore.isAuthenticated ? '/dashboard/cliente' : '/entrar'
  }

  if (to.meta.requiresCustomer && !authStore.isCustomer) {
    return authStore.isAuthenticated ? '/dashboard/admin' : '/entrar'
  }
})

export default router

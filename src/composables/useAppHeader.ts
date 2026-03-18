import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { adminSubmenuItems, customerSubmenuItems } from '@/data'
import type { NavLink } from '@/types'
import { useAuthStore } from '@/stores/auth'

/**
 * Composable para a lógica do header
 */
export function useAppHeader() {
  const route = useRoute()
  const router = useRouter()
  const authStore = useAuthStore()
  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const isActive = (link: NavLink) => {
    if (link.isRoute && link.to) {
      if (route.path === link.to) return true
      if (link.to !== '/' && route.path.startsWith(link.to)) return true
    }
    return false
  }

  const menuItems = computed(() => {
    return authStore.isAdmin ? adminSubmenuItems : customerSubmenuItems
  })

  const handleLogout = () => {
    authStore.logout()
    router.push('/')
  }

  const navigateDashboard = (path: string) => {
    closeMenu()
    router.push(path)
  }

  return {
    authStore,
    isMenuOpen,
    menuItems,
    toggleMenu,
    closeMenu,
    isActive,
    handleLogout,
    navigateDashboard,
  }
}

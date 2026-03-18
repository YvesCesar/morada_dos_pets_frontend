import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { useClickOutside } from './useClickOutside'

/**
 * Composable para a lógica do sino de notificações
 */
export function useNotificationBell() {
  const authStore = useAuthStore()
  const notificationsStore = useNotificationsStore()

  const isOpen = ref(false)
  const bellRef = ref<HTMLElement | null>(null)

  const userId = computed(() => authStore.user?.id ?? '')

  const userNotifications = computed(() =>
    notificationsStore.getByUser(userId.value).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  )

  const hasUnread = computed(() =>
    userNotifications.value.some((n) => !n.read),
  )

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const close = () => {
    isOpen.value = false
  }

  const markAllRead = () => {
    notificationsStore.markAllAsRead(userId.value)
  }

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year!, month! - 1, day!).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    })
  }

  useClickOutside(bellRef, close)

  return {
    isOpen,
    bellRef,
    userNotifications,
    hasUnread,
    toggle,
    markAllRead,
    formatDate,
    notificationsStore,
  }
}

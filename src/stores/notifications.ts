/**
 * Store de notificações
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Notification } from '@/types'
import { mockNotifications } from '@/data'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([...mockNotifications])

  const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)
  const hasUnread = computed(() => unreadCount.value > 0)

  function getByUser(userId: string) {
    return notifications.value.filter((n) => n.userId === userId)
  }

  function markAsRead(id: string) {
    const notification = notifications.value.find((n) => n.id === id)
    if (notification) notification.read = true
  }

  function markAllAsRead(userId: string) {
    notifications.value
      .filter((n) => n.userId === userId)
      .forEach((n) => (n.read = true))
  }

  return {
    notifications,
    unreadCount,
    hasUnread,
    getByUser,
    markAsRead,
    markAllAsRead,
  }
})

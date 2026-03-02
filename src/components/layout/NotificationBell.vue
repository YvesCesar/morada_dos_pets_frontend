<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const isOpen = ref(false)

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

const handleClickOutside = (event: MouseEvent) => {
  const el = document.querySelector('.notification-bell')
  if (el && !el.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year!, month! - 1, day!).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  })
}
</script>

<template>
  <div class="notification-bell">
    <button
      class="notification-bell__btn"
      :aria-label="isOpen ? 'Fechar notificações' : 'Abrir notificações'"
      @click="toggle"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="hasUnread" class="notification-bell__dot"></span>
    </button>

    <div v-if="isOpen" class="notification-bell__dropdown">
      <div class="notification-bell__dropdown-header">
        <span class="notification-bell__dropdown-title">Notificações</span>
        <button
          v-if="hasUnread"
          class="notification-bell__mark-all"
          @click="markAllRead"
        >
          Marcar todas como lidas
        </button>
      </div>

      <ul class="notification-bell__list">
        <li
          v-for="notification in userNotifications"
          :key="notification.id"
          class="notification-bell__item"
          :class="{ 'notification-bell__item--unread': !notification.read }"
          @click="notificationsStore.markAsRead(notification.id)"
        >
          <span
            v-if="!notification.read"
            class="notification-bell__item-dot"
          ></span>
          <div class="notification-bell__item-body">
            <p class="notification-bell__item-msg">{{ notification.message }}</p>
            <span class="notification-bell__item-date">{{ formatDate(notification.createdAt) }}</span>
          </div>
        </li>

        <li v-if="userNotifications.length === 0" class="notification-bell__empty">
          Nenhuma notificação.
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.notification-bell {
  position: relative;
}

.notification-bell__btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text);
  transition: opacity var(--transition-fast);
}

.notification-bell__btn:hover {
  opacity: 0.7;
}

.notification-bell__dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 11px;
  height: 11px;
  background: var(--color-danger);
  border: 2px solid var(--color-white);
  border-radius: var(--radius-full);
}

.notification-bell__dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: var(--z-dropdown, 150);
  overflow: hidden;
}

.notification-bell__dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #F0EDE9;
}

.notification-bell__dropdown-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.notification-bell__mark-all {
  font-size: var(--text-xs);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-primary);
  text-decoration: underline;
}

.notification-bell__list {
  max-height: 320px;
  overflow-y: auto;
  list-style: none;
}

.notification-bell__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-bg-readonly);
  cursor: pointer;
  transition: background var(--transition-fast);
}

.notification-bell__item:last-child {
  border-bottom: none;
}

.notification-bell__item:hover {
  background: var(--color-bg-hover);
}

.notification-bell__item--unread {
  background: var(--color-warning-light);
}

.notification-bell__item--unread:hover {
  background: #FEF9C3;
}

.notification-bell__item-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-danger);
  flex-shrink: 0;
  margin-top: 5px;
}

.notification-bell__item-body {
  flex: 1;
  min-width: 0;
}

.notification-bell__item-msg {
  font-size: var(--text-xs);
  color: var(--color-text);
  line-height: 1.4;
  word-break: break-word;
}

.notification-bell__item-date {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 4px;
  display: block;
}

.notification-bell__empty {
  padding: 20px 16px;
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
</style>

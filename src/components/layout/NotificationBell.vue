<script setup lang="ts">
import { useNotificationBell } from '@/composables'

const {
  isOpen,
  bellRef,
  userNotifications,
  hasUnread,
  toggle,
  markAllRead,
  formatDate,
  notificationsStore,
} = useNotificationBell()
</script>

<template>
  <div ref="bellRef" class="notification-bell">
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

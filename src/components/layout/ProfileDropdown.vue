<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { SubmenuItem } from '@/types'

const props = defineProps<{
  userName: string
  userPhoto: string
  menuItems: SubmenuItem[]
}>()

const emit = defineEmits<{
  logout: []
}>()

const router = useRouter()
const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const navigate = (route: string) => {
  router.push(route)
  close()
}

const handleLogout = () => {
  close()
  emit('logout')
}

const initial = props.userName ? props.userName.charAt(0).toUpperCase() : '?'
</script>

<template>
  <div class="profile-dropdown" v-click-outside="close">
    <button class="profile-dropdown__trigger" @click="toggle">
      <img
        v-if="userPhoto"
        :src="userPhoto"
        :alt="userName"
        class="profile-dropdown__avatar"
      />
      <span v-else class="profile-dropdown__avatar profile-dropdown__avatar--initial">
        {{ initial }}
      </span>
      <svg
        class="profile-dropdown__chevron"
        :class="{ 'profile-dropdown__chevron--open': isOpen }"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="isOpen" class="profile-dropdown__menu">
      <button
        v-for="item in menuItems"
        :key="item.route"
        class="profile-dropdown__item"
        @click="navigate(item.route)"
      >
        <span class="profile-dropdown__icon">
          <!-- Dashboard -->
          <svg v-if="item.icon === 'dashboard'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
          <!-- Users -->
          <svg v-else-if="item.icon === 'users'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <!-- Coupon -->
          <svg v-else-if="item.icon === 'coupon'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          <!-- Prices -->
          <svg v-else-if="item.icon === 'prices'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <!-- Profile -->
          <svg v-else-if="item.icon === 'profile'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          <!-- Testimonial -->
          <svg v-else-if="item.icon === 'testimonial'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <!-- Settings -->
          <svg v-else-if="item.icon === 'settings'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </span>
        <span class="profile-dropdown__label">{{ item.label }}</span>
      </button>

      <div class="profile-dropdown__divider"></div>

      <button class="profile-dropdown__item profile-dropdown__item--logout" @click="handleLogout">
        <span class="profile-dropdown__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </span>
        <span class="profile-dropdown__label">Sair</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile-dropdown {
  position: relative;
}

.profile-dropdown__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
}

.profile-dropdown__avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.profile-dropdown__avatar--initial {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  color: var(--color-white);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
}

.profile-dropdown__chevron {
  color: var(--color-text);
  transition: transform var(--transition-fast);
}

.profile-dropdown__chevron--open {
  transform: rotate(180deg);
}

.profile-dropdown__menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 239px;
  background: var(--color-white);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  padding: 8px 0;
  z-index: 50;
}

.profile-dropdown__item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background var(--transition-fast);
  text-align: left;
}

.profile-dropdown__item:hover {
  background: rgba(0, 0, 0, 0.04);
}

.profile-dropdown__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--color-text);
  flex-shrink: 0;
}

.profile-dropdown__label {
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.profile-dropdown__divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 4px 0;
}

.profile-dropdown__item--logout .profile-dropdown__icon,
.profile-dropdown__item--logout .profile-dropdown__label {
  color: var(--color-danger);
}
</style>

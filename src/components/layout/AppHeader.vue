<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoSvg from '@/assets/images/logo-casa.svg'
import { navLinks } from '@/data'
import { useAppHeader } from '@/composables'
import NotificationBell from './NotificationBell.vue'
import ProfileDropdown from './ProfileDropdown.vue'

defineProps<{
  minimal?: boolean
}>()

const {
  authStore,
  isMenuOpen,
  menuItems,
  toggleMenu,
  closeMenu,
  isActive,
  handleLogout,
  navigateDashboard,
} = useAppHeader()
</script>

<template>
  <header class="header">
    <div class="header__container">
      <!-- Logo -->
      <RouterLink to="/" class="header__logo">
        <img :src="logoSvg" alt="Morada dos Pets" class="header__logo-icon" />
        <span class="header__logo-text">Morada dos Pets</span>
      </RouterLink>

      <template v-if="!minimal">
        <!-- Mobile Menu Button -->
        <button
          class="header__menu-btn"
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="Menu"
          :aria-expanded="isMenuOpen"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Navigation -->
        <nav class="header__nav" :class="{ 'is-open': isMenuOpen }">
          <ul class="header__nav-list">
            <li v-for="link in navLinks" :key="link.name" class="header__nav-item">
              <RouterLink
                v-if="link.isRoute"
                :to="link.to!"
                class="header__nav-link"
                :class="{ 'is-active': isActive(link) }"
                @click="closeMenu"
              >
                {{ link.name }}
              </RouterLink>
              <a
                v-else
                :href="link.href"
                class="header__nav-link"
                @click="closeMenu"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>

          <!-- Authenticated: bell + dropdown -->
          <div v-if="authStore.isAuthenticated" class="header__user">
            <NotificationBell />
            <ProfileDropdown
              :user-name="authStore.user?.name ?? ''"
              :user-photo="authStore.user?.photo ?? ''"
              :menu-items="menuItems"
              @logout="handleLogout"
            />
          </div>

          <!-- Guest: auth buttons -->
          <div v-else class="header__auth">
            <RouterLink to="/entrar" class="btn btn--outline" @click="closeMenu">Entrar</RouterLink>
            <RouterLink to="/cadastro" class="btn btn--primary" @click="closeMenu">Criar conta</RouterLink>
          </div>

          <!-- Mobile dashboard links (when authenticated) -->
          <div v-if="authStore.isAuthenticated" class="header__mobile-dashboard">
            <button
              v-for="item in menuItems"
              :key="item.route"
              class="header__mobile-dashboard-item"
              @click="navigateDashboard(item.route)"
            >
              {{ item.label }}
            </button>
            <button class="header__mobile-dashboard-item header__mobile-dashboard-item--logout" @click="handleLogout">
              Sair
            </button>
          </div>
        </nav>
      </template>
    </div>
  </header>
</template>

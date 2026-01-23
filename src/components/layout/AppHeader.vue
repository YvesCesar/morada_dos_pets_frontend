<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import logoSvg from '@/assets/images/logo-casa.svg'

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const navLinks = [
  { name: 'Início', to: '/', isRoute: true },
  { name: 'Quem somos', to: '/quem-somos', isRoute: true },
  { name: 'Serviços', href: '/#servicos', isRoute: false },
  { name: 'Contato', href: '/#contato', isRoute: false }
]

const isActive = (link: typeof navLinks[0]) => {
  if (link.isRoute) {
    return route.path === link.to
  }
  return false
}
</script>

<template>
  <header class="header">
    <div class="header__container">
      <!-- Logo -->
      <RouterLink to="/" class="header__logo">
        <img :src="logoSvg" alt="Morada dos Pets" class="header__logo-icon" />
        <span class="header__logo-text">Morada dos Pets</span>
      </RouterLink>

      <!-- Mobile Menu Button -->
      <button
        class="header__menu-btn"
        :class="{ 'is-active': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Menu"
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

        <!-- Auth Buttons -->
        <div class="header__auth">
          <button class="btn btn--outline">Entrar</button>
          <button class="btn btn--primary">Criar conta</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: var(--color-white);
  z-index: var(--z-header);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 5.5rem;
}

.header__logo {
  display: flex;
  align-items: center;
}

.header__logo-icon {
  width: 80px;
  height: 48px;
  flex-shrink: 0;
}

.header__logo-text {
  font-family: var(--font-logo);
  font-size: var(--text-xl);
  color: var(--color-primary);
  white-space: nowrap;
  margin-left: 6px;
}

/* Navigation */
.header__nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: 100%;
}

.header__nav-list {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  height: 100%;
}

.header__nav-item {
  height: 100%;
  display: flex;
  align-items: center;
}

.header__nav-link {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text);
  transition: color var(--transition-fast);
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.header__nav-link:hover {
  color: var(--color-primary);
}

.header__nav-link.is-active {
  font-weight: var(--font-medium);
}

.header__nav-link.is-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 97px;
  height: 6px;
  background: var(--color-primary);
}

/* Auth Buttons */
.header__auth {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.btn--outline {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-text);
}

.btn--outline:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn--primary:hover {
  opacity: 0.9;
}

/* Mobile Menu Button */
.header__menu-btn {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  z-index: 10;
}

.header__menu-btn span {
  display: block;
  width: 100%;
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.header__menu-btn.is-active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.header__menu-btn.is-active span:nth-child(2) {
  opacity: 0;
}

.header__menu-btn.is-active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .header__container {
    padding: 0 2.5rem;
  }
}

@media (max-width: 992px) {
  .header__container {
    padding: 0 1.5rem;
  }

  .header__menu-btn {
    display: flex;
  }

  .header__nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 320px;
    height: 100vh;
    background: var(--color-white);
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    transition: right var(--transition-base);
  }

  .header__nav.is-open {
    right: 0;
  }

  .header__nav-list {
    flex-direction: column;
    gap: 1.5rem;
    height: auto;
  }

  .header__nav-item {
    height: auto;
  }

  .header__nav-link {
    font-size: var(--text-lg);
    height: auto;
  }

  .header__nav-link.is-active::after {
    display: none;
  }

  .header__auth {
    flex-direction: column;
    margin-top: 2rem;
    width: 100%;
  }

  .header__auth .btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .header__logo-icon {
    width: 60px;
    height: 36px;
  }

  .header__logo-text {
    font-size: var(--text-lg);
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { usePricesStore } from '@/stores/prices'
import { useRouteAnnouncer } from '@/composables'

const route = useRoute()
const pricesStore = usePricesStore()
pricesStore.loadPrices()

useRouteAnnouncer()

const isAuthPage = computed(() => {
  return route.name === 'entrar' || route.name === 'cadastro'
})

const isDashboardPage = computed(() => {
  return route.path.startsWith('/dashboard')
})
</script>

<template>
  <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
  <AppHeader :minimal="isAuthPage" />
  <div id="main-content">
    <RouterView />
  </div>
  <AppFooter v-if="!isAuthPage && !isDashboardPage" />
</template>

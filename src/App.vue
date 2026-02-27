<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { usePricesStore } from '@/stores/prices'

const route = useRoute()
const pricesStore = usePricesStore()
pricesStore.loadPrices()

const isAuthPage = computed(() => {
  return route.name === 'entrar' || route.name === 'cadastro'
})

const isDashboardPage = computed(() => {
  return route.path.startsWith('/dashboard')
})
</script>

<template>
  <AppHeader :minimal="isAuthPage" />
  <RouterView />
  <AppFooter v-if="!isAuthPage && !isDashboardPage" />
</template>

<style scoped>
/* App-level scoped styles if needed */
</style>

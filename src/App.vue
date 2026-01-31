<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()

const isAuthPage = computed(() => {
  return route.name === 'entrar' || route.name === 'cadastro'
})
</script>

<template>
  <AppHeader :minimal="isAuthPage" />
  <RouterView />
  <AppFooter v-if="!isAuthPage" />
</template>

<style scoped>
/* App-level scoped styles if needed */
</style>

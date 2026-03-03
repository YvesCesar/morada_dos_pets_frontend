<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <main class="dashboard-layout">
    <div class="dashboard-layout__container">
      <div class="dashboard-layout__header">
        <h1 class="dashboard-layout__title">{{ title }}</h1>
        <p v-if="subtitle" class="dashboard-layout__subtitle">{{ subtitle }}</p>
      </div>
      <slot />
    </div>
  </main>
</template>

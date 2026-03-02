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

<style scoped>
.dashboard-layout {
  padding-top: 90px;
  min-height: 100vh;
  background: var(--color-white);
}

.dashboard-layout__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--spacing-xl) 5.5rem var(--spacing-3xl);
}

.dashboard-layout__header {
  margin-bottom: var(--spacing-xl);
}

.dashboard-layout__title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  line-height: 1.2;
}

.dashboard-layout__subtitle {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text-muted);
  margin-top: 8px;
}

@media (max-width: 1200px) {
  .dashboard-layout__container {
    padding: var(--spacing-xl) 2.5rem var(--spacing-3xl);
  }
}

@media (max-width: 992px) {
  .dashboard-layout__container {
    padding: var(--spacing-lg) 1.5rem var(--spacing-2xl);
  }

  .dashboard-layout__title {
    font-size: var(--text-2xl);
  }
}

@media (max-width: 480px) {
  .dashboard-layout__container {
    padding: var(--spacing-md) 1rem var(--spacing-xl);
  }
}
</style>

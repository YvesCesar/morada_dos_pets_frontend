<script setup lang="ts">
export interface StatCard {
  label: string
  value: string | number
  icon: string
  subtitle?: string
  valueColor?: string
}

defineProps<{
  stats: StatCard[]
}>()
</script>

<template>
  <section class="dashboard-stats">
    <div class="dashboard-stats__grid">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="dashboard-stats__card"
      >
        <div class="dashboard-stats__top">
          <img :src="stat.icon" alt="" class="dashboard-stats__icon" aria-hidden="true" />
          <div class="dashboard-stats__text">
            <span class="dashboard-stats__label">{{ stat.label }}</span>
            <span
              class="dashboard-stats__value"
              :style="stat.valueColor ? { color: stat.valueColor } : undefined"
            >
              {{ stat.value }}
            </span>
          </div>
        </div>
        <div v-if="stat.subtitle" class="dashboard-stats__subtitle">{{ stat.subtitle }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dashboard-stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

.dashboard-stats__card {
  background: var(--color-white);
  border-radius: 14px;
  padding: 24px 24px 0;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 144px;
}

.dashboard-stats__top {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.dashboard-stats__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.dashboard-stats__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.dashboard-stats__label {
  font-size: 14px;
  font-weight: var(--font-semibold);
  color: var(--color-text);
  opacity: 0.9;
  line-height: 1.43;
}

.dashboard-stats__value {
  font-size: 36px;
  font-weight: var(--font-bold);
  color: var(--color-text);
  text-align: right;
  line-height: 1.11;
}

.dashboard-stats__subtitle {
  font-size: 12px;
  color: var(--color-text-muted);
  opacity: 0.75;
  text-align: right;
  line-height: 1.33;
}

@media (max-width: 992px) {
  .dashboard-stats__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .dashboard-stats__grid {
    grid-template-columns: 1fr;
  }
}
</style>

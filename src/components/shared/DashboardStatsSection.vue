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

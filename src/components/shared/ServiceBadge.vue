<script setup lang="ts">
import { computed } from 'vue'
import { SERVICE_COLORS } from '@/config/services'

const props = defineProps<{
  service: string
}>()

const colors = computed(() => SERVICE_COLORS[props.service] ?? { bg: '#888', text: '#fff' })
</script>

<template>
  <span
    class="service-badge"
    :style="{ backgroundColor: colors.bg, color: colors.text }"
  >
    {{ service }}
  </span>
</template>

<style scoped>
.service-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius-badge);
  font-size: var(--text-badge);
  font-weight: var(--font-medium);
  line-height: 1.25;
  white-space: nowrap;
}
</style>

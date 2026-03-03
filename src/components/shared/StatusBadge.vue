<script setup lang="ts">
import { computed } from 'vue'
import type { AppointmentStatus } from '@/types'
import { STATUS_COLORS } from '@/config/services'

const props = defineProps<{
  status: AppointmentStatus
}>()

const colors = computed(() => STATUS_COLORS[props.status] ?? { bg: 'var(--color-neutral-light)', text: 'var(--color-text-muted)' })

const label = computed(() => {
  const labels: Record<AppointmentStatus, string> = {
    confirmado: 'Confirmado',
    pendente: 'Pendente',
    cancelado: 'Cancelado',
  }
  return labels[props.status]
})
</script>

<template>
  <span
    class="status-badge"
    :style="{ backgroundColor: colors.bg, color: colors.text }"
  >
    {{ label }}
  </span>
</template>

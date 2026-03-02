<script setup lang="ts">
import type { Appointment } from '@/types'
import { useInputMasks } from '@/composables'
import StatusBadge from '@/components/shared/StatusBadge.vue'
import ServiceBadge from '@/components/shared/ServiceBadge.vue'

defineProps<{
  appointments: Appointment[]
}>()

const emit = defineEmits<{
  select: [appointment: Appointment]
}>()

const { formatDisplayDate, formatCurrency } = useInputMasks()
</script>

<template>
  <section class="user-appointments">
    <h2 class="user-appointments__title">Meus Agendamentos</h2>

    <div class="user-appointments__list">
      <div
        v-for="a in appointments"
        :key="a.id"
        class="user-appointments__card"
        @click="emit('select', a)"
      >
        <div class="user-appointments__card-header">
          <span class="user-appointments__pet-name">{{ a.petName }}</span>
          <ServiceBadge :service="a.service" />
        </div>
        <div class="user-appointments__card-detail">{{ a.serviceDetail }}</div>
        <div class="user-appointments__card-row">
          <span>{{ formatDisplayDate(a.date) }} às {{ a.time }}</span>
          <StatusBadge :status="a.status" />
        </div>
        <div class="user-appointments__card-value">{{ formatCurrency(a.value) }}</div>

        <div
          v-if="a.service === 'Dog Táxi' && a.address"
          class="user-appointments__address"
        >
          {{ a.address }}
        </div>
      </div>
    </div>

    <p v-if="appointments.length === 0" class="user-appointments__empty">Nenhum agendamento encontrado.</p>
  </section>
</template>

<style scoped>
.user-appointments {
  background: var(--color-white);
  border-radius: 14px;
  padding: var(--spacing-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.user-appointments__title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.user-appointments__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.user-appointments__card {
  padding: var(--spacing-sm);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  cursor: pointer;
  transition: background var(--transition-fast);
}

.user-appointments__card:hover {
  background: rgba(0, 0, 0, 0.02);
}

.user-appointments__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.user-appointments__pet-name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.user-appointments__card-detail {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.user-appointments__card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.user-appointments__card-value {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.user-appointments__address {
  margin-top: 8px;
  padding: 8px 12px;
  background: var(--color-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.user-appointments__empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--spacing-xl);
}
</style>

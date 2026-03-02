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

const { formatDisplayDate } = useInputMasks()
</script>

<template>
  <section class="admin-table">
    <div class="admin-table__wrapper">
      <table class="admin-table__table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Pet</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="a in appointments"
            :key="a.id"
            class="admin-table__row"
            @click="emit('select', a)"
          >
            <td>{{ a.clientName }}</td>
            <td>{{ a.petName }}</td>
            <td><ServiceBadge :service="a.service" /></td>
            <td>{{ formatDisplayDate(a.date) }}</td>
            <td>{{ a.time }}</td>
            <td><StatusBadge :status="a.status" /></td>
          </tr>
          <tr v-if="appointments.length === 0">
            <td colspan="6" class="admin-table__empty">Nenhum agendamento encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.admin-table {
  background: var(--color-white);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.admin-table__wrapper {
  overflow-x: auto;
}

.admin-table__table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table__table th {
  text-align: left;
  padding: 14px 16px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-muted);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

.admin-table__table td {
  padding: 14px 16px;
  font-size: var(--text-xs);
  color: var(--color-text);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  white-space: nowrap;
}

.admin-table__row {
  cursor: pointer;
  transition: background var(--transition-fast);
}

.admin-table__row:hover {
  background: rgba(0, 0, 0, 0.02);
}

.admin-table__empty {
  text-align: center;
  padding: var(--spacing-xl) !important;
  color: var(--color-text-muted);
}
</style>

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

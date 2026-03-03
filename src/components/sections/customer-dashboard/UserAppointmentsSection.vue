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

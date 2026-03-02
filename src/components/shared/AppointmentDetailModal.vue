<script setup lang="ts">
import type { Appointment } from '@/types'
import { useInputMasks } from '@/composables'
import BaseModal from './BaseModal.vue'
import StatusBadge from './StatusBadge.vue'
import ServiceBadge from './ServiceBadge.vue'

defineProps<{
  appointment: Appointment
}>()

const emit = defineEmits<{
  close: []
  cancel: []
}>()

const { formatDisplayDate, formatCurrency } = useInputMasks()
</script>

<template>
  <BaseModal title="Detalhes do Agendamento" @close="emit('close')">
    <div class="appointment-detail">
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Cliente</span>
        <span class="appointment-detail__value">{{ appointment.clientName }}</span>
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Pet</span>
        <span class="appointment-detail__value">{{ appointment.petName }}</span>
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Serviço</span>
        <ServiceBadge :service="appointment.service" />
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Detalhe</span>
        <span class="appointment-detail__value">{{ appointment.serviceDetail }}</span>
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Data</span>
        <span class="appointment-detail__value">{{ formatDisplayDate(appointment.date) }}</span>
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Horário</span>
        <span class="appointment-detail__value">{{ appointment.time }}</span>
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Unidade</span>
        <span class="appointment-detail__value">{{ appointment.unit }}</span>
      </div>
      <div v-if="appointment.address" class="appointment-detail__row">
        <span class="appointment-detail__label">Endereço</span>
        <span class="appointment-detail__value">{{ appointment.address }}</span>
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Valor</span>
        <span class="appointment-detail__value appointment-detail__value--bold">{{ formatCurrency(appointment.value) }}</span>
      </div>
      <div class="appointment-detail__row">
        <span class="appointment-detail__label">Status</span>
        <StatusBadge :status="appointment.status" />
      </div>
    </div>

    <div v-if="appointment.status !== 'cancelado'" class="appointment-detail__footer">
      <button class="appointment-detail__cancel-btn" @click="emit('cancel')">
        Cancelar agendamento
      </button>
    </div>
  </BaseModal>
</template>

<style scoped>
.appointment-detail {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.appointment-detail__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.appointment-detail__row:last-child {
  border-bottom: none;
}

.appointment-detail__label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-text-muted);
}

.appointment-detail__value {
  font-size: var(--text-xs);
  color: var(--color-text);
}

.appointment-detail__value--bold {
  font-weight: var(--font-semibold);
}

.appointment-detail__footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.appointment-detail__cancel-btn {
  padding: 8px 20px;
  background: var(--color-danger-light);
  color: var(--color-danger);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.appointment-detail__cancel-btn:hover {
  opacity: 0.85;
}
</style>

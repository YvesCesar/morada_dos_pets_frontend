<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Appointment } from '@/types'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import DashboardStatsSection from '@/components/shared/DashboardStatsSection.vue'
import type { StatCard } from '@/components/shared/DashboardStatsSection.vue'
import iconAtivos from '@/assets/images/dashboard-icons/icon-clientes-ativos.svg'
import iconInativos from '@/assets/images/dashboard-icons/icon-clientes-inativos.svg'
import iconPets from '@/assets/images/dashboard-icons/icon-pets-cadastrados.svg'
import iconCancelamentos from '@/assets/images/dashboard-icons/icon-cancelamentos.svg'
import AdminServiceCards from '@/components/sections/admin-dashboard/AdminServiceCards.vue'
import DashboardFilterBar from '@/components/shared/DashboardFilterBar.vue'
import AdminAppointmentsTable from '@/components/sections/admin-dashboard/AdminAppointmentsTable.vue'
import AppointmentDetailModal from '@/components/shared/AppointmentDetailModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import { useAppointmentsStore } from '@/stores/appointments'
import { useUsersStore } from '@/stores/users'
import { usePetsStore } from '@/stores/pets'

const appointmentsStore = useAppointmentsStore()
const usersStore = useUsersStore()
const petsStore = usePetsStore()

const selectedAppointment = ref<Appointment | null>(null)
const cancelingAppointment = ref<Appointment | null>(null)

const stats = computed<StatCard[]>(() => [
  { label: 'Clientes Ativos', value: usersStore.users.filter((u) => u.active && u.role === 'customer').length, icon: iconAtivos },
  { label: 'Clientes Inativos', value: usersStore.users.filter((u) => !u.active && u.role === 'customer').length, icon: iconInativos },
  { label: 'Pets Cadastrados', value: petsStore.pets.length, icon: iconPets, subtitle: 'Total registrado' },
  { label: 'Cancelamentos', value: appointmentsStore.appointments.filter((a) => a.status === 'cancelado').length, icon: iconCancelamentos, subtitle: 'Este mês', valueColor: 'var(--color-danger)' },
])

const handleServiceFilter = (value: string) => {
  appointmentsStore.setServiceFilter(value as Appointment['service'] | '')
}

const handlePeriodFilter = (value: string) => {
  appointmentsStore.setPeriodFilter(value as 'semana' | 'mes' | 'trimestre' | '')
}

const handleSelectAppointment = (appointment: Appointment) => {
  selectedAppointment.value = appointment
}

const handleCancelRequest = () => {
  cancelingAppointment.value = selectedAppointment.value
  selectedAppointment.value = null
}

const handleCancelConfirm = () => {
  if (cancelingAppointment.value) {
    appointmentsStore.cancelAppointment(cancelingAppointment.value.id)
    cancelingAppointment.value = null
  }
}
</script>

<template>
  <DashboardLayout title="Dashboard" subtitle="Painel de controle do Morada dos Pets">
    <div class="admin-dashboard">
      <DashboardStatsSection :stats="stats" />
      <AdminServiceCards :counts="appointmentsStore.serviceAppointmentCounts" />
      <DashboardFilterBar
        :service-filter="appointmentsStore.filterService"
        :period-filter="appointmentsStore.filterPeriod"
        @update:service-filter="handleServiceFilter"
        @update:period-filter="handlePeriodFilter"
      />
      <AdminAppointmentsTable
        :appointments="appointmentsStore.filtered"
        @select="handleSelectAppointment"
      />
    </div>

    <AppointmentDetailModal
      v-if="selectedAppointment"
      :appointment="selectedAppointment"
      @close="selectedAppointment = null"
      @cancel="handleCancelRequest"
    />

    <ConfirmModal
      v-if="cancelingAppointment"
      title="Você tem certeza?"
      :message="`Deseja cancelar o agendamento de <strong>${cancelingAppointment.service}</strong>? Esta ação não pode ser desfeita.`"
      confirm-label="Confirmar cancelamento"
      cancel-label="Voltar"
      @close="cancelingAppointment = null"
      @confirm="handleCancelConfirm"
    />
  </DashboardLayout>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>

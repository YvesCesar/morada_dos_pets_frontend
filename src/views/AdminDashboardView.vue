<script setup lang="ts">
import { useAdminDashboard } from '@/composables'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import DashboardStatsSection from '@/components/shared/DashboardStatsSection.vue'
import AdminServiceCards from '@/components/sections/admin-dashboard/AdminServiceCards.vue'
import DashboardFilterBar from '@/components/shared/DashboardFilterBar.vue'
import AdminAppointmentsTable from '@/components/sections/admin-dashboard/AdminAppointmentsTable.vue'
import AppointmentDetailModal from '@/components/shared/AppointmentDetailModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'

const {
  appointmentsStore,
  selectedAppointment,
  cancelingAppointment,
  stats,
  handleSelectAppointment,
  handleCancelRequest,
  handleCancelConfirm,
  handleServiceFilter,
  handlePeriodFilter,
} = useAdminDashboard()
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

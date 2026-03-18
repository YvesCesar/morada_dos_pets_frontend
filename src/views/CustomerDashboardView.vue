<script setup lang="ts">
import type { Appointment } from '@/types'
import { useCustomerDashboard } from '@/composables'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import DashboardStatsSection from '@/components/shared/DashboardStatsSection.vue'
import UserPetsSection from '@/components/sections/customer-dashboard/UserPetsSection.vue'
import UserAppointmentsSection from '@/components/sections/customer-dashboard/UserAppointmentsSection.vue'
import NewPetModal from '@/components/sections/customer-dashboard/NewPetModal.vue'
import EditPetModal from '@/components/sections/customer-dashboard/EditPetModal.vue'
import AppointmentDetailModal from '@/components/shared/AppointmentDetailModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import DashboardFilterBar from '@/components/shared/DashboardFilterBar.vue'
import CustomerTestimonialSection from '@/components/sections/customer-dashboard/CustomerTestimonialSection.vue'

const {
  showNewPet,
  editingPet,
  removingPet,
  selectedAppointment,
  cancelingAppointment,
  firstName,
  myPets,
  myFilteredAppointments,
  stats,
  appointmentsStore,
  handleAddPet,
  handleEditPet,
  handleRemovePet,
  handleSelectAppointment,
  handleCancelRequest,
  handleCancelConfirm,
} = useCustomerDashboard()
</script>

<template>
  <DashboardLayout
    :title="`Olá, ${firstName}!`"
    subtitle="Gerencie as informações sobre os seu(s) pet(s) e agendamento(s)"
  >
    <div class="customer-dashboard">
      <DashboardStatsSection :stats="stats" />
      <UserPetsSection
        :pets="myPets"
        @add="showNewPet = true"
        @edit="editingPet = $event"
        @remove="removingPet = $event"
      />
      <CustomerTestimonialSection />
      <DashboardFilterBar
        :service-filter="appointmentsStore.filterService"
        :period-filter="appointmentsStore.filterPeriod"
        @update:service-filter="(v: string) => appointmentsStore.setServiceFilter(v as Appointment['service'] | '')"
        @update:period-filter="(v: string) => appointmentsStore.setPeriodFilter(v as 'semana' | 'mes' | 'trimestre' | '')"
      />
      <UserAppointmentsSection
        :appointments="myFilteredAppointments"
        @select="handleSelectAppointment"
      />
    </div>

    <NewPetModal
      v-if="showNewPet"
      @close="showNewPet = false"
      @save="handleAddPet"
    />

    <EditPetModal
      v-if="editingPet"
      :pet="editingPet"
      @close="editingPet = null"
      @save="handleEditPet"
    />

    <ConfirmModal
      v-if="removingPet"
      title="Você tem certeza?"
      :message="`Deseja remover <strong>${removingPet.name}</strong> da sua lista de pets? Esta ação não pode ser desfeita.`"
      @close="removingPet = null"
      @confirm="handleRemovePet"
    />

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

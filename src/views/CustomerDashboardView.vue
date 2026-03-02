<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DashboardPet, Appointment } from '@/types'
import { useInputMasks } from '@/composables'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import DashboardStatsSection from '@/components/shared/DashboardStatsSection.vue'
import type { StatCard } from '@/components/shared/DashboardStatsSection.vue'
import iconPets from '@/assets/images/dashboard-icons/icon-pets-cadastrados.svg'
import iconAgendamentos from '@/assets/images/dashboard-icons/icon-agendamentos.svg'
import iconPendentes from '@/assets/images/dashboard-icons/icon-pendentes.svg'
import iconTotalGasto from '@/assets/images/dashboard-icons/icon-total-gasto.svg'
import UserPetsSection from '@/components/sections/customer-dashboard/UserPetsSection.vue'
import UserAppointmentsSection from '@/components/sections/customer-dashboard/UserAppointmentsSection.vue'
import NewPetModal from '@/components/sections/customer-dashboard/NewPetModal.vue'
import EditPetModal from '@/components/sections/customer-dashboard/EditPetModal.vue'
import AppointmentDetailModal from '@/components/shared/AppointmentDetailModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import DashboardFilterBar from '@/components/shared/DashboardFilterBar.vue'
import CustomerTestimonialSection from '@/components/sections/customer-dashboard/CustomerTestimonialSection.vue'
import { useAuthStore } from '@/stores/auth'
import { usePetsStore } from '@/stores/pets'
import { useAppointmentsStore } from '@/stores/appointments'

const { formatCurrency } = useInputMasks()
const authStore = useAuthStore()
const petsStore = usePetsStore()
const appointmentsStore = useAppointmentsStore()

const showNewPet = ref(false)
const editingPet = ref<DashboardPet | null>(null)
const removingPet = ref<DashboardPet | null>(null)
const selectedAppointment = ref<Appointment | null>(null)
const cancelingAppointment = ref<Appointment | null>(null)

const userId = computed(() => authStore.user?.id ?? '')
const firstName = computed(() => authStore.user?.name?.split(' ')[0] ?? '')

const myPets = computed(() => petsStore.getByOwner(userId.value))
const myAppointments = computed(() => appointmentsStore.getByClient(userId.value))
const myFilteredAppointments = computed(() =>
  appointmentsStore.filtered.filter((a) => a.clientId === userId.value),
)

const totalSpent = computed(() =>
  myAppointments.value
    .filter((a) => a.status !== 'cancelado')
    .reduce((sum, a) => sum + a.value, 0),
)

const stats = computed<StatCard[]>(() => [
  { label: 'Meus Pets', value: myPets.value.length, icon: iconPets, subtitle: 'Cadastrados', valueColor: '#544033' },
  { label: 'Agendamentos', value: myAppointments.value.filter((a) => a.status === 'confirmado').length, icon: iconAgendamentos, subtitle: 'Confirmados', valueColor: 'var(--color-success)' },
  { label: 'Pendentes', value: myAppointments.value.filter((a) => a.status === 'pendente').length, icon: iconPendentes, subtitle: 'Aguardando' },
  { label: 'Total Gasto', value: formatCurrency(totalSpent.value), icon: iconTotalGasto, subtitle: 'Este mês' },
])

const handleAddPet = (data: { name: string; birthDate: string; breed: string; weight: number; photo: string }) => {
  petsStore.addPet({ ownerId: userId.value, ...data })
  showNewPet.value = false
}

const handleEditPet = (data: Partial<DashboardPet>) => {
  if (editingPet.value) {
    petsStore.updatePet(editingPet.value.id, data)
    editingPet.value = null
  }
}

const handleRemovePet = () => {
  if (removingPet.value) {
    petsStore.removePet(removingPet.value.id)
    removingPet.value = null
  }
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
        @select="selectedAppointment = $event"
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

<style scoped>
.customer-dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>

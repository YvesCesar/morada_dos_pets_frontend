import { ref, computed } from 'vue'
import type { DashboardPet } from '@/types'
import type { StatCard } from '@/components/shared/DashboardStatsSection.vue'
import { useInputMasks } from './useInputMasks'
import { useAppointmentActions } from './useAppointmentActions'
import { useAuthStore } from '@/stores/auth'
import { usePetsStore } from '@/stores/pets'
import { useAppointmentsStore } from '@/stores/appointments'
import iconPets from '@/assets/images/dashboard-icons/icon-pets-cadastrados.svg'
import iconAgendamentos from '@/assets/images/dashboard-icons/icon-agendamentos.svg'
import iconPendentes from '@/assets/images/dashboard-icons/icon-pendentes.svg'
import iconTotalGasto from '@/assets/images/dashboard-icons/icon-total-gasto.svg'

/**
 * Composable para orquestração do dashboard do cliente
 */
export function useCustomerDashboard() {
  const { formatCurrency } = useInputMasks()
  const authStore = useAuthStore()
  const petsStore = usePetsStore()
  const appointmentsStore = useAppointmentsStore()

  const {
    selectedAppointment,
    cancelingAppointment,
    handleSelectAppointment,
    handleCancelRequest,
    handleCancelConfirm,
  } = useAppointmentActions()

  const showNewPet = ref(false)
  const editingPet = ref<DashboardPet | null>(null)
  const removingPet = ref<DashboardPet | null>(null)

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

  return {
    showNewPet,
    editingPet,
    removingPet,
    selectedAppointment,
    cancelingAppointment,
    userId,
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
  }
}

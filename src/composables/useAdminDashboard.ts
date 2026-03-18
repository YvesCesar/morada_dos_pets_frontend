import { computed } from 'vue'
import type { Appointment } from '@/types'
import type { StatCard } from '@/components/shared/DashboardStatsSection.vue'
import { useAppointmentActions } from './useAppointmentActions'
import { useAppointmentsStore } from '@/stores/appointments'
import { useUsersStore } from '@/stores/users'
import { usePetsStore } from '@/stores/pets'
import iconAtivos from '@/assets/images/dashboard-icons/icon-clientes-ativos.svg'
import iconInativos from '@/assets/images/dashboard-icons/icon-clientes-inativos.svg'
import iconPets from '@/assets/images/dashboard-icons/icon-pets-cadastrados.svg'
import iconCancelamentos from '@/assets/images/dashboard-icons/icon-cancelamentos.svg'

/**
 * Composable para orquestração do dashboard admin
 */
export function useAdminDashboard() {
  const appointmentsStore = useAppointmentsStore()
  const usersStore = useUsersStore()
  const petsStore = usePetsStore()

  const {
    selectedAppointment,
    cancelingAppointment,
    handleSelectAppointment,
    handleCancelRequest,
    handleCancelConfirm,
  } = useAppointmentActions()

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

  return {
    appointmentsStore,
    selectedAppointment,
    cancelingAppointment,
    stats,
    handleSelectAppointment,
    handleCancelRequest,
    handleCancelConfirm,
    handleServiceFilter,
    handlePeriodFilter,
  }
}

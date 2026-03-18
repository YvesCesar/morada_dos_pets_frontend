import { ref } from 'vue'
import type { Appointment } from '@/types'
import { useAppointmentsStore } from '@/stores/appointments'

/**
 * Composable para seleção e cancelamento de agendamentos
 */
export function useAppointmentActions() {
  const appointmentsStore = useAppointmentsStore()

  const selectedAppointment = ref<Appointment | null>(null)
  const cancelingAppointment = ref<Appointment | null>(null)

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

  return {
    selectedAppointment,
    cancelingAppointment,
    handleSelectAppointment,
    handleCancelRequest,
    handleCancelConfirm,
  }
}

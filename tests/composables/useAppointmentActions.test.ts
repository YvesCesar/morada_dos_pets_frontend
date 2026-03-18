import { useAppointmentActions } from '@/composables/useAppointmentActions'
import { useAppointmentsStore } from '@/stores/appointments'
import { freshPinia } from '../helpers'
import type { Appointment } from '@/types'

describe('useAppointmentActions', () => {
  beforeEach(() => {
    freshPinia()
  })

  const mockAppointment: Appointment = {
    id: 'apt-1',
    clientId: 'client-1',
    clientName: 'Maria Silva',
    petId: 'pet-1',
    petName: 'Rex',
    service: 'Dog Spa',
    serviceDetail: 'Banho completo',
    date: '2025-03-15',
    time: '10:00',
    status: 'confirmado',
    value: 89.9,
    unit: 'Unidade Centro',
  }

  it('initializes with null values', () => {
    const { selectedAppointment, cancelingAppointment } = useAppointmentActions()

    expect(selectedAppointment.value).toBeNull()
    expect(cancelingAppointment.value).toBeNull()
  })

  it('handleSelectAppointment sets the selected appointment', () => {
    const { selectedAppointment, handleSelectAppointment } = useAppointmentActions()

    handleSelectAppointment(mockAppointment)

    expect(selectedAppointment.value).toEqual(mockAppointment)
  })

  it('handleCancelRequest moves selected to canceling and clears selected', () => {
    const { selectedAppointment, cancelingAppointment, handleSelectAppointment, handleCancelRequest } =
      useAppointmentActions()

    handleSelectAppointment(mockAppointment)
    handleCancelRequest()

    expect(cancelingAppointment.value).toEqual(mockAppointment)
    expect(selectedAppointment.value).toBeNull()
  })

  it('handleCancelConfirm calls store and clears canceling', () => {
    const { cancelingAppointment, handleSelectAppointment, handleCancelRequest, handleCancelConfirm } =
      useAppointmentActions()

    const store = useAppointmentsStore()
    const cancelSpy = vi.spyOn(store, 'cancelAppointment')

    handleSelectAppointment(mockAppointment)
    handleCancelRequest()
    handleCancelConfirm()

    expect(cancelSpy).toHaveBeenCalledWith('apt-1')
    expect(cancelingAppointment.value).toBeNull()
  })

  it('handleCancelConfirm does nothing when cancelingAppointment is null', () => {
    const { handleCancelConfirm } = useAppointmentActions()

    const store = useAppointmentsStore()
    const cancelSpy = vi.spyOn(store, 'cancelAppointment')

    handleCancelConfirm()

    expect(cancelSpy).not.toHaveBeenCalled()
  })
})

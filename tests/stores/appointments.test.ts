import { freshPinia } from '../helpers'
import { useAppointmentsStore } from '@/stores/appointments'

describe('useAppointmentsStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('initializes with mock appointments', () => {
    const store = useAppointmentsStore()
    expect(store.appointments.length).toBeGreaterThan(0)
  })

  it('getByClient filters by clientId', () => {
    const store = useAppointmentsStore()
    const clientAppts = store.getByClient('u2')
    expect(clientAppts.every((appointment) => appointment.clientId === 'u2')).toBe(true)
    expect(clientAppts.length).toBeGreaterThan(0)
  })

  it('cancelAppointment sets status to cancelado', () => {
    const store = useAppointmentsStore()
    const activeAppointment = store.appointments.find((appointment) => appointment.status !== 'cancelado')!
    store.cancelAppointment(activeAppointment.id)
    expect(store.appointments.find((appointment) => appointment.id === activeAppointment.id)?.status).toBe('cancelado')
  })

  it('serviceAppointmentCounts counts correctly', () => {
    const store = useAppointmentsStore()
    const counts = store.serviceAppointmentCounts
    const manualDogSpa = store.appointments.filter((appointment) => appointment.service === 'Dog Spa').length
    expect(counts['Dog Spa']).toBe(manualDogSpa)
  })

  describe('filtered computed', () => {
    it('returns all when no filters set', () => {
      const store = useAppointmentsStore()
      expect(store.filtered.length).toBe(store.appointments.length)
    })

    it('filters by service', () => {
      const store = useAppointmentsStore()
      store.setServiceFilter('Dog Spa')
      expect(store.filtered.every((appointment) => appointment.service === 'Dog Spa')).toBe(true)
    })

    it('filters by period (semana)', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-02-15'))

      freshPinia()
      const store = useAppointmentsStore()
      store.setPeriodFilter('semana')

      // Only appointments from 2025-02-08 or later
      const weekAgo = new Date('2025-02-08')
      expect(store.filtered.every((appointment) => new Date(appointment.date) >= weekAgo)).toBe(true)

      vi.useRealTimers()
    })

    it('filters by period (mes)', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-02-15'))

      freshPinia()
      const store = useAppointmentsStore()
      store.setPeriodFilter('mes')

      const monthAgo = new Date(new Date('2025-02-15').getTime() - 30 * 24 * 60 * 60 * 1000)
      expect(store.filtered.every((appointment) => new Date(appointment.date) >= monthAgo)).toBe(true)

      vi.useRealTimers()
    })

    it('filters by period (trimestre)', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-03-10'))

      freshPinia()
      const store = useAppointmentsStore()
      store.setPeriodFilter('trimestre')

      const quarterAgo = new Date(new Date('2025-03-10').getTime() - 90 * 24 * 60 * 60 * 1000)
      expect(store.filtered.every((appointment) => new Date(appointment.date) >= quarterAgo)).toBe(true)

      vi.useRealTimers()
    })

    it('combines service and period filters', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-03-10'))

      freshPinia()
      const store = useAppointmentsStore()
      store.setServiceFilter('Dog Spa')
      store.setPeriodFilter('trimestre')

      expect(store.filtered.every((appointment) => appointment.service === 'Dog Spa')).toBe(true)

      vi.useRealTimers()
    })
  })
})

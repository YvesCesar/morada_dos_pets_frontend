/**
 * Store de agendamentos — listagem com filtros
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Appointment } from '@/types'
import { mockAppointments } from '@/data'

type ServiceFilter = Appointment['service'] | ''
type PeriodFilter = 'semana' | 'mes' | 'trimestre' | ''

export const useAppointmentsStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>([...mockAppointments])
  const filterService = ref<ServiceFilter>('')
  const filterPeriod = ref<PeriodFilter>('')

  const filtered = computed(() => {
    let result = [...appointments.value]

    if (filterService.value) {
      result = result.filter((a) => a.service === filterService.value)
    }

    if (filterPeriod.value) {
      const now = new Date()
      if (filterPeriod.value === 'semana') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        result = result.filter((a) => new Date(a.date) >= weekAgo)
      } else if (filterPeriod.value === 'mes') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        result = result.filter((a) => new Date(a.date) >= monthAgo)
      } else if (filterPeriod.value === 'trimestre') {
        const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        result = result.filter((a) => new Date(a.date) >= quarterAgo)
      }
    }

    return result
  })

  function getByClient(clientId: string) {
    return appointments.value.filter((a) => a.clientId === clientId)
  }

  function cancelAppointment(id: string) {
    const a = appointments.value.find((a) => a.id === id)
    if (a) a.status = 'cancelado'
  }

  function setServiceFilter(service: ServiceFilter) {
    filterService.value = service
  }

  function setPeriodFilter(period: PeriodFilter) {
    filterPeriod.value = period
  }

  const serviceAppointmentCounts = computed(() => {
    const counts: Record<string, number> = {
      'Dog Spa': 0,
      'Hospedagem': 0,
      'Dog Táxi': 0,
    }
    for (const a of appointments.value) {
      if (a.service in counts) counts[a.service]!++
    }
    return counts
  })

  return {
    appointments,
    filterService,
    filterPeriod,
    filtered,
    getByClient,
    cancelAppointment,
    setServiceFilter,
    setPeriodFilter,
    serviceAppointmentCounts,
  }
})

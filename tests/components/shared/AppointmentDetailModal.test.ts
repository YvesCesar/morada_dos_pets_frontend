import { mount } from '@vue/test-utils'
import AppointmentDetailModal from '@/components/shared/AppointmentDetailModal.vue'
import type { Appointment } from '@/types'

describe('AppointmentDetailModal', () => {
  const baseAppointment: Appointment = {
    id: 'a1',
    clientId: 'u2',
    clientName: 'Maria Silva',
    petId: 'p1',
    petName: 'Thor',
    service: 'Dog Spa',
    serviceDetail: 'Banho + Tosa',
    date: '2025-02-10',
    time: '09:00',
    status: 'confirmado',
    value: 119.8,
    unit: 'Horizonte',
  }

  const mountModal = (appointment: Appointment) =>
    mount(AppointmentDetailModal, {
      props: { appointment },
      global: { stubs: { Teleport: true } },
    })

  it('renders appointment details', () => {
    const wrapper = mountModal(baseAppointment)
    expect(wrapper.text()).toContain('Maria Silva')
    expect(wrapper.text()).toContain('Thor')
    expect(wrapper.text()).toContain('Dog Spa')
    expect(wrapper.text()).toContain('10/02/2025')
    expect(wrapper.text()).toContain('09:00')
    expect(wrapper.text()).toContain('Horizonte')
  })

  it('formats currency', () => {
    const wrapper = mountModal(baseAppointment)
    expect(wrapper.text()).toContain('119')
  })

  it('shows cancel button when status is not cancelado', () => {
    const wrapper = mountModal(baseAppointment)
    expect(wrapper.find('.appointment-detail__cancel-btn').exists()).toBe(true)
  })

  it('hides cancel button when status is cancelado', () => {
    const cancelled = { ...baseAppointment, status: 'cancelado' as const }
    const wrapper = mountModal(cancelled)
    expect(wrapper.find('.appointment-detail__cancel-btn').exists()).toBe(false)
  })

  it('emits cancel when cancel button is clicked', async () => {
    const wrapper = mountModal(baseAppointment)
    await wrapper.find('.appointment-detail__cancel-btn').trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('renders address when present', () => {
    const withAddress = { ...baseAppointment, address: 'Rua das Flores, 42' }
    const wrapper = mountModal(withAddress)
    expect(wrapper.text()).toContain('Rua das Flores, 42')
  })

  it('does not render address row when absent', () => {
    const wrapper = mountModal(baseAppointment)
    const labels = wrapper.findAll('.appointment-detail__label')
    const hasAddress = labels.some((label) => label.text() === 'Endereço')
    expect(hasAddress).toBe(false)
  })
})

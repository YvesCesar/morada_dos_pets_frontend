import { mount } from '@vue/test-utils'
import DashboardStatsSection from '@/components/shared/DashboardStatsSection.vue'

describe('DashboardStatsSection', () => {
  const stats = [
    { label: 'Agendamentos', value: 48, icon: '/icons/calendar.svg' },
    {
      label: 'Clientes Ativos',
      value: '127',
      icon: '/icons/users.svg',
      subtitle: 'nos últimos 30 dias',
      valueColor: '#00A63E',
    },
  ]

  it('renders all stat cards', () => {
    const wrapper = mount(DashboardStatsSection, { props: { stats } })
    const cards = wrapper.findAll('.dashboard-stats__card')
    expect(cards.length).toBe(2)
  })

  it('displays label and value', () => {
    const wrapper = mount(DashboardStatsSection, { props: { stats } })
    expect(wrapper.text()).toContain('Agendamentos')
    expect(wrapper.text()).toContain('48')
  })

  it('renders subtitle when provided', () => {
    const wrapper = mount(DashboardStatsSection, { props: { stats } })
    expect(wrapper.text()).toContain('nos últimos 30 dias')
  })

  it('applies valueColor when provided', () => {
    const wrapper = mount(DashboardStatsSection, { props: { stats } })
    const values = wrapper.findAll('.dashboard-stats__value')
    expect(values[1]!.attributes('style')).toContain('#00A63E')
  })

  it('does not apply style when valueColor is absent', () => {
    const wrapper = mount(DashboardStatsSection, { props: { stats } })
    const values = wrapper.findAll('.dashboard-stats__value')
    expect(values[0]!.attributes('style')).toBeUndefined()
  })
})

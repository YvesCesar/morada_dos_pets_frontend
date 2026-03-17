import { mount } from '@vue/test-utils'
import StatusBadge from '@/components/shared/StatusBadge.vue'

describe('StatusBadge', () => {
  it('renders "Confirmado" label for confirmado status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'confirmado' } })
    expect(wrapper.text()).toBe('Confirmado')
  })

  it('renders "Pendente" label for pendente status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'pendente' } })
    expect(wrapper.text()).toBe('Pendente')
  })

  it('renders "Cancelado" label for cancelado status', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'cancelado' } })
    expect(wrapper.text()).toBe('Cancelado')
  })

  it('applies correct colors for confirmado', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'confirmado' } })
    const style = wrapper.find('.badge').attributes('style')!
    expect(style).toContain('#F0FDF4')
    expect(style).toContain('#00A63E')
  })

  it('applies correct colors for pendente', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'pendente' } })
    const style = wrapper.find('.badge').attributes('style')!
    expect(style).toContain('#FEFCE8')
    expect(style).toContain('#D08700')
  })

  it('applies correct colors for cancelado', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'cancelado' } })
    const style = wrapper.find('.badge').attributes('style')!
    expect(style).toContain('#FEF2F2')
    expect(style).toContain('#A31C0A')
  })
})

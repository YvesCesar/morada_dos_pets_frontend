import { mount } from '@vue/test-utils'
import DashboardFilterBar from '@/components/shared/DashboardFilterBar.vue'

describe('DashboardFilterBar', () => {
  const defaultProps = {
    serviceFilter: '',
    periodFilter: '',
  }

  it('renders two select elements', () => {
    const wrapper = mount(DashboardFilterBar, { props: defaultProps })
    const selects = wrapper.findAll('select')
    expect(selects.length).toBe(2)
  })

  it('emits update:serviceFilter on service change', async () => {
    const wrapper = mount(DashboardFilterBar, { props: defaultProps })
    const selects = wrapper.findAll('select')
    await selects[0]!.setValue('Dog Spa')
    expect(wrapper.emitted('update:serviceFilter')?.[0]).toEqual(['Dog Spa'])
  })

  it('emits update:periodFilter on period change', async () => {
    const wrapper = mount(DashboardFilterBar, { props: defaultProps })
    const selects = wrapper.findAll('select')
    await selects[1]!.setValue('semana')
    expect(wrapper.emitted('update:periodFilter')?.[0]).toEqual(['semana'])
  })

  it('reflects current filter values', () => {
    const wrapper = mount(DashboardFilterBar, {
      props: { serviceFilter: 'Hospedagem', periodFilter: 'mes' },
    })
    const selects = wrapper.findAll('select')
    expect((selects[0]!.element as HTMLSelectElement).value).toBe('Hospedagem')
    expect((selects[1]!.element as HTMLSelectElement).value).toBe('mes')
  })
})

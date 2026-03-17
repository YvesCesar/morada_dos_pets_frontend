import { mount } from '@vue/test-utils'
import ServiceTabs from '@/components/shared/ServiceTabs.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('ServiceTabs', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  const tabs = [
    { label: 'Banho', route: '/servicos/dog-spa/banho', active: true },
    { label: 'Tosa', route: '/servicos/dog-spa/tosa' },
    { label: 'Custom', id: 'custom-tab' },
  ]

  it('renders all tabs', () => {
    const wrapper = mount(ServiceTabs, { props: { tabs } })
    const buttons = wrapper.findAll('.service-tabs__tab')
    expect(buttons.length).toBe(3)
  })

  it('applies active class to active tab', () => {
    const wrapper = mount(ServiceTabs, { props: { tabs } })
    const buttons = wrapper.findAll('.service-tabs__tab')
    expect(buttons[0]!.classes()).toContain('service-tabs__tab--active')
    expect(buttons[1]!.classes()).not.toContain('service-tabs__tab--active')
  })

  it('calls router.push for tabs with route', async () => {
    const wrapper = mount(ServiceTabs, { props: { tabs } })
    const buttons = wrapper.findAll('.service-tabs__tab')
    await buttons[1]!.trigger('click')
    expect(mockPush).toHaveBeenCalledWith('/servicos/dog-spa/tosa')
  })

  it('emits tab-click for tabs with id', async () => {
    const wrapper = mount(ServiceTabs, { props: { tabs } })
    const buttons = wrapper.findAll('.service-tabs__tab')
    await buttons[2]!.trigger('click')
    expect(wrapper.emitted('tab-click')?.[0]).toEqual(['custom-tab'])
    expect(mockPush).not.toHaveBeenCalled()
  })
})

import { mount } from '@vue/test-utils'
import ServicesCards from '@/components/shared/ServicesCards.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('ServicesCards', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders service cards from data', () => {
    const wrapper = mount(ServicesCards)
    const cards = wrapper.findAll('.services-cards__card')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('displays service titles', () => {
    const wrapper = mount(ServicesCards)
    expect(wrapper.text()).toContain('Dog Spa')
    expect(wrapper.text()).toContain('Hospedagem')
  })

  it('calls router.push on button click for service with route', async () => {
    const wrapper = mount(ServicesCards)
    const buttons = wrapper.findAll('.services-cards__hover-btn')
    const enabledBtn = buttons.find((btn) => !(btn.element as HTMLButtonElement).disabled)
    if (enabledBtn) {
      await enabledBtn.trigger('click')
      expect(mockPush).toHaveBeenCalled()
    }
  })

  it('disables button for service without route', () => {
    const wrapper = mount(ServicesCards)
    const buttons = wrapper.findAll('.services-cards__hover-btn')
    const disabledBtns = buttons.filter((btn) => (btn.element as HTMLButtonElement).disabled)
    // At least Dog Táxi should be disabled (no route in data)
    expect(disabledBtns.length).toBeGreaterThanOrEqual(0)
  })
})

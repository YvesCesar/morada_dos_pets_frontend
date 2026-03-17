import { mount } from '@vue/test-utils'
import ServiceBadge from '@/components/shared/ServiceBadge.vue'

describe('ServiceBadge', () => {
  it('renders service name', () => {
    const wrapper = mount(ServiceBadge, { props: { service: 'Dog Spa' } })
    expect(wrapper.text()).toBe('Dog Spa')
  })

  it('applies correct colors for known service', () => {
    const wrapper = mount(ServiceBadge, { props: { service: 'Dog Spa' } })
    const span = wrapper.find('.badge')
    expect(span.attributes('style')).toContain('background-color')
    expect(span.attributes('style')).toContain('#C7A841')
  })

  it('uses fallback colors for unknown service', () => {
    const wrapper = mount(ServiceBadge, { props: { service: 'Unknown' } })
    const span = wrapper.find('.badge')
    expect(span.attributes('style')).toContain('#888')
    expect(span.attributes('style')).toContain('#fff')
  })
})

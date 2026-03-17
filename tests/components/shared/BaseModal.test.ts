import { mount } from '@vue/test-utils'
import BaseModal from '@/components/shared/BaseModal.vue'

describe('BaseModal', () => {
  const mountModal = (props: Record<string, any> = {}, slots: Record<string, string> = {}) =>
    mount(BaseModal, {
      props,
      slots,
      global: { stubs: { Teleport: true } },
    })

  it('renders content', () => {
    const wrapper = mountModal({}, { default: '<p>Detalhes do agendamento</p>' })
    expect(wrapper.html()).toContain('Detalhes do agendamento')
  })

  it('renders title when provided', () => {
    const wrapper = mountModal({ title: 'Editar Pet' })
    expect(wrapper.find('.base-modal__title').text()).toBe('Editar Pet')
  })

  it('does not render title when not provided', () => {
    const wrapper = mountModal()
    expect(wrapper.find('.base-modal__title').exists()).toBe(false)
  })

  it('emits close when overlay is clicked directly', async () => {
    const wrapper = mountModal()
    await wrapper.find('.base-modal__overlay').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not emit close when modal content is clicked', async () => {
    const wrapper = mountModal({}, { default: '<p>Informações do pet</p>' })
    await wrapper.find('.base-modal').trigger('click')
    expect(wrapper.emitted('close')).toBeUndefined()
  })

  it('emits close when close button is clicked', async () => {
    const wrapper = mountModal()
    await wrapper.find('.base-modal__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('renders slot content', () => {
    const wrapper = mountModal(
      {},
      { default: '<div class="pet-form">Formulário de cadastro</div>' },
    )
    expect(wrapper.find('.pet-form').exists()).toBe(true)
  })

  it('applies custom width', () => {
    const wrapper = mountModal({ width: '600px' })
    expect(wrapper.find('.base-modal').attributes('style')).toContain('width: 600px')
  })
})

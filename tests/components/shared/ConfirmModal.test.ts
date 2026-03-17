import { mount } from '@vue/test-utils'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'

describe('ConfirmModal', () => {
  const defaultProps = {
    title: 'Cancelar Agendamento',
    message: 'Tem certeza que deseja cancelar o agendamento de Banho para Thor?',
  }

  const mountModal = (props: Record<string, any> = {}) =>
    mount(ConfirmModal, {
      props: { ...defaultProps, ...props },
      global: { stubs: { Teleport: true } },
    })

  it('renders title and message', () => {
    const wrapper = mountModal()
    expect(wrapper.text()).toContain('Cancelar Agendamento')
    expect(wrapper.text()).toContain(
      'Tem certeza que deseja cancelar o agendamento de Banho para Thor?',
    )
  })

  it('uses default button labels', () => {
    const wrapper = mountModal()
    expect(wrapper.text()).toContain('Cancelar')
    expect(wrapper.text()).toContain('Confirmar')
  })

  it('uses custom button labels', () => {
    const wrapper = mountModal({ confirmLabel: 'Sim, cancelar', cancelLabel: 'Voltar' })
    expect(wrapper.text()).toContain('Sim, cancelar')
    expect(wrapper.text()).toContain('Voltar')
  })

  it('emits confirm on confirm click', async () => {
    const wrapper = mountModal()
    await wrapper.find('.confirm-modal__btn--confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
  })

  it('emits close on cancel click', async () => {
    const wrapper = mountModal()
    await wrapper.find('.confirm-modal__btn--cancel').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})

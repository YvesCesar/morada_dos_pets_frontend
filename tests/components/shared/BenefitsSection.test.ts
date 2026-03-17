import { mount } from '@vue/test-utils'
import BenefitsSection from '@/components/shared/BenefitsSection.vue'

describe('BenefitsSection', () => {
  const benefits = [
    {
      icon: '/icons/equipe-especializada.svg',
      title: 'Equipe Especializada',
      description: 'Profissionais treinados para cuidar do seu pet com carinho e segurança.',
    },
    {
      icon: '/icons/ambiente-seguro.svg',
      title: 'Ambiente Seguro',
      description: 'Instalações preparadas para garantir o bem-estar dos animais.',
    },
  ]

  it('renders default title', () => {
    const wrapper = mount(BenefitsSection, { props: { benefits } })
    expect(wrapper.text()).toContain('Benefícios por escolher a Morada dos Pets')
  })

  it('renders custom title', () => {
    const wrapper = mount(BenefitsSection, {
      props: { benefits, title: 'Vantagens do Dog Spa' },
    })
    expect(wrapper.text()).toContain('Vantagens do Dog Spa')
  })

  it('renders all benefit cards', () => {
    const wrapper = mount(BenefitsSection, { props: { benefits } })
    const cards = wrapper.findAll('.benefits__card')
    expect(cards.length).toBe(2)
  })

  it('displays benefit title and description', () => {
    const wrapper = mount(BenefitsSection, { props: { benefits } })
    expect(wrapper.text()).toContain('Equipe Especializada')
    expect(wrapper.text()).toContain(
      'Profissionais treinados para cuidar do seu pet com carinho e segurança.',
    )
  })
})

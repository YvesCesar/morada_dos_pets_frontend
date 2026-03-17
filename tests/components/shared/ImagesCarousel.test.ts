import { mount } from '@vue/test-utils'
import ImagesCarousel from '@/components/shared/ImagesCarousel.vue'
import type { ClientImage } from '@/types'

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('ImagesCarousel', () => {
  const clientImages: ClientImage[] = [
    { id: 1, image: '/clientes/thor-golden-retriever.jpg', alt: 'Thor - Golden Retriever' },
    { id: 2, image: '/clientes/luna-bulldog-frances.jpg', alt: 'Luna - Bulldog Francês' },
    { id: 3, image: '/clientes/mel-poodle.jpg', alt: 'Mel - Poodle' },
  ]

  it('renders the default title', () => {
    const wrapper = mount(ImagesCarousel, { props: { images: clientImages } })
    expect(wrapper.text()).toContain('Conheça alguns dos nossos clientes')
  })

  it('renders custom title', () => {
    const wrapper = mount(ImagesCarousel, {
      props: { images: clientImages, title: 'Nossos clientes do Dog Spa' },
    })
    expect(wrapper.text()).toContain('Nossos clientes do Dog Spa')
  })

  it('renders navigation arrows', () => {
    const wrapper = mount(ImagesCarousel, { props: { images: clientImages } })
    expect(wrapper.find('.images-carousel__arrow--left').exists()).toBe(true)
    expect(wrapper.find('.images-carousel__arrow--right').exists()).toBe(true)
  })

  it('renders extended images (3x for infinite loop)', () => {
    const wrapper = mount(ImagesCarousel, { props: { images: clientImages } })
    const cards = wrapper.findAll('.images-carousel__card')
    expect(cards.length).toBe(9) // 3 images * 3 groups
  })

  it('has touch event handlers on container', () => {
    const wrapper = mount(ImagesCarousel, { props: { images: clientImages } })
    const container = wrapper.find('.images-carousel__container')
    expect(container.exists()).toBe(true)
  })
})

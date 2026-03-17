vi.mock('@/assets/images/testemunho-cliente.png', () => ({ default: 'mock-photo.png' }))

import { freshPinia } from '../helpers'
import { useTestimonialsStore } from '@/stores/testimonials'

describe('useTestimonialsStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('initializes with mock testimonials', () => {
    const store = useTestimonialsStore()
    expect(store.testimonials.length).toBeGreaterThan(0)
  })

  describe('publicCarouselItems', () => {
    it('filters approved + allowPublic testimonials', () => {
      const store = useTestimonialsStore()
      const publicItems = store.publicCarouselItems
      expect(publicItems.length).toBeGreaterThan(0)
      publicItems.forEach((item) => {
        expect(item.author).toBeTruthy()
        expect(item.quote).toBeTruthy()
      })
    })
  })

  describe('submitTestimonial', () => {
    it('creates new testimonial for new user', () => {
      const store = useTestimonialsStore()
      const before = store.testimonials.length
      store.submitTestimonial(
        'u-carlos',
        'Carlos Oliveira',
        'foto-carlos.png',
        'Meu cachorro adorou o banho e tosa! Recomendo muito a Morada dos Pets.',
        true,
      )
      expect(store.testimonials.length).toBe(before + 1)
      const added = store.testimonials[store.testimonials.length - 1]!
      expect(added.id).toMatch(/^t\d+$/)
      expect(added.approved).toBe(false)
      expect(added.authorName).toBe('Carlos Oliveira')
    })

    it('updates existing testimonial for same user', () => {
      const store = useTestimonialsStore()
      store.submitTestimonial(
        'u-fernanda',
        'Fernanda Lima',
        '',
        'Bom atendimento.',
        true,
      )
      const before = store.testimonials.length
      store.submitTestimonial(
        'u-fernanda',
        'Fernanda Lima',
        '',
        'Excelente atendimento! A equipe é muito cuidadosa com os pets.',
        true,
      )
      expect(store.testimonials.length).toBe(before)
      const updated = store.testimonials.find((entry) => entry.userId === 'u-fernanda')!
      expect(updated.quote).toBe(
        'Excelente atendimento! A equipe é muito cuidadosa com os pets.',
      )
    })

    it('sets approved=false when allowPublic is false on update', () => {
      const store = useTestimonialsStore()
      store.submitTestimonial(
        'u-pedro',
        'Pedro Souza',
        '',
        'Serviço de hospedagem nota 10!',
        true,
      )
      store.submitTestimonial(
        'u-pedro',
        'Pedro Souza',
        '',
        'Prefiro manter privado.',
        false,
      )
      const updated = store.testimonials.find((entry) => entry.userId === 'u-pedro')!
      expect(updated.approved).toBe(false)
      expect(updated.allowPublic).toBe(false)
    })
  })

  describe('toggleApproved', () => {
    it('toggles approved when allowPublic is true', () => {
      const store = useTestimonialsStore()
      store.submitTestimonial(
        'u-juliana',
        'Juliana Pereira',
        '',
        'O Dog Spa deixou minha Luna linda!',
        true,
      )
      const julianaTestimonial = store.testimonials.find((entry) => entry.userId === 'u-juliana')!
      expect(julianaTestimonial.approved).toBe(false)
      store.toggleApproved(julianaTestimonial.id)
      expect(store.testimonials.find((entry) => entry.id === julianaTestimonial.id)?.approved).toBe(true)
    })

    it('does not toggle when allowPublic is false', () => {
      const store = useTestimonialsStore()
      store.submitTestimonial(
        'u-roberto',
        'Roberto Alves',
        '',
        'Depoimento privado sobre o serviço.',
        false,
      )
      const robertoTestimonial = store.testimonials.find((entry) => entry.userId === 'u-roberto')!
      expect(robertoTestimonial.approved).toBe(false)
      store.toggleApproved(robertoTestimonial.id)
      expect(store.testimonials.find((entry) => entry.id === robertoTestimonial.id)?.approved).toBe(false)
    })
  })

  describe('getByUser', () => {
    it('returns testimonial for existing user', () => {
      const store = useTestimonialsStore()
      store.submitTestimonial(
        'u-ana',
        'Ana Costa',
        '',
        'Melhor creche para pets da região!',
        true,
      )
      const result = store.getByUser('u-ana')
      expect(result).toBeDefined()
      expect(result?.userId).toBe('u-ana')
    })

    it('returns undefined for unknown user', () => {
      const store = useTestimonialsStore()
      expect(store.getByUser('usuario-inexistente')).toBeUndefined()
    })
  })
})

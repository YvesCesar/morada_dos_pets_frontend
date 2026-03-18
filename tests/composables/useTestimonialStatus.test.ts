import { useTestimonialStatus } from '@/composables/useTestimonialStatus'
import type { DashboardTestimonial } from '@/types'

describe('useTestimonialStatus', () => {
  const { getStatusLabel, getStatusClass } = useTestimonialStatus()

  const baseTestimonial: DashboardTestimonial = {
    id: 'test-1',
    userId: 'user-1',
    authorName: 'Maria Silva',
    authorPhoto: '',
    quote: 'Excelente atendimento!',
    allowPublic: true,
    approved: true,
    createdAt: '2025-03-01',
  }

  describe('getStatusLabel', () => {
    it('returns "Não autorizado" when allowPublic is false', () => {
      expect(getStatusLabel({ ...baseTestimonial, allowPublic: false })).toBe('Não autorizado')
    })

    it('returns "Publicado" when approved and allowed', () => {
      expect(getStatusLabel({ ...baseTestimonial, allowPublic: true, approved: true })).toBe('Publicado')
    })

    it('returns "Aguardando" when allowed but not approved', () => {
      expect(getStatusLabel({ ...baseTestimonial, allowPublic: true, approved: false })).toBe('Aguardando')
    })
  })

  describe('getStatusClass', () => {
    const prefix = 'testimonials-table__status'

    it('returns neutral class when not allowed', () => {
      expect(getStatusClass({ ...baseTestimonial, allowPublic: false }, prefix))
        .toBe('testimonials-table__status--neutral')
    })

    it('returns approved class when approved and allowed', () => {
      expect(getStatusClass({ ...baseTestimonial, allowPublic: true, approved: true }, prefix))
        .toBe('testimonials-table__status--approved')
    })

    it('returns pending class when allowed but not approved', () => {
      expect(getStatusClass({ ...baseTestimonial, allowPublic: true, approved: false }, prefix))
        .toBe('testimonials-table__status--pending')
    })

    it('works with different CSS prefixes', () => {
      expect(getStatusClass({ ...baseTestimonial, allowPublic: false }, 'customer-testimonial__status'))
        .toBe('customer-testimonial__status--neutral')
    })
  })
})

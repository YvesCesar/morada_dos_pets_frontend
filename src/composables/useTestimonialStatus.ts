import type { DashboardTestimonial } from '@/types'

/**
 * Composable para labels e classes CSS de status de depoimentos
 */
export function useTestimonialStatus() {
  const getStatusLabel = (testimonial: DashboardTestimonial) => {
    if (!testimonial.allowPublic) return 'Não autorizado'
    return testimonial.approved ? 'Publicado' : 'Aguardando'
  }

  const getStatusClass = (testimonial: DashboardTestimonial, prefix: string) => {
    if (!testimonial.allowPublic) return `${prefix}--neutral`
    return testimonial.approved ? `${prefix}--approved` : `${prefix}--pending`
  }

  return { getStatusLabel, getStatusClass }
}

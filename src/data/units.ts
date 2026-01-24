/**
 * Dados das unidades físicas
 */
import type { Unit } from '@/types'
import fachada1 from '@/assets/images/fachada-1.png'
import fachada2 from '@/assets/images/fachada-2-14f599.png'

export const units: Unit[] = [
  {
    image: fachada1,
    address: 'Rua Holanda, n° 125, Horizonte - AM',
    mapUrl: 'https://maps.google.com/?q=Rua+Holanda+125+Horizonte+AM',
  },
  {
    image: fachada2,
    address: 'Av. Flores, n° 86, São Bernardo - AM',
    mapUrl: 'https://maps.google.com/?q=Av+Flores+86+São+Bernardo+AM',
  },
]

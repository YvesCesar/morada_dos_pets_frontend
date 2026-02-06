/**
 * Dados das unidades físicas
 */
import type { Unit } from '@/types'
import fachada1 from '@/assets/images/fachada-1.png'
import fachada2 from '@/assets/images/fachada-2-14f599.png'

export const units: Unit[] = [
  {
    id: 'holanda',
    name: 'Unidade Horizonte',
    image: fachada1,
    address: 'Rua Holanda, n° 125, Horizonte - AM',
    mapUrl: 'https://maps.google.com/?q=Rua+Holanda+125+Horizonte+AM',
    coordinates: {
      lat: -3.046889,
      lng: -60.003221,
    },
  },
  {
    id: 'flores',
    name: 'Unidade São Bernardo',
    image: fachada2,
    address: 'Av. Flores, n° 86, São Bernardo - AM',
    mapUrl: 'https://maps.google.com/?q=Av+Flores+86+São+Bernardo+AM',
    coordinates: {
      lat: -3.062616367211629,
      lng: -59.988425903586595,
    },
  },
]

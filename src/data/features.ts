/**
 * Dados das features/diferenciais
 */
import type { Feature } from '@/types'
import iconEquipe from '@/assets/images/icon-equipe.svg'
import iconSeguranca from '@/assets/images/icon-seguranca.svg'
import iconAmbiente from '@/assets/images/icon-pata.svg'
import iconAtividades from '@/assets/images/icon-atividades.svg'

export const features: Feature[] = [
  {
    icon: iconEquipe,
    titleLines: ['Equipe especializada'],
    alt: 'Ícone de funcionário',
  },
  {
    icon: iconSeguranca,
    titleLines: ['Segurança', '24 horas'],
    alt: 'Ícone de câmera',
  },
  {
    icon: iconAmbiente,
    titleLines: ['Ambientes', 'personalizados'],
    alt: 'Ícone de pata',
  },
  {
    icon: iconAtividades,
    titleLines: ['Atividades diversificadas'],
    alt: 'Ícone de atividades',
  },
]

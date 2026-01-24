/**
 * Dados de Missão, Visão e Valores
 */
import type { MissionValue } from '@/types'
import iconMissao from '@/assets/images/icon-missao.svg'
import iconVisao from '@/assets/images/icon-visao.svg'
import iconValores from '@/assets/images/icon-valores.svg'

export const missionVisionValues: MissionValue[] = [
  {
    icon: iconMissao,
    title: 'Missão',
    description: 'Oferecer conforto e diversão aos pets, garantindo qualidade nos serviços',
  },
  {
    icon: iconVisao,
    title: 'Visão',
    description: 'Amor e respeito aos animais, segurança, profissionalismo e companheirismo.',
  },
  {
    icon: iconValores,
    title: 'Valores',
    description:
      'Ser referência em hotel para pets, proporcionando experiências positivas e duradouras para nossos clientes (pets e seus tutores).',
  },
]

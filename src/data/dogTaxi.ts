/**
 * Dados do Dog Táxi - benefícios
 */
import type { DogSpaBenefit } from '@/types'

// Reutilizando ícones existentes
import iconEquipe from '@/assets/images/dog-spa/icon-equipe.svg'
import iconBemEstar from '@/assets/images/dog-spa/icon-bem-estar.svg'
import iconVeiculos from '@/assets/images/dog-taxi/icon-veiculos.svg'

export const dogTaxiBenefits: DogSpaBenefit[] = [
  {
    icon: iconEquipe,
    title: 'Equipe especializada',
    description:
      'Nossa equipe é composta por pessoas apaixonadas por cães, tudo para proporcionar o melhor cuidado possível para o seu fiel companheiro.',
  },
  {
    icon: iconVeiculos,
    title: 'Veículos higienizados',
    description:
      'Priorizamos a higienização e a segurança em nossos veículos, garantindo o conforto e bem-estar do seu cão.',
  },
  {
    icon: iconBemEstar,
    title: 'Bem-estar canino em foco',
    description:
      'Cada aspecto da Morada dos Pets é projetado para criar uma experiência relaxante e agradável para seu cãozinho.',
  },
]

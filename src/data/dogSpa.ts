/**
 * Dados do Dog Spa - serviços e benefícios
 */
import type { DogSpaService, DogSpaBenefit } from '@/types'

import cardMassagem from '@/assets/images/dog-spa/card-massagem-4d41fd.png'
import cardTosa from '@/assets/images/dog-spa/card-tosa-4233ff.png'
import cardBanho from '@/assets/images/dog-spa/card-banho-2c19d4.png'
import iconEquipe from '@/assets/images/dog-spa/icon-equipe.svg'
import iconAgendamento from '@/assets/images/dog-spa/icon-agendamento.svg'
import iconBemEstar from '@/assets/images/dog-spa/icon-bem-estar.svg'

export const dogSpaServices: DogSpaService[] = [
  {
    id: 'banho',
    image: cardBanho,
    title: 'Banho',
    description: 'Limpeza dos ouvidos, shampoo, condicionador, toalha esterilizada',
    prices: [
      { size: 'Pequeno porte', price: 'R$: 44,90' },
      { size: 'Médio porte', price: 'R$: 54,90' },
      { size: 'Grande porte', price: 'R$: 64,90' },
    ],
    additionals: [
      { name: 'Corte e lixamento de unhas', price: 'R$: 14,90' },
      { name: 'Escovação dos dentes', price: 'R$: 9,99' },
    ],
  },
  {
    id: 'tosa',
    image: cardTosa,
    title: 'Tosa',
    description: 'Desde estilos tradicionais até cortes personalizados',
    prices: [
      { size: 'Pequeno porte', price: 'R$: 52,90' },
      { size: 'Médio porte', price: 'R$: 72,90' },
      { size: 'Grande porte', price: 'R$: 82,90' },
    ],
    additionals: [
      { name: 'Penteados', price: 'R$: 14,90' },
    ],
  },
  {
    id: 'massagem',
    image: cardMassagem,
    title: 'Sessão de massagem',
    description: 'Auxilia no alívio do estresse e da tensão muscular',
    prices: [
      { size: 'Pequeno porte', price: 'R$: 89,90' },
      { size: 'Médio porte', price: 'R$: 119,90' },
      { size: 'Grande porte', price: 'R$: 149,90' },
    ],
    additionals: [
      {
        name: '',
        description: 'Ao optar pelo serviço para mais de um pet, garantimos um desconto de 5% na tarifa total.',
      },
    ],
  },
]

export const dogSpaBenefits: DogSpaBenefit[] = [
  {
    icon: iconEquipe,
    title: 'Equipe especializada',
    description:
      'Nossa equipe é composta por pessoas apaixonadas por cães, tudo para proporcionar o melhor cuidado possível para o seu fiel companheiro.',
  },
  {
    icon: iconAgendamento,
    title: 'Agendamento fácil e flexivel',
    description:
      'Entendemos que sua rotina pode ser agitada, e é por isso que simplificamos o processo de agendamento.',
  },
  {
    icon: iconBemEstar,
    title: 'Bem-estar canino em foco',
    description:
      'Cada aspecto da Morada dos Pets é projetado para criar uma experiência relaxante e agradável para seu cãozinho.',
  },
]

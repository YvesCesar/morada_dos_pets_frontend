/**
 * Dados da Hospedagem e Creche - planos de preços, benefícios e carrossel
 */
import type { HospedagemPlan, DogSpaBenefit, ClientImage, CrechePlan } from '@/types'

import cardDiariaComum from '@/assets/images/hospedagem/card-diaria-comum-2c19d4.png'
import cardFeriado from '@/assets/images/hospedagem/card-feriado-f0fb89.png'
import cardAltaTemporada from '@/assets/images/hospedagem/card-alta-temporada-377f85.png'
import cardPeriodoIntegral from '@/assets/images/hospedagem/card-periodo-integral.png'
import cardMeioPeriodo from '@/assets/images/hospedagem/card-meio-periodo-4d1272.png'
// Reutilizando ícones do dog-spa
import iconEquipe from '@/assets/images/dog-spa/icon-equipe.svg'
import iconBemEstar from '@/assets/images/dog-spa/icon-bem-estar.svg'
import iconAmbientes from '@/assets/images/hospedagem/icon-ambientes.svg'
import carousel1 from '@/assets/images/hospedagem/carousel-1.png'
import carousel2 from '@/assets/images/hospedagem/carousel-2.png'
import carousel3 from '@/assets/images/hospedagem/carousel-3.png'
import carousel4 from '@/assets/images/hospedagem/carousel-4.png'

export const hospedagemPlans: HospedagemPlan[] = [
  {
    id: 'diaria-comum',
    image: cardDiariaComum,
    title: 'Diária Comum',
    prices: [
      { size: 'Pequeno porte', price: 'R$: 69,90' },
      { size: 'Médio porte', price: 'R$: 89,90' },
      { size: 'Grande porte', price: 'R$: 119,90' },
    ],
  },
  {
    id: 'feriado-fim-semana',
    image: cardFeriado,
    title: 'Feriado / Fim de semana',
    prices: [
      { size: 'Pequeno porte', price: 'R$: 84,90' },
      { size: 'Médio porte', price: 'R$: 119,90' },
      { size: 'Grande porte', price: 'R$: 134,90' },
    ],
  },
  {
    id: 'alta-temporada',
    image: cardAltaTemporada,
    title: 'Alta temporada',
    prices: [
      { size: 'Pequeno porte', price: 'R$: 110,90' },
      { size: 'Médio porte', price: 'R$: 135,90' },
      { size: 'Grande porte', price: 'R$: 159,90' },
    ],
  },
]

export const hospedagemBenefits: DogSpaBenefit[] = [
  {
    icon: iconEquipe,
    title: 'Equipe especializada',
    description:
      'Nossa equipe é composta por pessoas apaixonadas por cães, tudo para proporcionar o melhor cuidado possível para o seu fiel companheiro.',
  },
  {
    icon: iconAmbientes,
    title: 'Ambientes personalizados',
    description:
      'Seu melhor amigo será direcionado a diversas atividades e ambientes convidativos, onde poderá explorar, brincar e relaxar',
  },
  {
    icon: iconBemEstar,
    title: 'Bem-estar canino em foco',
    description:
      'Cada aspecto da Morada dos Pets é projetado para criar uma experiência relaxante e agradável para seu cãozinho.',
  },
]

export const hospedagemCarouselImages: ClientImage[] = [
  { id: 1, image: carousel1, alt: 'Hospedagem - ambiente 1' },
  { id: 2, image: carousel2, alt: 'Hospedagem - ambiente 2' },
  { id: 3, image: carousel3, alt: 'Hospedagem - ambiente 3' },
  { id: 4, image: carousel4, alt: 'Hospedagem - ambiente 4' },
]

export const crechePlans: CrechePlan[] = [
  {
    id: 'meio-periodo',
    image: cardMeioPeriodo,
    title: 'Meio período',
    schedule: 'Horário das 7h - 12h',
    prices: [
      { frequency: '1 x por semana', price: 'R$: 130,00' },
      { frequency: '2 x por semana', price: 'R$: 280,00' },
      { frequency: '3 x por semana', price: 'R$: 400,00' },
      { frequency: '4 x por semana', price: 'R$: 500,00' },
      { frequency: '5 x por semana', price: 'R$: 600,00' },
    ],
  },
  {
    id: 'periodo-integral',
    image: cardPeriodoIntegral,
    title: 'Período integral',
    schedule: 'Horário das 7h - 17h',
    prices: [
      { frequency: '1 x por semana', price: 'R$: 210,00' },
      { frequency: '2 x por semana', price: 'R$: 420,00' },
      { frequency: '3 x por semana', price: 'R$: 600,00' },
      { frequency: '4 x por semana', price: 'R$: 740,00' },
      { frequency: '5 x por semana', price: 'R$: 840,00' },
    ],
  },
]

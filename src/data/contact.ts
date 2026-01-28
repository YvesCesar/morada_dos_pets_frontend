/**
 * Dados de contato corporativos e das unidades
 */
import type { ContactCard } from '@/types'
import iconEmail from '@/assets/images/icon-email.svg'
import iconPhone from '@/assets/images/icon-phone.svg'

export const corporativeContacts: ContactCard = {
  title: 'Dúvidas Gerais e Atendimento ao Cliente',
  items: [
    {
      icon: iconEmail,
      text: 'moradadospets@ats.com',
      link: 'mailto:moradadospets@ats.com',
    },
  ],
}

export const unitContacts: ContactCard[] = [
  {
    title: 'Unidade Horizonte',
    items: [
      {
        icon: iconPhone,
        text: '(92) 3333-3333',
        link: 'tel:9233333333',
      },
    ],
  },
  {
    title: 'Unidade São Bernardo',
    items: [
      {
        icon: iconPhone,
        text: '(92) 2222-2222',
        link: 'tel:9222222222',
      },
    ],
  },
]

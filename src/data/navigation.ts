/**
 * Dados de navegação do site
 */
import type { NavLink, SocialLink } from '@/types'

export const navLinks: NavLink[] = [
  { name: 'Início', to: '/', isRoute: true },
  { name: 'Quem somos', to: '/quem-somos', isRoute: true },
  { name: 'Serviços', to: '/servicos', isRoute: true },
  { name: 'Contato', to: '/contato', isRoute: true },
]

export const footerMenuLinks: NavLink[] = [
  { name: 'Home', to: '/', isRoute: true },
  { name: 'Quem somos', to: '/quem-somos', isRoute: true },
  { name: 'Serviços', to: '/servicos', isRoute: true },
  { name: 'Contato', to: '/contato', isRoute: true },
]

export const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  { name: 'TikTok', url: 'https://www.tiktok.com' },
] as const satisfies readonly SocialLink[]

export const addresses: string[] = [
  'Rua Holanda, n° 125, Horizonte - AM',
  'Av. Flores, n° 86, São Bernardo - AM',
]

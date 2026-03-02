/**
 * Itens de submenu do dashboard por papel
 */
import type { SubmenuItem } from '@/types'

export const adminSubmenuItems: SubmenuItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/dashboard/admin' },
  { label: 'Usuários', icon: 'users', route: '/dashboard/usuarios' },
  { label: 'Cupons', icon: 'coupon', route: '/dashboard/cupons' },
  { label: 'Preços', icon: 'prices', route: '/dashboard/precos' },
  { label: 'Depoimentos', icon: 'testimonial', route: '/dashboard/depoimentos' },
  { label: 'Configurações', icon: 'settings', route: '/dashboard/configuracoes' },
]

export const customerSubmenuItems: SubmenuItem[] = [
  { label: 'Meu Painel', icon: 'dashboard', route: '/dashboard/cliente' },
  { label: 'Perfil', icon: 'profile', route: '/dashboard/perfil' },
  { label: 'Configurações', icon: 'settings', route: '/dashboard/configuracoes' },
]

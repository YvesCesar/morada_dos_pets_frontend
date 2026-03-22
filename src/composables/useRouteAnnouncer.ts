import { watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const ROUTE_TITLES: Record<string, string> = {
  home: 'Início',
  'quem-somos': 'Quem Somos',
  servicos: 'Serviços',
  about: 'Sobre',
  contato: 'Contato',
  entrar: 'Entrar',
  cadastro: 'Criar Conta',
  'dog-spa': 'Dog Spa',
  hospedagem: 'Hospedagem',
  'dog-taxi': 'Dog Taxi',
  pagamento: 'Pagamento',
  'admin-dashboard': 'Painel Admin',
  'customer-dashboard': 'Painel Cliente',
  profile: 'Perfil',
  settings: 'Configurações',
  'change-password': 'Alterar Senha',
  coupons: 'Cupons',
  prices: 'Preços',
  users: 'Usuários',
  testimonials: 'Depoimentos',
}

export function useRouteAnnouncer() {
  const route = useRoute()

  watch(
    () => route.name,
    async (name) => {
      const title = ROUTE_TITLES[name as string] ?? 'Morada dos Pets'
      document.title = `${title} | Morada dos Pets`

      await nextTick()
      const main = document.getElementById('main-content')
      if (main) {
        main.setAttribute('tabindex', '-1')
        main.focus()
        main.removeAttribute('tabindex')
      }
    },
    { immediate: true },
  )
}

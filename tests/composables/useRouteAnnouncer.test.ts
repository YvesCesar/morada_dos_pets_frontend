import { describe, it, expect, vi, beforeEach } from 'vitest'

const pushMock = vi.fn()
const routeRef = {
  name: 'home' as string | undefined,
  path: '/',
  params: {},
  query: {},
  meta: {},
}

vi.mock('vue-router', () => ({
  useRoute: () => routeRef,
  useRouter: () => ({ push: pushMock }),
}))

import { useRouteAnnouncer } from '@/composables/useRouteAnnouncer'
import { withSetup } from '../helpers'

describe('useRouteAnnouncer', () => {
  beforeEach(() => {
    document.title = 'Morada dos Pets'
    routeRef.name = 'home'
  })

  it('sets document title based on the current route name', () => {
    const { unmount } = withSetup(() => useRouteAnnouncer())

    expect(document.title).toBe('Início | Morada dos Pets')

    unmount()
  })

  it('uses fallback title for unknown route names', () => {
    routeRef.name = 'unknown-page'

    const { unmount } = withSetup(() => useRouteAnnouncer())

    expect(document.title).toBe('Morada dos Pets | Morada dos Pets')

    unmount()
  })

  it('sets correct title for dashboard routes', () => {
    routeRef.name = 'admin-dashboard'

    const { unmount } = withSetup(() => useRouteAnnouncer())

    expect(document.title).toBe('Painel Admin | Morada dos Pets')

    unmount()
  })
})

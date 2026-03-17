import { withSetup } from '../helpers'
import { useViewport } from '@/composables/useViewport'

describe('useViewport', () => {
  beforeEach(() => {
    // Reset window size
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true, configurable: true })
  })

  it('detects desktop (>992)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1200 })
    const { result, unmount } = withSetup(() => useViewport())
    expect(result.isDesktop.value).toBe(true)
    expect(result.isMobile.value).toBe(false)
    expect(result.isTablet.value).toBe(false)
    unmount()
  })

  it('detects mobile (<=768)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500 })
    const { result, unmount } = withSetup(() => useViewport())
    expect(result.isMobile.value).toBe(true)
    expect(result.isDesktop.value).toBe(false)
    unmount()
  })

  it('detects tablet (769-992)', () => {
    Object.defineProperty(window, 'innerWidth', { value: 900 })
    const { result, unmount } = withSetup(() => useViewport())
    expect(result.isTablet.value).toBe(true)
    expect(result.isMobile.value).toBe(false)
    expect(result.isDesktop.value).toBe(false)
    unmount()
  })

  it('responds to resize event', async () => {
    Object.defineProperty(window, 'innerWidth', { value: 1200 })
    const { result, unmount } = withSetup(() => useViewport())

    expect(result.isDesktop.value).toBe(true)

    Object.defineProperty(window, 'innerWidth', { value: 500 })
    window.dispatchEvent(new Event('resize'))

    expect(result.isMobile.value).toBe(true)
    unmount()
  })

  it('accepts custom breakpoints', () => {
    Object.defineProperty(window, 'innerWidth', { value: 600 })
    const { result, unmount } = withSetup(() =>
      useViewport({ mobileBreakpoint: 500, tabletBreakpoint: 800 }),
    )
    expect(result.isTablet.value).toBe(true)
    expect(result.isMobile.value).toBe(false)
    unmount()
  })
})

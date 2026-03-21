import { withSetup } from '../helpers'
import { useEscapeKey } from '@/composables/useEscapeKey'

describe('useEscapeKey', () => {
  it('calls callback when Escape key is pressed', () => {
    const callback = vi.fn()

    const { unmount } = withSetup(() => useEscapeKey(callback))

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    document.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    unmount()
  })

  it('does not call callback for other keys', () => {
    const callback = vi.fn()

    const { unmount } = withSetup(() => useEscapeKey(callback))

    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    document.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()

    unmount()
  })

  it('removes event listener on unmount', () => {
    const callback = vi.fn()

    const { unmount } = withSetup(() => useEscapeKey(callback))
    unmount()

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    document.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()
  })
})

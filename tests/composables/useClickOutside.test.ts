import { ref } from 'vue'
import { withSetup } from '../helpers'
import { useClickOutside } from '@/composables/useClickOutside'

describe('useClickOutside', () => {
  it('calls callback when clicking outside the element', () => {
    const callback = vi.fn()
    const elementRef = ref(document.createElement('div'))
    document.body.appendChild(elementRef.value)

    const { unmount } = withSetup(() => useClickOutside(elementRef, callback))

    const outsideElement = document.createElement('div')
    document.body.appendChild(outsideElement)

    const event = new MouseEvent('mousedown', { bubbles: true })
    outsideElement.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    unmount()
    document.body.removeChild(elementRef.value)
    document.body.removeChild(outsideElement)
  })

  it('does not call callback when clicking inside the element', () => {
    const callback = vi.fn()
    const elementRef = ref(document.createElement('div'))
    const childEl = document.createElement('span')
    elementRef.value.appendChild(childEl)
    document.body.appendChild(elementRef.value)

    const { unmount } = withSetup(() => useClickOutside(elementRef, callback))

    const event = new MouseEvent('mousedown', { bubbles: true })
    childEl.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()

    unmount()
    document.body.removeChild(elementRef.value)
  })

  it('removes event listener on unmount', () => {
    const callback = vi.fn()
    const elementRef = ref(document.createElement('div'))
    document.body.appendChild(elementRef.value)

    const { unmount } = withSetup(() => useClickOutside(elementRef, callback))
    unmount()

    const event = new MouseEvent('mousedown', { bubbles: true })
    document.body.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(elementRef.value)
  })
})

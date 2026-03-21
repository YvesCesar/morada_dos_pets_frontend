import { ref } from 'vue'
import { withSetup } from '../helpers'
import { useFocusTrap } from '@/composables/useFocusTrap'

describe('useFocusTrap', () => {
  let container: HTMLDivElement
  let firstButton: HTMLButtonElement
  let lastButton: HTMLButtonElement

  beforeEach(() => {
    container = document.createElement('div')
    firstButton = document.createElement('button')
    firstButton.textContent = 'Primeiro'
    lastButton = document.createElement('button')
    lastButton.textContent = 'Último'
    container.appendChild(firstButton)
    container.appendChild(lastButton)
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('focuses the first focusable element on mount', () => {
    const containerRef = ref(container)

    const { unmount } = withSetup(() => useFocusTrap(containerRef))

    expect(document.activeElement).toBe(firstButton)

    unmount()
  })

  it('wraps focus forward from last to first element', () => {
    const containerRef = ref(container)

    const { unmount } = withSetup(() => useFocusTrap(containerRef))

    lastButton.focus()
    expect(document.activeElement).toBe(lastButton)

    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(tabEvent)

    expect(document.activeElement).toBe(firstButton)

    unmount()
  })

  it('wraps focus backward from first to last element', () => {
    const containerRef = ref(container)

    const { unmount } = withSetup(() => useFocusTrap(containerRef))

    firstButton.focus()
    expect(document.activeElement).toBe(firstButton)

    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(shiftTabEvent)

    expect(document.activeElement).toBe(lastButton)

    unmount()
  })

  it('restores focus to previously focused element on unmount', () => {
    const outsideButton = document.createElement('button')
    outsideButton.textContent = 'Fora do modal'
    document.body.appendChild(outsideButton)
    outsideButton.focus()

    const containerRef = ref(container)

    const { unmount } = withSetup(() => useFocusTrap(containerRef))

    expect(document.activeElement).toBe(firstButton)

    unmount()

    expect(document.activeElement).toBe(outsideButton)

    document.body.removeChild(outsideButton)
  })
})

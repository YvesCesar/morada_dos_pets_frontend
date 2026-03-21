import { onMounted, onUnmounted, type Ref } from 'vue'

const FOCUSABLE_SELECTORS =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
  let previouslyFocusedElement: HTMLElement | null = null

  const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
    Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !containerRef.value) return

    const focusable = getFocusableElements(containerRef.value)
    if (focusable.length === 0) return

    const first = focusable[0]!
    const last = focusable[focusable.length - 1]!

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  onMounted(() => {
    previouslyFocusedElement = document.activeElement as HTMLElement
    document.addEventListener('keydown', handleKeydown)

    if (containerRef.value) {
      const focusable = getFocusableElements(containerRef.value)
      if (focusable.length > 0) {
        focusable[0]!.focus()
      }
    }
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    previouslyFocusedElement?.focus()
  })
}

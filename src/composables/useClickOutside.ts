import { onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Composable que detecta cliques fora de um elemento e executa um callback
 */
export function useClickOutside(elementRef: Ref<HTMLElement | null>, callback: () => void) {
  const handleClickOutside = (event: MouseEvent) => {
    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })
}

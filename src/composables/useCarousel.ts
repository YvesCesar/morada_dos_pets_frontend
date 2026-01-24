/**
 * Composable para lógica de carousel/slider
 *
 * @example
 * ```vue
 * <script setup>
 * import { useCarousel } from '@/composables/useCarousel'
 *
 * const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
 * const { currentIndex, currentItem, next, prev, goTo } = useCarousel(items)
 * </script>
 * ```
 */
import { ref, computed, type Ref, type ComputedRef } from 'vue'

export interface UseCarouselOptions {
  /** Índice inicial (default: 0) */
  initialIndex?: number
  /** Se deve fazer loop infinito (default: true) */
  loop?: boolean
  /** Auto-play em milissegundos (0 = desativado) */
  autoPlay?: number
}

export interface UseCarouselReturn<T> {
  /** Índice atual */
  currentIndex: Ref<number>
  /** Item atual */
  currentItem: ComputedRef<T>
  /** Quantidade total de itens */
  total: ComputedRef<number>
  /** Avançar para o próximo item */
  next: () => void
  /** Voltar para o item anterior */
  prev: () => void
  /** Ir para um índice específico */
  goTo: (index: number) => void
  /** Verifica se é o primeiro item */
  isFirst: ComputedRef<boolean>
  /** Verifica se é o último item */
  isLast: ComputedRef<boolean>
}

export function useCarousel<T>(
  items: T[],
  options: UseCarouselOptions = {},
): UseCarouselReturn<T> {
  const { initialIndex = 0, loop = true } = options

  const currentIndex = ref(initialIndex)

  const total = computed(() => items.length)

  const currentItem = computed(() => items[currentIndex.value]!)

  const isFirst = computed(() => currentIndex.value === 0)

  const isLast = computed(() => currentIndex.value === items.length - 1)

  const next = () => {
    if (loop) {
      currentIndex.value = (currentIndex.value + 1) % items.length
    } else if (!isLast.value) {
      currentIndex.value++
    }
  }

  const prev = () => {
    if (loop) {
      currentIndex.value = (currentIndex.value - 1 + items.length) % items.length
    } else if (!isFirst.value) {
      currentIndex.value--
    }
  }

  const goTo = (index: number) => {
    if (index >= 0 && index < items.length) {
      currentIndex.value = index
    }
  }

  return {
    currentIndex,
    currentItem,
    total,
    next,
    prev,
    goTo,
    isFirst,
    isLast,
  }
}

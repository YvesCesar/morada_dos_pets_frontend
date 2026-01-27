/**
 * Composable para carrossel infinito com loop visual
 *
 * @description
 * Estende o useCarousel básico com funcionalidade de loop infinito,
 * triplicando o array de itens para criar efeito visual contínuo.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useInfiniteCarousel } from '@/composables/useInfiniteCarousel'
 *
 * const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
 * const {
 *   currentIndex,
 *   extendedItems,
 *   next,
 *   prev,
 *   handleTransitionEnd,
 *   isTransitioning,
 *   realIndex
 * } = useInfiniteCarousel(items)
 * </script>
 * ```
 */
import { ref, computed, type Ref, type ComputedRef } from 'vue'

export interface UseInfiniteCarouselReturn<T> {
  /** Índice atual no array estendido */
  currentIndex: Ref<number>
  /** Array triplicado para efeito visual infinito */
  extendedItems: ComputedRef<T[]>
  /** Índice real (0 a items.length - 1) */
  realIndex: ComputedRef<number>
  /** Tamanho do grupo original */
  groupSize: number
  /** Offset inicial (posição do grupo do meio) */
  offset: number
  /** Se a transição está ativa */
  isTransitioning: Ref<boolean>
  /** Avançar para o próximo item */
  next: () => void
  /** Voltar para o item anterior */
  prev: () => void
  /** Ir para um índice específico (0 a items.length - 1) */
  goTo: (index: number) => void
  /** Handler para transitionend - reseta posição ao atingir bordas */
  handleTransitionEnd: () => void
}

export function useInfiniteCarousel<T extends { id: number | string }>(
  items: T[],
): UseInfiniteCarouselReturn<T> {
  const groupSize = items.length
  const offset = groupSize // início do grupo do meio

  // Triplica o array para efeito visual infinito
  const extendedItems = computed(() => [...items, ...items, ...items])

  const currentIndex = ref(offset)
  const isTransitioning = ref(true)
  const isAnimating = ref(false)

  // Índice real no array original (0 a items.length - 1)
  const realIndex = computed(() => {
    return ((currentIndex.value - offset) % groupSize + groupSize) % groupSize
  })

  const next = () => {
    if (isAnimating.value) return
    isAnimating.value = true
    currentIndex.value++
  }

  const prev = () => {
    if (isAnimating.value) return
    isAnimating.value = true
    currentIndex.value--
  }

  const goTo = (index: number) => {
    if (isAnimating.value) return
    if (index >= 0 && index < groupSize) {
      isAnimating.value = true
      currentIndex.value = offset + index
    }
  }

  /**
   * Handler para o evento transitionend
   * Teleporta para o grupo do meio quando atinge as bordas,
   * desabilitando temporariamente a transição para evitar flicker
   */
  /**
   * Handler para o evento transitionend
   * Teleporta para o grupo do meio quando atinge as bordas,
   * desabilitando temporariamente a transição para evitar flicker
   */
  const handleTransitionEnd = () => {
    isAnimating.value = false

    if (currentIndex.value >= groupSize * 2) {
      // Chegou no final - volta para o grupo do meio
      isTransitioning.value = false
      currentIndex.value = offset + (currentIndex.value % groupSize)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isTransitioning.value = true
        })
      })
    } else if (currentIndex.value < groupSize) {
      // Chegou no início - avança para o grupo do meio
      isTransitioning.value = false
      currentIndex.value = offset + (currentIndex.value % groupSize)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isTransitioning.value = true
        })
      })
    }
  }

  return {
    currentIndex,
    extendedItems,
    realIndex,
    groupSize,
    offset,
    isTransitioning,
    next,
    prev,
    goTo,
    handleTransitionEnd,
  }
}

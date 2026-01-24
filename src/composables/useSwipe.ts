/**
 * Composable para lógica de swipe/touch em dispositivos móveis
 *
 * @example
 * ```vue
 * <script setup>
 * const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
 *   onSwipeLeft: () => nextSlide(),
 *   onSwipeRight: () => prevSlide()
 * })
 * </script>
 *
 * <template>
 *   <div @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
 *     <!-- content -->
 *   </div>
 * </template>
 * ```
 */
import { ref } from 'vue'

export interface UseSwipeOptions {
  /** Callback executado ao fazer swipe para esquerda */
  onSwipeLeft?: () => void
  /** Callback executado ao fazer swipe para direita */
  onSwipeRight?: () => void
  /** Distância mínima em pixels para considerar um swipe (default: 50) */
  minSwipeDistance?: number
}

export function useSwipe(options: UseSwipeOptions = {}) {
  const { onSwipeLeft, onSwipeRight, minSwipeDistance = 50 } = options

  const touchStartX = ref(0)
  const touchEndX = ref(0)
  const isSwiping = ref(false)

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    if (!touch) return

    touchStartX.value = touch.clientX
    isSwiping.value = true
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping.value) return

    const touch = e.touches[0]
    if (!touch) return

    touchEndX.value = touch.clientX
  }

  const handleTouchEnd = () => {
    if (!isSwiping.value || touchStartX.value === 0) {
      resetSwipe()
      return
    }

    const swipeDistance = touchStartX.value - touchEndX.value

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        onSwipeLeft?.()
      } else {
        onSwipeRight?.()
      }
    }

    resetSwipe()
  }

  const resetSwipe = () => {
    touchStartX.value = 0
    touchEndX.value = 0
    isSwiping.value = false
  }

  return {
    touchStartX,
    touchEndX,
    isSwiping,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}

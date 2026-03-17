import { useSwipe } from '@/composables/useSwipe'
import { createMockTouchEvent } from '../helpers'

describe('useSwipe', () => {
  it('detects swipe left and calls onSwipeLeft', () => {
    const onSwipeLeft = vi.fn()
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({ onSwipeLeft })

    handleTouchStart(createMockTouchEvent('touchstart', 200))
    handleTouchMove(createMockTouchEvent('touchmove', 100))
    handleTouchEnd()

    expect(onSwipeLeft).toHaveBeenCalledOnce()
  })

  it('detects swipe right and calls onSwipeRight', () => {
    const onSwipeRight = vi.fn()
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({ onSwipeRight })

    handleTouchStart(createMockTouchEvent('touchstart', 100))
    handleTouchMove(createMockTouchEvent('touchmove', 200))
    handleTouchEnd()

    expect(onSwipeRight).toHaveBeenCalledOnce()
  })

  it('does not fire callback if below threshold', () => {
    const onSwipeLeft = vi.fn()
    const onSwipeRight = vi.fn()
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
      onSwipeLeft,
      onSwipeRight,
    })

    handleTouchStart(createMockTouchEvent('touchstart', 100))
    handleTouchMove(createMockTouchEvent('touchmove', 80)) // only 20px
    handleTouchEnd()

    expect(onSwipeLeft).not.toHaveBeenCalled()
    expect(onSwipeRight).not.toHaveBeenCalled()
  })

  it('resets state after touchend', () => {
    const { handleTouchStart, handleTouchMove, handleTouchEnd, touchStartX, touchEndX, isSwiping } =
      useSwipe()

    handleTouchStart(createMockTouchEvent('touchstart', 200))
    handleTouchMove(createMockTouchEvent('touchmove', 100))
    handleTouchEnd()

    expect(touchStartX.value).toBe(0)
    expect(touchEndX.value).toBe(0)
    expect(isSwiping.value).toBe(false)
  })

  it('respects custom minSwipeDistance', () => {
    const onSwipeLeft = vi.fn()
    const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
      onSwipeLeft,
      minSwipeDistance: 100,
    })

    handleTouchStart(createMockTouchEvent('touchstart', 200))
    handleTouchMove(createMockTouchEvent('touchmove', 120)) // 80px < 100px threshold
    handleTouchEnd()

    expect(onSwipeLeft).not.toHaveBeenCalled()
  })
})

import { useInfiniteCarousel } from '@/composables/useInfiniteCarousel'

describe('useInfiniteCarousel', () => {
  const clientImages = [
    { id: 1, image: '/cliente-thor.jpg', alt: 'Thor - Golden Retriever' },
    { id: 2, image: '/cliente-luna.jpg', alt: 'Luna - Bulldog Francês' },
    { id: 3, image: '/cliente-mel.jpg', alt: 'Mel - Poodle' },
  ]

  it('triples items in extendedItems', () => {
    const { extendedItems, groupSize } = useInfiniteCarousel(clientImages)
    expect(extendedItems.value.length).toBe(9) // 3 * 3
    expect(groupSize).toBe(3)
  })

  it('starts at offset (middle group)', () => {
    const { currentIndex, offset } = useInfiniteCarousel(clientImages)
    expect(offset).toBe(3)
    expect(currentIndex.value).toBe(3) // starts at beginning of middle group
  })

  it('computes realIndex as modular index', () => {
    const { realIndex, currentIndex } = useInfiniteCarousel(clientImages)
    expect(realIndex.value).toBe(0) // index 3 → real 0
    currentIndex.value = 4
    expect(realIndex.value).toBe(1) // index 4 → real 1
    currentIndex.value = 5
    expect(realIndex.value).toBe(2) // index 5 → real 2
  })

  it('next() increments index', () => {
    const { next, currentIndex } = useInfiniteCarousel(clientImages)
    const initial = currentIndex.value
    next()
    expect(currentIndex.value).toBe(initial + 1)
  })

  it('prev() decrements index', () => {
    const { prev, currentIndex } = useInfiniteCarousel(clientImages)
    const initial = currentIndex.value
    prev()
    expect(currentIndex.value).toBe(initial - 1)
  })

  it('blocks double next() during animation', () => {
    const { next, currentIndex } = useInfiniteCarousel(clientImages)
    const initial = currentIndex.value
    next()
    next() // should be blocked
    expect(currentIndex.value).toBe(initial + 1)
  })

  it('handleTransitionEnd unlocks animation', () => {
    const { next, handleTransitionEnd, currentIndex } = useInfiniteCarousel(clientImages)
    const initial = currentIndex.value
    next()
    handleTransitionEnd()
    next()
    expect(currentIndex.value).toBe(initial + 2)
  })

  it('handleTransitionEnd teleports to middle group when reaching end', async () => {
    vi.useFakeTimers()
    const { currentIndex, handleTransitionEnd, offset, groupSize } =
      useInfiniteCarousel(clientImages)

    // Simulate reaching the end group (index >= groupSize * 2)
    currentIndex.value = groupSize * 2 // = 6
    handleTransitionEnd()

    // Should teleport to middle group
    expect(currentIndex.value).toBe(offset + (6 % groupSize)) // offset + 0 = 3

    vi.useRealTimers()
  })

  it('handleTransitionEnd teleports to middle group when reaching start', async () => {
    vi.useFakeTimers()
    const { currentIndex, handleTransitionEnd, offset, groupSize } =
      useInfiniteCarousel(clientImages)

    // Simulate reaching the start group (index < groupSize)
    currentIndex.value = 1 // < groupSize (3)
    handleTransitionEnd()

    expect(currentIndex.value).toBe(offset + (1 % groupSize)) // offset + 1 = 4

    vi.useRealTimers()
  })

  it('goTo() sets index to offset + target when not animating', () => {
    const { goTo, currentIndex, handleTransitionEnd, offset } =
      useInfiniteCarousel(clientImages)
    // ensure not animating
    handleTransitionEnd()
    goTo(2)
    expect(currentIndex.value).toBe(offset + 2)
  })

  it('goTo() is blocked during animation', () => {
    const { next, goTo, currentIndex, offset } = useInfiniteCarousel(clientImages)
    next() // sets isAnimating = true
    goTo(2) // should be blocked
    expect(currentIndex.value).toBe(offset + 1) // only next() took effect
  })
})

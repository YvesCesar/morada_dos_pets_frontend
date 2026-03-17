import { ref } from 'vue'
import { useCarousel } from '@/composables/useCarousel'

describe('useCarousel', () => {
  const services = ['Dog Spa', 'Hospedagem', 'Creche', 'Dog Táxi']

  it('initializes at index 0 by default', () => {
    const { currentIndex, currentItem } = useCarousel(services)
    expect(currentIndex.value).toBe(0)
    expect(currentItem.value).toBe('Dog Spa')
  })

  it('accepts custom initialIndex', () => {
    const { currentIndex, currentItem } = useCarousel(services, { initialIndex: 2 })
    expect(currentIndex.value).toBe(2)
    expect(currentItem.value).toBe('Creche')
  })

  it('computes total', () => {
    const { total } = useCarousel(services)
    expect(total.value).toBe(4)
  })

  describe('loop mode (default)', () => {
    it('next() wraps from last to first', () => {
      const { next, currentIndex } = useCarousel(services, { initialIndex: 3 })
      next()
      expect(currentIndex.value).toBe(0)
    })

    it('prev() wraps from first to last', () => {
      const { prev, currentIndex } = useCarousel(services)
      prev()
      expect(currentIndex.value).toBe(3)
    })
  })

  describe('non-loop mode', () => {
    it('next() stops at last item', () => {
      const { next, currentIndex } = useCarousel(services, { initialIndex: 3, loop: false })
      next()
      expect(currentIndex.value).toBe(3)
    })

    it('prev() stops at first item', () => {
      const { prev, currentIndex } = useCarousel(services, { loop: false })
      prev()
      expect(currentIndex.value).toBe(0)
    })
  })

  describe('goTo', () => {
    it('jumps to valid index', () => {
      const { goTo, currentIndex } = useCarousel(services)
      goTo(2)
      expect(currentIndex.value).toBe(2)
    })

    it('ignores invalid index (negative)', () => {
      const { goTo, currentIndex } = useCarousel(services)
      goTo(-1)
      expect(currentIndex.value).toBe(0)
    })

    it('ignores invalid index (out of bounds)', () => {
      const { goTo, currentIndex } = useCarousel(services)
      goTo(10)
      expect(currentIndex.value).toBe(0)
    })
  })

  describe('computed properties', () => {
    it('isFirst is true at index 0', () => {
      const { isFirst } = useCarousel(services)
      expect(isFirst.value).toBe(true)
    })

    it('isLast is true at last index', () => {
      const { isLast } = useCarousel(services, { initialIndex: 3 })
      expect(isLast.value).toBe(true)
    })
  })

  describe('reactive items (ref)', () => {
    it('responds to changes in ref array', () => {
      const testimonials = ref(['Maria Silva', 'João Santos'])
      const { total, currentItem } = useCarousel(testimonials)
      expect(total.value).toBe(2)
      expect(currentItem.value).toBe('Maria Silva')

      testimonials.value = ['Maria Silva', 'João Santos', 'Ana Costa']
      expect(total.value).toBe(3)
    })
  })
})

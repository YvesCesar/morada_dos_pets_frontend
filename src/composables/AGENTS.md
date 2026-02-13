# Composables

Reusable logic extracted into composition functions. Import via barrel: `import { useCarousel } from '@/composables'`

## useCarousel(items)

Standard carousel with boundary tracking.

```typescript
const { currentIndex, currentItem, next, prev, goTo, isFirst, isLast } = useCarousel(items)
```

## useInfiniteCarousel(items)

Infinite loop carousel — triples items internally for seamless wrapping.

```typescript
const { currentIndex, extendedItems, realIndex, isTransitioning, next, prev, goTo, handleTransitionEnd } = useInfiniteCarousel(items)
```

## useSwipe(callbacks)

Touch gesture handling for mobile swipe interactions.

```typescript
const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
  onSwipeLeft: next,
  onSwipeRight: prev,
})
```

## useViewport()

Responsive breakpoint detection.

```typescript
const { isMobile, isTablet, isDesktop, width, height } = useViewport()
```

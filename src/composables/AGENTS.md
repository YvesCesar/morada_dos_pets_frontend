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

## useInputMasks()

Input formatting masks for Brazilian locale fields.

```typescript
const { formatDate, formatCPF, formatPhone, formatCEP, formatDisplayDate, formatCurrency } = useInputMasks()
```

- `formatDate` — `DD/MM/YYYY`
- `formatCPF` — `000.000.000-00`
- `formatPhone` — `(00) 00000-0000`
- `formatCEP` — `00000-000`
- `formatDisplayDate` — converts `YYYY-MM-DD` → `DD/MM/YYYY`
- `formatCurrency` — `R$ 1.234,56` (pt-BR locale)

## usePhotoUpload(onUpdate)

Handles photo file selection via FileReader, returns base64 data URL.

```typescript
const { handleFileChange } = usePhotoUpload((dataUrl) => {
  form.photo = dataUrl
})
```

Bind `handleFileChange` to an `<input type="file">` change event.

## Testing

Tests live in `tests/composables/`. Each composable has a corresponding `.test.ts` file.

- **Pure function composables** (e.g. `useInputMasks`): call directly, no setup needed
- **Lifecycle composables** (e.g. `useViewport`): use `withSetup()` from `tests/helpers.ts`
- **Touch composables** (e.g. `useSwipe`): use `createMockTouchEvent()` from `tests/helpers.ts`
- **FileReader composable** (e.g. `usePhotoUpload`): use `vi.stubGlobal('FileReader', MockClass)`

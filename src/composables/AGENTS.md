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

Input formatting masks for Brazilian locale fields + utility functions.

```typescript
const { formatDate, formatCPF, formatPhone, formatCEP, formatDisplayDate, formatCurrency, getInitial, calculateAge } = useInputMasks()
```

- `formatDate` — `DD/MM/YYYY`
- `formatCPF` — `000.000.000-00`
- `formatPhone` — `(00) 00000-0000`
- `formatCEP` — `00000-000`
- `formatDisplayDate` — converts `YYYY-MM-DD` → `DD/MM/YYYY`
- `formatCurrency` — `R$ 1.234,56` (pt-BR locale)
- `getInitial(name)` — returns uppercase first letter of a name
- `calculateAge(birthDate)` — returns human-readable age from `DD/MM/YYYY` string

## usePhotoUpload(onUpdate)

Handles photo file selection via FileReader, returns base64 data URL.

```typescript
const { handleFileChange } = usePhotoUpload((dataUrl) => {
  form.photo = dataUrl
})
```

Bind `handleFileChange` to an `<input type="file">` change event.

## useClickOutside(elementRef, callback)

Detects clicks outside an element and calls a callback. Registers/deregisters listeners on mount/unmount.

```typescript
const bellRef = ref<HTMLElement | null>(null)
useClickOutside(bellRef, () => { isOpen.value = false })
```

## useCepLookup(initialCep?, initialAddress?, initialNeighborhood?)

Auto-fills address fields by fetching from ViaCEP API when a valid 8-digit CEP is entered.

```typescript
const { cep, address, neighborhood, handleCEPInput } = useCepLookup(user.cep, user.address, user.neighborhood)
```

Used by: `RegisterCard.vue`, `ProfileForm.vue`

## useCrudModal<T>(storeActions)

Generic CRUD modal state management (add/edit/remove pattern).

```typescript
const { showForm, editingItem, removingItem, handleAdd, handleEdit, handleSave, handleRemove } = useCrudModal<Coupon>({
  add: (data) => store.addCoupon(data),
  update: (id, data) => store.updateCoupon(id, data),
  remove: (id) => store.removeCoupon(id),
})
```

Used by: `CouponsView.vue`, `UsersView.vue`

## useAppointmentActions()

Selection and cancellation flow for appointments (detail modal → confirm cancel modal).

```typescript
const { selectedAppointment, cancelingAppointment, handleSelectAppointment, handleCancelRequest, handleCancelConfirm } = useAppointmentActions()
```

Used by: `AdminDashboardView.vue`, `CustomerDashboardView.vue`

## useTestimonialStatus()

Status labels and CSS classes for testimonial display.

```typescript
const { getStatusLabel, getStatusClass } = useTestimonialStatus()
getStatusLabel(testimonial) // 'Publicado' | 'Aguardando' | 'Não autorizado'
getStatusClass(testimonial, 'testimonials-table__status') // 'testimonials-table__status--approved'
```

Used by: `AdminTestimonialsSection.vue`, `CustomerTestimonialSection.vue`

## Component-Specific Composables

These extract business logic from specific SFCs, keeping `.vue` files focused on template binding.

| Composable | Source Component | Key exports |
|---|---|---|
| `useServiceRequestForm` | `ServiceRequestStep.vue` | Form state, service selection, request CRUD, validation |
| `usePaymentStep` | `PaymentStep.vue` | Payment method selection, sub-step navigation, coupon handling |
| `useRegisterForm` | `RegisterCard.vue` | Multi-step registration with masks and CEP lookup |
| `usePricesEditor` | `PricesEditor.vue` | Draft state, change detection, tab-based save |
| `useNotificationBell` | `NotificationBell.vue` | Notifications list, read/unread, click-outside close |
| `useCustomerDashboard` | `CustomerDashboardView.vue` | Stats, pet CRUD, appointment actions |
| `useAdminDashboard` | `AdminDashboardView.vue` | Stats, filter handlers, appointment actions |
| `useCustomerTestimonial` | `CustomerTestimonialSection.vue` | Edit/view toggle, form state, save/cancel |
| `useAppHeader` | `AppHeader.vue` | Menu toggle, active link detection, logout |
| `usePaymentCredit` | `PaymentCredit.vue` | Card form, formatting, installments |
| `useProfileForm` | `ProfileForm.vue` | Profile fields, photo upload, CEP lookup |

## Testing

Tests live in `tests/composables/`. Each composable has a corresponding `.test.ts` file.

- **Pure function composables** (e.g. `useInputMasks`): call directly, no setup needed
- **Lifecycle composables** (e.g. `useViewport`, `useClickOutside`): use `withSetup()` from `tests/helpers.ts`
- **Touch composables** (e.g. `useSwipe`): use `createMockTouchEvent()` from `tests/helpers.ts`
- **FileReader composable** (e.g. `usePhotoUpload`): use `vi.stubGlobal('FileReader', MockClass)`
- **Store-dependent composables** (e.g. `useAppointmentActions`): use `freshPinia()` in `beforeEach`

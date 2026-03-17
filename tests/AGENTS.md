# Tests — Agent Reference

## Stack

- **Vitest** — test runner (globals enabled, no need to import `describe`/`it`/`expect`)
- **@vue/test-utils** — Vue component mounting
- **happy-dom** — DOM environment
- **@pinia/testing** — Pinia test utilities

## Directory Structure

```
tests/
├── setup.ts                    # Global: localStorage.clear() in beforeEach, rAF polyfill
├── helpers.ts                  # Shared utilities (see below)
├── composables/                # One file per composable
├── stores/                     # One file per Pinia store
└── components/shared/          # One file per shared component
```

## Running Tests

```bash
npm test              # Watch mode
npm run test:run      # Single run (CI)
npm run test:coverage # With coverage report
```

## Test Helpers (`tests/helpers.ts`)

| Helper | Use when |
|--------|----------|
| `withSetup(composable)` | Testing composables that use lifecycle hooks (`onMounted`/`onUnmounted`) |
| `createMockTouchEvent(type, clientX)` | Simulating touch events for swipe tests |
| `freshPinia()` | Creating a clean Pinia instance per test (call in `beforeEach`) |
| `mountWithPlugins(component, options)` | Mounting components that need Pinia + common stubs |

## Patterns by Category

### Composables

```ts
import { useMyComposable } from '@/composables/useMyComposable'

// Pure function composables — call directly
const { fn } = useMyComposable()

// Lifecycle composables — wrap with withSetup
const { result, unmount } = withSetup(() => useViewport())
// ... test ...
unmount()
```

### Stores

```ts
import { freshPinia } from '../helpers'
import { useMyStore } from '@/stores/myStore'

beforeEach(() => {
  freshPinia() // Creates new Pinia, isolates each test
})
```

**Important**: Stores use shallow copies of mock data (`[...mockArray]`). The objects inside are shared references. To avoid cross-test pollution, **always add fresh items** before testing mutations (`updateX`, `Object.assign`). Never mutate mock data objects directly.

### Components

```ts
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/shared/MyComponent.vue'

// Components with Teleport (modals) — stub Teleport
mount(MyComponent, {
  props: { ... },
  global: { stubs: { Teleport: true } },
})
```

## Mocking Strategies

| What | How |
|------|-----|
| `localStorage` | Cleared automatically in `setup.ts` `beforeEach` |
| `FileReader` | `vi.stubGlobal('FileReader', MockFileReaderClass)` + `vi.unstubAllGlobals()` |
| `window.innerWidth` | `Object.defineProperty(window, 'innerWidth', { value: 500, writable: true, configurable: true })` |
| `vue-router` | `vi.mock('vue-router', () => ({ useRouter: () => ({ push: mockPush }) }))` |
| Image imports | `vi.mock('@/assets/images/file.png', () => ({ default: 'mock.png' }))` |
| Fake timers | `vi.useFakeTimers()` + `vi.setSystemTime(new Date('...'))` + `vi.useRealTimers()` |
| `requestAnimationFrame` | Polyfilled in `setup.ts` |
| Teleport | `global: { stubs: { Teleport: true } }` in mount options |

## Naming Convention

- File: `tests/{category}/{SourceName}.test.ts`
- Describe: matches export name (e.g., `describe('useCarousel', ...)`)
- It: describes behavior (e.g., `it('wraps from last to first in loop mode', ...)`)

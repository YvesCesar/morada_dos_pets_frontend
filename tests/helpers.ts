import { createApp, defineComponent, type Component } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { mount, type MountingOptions } from '@vue/test-utils'

/**
 * Mounts a composable inside a throwaway component for lifecycle hooks
 */
export function withSetup<T>(composable: () => T): { result: T; unmount: () => void } {
  let result!: T
  const app = createApp(
    defineComponent({
      setup() {
        result = composable()
        return () => null
      },
    }),
  )
  const div = document.createElement('div')
  app.mount(div)
  return {
    result,
    unmount: () => app.unmount(),
  }
}

/**
 * Creates a mock TouchEvent
 */
export function createMockTouchEvent(type: string, clientX: number): TouchEvent {
  return {
    type,
    touches: [{ clientX }] as unknown as TouchList,
    preventDefault: () => {},
  } as unknown as TouchEvent
}

/**
 * Creates a fresh Pinia instance and sets it as active
 */
export function freshPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

/**
 * Mounts a component with Pinia and common stubs
 */
export function mountWithPlugins<T extends Component>(
  component: T,
  options: MountingOptions<Record<string, unknown>> = {},
) {
  const pinia = createPinia()
  setActivePinia(pinia)
  return mount(component, {
    global: {
      plugins: [pinia],
      stubs: {
        Teleport: true,
      },
      ...options.global,
    },
    ...options,
  })
}

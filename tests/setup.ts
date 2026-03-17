beforeEach(() => {
  localStorage.clear()
})

// Polyfill requestAnimationFrame/cancelAnimationFrame for happy-dom
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0) as unknown as number
  globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id)
}

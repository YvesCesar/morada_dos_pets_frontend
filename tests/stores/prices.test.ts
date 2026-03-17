import { freshPinia } from '../helpers'
import { usePricesStore } from '@/stores/prices'

describe('usePricesStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('starts with empty arrays', () => {
    const store = usePricesStore()
    expect(store.dogSpaServices.length).toBe(0)
    expect(store.hospedagemPlans.length).toBe(0)
    expect(store.crechePlans.length).toBe(0)
  })

  it('loadPrices populates all arrays', () => {
    const store = usePricesStore()
    store.loadPrices()
    expect(store.dogSpaServices.length).toBeGreaterThan(0)
    expect(store.hospedagemPlans.length).toBeGreaterThan(0)
    expect(store.crechePlans.length).toBeGreaterThan(0)
  })

  it('loadPrices does not reload if already loaded', () => {
    const store = usePricesStore()
    store.loadPrices()
    const count = store.dogSpaServices.length
    store.loadPrices() // second call
    expect(store.dogSpaServices.length).toBe(count)
  })

  it('updateDogSpaPrice updates a specific price', () => {
    const store = usePricesStore()
    store.loadPrices()
    const service = store.dogSpaServices[0]!
    const oldPrice = service.prices[0]!.price
    store.updateDogSpaPrice(service.id, 0, 'R$ 999,00')
    expect(store.dogSpaServices[0]!.prices[0]!.price).toBe('R$ 999,00')
    expect(store.dogSpaServices[0]!.prices[0]!.price).not.toBe(oldPrice)
  })

  it('updateHospedagemPrice updates a specific price', () => {
    const store = usePricesStore()
    store.loadPrices()
    const plan = store.hospedagemPlans[0]!
    store.updateHospedagemPrice(plan.id, 0, 'R$ 888,00')
    expect(store.hospedagemPlans[0]!.prices[0]!.price).toBe('R$ 888,00')
  })

  it('updateCrechePrice updates a specific price', () => {
    const store = usePricesStore()
    store.loadPrices()
    const plan = store.crechePlans[0]!
    store.updateCrechePrice(plan.id, 0, 'R$ 777,00')
    expect(store.crechePlans[0]!.prices[0]!.price).toBe('R$ 777,00')
  })
})

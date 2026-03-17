import { freshPinia } from '../helpers'
import { useCouponsStore } from '@/stores/coupons'

describe('useCouponsStore', () => {
  beforeEach(() => {
    freshPinia()
  })

  it('initializes with mock coupons', () => {
    const store = useCouponsStore()
    expect(store.coupons.length).toBeGreaterThan(0)
  })

  it('addCoupon generates id with "c" prefix and 0 currentUses', () => {
    const store = useCouponsStore()
    const before = store.coupons.length
    store.addCoupon({
      code: 'PETLOVE15',
      type: 'percentage',
      value: 15,
      maxUses: 50,
      expiresAt: '2026-12-31',
      active: true,
    })
    expect(store.coupons.length).toBe(before + 1)
    const added = store.coupons[store.coupons.length - 1]!
    expect(added.id).toMatch(/^c\d+$/)
    expect(added.currentUses).toBe(0)
    expect(added.code).toBe('PETLOVE15')
  })

  it('updateCoupon merges data', () => {
    const store = useCouponsStore()
    store.addCoupon({
      code: 'BANHO20',
      type: 'percentage',
      value: 20,
      maxUses: 30,
      expiresAt: '2026-06-30',
      active: true,
    })
    const added = store.coupons[store.coupons.length - 1]!
    store.updateCoupon(added.id, { maxUses: 50 })
    expect(store.coupons.find((entry) => entry.id === added.id)?.maxUses).toBe(50)
  })

  it('removeCoupon removes from array', () => {
    const store = useCouponsStore()
    store.addCoupon({
      code: 'TEMPORARIO',
      type: 'fixed',
      value: 10,
      maxUses: 5,
      expiresAt: '2026-01-01',
      active: true,
    })
    const added = store.coupons[store.coupons.length - 1]!
    const before = store.coupons.length
    store.removeCoupon(added.id)
    expect(store.coupons.length).toBe(before - 1)
  })

  describe('validateCoupon', () => {
    it('returns invalid for unknown code', () => {
      const store = useCouponsStore()
      const result = store.validateCoupon('CUPOMINEXISTENTE', 100)
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Cupom não encontrado.')
    })

    it('returns invalid for inactive coupon', () => {
      const store = useCouponsStore()
      store.addCoupon({
        code: 'DESATIVADO',
        type: 'fixed',
        value: 25,
        maxUses: 10,
        expiresAt: '2099-12-31',
        active: false,
      })
      const result = store.validateCoupon('DESATIVADO', 100)
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Cupom inativo.')
    })

    it('returns invalid for exhausted coupon', () => {
      const store = useCouponsStore()
      store.addCoupon({
        code: 'ESGOTADO',
        type: 'fixed',
        value: 15,
        maxUses: 5,
        expiresAt: '2099-12-31',
        active: true,
      })
      const exhaustedCoupon = store.coupons.find((entry) => entry.code === 'ESGOTADO')!
      exhaustedCoupon.currentUses = 5
      const result = store.validateCoupon('ESGOTADO', 100)
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Cupom esgotado.')
    })

    it('returns invalid for expired coupon', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2026-06-01'))

      const store = useCouponsStore()
      store.addCoupon({
        code: 'VERAO2025',
        type: 'percentage',
        value: 10,
        maxUses: 100,
        expiresAt: '2025-03-31',
        active: true,
      })
      const result = store.validateCoupon('VERAO2025', 200)
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Cupom expirado.')

      vi.useRealTimers()
    })

    it('calculates percentage discount', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-01-01'))

      const store = useCouponsStore()
      store.addCoupon({
        code: 'SPADESCONTO10',
        type: 'percentage',
        value: 10,
        maxUses: 100,
        expiresAt: '2025-12-31',
        active: true,
      })
      const result = store.validateCoupon('SPADESCONTO10', 200)
      expect(result.valid).toBe(true)
      expect(result.discount).toBe(20) // 10% of 200
      expect(result.message).toContain('Cupom aplicado')

      vi.useRealTimers()
    })

    it('calculates fixed discount capped at subtotal', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2025-01-01'))

      const store = useCouponsStore()
      store.addCoupon({
        code: 'HOSPEDAGEM50',
        type: 'fixed',
        value: 50,
        maxUses: 10,
        expiresAt: '2025-12-31',
        active: true,
      })

      // subtotal maior que o valor do cupom
      let result = store.validateCoupon('HOSPEDAGEM50', 100)
      expect(result.discount).toBe(50)

      // subtotal menor que o valor do cupom — limitado ao subtotal
      result = store.validateCoupon('HOSPEDAGEM50', 30)
      expect(result.discount).toBe(30)

      vi.useRealTimers()
    })
  })
})

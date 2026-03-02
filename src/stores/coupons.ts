/**
 * Store de cupons — CRUD + validação para pagamento
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Coupon } from '@/types'
import { mockCoupons } from '@/data'

export const useCouponsStore = defineStore('coupons', () => {
  const coupons = ref<Coupon[]>([...mockCoupons])

  function addCoupon(coupon: Omit<Coupon, 'id' | 'currentUses'>) {
    const id = 'c' + Date.now()
    coupons.value.push({ ...coupon, id, currentUses: 0 })
  }

  function updateCoupon(id: string, data: Partial<Coupon>) {
    const index = coupons.value.findIndex((c) => c.id === id)
    if (index !== -1) {
      Object.assign(coupons.value[index]!, data)
    }
  }

  function removeCoupon(id: string) {
    coupons.value = coupons.value.filter((c) => c.id !== id)
  }

  function validateCoupon(
    code: string,
    subtotal: number,
  ): { valid: boolean; discount: number; message: string } {
    const coupon = coupons.value.find((c) => c.code === code)

    if (!coupon) {
      return { valid: false, discount: 0, message: 'Cupom não encontrado.' }
    }
    if (!coupon.active) {
      return { valid: false, discount: 0, message: 'Cupom inativo.' }
    }
    if (coupon.currentUses >= coupon.maxUses) {
      return { valid: false, discount: 0, message: 'Cupom esgotado.' }
    }
    if (new Date(coupon.expiresAt) < new Date()) {
      return { valid: false, discount: 0, message: 'Cupom expirado.' }
    }

    const discount =
      coupon.type === 'percentage'
        ? Math.round(subtotal * (coupon.value / 100))
        : Math.min(coupon.value, subtotal)

    return { valid: true, discount, message: `Cupom aplicado! -R$ ${discount.toFixed(2)}` }
  }

  return {
    coupons,
    addCoupon,
    updateCoupon,
    removeCoupon,
    validateCoupon,
  }
})

import { ref, computed } from 'vue'
import type { PaymentMethod, ServiceRequest } from '@/types'
import { useCouponsStore } from '@/stores/coupons'

interface PaymentStepProps {
  serviceRequests: ServiceRequest[]
}

/**
 * Composable para o fluxo de pagamento multi-step
 */
export function usePaymentStep(
  props: PaymentStepProps,
  emit: (event: 'back' | 'confirm') => void,
) {
  const couponsStore = useCouponsStore()

  const paymentMethod = ref<PaymentMethod | null>(null)
  const paymentSubStep = ref<'select' | 'pix' | 'debito' | 'credito'>('select')
  const couponCode = ref('')
  const discount = ref(0)

  const showServiceRequests = ref(false)
  const showPaymentMethod = ref(true)

  const subtotal = computed(() => {
    return props.serviceRequests.reduce((sum, r) => sum + r.price, 0)
  })

   
  const total = computed(() => {
    return Math.max(0, subtotal.value - discount.value)
  })

  const selectPaymentMethod = (method: PaymentMethod | null) => {
    paymentMethod.value = method
  }

  const handleCouponApply = (code: string) => {
    couponCode.value = code
    const result = couponsStore.validateCoupon(code, subtotal.value)
    discount.value = result.discount
  }

  const handlePixBack = () => {
    paymentSubStep.value = 'select'
    paymentMethod.value = null
  }

  const handleCardBack = () => {
    paymentSubStep.value = 'select'
    paymentMethod.value = null
  }

  const handleCardSubmit = () => {
    emit('confirm')
  }

  const handleConfirmStep = () => {
    if (!paymentMethod.value) return
    paymentSubStep.value = paymentMethod.value
  }

  const toggleServiceRequests = () => {
    showServiceRequests.value = !showServiceRequests.value
  }

  const togglePaymentMethod = () => {
    showPaymentMethod.value = !showPaymentMethod.value
  }

  return {
    paymentMethod,
    paymentSubStep,
    couponCode,
    discount,
    showServiceRequests,
    showPaymentMethod,
    subtotal,
    total,
    selectPaymentMethod,
    handleCouponApply,
    handlePixBack,
    handleCardBack,
    handleCardSubmit,
    handleConfirmStep,
    toggleServiceRequests,
    togglePaymentMethod,
  }
}

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PaymentMethod, ServiceRequest } from '@/types'
import PaymentMethodSelector from './PaymentMethodSelector.vue'
import PaymentPix from './PaymentPix.vue'
import PaymentDebit from './PaymentDebit.vue'
import PaymentCredit from './PaymentCredit.vue'
import OrderSummary from './OrderSummary.vue'
import CouponInput from './CouponInput.vue'
import { useCouponsStore } from '@/stores/coupons'

interface Props {
  serviceRequests: ServiceRequest[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  back: []
  confirm: []
}>()

const couponsStore = useCouponsStore()

// Estado local
const paymentMethod = ref<PaymentMethod | null>(null)
const paymentSubStep = ref<'select' | 'pix' | 'debito' | 'credito'>('select')
const couponCode = ref('')
const discount = ref(0)

// Seções colapsáveis
const showServiceRequests = ref(false)
const showPaymentMethod = ref(true)

// Cálculos
const subtotal = computed(() => {
  return props.serviceRequests.reduce((sum, r) => sum + r.price, 0)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const total = computed(() => {
  return Math.max(0, subtotal.value - discount.value)
})

// Handlers
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
</script>

<template>
  <div class="payment-step">
    <div class="payment-step__layout">
      <!-- Coluna esquerda: Formulário -->
      <div class="payment-step__form-area">
        <h3 class="payment-step__section-title">Confirme as informações</h3>

        <!-- Barra: Solicitação de serviço -->
        <div class="payment-step__collapsible">
          <button
            class="payment-step__collapsible-header"
            :aria-expanded="showServiceRequests"
            @click="toggleServiceRequests"
          >
            <span class="payment-step__collapsible-title">Solicitação de serviço</span>
            <span
              class="payment-step__collapsible-arrow"
              :class="{ 'payment-step__collapsible-arrow--open': showServiceRequests }"
            >&#8250;</span>
          </button>
          <div v-if="showServiceRequests" class="payment-step__collapsible-content">
            <div
              v-for="request in serviceRequests"
              :key="request.id"
              class="payment-step__request-item"
            >
              <div class="payment-step__request-info">
                <strong>{{ request.serviceName }}</strong> — {{ request.pet.name }} ({{ request.pet.breed }})
              </div>
              <div class="payment-step__request-details">
                <span>{{ request.unit }}</span>
                <span>{{ request.date }} às {{ request.time }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Seção de conteúdo baseada no sub-passo -->
        <template v-if="paymentSubStep === 'select'">
          <!-- Barra: Método de pagamento -->
          <div class="payment-step__collapsible">
            <button
              class="payment-step__collapsible-header"
              :aria-expanded="showPaymentMethod"
              @click="togglePaymentMethod"
            >
              <span class="payment-step__collapsible-title">Método de pagamento</span>
              <span
                class="payment-step__collapsible-arrow"
                :class="{ 'payment-step__collapsible-arrow--open': showPaymentMethod }"
              >&#8250;</span>
            </button>
            <div v-if="showPaymentMethod" class="payment-step__collapsible-content">
              <PaymentMethodSelector
                :model-value="paymentMethod"
                @update:model-value="selectPaymentMethod"
              />
            </div>
          </div>

          <!-- Botões de navegação -->
          <div class="payment-step__actions">
            <button class="payment-step__btn payment-step__btn--outline" @click="emit('back')">
              Anterior
            </button>
            <button
              class="payment-step__btn payment-step__btn--primary"
              :disabled="!paymentMethod"
              @click="handleConfirmStep"
            >
              Confirmar
            </button>
          </div>
        </template>

        <!-- Sub-etapa: PIX -->
        <PaymentPix
          v-else-if="paymentSubStep === 'pix'"
          @back="handlePixBack"
        />

        <!-- Sub-etapa: Débito -->
        <PaymentDebit
          v-else-if="paymentSubStep === 'debito'"
          @back="handleCardBack"
          @submit="handleCardSubmit"
        />

        <!-- Sub-etapa: Crédito -->
        <PaymentCredit
          v-else-if="paymentSubStep === 'credito'"
          @back="handleCardBack"
          @submit="handleCardSubmit"
        />
      </div>

      <!-- Coluna direita: Resumo -->
      <div class="payment-step__summary-area">
        <OrderSummary
          :subtotal="subtotal"
          :discount="discount"
          :show-total="true"
          :show-coupon-hint="false"
          :show-items="false"
          :service-requests="serviceRequests"
        />

        <CouponInput
          @apply="handleCouponApply"
        />
      </div>
    </div>
  </div>
</template>

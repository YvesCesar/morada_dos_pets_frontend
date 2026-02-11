<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PaymentMethod, ServiceRequest } from '@/types'
import PaymentMethodSelector from './PaymentMethodSelector.vue'
import PaymentPix from './PaymentPix.vue'
import PaymentDebit from './PaymentDebit.vue'
import PaymentCredit from './PaymentCredit.vue'
import OrderSummary from './OrderSummary.vue'
import CouponInput from './CouponInput.vue'

interface Props {
  serviceRequests: ServiceRequest[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  back: []
  confirm: []
}>()

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
const selectPaymentMethod = (method: PaymentMethod) => {
  paymentMethod.value = method
  paymentSubStep.value = method
}

const handleCouponApply = (code: string) => {
  couponCode.value = code
  if (code === 'MORADA10') {
    discount.value = Math.round(subtotal.value * 0.1)
  } else {
    discount.value = 0
  }
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

<style scoped>
.payment-step {
  width: 100%;
}

.payment-step__layout {
  display: flex;
  gap: var(--spacing-xl);
  align-items: flex-start;
}

.payment-step__form-area {
  flex: 1;
  max-width: 637px;
}

.payment-step__summary-area {
  width: 414px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.payment-step__section-title {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  line-height: 1.25em;
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
}

/* Barras colapsáveis */
.payment-step__collapsible {
  margin-bottom: var(--spacing-md);
}

.payment-step__collapsible-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 var(--spacing-sm);
  height: 45px;
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.payment-step__collapsible-header:hover {
  opacity: 0.95;
}

.payment-step__collapsible-title {
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-lg);
  line-height: 1.25em;
  color: var(--color-white);
}

.payment-step__collapsible-arrow {
  font-family: var(--font-primary);
  font-weight: 300;
  font-size: var(--text-2xl);
  color: rgba(255, 255, 255, 0.55);
  transition: transform var(--transition-fast);
  line-height: 1;
}

.payment-step__collapsible-arrow--open {
  transform: rotate(90deg);
}

.payment-step__collapsible-content {
  padding: var(--spacing-md) var(--spacing-sm);
}

/* Request items dentro da seção colapsável */
.payment-step__request-item {
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid rgba(41, 16, 0, 0.1);
}

.payment-step__request-item:last-child {
  border-bottom: none;
}

.payment-step__request-info {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-sm);
  line-height: 1.5em;
  color: var(--color-black);
  margin-bottom: 4px;
}

.payment-step__request-details {
  display: flex;
  gap: var(--spacing-md);
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-xs);
  line-height: 1.25em;
  color: var(--color-text-muted);
}

/* Botões de navegação */
.payment-step__actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
}

.payment-step__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 177.55px;
  height: 40.64px;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  line-height: 1.25em;
  cursor: pointer;
  transition: opacity var(--transition-fast), background-color var(--transition-fast);
}

.payment-step__btn--outline {
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.payment-step__btn--outline:hover {
  background-color: rgba(41, 16, 0, 0.04);
}

.payment-step__btn--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
}

.payment-step__btn--primary:hover {
  opacity: 0.9;
}

.payment-step__btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsividade */
@media (max-width: 1200px) {
  .payment-step__layout {
    flex-direction: column;
  }

  .payment-step__summary-area {
    width: 100%;
  }

  .payment-step__form-area {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .payment-step__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .payment-step__btn {
    width: 100%;
  }

  .payment-step__request-details {
    flex-direction: column;
    gap: 4px;
  }
}
</style>

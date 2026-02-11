<script setup lang="ts">
import type { PaymentMethod } from '@/types'
import pixIcon from '@/assets/images/pagamento/pix-icon.svg'
import cardIcon from '@/assets/images/pagamento/payment-progress-icon.svg'

interface Props {
  modelValue: PaymentMethod | null
}

defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [method: PaymentMethod]
}>()

const methods: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'pix', label: 'Pix', icon: pixIcon },
  { id: 'debito', label: 'Cartão de débito', icon: cardIcon },
  { id: 'credito', label: 'Cartão de crédito', icon: cardIcon },
]
</script>

<template>
  <div class="payment-methods" role="radiogroup" aria-label="Método de pagamento">
    <label
      v-for="method in methods"
      :key="method.id"
      class="payment-methods__option"
      :class="{ 'payment-methods__option--selected': modelValue === method.id }"
    >
      <span class="payment-methods__radio-wrapper">
        <input
          type="radio"
          name="payment-method"
          :value="method.id"
          :checked="modelValue === method.id"
          class="payment-methods__radio-input sr-only"
          @change="emit('update:modelValue', method.id)"
        />
        <span class="payment-methods__radio" />
      </span>
      <img
        :src="method.icon"
        :alt="method.label"
        class="payment-methods__icon"
      />
      <span class="payment-methods__label">{{ method.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 34px;
}

.payment-methods__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.payment-methods__option:hover {
  opacity: 0.8;
}

.payment-methods__radio-wrapper {
  flex-shrink: 0;
}

.payment-methods__radio {
  display: block;
  width: 23px;
  height: 22px;
  border: 1px solid #b2abab;
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
  position: relative;
}

.payment-methods__option--selected .payment-methods__radio {
  border-color: var(--color-primary);
  background-color: var(--color-primary);
}

.payment-methods__option--selected .payment-methods__radio::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background-color: var(--color-white);
}

.payment-methods__icon {
  width: 35px;
  height: 27px;
  object-fit: contain;
  flex-shrink: 0;
}

.payment-methods__label {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
}

/* Responsividade */
@media (max-width: 768px) {
  .payment-methods {
    gap: 24px;
  }
}
</style>

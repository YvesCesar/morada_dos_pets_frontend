<script setup lang="ts">
import type { PaymentMethod } from '@/types'
import pixIcon from '@/assets/images/pagamento/pix-icon.svg'
import cardIcon from '@/assets/images/pagamento/payment-progress-icon.svg'

interface Props {
  modelValue: PaymentMethod | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [method: PaymentMethod | null]
}>()

const methods: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: 'pix', label: 'Pix', icon: pixIcon },
  { id: 'debito', label: 'Cartão de débito', icon: cardIcon },
  { id: 'credito', label: 'Cartão de crédito', icon: cardIcon },
]

const toggleMethod = (methodId: PaymentMethod) => {
  if (props.modelValue === methodId) {
    emit('update:modelValue', null)
  } else {
    emit('update:modelValue', methodId)
  }
}
</script>

<template>
  <div class="payment-methods" aria-label="Método de pagamento">
    <label
      v-for="method in methods"
      :key="method.id"
      class="payment-methods__option"
    >
      <span class="payment-methods__checkbox-wrapper">
        <input
          type="checkbox"
          :checked="modelValue === method.id"
          class="payment-methods__checkbox-input sr-only"
          @change="toggleMethod(method.id)"
        />
        <span class="payment-methods__checkbox" />
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

.payment-methods__checkbox-wrapper {
  flex-shrink: 0;
}

.payment-methods__checkbox {
  display: block;
  width: 23px;
  height: 22px;
  border: 1px solid #b2abab;
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  flex-shrink: 0;
  position: relative;
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
}

.payment-methods__checkbox-input:checked + .payment-methods__checkbox {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.payment-methods__checkbox-input:checked + .payment-methods__checkbox::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 7px;
  width: 6px;
  height: 11px;
  border: solid var(--color-white);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.payment-methods__checkbox-input:focus-visible + .payment-methods__checkbox {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
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

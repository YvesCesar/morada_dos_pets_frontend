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

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  apply: [code: string]
}>()

const couponCode = ref('')
const applied = ref(false)
const errorMessage = ref('')

const applyCoupon = () => {
  if (!couponCode.value.trim()) {
    errorMessage.value = 'Digite um código de cupom'
    return
  }

  errorMessage.value = ''
  applied.value = true
  emit('apply', couponCode.value.trim().toUpperCase())

  setTimeout(() => { applied.value = false }, 3000)
}
</script>

<template>
  <div class="coupon-input">
    <label class="coupon-input__label" for="coupon-code">Código de cupom de desconto</label>
    <div class="coupon-input__row">
      <input
        id="coupon-code"
        v-model="couponCode"
        type="text"
        class="coupon-input__field"
        placeholder="Digite o cupom"
        @keyup.enter="applyCoupon"
      />
      <button
        class="coupon-input__btn"
        :class="{ 'coupon-input__btn--applied': applied }"
        @click="applyCoupon"
      >
        {{ applied ? 'Aplicado!' : 'Aplicar' }}
      </button>
    </div>
    <p v-if="errorMessage" class="coupon-input__error">{{ errorMessage }}</p>
  </div>
</template>

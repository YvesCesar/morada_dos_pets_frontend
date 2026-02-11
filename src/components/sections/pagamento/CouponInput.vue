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

<style scoped>
.coupon-input {
  width: 100%;
  max-width: 414px;
}

.coupon-input__label {
  display: block;
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  line-height: 1.25em;
  color: var(--color-black);
  margin-bottom: 8px;
}

.coupon-input__row {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.coupon-input__field {
  width: 289px;
  height: 36px;
  padding: 0 var(--spacing-sm);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-xs);
  line-height: 1.25em;
  color: var(--color-black);
  background-color: var(--color-white);
  transition: border-color var(--transition-fast);
}

.coupon-input__field::placeholder {
  color: rgba(0, 0, 0, 0.55);
}

.coupon-input__field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(41, 16, 0, 0.1);
}

.coupon-input__btn {
  width: 108px;
  height: 36px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  line-height: 1.25em;
  cursor: pointer;
  transition: opacity var(--transition-fast), background-color var(--transition-fast);
  flex-shrink: 0;
}

.coupon-input__btn:hover {
  opacity: 0.9;
}

.coupon-input__btn--applied {
  background-color: #2d7a3a;
}

.coupon-input__error {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-xs);
  color: #c0392b;
  margin-top: 4px;
}

/* Responsividade */
@media (max-width: 768px) {
  .coupon-input {
    max-width: 100%;
  }

  .coupon-input__field {
    width: 100%;
    flex: 1;
  }
}
</style>

<script setup lang="ts">
import { reactive } from 'vue'
import type { CardPaymentData } from '@/types'
import cardBrandsCredit from '@/assets/images/pagamento/card-brands.svg'

const emit = defineEmits<{
  back: []
  submit: [data: CardPaymentData]
}>()

const form = reactive<CardPaymentData>({
  cardNumber: '',
  cardName: '',
  expiry: '',
  securityCode: '',
  rememberCard: false,
  installments: 1,
})

const installmentOptions = [
  { value: 1, label: '1x (à vista)' },
  { value: 2, label: '2x' },
  { value: 3, label: '3x' },
  { value: 4, label: '4x' },
  { value: 5, label: '5x' },
  { value: 6, label: '6x' },
]

const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 16) value = value.slice(0, 16)
  form.cardNumber = value.replace(/(\d{4})(?=\d)/g, '$1 ')
}

const formatExpiry = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 4) value = value.slice(0, 4)
  if (value.length >= 2) {
    form.expiry = value.slice(0, 2) + ' / ' + value.slice(2)
  } else {
    form.expiry = value
  }
}

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>

<template>
  <div class="payment-credit">
    <h3 class="payment-credit__title">Realize o pagamento</h3>

    <!-- Indicador do método selecionado -->
    <div class="payment-credit__selected-method">
      <span class="payment-credit__radio-indicator" />
      <svg class="payment-credit__card-icon" width="35" height="27" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 5.56054C0 4.08579 0.57617 2.67145 1.60176 1.62865C2.62735 0.585841 4.01835 0 5.46875 0H29.5312C30.9817 0 32.3727 0.585841 33.3982 1.62865C34.4238 2.67145 35 4.08579 35 5.56054V21.1301C35 22.6048 34.4238 24.0192 33.3982 25.062C32.3727 26.1048 30.9817 26.6906 29.5312 26.6906H5.46875C4.01835 26.6906 2.62735 26.1048 1.60176 25.062C0.57617 24.0192 0 22.6048 0 21.1301V5.56054ZM5.46875 2.22422C4.59851 2.22422 3.76391 2.57572 3.14856 3.2014C2.5332 3.82709 2.1875 4.67569 2.1875 5.56054V8.45202H32.8125V5.56054C32.8125 4.67569 32.4668 3.82709 31.8514 3.2014C31.2361 2.57572 30.4015 2.22422 29.5312 2.22422H5.46875ZM2.1875 21.1301C2.1875 22.0149 2.5332 22.8635 3.14856 23.4892C3.76391 24.1149 4.59851 24.4664 5.46875 24.4664H29.5312C30.4015 24.4664 31.2361 24.1149 31.8514 23.4892C32.4668 22.8635 32.8125 22.0149 32.8125 21.1301V10.6762H2.1875V21.1301ZM23.8438 18.2386C23.5537 18.2386 23.2755 18.3557 23.0704 18.5643C22.8652 18.7729 22.75 19.0557 22.75 19.3507C22.75 19.6456 22.8652 19.9285 23.0704 20.1371C23.2755 20.3456 23.5537 20.4628 23.8438 20.4628H28.6562C28.9463 20.4628 29.2245 20.3456 29.4296 20.1371C29.6348 19.9285 29.75 19.6456 29.75 19.3507C29.75 19.0557 29.6348 18.7729 29.4296 18.5643C29.2245 18.3557 28.9463 18.2386 28.6562 18.2386H23.8438Z" fill="#291000" fill-opacity="0.55"/>
      </svg>
      <span class="payment-credit__method-label">Cartão de crédito</span>
    </div>

    <!-- Info segurança + Bandeiras de cartão -->
    <div class="payment-credit__secure-row">
      <p class="payment-credit__secure-text">Pagamento seguro  com cartão</p>
      <img :src="cardBrandsCredit" alt="Visa, Mastercard, Elo" class="payment-credit__brands-img" />
    </div>

    <!-- Formulário -->
    <form class="payment-credit__form" @submit.prevent="handleSubmit">
      <div class="payment-credit__field">
        <label class="payment-credit__label" for="credit-card-number">Número do cartão</label>
        <input
          id="credit-card-number"
          type="text"
          class="payment-credit__input"
          :value="form.cardNumber"
          placeholder="0000 0000 0000 0000"
          inputmode="numeric"
          autocomplete="cc-number"
          @input="formatCardNumber"
        />
      </div>

      <div class="payment-credit__field">
        <label class="payment-credit__label" for="credit-card-name">Nome impresso no cartão</label>
        <input
          id="credit-card-name"
          v-model="form.cardName"
          type="text"
          class="payment-credit__input"
          placeholder="Nome completo"
          autocomplete="cc-name"
        />
      </div>

      <div class="payment-credit__row payment-credit__row--three">
        <div class="payment-credit__field payment-credit__field--third">
          <label class="payment-credit__label" for="credit-expiry">Vencimento</label>
          <input
            id="credit-expiry"
            type="text"
            class="payment-credit__input payment-credit__input--small"
            :value="form.expiry"
            placeholder="MM / AA"
            inputmode="numeric"
            autocomplete="cc-exp"
            @input="formatExpiry"
          />
        </div>
        <div class="payment-credit__field payment-credit__field--third">
          <label class="payment-credit__label" for="credit-cvv">Código de segurança</label>
          <input
            id="credit-cvv"
            v-model="form.securityCode"
            type="text"
            class="payment-credit__input payment-credit__input--small"
            placeholder="___"
            maxlength="4"
            inputmode="numeric"
            autocomplete="cc-csc"
          />
        </div>
        <div class="payment-credit__field payment-credit__field--third">
          <label class="payment-credit__label" for="credit-installments">Parcelas</label>
          <div class="payment-credit__select-wrapper">
            <select
              id="credit-installments"
              v-model.number="form.installments"
              class="payment-credit__select"
            >
              <option
                v-for="option in installmentOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <span class="payment-credit__select-arrow">&#8250;</span>
          </div>
        </div>
      </div>

      <label class="payment-credit__checkbox">
        <input
          v-model="form.rememberCard"
          type="checkbox"
          class="payment-credit__checkbox-input sr-only"
        />
        <span class="payment-credit__checkbox-custom" />
        <span class="payment-credit__checkbox-label">Lembrar deste cartão posteriormente</span>
      </label>

      <div class="payment-credit__actions">
        <button type="button" class="payment-credit__btn payment-credit__btn--outline" @click="emit('back')">
          Anterior
        </button>
        <button type="submit" class="payment-credit__btn payment-credit__btn--primary">
          Finalizar compra
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.payment-credit {
  width: 100%;
  max-width: 637px;
}

.payment-credit__title {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  line-height: 1.25em;
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
}

.payment-credit__selected-method {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.payment-credit__radio-indicator {
  display: block;
  width: 23px;
  height: 22px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  position: relative;
  flex-shrink: 0;
}

.payment-credit__radio-indicator::after {
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

.payment-credit__card-icon {
  flex-shrink: 0;
}

.payment-credit__method-label {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
}

.payment-credit__secure-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.payment-credit__secure-text {
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
}

.payment-credit__brands-img {
  width: 233px;
  height: 64px;
  object-fit: contain;
}

.payment-credit__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.payment-credit__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.payment-credit__field--third {
  flex: 1;
  min-width: 0;
}

.payment-credit__row {
  display: flex;
  gap: var(--spacing-lg);
}

.payment-credit__row--three {
  gap: var(--spacing-md);
}

.payment-credit__label {
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
}

.payment-credit__input {
  width: 100%;
  max-width: 400px;
  height: 45px;
  padding: 0 var(--spacing-sm);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-weight: 300;
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
  background-color: var(--color-white);
  transition: border-color var(--transition-fast);
}

.payment-credit__input--small {
  max-width: 179px;
}

.payment-credit__input::placeholder {
  color: rgba(0, 0, 0, 0.55);
}

.payment-credit__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(41, 16, 0, 0.1);
}

.payment-credit__select-wrapper {
  position: relative;
  width: 100%;
  max-width: 179px;
}

.payment-credit__select {
  width: 100%;
  height: 45px;
  padding: 0 var(--spacing-lg) 0 var(--spacing-sm);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-weight: 300;
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
  background-color: var(--color-white);
  appearance: none;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.payment-credit__select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(41, 16, 0, 0.1);
}

.payment-credit__select-arrow {
  position: absolute;
  right: var(--spacing-sm);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-xl);
  color: rgba(0, 0, 0, 0.55);
  pointer-events: none;
}

.payment-credit__checkbox {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  margin-top: var(--spacing-xs);
}

.payment-credit__checkbox-custom {
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

.payment-credit__checkbox-input:checked + .payment-credit__checkbox-custom {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.payment-credit__checkbox-input:checked + .payment-credit__checkbox-custom::after {
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

.payment-credit__checkbox-input:focus-visible + .payment-credit__checkbox-custom {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.payment-credit__checkbox-label {
  font-family: var(--font-primary);
  font-weight: 300;
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
}

.payment-credit__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.payment-credit__btn {
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

.payment-credit__btn--outline {
  background-color: var(--color-white);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.payment-credit__btn--outline:hover {
  background-color: rgba(41, 16, 0, 0.04);
}

.payment-credit__btn--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  min-width: 186px;
}

.payment-credit__btn--primary:hover {
  opacity: 0.9;
}

/* Responsividade */
@media (max-width: 768px) {
  .payment-credit__row--three {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .payment-credit__input--small {
    max-width: 100%;
  }

  .payment-credit__input {
    max-width: 100%;
  }

  .payment-credit__select-wrapper {
    max-width: 100%;
  }

  .payment-credit__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .payment-credit__btn {
    width: 100%;
  }

  .payment-credit__brands-img {
    width: 100%;
    max-width: 233px;
  }
}
</style>

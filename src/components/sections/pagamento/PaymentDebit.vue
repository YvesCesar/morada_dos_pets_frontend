<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { vMaska } from 'maska/vue'
import { MASKS } from '@/config/masks'
import { debitCardSchema } from '@/schemas'
import type { CardPaymentData } from '@/types'
import cardBrandsDebit from '@/assets/images/pagamento/card-brands.svg'

const emit = defineEmits<{
  back: []
  submit: [data: CardPaymentData]
}>()

const { handleSubmit, errors, defineField, meta } = useForm({
  validationSchema: toTypedSchema(debitCardSchema),
  initialValues: {
    cardNumber: '',
    cardName: '',
    expiry: '',
    securityCode: '',
    rememberCard: false,
  },
})

const [cardNumber, cardNumberAttrs] = defineField('cardNumber')
const [cardName, cardNameAttrs] = defineField('cardName')
const [expiry, expiryAttrs] = defineField('expiry')
const [securityCode, securityCodeAttrs] = defineField('securityCode')
const [rememberCard, rememberCardAttrs] = defineField('rememberCard')

const onSubmit = handleSubmit((values) => {
  emit('submit', { ...values })
})
</script>

<template>
  <div class="payment-debit">
    <h3 class="payment-debit__title">Realize o pagamento</h3>

    <!-- Indicador do método selecionado -->
    <div class="payment-debit__selected-method">
      <span class="payment-debit__radio-indicator" />
      <svg class="payment-debit__card-icon" width="35" height="27" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 5.56054C0 4.08579 0.57617 2.67145 1.60176 1.62865C2.62735 0.585841 4.01835 0 5.46875 0H29.5312C30.9817 0 32.3727 0.585841 33.3982 1.62865C34.4238 2.67145 35 4.08579 35 5.56054V21.1301C35 22.6048 34.4238 24.0192 33.3982 25.062C32.3727 26.1048 30.9817 26.6906 29.5312 26.6906H5.46875C4.01835 26.6906 2.62735 26.1048 1.60176 25.062C0.57617 24.0192 0 22.6048 0 21.1301V5.56054ZM5.46875 2.22422C4.59851 2.22422 3.76391 2.57572 3.14856 3.2014C2.5332 3.82709 2.1875 4.67569 2.1875 5.56054V8.45202H32.8125V5.56054C32.8125 4.67569 32.4668 3.82709 31.8514 3.2014C31.2361 2.57572 30.4015 2.22422 29.5312 2.22422H5.46875ZM2.1875 21.1301C2.1875 22.0149 2.5332 22.8635 3.14856 23.4892C3.76391 24.1149 4.59851 24.4664 5.46875 24.4664H29.5312C30.4015 24.4664 31.2361 24.1149 31.8514 23.4892C32.4668 22.8635 32.8125 22.0149 32.8125 21.1301V10.6762H2.1875V21.1301ZM23.8438 18.2386C23.5537 18.2386 23.2755 18.3557 23.0704 18.5643C22.8652 18.7729 22.75 19.0557 22.75 19.3507C22.75 19.6456 22.8652 19.9285 23.0704 20.1371C23.2755 20.3456 23.5537 20.4628 23.8438 20.4628H28.6562C28.9463 20.4628 29.2245 20.3456 29.4296 20.1371C29.6348 19.9285 29.75 19.6456 29.75 19.3507C29.75 19.0557 29.6348 18.7729 29.4296 18.5643C29.2245 18.3557 28.9463 18.2386 28.6562 18.2386H23.8438Z" fill="#291000" fill-opacity="0.55"/>
      </svg>
      <span class="payment-debit__method-label">Cartão de débito</span>
    </div>

    <!-- Info segurança + Bandeiras de cartão -->
    <div class="payment-debit__secure-row">
      <p class="payment-debit__secure-text">Pagamento seguro  com cartão</p>
      <img :src="cardBrandsDebit" alt="Visa, Mastercard, Elo" class="payment-debit__brands-img" />
    </div>

    <!-- Formulário -->
    <form class="payment-debit__form" @submit.prevent="onSubmit">
      <div class="payment-debit__field">
        <label class="payment-debit__label" for="debit-card-number">Número do cartão</label>
        <input
          id="debit-card-number"
          v-model="cardNumber"
          v-bind="cardNumberAttrs"
          v-maska="MASKS.cardNumber"
          type="text"
          class="payment-debit__input"
          :class="{ 'payment-debit__input--error': errors.cardNumber }"
          placeholder="0000 0000 0000 0000"
          inputmode="numeric"
          autocomplete="cc-number"
        />
        <span v-if="errors.cardNumber" class="form-error-message">{{ errors.cardNumber }}</span>
      </div>

      <div class="payment-debit__field">
        <label class="payment-debit__label" for="debit-card-name">Nome impresso no cartão</label>
        <input
          id="debit-card-name"
          v-model="cardName"
          v-bind="cardNameAttrs"
          type="text"
          class="payment-debit__input"
          :class="{ 'payment-debit__input--error': errors.cardName }"
          placeholder="Nome completo"
          autocomplete="cc-name"
        />
        <span v-if="errors.cardName" class="form-error-message">{{ errors.cardName }}</span>
      </div>

      <div class="payment-debit__row">
        <div class="payment-debit__field payment-debit__field--half">
          <label class="payment-debit__label" for="debit-expiry">Vencimento</label>
          <input
            id="debit-expiry"
            v-model="expiry"
            v-bind="expiryAttrs"
            v-maska="MASKS.cardExpiry"
            type="text"
            class="payment-debit__input"
            :class="{ 'payment-debit__input--error': errors.expiry }"
            placeholder="MM / AA"
            inputmode="numeric"
            autocomplete="cc-exp"
          />
          <span v-if="errors.expiry" class="form-error-message">{{ errors.expiry }}</span>
        </div>
        <div class="payment-debit__field payment-debit__field--half">
          <label class="payment-debit__label" for="debit-cvv">Código de segurança</label>
          <input
            id="debit-cvv"
            v-model="securityCode"
            v-bind="securityCodeAttrs"
            v-maska="MASKS.securityCode"
            type="text"
            class="payment-debit__input"
            :class="{ 'payment-debit__input--error': errors.securityCode }"
            placeholder="___"
            inputmode="numeric"
            autocomplete="cc-csc"
          />
          <span v-if="errors.securityCode" class="form-error-message">{{ errors.securityCode }}</span>
        </div>
      </div>

      <label class="payment-debit__checkbox">
        <input
          v-model="rememberCard"
          v-bind="rememberCardAttrs"
          type="checkbox"
          class="payment-debit__checkbox-input sr-only"
        />
        <span class="payment-debit__checkbox-custom" />
        <span class="payment-debit__checkbox-label">Lembrar deste cartão posteriormente</span>
      </label>

      <div class="payment-debit__actions">
        <button type="button" class="payment-debit__btn payment-debit__btn--outline" @click="emit('back')">
          Anterior
        </button>
        <button type="submit" class="payment-debit__btn payment-debit__btn--primary" :disabled="!meta.valid">
          Finalizar compra
        </button>
      </div>
    </form>
  </div>
</template>

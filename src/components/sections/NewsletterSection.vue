<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { newsletterSchema } from '@/schemas'
import newsletterBtn from '@/assets/images/newsletter-btn.svg'

const { handleSubmit, errors, defineField, resetForm, meta } = useForm({
  validationSchema: toTypedSchema(newsletterSchema),
  initialValues: {
    email: '',
  },
})

const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit((values) => {
  console.log('Newsletter signup:', values.email)
  resetForm()
})
</script>

<template>
  <section class="newsletter">
    <div class="newsletter__container">
      <h2 class="newsletter__title">Cadastre-se em nossa newsletter</h2>

      <form class="newsletter__form" @submit.prevent="onSubmit">
        <div class="newsletter__input-wrapper">
          <input
            v-model="email"
            v-bind="emailAttrs"
            type="email"
            placeholder="E-mail"
            class="newsletter__input"
            :class="{ 'newsletter__input--error': errors.email }"
          />
          <button type="submit" class="newsletter__btn" aria-label="Enviar" :disabled="!meta.valid">
            <img :src="newsletterBtn" alt="" />
          </button>
        </div>
        <span v-if="errors.email" class="form-error-message">{{ errors.email }}</span>
      </form>

      <p class="newsletter__description">
        Receba conteúdos exclusivos e novidades sobre a Morada dos Pets em primeira mão
      </p>
    </div>
  </section>
</template>

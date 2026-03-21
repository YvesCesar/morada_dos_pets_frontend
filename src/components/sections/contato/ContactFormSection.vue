<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { vMaska } from 'maska/vue'
import { MASKS } from '@/config/masks'
import { contactSchema } from '@/schemas'
import ilustracaoContato from '@/assets/images/ilustracao-contato.png'

const { handleSubmit, errors, defineField, resetForm, meta } = useForm({
  validationSchema: toTypedSchema(contactSchema),
  initialValues: {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  },
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [subject, subjectAttrs] = defineField('subject')
const [message, messageAttrs] = defineField('message')

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
  resetForm()
  alert('Mensagem enviada com sucesso!')
})
</script>

<template>
  <section class="contact-form">
    <div class="contact-form__container">
      <div class="contact-form__content">
        <!-- Illustration -->
        <div class="contact-form__image-wrapper">
          <img :src="ilustracaoContato" alt="Ilustração Contato" class="contact-form__image" />
        </div>

        <!-- Form -->
        <div class="contact-form__form-wrapper">
          <h2 class="contact-form__title">Fale conosco</h2>
          <form @submit.prevent="onSubmit" class="contact-form__form">
            <div class="contact-form__field">
              <label for="name" class="contact-form__label">Nome</label>
              <input
                v-model="name"
                v-bind="nameAttrs"
                type="text"
                id="name"
                placeholder="Insira seu nome"
                class="contact-form__input"
                :class="{ 'contact-form__input--error': errors.name }"
              />
              <span v-if="errors.name" class="form-error-message">{{ errors.name }}</span>
            </div>

            <div class="contact-form__row">
              <div class="contact-form__field">
                <label for="email" class="contact-form__label">E-mail</label>
                <input
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  id="email"
                  placeholder="Insira seu e-mail"
                  class="contact-form__input"
                  :class="{ 'contact-form__input--error': errors.email }"
                />
                <span v-if="errors.email" class="form-error-message">{{ errors.email }}</span>
              </div>

              <div class="contact-form__field">
                <label for="phone" class="contact-form__label">Celular</label>
                <input
                  v-model="phone"
                  v-bind="phoneAttrs"
                  v-maska="MASKS.phone"
                  type="tel"
                  id="phone"
                  placeholder="(__) _____-____"
                  class="contact-form__input"
                  :class="{ 'contact-form__input--error': errors.phone }"
                />
                <span v-if="errors.phone" class="form-error-message">{{ errors.phone }}</span>
              </div>
            </div>

            <div class="contact-form__field">
              <label for="subject" class="contact-form__label">Assunto</label>
              <input
                v-model="subject"
                v-bind="subjectAttrs"
                type="text"
                id="subject"
                placeholder="Insira o assunto"
                class="contact-form__input"
                :class="{ 'contact-form__input--error': errors.subject }"
              />
              <span v-if="errors.subject" class="form-error-message">{{ errors.subject }}</span>
            </div>

            <div class="contact-form__field">
              <label for="message" class="contact-form__label">Mensagem</label>
              <textarea
                v-model="message"
                v-bind="messageAttrs"
                id="message"
                placeholder="Insira sua mensagem"
                class="contact-form__textarea"
                :class="{ 'contact-form__textarea--error': errors.message }"
                rows="4"
              ></textarea>
              <span v-if="errors.message" class="form-error-message">{{ errors.message }}</span>
            </div>

            <button type="submit" class="contact-form__button" :disabled="!meta.valid">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

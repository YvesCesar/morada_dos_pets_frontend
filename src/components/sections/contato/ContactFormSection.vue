<script setup lang="ts">
import { ref } from 'vue'
import ilustracaoContato from '@/assets/images/ilustracao-contato.png'

const name = ref('')
const email = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')

const handleSubmit = () => {
  console.log('Form submitted:', {
    name: name.value,
    email: email.value,
    phone: phone.value,
    subject: subject.value,
    message: message.value,
  })
  // Reset form
  name.value = ''
  email.value = ''
  phone.value = ''
  subject.value = ''
  message.value = ''
  alert('Mensagem enviada com sucesso!')
}
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
          <form @submit.prevent="handleSubmit" class="contact-form__form">
            <div class="contact-form__field">
              <label for="name" class="contact-form__label">Nome</label>
              <input
                v-model="name"
                type="text"
                id="name"
                placeholder="Insira seu nome"
                class="contact-form__input"
                required
              />
            </div>

            <div class="contact-form__row">
              <div class="contact-form__field">
                <label for="email" class="contact-form__label">E-mail</label>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  placeholder="Insira seu e-mail"
                  class="contact-form__input"
                  required
                />
              </div>

              <div class="contact-form__field">
                <label for="phone" class="contact-form__label">Celular</label>
                <input
                  v-model="phone"
                  type="tel"
                  id="phone"
                  placeholder="(__) _____-____"
                  class="contact-form__input"
                  required
                />
              </div>
            </div>

            <div class="contact-form__field">
              <label for="subject" class="contact-form__label">Assunto</label>
              <input
                v-model="subject"
                type="text"
                id="subject"
                placeholder="Insira o assunto"
                class="contact-form__input"
                required
              />
            </div>

            <div class="contact-form__field">
              <label for="message" class="contact-form__label">Mensagem</label>
              <textarea
                v-model="message"
                id="message"
                placeholder="Insira sua mensagem"
                class="contact-form__textarea"
                rows="4"
                required
              ></textarea>
            </div>

            <button type="submit" class="contact-form__button">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

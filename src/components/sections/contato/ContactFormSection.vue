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

<style scoped>
.contact-form {
  padding: 8rem 0;
  background-color: var(--color-white);
}

.contact-form__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.contact-form__content {
  display: flex;
  align-items: center;
  gap: 8rem;
}

.contact-form__image-wrapper {
  flex: 1;
  max-width: 476px;
}

.contact-form__image {
  width: 100%;
  height: auto;
}

.contact-form__form-wrapper {
  flex: 1;
  max-width: 536px;
}

.contact-form__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  margin-bottom: 2.5rem;
}

.contact-form__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-form__label {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.contact-form__input,
.contact-form__select,
.contact-form__textarea {
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 1rem;
  color: var(--color-text);
  transition: border-color var(--transition-fast);
}

.contact-form__input::placeholder,
.contact-form__select::placeholder,
.contact-form__textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 0.6;
}

.contact-form__input:focus,
.contact-form__select:focus,
.contact-form__textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.contact-form__button {
  margin-top: 1rem;
  padding: 0.75rem 2.5rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  cursor: pointer;
  transition: all var(--transition-fast);
  width: fit-content;
  align-self: flex-end;
}

.contact-form__button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 1200px) {
  .contact-form__content {
    gap: 4rem;
  }
}

@media (max-width: 992px) {
  .contact-form {
    padding: 4rem 0;
  }

  .contact-form__content {
    flex-direction: column;
    gap: 4rem;
    text-align: center;
  }

  .contact-form__image-wrapper {
    order: 2;
  }

  .contact-form__form {
    text-align: left;
  }

  .contact-form__button {
    margin: 1rem auto 0;
    align-self: center;
  }
}

@media (max-width: 768px) {
  .contact-form__row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .contact-form__button {
    width: 100%;
  }
}
</style>

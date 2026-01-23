<script setup lang="ts">
import { ref } from 'vue'
import newsletterBtn from '@/assets/images/newsletter-btn.svg'

const email = ref('')

const handleSubmit = () => {
  if (email.value) {
    console.log('Newsletter signup:', email.value)
    email.value = ''
  }
}
</script>

<template>
  <section class="newsletter">
    <div class="newsletter__container">
      <h2 class="newsletter__title">Cadastre-se em nossa newsletter</h2>

      <form class="newsletter__form" @submit.prevent="handleSubmit">
        <div class="newsletter__input-wrapper">
          <input
            v-model="email"
            type="email"
            placeholder="E-mail"
            class="newsletter__input"
            required
          />
          <button type="submit" class="newsletter__btn" aria-label="Enviar">
            <img :src="newsletterBtn" alt="" />
          </button>
        </div>
      </form>

      <p class="newsletter__description">
        Receba conteúdos exclusivos e novidades sobre a Morada dos Pets em primeira mão
      </p>
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  background: var(--color-primary);
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter__container {
  text-align: center;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.newsletter__title {
  font-family: 'Quicksand', sans-serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 1.25em;
  color: var(--color-white);
  margin-bottom: 32px;
}

.newsletter__form {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.newsletter__input-wrapper {
  display: flex;
  align-items: stretch;
  gap: 10px;
  width: 501px;
}

.newsletter__input {
  width: 425px;
  height: 44px;
  padding: 0 25px;
  font-family: 'Quicksand', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.25em;
  color: #5F5D5D;
  background: var(--color-white);
  border: 1px solid transparent;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
}

.newsletter__input::placeholder {
  color: #5F5D5D;
}

.newsletter__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity var(--transition-fast);
  flex-shrink: 0;
}

.newsletter__btn:hover {
  opacity: 0.9;
}

.newsletter__btn img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.newsletter__description {
  font-family: 'Quicksand', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.25em;
  color: var(--color-white);
}

/* Responsive - Tablets */
@media (max-width: 768px) {
  .newsletter {
    height: auto;
    padding: 2.5rem 1rem 3rem;
  }

  .newsletter__title {
    font-size: 24px;
    padding: 0 1rem;
  }

  .newsletter__input-wrapper {
    width: 100%;
    max-width: 400px;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .newsletter__input {
    width: 100%;
    flex: 1;
    min-width: 0;
  }

  .newsletter__description {
    font-size: 18px;
    padding: 0 1rem;
  }
}

/* Responsive - Smartphones */
@media (max-width: 480px) {
  .newsletter {
    padding: 2rem 1rem;
  }

  .newsletter__container {
    padding: 0;
  }

  .newsletter__title {
    font-size: 18px;
    margin-bottom: 20px;
    padding: 0;
  }

  .newsletter__form {
    margin-bottom: 20px;
  }

  .newsletter__input-wrapper {
    width: 100%;
    max-width: 320px;
    padding: 0;
    gap: 8px;
  }

  .newsletter__input {
    flex: 1;
    min-width: 0;
    height: 40px;
    font-size: 14px;
    padding: 0 12px;
  }

  .newsletter__btn {
    width: 52px;
  }

  .newsletter__btn img {
    width: 100%;
    height: 100%;
  }

  .newsletter__description {
    font-size: 14px;
    line-height: 1.4em;
    padding: 0;
  }
}

/* Responsive - Extra small devices */
@media (max-width: 360px) {
  .newsletter__title {
    font-size: 16px;
  }

  .newsletter__input-wrapper {
    max-width: 280px;
  }

  .newsletter__input {
    height: 36px;
    font-size: 13px;
    padding: 0 10px;
  }

  .newsletter__btn {
    width: 48px;
  }

  .newsletter__btn img {
    width: 100%;
    height: 100%;
  }

  .newsletter__description {
    font-size: 12px;
  }
}
</style>

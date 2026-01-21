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
  padding: 3rem 0 4rem;
}

.newsletter__container {
  text-align: center;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.newsletter__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-white);
  margin-bottom: 1.5rem;
}

.newsletter__form {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.newsletter__input-wrapper {
  display: flex;
  align-items: stretch;
  width: 100%;
  max-width: 501px;
}

.newsletter__input {
  flex: 1;
  padding: 0.75rem 1.5rem;
  font-size: var(--text-lg);
  color: var(--color-text-muted);
  border: none;
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
  outline: none;
}

.newsletter__input::placeholder {
  color: var(--color-text-muted);
}

.newsletter__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.newsletter__btn:hover {
  opacity: 0.9;
}

.newsletter__btn img {
  height: 44px;
  width: auto;
}

.newsletter__description {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  color: var(--color-white);
}

/* Responsive */
@media (max-width: 768px) {
  .newsletter {
    padding: 2.5rem 0 3rem;
  }

  .newsletter__title {
    font-size: var(--text-xl);
  }

  .newsletter__description {
    font-size: var(--text-base);
  }

  .newsletter__input {
    font-size: var(--text-base);
  }
}

@media (max-width: 480px) {
  .newsletter__input-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .newsletter__input {
    border-radius: var(--radius-sm);
    text-align: center;
  }

  .newsletter__btn img {
    width: 100%;
    max-width: 200px;
  }
}
</style>

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

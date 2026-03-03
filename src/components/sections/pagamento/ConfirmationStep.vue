<script setup lang="ts">
import { useRouter } from 'vue-router'
import confirmacaoImg from '@/assets/images/pagamento/confirmacao-ilustracao.png'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="confirmation">
    <div class="confirmation__content">
      <div class="confirmation__illustration">
        <img
          :src="confirmacaoImg"
          alt="Cachorro feliz com OK!"
          class="confirmation__image"
        />
      </div>

      <div class="confirmation__info">
        <h2 class="confirmation__title">CONFIRMADO!</h2>
        <p class="confirmation__message">
          Sua transação foi finalizada com sucesso. E agora estamos trabalhando
          para atender às suas necessidades
        </p>
        <button class="confirmation__button" @click="goToHome">Início</button>
      </div>
    </div>
  </div>
</template>

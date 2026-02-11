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

<style scoped>
.confirmation__content {
  display: flex;
  align-items: center;
  gap: var(--spacing-xl);
}

.confirmation__illustration {
  flex-shrink: 0;
  max-width: 580px;
  width: 50%;
}

.confirmation__image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.confirmation__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}

.confirmation__title {
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-2xl);
  line-height: 1.25em;
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
}

.confirmation__message {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
  max-width: 598px;
  margin-bottom: var(--spacing-xl);
}

.confirmation__button {
  width: 140px;
  height: 41px;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  line-height: 1.25em;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.confirmation__button:hover {
  opacity: 0.9;
}

/* Tablet */
@media (max-width: 1200px) {
  .confirmation__content {
    flex-direction: column;
  }

  .confirmation__illustration {
    width: 100%;
    max-width: 500px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .confirmation__illustration {
    max-width: 100%;
  }

  .confirmation__title {
    font-size: var(--text-xl);
  }

  .confirmation__message {
    font-size: var(--text-sm);
  }
}
</style>

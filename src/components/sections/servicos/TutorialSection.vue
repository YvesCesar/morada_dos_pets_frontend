<script setup lang="ts">
import { useRouter } from 'vue-router'
import ilustracaoLaptop from '@/assets/images/ilustracao-laptop-pets.svg'
import { tutorialSteps } from '@/data/tutorialSteps'

const router = useRouter()

const handleSolicitar = () => {
  router.push({ name: 'pagamento', query: { tipo: 'geral' } })
}
</script>

<template>
  <section class="tutorial">
    <div class="tutorial__container">
      <div class="tutorial__content">
        <h2 class="tutorial__title">E como funciona para solicitar o serviço?</h2>

        <div class="tutorial__steps">
          <div
            v-for="(step, index) in tutorialSteps"
            :key="step.id"
            class="tutorial__step"
          >
            <div class="tutorial__step-number-wrapper">
              <div class="tutorial__step-number">{{ step.id }}</div>
              <div v-if="index < tutorialSteps.length - 1" class="tutorial__step-line"></div>
            </div>
            <div class="tutorial__step-content">
              <h3 class="tutorial__step-title">{{ step.title }}</h3>
              <p class="tutorial__step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tutorial__right">
        <div class="tutorial__illustration">
          <img
            :src="ilustracaoLaptop"
            alt="Ilustração de laptop com pets"
            class="tutorial__image"
          />
        </div>
        <button class="tutorial__btn" @click="handleSolicitar">Solicitar agora</button>
      </div>
    </div>
  </section>
</template>

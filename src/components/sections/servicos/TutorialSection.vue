<script setup lang="ts">
import ilustracaoLaptop from '@/assets/images/ilustracao-laptop-pets.svg'
import { tutorialSteps } from '@/data/tutorialSteps'

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
        <button class="tutorial__btn">Solicitar agora</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tutorial {
  background: var(--color-white);
  padding: 4rem 0;
}

.tutorial__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  gap: 3rem;
  position: relative;
}

.tutorial__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tutorial__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  line-height: 1.25;
  margin-bottom: 34px;
}

.tutorial__steps {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.tutorial__step {
  display: flex;
  gap: 26px;
}

.tutorial__step-number-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tutorial__step-number {
  width: 67px;
  height: 54px;
  border: 2px solid var(--color-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: var(--font-semibold);
  color: var(--color-text);
  flex-shrink: 0;
  background: var(--color-white);
}

.tutorial__step-line {
  width: 3px;
  height: 81px;
  background-image: repeating-linear-gradient(
    to bottom,
    var(--color-primary) 0,
    var(--color-primary) 4px,
    transparent 4px,
    transparent 8px
  );
}

.tutorial__step-content {
  padding-top: 4px;
  min-height: 135px;
}

.tutorial__step:last-child .tutorial__step-content {
  min-height: auto;
}

.tutorial__step-title {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25;
}

.tutorial__step-description {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25;
}

.tutorial__right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 29px;
}

.tutorial__illustration {
  width: 430px;
  height: 279px;
  background: var(--color-white);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.tutorial__image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.tutorial__btn {
  padding: 8px 24px;
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  font-family: 'Quicksand', sans-serif;
  color: var(--color-white);
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.tutorial__btn:hover {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1200px) {
  .tutorial__right {
    padding-top: 20px;
  }

  .tutorial__illustration {
    width: 350px;
    height: 230px;
  }
}

@media (max-width: 992px) {
  .tutorial__container {
    flex-direction: column;
  }

  .tutorial__right {
    align-items: center;
    padding-top: 2rem;
  }

  .tutorial__illustration {
    width: 100%;
    max-width: 430px;
    height: auto;
    aspect-ratio: 430 / 279;
  }
}

@media (max-width: 768px) {
  .tutorial {
    padding: 3rem 0;
  }

  .tutorial__title {
    font-size: var(--text-xl);
    margin-bottom: 24px;
  }

  .tutorial__step {
    gap: 16px;
  }

  .tutorial__step-number {
    width: 50px;
    height: 44px;
    font-size: var(--text-base);
  }

  .tutorial__step-line {
    height: 60px;
  }

  .tutorial__step-content {
    min-height: 104px;
  }

  .tutorial__step-title,
  .tutorial__step-description {
    font-size: 1rem;
  }

  .tutorial__btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .tutorial {
    padding: 2rem 0;
  }

  .tutorial__step {
    gap: 12px;
  }

  .tutorial__step-number {
    width: 44px;
    height: 40px;
    font-size: var(--text-sm);
  }

  .tutorial__step-line {
    height: 50px;
  }

  .tutorial__step-content {
    min-height: 90px;
  }
}
</style>

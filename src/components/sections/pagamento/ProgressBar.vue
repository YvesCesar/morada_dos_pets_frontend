<script setup lang="ts">
import type { PaymentStep } from '@/types'

interface Props {
  currentStep: PaymentStep
}

const props = defineProps<Props>()

const steps = [
  { id: 'solicitacao' as PaymentStep, label: 'Solicitação de serviço' },
  { id: 'pagamento' as PaymentStep, label: 'Pagamento' },
  { id: 'confirmacao' as PaymentStep, label: 'Confirmação' },
]

const stepOrder: PaymentStep[] = ['solicitacao', 'pagamento', 'confirmacao']

const isActive = (stepId: PaymentStep) => {
  return stepOrder.indexOf(stepId) <= stepOrder.indexOf(props.currentStep)
}

const isLineActive = (index: number) => {
  const nextStep = steps[index + 1]
  if (!nextStep) return false
  return stepOrder.indexOf(nextStep.id) <= stepOrder.indexOf(props.currentStep)
}
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__steps">
      <div v-for="(step, index) in steps" :key="step.id" class="progress-bar__step-col">
        <div class="progress-bar__icon" :class="{ 'progress-bar__icon--active': isActive(step.id) }">
          <!-- Solicitação de serviço -->
          <svg v-if="step.id === 'solicitacao'" class="progress-bar__icon-img" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.25 29.5C23.1201 29.5 29.5 23.1201 29.5 15.25C29.5 7.37994 23.1201 1 15.25 1C7.37994 1 1 7.37994 1 15.25C1 23.1201 7.37994 29.5 15.25 29.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.25 8.91663H15.265V8.93163H15.25V8.91663Z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>
            <path d="M15.25 15.25V21.5833" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <!-- Pagamento -->
          <svg v-else-if="step.id === 'pagamento'" class="progress-bar__icon-img" width="35" height="27" viewBox="0 0 35 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5.56054C0 4.08579 0.57617 2.67145 1.60176 1.62865C2.62735 0.585841 4.01835 0 5.46875 0H29.5312C30.9817 0 32.3727 0.585841 33.3982 1.62865C34.4238 2.67145 35 4.08579 35 5.56054V21.1301C35 22.6048 34.4238 24.0192 33.3982 25.062C32.3727 26.1048 30.9817 26.6906 29.5312 26.6906H5.46875C4.01835 26.6906 2.62735 26.1048 1.60176 25.062C0.57617 24.0192 0 22.6048 0 21.1301V5.56054ZM5.46875 2.22422C4.59851 2.22422 3.76391 2.57572 3.14856 3.2014C2.5332 3.82709 2.1875 4.67569 2.1875 5.56054V8.45202H32.8125V5.56054C32.8125 4.67569 32.4668 3.82709 31.8514 3.2014C31.2361 2.57572 30.4015 2.22422 29.5312 2.22422H5.46875ZM2.1875 21.1301C2.1875 22.0149 2.5332 22.8635 3.14856 23.4892C3.76391 24.1149 4.59851 24.4664 5.46875 24.4664H29.5312C30.4015 24.4664 31.2361 24.1149 31.8514 23.4892C32.4668 22.8635 32.8125 22.0149 32.8125 21.1301V10.6762H2.1875V21.1301ZM23.8438 18.2386C23.5537 18.2386 23.2755 18.3557 23.0704 18.5643C22.8652 18.7729 22.75 19.0557 22.75 19.3507C22.75 19.6456 22.8652 19.9285 23.0704 20.1371C23.2755 20.3456 23.5537 20.4628 23.8438 20.4628H28.6562C28.9463 20.4628 29.2245 20.3456 29.4296 20.1371C29.6348 19.9285 29.75 19.6456 29.75 19.3507C29.75 19.0557 29.6348 18.7729 29.4296 18.5643C29.2245 18.3557 28.9463 18.2386 28.6562 18.2386H23.8438Z" fill="currentColor"/>
          </svg>
          <!-- Confirmação -->
          <svg v-else class="progress-bar__icon-img" width="36" height="31" viewBox="0 0 36 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.6121 0.607085C30.8265 -0.202374 29.5273 -0.202376 28.7417 0.607081L12.7593 17.0747C11.9737 17.8842 10.6745 17.8842 9.88893 17.0747L6.64493 13.7322C5.85933 12.9228 4.56013 12.9228 3.77453 13.7322L0.564756 17.0394C-0.18831 17.8153 -0.188313 19.0493 0.564749 19.8252L5.32729 24.7324L9.92809 29.4729C10.7137 30.2824 12.0129 30.2824 12.7985 29.4729L17.3602 24.7728L34.861 6.74053C35.6141 5.9646 35.6141 4.73065 34.861 3.95472L31.6121 0.607085Z" :fill="isActive(step.id) ? 'currentColor' : 'white'"/>
            <path d="M29.1006 0.955444C29.6898 0.348385 30.6637 0.34845 31.2529 0.955444L34.502 4.3031C35.0667 4.88504 35.0667 5.81002 34.502 6.39197L17.001 24.4242L12.4395 29.1244C11.8503 29.7315 10.8763 29.7315 10.2871 29.1244L5.68652 24.3842L0.923828 19.4769C0.359056 18.895 0.359105 17.97 0.923828 17.3881L4.13379 14.0804C4.72301 13.4736 5.69701 13.4734 6.28613 14.0804L9.53027 17.4232C10.5123 18.4348 12.1362 18.4348 13.1182 17.4232L29.1006 0.955444Z" stroke="currentColor"/>
          </svg>
        </div>

        <!-- Linha tracejada entre etapas -->
        <div
          v-if="index < steps.length - 1"
          class="progress-bar__line"
          :class="{ 'progress-bar__line--active': isLineActive(index) }"
        />

        <span
          class="progress-bar__label"
          :class="{ 'progress-bar__label--active': isActive(step.id) }"
        >
          {{ step.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 609px;
  margin: 0 auto;
}

.progress-bar__steps {
  display: flex;
  align-items: flex-start;
  width: 100%;
  position: relative;
}

.progress-bar__step-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.progress-bar__icon {
  width: 55.5px;
  height: 54px;
  border-radius: 10px;
  border: 2px solid rgba(41, 16, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(41, 16, 0, 0.55);
  transition: border-color var(--transition-base), color var(--transition-base);
  background-color: var(--color-white);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
  transform: rotate(-90deg);
}

.progress-bar__icon-img {
  transform: rotate(90deg);
}

.progress-bar__icon--active {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.progress-bar__line {
  position: absolute;
  top: 27px;
  left: calc(50% + 28px);
  width: calc(100% - 56px);
  height: 0;
  border-top: 3px dashed #B2ABAB;
  z-index: 1;
  transition: border-color var(--transition-base);
}

.progress-bar__line--active {
  border-top-color: var(--color-primary);
}

.progress-bar__label {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-base);
  line-height: 1.25em;
  text-align: center;
  color: var(--color-black);
  margin-top: 12px;
  white-space: nowrap;
}

.progress-bar__label--active {
  font-weight: var(--font-semibold);
}

/* Responsividade */
@media (max-width: 768px) {
  .progress-bar {
    max-width: 100%;
  }

  .progress-bar__icon {
    width: 44px;
    height: 42px;
  }

  .progress-bar__icon-img {
    width: 24px;
    height: 24px;
  }

  .progress-bar__line {
    top: 21px;
    left: calc(50% + 22px);
    width: calc(100% - 44px);
  }

  .progress-bar__label {
    font-size: var(--text-xs);
    white-space: normal;
  }
}
</style>

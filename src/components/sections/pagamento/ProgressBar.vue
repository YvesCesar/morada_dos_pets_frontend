<script setup lang="ts">
import type { PaymentStep } from '@/types'
import requestServiceIcon from '@/assets/images/pagamento/request-service-icon.svg'
import paymentProgressIcon from '@/assets/images/pagamento/payment-progress-icon.svg'
import confirmationProgressIcon from '@/assets/images/pagamento/confirmation-progress-icon.svg'

interface Props {
  currentStep: PaymentStep
}

const props = defineProps<Props>()

const steps = [
  { id: 'solicitacao' as PaymentStep, label: 'Solicitação de serviço', icon: requestServiceIcon },
  { id: 'pagamento' as PaymentStep, label: 'Pagamento', icon: paymentProgressIcon },
  { id: 'confirmacao' as PaymentStep, label: 'Confirmação', icon: confirmationProgressIcon },
]

const stepOrder: PaymentStep[] = ['solicitacao', 'pagamento', 'confirmacao']

const isActive = (stepId: PaymentStep) => {
  return stepOrder.indexOf(stepId) <= stepOrder.indexOf(props.currentStep)
}
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__steps">
      <div v-for="(step, index) in steps" :key="step.id" class="progress-bar__step-col">
        <div class="progress-bar__icon" :class="{ 'progress-bar__icon--active': isActive(step.id) }">
          <img :src="step.icon" :alt="step.label" class="progress-bar__icon-img" />
        </div>

        <!-- Linha tracejada entre etapas -->
        <div
          v-if="index < steps.length - 1"
          class="progress-bar__line"
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

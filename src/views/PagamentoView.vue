<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { PaymentStep, ServiceRequest } from '@/types'
import ProgressBar from '@/components/sections/pagamento/ProgressBar.vue'
import ServiceRequestStep from '@/components/sections/pagamento/ServiceRequestStep.vue'
import PaymentStepComponent from '@/components/sections/pagamento/PaymentStep.vue'
import ConfirmationStep from '@/components/sections/pagamento/ConfirmationStep.vue'

const route = useRoute()

// Estado principal
const currentStep = ref<PaymentStep>('solicitacao')
const serviceRequests = ref<ServiceRequest[]>([])

// Query params para pré-seleção
const initialServiceType = computed(() => (route.query.tipo as string) || '')
const initialService = computed(() => (route.query.servico as string) || (route.query.plano as string) || '')

// Handlers de navegação entre etapas
const handleServiceConfirm = (requests: ServiceRequest[]) => {
  serviceRequests.value = requests
  currentStep.value = 'pagamento'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handlePaymentBack = () => {
  currentStep.value = 'solicitacao'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handlePaymentConfirm = () => {
  currentStep.value = 'confirmacao'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main class="pagamento">
    <div class="pagamento__container">
      <!-- Título -->
      <div class="pagamento__header">
        <h1 class="pagamento__title">Reserve nossos serviços</h1>
        <p class="pagamento__subtitle">Responda o formulário para continuar sua solicitação</p>
      </div>

      <!-- Barra de progresso -->
      <ProgressBar :current-step="currentStep" />

      <!-- Etapas -->
      <div class="pagamento__step-content">
        <ServiceRequestStep
          v-if="currentStep === 'solicitacao'"
          :initial-service-type="initialServiceType"
          :initial-service="initialService"
          @confirm="handleServiceConfirm"
        />

        <PaymentStepComponent
          v-else-if="currentStep === 'pagamento'"
          :service-requests="serviceRequests"
          @back="handlePaymentBack"
          @confirm="handlePaymentConfirm"
        />

        <ConfirmationStep v-else-if="currentStep === 'confirmacao'" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.pagamento {
  min-height: 100vh;
  background-color: var(--color-white);
}

.pagamento__container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: calc(90px + var(--spacing-xl)) var(--container-padding) var(--spacing-3xl);
}

.pagamento__header {
  margin-bottom: var(--spacing-lg);
}

.pagamento__title {
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-2xl);
  line-height: 1.25em;
  color: var(--color-black);
  margin-bottom: var(--spacing-xs);
}

.pagamento__subtitle {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
}

.pagamento__step-content {
  margin-top: var(--spacing-xl);
}

/* Responsividade */
@media (max-width: 768px) {
  .pagamento__container {
    padding: calc(90px + var(--spacing-lg)) var(--container-padding) var(--spacing-2xl);
  }

  .pagamento__title {
    font-size: var(--text-xl);
  }

  .pagamento__subtitle {
    font-size: var(--text-sm);
  }
}
</style>

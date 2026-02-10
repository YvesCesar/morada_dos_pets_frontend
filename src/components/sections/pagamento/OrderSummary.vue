<script setup lang="ts">
import { computed } from 'vue'
import type { ServiceRequest } from '@/types'

interface Props {
  subtotal: number
  discount?: number
  showTotal?: boolean
  showCouponHint?: boolean
  serviceRequests?: ServiceRequest[]
}

const props = withDefaults(defineProps<Props>(), {
  discount: 0,
  showTotal: false,
  showCouponHint: true,
  serviceRequests: () => [],
})

const emit = defineEmits<{
  editRequest: [id: string]
  removeRequest: [id: string]
}>()

const total = computed(() => props.subtotal - props.discount)

const formatPrice = (value: number) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
</script>

<template>
  <div class="order-summary">
    <h3 class="order-summary__title">Resumo da solicitação</h3>

    <!-- Service requests adicionados -->
    <div v-if="serviceRequests.length > 0" class="order-summary__items">
      <div
        v-for="request in serviceRequests"
        :key="request.id"
        class="order-summary__item"
      >
        <div class="order-summary__item-info">
          <span class="order-summary__item-name">{{ request.serviceName }}</span>
          <span class="order-summary__item-pet">{{ request.pet.name }} — {{ request.pet.breed }}</span>
        </div>
        <div class="order-summary__item-right">
          <span class="order-summary__item-price">{{ formatPrice(request.price) }}</span>
          <div class="order-summary__item-actions">
            <button
              class="order-summary__item-btn"
              title="Editar"
              aria-label="Editar serviço"
              @click="emit('editRequest', request.id)"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4491 3.87488C13.8016 3.5225 13.9997 3.04452 13.9997 2.54612C13.9998 2.04771 13.8018 1.56969 13.4495 1.21721C13.0971 0.864741 12.6191 0.666689 12.1207 0.666626C11.6223 0.666563 11.1443 0.864496 10.7918 1.21688L1.89446 10.1162C1.73967 10.2705 1.6252 10.4606 1.56113 10.6695L0.68046 13.5709C0.66323 13.6285 0.661929 13.6898 0.676694 13.7481C0.691459 13.8064 0.72174 13.8597 0.764324 13.9022C0.806908 13.9447 0.860207 13.9749 0.918566 13.9896C0.976924 14.0043 1.03817 14.0029 1.09579 13.9855L3.99779 13.1055C4.20657 13.042 4.39658 12.9283 4.55113 12.7742L13.4491 3.87488Z" stroke="#544033" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button
              class="order-summary__item-btn order-summary__item-btn--remove"
              title="Remover"
              aria-label="Remover serviço"
              @click="emit('removeRequest', request.id)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.6665 7.33337V11.3334" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.3335 7.33337V11.3334" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.6668 4V13.3333C12.6668 13.687 12.5264 14.0261 12.2763 14.2761C12.0263 14.5262 11.6871 14.6667 11.3335 14.6667H4.66683C4.31321 14.6667 3.97407 14.5262 3.72402 14.2761C3.47397 14.0261 3.3335 13.687 3.3335 13.3333V4" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 4H14" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.3335 4.00004V2.66671C5.3335 2.31309 5.47397 1.97395 5.72402 1.7239C5.97407 1.47385 6.31321 1.33337 6.66683 1.33337H9.3335C9.68712 1.33337 10.0263 1.47385 10.2763 1.7239C10.5264 1.97395 10.6668 2.31309 10.6668 2.66671V4.00004" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="order-summary__box">
      <div class="order-summary__row">
        <span class="order-summary__label">Subtotal</span>
        <span class="order-summary__value">{{ formatPrice(subtotal) }}</span>
      </div>
    </div>

    <div v-if="showTotal" class="order-summary__total-box">
      <div class="order-summary__row">
        <span class="order-summary__total-label">TOTAL</span>
        <span class="order-summary__total-value">{{ formatPrice(total) }}</span>
      </div>
    </div>

    <p v-if="showCouponHint" class="order-summary__coupon-hint">
      Aplique um Código de cupom na próxima etapa
    </p>
  </div>
</template>

<style scoped>
.order-summary {
  width: 100%;
  max-width: 414px;
}

.order-summary__title {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  line-height: 1.25em;
  color: var(--color-black);
  margin-bottom: var(--spacing-md);
}

.order-summary__box {
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  min-height: 117px;
  display: flex;
  align-items: center;
}

.order-summary__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.order-summary__label {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
}

.order-summary__value {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  line-height: 1.25em;
  color: var(--color-black);
}

/* Service request items */
.order-summary__items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.order-summary__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px var(--spacing-sm);
  border: 1px solid rgba(41, 16, 0, 0.15);
  border-radius: var(--radius-sm);
  background-color: var(--color-secondary);
}

.order-summary__item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.order-summary__item-name {
  font-family: var(--font-primary);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  color: var(--color-black);
}

.order-summary__item-pet {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.order-summary__item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.order-summary__item-price {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  color: var(--color-black);
}

.order-summary__item-actions {
  display: flex;
  gap: 8px;
}

.order-summary__item-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid rgba(41, 16, 0, 0.2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 18px;
  color: var(--color-text-muted);
  width: 36px;
  height: 36px;
  padding: 0;
  line-height: 1;
  transition: color var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast);
}

.order-summary__item-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background-color: rgba(41, 16, 0, 0.04);
}

.order-summary__item-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.order-summary__item-btn--remove:hover {
  color: #c0392b;
  border-color: #c0392b;
  background-color: rgba(192, 57, 43, 0.04);
}

.order-summary__total-box {
  background-color: var(--color-primary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  margin-top: var(--spacing-sm);
}

.order-summary__total-label {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-white);
}

.order-summary__total-value {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  line-height: 1.25em;
  color: var(--color-white);
}

.order-summary__coupon-hint {
  font-family: var(--font-primary);
  font-weight: 300;
  font-size: var(--text-sm);
  line-height: 1.25em;
  color: var(--color-black);
  text-align: center;
  margin-top: var(--spacing-sm);
}

/* Responsividade */
@media (max-width: 1200px) {
  .order-summary {
    max-width: 100%;
  }
}
</style>

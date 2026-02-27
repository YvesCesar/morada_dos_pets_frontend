<script setup lang="ts">
defineProps<{
  title?: string
  width?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="base-modal__overlay" @click="handleOverlayClick">
      <div class="base-modal" :style="width ? { width } : {}">
        <button class="base-modal__close" @click="emit('close')" aria-label="Fechar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <h2 v-if="title" class="base-modal__title">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.base-modal__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  padding: var(--spacing-sm);
}

.base-modal {
  position: relative;
  background: var(--color-white);
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.base-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text-muted);
  border-radius: var(--radius-full);
  transition: background var(--transition-fast);
}

.base-modal__close:hover {
  background: rgba(0, 0, 0, 0.05);
}

.base-modal__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
  padding-right: 32px;
}

@media (max-width: 480px) {
  .base-modal {
    padding: 24px 16px;
    max-width: 100%;
  }
}
</style>

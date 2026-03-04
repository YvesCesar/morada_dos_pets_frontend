<script setup lang="ts">
import BaseModal from './BaseModal.vue'

withDefaults(defineProps<{
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
}>(), {
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>

<template>
  <BaseModal width="452px" @close="emit('close')">
    <div class="confirm-modal">
      <div class="confirm-modal__icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h3 class="confirm-modal__title">{{ title }}</h3>
      <p class="confirm-modal__text" v-html="message" />
      <div class="confirm-modal__actions">
        <button class="confirm-modal__btn confirm-modal__btn--cancel" @click="emit('close')">{{ cancelLabel }}</button>
        <button class="confirm-modal__btn confirm-modal__btn--confirm" @click="emit('confirm')">{{ confirmLabel }}</button>
      </div>
    </div>
  </BaseModal>
</template>

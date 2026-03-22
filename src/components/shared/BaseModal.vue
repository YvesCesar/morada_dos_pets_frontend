<script setup lang="ts">
import { ref, useId } from 'vue'
import { useEscapeKey, useFocusTrap } from '@/composables'

defineProps<{
  title?: string
  width?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLElement | null>(null)
const titleId = useId()

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) emit('close')
}

useEscapeKey(() => emit('close'))
useFocusTrap(modalRef)
</script>

<template>
  <Teleport to="body">
    <div class="base-modal__overlay" @click="handleOverlayClick">
      <div
        ref="modalRef"
        class="base-modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? titleId : undefined"
        :style="width ? { width } : {}"
      >
        <button class="base-modal__close" @click="emit('close')" aria-label="Fechar">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <h2 v-if="title" :id="titleId" class="base-modal__title">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

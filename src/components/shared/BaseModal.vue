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

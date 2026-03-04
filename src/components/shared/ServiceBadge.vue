<script setup lang="ts">
import { computed } from 'vue'
import { SERVICE_COLORS } from '@/config/services'

const props = defineProps<{
  service: string
}>()

const colors = computed(() => SERVICE_COLORS[props.service] ?? { bg: '#888', text: '#fff' })
</script>

<template>
  <span
    class="badge"
    :style="{ backgroundColor: colors.bg, color: colors.text }"
  >
    {{ service }}
  </span>
</template>

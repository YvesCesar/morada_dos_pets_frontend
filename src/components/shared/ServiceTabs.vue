<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

interface Tab {
  label: string
  route?: string
  id?: string
  active?: boolean
}

interface Props {
  tabs: Tab[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'tab-click', id: string): void
}>()

const handleClick = (tab: Tab) => {
  if (tab.id) {
    emit('tab-click', tab.id)
  } else if (tab.route) {
    router.push(tab.route)
  }
}
</script>

<template>
  <nav class="service-tabs">
    <div class="service-tabs__container">
      <button
        v-for="tab in tabs"
        :key="tab.id || tab.route"
        class="service-tabs__tab"
        :class="{ 'service-tabs__tab--active': tab.active }"
        @click="handleClick(tab)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="service-tabs__line"></div>
  </nav>
</template>

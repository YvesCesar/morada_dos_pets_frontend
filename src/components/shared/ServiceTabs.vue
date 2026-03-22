<script setup lang="ts">
import { ref } from 'vue'
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

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'tab-click', id: string): void
}>()

const tabRefs = ref<HTMLButtonElement[]>([])

const handleClick = (tab: Tab) => {
  if (tab.id) {
    emit('tab-click', tab.id)
  } else if (tab.route) {
    router.push(tab.route)
  }
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
  let targetIndex = -1

  if (event.key === 'ArrowRight') {
    targetIndex = (index + 1) % props.tabs.length
  } else if (event.key === 'ArrowLeft') {
    targetIndex = (index - 1 + props.tabs.length) % props.tabs.length
  }

  if (targetIndex >= 0) {
    event.preventDefault()
    tabRefs.value[targetIndex]?.focus()
    handleClick(props.tabs[targetIndex]!)
  }
}
</script>

<template>
  <div class="service-tabs">
    <div class="service-tabs__container" role="tablist" aria-label="Serviços">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id || tab.route"
        ref="tabRefs"
        class="service-tabs__tab"
        :class="{ 'service-tabs__tab--active': tab.active }"
        role="tab"
        :aria-selected="tab.active ?? false"
        :tabindex="tab.active ? 0 : -1"
        @click="handleClick(tab)"
        @keydown="handleKeydown($event, index)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="service-tabs__line"></div>
  </div>
</template>

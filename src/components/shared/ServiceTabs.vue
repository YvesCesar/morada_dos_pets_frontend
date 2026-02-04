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

<style scoped>
.service-tabs {
  background-color: var(--color-white);
  position: relative;
}

.service-tabs__container {
  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 15px var(--container-padding);
}

.service-tabs__tab {
  font-family: 'Quicksand', sans-serif;
  font-size: 18px;
  font-weight: var(--font-regular);
  color: var(--color-text);
  line-height: 1.25em;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  transition: font-weight var(--transition-fast);
}

.service-tabs__tab--active {
  font-weight: var(--font-medium);
}

.service-tabs__tab--active::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--color-primary);
  z-index: 1;
}

.service-tabs__tab:hover:not(.service-tabs__tab--active) {
  opacity: 0.7;
}

.service-tabs__line {
  width: 100%;
  height: 1px;
  background-color: rgba(178, 171, 171, 0.85);
}

/* Responsive */
@media (max-width: 768px) {
  .service-tabs__container {
    gap: 40px;
  }

  .service-tabs__tab {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .service-tabs__container {
    gap: 24px;
  }

  .service-tabs__tab {
    font-size: 14px;
  }
}
</style>

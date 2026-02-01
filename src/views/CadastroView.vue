<script setup lang="ts">
import RegisterBanner from '@/components/sections/cadastro/RegisterBanner.vue'
import RegisterCard from '@/components/sections/cadastro/RegisterCard.vue'
</script>

<template>
  <div class="cadastro-view">
    <main class="cadastro-view__main">
      <RegisterBanner />
      <RegisterCard />
    </main>
  </div>
</template>

<style scoped>
.cadastro-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.cadastro-view__main {
  position: relative;
  flex-grow: 1;
  margin-top: 90px;
  min-height: calc(100vh - 90px);
  overflow-y: auto;
}

@media (max-width: 992px) {
  .cadastro-view__main {
    height: auto;
    min-height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    overflow: visible;
  }
}
</style>

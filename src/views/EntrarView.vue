<script setup lang="ts">
import LoginBanner from '@/components/sections/entrar/LoginBanner.vue'
import LoginCard from '@/components/sections/entrar/LoginCard.vue'
</script>

<template>
  <div class="entrar-view">
    <main class="entrar-view__main">
      <LoginBanner />
      <LoginCard />
    </main>
  </div>
</template>

<style scoped>
.entrar-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.entrar-view__main {
  position: relative;
  flex-grow: 1;
  margin-top: 90px;
  height: calc(100vh - 90px);
  overflow: hidden;
}

@media (max-width: 992px) {
  .entrar-view__main {
    height: auto;
    min-height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
  }
}
</style>

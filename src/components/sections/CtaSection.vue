<script setup lang="ts">
import ilustracaoPets from '@/assets/images/ilustracao-pets.svg'
</script>

<template>
  <section class="cta">
    <div class="cta__container">
      <h2 class="cta__title">Venha fazer parte da Morada dos Pets também!</h2>

      <div class="cta__illustration">
        <img :src="ilustracaoPets" alt="Ilustração de pets" />
      </div>
    </div>
  </section>
</template>

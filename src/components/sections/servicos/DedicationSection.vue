<script setup lang="ts">
import ilustracaoCachorro from '@/assets/images/ilustracao-cachorro-servicos.svg'
</script>

<template>
  <section class="dedication">
    <div class="dedication__container">
      <div class="dedication__content">
        <h2 class="dedication__title">Dedicação total ao seu melhor amigo!</h2>
      </div>
      <div class="dedication__illustration">
        <img
          :src="ilustracaoCachorro"
          alt="Ilustração de cachorro"
          class="dedication__image"
        />
      </div>
    </div>
  </section>
</template>

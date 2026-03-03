<script setup lang="ts">
import bannerCadastro from '@/assets/images/cadastro/cadastro-banner-6366af.png'
</script>

<template>
  <section class="register-banner">
    <div class="register-banner__background">
      <img :src="bannerCadastro" alt="Pets na Morada dos Pets" class="register-banner__image" />
      <div class="register-banner__overlay"></div>
    </div>

    <div class="register-banner__content">
      <h1 class="register-banner__title">Que bom ter você aqui!</h1>
    </div>
  </section>
</template>

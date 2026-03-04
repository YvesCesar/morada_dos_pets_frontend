<script setup lang="ts">
import bannerLogin from '@/assets/images/banner-login-6366af.png'
</script>

<template>
  <section class="login-banner">
    <div class="login-banner__background">
      <img :src="bannerLogin" alt="Pets na Morada dos Pets" class="login-banner__image" />
      <div class="login-banner__overlay"></div>
    </div>

    <div class="login-banner__content">
      <h1 class="login-banner__title">Que bom ter você de volta!</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import { missionVisionValues } from '@/data'
</script>

<template>
  <section class="mission">
    <div class="mission__container">
      <div v-for="item in missionVisionValues" :key="item.title" class="mission__card">
        <img :src="item.icon" :alt="item.title" class="mission__icon" />
        <h3 class="mission__title">{{ item.title }}</h3>
        <p class="mission__description">{{ item.description }}</p>
      </div>
    </div>
  </section>
</template>

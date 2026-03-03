<script setup lang="ts">
import { useRouter } from 'vue-router'
import { services } from '@/data'

const router = useRouter()

const handleLearnMore = (route?: string) => {
  if (route) {
    router.push(route)
  }
}
</script>

<template>
  <div class="services-cards">
    <article v-for="service in services" :key="service.title" class="services-cards__card">
      <img :src="service.image" :alt="service.alt" class="services-cards__image" />
      <div class="services-cards__overlay"></div>
      <h3 class="services-cards__card-title">{{ service.title }}</h3>
      
      <!-- Hover Content -->
      <div class="services-cards__hover-content">
        <h3 class="services-cards__hover-title">{{ service.title }}</h3>
        <p class="services-cards__hover-description">{{ service.description }}</p>
        <button
          class="services-cards__hover-btn"
          :disabled="!service.route"
          @click="handleLearnMore(service.route)"
        >
          Saiba mais
        </button>
      </div>
    </article>
  </div>
</template>

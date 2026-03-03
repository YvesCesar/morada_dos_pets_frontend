<script setup lang="ts">
import type { DogSpaBenefit } from '@/types'

interface Props {
  benefits: DogSpaBenefit[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Benefícios por escolher a Morada dos Pets',
})
</script>

<template>
  <section class="benefits">
    <div class="benefits__container">
      <h2 class="benefits__title">{{ title }}</h2>

      <div class="benefits__grid">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="benefits__card"
        >
          <img :src="benefit.icon" :alt="benefit.title" class="benefits__card-icon" />
          <div class="benefits__card-content">
            <h3 class="benefits__card-title">{{ benefit.title }}</h3>
            <p class="benefits__card-description">{{ benefit.description }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

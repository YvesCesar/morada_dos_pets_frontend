<script setup lang="ts">
import { units } from '@/data'
</script>

<template>
  <section class="units">
    <div class="units__container">
      <h2 class="units__title">Conheça nossas unidades</h2>

      <div class="units__grid">
        <article v-for="unit in units" :key="unit.address" class="units__card">
          <div class="units__image-wrapper">
            <img :src="unit.image" :alt="unit.address" class="units__image" />
          </div>
          <div class="units__info">
            <p class="units__address">{{ unit.address }}</p>
            <a :href="unit.mapUrl" target="_blank" rel="noopener noreferrer" class="units__btn">
              Ver no mapa
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

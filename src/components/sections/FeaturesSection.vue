<script setup lang="ts">
import { features } from '@/data'
</script>

<template>
  <section class="features">
    <div class="features__container">
      <div v-for="(feature, index) in features" :key="feature.titleLines.join('-')" class="features__item">
        <div class="features__icon">
          <img :src="feature.icon" :alt="feature.alt" />
        </div>
        <p class="features__title">
          <template v-for="(line, lineIndex) in feature.titleLines" :key="lineIndex">
            {{ line }}<br v-if="lineIndex < feature.titleLines.length - 1" />
          </template>
        </p>
        <div v-if="index < features.length - 1" class="features__separator"></div>
      </div>
    </div>
  </section>
</template>

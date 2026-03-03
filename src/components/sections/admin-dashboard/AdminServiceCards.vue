<script setup lang="ts">
import iconDogSpa from '@/assets/images/dashboard-icons/icon-dog-spa.svg'
import iconHospedagem from '@/assets/images/dashboard-icons/icon-hospedagem.svg'
import iconDogTaxi from '@/assets/images/dashboard-icons/icon-dog-taxi.svg'

defineProps<{
  counts: Record<string, number>
}>()

const services = [
  { name: 'Dog Spa', borderColor: '#C7A841', icon: iconDogSpa },
  { name: 'Hospedagem', borderColor: '#544033', icon: iconHospedagem },
  { name: 'Dog Táxi', borderColor: '#327D9B', icon: iconDogTaxi },
]
</script>

<template>
  <section class="admin-service-cards">
    <div class="admin-service-cards__grid">
      <div
        v-for="s in services"
        :key="s.name"
        class="admin-service-cards__card"
        :style="{ borderLeftColor: s.borderColor }"
      >
        <div class="admin-service-cards__top">
          <img :src="s.icon" alt="" class="admin-service-cards__icon" aria-hidden="true" />
          <div class="admin-service-cards__text">
            <span class="admin-service-cards__name">{{ s.name }}</span>
            <span class="admin-service-cards__count">{{ counts[s.name] || 0 }}</span>
          </div>
        </div>
        <span class="admin-service-cards__label">agendamentos</span>
      </div>
    </div>
  </section>
</template>

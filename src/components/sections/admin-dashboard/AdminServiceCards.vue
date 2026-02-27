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

<style scoped>
.admin-service-cards__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
}

.admin-service-cards__card {
  background: var(--color-white);
  border-radius: 10px;
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.1), 0px 4px 6px -1px rgba(0, 0, 0, 0.1);
  border-left: 4px solid;
  padding: 24px 24px 0 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 132px;
}

.admin-service-cards__top {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
}

.admin-service-cards__icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.admin-service-cards__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.admin-service-cards__name {
  font-size: 14px;
  font-weight: var(--font-semibold);
  color: #705F54;
  line-height: 1.43;
}

.admin-service-cards__count {
  font-size: 30px;
  font-weight: var(--font-bold);
  color: var(--color-text);
  text-align: right;
  line-height: 1.2;
}

.admin-service-cards__label {
  font-size: 14px;
  color: #9D918A;
  text-align: right;
  line-height: 1.43;
}

@media (max-width: 768px) {
  .admin-service-cards__grid {
    grid-template-columns: 1fr;
  }
}
</style>

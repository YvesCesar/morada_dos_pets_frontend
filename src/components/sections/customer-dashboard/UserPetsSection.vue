<script setup lang="ts">
import type { DashboardPet } from '@/types'

defineProps<{
  pets: DashboardPet[]
}>()

const emit = defineEmits<{
  add: []
  edit: [pet: DashboardPet]
  remove: [pet: DashboardPet]
}>()

const calculateAge = (birthDate: string) => {
  const parts = birthDate.split('/')
  const d = parts[0] ?? '01'
  const m = parts[1] ?? '01'
  const y = parts[2] ?? '2000'
  const birth = new Date(+y, +m - 1, +d)
  const now = new Date()
  const years = now.getFullYear() - birth.getFullYear()
  const months = now.getMonth() - birth.getMonth()
  if (years > 0) return `${years} ano${years > 1 ? 's' : ''}`
  return `${Math.max(1, months)} ${months === 1 ? 'mês' : 'meses'}`
}

const getInitial = (name: string) => name.charAt(0).toUpperCase()
</script>

<template>
  <section class="user-pets">
    <div class="user-pets__header">
      <h2 class="user-pets__title">Meus Pets</h2>
      <button class="user-pets__add-btn" @click="emit('add')">Adicionar Pet</button>
    </div>

    <div class="user-pets__grid">
      <div v-for="pet in pets" :key="pet.id" class="user-pets__card">
        <div class="user-pets__card-main">
          <img
            v-if="pet.photo"
            :src="pet.photo"
            :alt="pet.name"
            class="user-pets__avatar"
          />
          <span v-else class="user-pets__avatar user-pets__avatar--initial">
            {{ getInitial(pet.name) }}
          </span>
          <div class="user-pets__info">
            <span class="user-pets__name">{{ pet.name }}</span>
            <span class="user-pets__breed">{{ pet.breed }}</span>
            <span class="user-pets__details">{{ calculateAge(pet.birthDate) }} · {{ pet.weight }}kg</span>
          </div>
        </div>
        <div class="user-pets__actions">
          <button class="user-pets__action-btn" @click="emit('edit', pet)" title="Editar">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.4491 3.87488C13.8016 3.5225 13.9997 3.04452 13.9997 2.54612C13.9998 2.04771 13.8018 1.56969 13.4495 1.21721C13.0971 0.864741 12.6191 0.666689 12.1207 0.666626C11.6223 0.666563 11.1443 0.864496 10.7918 1.21688L1.89446 10.1162C1.73967 10.2705 1.6252 10.4606 1.56113 10.6695L0.68046 13.5709C0.66323 13.6285 0.661929 13.6898 0.676694 13.7481C0.691459 13.8064 0.72174 13.8597 0.764324 13.9022C0.806908 13.9447 0.860207 13.9749 0.918566 13.9896C0.976924 14.0043 1.03817 14.0029 1.09579 13.9855L3.99779 13.1055C4.20657 13.042 4.39658 12.9283 4.55113 12.7742L13.4491 3.87488Z" stroke="#544033" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="user-pets__action-btn user-pets__action-btn--danger" @click="emit('remove', pet)" title="Remover">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.6665 7.33337V11.3334" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.3335 7.33337V11.3334" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.6668 4V13.3333C12.6668 13.687 12.5264 14.0261 12.2763 14.2761C12.0263 14.5262 11.6871 14.6667 11.3335 14.6667H4.66683C4.31321 14.6667 3.97407 14.5262 3.72402 14.2761C3.47397 14.0261 3.3335 13.687 3.3335 13.3333V4" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 4H14" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.3335 4.00004V2.66671C5.3335 2.31309 5.47397 1.97395 5.72402 1.7239C5.97407 1.47385 6.31321 1.33337 6.66683 1.33337H9.3335C9.68712 1.33337 10.0263 1.47385 10.2763 1.7239C10.5264 1.97395 10.6668 2.31309 10.6668 2.66671V4.00004" stroke="#A31C0A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>

    <p v-if="pets.length === 0" class="user-pets__empty">Nenhum pet cadastrado.</p>
  </section>
</template>

<style scoped>
.user-pets {
  background: var(--color-white);
  border-radius: 14px;
  padding: var(--spacing-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.user-pets__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.user-pets__title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.user-pets__add-btn {
  padding: 8px 20px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.user-pets__add-btn:hover {
  opacity: 0.9;
}

.user-pets__grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.user-pets__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}

.user-pets__card-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.user-pets__avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  object-fit: cover;
  flex-shrink: 0;
}

.user-pets__avatar--initial {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  color: var(--color-white);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}

.user-pets__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-pets__name {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.user-pets__breed {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.user-pets__details {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.user-pets__actions {
  display: flex;
  gap: 8px;
}

.user-pets__action-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(0, 0, 0, 0.04);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.user-pets__action-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: var(--color-text);
}

.user-pets__action-btn--danger:hover {
  color: var(--color-danger);
  background: var(--color-danger-light);
}

.user-pets__empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: var(--spacing-xl);
}

@media (max-width: 480px) {
  .user-pets__card {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .user-pets__actions {
    align-self: flex-end;
  }
}
</style>

<script setup lang="ts">
import type { DashboardTestimonial } from '@/types'

defineProps<{
  testimonials: DashboardTestimonial[]
}>()

const emit = defineEmits<{
  toggleApproved: [id: string]
}>()

const truncate = (text: string, max = 120) =>
  text.length > max ? text.slice(0, max) + '…' : text

const statusLabel = (t: DashboardTestimonial) => {
  if (!t.allowPublic) return 'Não autorizado'
  return t.approved ? 'Publicado' : 'Aguardando'
}

const statusClass = (t: DashboardTestimonial) => {
  if (!t.allowPublic) return 'testimonials-table__status--neutral'
  return t.approved ? 'testimonials-table__status--approved' : 'testimonials-table__status--pending'
}
</script>

<template>
  <div class="testimonials-table">
    <div class="testimonials-table__wrapper">
      <table class="testimonials-table__table">
        <thead>
          <tr>
            <th>Autor</th>
            <th>Depoimento</th>
            <th>Autorizado</th>
            <th>Status</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in testimonials" :key="t.id">
            <td class="testimonials-table__author">{{ t.authorName }}</td>
            <td class="testimonials-table__quote">{{ truncate(t.quote) }}</td>
            <td>
              <span
                class="testimonials-table__status"
                :class="t.allowPublic ? 'testimonials-table__status--approved' : 'testimonials-table__status--neutral'"
              >
                {{ t.allowPublic ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td>
              <span class="testimonials-table__status" :class="statusClass(t)">
                {{ statusLabel(t) }}
              </span>
            </td>
            <td>
              <button
                class="testimonials-table__action-btn"
                :class="{ 'testimonials-table__action-btn--revoke': t.approved }"
                :disabled="!t.allowPublic"
                @click="emit('toggleApproved', t.id)"
              >
                {{ t.approved ? 'Revogar' : 'Aprovar' }}
              </button>
            </td>
          </tr>
          <tr v-if="testimonials.length === 0">
            <td colspan="5" class="testimonials-table__empty">Nenhum depoimento encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

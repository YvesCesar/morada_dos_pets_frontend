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

<style scoped>
.testimonials-table {
  background: var(--color-white);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.testimonials-table__wrapper {
  overflow-x: auto;
}

.testimonials-table__table {
  width: 100%;
  border-collapse: collapse;
}

.testimonials-table__table th {
  text-align: left;
  padding: 14px 16px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-muted);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

.testimonials-table__table td {
  padding: 14px 16px;
  font-size: var(--text-xs);
  color: var(--color-text);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  vertical-align: middle;
}

.testimonials-table__author {
  font-weight: var(--font-medium);
  white-space: nowrap;
}

.testimonials-table__quote {
  max-width: 340px;
  color: var(--color-text-muted);
}

.testimonials-table__status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: var(--radius-badge);
  font-size: var(--text-badge);
  font-weight: var(--font-medium);
  white-space: nowrap;
}

.testimonials-table__status--approved {
  background: var(--color-success-light);
  color: var(--color-success);
}

.testimonials-table__status--pending {
  background: var(--color-warning-light);
  color: #854D0E;
}

.testimonials-table__status--neutral {
  background: var(--color-neutral-light);
  color: var(--color-text-muted);
}

.testimonials-table__action-btn {
  padding: 6px 14px;
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-white);
  transition: opacity var(--transition-fast);
}

.testimonials-table__action-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.testimonials-table__action-btn--revoke {
  background: var(--color-danger-light);
  color: var(--color-danger);
}

.testimonials-table__action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.testimonials-table__empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 32px 16px;
}
</style>

<script setup lang="ts">
import type { Coupon } from '@/types'

defineProps<{
  coupons: Coupon[]
}>()

const emit = defineEmits<{
  edit: [coupon: Coupon]
  remove: [coupon: Coupon]
}>()

const formatValue = (coupon: Coupon) => {
  return coupon.type === 'percentage' ? `${coupon.value}%` : `R$ ${coupon.value.toFixed(2)}`
}
</script>

<template>
  <div class="coupons-table">
    <div class="coupons-table__wrapper">
      <table class="coupons-table__table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Uso</th>
            <th>Validade</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in coupons" :key="c.id">
            <td><code class="coupons-table__code">{{ c.code }}</code></td>
            <td>{{ c.type === 'percentage' ? 'Percentual' : 'Valor fixo' }}</td>
            <td>{{ formatValue(c) }}</td>
            <td>{{ c.currentUses }}/{{ c.maxUses }}</td>
            <td>{{ c.expiresAt }}</td>
            <td>
              <span
                class="coupons-table__status"
                :class="{ 'coupons-table__status--active': c.active }"
              >
                {{ c.active ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td>
              <div class="coupons-table__actions">
                <button class="coupons-table__action-btn" title="Editar" @click="emit('edit', c)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button class="coupons-table__action-btn coupons-table__action-btn--danger" title="Remover" @click="emit('remove', c)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

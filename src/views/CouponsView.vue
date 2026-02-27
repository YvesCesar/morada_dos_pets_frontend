<script setup lang="ts">
import { ref } from 'vue'
import type { Coupon } from '@/types'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import CouponsTable from '@/components/sections/coupons/CouponsTable.vue'
import CouponFormModal from '@/components/sections/coupons/CouponFormModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import { useCouponsStore } from '@/stores/coupons'

const couponsStore = useCouponsStore()

const showForm = ref(false)
const editingCoupon = ref<Coupon | null>(null)
const removingCoupon = ref<Coupon | null>(null)

const handleAdd = () => {
  editingCoupon.value = null
  showForm.value = true
}

const handleEdit = (coupon: Coupon) => {
  editingCoupon.value = coupon
  showForm.value = true
}

const handleSave = (data: Omit<Coupon, 'id' | 'currentUses'>) => {
  if (editingCoupon.value) {
    couponsStore.updateCoupon(editingCoupon.value.id, data)
  } else {
    couponsStore.addCoupon(data)
  }
  showForm.value = false
  editingCoupon.value = null
}

const handleRemove = () => {
  if (removingCoupon.value) {
    couponsStore.removeCoupon(removingCoupon.value.id)
    removingCoupon.value = null
  }
}
</script>

<template>
  <DashboardLayout title="Cupons" subtitle="Gerencie os cupons de desconto">
    <div class="coupons-view">
      <div class="coupons-view__header">
        <button class="coupons-view__add-btn" @click="handleAdd">Novo Cupom</button>
      </div>

      <CouponsTable
        :coupons="couponsStore.coupons"
        @edit="handleEdit"
        @remove="removingCoupon = $event"
      />
    </div>

    <CouponFormModal
      v-if="showForm"
      :coupon="editingCoupon ?? undefined"
      @close="showForm = false"
      @save="handleSave"
    />

    <ConfirmModal
      v-if="removingCoupon"
      title="Remover cupom?"
      :message="`Deseja remover o cupom <strong>${removingCoupon.code}</strong>?`"
      @close="removingCoupon = null"
      @confirm="handleRemove"
    />
  </DashboardLayout>
</template>

<style scoped>
.coupons-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.coupons-view__header {
  display: flex;
  justify-content: flex-end;
}

.coupons-view__add-btn {
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

.coupons-view__add-btn:hover {
  opacity: 0.9;
}
</style>

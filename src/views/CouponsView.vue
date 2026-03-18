<script setup lang="ts">
import type { Coupon } from '@/types'
import { useCrudModal } from '@/composables'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import CouponsTable from '@/components/sections/coupons/CouponsTable.vue'
import CouponFormModal from '@/components/sections/coupons/CouponFormModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import { useCouponsStore } from '@/stores/coupons'

const couponsStore = useCouponsStore()

const {
  showForm,
  editingItem: editingCoupon,
  removingItem: removingCoupon,
  handleAdd,
  handleEdit,
  handleSave,
  handleRemove,
} = useCrudModal<Coupon>({
  add: (data) => couponsStore.addCoupon(data as Omit<Coupon, 'id' | 'currentUses'>),
  update: (id, data) => couponsStore.updateCoupon(id, data as Partial<Coupon>),
  remove: (id) => couponsStore.removeCoupon(id),
})
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

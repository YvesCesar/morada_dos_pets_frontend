<script setup lang="ts">
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import AdminTestimonialsSection from '@/components/sections/testimonials/AdminTestimonialsSection.vue'
import { useTestimonialsStore } from '@/stores/testimonials'

const testimonialsStore = useTestimonialsStore()
</script>

<template>
  <DashboardLayout title="Depoimentos" subtitle="Gerencie os depoimentos dos clientes">
    <AdminTestimonialsSection
      :testimonials="testimonialsStore.testimonials"
      @toggle-approved="testimonialsStore.toggleApproved"
    />
  </DashboardLayout>
</template>

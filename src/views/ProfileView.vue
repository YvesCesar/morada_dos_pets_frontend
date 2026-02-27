<script setup lang="ts">
import type { UserProfile } from '@/types'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import ProfileForm from '@/components/sections/profile/ProfileForm.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleSave = (data: Partial<UserProfile>) => {
  authStore.updateProfile(data)
}
</script>

<template>
  <DashboardLayout title="Perfil" subtitle="Edite suas informações pessoais">
    <ProfileForm
      v-if="authStore.user"
      :user="authStore.user"
      @save="handleSave"
    />
  </DashboardLayout>
</template>

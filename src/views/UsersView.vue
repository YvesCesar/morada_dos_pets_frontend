<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserProfile } from '@/types'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import UsersTable from '@/components/sections/users/UsersTable.vue'
import UserFormModal from '@/components/sections/users/UserFormModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'

const usersStore = useUsersStore()
const authStore = useAuthStore()
const router = useRouter()

const showForm = ref(false)
const editingUser = ref<UserProfile | null>(null)
const removingUser = ref<UserProfile | null>(null)

const handleAdd = () => {
  editingUser.value = null
  showForm.value = true
}

const handleEdit = (user: UserProfile) => {
  editingUser.value = user
  showForm.value = true
}

const handleSave = (data: Omit<UserProfile, 'id' | 'createdAt'>) => {
  if (editingUser.value) {
    usersStore.updateUser(editingUser.value.id, data)
  } else {
    usersStore.addUser(data)
  }
  showForm.value = false
  editingUser.value = null
}

const handleRemove = () => {
  if (removingUser.value) {
    usersStore.removeUser(removingUser.value.id)
    removingUser.value = null
  }
}

const handleToggleActive = (user: UserProfile) => {
  usersStore.toggleActive(user.id)
}

const handleLoginAs = (user: UserProfile) => {
  authStore.loginAs(user)
  router.push('/dashboard/cliente')
}
</script>

<template>
  <DashboardLayout title="Usuários" subtitle="Gerencie os usuários do sistema">
    <div class="users-view">
      <div class="users-view__header">
        <button class="users-view__add-btn" @click="handleAdd">Novo Usuário</button>
      </div>

      <UsersTable
        :users="usersStore.users"
        @edit="handleEdit"
        @remove="removingUser = $event"
        @toggle-active="handleToggleActive"
        @login-as="handleLoginAs"
      />
    </div>

    <UserFormModal
      v-if="showForm"
      :user="editingUser ?? undefined"
      @close="showForm = false"
      @save="handleSave"
    />

    <ConfirmModal
      v-if="removingUser"
      title="Remover usuário?"
      :message="`Deseja remover <strong>${removingUser.name}</strong>? Esta ação não pode ser desfeita.`"
      @close="removingUser = null"
      @confirm="handleRemove"
    />
  </DashboardLayout>
</template>

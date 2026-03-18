<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { UserProfile } from '@/types'
import { useCrudModal } from '@/composables'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
import UsersTable from '@/components/sections/users/UsersTable.vue'
import UserFormModal from '@/components/sections/users/UserFormModal.vue'
import ConfirmModal from '@/components/shared/ConfirmModal.vue'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'

const usersStore = useUsersStore()
const authStore = useAuthStore()
const router = useRouter()

const {
  showForm,
  editingItem: editingUser,
  removingItem: removingUser,
  handleAdd,
  handleEdit,
  handleSave,
  handleRemove,
} = useCrudModal<UserProfile>({
  add: (data) => usersStore.addUser(data as Omit<UserProfile, 'id' | 'createdAt'>),
  update: (id, data) => usersStore.updateUser(id, data as Partial<UserProfile>),
  remove: (id) => usersStore.removeUser(id),
})

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

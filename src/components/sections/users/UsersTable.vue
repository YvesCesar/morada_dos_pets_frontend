<script setup lang="ts">
import type { UserProfile } from '@/types'

defineProps<{
  users: UserProfile[]
}>()

const emit = defineEmits<{
  edit: [user: UserProfile]
  remove: [user: UserProfile]
  toggleActive: [user: UserProfile]
  loginAs: [user: UserProfile]
}>()
</script>

<template>
  <div class="users-table">
    <div class="users-table__wrapper">
      <table class="users-table__table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Papel</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span class="users-table__role" :class="{ 'users-table__role--admin': user.role === 'admin' }">
                {{ user.role === 'admin' ? 'Admin' : 'Cliente' }}
              </span>
            </td>
            <td>
              <button
                class="users-table__toggle"
                :class="{ 'users-table__toggle--active': user.active }"
                @click="emit('toggleActive', user)"
              >
                {{ user.active ? 'Sim' : 'Não' }}
              </button>
            </td>
            <td>
              <div class="users-table__actions">
                <button
                  v-if="user.role === 'customer'"
                  class="users-table__action-btn"
                  title="Entrar como"
                  @click="emit('loginAs', user)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                </button>
                <button class="users-table__action-btn" title="Editar" @click="emit('edit', user)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button class="users-table__action-btn users-table__action-btn--danger" title="Remover" @click="emit('remove', user)">
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

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

<style scoped>
.users-table {
  background: var(--color-white);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.users-table__wrapper {
  overflow-x: auto;
}

.users-table__table {
  width: 100%;
  border-collapse: collapse;
}

.users-table__table th {
  text-align: left;
  padding: 14px 16px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-muted);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}

.users-table__table td {
  padding: 14px 16px;
  font-size: var(--text-xs);
  color: var(--color-text);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
}

.users-table__role {
  padding: 4px 10px;
  border-radius: var(--radius-badge);
  font-size: var(--text-badge);
  font-weight: var(--font-medium);
  background: var(--color-success-light);
  color: var(--color-success);
}

.users-table__role--admin {
  background: var(--color-secondary);
  color: #C7A841;
}

.users-table__toggle {
  padding: 4px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: var(--radius-badge);
  font-size: var(--text-badge);
  font-weight: var(--font-medium);
  background: var(--color-danger-light);
  color: var(--color-danger);
  cursor: pointer;
}

.users-table__toggle--active {
  background: var(--color-success-light);
  color: var(--color-success);
  border-color: rgba(0, 163, 62, 0.2);
}

.users-table__actions {
  display: flex;
  gap: 6px;
}

.users-table__action-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(0, 0, 0, 0.04);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.users-table__action-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: var(--color-text);
}

.users-table__action-btn--danger:hover {
  color: var(--color-danger);
  background: var(--color-danger-light);
}
</style>

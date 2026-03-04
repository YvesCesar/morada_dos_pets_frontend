<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DashboardLayout from '@/components/layout/DashboardLayout.vue'
</script>

<template>
  <DashboardLayout title="Configurações" subtitle="Gerencie sua conta">
    <div class="settings">
      <RouterLink to="/dashboard/perfil" class="settings__card">
        <div class="settings__card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div class="settings__card-content">
          <h3 class="settings__card-title">Editar Perfil</h3>
          <p class="settings__card-desc">Atualize seus dados pessoais e de contato</p>
        </div>
      </RouterLink>

      <RouterLink to="/dashboard/alterar-senha" class="settings__card">
        <div class="settings__card-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div class="settings__card-content">
          <h3 class="settings__card-title">Alterar Senha</h3>
          <p class="settings__card-desc">Mude sua senha de acesso</p>
        </div>
      </RouterLink>

    </div>
  </DashboardLayout>
</template>

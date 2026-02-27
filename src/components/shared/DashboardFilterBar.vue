<script setup lang="ts">
defineProps<{
  serviceFilter: string
  periodFilter: string
}>()

const emit = defineEmits<{
  'update:serviceFilter': [value: string]
  'update:periodFilter': [value: string]
}>()
</script>

<template>
  <section class="dashboard-filter-bar">
    <span class="dashboard-filter-bar__title">Filtros</span>
    <div class="dashboard-filter-bar__controls">
      <select
        class="dashboard-filter-bar__select"
        :value="serviceFilter"
        @change="emit('update:serviceFilter', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Todos os serviços</option>
        <option value="Dog Spa">Dog Spa</option>
        <option value="Hospedagem">Hospedagem</option>
        <option value="Dog Táxi">Dog Táxi</option>
      </select>

      <select
        class="dashboard-filter-bar__select"
        :value="periodFilter"
        @change="emit('update:periodFilter', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Todos os períodos</option>
        <option value="semana">Última semana</option>
        <option value="mes">Último mês</option>
        <option value="trimestre">Último trimestre</option>
      </select>
    </div>
  </section>
</template>

<style scoped>
.dashboard-filter-bar {
  background: var(--color-white);
  border-radius: 14px;
  padding: var(--spacing-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.dashboard-filter-bar__title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text);
}

.dashboard-filter-bar__controls {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.dashboard-filter-bar__select {
  padding: 8px 12px;
  border: 1px solid var(--color-input-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  color: var(--color-text);
  background: var(--color-white);
  cursor: pointer;
  min-width: 180px;
}

.dashboard-filter-bar__select:focus {
  outline: none;
  border-color: var(--color-primary);
}

@media (max-width: 480px) {
  .dashboard-filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .dashboard-filter-bar__controls {
    flex-direction: column;
  }

  .dashboard-filter-bar__select {
    min-width: 100%;
  }
}
</style>

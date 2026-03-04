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

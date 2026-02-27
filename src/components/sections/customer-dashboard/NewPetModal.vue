<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInputMasks, usePhotoUpload } from '@/composables'
import BaseModal from '@/components/shared/BaseModal.vue'

const emit = defineEmits<{
  close: []
  save: [data: { name: string; birthDate: string; breed: string; weight: number; photo: string }]
}>()

const name = ref('')
const birthDate = ref('')
const breed = ref('')
const weight = ref<number | null>(null)
const photo = ref('')

const { formatDate } = useInputMasks()
const { handleFileChange } = usePhotoUpload((url) => { photo.value = url })

const isValid = computed(() =>
  name.value.trim() !== '' &&
  birthDate.value.length === 10 &&
  breed.value.trim() !== '' &&
  weight.value !== null && weight.value > 0,
)

const handleDateInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  birthDate.value = formatDate(target.value)
}

const handleSave = () => {
  if (!isValid.value) return
  emit('save', {
    name: name.value,
    birthDate: birthDate.value,
    breed: breed.value,
    weight: weight.value!,
    photo: photo.value,
  })
}
</script>

<template>
  <BaseModal title="Novo Pet" @close="emit('close')">
    <form class="pet-form" @submit.prevent="handleSave">
      <div class="pet-form__row">
        <div class="pet-form__field pet-form__field--name">
          <label class="pet-form__label">Nome</label>
          <input v-model="name" type="text" class="pet-form__input" />
        </div>
        <div class="pet-form__field pet-form__field--date">
          <label class="pet-form__label">Data de nascimento</label>
          <input
            :value="birthDate"
            type="text"
            class="pet-form__input"
            placeholder="__/__/____"
            maxlength="10"
            @input="handleDateInput"
          />
        </div>
      </div>

      <div class="pet-form__row">
        <div class="pet-form__field pet-form__field--breed">
          <label class="pet-form__label">Raça</label>
          <input v-model="breed" type="text" class="pet-form__input" />
        </div>
        <div class="pet-form__field pet-form__field--weight">
          <label class="pet-form__label">Peso (kg)</label>
          <input v-model.number="weight" type="number" step="0.1" min="0" class="pet-form__input" />
        </div>
      </div>

      <div class="pet-form__field">
        <label class="pet-form__label">Foto</label>
        <input type="file" accept="image/*" class="pet-form__input-file" @change="handleFileChange" />
      </div>

      <div class="pet-form__actions">
        <button type="button" class="pet-form__btn pet-form__btn--cancel" @click="emit('close')">Cancelar</button>
        <button type="submit" class="pet-form__btn pet-form__btn--save" :disabled="!isValid">Salvar</button>
      </div>
    </form>
  </BaseModal>
</template>

<style scoped>
.pet-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.pet-form__row {
  display: flex;
  gap: var(--spacing-md);
}

.pet-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.pet-form__field--date,
.pet-form__field--weight {
  max-width: 150px;
}

.pet-form__label {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  color: var(--color-text);
}

.pet-form__input {
  padding: 10px 14px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-input);
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  color: var(--color-text);
}

.pet-form__input:focus {
  outline: none;
  border-color: var(--color-primary-light);
}

.pet-form__input-file {
  font-family: var(--font-primary);
  font-size: var(--text-xs);
}

.pet-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.pet-form__btn {
  padding: 8px 24px;
  border-radius: var(--radius-sm);
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.pet-form__btn--cancel {
  background: none;
  border: 1px solid var(--color-primary);
  color: var(--color-text);
}

.pet-form__btn--save {
  background: var(--color-primary);
  border: none;
  color: var(--color-white);
}

.pet-form__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .pet-form__row {
    flex-direction: column;
  }

  .pet-form__field--date,
  .pet-form__field--weight {
    max-width: 100%;
  }
}
</style>

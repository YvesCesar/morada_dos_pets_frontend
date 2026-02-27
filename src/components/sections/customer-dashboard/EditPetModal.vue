<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DashboardPet } from '@/types'
import { useInputMasks, usePhotoUpload } from '@/composables'
import BaseModal from '@/components/shared/BaseModal.vue'

const props = defineProps<{
  pet: DashboardPet
}>()

const emit = defineEmits<{
  close: []
  save: [data: Partial<DashboardPet>]
}>()

const name = ref(props.pet.name)
const birthDate = ref(props.pet.birthDate)
const breed = ref(props.pet.breed)
const weight = ref(props.pet.weight)
const photo = ref(props.pet.photo)

const { formatDate } = useInputMasks()
const { handleFileChange } = usePhotoUpload((url) => { photo.value = url })

const isValid = computed(() =>
  name.value.trim() !== '' &&
  birthDate.value.length === 10 &&
  breed.value.trim() !== '' &&
  weight.value > 0,
)

const handleDateInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  birthDate.value = formatDate(target.value)
}

const getInitial = (n: string) => n.charAt(0).toUpperCase()

const handleSave = () => {
  if (!isValid.value) return
  emit('save', {
    name: name.value,
    birthDate: birthDate.value,
    breed: breed.value,
    weight: weight.value,
    photo: photo.value,
  })
}
</script>

<template>
  <BaseModal title="Editar Pet" @close="emit('close')">
    <form class="pet-form" @submit.prevent="handleSave">
      <div class="pet-form__photo-area">
        <img
          v-if="photo"
          :src="photo"
          :alt="name"
          class="pet-form__photo-preview"
        />
        <span v-else class="pet-form__photo-preview pet-form__photo-preview--initial">
          {{ getInitial(name) }}
        </span>
        <label class="pet-form__change-photo">
          Alterar foto
          <input type="file" accept="image/*" hidden @change="handleFileChange" />
        </label>
      </div>

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

.pet-form__photo-area {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.pet-form__photo-preview {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.pet-form__photo-preview--initial {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-light);
  color: var(--color-white);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}

.pet-form__change-photo {
  font-size: var(--text-xs);
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: underline;
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

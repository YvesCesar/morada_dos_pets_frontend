<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { Pet, ServiceRequest } from '@/types'
import { mockPets, serviceTypes, serviceOptions, unitOptions, timeSlots } from '@/data/pagamento'
import OrderSummary from './OrderSummary.vue'
import arrowDownIcon from '@/assets/images/arrow-down.svg'

interface Props {
  initialServiceType?: string
  initialService?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  confirm: [requests: ServiceRequest[]]
}>()

// Estado do formulário
const selectedServiceType = ref(props.initialServiceType || '')
const selectedService = ref(props.initialService || '')
const selectedUnit = ref('')
const selectedPet = ref('')
const selectedDate = ref('')
const selectedTime = ref('')
const additionalInfo = ref('')
const editingRequestId = ref<string | null>(null)
const formRef = ref<HTMLElement | null>(null)

// Lista de solicitações
const serviceRequests = ref<ServiceRequest[]>([])

// Opções de serviço filtradas pelo tipo selecionado
const availableServices = computed(() => {
  if (!selectedServiceType.value) return []
  return serviceOptions[selectedServiceType.value] || []
})

// Preço do serviço selecionado
const selectedServicePrice = computed(() => {
  const service = availableServices.value.find(s => s.id === selectedService.value)
  return service?.price || 0
})

// Subtotal (soma de todos os requests + serviço atual se selecionado)
const subtotal = computed(() => {
  const requestsTotal = serviceRequests.value.reduce((sum, r) => sum + r.price, 0)
  return requestsTotal + selectedServicePrice.value
})

// Pets disponíveis
const pets = ref<Pet[]>([...mockPets])

// Watch para limpar serviço quando tipo muda
watch(selectedServiceType, () => {
  selectedService.value = ''
})

// Pre-seleciona serviço se tipo e serviço vierem como props
watch(
  () => [props.initialServiceType, props.initialService],
  ([type, service]) => {
    if (type) selectedServiceType.value = type
    if (service) selectedService.value = service
  },
  { immediate: true },
)

const isFormValid = computed(() => {
  return (
    selectedServiceType.value &&
    selectedService.value &&
    selectedUnit.value &&
    selectedPet.value &&
    selectedDate.value &&
    selectedTime.value
  )
})

const addServiceRequest = () => {
  if (!isFormValid.value) return

  const pet = pets.value.find(p => p.id === selectedPet.value)
  if (!pet) return

  const serviceType = serviceTypes.find(t => t.id === selectedServiceType.value)
  const service = availableServices.value.find(s => s.id === selectedService.value)
  const unit = unitOptions.find(u => u.id === selectedUnit.value)

  if (!serviceType || !service || !unit) return

  // Se estiver editando, atualiza o request existente
  if (editingRequestId.value) {
    const index = serviceRequests.value.findIndex(r => r.id === editingRequestId.value)
    if (index !== -1) {
      serviceRequests.value[index] = {
        id: editingRequestId.value,
        serviceType: serviceType.label,
        serviceName: service.label,
        unit: unit.label,
        pet,
        date: selectedDate.value,
        time: selectedTime.value,
        additionalInfo: additionalInfo.value,
        price: service.price,
      }
    }
    editingRequestId.value = null
  } else {
    const request: ServiceRequest = {
      id: Date.now().toString(),
      serviceType: serviceType.label,
      serviceName: service.label,
      unit: unit.label,
      pet,
      date: selectedDate.value,
      time: selectedTime.value,
      additionalInfo: additionalInfo.value,
      price: service.price,
    }
    serviceRequests.value.push(request)
  }

  resetForm()
}

const resetForm = () => {
  selectedServiceType.value = ''
  selectedService.value = ''
  selectedUnit.value = ''
  selectedPet.value = ''
  selectedDate.value = ''
  selectedTime.value = ''
  additionalInfo.value = ''
  editingRequestId.value = null
}

const handleEditRequest = (id: string) => {
  const request = serviceRequests.value.find(r => r.id === id)
  if (!request) return

  // Encontra os IDs correspondentes
  const serviceType = serviceTypes.find(t => t.label === request.serviceType)
  const unit = unitOptions.find(u => u.label === request.unit)

  if (serviceType) selectedServiceType.value = serviceType.id

  // Precisa esperar o watch limpar selectedService antes de setar
  setTimeout(() => {
    const services = serviceOptions[serviceType?.id || ''] || []
    const service = services.find(s => s.label === request.serviceName)
    if (service) selectedService.value = service.id
  }, 0)

  if (unit) selectedUnit.value = unit.id
  selectedPet.value = request.pet.id
  selectedDate.value = request.date
  selectedTime.value = request.time
  additionalInfo.value = request.additionalInfo
  editingRequestId.value = id
}

const handleRemoveRequest = (id: string) => {
  serviceRequests.value = serviceRequests.value.filter(r => r.id !== id)
}

const handleAddPet = () => {
  addServiceRequest()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleConfirm = () => {
  // Se o formulário tem dados preenchidos, adiciona antes de confirmar
  if (isFormValid.value) {
    addServiceRequest()
  }

  if (serviceRequests.value.length > 0) {
    emit('confirm', serviceRequests.value)
  }
}
</script>

<template>
  <div class="service-request">
    <div class="service-request__content">
      <!-- Formulário -->
      <div ref="formRef" class="service-request__form">
        <h3 class="service-request__form-title">Preencha as informações</h3>

        <!-- Tipo de serviço + Unidade (lado a lado) -->
        <div class="service-request__row">
          <div class="service-request__field">
            <label class="service-request__label">Selecione o tipo de serviço</label>
            <div class="service-request__select-wrapper">
              <select v-model="selectedServiceType" class="service-request__select">
                <option value="" disabled>Selecione...</option>
                <option
                  v-for="type in serviceTypes"
                  :key="type.id"
                  :value="type.id"
                >
                  {{ type.label }}
                </option>
              </select>
              <img :src="arrowDownIcon" alt="" class="service-request__select-arrow" />
            </div>
          </div>

          <div class="service-request__field">
            <label class="service-request__label">Selecione a unidade</label>
            <div class="service-request__select-wrapper service-request__select-wrapper--with-icon">
              <svg class="service-request__field-icon" width="20" height="24" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 3.48C10.08 3.48 6.5 7.06 6.5 11.48C6.5 17.73 14.5 25.52 14.5 25.52C14.5 25.52 22.5 17.73 22.5 11.48C22.5 7.06 18.92 3.48 14.5 3.48ZM14.5 14.38C12.9 14.38 11.6 13.08 11.6 11.48C11.6 9.88 12.9 8.58 14.5 8.58C16.1 8.58 17.4 9.88 17.4 11.48C17.4 13.08 16.1 14.38 14.5 14.38Z" fill="rgba(41, 16, 0, 0.55)"/>
              </svg>
              <select v-model="selectedUnit" class="service-request__select service-request__select--icon-left">
                <option value="" disabled>Selecione...</option>
                <option
                  v-for="unit in unitOptions"
                  :key="unit.id"
                  :value="unit.id"
                >
                  {{ unit.label }}
                </option>
              </select>
              <img :src="arrowDownIcon" alt="" class="service-request__select-arrow" />
            </div>
          </div>
        </div>

        <!-- Serviço específico (aparece após selecionar tipo) -->
        <div v-if="availableServices.length > 0" class="service-request__row">
          <div class="service-request__field service-request__field--full">
            <label class="service-request__label">Selecione o serviço</label>
            <div class="service-request__select-wrapper">
              <select v-model="selectedService" class="service-request__select">
                <option value="" disabled>Selecione...</option>
                <option
                  v-for="service in availableServices"
                  :key="service.id"
                  :value="service.id"
                >
                  {{ service.label }} — R$ {{ service.price.toFixed(2) }}
                </option>
              </select>
              <img :src="arrowDownIcon" alt="" class="service-request__select-arrow" />
            </div>
          </div>
        </div>

        <!-- Pet -->
        <div class="service-request__row">
          <div class="service-request__field service-request__field--full">
            <label class="service-request__label">Confirme sobre o Pet</label>
            <div class="service-request__select-wrapper">
              <select v-model="selectedPet" class="service-request__select">
                <option value="" disabled>Selecione...</option>
                <option
                  v-for="pet in pets"
                  :key="pet.id"
                  :value="pet.id"
                >
                  {{ pet.name }} — {{ pet.breed }} ({{ pet.size }})
                </option>
              </select>
              <img :src="arrowDownIcon" alt="" class="service-request__select-arrow" />
            </div>
          </div>
        </div>

        <!-- Data + Horário (lado a lado) -->
        <div class="service-request__row">
          <div class="service-request__field">
            <label class="service-request__label">Data</label>
            <div class="service-request__select-wrapper service-request__select-wrapper--with-icon">
              <svg class="service-request__field-icon" width="18" height="18" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.4 3.83H16.61V2.55C16.61 2.21 16.33 1.92 15.97 1.92C15.63 1.92 15.33 2.21 15.33 2.55V3.83H12.78V2.55C12.78 2.21 12.5 1.92 12.14 1.92C11.78 1.92 11.5 2.21 11.5 2.55V3.83H8.95V2.55C8.95 2.21 8.67 1.92 8.31 1.92C7.95 1.92 7.67 2.21 7.67 2.55V3.83H4.6C3.27 3.83 2.19 4.91 2.19 6.24V18.4C2.19 19.73 3.27 20.81 4.6 20.81H18.4C19.73 20.81 20.81 19.73 20.81 18.4V6.24C20.81 4.91 19.73 3.83 18.4 3.83ZM19.53 18.4C19.53 19.02 19.02 19.53 18.4 19.53H4.6C3.98 19.53 3.47 19.02 3.47 18.4V6.24C3.47 5.62 3.98 5.11 4.6 5.11H7.67V6.39C7.67 6.73 7.95 7.03 8.31 7.03C8.67 7.03 8.95 6.73 8.95 6.39V5.11H11.5V6.39C11.5 6.73 11.78 7.03 12.14 7.03C12.5 7.03 12.78 6.73 12.78 6.39V5.11H15.33V6.39C15.33 6.73 15.63 7.03 15.97 7.03C16.33 7.03 16.61 6.73 16.61 6.39V5.11H18.4C19.02 5.11 19.53 5.62 19.53 6.24V18.4ZM7.03 9.58H8.31V10.86H7.03V9.58ZM10.86 9.58H12.14V10.86H10.86V9.58ZM14.69 9.58H15.97V10.86H14.69V9.58ZM7.03 13.41H8.31V14.69H7.03V13.41ZM10.86 13.41H12.14V14.69H10.86V13.41ZM14.69 13.41H15.97V14.69H14.69V13.41ZM7.03 17.24H8.31V18.52H7.03V17.24ZM10.86 17.24H12.14V18.52H10.86V17.24ZM14.69 17.24H15.97V18.52H14.69V17.24Z" fill="rgba(41, 16, 0, 0.55)"/>
              </svg>
              <input
                v-model="selectedDate"
                type="date"
                class="service-request__input service-request__input--icon-left"
              />
              <img :src="arrowDownIcon" alt="" class="service-request__select-arrow" />
            </div>
          </div>

          <div class="service-request__field">
            <label class="service-request__label">Horário</label>
            <div class="service-request__select-wrapper service-request__select-wrapper--with-icon">
              <svg class="service-request__field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.5" stroke="rgba(41, 16, 0, 0.55)" stroke-width="1.2"/>
                <path d="M12 6.5V12L15.5 14.5" stroke="rgba(41, 16, 0, 0.55)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <select v-model="selectedTime" class="service-request__select service-request__select--icon-left">
                <option value="" disabled>Selecione...</option>
                <option v-for="time in timeSlots" :key="time" :value="time">
                  {{ time }}
                </option>
              </select>
              <img :src="arrowDownIcon" alt="" class="service-request__select-arrow" />
            </div>
          </div>
        </div>

        <!-- Informações adicionais -->
        <div class="service-request__row">
          <div class="service-request__field service-request__field--full">
            <label class="service-request__label">Informações adicionais</label>
            <textarea
              v-model="additionalInfo"
              class="service-request__textarea"
              placeholder="Descreva informações extras sobre o serviço..."
              rows="10"
            />
          </div>
        </div>

        <!-- Adicionar novo pet -->
        <button class="service-request__add-pet" type="button" @click="handleAddPet">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 24.36C9.05 24.36 4.64 19.95 4.64 14.5C4.64 9.05 9.05 4.64 14.5 4.64C19.95 4.64 24.36 9.05 24.36 14.5C24.36 19.95 19.95 24.36 14.5 24.36ZM14.5 5.8C9.69 5.8 5.8 9.69 5.8 14.5C5.8 19.31 9.69 23.2 14.5 23.2C19.31 23.2 23.2 19.31 23.2 14.5C23.2 9.69 19.31 5.8 14.5 5.8Z" fill="#B2ABAB"/>
            <path d="M9.28 13.92H19.72V15.08H9.28V13.92Z" fill="#B2ABAB"/>
            <path d="M13.92 9.28H15.08V19.72H13.92V9.28Z" fill="#B2ABAB"/>
          </svg>
          <span>Adicionar novo animal de estimação</span>
        </button>

        <!-- Botão confirmar (alinhado à direita) -->
        <div class="service-request__actions">
          <button
            class="service-request__btn service-request__btn--primary"
            :disabled="!isFormValid && serviceRequests.length === 0"
            @click="handleConfirm"
          >
            Confirmar
          </button>
        </div>
      </div>

      <!-- Resumo lateral -->
      <div class="service-request__sidebar">
        <OrderSummary
          :subtotal="subtotal"
          :show-coupon-hint="true"
          :service-requests="serviceRequests"
          @edit-request="handleEditRequest"
          @remove-request="handleRemoveRequest"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-request {
  width: 100%;
}

.service-request__content {
  display: flex;
  gap: var(--spacing-xl);
  align-items: flex-start;
}

.service-request__form {
  flex: 1;
  max-width: 640px;
}

.service-request__sidebar {
  flex-shrink: 0;
  width: 414px;
  margin-top: 2rem;
}

.service-request__form-title {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  line-height: 1.25em;
  color: var(--color-black);
  margin-bottom: var(--spacing-lg);
}

.service-request__row {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.service-request__field {
  flex: 1;
  min-width: 0;
}

.service-request__field--full {
  flex: 1 1 100%;
}

.service-request__label {
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-base);
  line-height: 1.25em;
  color: var(--color-black);
  display: block;
  margin-bottom: var(--spacing-xs);
}

/* Select wrapper */
.service-request__select-wrapper {
  position: relative;
  width: 100%;
}

.service-request__select-wrapper--with-icon {
  display: flex;
  align-items: center;
}

.service-request__field-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  pointer-events: none;
  flex-shrink: 0;
}

.service-request__select,
.service-request__input {
  width: 100%;
  height: 36px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  padding: 0 32px 0 12px;
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-sm);
  color: var(--color-black);
  background-color: var(--color-white);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}

.service-request__select--icon-left,
.service-request__input--icon-left {
  padding-left: 36px;
}

.service-request__select:focus,
.service-request__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(41, 16, 0, 0.1);
}

.service-request__select-arrow {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  pointer-events: none;
  filter: brightness(0) saturate(100%) invert(0%) sepia(6%) saturate(29%) hue-rotate(253deg) brightness(0%) contrast(100%) opacity(0.55);
}

.service-request__textarea {
  width: 100%;
  min-height: 422px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  padding: 12px;
  font-family: var(--font-primary);
  font-weight: var(--font-regular);
  font-size: var(--text-sm);
  color: var(--color-black);
  background-color: var(--color-white);
  resize: vertical;
  outline: none;
  transition: border-color var(--transition-fast);
}

.service-request__textarea:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(41, 16, 0, 0.1);
}

.service-request__textarea::placeholder {
  color: rgba(0, 0, 0, 0.55);
}

.service-request__add-pet {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm) 0;
  font-family: var(--font-primary);
  font-weight: 300;
  font-size: var(--text-sm);
  color: var(--color-black);
  transition: opacity var(--transition-fast);
}

.service-request__add-pet:hover {
  opacity: 0.7;
}

.service-request__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--spacing-sm);
}

.service-request__btn {
  font-family: var(--font-primary);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  line-height: 1.25em;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: opacity var(--transition-fast);
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-request__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.service-request__btn--primary {
  width: 177.55px;
  height: 40.64px;
  background-color: var(--color-primary);
  color: var(--color-white);
}

.service-request__btn--primary:hover:not(:disabled) {
  opacity: 0.85;
}

/* Responsividade */
@media (max-width: 1200px) {
  .service-request__content {
    flex-direction: column;
  }

  .service-request__sidebar {
    width: 100%;
  }

  .service-request__form {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .service-request__row {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .service-request__textarea {
    min-height: 200px;
  }

  .service-request__actions {
    justify-content: center;
  }

  .service-request__btn--primary {
    width: 100%;
    max-width: 300px;
  }
}
</style>

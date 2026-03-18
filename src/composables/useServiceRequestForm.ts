import { ref, computed, watch } from 'vue'
import type { Pet, ServiceRequest } from '@/types'
import { mockPets, serviceTypes, serviceOptions, unitOptions } from '@/data/pagamento'

interface ServiceRequestFormProps {
  initialServiceType?: string
  initialService?: string
}

/**
 * Composable para o formulário de solicitação de serviço
 */
export function useServiceRequestForm(
  props: ServiceRequestFormProps,
  emit: (event: 'confirm', requests: ServiceRequest[]) => void,
) {
  const selectedServiceType = ref(props.initialServiceType || '')
  const selectedService = ref(props.initialService || '')
  const selectedUnit = ref('')
  const selectedPet = ref('')
  const selectedDate = ref('')
  const selectedTime = ref('')
  const additionalInfo = ref('')
  const editingRequestId = ref<string | null>(null)
  const formRef = ref<HTMLElement | null>(null)

  const serviceRequests = ref<ServiceRequest[]>([])

  const availableServices = computed(() => {
    if (!selectedServiceType.value) return []
    return serviceOptions[selectedServiceType.value] || []
  })

  const selectedServicePrice = computed(() => {
    const service = availableServices.value.find(s => s.id === selectedService.value)
    return service?.price || 0
  })

  const subtotal = computed(() => {
    const requestsTotal = serviceRequests.value.reduce((sum, r) => sum + r.price, 0)
    return requestsTotal + selectedServicePrice.value
  })

  const pets = ref<Pet[]>([...mockPets])

  watch(selectedServiceType, () => {
    selectedService.value = ''
  })

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

  const addServiceRequest = () => {
    if (!isFormValid.value) return

    const pet = pets.value.find(p => p.id === selectedPet.value)
    if (!pet) return

    const serviceType = serviceTypes.find(t => t.id === selectedServiceType.value)
    const service = availableServices.value.find(s => s.id === selectedService.value)
    const unit = unitOptions.find(u => u.id === selectedUnit.value)

    if (!serviceType || !service || !unit) return

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

  const handleEditRequest = (id: string) => {
    const request = serviceRequests.value.find(r => r.id === id)
    if (!request) return

    const serviceType = serviceTypes.find(t => t.label === request.serviceType)
    const unit = unitOptions.find(u => u.label === request.unit)

    if (serviceType) selectedServiceType.value = serviceType.id

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
    if (isFormValid.value) {
      addServiceRequest()
    }

    if (serviceRequests.value.length > 0) {
      emit('confirm', serviceRequests.value)
    }
  }

  return {
    selectedServiceType,
    selectedService,
    selectedUnit,
    selectedPet,
    selectedDate,
    selectedTime,
    additionalInfo,
    editingRequestId,
    formRef,
    serviceRequests,
    availableServices,
    selectedServicePrice,
    subtotal,
    pets,
    isFormValid,
    addServiceRequest,
    handleEditRequest,
    handleRemoveRequest,
    handleAddPet,
    handleConfirm,
  }
}

import { ref, computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { serviceRequestSchema } from '@/schemas'
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
  const { errors, defineField, validate, resetForm, setFieldValue } = useForm({
    validationSchema: toTypedSchema(serviceRequestSchema),
    initialValues: {
      selectedServiceType: props.initialServiceType || '',
      selectedService: props.initialService || '',
      selectedUnit: '',
      selectedPet: '',
      selectedDate: '',
      selectedTime: '',
    },
  })

  const [selectedServiceType, selectedServiceTypeAttrs] = defineField('selectedServiceType')
  const [selectedService, selectedServiceAttrs] = defineField('selectedService')
  const [selectedUnit, selectedUnitAttrs] = defineField('selectedUnit')
  const [selectedPet, selectedPetAttrs] = defineField('selectedPet')
  const [selectedDate, selectedDateAttrs] = defineField('selectedDate')
  const [selectedTime, selectedTimeAttrs] = defineField('selectedTime')

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
    setFieldValue('selectedService', '')
  })

  watch(
    () => [props.initialServiceType, props.initialService],
    ([type, service]) => {
      if (type) setFieldValue('selectedServiceType', type)
      if (service) setFieldValue('selectedService', service)
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

  const resetFormFields = () => {
    resetForm()
    additionalInfo.value = ''
    editingRequestId.value = null
  }

  const addServiceRequest = async () => {
    const result = await validate()
    if (!result.valid) return false

    const pet = pets.value.find(p => p.id === selectedPet.value)
    if (!pet) return false

    const serviceType = serviceTypes.find(t => t.id === selectedServiceType.value)
    const service = availableServices.value.find(s => s.id === selectedService.value)
    const unit = unitOptions.find(u => u.id === selectedUnit.value)

    if (!serviceType || !service || !unit) return false

    if (editingRequestId.value) {
      const index = serviceRequests.value.findIndex(r => r.id === editingRequestId.value)
      if (index !== -1) {
        serviceRequests.value[index] = {
          id: editingRequestId.value,
          serviceType: serviceType.label,
          serviceName: service.label,
          unit: unit.label,
          pet,
          date: selectedDate.value!,
          time: selectedTime.value!,
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
        date: selectedDate.value!,
        time: selectedTime.value!,
        additionalInfo: additionalInfo.value,
        price: service.price,
      }
      serviceRequests.value.push(request)
    }

    resetFormFields()
    return true
  }

  const handleEditRequest = (id: string) => {
    const request = serviceRequests.value.find(r => r.id === id)
    if (!request) return

    const serviceType = serviceTypes.find(t => t.label === request.serviceType)
    const unit = unitOptions.find(u => u.label === request.unit)

    if (serviceType) setFieldValue('selectedServiceType', serviceType.id)

    setTimeout(() => {
      const services = serviceOptions[serviceType?.id || ''] || []
      const service = services.find(s => s.label === request.serviceName)
      if (service) setFieldValue('selectedService', service.id)
    }, 0)

    if (unit) setFieldValue('selectedUnit', unit.id)
    setFieldValue('selectedPet', request.pet.id)
    setFieldValue('selectedDate', request.date)
    setFieldValue('selectedTime', request.time)
    additionalInfo.value = request.additionalInfo
    editingRequestId.value = id
  }

  const handleRemoveRequest = (id: string) => {
    serviceRequests.value = serviceRequests.value.filter(r => r.id !== id)
  }

  const handleAddPet = async () => {
    await addServiceRequest()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleConfirm = async () => {
    if (isFormValid.value) {
      await addServiceRequest()
    }

    if (serviceRequests.value.length > 0) {
      emit('confirm', serviceRequests.value)
    }
  }

  return {
    selectedServiceType,
    selectedServiceTypeAttrs,
    selectedService,
    selectedServiceAttrs,
    selectedUnit,
    selectedUnitAttrs,
    selectedPet,
    selectedPetAttrs,
    selectedDate,
    selectedDateAttrs,
    selectedTime,
    selectedTimeAttrs,
    additionalInfo,
    editingRequestId,
    formRef,
    serviceRequests,
    availableServices,
    selectedServicePrice,
    subtotal,
    pets,
    isFormValid,
    errors,
    addServiceRequest,
    handleEditRequest,
    handleRemoveRequest,
    handleAddPet,
    handleConfirm,
  }
}

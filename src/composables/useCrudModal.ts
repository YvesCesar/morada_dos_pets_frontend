import { ref, type Ref } from 'vue'

interface CrudStoreActions {
  add: (data: unknown) => void
  update: (id: string, data: unknown) => void
  remove: (id: string) => void
}

/**
 * Composable genérico para estado CRUD com modais (add/edit/remove)
 */
export function useCrudModal<T extends { id: string }>(storeActions: CrudStoreActions) {
  const showForm = ref(false)
  const editingItem: Ref<T | null> = ref(null)
  const removingItem: Ref<T | null> = ref(null)

  const handleAdd = () => {
    editingItem.value = null
    showForm.value = true
  }

  const handleEdit = (item: T) => {
    editingItem.value = item
    showForm.value = true
  }

  const handleSave = (data: unknown) => {
    if (editingItem.value) {
      storeActions.update(editingItem.value.id, data)
    } else {
      storeActions.add(data)
    }
    showForm.value = false
    editingItem.value = null
  }

  const handleRemove = () => {
    if (removingItem.value) {
      storeActions.remove(removingItem.value.id)
      removingItem.value = null
    }
  }

  return { showForm, editingItem, removingItem, handleAdd, handleEdit, handleSave, handleRemove }
}

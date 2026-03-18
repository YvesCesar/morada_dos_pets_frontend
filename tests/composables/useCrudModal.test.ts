import { useCrudModal } from '@/composables/useCrudModal'

interface MockItem {
  id: string
  name: string
}

describe('useCrudModal', () => {
  const createMockActions = () => ({
    add: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  })

  it('initializes with closed form and null items', () => {
    const actions = createMockActions()
    const { showForm, editingItem, removingItem } = useCrudModal<MockItem>(actions)

    expect(showForm.value).toBe(false)
    expect(editingItem.value).toBeNull()
    expect(removingItem.value).toBeNull()
  })

  it('handleAdd opens form with null editing item', () => {
    const actions = createMockActions()
    const { showForm, editingItem, handleAdd } = useCrudModal<MockItem>(actions)

    handleAdd()

    expect(showForm.value).toBe(true)
    expect(editingItem.value).toBeNull()
  })

  it('handleEdit opens form with the item to edit', () => {
    const actions = createMockActions()
    const { showForm, editingItem, handleEdit } = useCrudModal<MockItem>(actions)

    const pet: MockItem = { id: 'pet-1', name: 'Rex' }
    handleEdit(pet)

    expect(showForm.value).toBe(true)
    expect(editingItem.value).toEqual(pet)
  })

  it('handleSave calls add when no item is being edited', () => {
    const actions = createMockActions()
    const { showForm, handleAdd, handleSave } = useCrudModal<MockItem>(actions)

    handleAdd()
    const newData = { name: 'Bella' }
    handleSave(newData)

    expect(actions.add).toHaveBeenCalledWith(newData)
    expect(showForm.value).toBe(false)
  })

  it('handleSave calls update when editing an item', () => {
    const actions = createMockActions()
    const { showForm, editingItem, handleEdit, handleSave } = useCrudModal<MockItem>(actions)

    const pet: MockItem = { id: 'pet-1', name: 'Rex' }
    handleEdit(pet)

    const updatedData = { name: 'Rex Jr' }
    handleSave(updatedData)

    expect(actions.update).toHaveBeenCalledWith('pet-1', updatedData)
    expect(showForm.value).toBe(false)
    expect(editingItem.value).toBeNull()
  })

  it('handleRemove calls remove and clears removingItem', () => {
    const actions = createMockActions()
    const { removingItem, handleRemove } = useCrudModal<MockItem>(actions)

    const pet: MockItem = { id: 'pet-1', name: 'Rex' }
    removingItem.value = pet

    handleRemove()

    expect(actions.remove).toHaveBeenCalledWith('pet-1')
    expect(removingItem.value).toBeNull()
  })

  it('handleRemove does nothing when removingItem is null', () => {
    const actions = createMockActions()
    const { handleRemove } = useCrudModal<MockItem>(actions)

    handleRemove()

    expect(actions.remove).not.toHaveBeenCalled()
  })
})

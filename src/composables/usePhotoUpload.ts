/**
 * Composable para upload de foto via FileReader
 */
export function usePhotoUpload(onUpdate: (dataUrl: string) => void) {
  const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (result) onUpdate(result)
    }
    reader.readAsDataURL(file)
  }

  return { handleFileChange }
}

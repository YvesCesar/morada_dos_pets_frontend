import { usePhotoUpload } from '@/composables/usePhotoUpload'

describe('usePhotoUpload', () => {
  it('calls onUpdate with data URL when pet photo is selected', () => {
    const onUpdate = vi.fn()
    const { handleFileChange } = usePhotoUpload(onUpdate)

    const petPhotoDataUrl = 'data:image/png;base64,goldenRetrieverPhoto'

    class MockFileReader {
      onload: ((e: ProgressEvent<FileReader>) => void) | null = null
      readAsDataURL = vi.fn(() => {
        this.onload?.({ target: { result: petPhotoDataUrl } })
      })
    }
    vi.stubGlobal('FileReader', MockFileReader)

    const file = new File([''], 'foto-thor.png', { type: 'image/png' })
    const event = { target: { files: [file] } } as unknown as Event

    handleFileChange(event)

    expect(onUpdate).toHaveBeenCalledWith(petPhotoDataUrl)

    vi.unstubAllGlobals()
  })

  it('does nothing when no file is selected', () => {
    const onUpdate = vi.fn()
    const { handleFileChange } = usePhotoUpload(onUpdate)

    const event = { target: { files: [] } } as unknown as Event
    handleFileChange(event)

    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('does not call onUpdate if FileReader result is empty', () => {
    const onUpdate = vi.fn()
    const { handleFileChange } = usePhotoUpload(onUpdate)

    class MockFileReader {
      onload: ((e: ProgressEvent<FileReader>) => void) | null = null
      readAsDataURL = vi.fn(() => {
        this.onload?.({ target: { result: '' } })
      })
    }
    vi.stubGlobal('FileReader', MockFileReader)

    const file = new File([''], 'foto-luna.png', { type: 'image/png' })
    const event = { target: { files: [file] } } as unknown as Event

    handleFileChange(event)

    expect(onUpdate).not.toHaveBeenCalled()

    vi.unstubAllGlobals()
  })
})

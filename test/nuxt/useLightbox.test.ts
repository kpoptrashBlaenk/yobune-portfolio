import { useLightbox } from '#imports'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

const IMAGE_A = 'https://example.com/a.webp'
const IMAGE_B = 'https://example.com/b.webp'

describe('useLightbox', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('starts closed with an empty image src', () => {
    const { isOpen, image } = useLightbox()
    expect(isOpen.value).toBe(false)
    expect(image.value).toBe('')
  })

  it('open() sets isOpen to true', () => {
    const { isOpen, open } = useLightbox()
    open(IMAGE_A)
    expect(isOpen.value).toBe(true)
  })

  it('open() stores the provided image src', () => {
    const { image, open } = useLightbox()
    open(IMAGE_A)
    expect(image.value).toBe(IMAGE_A)
  })

  it('open() replaces a previously set image', () => {
    const { image, open } = useLightbox()
    open(IMAGE_A)
    open(IMAGE_B)
    expect(image.value).toBe(IMAGE_B)
  })

  it('close() sets isOpen to false', () => {
    const { isOpen, open, close } = useLightbox()
    open(IMAGE_A)
    close()
    expect(isOpen.value).toBe(false)
  })

  it('close() clears the image', () => {
    const { image, open, close } = useLightbox()
    open(IMAGE_A)
    close()
    expect(image.value).toBe('')
  })

  it('open() works correctly after a close()', () => {
    const { isOpen, image, open, close } = useLightbox()
    open(IMAGE_A)
    close()
    open(IMAGE_A)
    expect(isOpen.value).toBe(true)
    expect(image.value).toBe(IMAGE_A)
  })

  it('state is shared — two useLightbox() calls see the same ref values', () => {
    // useState uses a key, so all callers share the same state instance
    const a = useLightbox()
    const b = useLightbox()
    a.open(IMAGE_A)
    expect(b.isOpen.value).toBe(true)
    expect(b.image.value).toBe(IMAGE_A)
  })
})

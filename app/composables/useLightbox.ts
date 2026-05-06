export const useLightbox = () => {
  const isOpen = useState('lightbox-open', () => false)
  const image = useState('lightbox-image', () => '')

  const open = (src: string) => {
    image.value = src
    isOpen.value = true

    console.log(isOpen.value)
  }

  const close = () => {
    isOpen.value = false
    console.log(isOpen.value)
  }

  return { isOpen, image, open, close }
}

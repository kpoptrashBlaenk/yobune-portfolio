export const useReveal = () => {
  const element = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  useIntersectionObserver(
    element,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
      }
    },
    {
      threshold: 0.2
    }
  )

  return { element, isVisible }
}

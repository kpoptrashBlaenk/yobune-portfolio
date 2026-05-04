/**
 * Displays text in typewriter style. For speed settings, look up app.config.dialog.speed.
 *
 * @param text Text to display
 */
export function useTypewriter(text: Ref<string>) {
  const config = useAppConfig()
  const output = ref('')
  let i = 0
  let interval: ReturnType<typeof setInterval> | null = null

  const start = () => {
    if (!import.meta.client) return

    output.value = ''
    i = 0

    if (interval) clearInterval(interval)

    interval = setInterval(() => {
      output.value += text.value[i]
      i++

      if (i >= text.value.length) {
        if (interval) clearInterval(interval)
        interval = null
      }
    }, config.dialog.speed)
  }

  watch(text, start, { immediate: true })

  onBeforeUnmount(() => {
    if (interval) clearInterval(interval)
  })

  return { output, start }
}

export const useSettingsStore = defineStore('settingsStore', () => {
  const config = useAppConfig()
  const cursorConfig = config.cursor

  const cursor = ref<boolean>(cursorConfig.default)
  const nsfw = ref<boolean>(config.nsfw.default)

  onNuxtReady(() => {
    cursor.value = !(localStorage.getItem(cursorConfig.storageKey) === 'true')
    toggleCursor()
  })

  function toggleCursor() {
    cursor.value = !cursor.value
    localStorage.setItem(cursorConfig.storageKey, String(cursor.value))

    if (cursor.value) {
      document.body.classList.add(cursorConfig.className)
    } else {
      document.body.classList.remove(cursorConfig.className)
    }
  }

  return {
    cursor,
    cursorConfig,
    nsfw,
    toggleCursor
  }
})

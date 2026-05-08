export const useSettingsStore = defineStore('settingsStore', () => {
  const config = useAppConfig()

  const cursor = ref<boolean>(config.header.cursor.default)
  const nsfw = ref<boolean>(config.nsfw.default)

  onNuxtReady(() => {
    cursor.value = !(localStorage.getItem(config.header.cursor.storageKey) === 'true')
    toggleCursor()
  })

  function toggleCursor() {
    cursor.value = !cursor.value
    localStorage.setItem(config.header.cursor.storageKey, String(cursor.value))

    if (cursor.value) {
      document.body.classList.add(config.header.cursor.className)
    } else {
      document.body.classList.remove(config.header.cursor.className)
    }
  }

  return {
    cursor,
    nsfw,
    toggleCursor
  }
})

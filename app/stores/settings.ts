export const useSettingsStore = defineStore('settingsStore', () => {
  /* Constants */
  const config = useAppConfig()
  const cursorConfig = config.cursor

  /* Refs */
  const cursor = ref<boolean>()
  const nsfw = ref<boolean>(config.nsfw.default)

  /* Lifecycle Hooks */
  onNuxtReady(() => {
    cursor.value = !(
      (localStorage.getItem(cursorConfig.storageKey) ?? String(cursorConfig.default)) === 'true'
    )
    toggleCursor()
  })

  /* Functions */
  function toggleCursor() {
    cursor.value = !cursor.value
    localStorage.setItem(cursorConfig.storageKey, String(cursor.value))

    if (cursor.value) {
      document.body.classList.add(cursorConfig.className)
    } else {
      document.body.classList.remove(cursorConfig.className)
    }
  }

  /* Return */
  return {
    cursor,
    cursorConfig,
    nsfw,
    toggleCursor
  }
})

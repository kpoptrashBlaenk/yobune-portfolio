export const useSettingsStore = defineStore('settingsStore', () => {
  const config = useAppConfig()

  const cursor = ref<boolean>(config.header.cursor.default)
  const nsfw = ref<boolean>(config.nsfw.default)

  function toggleCursor() {
    cursor.value = !cursor.value
  }

  return {
    cursor,
    nsfw,
    toggleCursor
  }
})

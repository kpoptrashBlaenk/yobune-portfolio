export const useSettingsStore = defineStore('settingsStore', () => {
  const config = useAppConfig()

  const cursor = ref<boolean>(config.header.cursor.default)
  const nsfw = ref<boolean>(config.nsfw.default)

  function toggleCursor() {
    cursor.value = !cursor.value

    if (cursor.value) {
      document.body.classList.add('fancy-cursor')
    } else {
      document.body.classList.remove('fancy-cursor')
    }
  }

  return {
    cursor,
    nsfw,
    toggleCursor
  }
})

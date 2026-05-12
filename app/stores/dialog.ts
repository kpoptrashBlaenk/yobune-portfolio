import { DIALOG_CONFIG, DIALOGS, type DialogRecord } from '~/constants'

export const useDialogStore = defineStore('dialog', () => {
  /* Refs */
  const index = ref(-1)
  const isTyping = ref(false)

  /* Computeds */
  const currentScene = computed<DialogRecord | null>(() => DIALOGS[index.value] ?? null)

  /* Functions */
  async function next() {
    if (isTyping.value) return

    // check if last
    if (index.value >= DIALOGS.length - 1) {
      stop()
      return
    }

    // set next scene
    index.value++
    const scene = currentScene.value
    if (!scene) return

    // scroll to card
    await nextTick()
    document.getElementById(scene.id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  function stop() {
    index.value = -1
    localStorage.setItem(DIALOG_CONFIG.storageKey, 'false')
    return
  }

  function reset() {
    stop()
    localStorage.removeItem(DIALOG_CONFIG.storageKey)
    next()
  }

  /** Called by the component when its typewriter finishes */
  function onTypingDone() {
    isTyping.value = false
  }

  /** Called by the component when its typewriter starts */
  function onTypingStart() {
    isTyping.value = true
  }

  /* Return */
  return {
    index,
    isTyping,
    currentScene,
    next,
    stop,
    reset,
    onTypingDone,
    onTypingStart
  }
})

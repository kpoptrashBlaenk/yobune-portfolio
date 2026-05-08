import type { DialogRecord } from '~/types'

export const useDialogStore = defineStore('dialog', () => {
  /* Constants */
  const config = useAppConfig()
  const scenes = config.dialog.scenes

  /* Refs */
  const index = ref(-1)
  const isTyping = ref(false)

  /* COmputeds */
  const currentScene = computed<DialogRecord | null>(() => scenes[index.value] ?? null)
  const isStarted = computed<boolean>(() => index.value >= 0)
  const isLast = computed<boolean>(() => index.value >= scenes.length - 1)

  /* Functions */
  async function next() {
    if (isTyping.value) return

    if (isLast.value) {
      index.value = -1
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
    return
  }

  function reset() {
    stop()
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
    isStarted,
    isLast,
    next,
    stop,
    reset,
    onTypingDone,
    onTypingStart
  }
})

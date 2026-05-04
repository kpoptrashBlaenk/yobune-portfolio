import type { DialogRecord } from '~/types'

export const useDialogStore = defineStore('dialog', () => {
  const config = useAppConfig()
  const scenes = config.dialog.scenes

  const index = ref(-1)
  const isTyping = ref(false)

  const currentScene = computed<DialogRecord | null>(() => scenes[index.value] ?? null)
  const isStarted = computed<boolean>(() => index.value >= 0)
  const isLast = computed<boolean>(() => index.value >= scenes.length - 1)

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

  /** Called by the component when its typewriter finishes */
  function onTypingDone() {
    isTyping.value = false
  }

  /** Called by the component when its typewriter starts */
  function onTypingStart() {
    isTyping.value = true
  }

  return {
    index,
    isTyping,
    currentScene,
    isStarted,
    isLast,
    next,
    onTypingDone,
    onTypingStart
  }
})

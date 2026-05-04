export const useDialogStore = defineStore('dialog', () => {
  const config = useAppConfig()

  const index = ref(-1)
  const state = ref<'idle' | 'entering' | 'exiting'>('idle')

  const currentScene = computed(() => config.dialog.scenes[index.value])
  const isLast = computed(() => index.value >= config.dialog.scenes.length - 1)

  function next() {
    // set to exit
    state.value = 'exiting'

    // on last, stop
    if (isLast.value) return

    // enter next scene
    index.value++
    state.value = 'entering'
    const scene = currentScene.value

    // delay before moving on
    setTimeout(() => {
      // scroll to scene
      if (scene) {
        document.getElementById(scene.id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }

      // set to idle on typewriting finish
      setTimeout(
        () => {
          state.value = 'idle'
        },
        (currentScene.value?.dialog.length || 0) * config.dialog.speed - 300
      )
    }, 300)
  }

  function find(id: string) {
    return config.dialog.scenes.find(scene => scene.id === id)
  }

  return {
    index,
    state,
    currentScene,
    isLast,
    next,
    find
  }
})

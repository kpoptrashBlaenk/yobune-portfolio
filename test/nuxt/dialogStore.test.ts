import { useDialogStore } from '#imports'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { DIALOG_CONFIG, DIALOGS } from '~/constants'

describe('useDialogStore', () => {
  let store: ReturnType<typeof useDialogStore>

  beforeEach(() => {
    store = useDialogStore()
    store.stop() // always start from index -1
    localStorage.clear()
  })

  it('starts at index -1 with no current scene', () => {
    expect(store.index).toBe(-1)
    expect(store.currentScene).toBeNull()
  })

  it('isTyping starts as false', () => {
    expect(store.isTyping).toBe(false)
  })

  it('next() moves to the first scene (index 0)', async () => {
    await store.next()
    expect(store.index).toBe(0)
    expect(store.currentScene).not.toBeNull()
  })

  it('next() advances sequentially through scenes', async () => {
    await store.next()
    await store.next()
    expect(store.index).toBe(1)
  })

  it('next() past the last scene calls stop() and resets to -1', async () => {
    for (let i = 0; i < DIALOGS.length + 1; i++) await store.next()
    expect(store.index).toBe(-1)
    expect(store.currentScene).toBeNull()
  })

  it('next() resumes normally after isTyping becomes false', async () => {
    store.onTypingStart()
    await store.next() // blocked
    expect(store.index).toBe(-1)

    store.onTypingDone()
    await store.next() // unblocked
    expect(store.index).toBe(0)
  })

  it('stop() resets index to -1', async () => {
    await store.next()
    store.stop()
    expect(store.index).toBe(-1)
  })

  it('stop() writes "false" to localStorage', async () => {
    await store.next()
    store.stop()
    expect(localStorage.getItem(DIALOG_CONFIG.storageKey)).toBe('false')
  })

  it('stop() makes currentScene null', async () => {
    await store.next()
    store.stop()
    expect(store.currentScene).toBeNull()
  })

  it('reset() goes back to scene 0', async () => {
    await store.next()
    await store.next()
    store.reset()
    await nextTick()
    expect(store.index).toBe(0)
  })

  it('reset() removes the storageKey from localStorage', async () => {
    await store.next()
    store.stop()
    store.reset()
    await nextTick()
    expect(localStorage.getItem(DIALOG_CONFIG.storageKey)).toBeNull()
  })

  it('onTypingStart() sets isTyping to true', () => {
    store.onTypingStart()
    expect(store.isTyping).toBe(true)
  })

  it('onTypingDone() sets isTyping to false', () => {
    store.onTypingStart()
    store.onTypingDone()
    expect(store.isTyping).toBe(false)
  })
})

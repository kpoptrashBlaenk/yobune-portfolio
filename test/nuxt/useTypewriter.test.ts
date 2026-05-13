import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const SPEED = 15
const TEXT = 'hello'

describe('useTypewriter', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('output starts empty before start() is called', () => {
    const { output } = useTypewriter(ref(TEXT))
    expect(output.value).toBe('')
  })

  it('types one character per interval tick', () => {
    const text = ref(TEXT)
    const { output, start } = useTypewriter(text)
    start()

    vi.advanceTimersByTime(SPEED)
    expect(output.value).toBe(TEXT.slice(0, 1))

    vi.advanceTimersByTime(SPEED)
    expect(output.value).toBe(TEXT.slice(0, 2))

    vi.advanceTimersByTime(SPEED)
    expect(output.value).toBe(TEXT.slice(0, 3))
  })

  it('calls onDone exactly once when text finishes typing', () => {
    const text = ref(TEXT)
    const { start } = useTypewriter(text)
    const onDone = vi.fn()

    start(onDone)
    vi.advanceTimersByTime(SPEED * text.value.length)
    expect(onDone).toHaveBeenCalledOnce()
  })

  it('does not call onDone before all characters are typed', () => {
    const text = ref(TEXT)
    const { start } = useTypewriter(text)
    const onDone = vi.fn()

    start(onDone)
    vi.advanceTimersByTime(SPEED * (TEXT.length - 1))
    expect(onDone).not.toHaveBeenCalled()
  })

  it('stop() halts output mid-word', () => {
    const text = ref(TEXT)
    const { output, start, stop } = useTypewriter(text)
    start()

    vi.advanceTimersByTime(SPEED * (TEXT.length - 1))
    stop()
    vi.advanceTimersByTime(SPEED * TEXT.length)

    expect(output.value).toBe(TEXT.slice(0, TEXT.length - 1))
  })

  it('start() resets output and restarts from the beginning', () => {
    const text = ref(TEXT)
    const { output, start } = useTypewriter(text)
    start()
    vi.advanceTimersByTime(SPEED * TEXT.length - 1)

    start()
    expect(output.value).toBe('')

    vi.advanceTimersByTime(SPEED)
    expect(output.value).toBe(TEXT.slice(0, 1))
  })
})

<script setup lang="ts">
const mousePosition = ref<{
  x: number
  y: number
}>({ x: 0, y: 0 })
const mouseState = ref<'idle' | 'click' | 'move'>('idle')
const timer = ref()

onMounted(() => {
  // on move
  window.addEventListener('mousemove', (event: MouseEvent) => {
    // set to move and set position
    console.log(Math.abs(event.movementX), Math.abs(event.movementY))
    if (Math.abs(event.movementX) > 1 || Math.abs(event.movementY) > 1) mouseState.value = 'move'
    mousePosition.value = { x: event.clientX, y: event.clientY }

    // clear & recreate timer for idle
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      mouseState.value = 'idle'
    }, 50)
  })

  // on down
  window.addEventListener('mousedown', () => {
    // set click
    mouseState.value = 'click'
  })

  // on up
  window.addEventListener('mouseup', () => {
    // set idle
    mouseState.value = 'idle'
  })
})
</script>

<template>
  <Teleport to="body">
    <img
      :src="`/cursors/${mouseState}.ico`"
      class="fixed z-900 pointer-events-none select-none -translate-y-1/2 -translate-x-1/2"
      :draggable="false"
      :style="{
        left: `${mousePosition?.x}px`,
        top: `${mousePosition?.y}px`
      }"
    />
  </Teleport>
</template>

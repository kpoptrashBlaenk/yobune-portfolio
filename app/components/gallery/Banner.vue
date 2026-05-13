<script setup lang="ts">
/* Imports */
import { BANNERS, DialogId } from '~/constants'

/* Refs */
const current = ref(0)

/* Functions */
function getOffset(i: number) {
  let diff = i - current.value
  if (diff > BANNERS.length / 2) diff -= BANNERS.length
  if (diff < -BANNERS.length / 2) diff += BANNERS.length
  return diff
}

function prev() {
  current.value = (current.value - 1 + BANNERS.length) % BANNERS.length
}

function next() {
  current.value = (current.value + 1) % BANNERS.length
}
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- Up Button -->
    <UButton icon="i-lucide-chevron-up" size="xl" data-testid="btn-prev" @click="prev" />

    <!-- Carousel -->
    <div class="relative flex-1 h-125 overflow-hidden flex items-center justify-center">
      <!-- Dialog -->
      <UiDialog :id="DialogId.Banners" class="absolute top-1/2 -translate-y-1/2 left-10 z-50" />

      <!-- Sliders -->
      <div
        v-for="(img, i) in BANNERS"
        :key="i"
        class="absolute w-full transition-all duration-500 ease-in-out"
        :class="{
          'pointer-events-auto': getOffset(i) === 0,
          'pointer-events-none': getOffset(i) !== 0
        }"
        :style="{
          transform: `translateY(${getOffset(i) * 100}px)`,
          opacity: Math.abs(getOffset(i)) > 1 ? 0 : Math.abs(getOffset(i)) === 1 ? 0.45 : 1,
          zIndex: 10 - Math.abs(getOffset(i)) * 5
        }"
        data-testid="slide"
        :data-index="i"
        :data-offset="getOffset(i)"
      >
        <UiImage
          :src="img"
          class="w-full h-75 object-cover transition-all duration-500"
          :class="getOffset(i) === 0 ? 'h-100' : ''"
        />
      </div>
    </div>

    <!-- Down Button -->
    <UButton icon="i-lucide-chevron-down" size="xl" data-testid="btn-next" @click="next" />
  </div>
</template>

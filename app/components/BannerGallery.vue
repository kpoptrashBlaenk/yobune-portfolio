<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'

/* Constants */
const images = [
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/e198f740-163a-47af-a63f-10145fb575e0.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/XG3TRVGMJR/27cc5a98-7745-4fd4-886f-59d165d79301.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/RNMWEFXTHDKO/26d50697-3a68-4dc3-b7e0-c2530274d7d5.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/FAKDW5SPLSO/85d39bbb-b06d-4b25-b661-3e924a075101.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/XG3TRVGMJR/27cc5a98-7745-4fd4-886f-59d165d79301.webp'
]
const total = images.length

/* Refs */
const current = ref(0)

/* Functions */
function getOffset(i: number) {
  let diff = i - current.value
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  return diff
}

function prev() {
  current.value = (current.value - 1 + total) % total
}

function next() {
  current.value = (current.value + 1) % total
}
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- Up Button -->
    <UButton icon="i-lucide-chevron-up" variant="ghost" size="xl" @click="prev" />

    <!-- Carousel -->
    <div class="relative flex-1 h-125 overflow-hidden flex items-center justify-center">
      <!-- Dialog -->
      <DialogComponent
        :id="DialogId.Banners"
        class="absolute top-1/2 -translate-y-1/2 left-5 z-50"
      />

      <!-- Sliders -->
      <div
        v-for="(img, i) in images"
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
      >
        <img
          :src="img"
          class="w-full h-75 object-cover rounded-xl transition-all duration-500"
          :class="getOffset(i) === 0 ? 'h-100' : ''"
        />
      </div>
    </div>

    <!-- Down Button -->
    <UButton icon="i-lucide-chevron-down" variant="ghost" size="xl" @click="next" />
  </div>
</template>

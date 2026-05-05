<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'

/* Constants */
const characterSheets = [
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/JO7E9JL9YO23/4db35e1b-6594-42c1-bd08-d4d1542b2f54.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/portfolio/00951ade-1a47-4a57-b38f-c4fec02bdb8e.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/H4JR2C4AANWO/934cae0f-04d5-4bca-8a86-48a65859b3bf.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/S92HAE8KQRK/c05c2dea-0fbc-4d58-8b85-0f0b88770c25.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/647KP5RYGVXD/8aeb1550-06de-4ca1-8463-36f371987319.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/9EU3UEU1PCVU/46e63263-d71a-47e6-aff6-8274f286df14.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/17JC51GUI32/68080640-a85b-4ed7-9164-5c61612a1de6.webp',
  'https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/verified/29GENWPUDA1U/9fe02eea-2eaf-4241-b182-750656e66461.webp'
]

/* Refs */
const selectedKey = ref(0)

/* Functions */
function select(index: number) {
  selectedKey.value = index
}
</script>

<template>
  <div class="relative flex gap-5 items-center h-[46vw]">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Characters" class="top-0 left-4 z-50" />

    <!-- Left -->
    <div class="w-1/2 flex items-center justify-center h-full">
      <!-- Selected Sheet -->
      <Transition name="fade-scale" mode="out-in">
        <img
          :key="selectedKey"
          :src="characterSheets[selectedKey]"
          class="max-w-full max-h-full rounded-xl"
        />
      </Transition>
    </div>

    <!-- Right -->
    <div class="w-1/2 pl-1 pr-4">
      <!-- Sheet Grid -->
      <div class="grid grid-cols-3 gap-2">
        <div
          v-for="(sheet, key) in characterSheets"
          :key
          class="relative cursor-pointer overflow-hidden rounded-xl"
          :class="
            key === selectedKey
              ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
              : 'opacity-60 hover:opacity-100'
          "
          style="aspect-ratio: 1 / 1"
          @click="select(key)"
        >
          <img
            :src="sheet"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.96);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.03);
}
</style>

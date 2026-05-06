<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'

/* Constants */
const config = useAppConfig()
const characterSheets = config.sheets.sheets

/* Refs */
const selectedKey = ref(0)
</script>

<template>
  <div class="relative flex gap-5 items-center h-[46vw]">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Characters" class="top-0 left-4 z-50" />

    <!-- Left -->
    <div class="w-1/2 flex items-center justify-center h-full">
      <!-- Selected Sheet -->
      <Transition name="fade-scale" mode="out-in">
        <ImageComponent
          :key="selectedKey"
          :src="characterSheets[selectedKey]!"
          class="max-w-full max-h-full"
        />
      </Transition>
    </div>

    <!-- Right -->
    <div class="w-1/2 pl-1 pr-4">
      <!-- Sheet Grid -->
      <div class="grid grid-cols-3 gap-2">
        <!-- Sheet Image -->
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
          @click="selectedKey = key"
        >
          <img
            :src="sheet"
            draggable="false"
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

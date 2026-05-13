<script setup lang="ts">
/* Imports */
import { DialogId, NSFW_IMAGES } from '~/constants'

/* Constants */
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogBox :id="DialogId.Nsfw" class="top-5 left-5 z-50" />

    <!-- Nsfw Gallery -->
    <div class="flex gap-4 overflow-x-auto pb-4 h-96 rounded-xl">
      <AppImage
        v-for="(image, key) in NSFW_IMAGES"
        :key
        :src="image"
        class="transition"
        :class="{
          'blur-xl brightness-75 pointer-events-none': !settingsStore.nsfw
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { DialogId, NSFW_IMAGES } from '~/constants'

/* Constants */
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <LazyUiDialog :id="DialogId.Nsfw" />

    <!-- Nsfw Gallery -->
    <div class="flex gap-4 overflow-x-auto pb-4 h-96 rounded-xl">
      <UiImage
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

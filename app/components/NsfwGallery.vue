<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'

/* Constants */
const { nsfw } = useAppConfig()
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Nsfw" class="top-5 left-5 z-50" />

    <!-- Nsfw Gallery -->
    <div class="flex gap-4 overflow-x-auto pb-4 h-96 rounded-xl">
      <ImageComponent
        v-for="(image, key) in nsfw.images"
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

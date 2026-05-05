<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'

/* Constants */
const config = useAppConfig()
const settings = useSettingsStore()
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Nsfw" class="right-3 -top-3 z-50" />

    <!-- Nsfw Gallery -->
    <div class="flex gap-4 overflow-x-auto pb-4 h-96 rounded-xl">
      <img
        v-for="(image, key) in config.nsfw.images"
        :key
        :src="image"
        class="rounded-xl transition"
        :class="{
          'blur-xl brightness-75': !settings.nsfw
        }"
      />
    </div>
  </div>
</template>

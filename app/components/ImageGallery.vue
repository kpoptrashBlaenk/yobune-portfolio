<script setup lang="ts">
/* Imports */
import { DialogId, IMAGES } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogBox :id="DialogId.Images" class="top-5 left-5 z-50" />

    <!-- Masonry Grid -->
    <div class="columns-4 gap-2">
      <div v-for="(image, key) in IMAGES" :key="key" class="mb-2">
        <AppImage :src="image" />
      </div>
    </div>
  </div>
</template>

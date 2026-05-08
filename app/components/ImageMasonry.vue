<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'
import DialogComponent from './DialogComponent.vue'

/* Constants */
const { images } = useAppConfig()
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Images" class="top-5 left-5 z-50" />

    <!-- Masonry Grid -->
    <div class="columns-4 gap-2">
      <div v-for="(image, key) in images.images" :key="key" class="mb-2">
        <ImageComponent :src="image" />
      </div>
    </div>
  </div>
</template>

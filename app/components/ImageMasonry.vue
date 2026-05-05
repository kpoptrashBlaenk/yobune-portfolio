<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'
import DialogComponent from './DialogComponent.vue'

/* Constants */
const config = useAppConfig()
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Images" class="top-10 left-10" />

    <!-- Masonry Grid -->
    <div class="columns-4 gap-2">
      <div v-for="(image, key) in config.images.images" :key="key" class="mb-2">
        <img :src="image" class="rounded-xl" />
      </div>
    </div>
  </div>
</template>

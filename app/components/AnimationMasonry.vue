<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'
import DialogComponent from './DialogComponent.vue'

/* Constants */
const { animations } = useAppConfig()
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Animations" class="top-10 left-10 z-50" />

    <!-- Masonry Grid -->
    <div class="columns-3 gap-2">
      <div v-for="(animation, key) in animations.animations" :key="key" class="mb-2">
        <ImageComponent :src="animation" />
      </div>
    </div>
  </div>
</template>

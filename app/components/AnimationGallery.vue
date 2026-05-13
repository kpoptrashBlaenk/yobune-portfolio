<script setup lang="ts">
/* Imports */
import { ANIMATIONS, DialogId } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <DialogBox :id="DialogId.Animations" class="top-10 left-10 z-50" />

    <!-- Masonry Grid -->
    <div class="columns-3 gap-2">
      <div v-for="(animation, key) in ANIMATIONS" :key="key" class="mb-2">
        <AppImage :src="animation" />
      </div>
    </div>
  </div>
</template>

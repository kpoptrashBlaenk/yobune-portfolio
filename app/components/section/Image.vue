<script setup lang="ts">
/* Imports */
import { DialogId, IMAGES } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <LazyUiDialog :id="DialogId.Images" class="top-5 left-5 z-50" />

    <!-- Masonry Grid -->
    <UiMasonryGrid :items="IMAGES" :columns="4" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { BANNERS, DialogId } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <LazyUiDialog :id="DialogId.Banners" class="absolute top-1/2 -translate-y-1/2 left-10 z-50" />

    <!-- Gallery -->
    <UiVerticalGallery :items="BANNERS" />
  </div>
</template>

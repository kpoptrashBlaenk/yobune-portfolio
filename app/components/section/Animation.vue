<script setup lang="ts">
/* Imports */
import { ANIMATIONS, DialogId } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <LazyUiDialog :id="DialogId.Animations" class="top-10 left-10 z-50" />

    <!-- Masonry Grid -->
    <UiMasonryGrid :items="ANIMATIONS" :columns="3" />
  </div>
</template>

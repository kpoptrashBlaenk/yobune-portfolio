<script setup lang="ts">
/* Imports */
import { CHARACTER_SHEETS, DialogId } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <LazyUiDialog :id="DialogId.Characters" />

    <!-- Gallery -->
    <UiPreviewGallery :items="CHARACTER_SHEETS" />
  </div>
</template>

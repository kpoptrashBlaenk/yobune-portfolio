<script setup lang="ts">
/* Imports */
import { CHARACTER_SHEETS, DialogId } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Dialog -->
    <UiDialog :id="DialogId.Characters" class="top-0 left-5" />

    <!-- Gallery -->
    <UiPreviewGallery :items="CHARACTER_SHEETS" />
  </div>
</template>

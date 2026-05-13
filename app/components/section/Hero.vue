<script setup lang="ts">
/* Imports */
import { DialogId, HERO } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Hero Image -->
    <UiImage class="w-full rounded-4xl!" :src="HERO" />

    <!-- Dialogs -->
    <LazyUiDialog :id="DialogId.Intro" class="top-0 translate-y-1/2 left-5" />
    <LazyUiDialog :id="DialogId.End" class="top-0 translate-y-1/2 left-5" />
  </div>
</template>

<script setup lang="ts">
/* Imports */
import { DialogId, HERO } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Hero Image -->
    <UiImage class="w-full rounded-4xl!" :src="HERO" />

    <!-- Dialogs -->
    <LazyUiDialog :id="DialogId.Intro" />
    <LazyUiDialog :id="DialogId.End" />
  </div>
</template>

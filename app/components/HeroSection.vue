<script setup lang="ts">
/* Imports */
import { DialogId, HERO } from '~/constants'
</script>

<template>
  <div class="relative">
    <!-- Hero Image -->
    <AppImage class="w-full rounded-4xl!" :src="HERO" />

    <!-- Dialogs -->
    <DialogBox :id="DialogId.Intro" class="top-0 translate-y-1/2 left-5" />
    <DialogBox :id="DialogId.End" class="top-0 translate-y-1/2 left-5" />
  </div>
</template>

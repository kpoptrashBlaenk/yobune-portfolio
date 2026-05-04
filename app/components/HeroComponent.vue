<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'
</script>

<template>
  <div class="relative">
    <!-- Hero Image -->
    <img
      class="w-full rounded-4xl"
      src="https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/e198f740-163a-47af-a63f-10145fb575e0.webp"
    />

    <!-- Dialogs -->
    <DialogComponent :id="DialogId.Intro" class="top-0 translate-y-1/2 left-5" />
    <DialogComponent :id="DialogId.End" class="top-0 translate-y-1/2 left-5" />
  </div>
</template>

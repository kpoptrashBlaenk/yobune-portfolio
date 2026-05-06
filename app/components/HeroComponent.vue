<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'

/* Constants */
const config = useAppConfig()
</script>

<template>
  <div class="relative">
    <!-- Hero Image -->
    <ImageComponent class="w-full rounded-4xl!" :src="config.hero.image" />

    <!-- Dialogs -->
    <DialogComponent :id="DialogId.Intro" class="top-0 translate-y-1/2 left-5" />
    <DialogComponent :id="DialogId.End" class="top-0 translate-y-1/2 left-5" />
  </div>
</template>

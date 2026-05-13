<script setup lang="ts">
/* Imports */
import { DialogId, WORK_CONFIG } from '~/constants'
</script>

<template>
  <div class="relative grid grid-cols-2 gap-5">
    <!-- Dialog -->
    <DialogBox :id="DialogId.Work" class="top-10 left-5 z-50" />

    <!-- Timelapse -->
    <div>
      <SectionTitle :title="WORK_CONFIG.timelapse.title" secondary />
      <video
        :src="WORK_CONFIG.timelapse.video"
        class="w-full rounded-xl"
        autoplay
        controls
        muted
        loop
        playsinline
        preload="metadata"
      />
    </div>

    <!-- Quality Comparison -->
    <div>
      <SectionTitle :title="WORK_CONFIG.quality.title" secondary />
      <ComparisonSlider :image-a="WORK_CONFIG.quality.low" :image-b="WORK_CONFIG.quality.high" />
    </div>

    <!-- Work Process -->
    <div class="col-span-2">
      <SectionTitle :title="WORK_CONFIG.process.title" secondary />
      <div class="flex gap-5 items-center">
        <template v-for="(item, key) in WORK_CONFIG.process.items" :key>
          <UIcon v-if="key > 0" name="material-symbols:chevron-right" class="shrink-0 size-20" />

          <div class="relative flex-1 min-w-0">
            <AppImage :src="item.image" class="w-full h-auto" />
            <div
              class="absolute bottom-0 py-1 px-3 bg-black/75 w-full rounded-b-xl text-neutral-200"
            >
              {{ item.title }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

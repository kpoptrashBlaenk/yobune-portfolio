<script setup lang="ts">
/* Imports */
import { DialogId } from '~/types'

/* Constants */
const { work } = useAppConfig()
</script>

<template>
  <div class="relative grid grid-cols-2 gap-5">
    <!-- Dialog -->
    <DialogComponent :id="DialogId.Work" class="top-10 left-5 z-50" />

    <!-- Timelapse -->
    <div>
      <TitleComponent :title="work.timelapse.title" secondary />
      <video
        :src="work.timelapse.video"
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
      <TitleComponent :title="work.quality.title" secondary />
      <ComparisonComponent :image-a="work.quality.low" :image-b="work.quality.high" />
    </div>

    <!-- Work Process -->
    <div class="col-span-2">
      <TitleComponent :title="work.process.title" secondary />
      <div class="flex gap-5 items-center">
        <template v-for="(item, key) in work.process.items" :key>
          <UIcon v-if="key > 0" name="material-symbols:chevron-right" class="shrink-0 size-20" />

          <div class="relative flex-1 min-w-0">
            <ImageComponent :src="item.image" class="w-full h-auto" />
            <div class="absolute bottom-0 py-1 px-3 bg-black/75 w-full rounded-b-xl text-neutral-200">
              {{ item.title }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* Constants */
const config = useAppConfig()
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <!-- Timelapse -->
    <div>
      <TitleComponent :title="config.work.timelapse.title" secondary />
      <video
        :src="config.work.timelapse.video"
        class="w-full rounded-xl"
        autoplay
        controls
        muted
        loop
        playsinline
        preload="metadata"
      />
    </div>
  </div>
</template>

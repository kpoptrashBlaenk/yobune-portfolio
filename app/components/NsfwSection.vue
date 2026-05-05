<script setup lang="ts">
/* Constants */
const config = useAppConfig()
</script>

<template>
  <div class="flex gap-2 overflow-x-auto pb-4 h-96">
    <img v-for="(image, key) in config.nsfw.images" :key :src="image" class="rounded-xl" />
  </div>
</template>

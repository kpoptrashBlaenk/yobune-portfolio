<script setup lang="ts">
/* Props */
defineProps<{ src: string }>()

/* Constants */
const { open } = useLightbox()
</script>

<template>
  <img :src="src" class="cursor-pointer rounded-xl" @click="open(src)" />
</template>

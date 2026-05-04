<script setup lang="ts">
/* Props */
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="text-4xl font-bold mt-20">{{ title }}</div>

  <USeparator class="my-5" />
</template>

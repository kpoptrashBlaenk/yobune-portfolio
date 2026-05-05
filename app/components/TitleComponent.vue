<script setup lang="ts">
/* Props */
defineProps<{
  title: string
  secondary?: boolean
}>()
</script>

<template>
  <div class="font-bold mt-20" :class="secondary ? 'text-xl' : 'text-4xl'">{{ title }}</div>

  <USeparator class="my-5" />
</template>

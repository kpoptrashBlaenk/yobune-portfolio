<script setup lang="ts">
/* Props */
defineProps<{
  title: string
  secondary?: boolean
}>()
</script>

<template>
  <div class="font-bold" :class="secondary ? 'text-xl mb-2 ml-2' : 'text-4xl mt-20'">
    {{ title }}
  </div>

  <USeparator v-if="!secondary" class="my-5" />
</template>

<script setup lang="ts">
/* Props */
defineProps<{
  title: string
  secondary?: boolean
}>()
</script>

<template>
  <div
    class="font-bold"
    :class="secondary ? 'text-lg sm:text-xl mb-2 ml-2' : 'text-3xl sm:text-4xl mt-20'"
  >
    {{ title }}
  </div>

  <USeparator v-if="!secondary" class="my-3" />
</template>

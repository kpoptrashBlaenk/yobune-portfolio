<script setup lang="ts">
/* Props */
defineProps<{
  items: string[]
  columns: number
}>()
</script>

<template>
  <div class="gap-2" :class="[`columns-${columns}`]">
    <div v-for="(item, key) in items" :key="key" class="mb-2">
      <UiImage :src="item" />
    </div>
  </div>
</template>

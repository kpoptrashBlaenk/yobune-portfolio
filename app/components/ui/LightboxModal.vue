<script setup lang="ts">
/* Constants */
const { isOpen, close, image } = useLightbox()
</script>

<template>
  <UModal v-model:open="isOpen" @after:leave="close">
    <template #content>
      <img :src="image" class="max-w-[85vw] max-h-[85vh] w-auto h-auto object-contain" />
    </template>
  </UModal>
</template>

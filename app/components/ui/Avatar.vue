<script setup lang="ts">
/* Imports */
import type { AvatarProps } from '@nuxt/ui'

/* Props */
const props = defineProps<AvatarProps>()
</script>

<template>
  <UAvatar v-bind="props" color="primary" class="ring ring-primary" />
</template>

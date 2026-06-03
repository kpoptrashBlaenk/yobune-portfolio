<script setup lang="ts">
/* Imports */
import type { NavigationMenuItem } from '@nuxt/ui'

/* Props */
defineProps<{
  items: NavigationMenuItem[]
}>()
</script>

<template>
  <UNavigationMenu
    :items
    :ui="{
      item: 'cursor-default!',
      link: 'rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-default',
      linkLabel: 'text-neutral-700 dark:text-neutral-200'
    }"
  />
</template>

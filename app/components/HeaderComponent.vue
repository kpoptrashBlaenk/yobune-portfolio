<script setup lang="ts">
/* Imports */
import type { NavigationMenuItem } from '@nuxt/ui'

/* Constants */
const config = useAppConfig()
const items: NavigationMenuItem[] = config.header.navigationMenuItems

/* Refs */
const fancyCursor = ref<boolean>(config.header.cursor.default)
</script>

<template>
  <UHeader>
    <!-- Title -->
    <template #title> YobuneArt </template>

    <!-- Links -->
    <UNavigationMenu :items />

    <!-- Right Side -->
    <template #right>
      <!-- Color Mode -->
      <UColorModeButton />

      <!-- Cursor Mode -->
      <UButton variant="ghost" size="md" color="neutral" @click="fancyCursor = !fancyCursor">
        {{ fancyCursor ? config.header.cursor.trueLabel : config.header.cursor.falseLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch :label="config.header.nsfw.label" :default-value="config.header.nsfw.default" />
    </template>
  </UHeader>
</template>

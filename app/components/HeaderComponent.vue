<script setup lang="ts">
/* Imports */
import type { NavigationMenuItem } from '@nuxt/ui'

/* Constants */
const config = useAppConfig()
const settings = useSettingsStore()
const items: NavigationMenuItem[] = config.header.navigationMenuItems
</script>

<template>
  <UHeader>
    <!-- Title -->
    <template #title> {{ config.titles.main }} </template>

    <!-- Links -->
    <UNavigationMenu :items />

    <!-- Right Side -->
    <template #right>
      <!-- Color Mode -->
      <UColorModeButton />

      <!-- Cursor Mode -->
      <UButton variant="ghost" size="md" color="neutral" @click="settings.toggleCursor">
        {{ settings.cursor ? config.header.cursor.trueLabel : config.header.cursor.falseLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch v-model="settings.nsfw" :label="config.nsfw.label" />
    </template>
  </UHeader>
</template>

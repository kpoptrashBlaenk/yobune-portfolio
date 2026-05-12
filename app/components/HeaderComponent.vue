<script setup lang="ts">
import { CURSOR_CONFIG, DIALOG_CONFIG, NSFW_CONFIG, SOCIALS, TITLES } from '~/constants'

/* Constants */
const settingsStore = useSettingsStore()
const { reset } = useDialogStore()
</script>

<template>
  <UHeader :ui="{ title: 'text-secondary' }">
    <!-- Title -->
    <template #title> {{ TITLES.main }} </template>

    <!-- Links -->
    <UNavigationMenu :items="SOCIALS" />

    <!-- Right Side -->
    <template #right>
      <!-- Color Mode -->
      <UColorModeButton />

      <!-- Cursor Mode -->
      <UButton variant="ghost" size="md" color="neutral" @click="settingsStore.toggleCursor">
        {{ settingsStore.cursor ? CURSOR_CONFIG.trueLabel : CURSOR_CONFIG.falseLabel }}
      </UButton>

      <!-- Reset Dialog -->
      <UButton size="md" @click="reset">
        {{ DIALOG_CONFIG.resetLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch v-model="settingsStore.nsfw" :label="NSFW_CONFIG.label" />
    </template>
  </UHeader>
</template>

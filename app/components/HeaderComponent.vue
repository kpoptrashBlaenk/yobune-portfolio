<script setup lang="ts">
/* Constants */
const { header, nsfw, titles, cursor, dialog } = useAppConfig()
const settingsStore = useSettingsStore()
const { reset } = useDialogStore()
</script>

<template>
  <UHeader :ui="{ title: 'text-secondary' }">
    <!-- Title -->
    <template #title> {{ titles.main }} </template>

    <!-- Links -->
    <UNavigationMenu :items="header.navigationMenuItems" />

    <!-- Right Side -->
    <template #right>
      <!-- Color Mode -->
      <UColorModeButton />

      <!-- Cursor Mode -->
      <UButton variant="ghost" size="md" color="neutral" @click="settingsStore.toggleCursor">
        {{ settingsStore.cursor ? cursor.trueLabel : cursor.falseLabel }}
      </UButton>

      <!-- Reset Dialog -->
      <UButton size="md" @click="reset">
        {{ dialog.resetLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch v-model="settingsStore.nsfw" :label="nsfw.label" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
/* Constants */
const settings = useSettingsStore()
const { header, nsfw, titles, cursor } = useAppConfig()
</script>

<template>
  <UHeader>
    <!-- Title -->
    <template #title> {{ titles.main }} </template>

    <!-- Links -->
    <UNavigationMenu :items="header.navigationMenuItems" />

    <!-- Right Side -->
    <template #right>
      <!-- Color Mode -->
      <UColorModeButton />

      <!-- Cursor Mode -->
      <UButton variant="ghost" size="md" color="neutral" @click="settings.toggleCursor">
        {{ settings.cursor ? cursor.trueLabel : cursor.falseLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch v-model="settings.nsfw" :label="nsfw.label" />
    </template>
  </UHeader>
</template>

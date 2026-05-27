<script setup lang="ts">
import { CURSOR_CONFIG, DIALOG_CONFIG, NSFW_CONFIG, SOCIALS, TITLES } from '~/constants'

/* Constants */
const settingsStore = useSettingsStore()
const { reset } = useDialogStore()
</script>

<template>
  <UHeader :ui="{ title: 'text-secondary', body: 'h-full' }">
    <!-- Title -->
    <template #title> {{ TITLES.main }} </template>

    <!-- Links -->
    <UNavigationMenu :items="SOCIALS" />

    <!-- Right Side -->
    <template #right>
      <!-- Color Mode -->
      <UColorModeButton />

      <!-- Cursor Mode -->
      <UButton
        variant="ghost"
        size="md"
        color="neutral"
        class="hidden sm:inline-flex"
        @click="settingsStore.toggleCursor"
      >
        {{ settingsStore.cursor ? CURSOR_CONFIG.trueLabel : CURSOR_CONFIG.falseLabel }}
      </UButton>

      <!-- Reset Dialog -->
      <UButton size="md" @click="reset">
        {{ DIALOG_CONFIG.resetLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch
        v-model="settingsStore.nsfw"
        :label="NSFW_CONFIG.label"
        class="hidden sm:inline-flex"
      />
    </template>

    <!-- Drawer Content -->
    <template #body>
      <div class="flex flex-col h-full">
        <!-- Links -->
        <UNavigationMenu :items="SOCIALS" orientation="vertical" class="flex-1" />

        <USeparator />

        <div class="flex justify-evenly items-center mt-2">
          <!-- Cursor Mode -->
          <UButton variant="ghost" size="md" color="neutral" @click="settingsStore.toggleCursor">
            {{ settingsStore.cursor ? CURSOR_CONFIG.trueLabel : CURSOR_CONFIG.falseLabel }}
          </UButton>

          <!-- NSFW Switch -->
          <USwitch v-model="settingsStore.nsfw" :label="NSFW_CONFIG.label" />
        </div>
      </div>
    </template>
  </UHeader>
</template>

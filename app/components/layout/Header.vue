<script setup lang="ts">
/* Imports */
import {
  CURSOR_CONFIG,
  DIALOG_CONFIG,
  NSFW_CONFIG,
  PAGES,
  SOCIALS,
  TITLES,
  UI_TEXT
} from '~/constants'

/* Constants */
const settingsStore = useSettingsStore()
const { reset } = useDialogStore()
</script>

<template>
  <UHeader :ui="{ title: 'text-secondary', body: 'h-full', toggle: 'sm:hidden' }">
    <!-- Title -->
    <template #title> {{ TITLES.main }} </template>

    <!-- Links -->
    <UiNavigationMenu :items="SOCIALS" class="hidden xl:inline-flex" />

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
      <UButton size="md" class="text-nowrap" @click="reset">
        {{ DIALOG_CONFIG.resetLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch
        v-model="settingsStore.nsfw"
        :label="NSFW_CONFIG.label"
        class="hidden sm:inline-flex"
      />

      <!-- Profile -->
      <a :href="PAGES.profile.url" class="ms-1">
        <!-- TODO: make this user initials -->
        <UiAvatar :text="'P'" class="hidden sm:inline-flex" />
      </a>
    </template>

    <!-- Drawer Content -->
    <template #body>
      <div class="flex flex-col h-full">
        <!-- Top -->
        <div class="flex-1">
          <!-- Links -->
          <UiNavigationMenu :items="SOCIALS" orientation="vertical" />

          <USeparator class="my-2" />

          <!-- Profile -->
          <a :href="PAGES.profile.url">
            <UButton variant="ghost" size="md" color="neutral" block class="justify-start">
              {{ UI_TEXT.profile }}
            </UButton>
          </a>
        </div>

        <USeparator />

        <!-- Bottom -->
        <div class="flex justify-evenly items-center mt-2">
          <!-- Cursor Mode -->
          <UButton variant="ghost" size="xl" color="neutral" @click="settingsStore.toggleCursor">
            {{ settingsStore.cursor ? CURSOR_CONFIG.trueLabel : CURSOR_CONFIG.falseLabel }}
          </UButton>

          <!-- NSFW Switch -->
          <USwitch v-model="settingsStore.nsfw" :label="NSFW_CONFIG.label" />
        </div>
      </div>
    </template>
  </UHeader>
</template>

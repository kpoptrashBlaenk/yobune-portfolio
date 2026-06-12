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
} from '~~/shared/constants'

/* Constants */
const settingsStore = useSettingsStore()
const { reset } = useDialogStore()
const showSmClass = 'hidden sm:inline-flex'

/* Computeds */
const cursorLabel = computed(() =>
  settingsStore.cursor ? CURSOR_CONFIG.trueLabel : CURSOR_CONFIG.falseLabel
)
</script>

<template>
  <UHeader>
    <!-- Title -->
    <template #title> {{ TITLES.main }} </template>

    <!-- Links -->
    <UNavigationMenu :items="SOCIALS" class="hidden xl:inline-flex" />

    <!-- Right Side -->
    <template #right>
      <!-- Color Mode -->
      <UColorModeButton />

      <!-- Cursor Mode -->
      <UButton
        variant="ghost"
        size="md"
        color="neutral"
        :class="showSmClass"
        @click="settingsStore.toggleCursor"
      >
        {{ cursorLabel }}
      </UButton>

      <!-- Reset Dialog -->
      <UButton size="md" class="text-nowrap" @click="reset">
        {{ DIALOG_CONFIG.resetLabel }}
      </UButton>

      <!-- NSFW Switch -->
      <USwitch v-model="settingsStore.nsfw" :label="NSFW_CONFIG.label" :class="showSmClass" />

      <!-- Profile -->
      <a :href="PAGES.profile.url" class="ms-1">
        <!-- TODO: make this user initials -->
        <UAvatar :text="'P'" :class="showSmClass" />
      </a>
    </template>

    <!-- Drawer Content -->
    <template #body>
      <div class="flex flex-col h-full">
        <!-- Top -->
        <div class="flex-1">
          <!-- Links -->
          <UNavigationMenu :items="SOCIALS" orientation="vertical" />

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
          <UButton
            variant="ghost"
            size="xl"
            color="neutral"
            :class="showSmClass"
            @click="settingsStore.toggleCursor"
          >
            {{ cursorLabel }}
          </UButton>

          <!-- NSFW Switch -->
          <USwitch v-model="settingsStore.nsfw" :label="NSFW_CONFIG.label" />
        </div>
      </div>
    </template>
  </UHeader>
</template>

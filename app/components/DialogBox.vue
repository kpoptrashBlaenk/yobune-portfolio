<script setup lang="ts">
/* Imports */
import { DIALOG_CONFIG, type DialogId, DIALOGS } from '~/constants'

/* Props */
const props = defineProps<{ id: DialogId }>()

/* Constants */
const dialogStore = useDialogStore()

/* Variables */
const scene = DIALOGS.find((scene) => scene.id === props.id)
const text = ref<string>(scene?.dialog ?? '')
const { output, start } = useTypewriter(text)
const isActive = computed<boolean>(() => dialogStore.currentScene?.id === props.id)

/* Watches */
watch(isActive, (active) => {
  if (!active) return
  dialogStore.onTypingStart()
  start(() => dialogStore.onTypingDone())
})
</script>

<template>
  <!-- Transition -->
  <Transition name="fade">
    <!-- Card -->
    <UCard v-if="scene && isActive" :id="scene.id" class="absolute w-1/3 z-50">
      <div class="flex items-center gap-4 h-24">
        <!-- Image -->
        <AppImage :src="DIALOG_CONFIG.image" class="w-16 h-16" />
        <!-- Text -->
        <p>{{ output }}</p>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-end gap-5 h-8">
          <!-- Action Button -->
          <UButton v-if="!dialogStore.isTyping" variant="outline" @click="dialogStore.stop">
            {{ DIALOG_CONFIG.disableActionLabel }}
          </UButton>
          <UButton v-if="!dialogStore.isTyping" @click="dialogStore.next">
            {{ scene.actionLabel ?? DIALOG_CONFIG.defaultActionLabel }}
          </UButton>
        </div>
      </template>
    </UCard>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

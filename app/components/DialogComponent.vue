<script setup lang="ts">
/* Imports */
import type { DialogId } from '~/types'

/* Props */
const props = defineProps<{ id: DialogId }>()

/* Constants */
const config = useAppConfig()
const dialog = useDialogStore()

/* Variables */
const scene = config.dialog.scenes.find((scene) => scene.id === props.id)
const text = ref<string>(scene?.dialog ?? '')
const { output, start } = useTypewriter(text)
const isActive = computed<boolean>(() => dialog.currentScene?.id === props.id)

/* Watches */
watch(isActive, (active) => {
  if (!active) return
  dialog.onTypingStart()
  start(() => dialog.onTypingDone())
})
</script>

<template>
  <!-- Transition -->
  <Transition name="fade">
    <!-- Card -->
    <UCard v-if="scene && isActive" :id="scene.id" class="absolute w-1/3">
      <div class="flex items-center gap-4 h-24">
        <!-- Image -->
        <ImageComponent :src="config.dialog.image" class="w-16 h-16" />
        <!-- Text -->
        <p>{{ output }}</p>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-end h-8">
          <!-- Action Button -->
          <UButton v-if="!dialog.isTyping" @click="dialog.next">
            {{ scene.actionLabel ?? config.dialog.defaultActionLabel }}
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

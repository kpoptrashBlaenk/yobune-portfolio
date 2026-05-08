<script setup lang="ts">
/* Imports */
import type { DialogId } from '~/types'

/* Props */
const props = defineProps<{ id: DialogId }>()

/* Constants */
const { dialog } = useAppConfig()
const { currentScene, onTypingDone, onTypingStart, stop, isTyping, next } = useDialogStore()

/* Variables */
const scene = dialog.scenes.find((scene) => scene.id === props.id)
const text = ref<string>(scene?.dialog ?? '')
const { output, start } = useTypewriter(text)
const isActive = computed<boolean>(() => currentScene?.id === props.id)

/* Watches */
watch(isActive, (active) => {
  if (!active) return
  onTypingStart()
  start(() => onTypingDone())
})
</script>

<template>
  <!-- Transition -->
  <Transition name="fade">
    <!-- Card -->
    <UCard v-if="scene && isActive" :id="scene.id" class="absolute w-1/3">
      <div class="flex items-center gap-4 h-24">
        <!-- Image -->
        <ImageComponent :src="dialog.image" class="w-16 h-16" />
        <!-- Text -->
        <p>{{ output }}</p>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-end gap-5 h-8">
          <!-- Action Button -->
          <UButton v-if="!isTyping" variant="outline" @click="stop">
            {{ dialog.disableActionLabel }}
          </UButton>
          <UButton v-if="!isTyping" @click="next">
            {{ scene.actionLabel ?? dialog.defaultActionLabel }}
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

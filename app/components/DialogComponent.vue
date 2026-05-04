<script setup lang="ts">
/* Imports */

/* Props */
const props = defineProps<{
  id: string
}>()

/* Constants */
const config = useAppConfig()
const dialog = useDialogStore()
const scene = dialog.find(props.id)

/* Refs */
const text = computed(() => scene?.dialog || '')
const typewriter = useTypewriter(text)
const isActive = computed(() => dialog.currentScene?.id === props.id)

/* Watches */
watch(
  isActive,
  active => {
    if (active) typewriter.start()
  },
  { immediate: true }
)
</script>

<template>
  <Transition :id="scene?.id" name="fade">
    <!-- Card -->
    <UCard v-if="scene && dialog.currentScene?.id === scene?.id" class="absolute w-1/3">
      <!-- Content -->
      <div class="flex gap-4 items-center h-24">
        <!-- Image -->
        <img :src="config.dialog.image" class="w-16 h-16 rounded-xl" />

        <!-- Text -->
        <p>{{ typewriter.output }}</p>
      </div>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-end h-8">
          <!-- Action Button -->
          <UButton v-if="dialog.state === 'idle'" @click="dialog.next">
            {{ scene?.actionLabel || config.dialog.defaultActionLabel }}
          </UButton>
        </div>
      </template>
    </UCard>
  </Transition>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

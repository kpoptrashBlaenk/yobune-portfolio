<script setup lang="ts">
/* Props */
const props = defineProps<{
  title: string
  variant: 'primary' | 'secondary'
}>()

/* Functions */
function titleCLass() {
  switch (props.variant) {
    case 'primary':
      return 'text-3xl sm:text-4xl mt-20'
    case 'secondary':
      return 'text-lg sm:text-xl mb-2 ml-2'
  }
}
</script>

<template>
  <div class="font-bold" :class="titleCLass">
    {{ title }}
  </div>

  <USeparator v-if="variant === 'primary'" class="my-3" />
</template>

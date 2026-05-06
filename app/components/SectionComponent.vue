<script setup lang="ts">
/* Constants */
const { element, isVisible } = useReveal()
</script>

<template>
  <section
    ref="element"
    class="transition-all duration-1000 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
  >
    <slot></slot>
  </section>
</template>

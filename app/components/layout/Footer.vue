<script setup lang="ts">
/* Imports */
import { FOOTER_CONFIG, SOCIALS } from '~/constants'
</script>

<template>
  <UFooter
    class="text-muted text-sm"
    :ui="{
      container: 'flex! justify-between',
      bottom:
        'flex flex-col sm:flex-row items-center justify-center gap-2 py-2! text-sm text-muted bg-muted border-t border-default',
      left: 'flex flex-col items-start order-0',
      center: 'order-1',
      right: 'flex flex-col items-end order-2'
    }"
  >
    <!-- Ownership -->
    <template #left>
      <p v-for="(line, i) in FOOTER_CONFIG.ownership" :key="i" :class="{ 'font-bold': i === 0 }">
        {{ line }}
      </p>
    </template>

    <!-- Socials -->
    <UNavigationMenu :items="SOCIALS" variant="link" class="hidden sm:inline-block" />

    <!-- Contact -->
    <template #right>
      <p class="font-bold">Contact</p>
      <p>{{ FOOTER_CONFIG.contact }}</p>
    </template>

    <!-- Banner -->
    <template #bottom>
      <!-- Legal -->
      <span>© {{ new Date().getFullYear() }} {{ FOOTER_CONFIG.legal }}. All rights reserved.</span>
      <!-- Divider -->
      <span class="hidden sm:inline-block">•</span>
      <!-- Credit -->
      <span class="flex items-center gap-1">
        Created by
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          :to="FOOTER_CONFIG.credit"
          target="_blank"
          class="p-1"
        />
      </span>
    </template>
  </UFooter>
</template>

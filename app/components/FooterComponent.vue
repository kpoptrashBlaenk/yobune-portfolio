<script setup lang="ts">
/* Constants */
const config = useAppConfig()
</script>

<template>
  <UFooter
    class="text-muted text-sm"
    :ui="{
      bottom: 'py-0!'
    }"
  >
    <template #left>
      <!-- Ownership -->
      <p>{{ config.footer.ownership }}</p>
    </template>

    <!-- Socials -->
    <UNavigationMenu :items="config.header.navigationMenuItems" variant="link" />

    <template #right>
      <!-- Contact -->
      <p>
        {{ config.footer.contact }}
      </p>
    </template>

    <template #bottom>
      <div class="flex gap-1 items-center justify-center py-2 bg-muted border-t border-default">
        <!-- Legal -->
        <p>Copyright © {{ new Date().getFullYear() }}</p>

        <!-- Credit -->
        <p>Created by</p>
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          :to="config.footer.credit"
          target="_blank"
          class="-ml-1"
        />
      </div>
    </template>
  </UFooter>
</template>

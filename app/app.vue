<script setup>
/* Head */
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

/* Constants */
const dialog = useDialogStore()
const config = useAppConfig()

/* Lifecycle Hooks */
onNuxtReady(() => {
  if (!localStorage.getItem(config.dialog.storageKey)) dialog.next()
})
</script>

<template>
  <UApp>
    <AppHeader />

    <NuxtLayout>
      <AppCursor />
      <NuxtPage />
    </NuxtLayout>

    <AppFooter />
  </UApp>
</template>

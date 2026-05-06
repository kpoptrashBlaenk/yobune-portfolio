<script setup>
/* Head */
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: 'fancy-cursor'
  }
})

/* Constants */
const dialog = useDialogStore()

/* Lifecycle Hooks */
onNuxtReady(() => {
  dialog.next()
})
</script>

<template>
  <UApp>
    <HeaderComponent />

    <NuxtLayout>
      <CursorComponent />
      <NuxtPage />
    </NuxtLayout>

    <FooterComponent />
  </UApp>
</template>

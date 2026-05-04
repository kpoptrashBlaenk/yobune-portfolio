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

onNuxtReady(() => {
  dialog.next()
})
</script>

<template>
  <UApp>
    <HeaderComponent />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

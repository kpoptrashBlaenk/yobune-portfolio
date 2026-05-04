<script setup lang="ts">
/* Constants */
const config = useAppConfig()
</script>

<template>
  <div class="pb-20">
    <HeroComponent class="mt-10" />

    <TitleComponent :title="config.titles.animatedBanners" />

    <BannerGallery />
  </div>
</template>

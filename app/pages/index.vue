<script setup lang="ts">
/* Constants */
const config = useAppConfig()
</script>

<template>
  <div>
    <HeroComponent class="mt-10" />

    <TitleComponent :title="config.titles.animatedBanners" />

    <BannerGallery />

    <TitleComponent :title="config.titles.ohterAnimations" />

    <AnimationMasonry />

    <TitleComponent :title="config.titles.characterSheets" />

    <CharacterSheets />

    <TitleComponent :title="config.titles.otherImages" />

    <ImageMasonry />

    <TitleComponent :title="config.titles.nsfwGallery" />

    <NsfwGallery />

    <TitleComponent :title="config.titles.work" />

    <AboutWork />

    <USeparator class="mt-10" />
  </div>
</template>

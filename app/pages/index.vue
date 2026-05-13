<script setup lang="ts">
/* Imports */
import { TITLES } from '~/constants'
</script>

<template>
  <div>
    <UiLightboxModal />

    <!-- Hero -->
    <UiReveal>
      <SectionHero class="mt-10" />
    </UiReveal>

    <!-- Banners -->
    <UiReveal>
      <UiTitle :title="TITLES.animatedBanners" />

      <GalleryBanner />
    </UiReveal>

    <!-- Animations -->
    <UiReveal>
      <UiTitle :title="TITLES.ohterAnimations" />

      <GalleryAnimation />
    </UiReveal>

    <!-- Character Sheets -->
    <UiReveal>
      <UiTitle :title="TITLES.characterSheets" />

      <GalleryCharacterSheets />
    </UiReveal>

    <!-- Other Images -->
    <UiReveal>
      <UiTitle :title="TITLES.otherImages" />

      <GalleryImage />
    </UiReveal>

    <!-- Nsfw -->
    <UiReveal>
      <UiTitle :title="TITLES.nsfwGallery" />

      <GalleryNsfw />
    </UiReveal>

    <!-- Working Process -->
    <UiReveal>
      <UiTitle :title="TITLES.work" />

      <SectionWork />
    </UiReveal>

    <USeparator class="mt-10" />
  </div>
</template>

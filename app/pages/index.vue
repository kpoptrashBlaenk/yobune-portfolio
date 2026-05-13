<script setup lang="ts">
/* Imports */
import { TITLES } from '~/constants'
</script>

<template>
  <div>
    <LazyUiLightboxModal />

    <!-- Hero -->
    <UiReveal>
      <SectionHero class="mt-10" />
    </UiReveal>

    <!-- Banners -->
    <UiReveal>
      <LazyUiTitle :title="TITLES.animatedBanners" />

      <LazySectionBanner />
    </UiReveal>

    <!-- Animations -->
    <UiReveal>
      <LazyUiTitle :title="TITLES.ohterAnimations" />

      <LazySectionAnimation />
    </UiReveal>

    <!-- Character Sheets -->
    <UiReveal>
      <LazyUiTitle :title="TITLES.characterSheets" />

      <LazySectionCharacterSheets />
    </UiReveal>

    <!-- Other Images -->
    <UiReveal>
      <LazyUiTitle :title="TITLES.otherImages" />

      <LazySectionImage />
    </UiReveal>

    <!-- Nsfw -->
    <UiReveal>
      <LazyUiTitle :title="TITLES.nsfwGallery" />

      <LazySectionNsfw />
    </UiReveal>

    <!-- Working Process -->
    <UiReveal>
      <LazyUiTitle :title="TITLES.work" />

      <LazySectionWork />
    </UiReveal>

    <USeparator class="mt-10" />
  </div>
</template>

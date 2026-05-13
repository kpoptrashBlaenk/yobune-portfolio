<script setup lang="ts">
/* Imports */
import { TITLES } from '~/constants'
</script>

<template>
  <div>
    <LightboxModal />

    <!-- Hero -->
    <SectionReveal>
      <HeroSection class="mt-10" />
    </SectionReveal>

    <!-- Banners -->
    <SectionReveal>
      <SectionTitle :title="TITLES.animatedBanners" />

      <BannerGallery />
    </SectionReveal>

    <!-- Animations -->
    <SectionReveal>
      <SectionTitle :title="TITLES.ohterAnimations" />

      <AnimationGallery />
    </SectionReveal>

    <!-- Character Sheets -->
    <SectionReveal>
      <SectionTitle :title="TITLES.characterSheets" />

      <CharacterSheets />
    </SectionReveal>

    <!-- Other Images -->
    <SectionReveal>
      <SectionTitle :title="TITLES.otherImages" />

      <ImageGallery />
    </SectionReveal>

    <!-- Nsfw -->
    <SectionReveal>
      <SectionTitle :title="TITLES.nsfwGallery" />

      <NsfwGallery />
    </SectionReveal>

    <!-- Working Process -->
    <SectionReveal>
      <SectionTitle :title="TITLES.work" />

      <WorkProcess />
    </SectionReveal>

    <USeparator class="mt-10" />
  </div>
</template>

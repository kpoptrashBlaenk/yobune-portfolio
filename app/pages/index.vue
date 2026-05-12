<script setup lang="ts">
/* Imports */
import { TITLES } from '~/constants'
</script>

<template>
  <div>
    <LightboxModal />

    <!-- Hero -->
    <SectionComponent>
      <HeroComponent class="mt-10" />
    </SectionComponent>

    <!-- Banners -->
    <SectionComponent>
      <TitleComponent :title="TITLES.animatedBanners" />

      <BannerGallery />
    </SectionComponent>

    <!-- Animations -->
    <SectionComponent>
      <TitleComponent :title="TITLES.ohterAnimations" />

      <AnimationMasonry />
    </SectionComponent>

    <!-- Character Sheets -->
    <SectionComponent>
      <TitleComponent :title="TITLES.characterSheets" />

      <CharacterSheets />
    </SectionComponent>

    <!-- Other Images -->
    <SectionComponent>
      <TitleComponent :title="TITLES.otherImages" />

      <ImageMasonry />
    </SectionComponent>

    <!-- Nsfw -->
    <SectionComponent>
      <TitleComponent :title="TITLES.nsfwGallery" />

      <NsfwGallery />
    </SectionComponent>

    <!-- Working Process -->
    <SectionComponent>
      <TitleComponent :title="TITLES.work" />

      <AboutWork />
    </SectionComponent>

    <USeparator class="mt-10" />
  </div>
</template>

<script setup lang="ts">
/* Constants */
const { titles } = useAppConfig()
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
      <TitleComponent :title="titles.animatedBanners" />

      <BannerGallery />
    </SectionComponent>

    <!-- Animations -->
    <SectionComponent>
      <TitleComponent :title="titles.ohterAnimations" />

      <AnimationMasonry />
    </SectionComponent>

    <!-- Character Sheets -->
    <SectionComponent>
      <TitleComponent :title="titles.characterSheets" />

      <CharacterSheets />
    </SectionComponent>

    <!-- Other Images -->
    <SectionComponent>
      <TitleComponent :title="titles.otherImages" />

      <ImageMasonry />
    </SectionComponent>

    <!-- Nsfw -->
    <SectionComponent>
      <TitleComponent :title="titles.nsfwGallery" />

      <NsfwGallery />
    </SectionComponent>

    <!-- Working Process -->
    <SectionComponent>
      <TitleComponent :title="titles.work" />

      <AboutWork />
    </SectionComponent>

    <USeparator class="mt-10" />
  </div>
</template>

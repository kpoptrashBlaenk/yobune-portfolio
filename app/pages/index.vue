<script setup lang="ts">
/* Constants */
const config = useAppConfig()
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
      <TitleComponent :title="config.titles.animatedBanners" />

      <BannerGallery />
    </SectionComponent>

    <!-- Animations -->
    <SectionComponent>
      <TitleComponent :title="config.titles.ohterAnimations" />

      <AnimationMasonry />
    </SectionComponent>

    <!-- Character Sheets -->
    <SectionComponent>
      <TitleComponent :title="config.titles.characterSheets" />

      <CharacterSheets />
    </SectionComponent>

    <!-- Other Images -->
    <SectionComponent>
      <TitleComponent :title="config.titles.otherImages" />

      <ImageMasonry />
    </SectionComponent>

    <!-- Nsfw -->
    <SectionComponent>
      <TitleComponent :title="config.titles.nsfwGallery" />

      <NsfwGallery />
    </SectionComponent>

    <!-- Working Process -->
    <SectionComponent>
      <TitleComponent :title="config.titles.work" />

      <AboutWork />
    </SectionComponent>

    <USeparator class="mt-10" />
  </div>
</template>

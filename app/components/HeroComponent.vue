<script setup lang="ts"></script>

<template>
  <div class="relative mt-5">
    <img
      class="w-full rounded-4xl"
      src="https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/e198f740-163a-47af-a63f-10145fb575e0.webp"
    />
  </div>

  <UCard class="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 ml-10">
    <div class="flex gap-5 items-center">
      <img
        class="w-24 h-24 rounded-xl"
        src="https://storage.vgen.co/uploads/6688ae01-b0ab-494a-b95f-8debacc4d4d0/avatars/c994765a-609b-4db2-ad2a-fb476a540298.webp"
      />
      <div>
        Welcome to y page bla bla bla. I need some placeholder text, so please let this just look
        nice. Thank you.
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton> Take the tour </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
/* Imports */
import { UI_TEXT } from '#shared/constants'

/* Page */
definePageMeta({
  layout: 'public'
})

/* Constants */
const route = useRoute()
const supabase = useSupabaseClient()

/* Refs */
const sessionReady = ref(false)

/* Lifecycle Hooks */
onMounted(async () => {
  console.log(route.query['token'])
  const token = route.query['token'] as string
  if (!token) return

  const { data } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'signup'
  })

  if (data.session) sessionReady.value = true
})
</script>

<template>
  <UCard v-if="sessionReady" class="max-w-xl mx-auto mt-[10vh]">
    <template #title>
      {{ UI_TEXT.title_confirm }}
    </template>

    <AuthConfirmForm />
  </UCard>
</template>

/**
 * Listens to Supabase auth state changes and keeps the Pinia store in sync.
 */
export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient()
  const authStore = useAuthStore()

  async function syncProfile() {
    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
      authStore.clearProfile()
      return
    }

    try {
      const profile = await $fetch<AuthUser>('/api/user/me', {
        headers: { Authorization: `Bearer ${session.access_token}` }
      })
      authStore.setProfile(profile)
    } catch {
      authStore.clearProfile()
    }
  }

  // sync on boot
  await syncProfile()

  // keep in sync on sign-in, sign-out and token refresh
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      syncProfile()
    }
    if (event === 'SIGNED_OUT') {
      authStore.clearProfile()
    }
  })
})

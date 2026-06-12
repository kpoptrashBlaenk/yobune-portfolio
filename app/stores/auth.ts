export const useAuthStore = defineStore('auth', () => {
  /* Refs */
  const profile = ref<AuthUser | null>(null)

  /* Computeds */
  const isLoggedIn = computed(() => !!profile.value)
  const role = computed(() => profile.value?.role ?? null)
  const isAdmin = computed(() => role.value === 'admin' || role.value === 'super_admin')
  const isSuperAdmin = computed(() => role.value === 'super_admin')
  const isEmailVerified = computed(() => !!profile.value?.emailConfirmedAt)

  /* Functions */
  function setProfile(p: AuthUser | null) {
    profile.value = p
  }

  function clearProfile() {
    profile.value = null
  }

  /* Return */
  return {
    profile,
    isLoggedIn,
    role,
    isAdmin,
    isSuperAdmin,
    isEmailVerified,
    setProfile,
    clearProfile
  }
})

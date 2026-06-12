export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  const requiredRoles = to.meta.roles as UserRole[] | undefined
  if (!requiredRoles || requiredRoles.length === 0) return // no restriction

  if (!authStore.isLoggedIn) {
    return navigateTo('auth/login')
  }

  const userRole = authStore.role
  if (!userRole || !requiredRoles.includes(userRole)) {
    return navigateTo('/403')
  }
})

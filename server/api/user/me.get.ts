export default defineEventHandler(async (event) => {
  const { user, profile } = await requireAuth(event)

  return {
    id: user.id,
    email: user.email,
    emailConfirmedAt: user.email_confirmed_at,
    username: profile.username,
    role: profile.role,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at
  }
})

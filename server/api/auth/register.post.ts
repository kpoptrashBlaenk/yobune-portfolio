import { SUCCESS_MESSAGE } from '#shared/constants'
import { registerSchema } from '#shared/schemas'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = registerSchema.safeParse(body)

  // validate user input
  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: parsed.error.issues[0]?.message
    })
  }

  const { email, password } = parsed.data

  const admin = useSupabaseAdmin()

  // create auth user and let supabase send confirmation mail
  const { error } = await admin.auth.signUp({
    email,
    password
  })

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  return {
    message: SUCCESS_MESSAGE.register
  }
})

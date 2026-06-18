import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '#shared/constants'
import { confirmSchema } from '#shared/schemas'

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event)
  const body = await readBody(event)
  const parsed = confirmSchema.safeParse(body)

  // validate user input
  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: parsed.error.issues[0]?.message
    })
  }

  const { username } = parsed.data

  // check if username is unique
  const existing = await prisma.profiles.findUnique({ where: { username } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: ERROR_MESSAGE.username.unique })
  }

  // create auth user and let supabase send confirmation mail
  await prisma.profiles.create({
    data: {
      id: user.id,
      username
    }
  })

  return {
    message: SUCCESS_MESSAGE.confirm
  }
})

import z from 'zod'
import { prisma } from '~~/server/utils/prisma'
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '~~/shared/constants'

const schema = z.object({
  email: z.email(ERROR_MESSAGE.email),
  password: z
    .string(ERROR_MESSAGE.password.string)
    .min(8, ERROR_MESSAGE.password.min)
    .max(128, ERROR_MESSAGE.password.max)
    .regex(/[A-Z]/, ERROR_MESSAGE.password.regex.uppercase)
    .regex(/[a-z]/, ERROR_MESSAGE.password.regex.lowercase)
    .regex(/[0-9]/, ERROR_MESSAGE.password.regex.number)
    .regex(/[!@#$%^&*(),.?":{}|<>]/, ERROR_MESSAGE.password.regex.special)
    .refine((val) => !/\s/.test(val), ERROR_MESSAGE.password.regex.spaces),
  username: z
    .string(ERROR_MESSAGE.username.string)
    .min(3, ERROR_MESSAGE.username.min)
    .max(50, ERROR_MESSAGE.username.max)
    .regex(/^[a-zA-Z0-9_-]+$/, ERROR_MESSAGE.username.regex)
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = schema.safeParse(body)

  // validate user input
  if (!parsed.success) {
    throw createError({
      statusCode: 422,
      statusMessage: parsed.error.issues[0]?.message
    })
  }

  const { email, password, username } = parsed.data

  // check if username is unique
  const existing = await prisma.profiles.findUnique({ where: { username } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: ERROR_MESSAGE.username.unique })
  }

  const admin = useSupabaseAdmin()

  // create auth user and let supabase send confirmation mail
  const { data, error } = await admin.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  })

  if (error) {
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  return {
    id: data.user?.id,
    email: data.user?.email,
    message: SUCCESS_MESSAGE.register
  }
})

import z from 'zod'
import { primitives } from './primitives.schema'

export const registerSchema = z.object({
  email: primitives.email,
  password: primitives.password
})

export type RegisterSchema = z.output<typeof registerSchema>

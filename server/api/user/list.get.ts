export default defineEventHandler(async (event) => {
  await requireAuth(event, ['admin', 'super_admin'])

  // extract search query
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 20))
  const skip = (page - 1) * limit

  // find all profiles
  const [profiles, total] = await Promise.all([
    prisma.profiles.findMany({
      skip,
      take: limit,
      orderBy: { created_at: 'desc' }
    }),
    prisma.profiles.count()
  ])

  return {
    data: profiles,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
  }
})

/**
 * Use this function to fetch while giving a loading feedback
 *
 * @param loading The reactive loading boolean
 * @param fn The fetch function to execute
 */
export async function withLoading<T>(loading: Ref<boolean>, fn: () => Promise<T>): Promise<T> {
  loading.value = true
  return fn().finally(() => {
    loading.value = false
  })
}

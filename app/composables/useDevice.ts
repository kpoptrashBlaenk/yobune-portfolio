import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

/**
 * Use breakpoints to find out what device the user is using.
 */
export const useDevice = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind)

  const isMobile = breakpoints.smaller('sm')
  const isTablet = breakpoints.between('sm', 'lg')
  const isDesktop = breakpoints.greaterOrEqual('lg')

  return {
    isMobile,
    isTablet,
    isDesktop
  }
}

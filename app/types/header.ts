import type { NavigationMenuItem } from '@nuxt/ui'

export type CursorConfig = {
  className: string
  storageKey: string
  default: boolean
  trueLabel: string
  falseLabel: string
}

export type HeaderConfig = {
  navigationMenuItems: NavigationMenuItem[]
  cursor: CursorConfig
}

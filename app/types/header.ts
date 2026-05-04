import type { NavigationMenuItem } from '@nuxt/ui'

export type CursorConfig = {
  default: boolean
  trueLabel: string
  falseLabel: string
}

export type NsfwConfig = {
  default: boolean
  label: string
}

export type HeaderConfig = {
  navigationMenuItems: NavigationMenuItem[]
  cursor: CursorConfig
  nsfw: NsfwConfig
}

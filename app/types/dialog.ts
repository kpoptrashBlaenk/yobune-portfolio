export enum DialogId {
  Intro = 'intro',
  Banners = 'banners',
  Animations = 'animations',
  End = 'end'
}

export type DialogRecord = {
  id: DialogId
  dialog: string
  actionLabel?: string
}

export type DialogConfig = {
  defaultActionLabel: string
  speed: number
  image: string
  scenes: DialogRecord[]
}

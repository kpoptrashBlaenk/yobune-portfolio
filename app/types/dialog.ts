export enum DialogId {
  Animations = 'animations',
  Banners = 'banners',
  Characters = 'characters',
  End = 'end',
  Images = 'images',
  Intro = 'intro'
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

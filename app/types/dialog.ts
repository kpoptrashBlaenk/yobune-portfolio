export type DialogRecord = {
  id: string
  dialog: string
  actionLabel?: string
}

export type DialogConfig = {
  defaultActionLabel: string
  speed: number
  image: string
  scenes: DialogRecord[]
}

type GalleryItem = {
  title: string
  image: string
}

export type WorkConfig = {
  timelapse: {
    title: string
    video: string
  }
  quality: {
    title: string
    low: string
    high: string
  }
  process: {
    title: string
    items: GalleryItem[]
  }
}

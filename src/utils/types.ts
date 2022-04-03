export type Episode = {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  description: string
  url: string
  duration: number
  durationString: string
}

export type EpisodeInfo = Pick<
  Episode,
  'title' | 'members' | 'thumbnail' | 'duration' | 'url'
>

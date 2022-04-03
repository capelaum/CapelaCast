import { AllEpisodesTable } from 'components/AllEpisodesTable'
import { LatestEpisodes } from 'components/LatestEpisodes'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from 'styles/home.module.scss'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

export type Episode = {
  id: string
  title: string
  members: string
  publishedAt: string
  thumbnail: string
  url: string
  duration: number
  durationString: string
}

type HomeProps = {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const episodeList = [...latestEpisodes, ...allEpisodes]

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | CapelaCast</title>
      </Head>

      <LatestEpisodes
        latestEpisodes={latestEpisodes}
        episodeList={episodeList}
      />

      <AllEpisodesTable
        allEpisodes={allEpisodes}
        latestEpisodes={latestEpisodes}
        episodeList={episodeList}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      thumbnail: episode.thumbnail,
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationString: convertDurationToTimeString(Number(episode.file.duration))
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 4 // 4h em segundos
  }
}

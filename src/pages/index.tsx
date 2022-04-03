import { AllEpisodesTable } from 'components/AllEpisodesTable'
import { LatestEpisodes } from 'components/LatestEpisodes'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from 'styles/home.module.scss'
import { Episode } from 'utils/types'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

type HomeProps = {
  episodes: Episode[]
}

export default function Home({ episodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | CapelaCast</title>
      </Head>

      <LatestEpisodes episodes={episodes} />

      <AllEpisodesTable episodes={episodes} />
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

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 4 // 4h em segundos
  }
}

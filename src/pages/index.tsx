import { AllEpisodesTable } from 'components/AllEpisodesTable'
import { LatestEpisodes } from 'components/LatestEpisodes'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Head from 'next/head'
import { episodes } from 'services/server'
import styles from 'styles/home.module.scss'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

export default function Home() {
  const formattedEpisodes = episodes.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      thumbnail: episode.thumbnail,
      description: episode.description,
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationString: convertDurationToTimeString(Number(episode.file.duration))
    }
  })

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | CapelaCast</title>
      </Head>

      <LatestEpisodes episodes={formattedEpisodes} />

      <AllEpisodesTable episodes={formattedEpisodes} />
    </div>
  )
}

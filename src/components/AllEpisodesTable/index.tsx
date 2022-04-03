import { Episode } from 'utils/types'
import { EpisodeRow } from './EpisodeRow'
import styles from './styles.module.scss'

interface AllEpisodesTableProps {
  episodes: Episode[]
}

export function AllEpisodesTable({ episodes }: AllEpisodesTableProps) {
  const olderEpisodes = episodes.slice(2, episodes.length)

  return (
    <section className={styles.allEpisodes}>
      <h2>Todos episódios</h2>
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th></th>
            <th className={styles.mobileNone}></th>
            <th className={styles.episodeTitle}>Podcast</th>
            <th className={styles.mobileNone}>Integrantes</th>
            <th className={styles.mobileNone}>Data</th>
            <th className={styles.episodeDuration}>Duração</th>
          </tr>
        </thead>
        <tbody>
          {olderEpisodes.map((episode, index) => (
            <EpisodeRow
              key={episode.id}
              episode={episode}
              index={index}
              episodes={episodes}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

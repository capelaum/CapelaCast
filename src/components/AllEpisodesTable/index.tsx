import { Episode } from 'pages'
import { EpisodeRow } from './Episode'
import styles from './styles.module.scss'

interface AllEpisodesTableProps {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
  episodeList: Episode[]
}

export function AllEpisodesTable({
  allEpisodes,
  episodeList,
  latestEpisodes
}: AllEpisodesTableProps) {
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
          {allEpisodes.map((episode, index) => (
            <EpisodeRow
              episode={episode}
              index={index}
              episodeList={episodeList}
              latestEpisodes={latestEpisodes}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

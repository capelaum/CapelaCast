import { usePlayer } from 'contexts/PlayerContext'
import Image from 'next/image'
import Link from 'next/link'
import { Episode } from 'utils/types'
import styles from './styles.module.scss'

interface LatestEpisodesProps {
  episodes: Episode[]
}

export function LatestEpisodes({ episodes }: LatestEpisodesProps) {
  const { playList } = usePlayer()
  const latestEpisodes = episodes.slice(0, 2)

  return (
    <section className={styles.latestEpisodes}>
      <h2>Últimos lançamentos</h2>
      <ul>
        {latestEpisodes.map((episode, index) => {
          return (
            <li key={episode.id} className={styles.latestEpisode}>
              <Image
                width={180}
                height={180}
                src={episode.thumbnail}
                alt={episode.title}
              />

              <div className={styles.episodeDetails}>
                <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
                <p>{episode.members}</p>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationString}</span>
              </div>

              <button type="button" onClick={() => playList(episodes, index)}>
                <Image
                  src="/play-green.svg"
                  alt="Tocar Episódio"
                  width={20}
                  height={20}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

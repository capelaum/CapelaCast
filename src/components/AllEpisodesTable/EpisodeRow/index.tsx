import { usePlayer } from 'contexts/PlayerContext'
import Image from 'next/image'
import Link from 'next/link'
import { Episode } from 'utils/types'
import styles from './styles.module.scss'

interface EpisodeProps {
  episode: Episode
  episodes: Episode[]
  index: number
}

export function EpisodeRow({ episode, episodes, index }: EpisodeProps) {
  const { playList } = usePlayer()
  const latestEpisodes = episodes.slice(0, 2)

  return (
    <tr className={styles.episode}>
      <td>
        <button
          type="button"
          onClick={() => playList(episodes, index + latestEpisodes.length)}
        >
          <img src="/play-green.svg" alt="Tocar episódio" />
        </button>
      </td>
      <td style={{ width: 72 }} className={styles.mobileNone}>
        <Image
          width={120}
          height={120}
          src={episode.thumbnail}
          alt={episode.title}
          objectFit="cover"
        />
      </td>
      <td>
        <Link href={`/episodes/${episode.id}`}>
          <a>{episode.title}</a>
        </Link>
      </td>
      <td className={styles.mobileNone}>{episode.members}</td>
      <td style={{ width: 100 }} className={styles.mobileNone}>
        {episode.publishedAt}
      </td>
      <td className={styles.episodeDuration}>{episode.durationString}</td>
    </tr>
  )
}

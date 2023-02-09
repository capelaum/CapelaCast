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
          <Image
            src="/play-green.svg"
            alt="Tocar episódio"
            width={20}
            height={20}
          />
        </button>
      </td>
      <td style={{ width: 72 }} className={styles.mobileNone}>
        <Image
          width={120}
          height={120}
          src={episode.thumbnail}
          alt={episode.title}
        />
      </td>
      <td>
        <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
      </td>
      <td className={styles.mobileNone}>{episode.members}</td>
      <td style={{ width: 100 }} className={styles.mobileNone}>
        {episode.publishedAt}
      </td>
      <td className={styles.episodeDuration}>{episode.durationString}</td>
    </tr>
  )
}

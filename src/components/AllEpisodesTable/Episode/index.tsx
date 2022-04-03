import { usePlayer } from 'contexts/PlayerContext'
import Image from 'next/image'
import Link from 'next/link'
import { Episode } from 'pages'
import styles from './styles.module.scss'

interface EpisodeProps {
  episode: Episode
  episodeList: Episode[]
  latestEpisodes: Episode[]
  index: number
}

export function EpisodeRow({
  episode,
  episodeList,
  index,
  latestEpisodes
}: EpisodeProps) {
  const { playList } = usePlayer()

  return (
    <tr key={episode.id} className={styles.episode}>
      <td>
        <button
          type="button"
          onClick={() => playList(episodeList, index + latestEpisodes.length)}
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

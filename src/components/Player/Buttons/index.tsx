import { usePlayer } from 'contexts/PlayerContext'
import Image from 'next/image'
import { EpisodeInfo } from 'utils/types'
import styles from './styles.module.scss'

interface ButtonsProps {
  episode: EpisodeInfo
}

export function Buttons({ episode }: ButtonsProps) {
  const {
    episodeList,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious
  } = usePlayer()

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        disabled={!episode || episodeList.length === 1}
        onClick={toggleShuffle}
        className={isShuffling ? styles.isActive : ''}
      >
        <Image src="/shuffle.svg" alt="Embaralhar" width={20} height={20} />
      </button>

      <button
        type="button"
        onClick={playPrevious}
        disabled={!episode || !hasPrevious}
      >
        <Image
          src="/play-previous.svg"
          alt="Tocar anterior"
          width={20}
          height={20}
        />
      </button>

      <button
        type="button"
        className={styles.playButton}
        disabled={!episode}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Image
            src="/pause.svg"
            alt="Pausar"
            title="pausar"
            width={20}
            height={20}
          />
        ) : (
          <Image
            src="/play.svg"
            alt="Tocar"
            title="play"
            width={28}
            height={28}
          />
        )}
      </button>

      <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
        <Image
          src="/play-next.svg"
          alt="Tocar próxima"
          width={20}
          height={20}
        />
      </button>

      <button
        type="button"
        disabled={!episode}
        onClick={toggleLoop}
        className={isLooping ? styles.isActive : ''}
      >
        <Image src="/repeat.svg" alt="Repetir" width={20} height={20} />
      </button>
    </div>
  )
}

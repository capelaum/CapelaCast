import { usePlayer } from 'contexts/PlayerContext'
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
        <img src="/shuffle.svg" alt="Embaralhar" />
      </button>

      <button
        type="button"
        onClick={playPrevious}
        disabled={!episode || !hasPrevious}
      >
        <img src="/play-previous.svg" alt="Tocar anterior" />
      </button>

      <button
        type="button"
        className={styles.playButton}
        disabled={!episode}
        onClick={togglePlay}
      >
        {isPlaying ? (
          <img src="/pause.svg" alt="Pausar" title="pausar" />
        ) : (
          <img src="/play.svg" alt="Tocar" title="play" />
        )}
      </button>

      <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
        <img src="/play-next.svg" alt="Tocar próxima" />
      </button>

      <button
        type="button"
        disabled={!episode}
        onClick={toggleLoop}
        className={isLooping ? styles.isActive : ''}
      >
        <img src="/repeat.svg" alt="Repetir" />
      </button>
    </div>
  )
}

import Image from 'next/image'
import 'rc-slider/assets/index.css'
import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../../contexts/PlayerContext'
import { Buttons } from './Buttons'
import { Progress } from './Progress'
import styles from './styles.module.scss'

export function Player() {
  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    setPlayingState,
    clearPlayerState,
    playNext,
    hasNext
  } = usePlayer()

  const episode = episodeList[currentEpisodeIndex]
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setProgressListener() {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleProgress(amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  function handleEpisodeEnded() {
    if (hasNext) {
      playNext()
    } else {
      clearPlayerState()
    }
  }

  return (
    <div className={styles.playerContainer}>
      {episode ? (
        <div className={styles.currentEpisode}>
          <div>
            <Image
              width={100}
              height={100}
              src={episode.thumbnail}
              objectFit="cover"
            />
          </div>
          <div className={styles.currentEpisodeDetails}>
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <div className={styles.controls}>
        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            autoPlay
            onEnded={handleEpisodeEnded}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadata={setProgressListener}
          ></audio>
        )}

        <Buttons episode={episode} />

        <Progress
          progress={progress}
          episode={episode}
          handleProgress={handleProgress}
        />
      </div>
    </div>
  )
}

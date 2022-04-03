import { Episode } from 'contexts/PlayerContext'
import Slider from 'rc-slider'
import { convertDurationToTimeString } from 'utils/convertDurationToTimeString'
import styles from './styles.module.scss'

interface ProgressProps {
  episode: Episode
  progress: number
  handleProgress: (amount: number) => void
}

export function Progress({ episode, progress, handleProgress }: ProgressProps) {
  return (
    <div className={styles.progress}>
      <span>{convertDurationToTimeString(progress)}</span>
      <div className={styles.slider}>
        {episode ? (
          <Slider
            max={episode.duration}
            value={progress}
            onChange={handleProgress}
            trackStyle={{ backgroundColor: '#04d361' }}
            railStyle={{ backgroundColor: '#9f75ff' }}
            handleStyle={{ backgroundColor: '#04d361', borderWidth: 3 }}
          />
        ) : (
          <div className={styles.emptySlider} />
        )}
      </div>
      <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
    </div>
  )
}

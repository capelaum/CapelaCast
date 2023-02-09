import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { episodes } from 'services/server'
import { usePlayer } from '../../contexts/PlayerContext'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import styles from './episode.module.scss'

export default function Episodes() {
  const { play } = usePlayer()

  const router = useRouter()

  const { slug } = router.query

  const episode = episodes.find((episode) => episode.id === slug)

  const formattedEpisode = {
    id: episode.id,
    title: episode.title,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR
    }),
    thumbnail: episode.thumbnail,
    description: episode.description,
    url: episode.file.url,
    duration: Number(episode.file.duration),
    durationString: convertDurationToTimeString(Number(episode.file.duration))
  }

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | CapelaCast</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <Image src="/arrow-left.svg" alt="Voltar" width={18} height={18} />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          alt={episode.title}
        />
        <button type="button" onClick={() => play(formattedEpisode)}>
          <Image src="/play.svg" alt="Tocar episódio" width={30} height={30} />
        </button>
      </div>

      <header>
        <h1>{formattedEpisode.title}</h1>
        <span>{formattedEpisode.members}</span>
        <span>{formattedEpisode.publishedAt}</span>
        <span>{formattedEpisode.durationString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: formattedEpisode.description }} // necessario para não haver code injection
      />
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await api.get('episodes', {
//     params: {
//       _limit: 2,
//       _sort: 'published_at',
//       _order: 'desc'
//     }
//   })

//   const paths = data.map((episode) => {
//     return {
//       params: {
//         slug: episode.id
//       }
//     }
//   })

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { slug } = context.params
//   const { data } = await api.get(`/episodes/${slug}`)

//   const episode = {
//     id: data.id,
//     title: data.title,
//     members: data.members,
//     publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
//       locale: ptBR
//     }),
//     thumbnail: data.thumbnail,
//     description: data.description,
//     url: data.file.url,
//     duration: Number(data.file.duration),
//     durationString: convertDurationToTimeString(Number(data.file.duration))
//   }

//   return {
//     props: {
//       episode
//     },
//     revalidate: 60 * 60 * 24 // 24h em segundos
//   }
// }

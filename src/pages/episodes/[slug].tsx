import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { api } from "../../services/api";
import { converDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { usePlayer } from "../../contexts/PlayerContext";

import styles from "./episode.module.scss";

type Episode = {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  url: string;
  duration: number;
  durationString: string;
};

type EpisodeProps = {
  episode: Episode;
};

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer();

  return (
    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }} // necessario para não haver code injection
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = data.map(episode => {
    return {
      params: {
        slug: episode.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const { data } = await api.get(`/episodes/${slug}`);

  const episode = {
    id: data.id,
    title: data.title,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    thumbnail: data.thumbnail,
    description: data.description,
    url: data.file.url,
    duration: Number(data.file.duration),
    durationString: converDurationToTimeString(Number(data.file.duration)),
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24h em segundos
  };
};
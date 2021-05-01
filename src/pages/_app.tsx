import "../styles/global.scss";

import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContext, PlayerContextProvider } from "../contexts/PlayerContext";

import styles from "../styles/app.module.scss";
import Head  from "next/head";

function MyApp({ Component, pageProps }) {
  return(
    <>
    <Head>
      <title>CapelaCast</title>
    </Head>
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
    </>
  );
}

export default MyApp;

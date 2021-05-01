import Document, { Html, Head, Main, NextScript } from 'next/document';

// customizar index.html que fica por volta do app -> carregado 1 vez apenas

export default class MyDocument extends Document {
  render () {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon"></link>
          <title>CapelaCast</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
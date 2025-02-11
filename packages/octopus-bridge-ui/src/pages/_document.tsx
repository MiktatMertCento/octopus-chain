import { Html, Head, Main, NextScript } from 'next/document'

export const siteTitle = 'O3Layer Testnet'
const siteDomain = 'https://app.testnet.o3layer.com/'
const siteDescription = 'O3Layer Chain Bridge Ui'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/o3logo.png" />
        {/* <link rel="icon" href="/o3-logo.png" /> */}

        <meta name="theme-color" content="#1D1D2B" />
        <meta name="description" content={siteDescription} />
        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={siteDomain} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={`${siteDomain}/bg-image.png`} />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="bridge.arbitrum.io" />
        <meta property="twitter:url" content={siteDomain} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteDomain}/bg-image.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

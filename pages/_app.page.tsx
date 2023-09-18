import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Instrument_Sans } from '@next/font/google';

const instrumentSansFont = Instrument_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
      :root {
        --instrument-sans-font: ${instrumentSansFont.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
  </>;
}

export default MyApp

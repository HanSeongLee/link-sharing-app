import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Instrument_Sans } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';

const instrumentSansFont = Instrument_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return <>
    <style jsx global>{`
      :root {
        --instrument-sans-font: ${instrumentSansFont.style.fontFamily};
      }
    `}</style>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </>;
}

export default MyApp

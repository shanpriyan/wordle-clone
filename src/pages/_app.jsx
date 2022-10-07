import Script from 'next/script';
import '../styles/globals.css';
import {ToastProvider, WordleProvider, ModalProvider} from '@contexts';

export default function App({Component, pageProps}) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="lazyOnload"
      />

      <Script id="ga" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || []
        function gtag() {
          dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}',
        { path: window.location.pathname })`}
      </Script>
      <WordleProvider>
        <ToastProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </ToastProvider>
      </WordleProvider>
    </>
  );
}

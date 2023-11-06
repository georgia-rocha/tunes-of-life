import type { AppProps } from 'next/app';
 
export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <style>
    {`
    * {
      font-family: sans-serif;
    }
    `}
    </style>
    <Component {...pageProps} />
  </>

  ) 
}
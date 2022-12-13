import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.rtl.css";
import { useEffect } from "react";
import { ThemeProvider } from "react-bootstrap";
import Head from "next/head";
//====================================================

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider dir="rtl">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

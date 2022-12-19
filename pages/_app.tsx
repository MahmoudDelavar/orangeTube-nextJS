import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.rtl.css";
import { useEffect } from "react";
import { ThemeProvider } from "react-bootstrap";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../state_management/store";
import Layout from "../components/util/views/layout";
import Navigationbar from "../components/util/views/nabar";

//====================================================

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <ThemeProvider dir="rtl">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Provider>
    </>
  );
}

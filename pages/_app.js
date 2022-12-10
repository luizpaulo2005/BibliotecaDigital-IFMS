import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, React } from "react";
import { AuthContextProvider } from "../components/AuthContext&ReducerContext/AuthFunctions";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="white" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="icons/icon-192x192.png" />
      <link rel="icon" href="icons/icon-192x192.png"></link>
    </Head>
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  </>
  );
}

export default MyApp;

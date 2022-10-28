import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, React } from "react";
import { AuthContextProvider } from "./posts/admin/login/login";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return <AuthContextProvider><Component {...pageProps} /></AuthContextProvider>;
}

export default MyApp;

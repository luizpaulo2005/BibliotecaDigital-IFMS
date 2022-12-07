import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, React } from "react";
import { AuthContextProvider } from "../components/AuthContext&ReducerContext/AuthFunctions";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    //Aqui eu espalho o status do usuário pela aplicação
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;

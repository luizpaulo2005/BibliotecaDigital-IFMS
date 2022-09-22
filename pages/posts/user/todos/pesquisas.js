import Head from "next/head";
import axios from "axios"
import TabelaPesquisas from "../../../components/user/pesquisas";
import HDPagInicial from "../../../components/header/paginicial";

export const getStaticProps = async () => {
    const response = await axios.get('https://BackEnd-ORM-TCC.undertak3r.repl.co/tcc')
    const pesquisas = await response.data
    return {
      props: {
        pesquisas
      }
    }
  }

export default function TodasPesquisas({pesquisas}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Pesquisas</title>
            </Head>
            <HDPagInicial/>
            <div className="container border rounded mt-2 p-3">
                <TabelaPesquisas pesquisas={pesquisas}/>
            </div>
        </div>
    )
}
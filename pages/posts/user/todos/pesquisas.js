import Head from "next/head";
import axios from "axios"
import HDPagInicial from "../../../components/header/paginicial";
import { apiurl } from "../../../api/apiurl";
import { format, parseISO } from "date-fns";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/pesquisa')
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
            <table className="table">
        <thead>
        <tr>
        <th>Titulo</th>
        <th>Discentes</th>
        <th>Orientador(es)</th>
        <th>Data de Apresentação</th>
        <th>PDF</th>
        </tr>
        </thead>
        <tbody>
        {pesquisas.map(({id, titulo, discenteId, docenteId, data_apresentacao, url_download})=> (
          <tr key={id}>
          <td>{titulo}</td>
          <td>{discenteId}</td>
          <td>{docenteId}</td>
          <td>{/*format(parseISO(*/data_apresentacao/*), 'dd/MM/yyyy')*/}</td>
          <td>{url_download}</td>
          </tr>
        ))}
        
        </tbody>   
        </table>
            </div>
        </div>
    )
}
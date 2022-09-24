import Head from "next/head";
import axios from "axios"
import HDPagInicial from "../../../components/header/paginicial";
import { apiurl } from "../../../api/apiurl";

// export const getStaticProps = async () => {
//     const response = await axios.get('https://biblioteca-digital-backend.undertak3r.repl.co/pesquisa')
//     const pesquisas = await response.data
//     return {
//       props: {
//         pesquisas
//       }
//     }
//   }

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
        {/* {pesquisas.map(({id, titulo, discente, docente, data_apresentacao, link_download})=> (
          <tr key={id}>
          <td>{titulo}</td>
          <td>{discente}</td>
          <td>{docente}</td>
          <td>{data_apresentacao}</td>
          <td>{link_download}</td>
          </tr>
        ))} */}
          <tr>
          <td>Titulo</td>
          <td>Nome do Discente</td>
          <td>Nome do Docente</td>
          <td>01/01/2022</td>
          <td>Download</td>
          </tr>
          <tr>
          <td>Titulo</td>
          <td>Nome do Discente</td>
          <td>Nome do Docente</td>
          <td>01/01/2022</td>
          <td>Download</td>
          </tr>
          <tr>
          <td>Titulo</td>
          <td>Nome do Discente</td>
          <td>Nome do Docente</td>
          <td>01/01/2022</td>
          <td>Download</td>
          </tr>
          <tr>
          <td>Titulo</td>
          <td>Nome do Discente</td>
          <td>Nome do Docente</td>
          <td>01/01/2022</td>
          <td>Download</td>
          </tr>
          <tr>
          <td>Titulo</td>
          <td>Nome do Discente</td>
          <td>Nome do Docente</td>
          <td>01/01/2022</td>
          <td>Download</td>
          </tr>
          <tr>
          <td>Titulo</td>
          <td>Nome do Discente</td>
          <td>Nome do Docente</td>
          <td>01/01/2022</td>
          <td>Download</td>
          </tr>
          <tr>
          <td>Titulo</td>
          <td>Nome do Discente</td>
          <td>Nome do Docente</td>
          <td>01/01/2022</td>
          <td>Download</td>
          </tr>

        </tbody>   
        </table>
            </div>
        </div>
    )
}
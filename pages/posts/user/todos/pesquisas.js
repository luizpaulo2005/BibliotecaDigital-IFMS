import Head from "next/head";
import axios from "axios"
import HDPagInicial from "../../../components/header/paginicial";
import { apiurl } from "../../../api/apiurl";
import { format, parseISO } from "date-fns";
import { useState,useEffect } from "react";

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
const [consulta, setConsulta] = useState("")

const keys = ["titulo"]

const filtro = (item) => {
  return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
}


const pesquisasfiltradas = pesquisas
const consultaGeral = consulta.toLowerCase()

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Pesquisas</title>
            </Head>
            <HDPagInicial/>
           
             <div class="container mt-2">
              <form class="d-flex" role="search">
               <input class="form-control filtro" type="search" placeholder="Pesquisar" aria-label="Search"  onChange={(e) => setConsulta(e.target.value)} />
             </form>
            </div>
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
        {filtro(pesquisas).map(({id, titulo, discenteId, docenteId, data_apresentacao, url_download})=> (
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
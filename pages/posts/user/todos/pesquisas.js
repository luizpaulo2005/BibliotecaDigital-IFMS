import Head from "next/head";
import axios from "axios"
import HDPagInicial from "../../../components/header/paginicial";
import { format, parseISO } from "date-fns";
import { useState,useEffect } from "react";
import Link from "next/link";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/pesquisa')
    const pesquisas = await response.data
    return {
      props: {
        pesquisas
      },
      revalidate: 300
    }
  }

export default function TodasPesquisas({pesquisas}){
const [consulta, setConsulta] = useState("")
const [itensporPagina, setItensporPagina] = useState(10)
const [paginasRecorrentes, setPaginasRecorrentes] = useState(0)

const keys = ["titulo"]

const filtro = (item) => {
  return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
}


const consultaGeral = consulta.toLowerCase()
const paginas = Math.ceil(filtro(pesquisas).length / itensporPagina)
const startIndex = paginasRecorrentes * itensporPagina
const endIndex = startIndex + itensporPagina
const pesquisasfiltradas = filtro(pesquisas).slice(startIndex, endIndex)



useEffect(()=>{setPaginasRecorrentes(0)}, [setItensporPagina])

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Pesquisas</title>
            </Head>
            <HDPagInicial/>
           
             <div className="container mt-2">
              <form className="d-flex" role="search">
               <input className="form-control filtro" type="search" placeholder="Pesquisar" aria-label="Search"  onChange={(e) => setConsulta(e.target.value)} />
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
        {pesquisasfiltradas.map(({id, titulo, data_apresentacao, discente, docente})=> (
          <tr key={id}>
          <td><Link href={`/posts/user/solo/pesquisa/${id}`}><a className="list-group-item">{titulo}</a></Link></td>
          <td>{discente.nome}</td>
          <td>{docente.nome}</td>
          <td>{format(parseISO(data_apresentacao), 'dd/MM/yyyy')}</td>
          <td>
            <a className="btn btn-sm btn-primary" href={`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/download/${id}`}>Download</a>
          </td>
          </tr>
        ))}
        
        </tbody>   
        </table>
        

        <center>

<div>{Array.from(Array(paginas), (pesquisasfiltradas, index) =>{
return <button type="button" className="btn btn-outline-dark" key={index} value={index} onClick={(e) =>setPaginasRecorrentes
(Number(e.target.value))}>{index + 1}</button>})}
</div>
</center>
<center>
<form>
    <span>Trabalhos por página: </span>       
    
  <select onChange={(e) => setItensporPagina(Number(e.target.value))}>
    <option value={5}>5</option>
    <option selected value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
  </select>
</form>
</center>


            </div>
        </div>
    )
}
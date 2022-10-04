import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import HDPagInicial from "../../../components/header/paginicial";
import { useState } from "react";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/docente')
    const docentes = await response.data
    return {
      props: {
        docentes
      },
      revalidate: 3600
    }
  }

export default function TodosDocentes({docentes}){
const [consulta, setConsulta] = useState("")
const [itensporPagina, setItensporPagina] = useState(10)
const [paginasRecorrentes, setPaginasRecorrentes] = useState(0)

const keys = ["nome"]

const filtro = (item) => {
    return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
  }


  const consultaGeral = consulta.toLowerCase()
  const paginas = Math.ceil(filtro(docentes).length / itensporPagina)
  const startIndex = paginasRecorrentes * itensporPagina
  const endIndex = startIndex + itensporPagina
  const docentesfiltrados = filtro(docentes).slice(startIndex, endIndex)

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Docentes</title>
            </Head>
            <HDPagInicial/>
            <div className="container mt-2">
              <form className="d-flex" role="search">
               <input className="form-control filtro" type="search" placeholder="Pesquisar" aria-label="Search"  onChange={(e) => setConsulta(e.target.value)} />
             </form>
            </div>
            <div className="container border rounded p-3 mt-2">
            <table className="table">
        <thead>
            <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Formação</th>
            </tr>
        </thead>
        <tbody>
        {docentesfiltrados.map(({id, nome, email, cpf, data_nascimento, formacao})=>(
            <tr key={id}>
                <td><Link href={`/posts/solo/docente/${id}`}><a>{nome}</a></Link></td>
                <td>{email}</td>
                <td>{cpf}</td>
                <td>{format(parseISO(data_nascimento), 'dd/MM/yyyy')}</td>
                <td>{formacao}</td>
            </tr>
        ))}
        </tbody>
        </table>

        <center>

<div>{Array.from(Array(paginas), (docentesfiltrados, index) =>{
return <button type="button" className="btn btn-outline-dark" key={index} value={index} onClick={(e) =>setPaginasRecorrentes
(Number(e.target.value))}>{index + 1}</button>})}
</div>
</center>
<center>
<form>
    <span>Professores por página: </span>       
    
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
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../components/header/paginicial";
import { format, parseISO } from "date-fns";
import { useState,useEffect } from "react";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/discente')
    const discentes = await response.data
    return {
      props: {
        discentes
      },
      revalidate: 3600
    }
  }

export default function TodosDiscentes({discentes}){
const [consulta, setConsulta] = useState("")
const [itensporPagina, setItensporPagina] = useState(10)
const [paginasRecorrentes, setPaginasRecorrentes] = useState(0)

const keys = ["nome"]

const filtro = (item) => {
  return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
}



const consultaGeral = consulta.toLowerCase()
const paginas = Math.ceil(filtro(discentes).length / itensporPagina)
const startIndex = paginasRecorrentes * itensporPagina
const endIndex = startIndex + itensporPagina
const discentesfiltrados = filtro(discentes).slice(startIndex, endIndex)



useEffect(()=>{setPaginasRecorrentes(0)}, [setItensporPagina])
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Alunos</title>
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
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Nascimento</th>
            </tr>
        </thead>
        <tbody>
        {discentesfiltrados.map(({id, nome, email, data_nascimento})=>(
        <tr key={id}>
            <td><Link href={`/posts/user/solo/discente/${id}`}><a className="list-group-item">{nome}</a></Link></td>
            <td>{email}</td>
            <td>{format(parseISO(data_nascimento), 'dd/MM/yyyy')}</td>
        </tr>
        ))}
        </tbody>
        </table>

        <center>

<div>{Array.from(Array(paginas), (discentesfiltrados, index) =>{
return <button type="button" className="btn btn-outline-dark" key={index} value={index} onClick={(e) =>setPaginasRecorrentes
(Number(e.target.value))}>{index + 1}</button>})}
</div>
</center>
<center>
<form>
    <span>Alunos por página: </span>       
    
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
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { useState,useEffect } from "react";
import HDPagAdmin from "../../../components/header/pagadmin";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

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

let router = useRouter();

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

const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target
    const data = {
      id: Number(id)
    }
    const response = await axios.delete(`https://databasebibliotecadigital.undertak3r.repl.co/discente/${id}`)
    if (!response.statusText === "OK") {
        toast.error("Erro ao excluir o aluno");
      } else {
        router.push('/posts/admin/todos/discente')
        toast.success("Aluno excluído com sucesso")
      }
    }

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Alunos</title>
            </Head>
            <HDPagAdmin/>
            <ToastContainer/>
            <div className="container mt-2">
              <form className="d-flex" role="search">
               <input className="form-control filtro" type="search" placeholder="Pesquisar" aria-label="Search"  onChange={(e) => setConsulta(e.target.value)} />
             </form>
            </div>
            <div className="container border rounded mt-2 p-3">
            <table className="table">
        <thead>
            <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
            </tr>
        </thead>
        <tbody>
        {discentesfiltrados.map(({id, nome, email, data_nascimento})=>(
        <tr key={id}>
            <th scope="row">{id}</th>
            <td><Link href={`/posts/admin/solo/discente/${id}`}><a className="list-group-item">{nome}</a></Link></td>
            <td>{email}</td>
            <td>
               <Link href={`/posts/admin/alterar/discentes/${id}`}><button className="btn btn-sm btn-secondary me-1">Alterar</button></Link>
                <button className="btn btn-sm btn-danger" onClick={handleDelete} id={id}>Apagar</button>
            </td>
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
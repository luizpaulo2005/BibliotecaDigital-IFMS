import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../components/header/pagadmin";
import Link from "next/link";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/curso');
    const cursos = await response.data;
    return{
        props:{
            cursos
        },
        revalidate: 3600
    }
}

export default function TodosCursos({cursos}){

  let router = useRouter();

  const [consulta, setConsulta] = useState("")
  const [itensporPagina, setItensporPagina] = useState(10)
  const [paginasRecorrentes, setPaginasRecorrentes] = useState(0)


  const keys = ["nome"]

  const filtro= (item) => {
    return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
  }

  const consultaGeral = consulta.toLowerCase()
  const paginas = Math.ceil(filtro(cursos).length / itensporPagina)
  const startIndex = paginasRecorrentes * itensporPagina
  const endIndex = startIndex + itensporPagina
  const cursosfiltrados = filtro(cursos).slice(startIndex, endIndex)
  
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target
    const data = {
      id: Number(id)
    }
    const response = await axios.delete(`https://databasebibliotecadigital.undertak3r.repl.co/curso/${id}`)
    if (!response.statusText === "OK") {
        toast.error("Erro ao excluir o curso");
      } else {
        router.push('/posts/admin/todos/curso')
        toast.success("Curso excluído com sucesso")
      }
    }

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Cursos</title>
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
                            <th>Grade</th>
                            <th>Duração</th>
                            <th>Campus</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cursosfiltrados.map(({id, nome, grade, duracao, campusId})=> (
                        <tr key={id}>
                            <th scope="row">{id}</th>
                            <td>{nome}</td>
                            <td>{grade}</td>
                            <td>{duracao}</td>
                            <td>{campusId}</td>
                            <td>
                            <Link href={`/posts/admin/alterar/cursos/${id}`}><button className="btn btn-sm btn-secondary me-1">Alterar</button></Link>
                                <button className="btn btn-sm btn-danger" onClick={handleDelete} id={id}>Apagar</button>
                            </td>
                        </tr>
                    ) )}
                    </tbody>
                </table>

                <center>

<div>{Array.from(Array(paginas), (cursosfiltrados, index) =>{
return <button type="button" className="btn btn-outline-dark" key={index} value={index} onClick={(e) =>setPaginasRecorrentes
(Number(e.target.value))}>{index + 1}</button>})}
</div>
</center>
<center>
<form>
    <span>Cursos por página: </span>       
    
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
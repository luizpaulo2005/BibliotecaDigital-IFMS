import axios from "axios";
import Head from "next/head";
import HDPagInicial from "../../../components/header/paginicial";
import { useState } from "react";

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
  
  
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Cursos</title>
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
                            <th>Grade</th>
                            <th>Duração</th>
                            <th>Campus</th>
                        </tr>
                    </thead>
                    <tbody>
                    {cursosfiltrados.map(({id, nome, grade, duracao, campusId})=> (
                        <tr key={id}>
                            <td>{nome}</td>
                            <td>{grade}</td>
                            <td>{duracao}</td>
                            <td>{campusId}</td>
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
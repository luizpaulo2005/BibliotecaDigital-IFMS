import axios from "axios";
import Head from "next/head";
import HDPagInicial from "../../../components/header/paginicial";
import { useState } from "react";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/curso');
    const curso = await response.data;
    return{
        props:{
            curso
        }
    }
}

export default function TodosCursos({curso}){
  const [consulta, setConsulta] = useState("")
  const keys = ["nome"]

  const filtro= (item) => {
    return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
  }
  const campusfiltrados = curso
  const consultaGeral = consulta.toLowerCase()
  
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
                    {filtro(curso).map(({id, nome, grade, duracao, campusId})=> (
                        <tr key={id}>
                            <td>{nome}</td>
                            <td>{grade}</td>
                            <td>{duracao}</td>
                            <td>{campusId}</td>
                        </tr>
                    ) )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
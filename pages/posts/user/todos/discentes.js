import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../components/header/paginicial";
import { format, parseISO } from "date-fns";
import { useState } from "react";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/discente')
    const discentes = await response.data
    return {
      props: {
        discentes
      }
    }
  }

export default function TodosDiscentes({discentes}){
const [consulta, setConsulta] = useState("")

const keys = ["nome"]

const filtro = (item) => {
  return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
}


const discentesfiltrados = discentes
const consultaGeral = consulta.toLowerCase()
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Alunos</title>
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
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Nascimento</th>
            </tr>
        </thead>
        <tbody>
        {filtro(discentes).map(({id, nome, email, data_nascimento})=>(
        <tr key={id}>
            <td><Link href={`/posts/solo/discente/${id}`}><a>{nome}</a></Link></td>
            <td>{email}</td>
            <td>{format(parseISO(data_nascimento), 'dd/MM/yyyy')}</td>
        </tr>
        ))}
        </tbody>
        </table>
            </div>
        </div>
    )
}
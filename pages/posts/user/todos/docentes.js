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
      }
    }
  }

export default function TodosDocentes({docentes}){
const [consulta, setConsulta] = useState("")

const keys = ["nome"]

const filtro = (item) => {
    return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
  }


const docentesfiltrados = docentes
const consultaGeral = consulta.toLowerCase()

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Docentes</title>
            </Head>
            <HDPagInicial/>
            <div class="container mt-2">
              <form class="d-flex" role="search">
               <input class="form-control filtro" type="search" placeholder="Pesquisar" aria-label="Search"  onChange={(e) => setConsulta(e.target.value)} />
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
        {filtro(docentes).map(({id, nome, email, cpf, data_nascimento, formacao})=>(
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
            </div>
        </div>
    )
}
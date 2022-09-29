import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../components/header/paginicial";
import { format, parseISO } from "date-fns";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/discente')
    const attributes = await response.data
    return {
      props: {
        attributes
      }
    }
  }

export default function TodosDiscentes({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Alunos</title>
            </Head>
            <HDPagInicial/>
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
        {attributes.map(({id, nome, email, data_nascimento})=>(
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
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../components/header/paginicial";

// export const getStaticProps = async () => {
//     const response = await axios.get('https://biblioteca-digital-backend.undertak3r.repl.co/docente')
//     const attributes = await response.data
//     return {
//       props: {
//         attributes
//       }
//     }
//   }

export default function TodosDocentes({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Docentes</title>
            </Head>
            <HDPagInicial/>
            <div className="container border rounded p-3 mt-2">
            <table className="table">
        <thead>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Formação</th>
            <th>Campus</th>
        </thead>
        <tbody>
        {/* {attributes.map(({id, nome, email, cpf, data_nascimento, formacao, campusId})=>(
            <tr key={id}>
                <td><Link href={`/posts/solo/docente/${id}`}><a>{nome}</a></Link></td>
                <td>{email}</td>
                <td>{cpf}</td>
                <td>{data_nascimento}</td>
                <td>{formacao}</td>
                <td>{campusId}</td>
            </tr>
        ))} */}
        </tbody>
        </table>
            </div>
        </div>
    )
}
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../components/header/paginicial";

// export const getStaticProps = async () => {
//     const response = await axios.get('https://biblioteca-digital-backend.undertak3r.repl.co/pesquisa')
//     const attributes = await response.data
//     return {
//       props: {
//         attributes
//       }
//     }
//   }

export default function TodosDiscentes({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Discentes</title>
            </Head>
            <HDPagInicial/>
            <div className="container border mt-3 p-2">
            <table className="table">
        <thead>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>Campus</th>
            <th>Curso</th>
        </thead>
        <tbody>
        {/* {attributes.map(({id, nome, email, datanascimento, cpf, campusId, cursoId})=>(
        <tr key={id}>
            <td><Link href={`/posts/solo/discente/${id}`}><a>{nome}</a></Link></td>
            <td>{email}</td>
            <td>{datanascimento}</td>
            <td>{cpf}</td>
            <td>{campusId}</td>
            <td>{cursoId}</td>
        </tr>
        ))} */}
        </tbody>
        </table>
            </div>
        </div>
    )
}
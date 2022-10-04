import axios from "axios";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../components/header/pagadmin";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/matricula')
    const attributes = await response.data;
    return{
        props: {
            attributes
        },
        revalidate: 3600
    }
}

export default function TodasMatriculas({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Matriculas</title>
            </Head>
            <HDPagAdmin/>
            <ToastContainer/>
            <div className="container border rounded p-3 mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data de Início</th>
                            <th>Curso</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attributes.map(({id, data_inicio, cursoId}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{data_inicio}</td>
                                <td>{cursoId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
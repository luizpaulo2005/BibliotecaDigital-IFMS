import axios from "axios";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../components/header/pagadmin";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/matricula')
    const attributes = await response.data;
    return{
        props: {
            attributes
        },
        revalidate: 300
    }
}

export default function TodasMatriculas({attributes}){

    const handleDelete = async (e) => {
        e.preventDefault();
        const { id } = e.target
        const data = {
          id: Number(id)
        }
        const response = await axios.delete(`https://databasebibliotecadigital.undertak3r.repl.co/matricula/${id}`)
        if (!response.statusText === "OK") {
            toast.error("Erro ao excluir a matrícula");
          } else {
            router.push('/posts/admin/todos/matricula')
            toast.success("Matrícula excluída com sucesso")
          }
        }

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
                        {attributes.map(({id, data_inicio, curso}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{format(parseISO(data_inicio), 'dd/MM/yyyy')}</td>
                                <td>{curso.nome}</td>
                                <td>
                                <Link href={`/posts/admin/alterar/matricula/${id}`}><button className="btn btn-sm btn-secondary me-1">Alterar</button></Link>
                                <button className="btn btn-sm btn-danger" onClick={handleDelete} id={id}>Apagar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
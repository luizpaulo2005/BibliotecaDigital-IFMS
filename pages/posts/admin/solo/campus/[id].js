import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagAdmin from "../../../../components/header/pagadmin";

export const getServerSideProps = async (context) =>{
    const id = context.query.id
    const response = await axios.get(`https://databasebibliotecadigital.undertak3r.repl.co/campus/${id}`)
    const attributes = response.data
    return {
        props: {
            attributes
        }
    }
}

export default function SoloCampus({attributes}){

    const handleDelete = async (e) => {
        e.preventDefault();
        const { id } = e.target
        const data = {
          id: Number(id)
        }
        const response = await axios.delete(`https://databasebibliotecadigital.undertak3r.repl.co/campus/${id}`)
        if (!response.statusText === "OK") {
            toast.error("Erro ao excluir o campus");
          } else {
            router.push('/posts/admin/todos/campus')
            toast.success("Campus excluído com sucesso")
          }
        }

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>{attributes.nome}</title>
            </Head>
            <HDPagAdmin/>
            <div className="container rounded p-3 mt-2">
            <div className="card">
                    <div className="card-header">Nome: {attributes.nome}</div>
                    <div className="card-body">
                    <p className="card-text">Cidade: {attributes.cidade}</p>
                    <p className="card-text">Estado: {attributes.estado}</p>
                    <p className="card-text">E-mail: {attributes.email}</p>
                    <Link href="/posts/admin/todos/campus"><a className="btn btn-sm btn-secondary">Página Anterior</a></Link>
                    <Link href={`/posts/admin/alterar/campus/${id}`}><button className="btn btn-sm btn-secondary me-1">Alterar</button></Link>
                    <button className="btn btn-sm btn-danger" onClick={handleDelete} id={id}>Apagar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
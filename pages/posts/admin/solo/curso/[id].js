import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import HDPagAdmin from "../../../../components/header/pagadmin"

export const getServerSideProps = async (context) => {
    const id = context.query.id
    const response = await axios.get(`https://databasebibliotecadigital.undertak3r.repl.co/curso/${id}`)
    const attributes = await response.data
    return {
        props: {
            attributes
        }
    }
}   

export default function SoloCursoAdmin({attributes}){

    const handleDelete = async (e) => {
        e.preventDefault();
        const { id } = e.target
        const data = {
          id: Number(id)
        }
        const response = await axios.delete(`https://databasebibliotecadigital.undertak3r.repl.co/curso/${id}`)
        if (!response.statusText === "OK") {
            toast.error("Erro ao excluir o curso");
          } else {
            router.push('/posts/admin/todos/curso')
            toast.success("Curso excluído com sucesso")
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
                <div className="card-header">
                Nome: {attributes.nome}
                </div>
                <div className="card-body">
                    <p>Grade: {attributes.grade}</p>
                    <p>Duração: {attributes.duracao}</p>
                    <p>Campus: {attributes.campusId}</p>
                    <Link href="/posts/admin/todos/curso"><a className="btn btn-sm btn-secondary me-1">Página Anterior</a></Link>
                    <Link href={`/posts/admin/alterar/curso/${attributes.id}`}><button className="btn btn-sm btn-secondary me-1">Alterar</button></Link>
                    <button className="btn btn-sm btn-danger" onClick={handleDelete} id={attributes.id}>Apagar</button>
                </div>
            </div>           
            </div>

        </div>
    )
}
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import HDPagInicial from "../../../../components/header/paginicial"

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

export default function SoloCurso({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>{attributes.nome}</title>
            </Head>
            <HDPagInicial/>
            <div className="container rounded p-3 mt-2">
            <div className="card">
                <div className="card-header">
                Nome: {attributes.nome}
                </div>
                <div className="card-body">
                    <p>Grade: {attributes.grade}</p>
                    <p>Duração: {attributes.duracao}</p>
                    <p>Campus: {attributes.campusId}</p>
                    <Link href="/posts/user/todos/curso"><a className="btn btn-sm btn-secondary">Página Anterior</a></Link>
                </div>
            </div>           
            </div>

        </div>
    )
}
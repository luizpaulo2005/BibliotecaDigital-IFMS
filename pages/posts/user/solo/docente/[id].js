import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import HDPagInicial from "../../../../components/header/paginicial"

export const getServerSideProps = async (context) =>{
    const id = context.query.id
    const response = await axios.get(`https://databasebibliotecadigital.undertak3r.repl.co/docente/${id}`)
    const attributes = await response.data
    return{
        props: {
            attributes
        }
    }
}

export default function SoloDocente({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>{attributes.nome}</title>
            </Head>
            <HDPagInicial/>
            <div className="container rounded p-3 mt-2">
                <div className="card">
                    <div className="card-header">{attributes.nome}</div>
                    <div className="card-body">
                    <p className="card-text">SIAPE: {attributes.siape}</p>
                    <p className="card-text">E-mail: {attributes.email}</p>
                    <p className="card-text">Data de Nascimento: {attributes.data_nascimento}</p>
                    <p className="card-text">CPF: {attributes.cpf}</p>
                    <p className="card-text">Formação: {attributes.formacao}</p>   
                    <Link href="/posts/user/todos/docentes"><a className="btn btn-sm btn-secondary">Página Anterior</a></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../../components/header/paginicial";

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
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>{attributes.nome}</title>
            </Head>
            <HDPagInicial/>
            <div className="container rounded p-3 mt-2">
            <div className="card">
                    <div className="card-header">Nome: {attributes.nome}</div>
                    <div className="card-body">
                    <p className="card-text">Cidade: {attributes.cidade}</p>
                    <p className="card-text">Estado: {attributes.estado}</p>
                    <p className="card-text">E-mail: {attributes.email}</p>
                    <Link href="/posts/user/todos/campus"><a className="btn btn-sm btn-secondary m-1">Página Anterior</a></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
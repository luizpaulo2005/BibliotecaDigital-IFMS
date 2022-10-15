import axios from "axios"
import { format, parseISO } from "date-fns"
import Head from "next/head"
import HDPagInicial from "../../../../components/header/paginicial"

export const getServerSideProps = async (context) =>{
    const id = context.query.id
    const response = await axios.get(`https://databasebibliotecadigital.undertak3r.repl.co/discente/${id}`)
    const attributes = await response.data
    return{
        props: {
            attributes
        }
    }
}

export default function SoloDiscente({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>{attributes.nome}</title>
            </Head>
            <HDPagInicial/>
            <div className="container rounded mt-2 p-3">
                <div className="card">
                <div className="card-header">{attributes.nome}</div>
                <div className="card-body">
                <p className="card-text">Matrícula: {attributes.matriculaId}</p>
                <p className="card-text">E-mail: {attributes.email}</p>
                <p className="card-text">Data de Nascimento: {format(parseISO(attributes.data_nascimento), 'dd/MM/yyyy')}</p>
                <p className="card-text">CPF: {attributes.cpf}</p>
                </div>
                </div>

            </div>
        </div>
    )
}
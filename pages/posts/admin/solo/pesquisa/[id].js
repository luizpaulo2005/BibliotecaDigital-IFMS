import axios from "axios"
import { format, parseISO } from "date-fns"
import Head from "next/head"
import Link from "next/link"
import HDPagAdmin from "../../../../components/header/pagadmin"

export const getServerSideProps = async (context) =>{
    const id = context.query.id
    const response = await axios.get(`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/${id}`)
    const attributes = await response.data
    return {
        props: {
            attributes
        }
    }
}

export default function SoloPesquisaAdmin({attributes}){

    const handleDelete = async (e) => {
        e.preventDefault();
        const { id } = e.target
        const data = {
          id: Number(id)
        }
        const response = await axios.delete(`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/${id}`)
        if (!response.statusText === "OK") {
            toast.error("Erro ao excluir a pesquisa");
          } else {
            router.push('/posts/admin/todos/pesquisa')
            toast.success("Pesquisa excluído com sucesso")
          }
        }

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>{attributes.titulo}</title>
            </Head>
            <HDPagAdmin/>
            <div className="container rounded mt-2 p-3">
                <div className="card">
                    <div className="card-header">Título: {attributes.titulo}</div>
                    <div className="card-body">
                    <p className="card-text">Resumo: {attributes.resumo}</p>
                    <p className="card-text">Tipo de Pesquisa: {attributes.tipo}</p>
                    <p className="card-text">Aluno: {attributes.discenteId} - {attributes.discente.nome}</p>
                    <p className="card-text">Orientador: {attributes.docenteId} - {attributes.docente.nome}</p>
                    <p className="card-text">Data de Apresentação: {format(parseISO(attributes.data_apresentacao), 'dd/MM/yyyy')}</p>
                    <p className="card-text">Palavras Chave: {attributes.palavras_chave}</p>
                    <a className="btn btn-sm btn-primary m-1" href={`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/download/${attributes.id}`}>Download</a>
                    <Link href="/posts/user/todos/pesquisas"><a className="btn btn-sm btn-secondary m-1">Página Anterior</a></Link>
                    <Link href={`/posts/admin/alterar/pesquisa/${attributes.id}`}><button className="btn btn-sm btn-secondary me-1">Alterar</button></Link>
                    <button className="btn btn-sm btn-danger" onClick={handleDelete} id={attributes.id}>Apagar</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
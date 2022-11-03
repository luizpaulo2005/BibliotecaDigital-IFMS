import axios from "axios";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../../components/header/paginicial";

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const response = await axios.get(process.env.URL_API + `/pesquisa/${id}`);
  const attributes = await response.data;
  return {
    props: {
      attributes,
    },
  };
};

export default function SoloPesquisa({ attributes }) {
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>{attributes.titulo}</title>
      </Head>
      <HDPagInicial />
      <div className="container rounded mt-2 p-3 w-75 d-flex justify-content-center flex-column">
        <div className="card">
          <div className="card-header">Título: {attributes.titulo}</div>
          <div className="card-body">
            <p className="card-text">Resumo: {attributes.resumo}</p>
            <p className="card-text">Tipo de Pesquisa: {attributes.tipo}</p>
            <Link href={`/posts/user/solo/discente/${attributes.discente.id}`}>
              <p className="card-text">Aluno: {attributes.discente.nome}</p>
            </Link>
            <Link href={`/posts/user/solo/docente/${attributes.docente.id}`}>
              <p className="card-text">Orientador: {attributes.docente.nome}</p>
            </Link>
            <p className="card-text">
              Data de Apresentação:{" "}
              {format(parseISO(attributes.data_apresentacao), "dd/MM/yyyy")}
            </p>
            <p className="card-text">
              Palavras Chave: {attributes.palavras_chave}
            </p>
            <a
              className="btn btn-sm btn-primary m-1"
              href={`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/download/${id}`}
            >
              Download
            </a>
            <Link href="/posts/user/todos/pesquisas">
              <a className="btn btn-sm btn-secondary m-1">Página Anterior</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

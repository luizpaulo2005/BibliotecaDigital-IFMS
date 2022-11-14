import axios from "axios";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import HDPagAdmin from "../../../../../components/header/pagadmin";
import { useContext } from "react";
import Login from "../../login/login";

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

export default function SoloPesquisaAdmin({ attributes }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(
      process.env.URL_API + `/pesquisa/${id}`
    );
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir a pesquisa");
    } else {
      router.push("/posts/admin/todos/pesquisa");
      toast.success("Pesquisa excluído com sucesso");
    }
  };

  const { usuario } = useContext(AuthContext);
  const Protecaoderota = ({ children }) => {
    return usuario ? children : <Login></Login>;
  };

  return (
    <Protecaoderota>
      <div className="container-fluid g-0">
        <Head>
          <title>{attributes.titulo}</title>
        </Head>
        <HDPagAdmin />
        <div className="container rounded mt-2 p-3">
          <div className="card">
            <div className="card-header">Título: {attributes.titulo}</div>
            <div className="card-body">
              <p className="card-text">Resumo: {attributes.resumo}</p>
              <p className="card-text">Tipo de Pesquisa: {attributes.tipo}</p>
              <Link
                href={`/posts/admin/solo/discente/${attributes.discenteId}`}
              >
                <p className="card-text">
                  Aluno: {attributes.discenteId} - {attributes.discente.nome}
                </p>
              </Link>
              <Link href={`/posts/admin/solo/docente/${attributes.docenteId}`}>
                <p className="card-text">
                  Orientador: {attributes.docenteId} - {attributes.docente.nome}
                </p>
              </Link>
              <p className="card-text">
                Data de Apresentação:{" "}
                {format(parseISO(attributes.data_apresentacao), "dd/MM/yyyy")}
              </p>
              <p className="card-text">
                Palavras Chave: {attributes.palavras_chave}
              </p>
              <p className="card-text">
                UUID do Arquivo: {attributes.url_download}
              </p>
              <a
                className="btn btn-sm btn-primary m-1"
                href={`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/download/${attributes.id}`}
                download
              >
                Download
              </a>
              <Link href="/posts/admin/todos/pesquisa">
                <a className="btn btn-sm btn-secondary m-1">Página Anterior</a>
              </Link>
              <Link href={`/posts/admin/alterar/pesquisa/${attributes.id}`}>
                <button className="btn btn-sm btn-secondary me-1">
                  Alterar
                </button>
              </Link>
              <button
                className="btn btn-sm btn-danger"
                onClick={handleDelete}
                id={attributes.id}
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Protecaoderota>
  );
}

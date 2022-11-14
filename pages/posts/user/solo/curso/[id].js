import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../../../components/header/paginicial";

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const response = await axios.get(
    process.env.URL_API + `/curso/${id}/allattributes`
  );
  const attributes = await response.data;
  return {
    props: {
      attributes,
    },
  };
};

export default function SoloCurso({ attributes }) {
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>{attributes.nome}</title>
      </Head>
      <HDPagInicial />
      <div className="container rounded p-3 mt-2 w-50 d-flex justify-content-center flex-column">
        <div className="card">
          <div className="card-header">Nome: {attributes.nome}</div>
          <div className="card-body">
            <p>Grade: {attributes.grade}</p>
            <p>Duração: {attributes.duracao}</p>
            <Link href={`/posts/user/solo/campus/${attributes.campus.id}`}>
              <p>Campus: {attributes.campus.nome}</p>
            </Link>
            <Link href="/posts/user/todos/cursos">
              <a className="btn btn-sm btn-secondary">Página Anterior</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

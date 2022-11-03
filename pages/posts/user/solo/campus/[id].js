import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../../components/header/paginicial";

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const response = await axios.get(
    process.env.URL_API + `/campus/${id}/cursos`
  );
  const attributes = response.data;
  return {
    props: {
      attributes,
    },
  };
};

export default function SoloCampus({ attributes }) {
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
            <p className="card-text">Cidade: {attributes.cidade}</p>
            <p className="card-text">Estado: {attributes.estado}</p>
            <p className="card-text">E-mail: {attributes.email}</p>
            <Link href="/posts/user/todos/campus">
              <a className="btn btn-sm btn-secondary">Página Anterior</a>
            </Link>
          </div>
        </div>
        <div className="border rounded p-3 mt-2">
          <legend>Cursos deste Campus: </legend>
          <ul className="list-group">
            {attributes.cursos.map((p) => (
              <Link key={p.id} href={`/posts/user/solo/curso/${p.id}`}>
                <li className="list-group-item">{p.nome}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

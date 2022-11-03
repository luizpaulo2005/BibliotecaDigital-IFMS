import axios from "axios";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import HDPagAdmin from "../../../../components/header/pagadmin";

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const response = await axios.get(
    process.env.URL_API + `/discente/${id}/pesquisas`
  );
  const attributes = await response.data;
  return {
    props: {
      attributes,
    },
  };
};

export default function SoloDiscenteAdmin({ attributes }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(
      process.env.URL_API + `/discente/${id}`
    );
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir o aluno");
    } else {
      router.push("/posts/admin/todos/discente");
      toast.success("Aluno excluído com sucesso");
    }
  };

  return (
    <div className="container-fluid g-0">
      <Head>
        <title>{attributes.nome}</title>
      </Head>
      <HDPagAdmin />
      <div className="container rounded mt-2 p-3">
        <div className="card">
          <div className="card-header">{attributes.nome}</div>
          <div className="card-body">
            <p className="card-text">Matrícula: {attributes.matriculaId}</p>
            <p className="card-text">E-mail: {attributes.email}</p>
            <p className="card-text">
              Data de Nascimento:{" "}
              {format(parseISO(attributes.data_nascimento), "dd/MM/yyyy")}
            </p>
            <p className="card-text">CPF: {attributes.cpf}</p>
            <Link href="/posts/admin/todos/discente">
              <a className="btn btn-sm btn-secondary me-1">Página Anterior</a>
            </Link>
            <Link href={`/posts/admin/alterar/discente/${attributes.id}`}>
              <button className="btn btn-sm btn-secondary me-1">Alterar</button>
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

        <div className="border rounded p-3 mt-2">
          <legend>Pesquisas que este aluno participa/ou: </legend>
          <ul className="list-group">
            {attributes.pesquisas.map((p) => (
              <Link key={p.id} href={`/posts/admin/solo/pesquisa/${p.id}`}>
                <li className="list-group-item">{p.titulo}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

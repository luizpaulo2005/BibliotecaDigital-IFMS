import axios from "axios";
import { useContext } from "react";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../../components/header/pagadmin";
import Login from "../login/login";
import {AuthContext} from "../../../../components/AuthContext&ReducerContext/AuthFunctions"

export const getServerSideProps = async () => {
  const response = await axios.get(process.env.URL_API + "/matricula");
  const attributes = await response.data;
  return {
    props: {
      attributes,
    }
  };
};

export default function TodasMatriculasAdmin({ attributes }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(
      `https://databasebibliotecadigital.undertak3r.repl.co/matricula/${id}`
    );
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir a matrícula");
    } else {
      router.push("/posts/admin/todos/matricula");
      toast.success("Matrícula excluída com sucesso");
    }
  };

  const { usuario } = useContext(AuthContext);

  const Protecaoderota = ({ children }) => {
    return usuario ? (
      children
    ) : (
      <h2 className="mt-4 verde">
        Acesso negado, você precisa estar autenticado!
      </h2>
    );
  };

  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Lista de Matriculas</title>
      </Head>
      <HDPagAdmin />
      <ToastContainer />
      <div className="container border rounded p-3 mt-2 w-75">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data de Início</th>
              <th>Pertence ao:</th>
              <th className="d-flex justify-content-end">Ações</th>
            </tr>
          </thead>
          <Protecaoderota>
            <tbody>
              {attributes.map(({ id, data_inicio, discentes }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{format(parseISO(data_inicio), "dd/MM/yyyy")}</td>
                  <Link href={`/posts/admin/solo/discente/${discentes.id}`}>
                    <td>{discentes.nome}</td>
                  </Link>
                  <td className="d-flex justify-content-end">
                    <Link href={`/posts/admin/alterar/matricula/${id}`}>
                      <button className="btn btn-sm btn-secondary me-1">
                        Alterar
                      </button>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={handleDelete}
                      id={id}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Protecaoderota>
        </table>
      </div>
    </div>
  );
}

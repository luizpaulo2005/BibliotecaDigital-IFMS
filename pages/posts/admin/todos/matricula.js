import axios from "axios";
import { useContext } from "react";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../../components/header/pagadmin";
import Login from "../login/login";
import {AuthContext} from "../../../../components/AuthContext&ReducerContext/AuthFunctions"

/* 
Função getServerSideProps
É a função que realiza o fetch(busca), dos dados na api, convertendo-os em dados que podem ser utilizados por outros componentes dentro do arquivo
Sua primeira variável, response, é a que realiza a conexão e chama os dados para si mesma
A segunda variável, attributes, coleta os dados da variável response e os converte para objeto
Por fim, a função retorna em um objeto a variável attributes para ser utilizada em outros componentes
*/

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  const response = await axios.get(process.env.URL_API + "/matricula");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null
    }
  };
};

export default function TodasMatriculasAdmin({ attributes, Auth }) {
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

  const usuario = Auth;

  const Protecaoderota = () => {
    return usuario ? (
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
        </table>
      </div>
    </div>
    ) : (
     <Login></Login>
    );
  };

  return (
  <Protecaoderota></Protecaoderota>
  );
}

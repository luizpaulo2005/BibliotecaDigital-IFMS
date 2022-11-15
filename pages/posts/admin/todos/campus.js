import axios from "axios";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import HDPagAdmin from "../../../../components/header/pagadmin";
import Link from "next/link";
import Login from "../login/login";
import { AuthContext } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { filtro } from "../../../../components/Filter/filtro";

export const getServerSideProps = async () => {
  const response = await axios.get(process.env.URL_API + "/campus");
  const attributes = await response.data;
  return {
    props: {
      attributes,
    },
  };
};

export default function TodosCampusAdmin({ attributes }) {
  let router = useRouter();

  const [consulta, setConsulta] = useState("");
  const [itensporPagina, setItensporPagina] = useState(10);
  const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);

  const keys = ["nome"];

  const consultaGeral = consulta.toLowerCase();
  const paginas = Math.ceil(
    filtro(attributes, keys, consultaGeral).length / itensporPagina
  );
  const startIndex = paginasRecorrentes * itensporPagina;
  const endIndex = startIndex + itensporPagina;
  const campusfiltrado = filtro(attributes, keys, consultaGeral).slice(
    startIndex,
    endIndex
  );

  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(
      `https://databasebibliotecadigital.undertak3r.repl.co/campus/${id}`
    );
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir o campus");
    } else {
      router.push("/posts/admin/todos/campus");
      toast.success("Campus excluído com sucesso");
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

  useEffect(() => {
    setPaginasRecorrentes(0);
  }, [setItensporPagina]);
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Lista de Campus</title>
      </Head>
      <HDPagAdmin />
      <ToastContainer />
      <div className="container border rounded mt-2 p-3 w-50">
        <div className="container">
          <form className="d-flex" role="search">
            <input
              className="form-control filtro"
              type="search"
              placeholder="Pesquisar"
              aria-label="Search"
              onChange={(e) => setConsulta(e.target.value)}
            />
          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th className="d-flex justify-content-end">Ações</th>
            </tr>
          </thead>
          <Protecaoderota>
            <tbody>
              {campusfiltrado.map(({ id, nome }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>
                    <Link href={`/posts/admin/solo/campus/${id}`}>
                      <a className="list-group-item">{nome}</a>
                    </Link>
                  </td>
                  <td className="d-flex justify-content-end">
                    <Link href={`/posts/admin/alterar/campus/${id}`}>
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

        <center>
          <div>
            {Array.from(Array(paginas), (campusfiltrado, index) => {
              return (
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  key={index}
                  value={index}
                  onClick={(e) => setPaginasRecorrentes(Number(e.target.value))}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </center>
        <center>
          <form>
            <span>Campi por página: </span>

            <select onChange={(e) => setItensporPagina(Number(e.target.value))}>
              <option value={5}>5</option>
              <option selected value={10}>
                10
              </option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </form>
        </center>
      </div>
    </div>
  );
}

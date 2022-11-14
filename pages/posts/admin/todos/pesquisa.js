import Head from "next/head";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useState, useEffect, useContext } from "react";
import HDPagAdmin from "../../../../components/header/pagadmin";
import Link from "next/link";
import Login from "../login/login";
import {AuthContext} from "../../../../components/AuthContext&ReducerContext/AuthFunctions"

export const getServerSideProps = async () => {
  const response = await axios.get(process.env.URL_API + "/pesquisa");
  const attributes = await response.data;
  return {
    props: {
      attributes,
    }
  };
};

export default function TodasPesquisasAdmin({ attributes }) {
  const [consulta, setConsulta] = useState("");
  const [itensporPagina, setItensporPagina] = useState(10);
  const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);

  const keys = ["titulo"];

  const filtro = (item) => {
    return item.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(consultaGeral))
    );
  };

  const consultaGeral = consulta.toLowerCase();
  const paginas = Math.ceil(filtro(attributes).length / itensporPagina);
  const startIndex = paginasRecorrentes * itensporPagina;
  const endIndex = startIndex + itensporPagina;
  const pesquisasfiltradas = filtro(attributes).slice(startIndex, endIndex);

  useEffect(() => {
    setPaginasRecorrentes(0);
  }, [setItensporPagina]);

  const { usuario } = useContext(AuthContext);

  const Protecaoderota = ({ children }) => {
    return usuario ? (
      children
    ) : (
      <h2 className="mt-4 verde">
        Acesso negado, você precisa entrar autenticado!
      </h2>
    );
  };
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Pesquisas</title>
      </Head>
      <HDPagAdmin />

      <div className="container mt-2">
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
      <div className="container border rounded mt-2 p-3 w-75">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>PDF</th>
              <th className="d-flex justify-content-end">Ações</th>
            </tr>
          </thead>
          <Protecaoderota>
            <tbody>
              {pesquisasfiltradas.map(
                ({ id, titulo, discente, docente, data_apresentacao }) => (
                  <tr key={id}>
                    <td scope="row">{id}</td>
                    <td>
                      <Link href={`/posts/admin/solo/pesquisa/${id}`}>
                        <a className="list-group-item">{titulo}</a>
                      </Link>
                    </td>
                    <td>
                      <a
                        className="btn btn-sm btn-primary"
                        href={`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/download/${id}`}
                        download
                      >
                        Download
                      </a>
                    </td>
                    <td className="d-flex justify-content-end">
                      <button className="btn btn-secondary btn-sm">
                        Alterar
                      </button>
                      <button className="btn btn-danger btn-sm ms-1">
                        Apagar
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Protecaoderota>
        </table>

        <center>
          <div>
            {Array.from(Array(paginas), (pesquisasfiltradas, index) => {
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
            <span>Trabalhos por página: </span>

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

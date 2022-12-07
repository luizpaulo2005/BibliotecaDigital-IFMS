import Head from "next/head";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useState, useEffect, useContext } from "react";
import HDPagAdmin from "../../../../components/header/pagadmin";
import Link from "next/link";
import Login from "../login/login";
import { AuthContext } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { filtro } from "../../../../components/Filter/filtro";
import { parseCookies } from 'nookies';

/* 
Função getServerSideProps
É a função que realiza o fetch(busca), dos dados na api, convertendo-os em dados que podem ser utilizados por outros componentes dentro do arquivo
Sua primeira variável, response, é a que realiza a conexão e chama os dados para si mesma
A segunda variável, attributes, coleta os dados da variável response e os converte para objeto
Por fim, a função retorna em um objeto a variável attributes para ser utilizada em outros componentes
*/

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  const response = await axios.get(process.env.URL_API + "/pesquisa");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null
    }
  };
};

export default function TodasPesquisasAdmin({ attributes, Auth }) {

  const usuario  = Auth
  const Protecaoderota = () => {
  const [consulta, setConsulta] = useState("");
  const [itensporPagina, setItensporPagina] = useState(10);
  const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);

  const keys = ["titulo"];

  const consultaGeral = consulta.toLowerCase();
  const paginas = Math.ceil(
    filtro(attributes, keys, consultaGeral).length / itensporPagina
  );
  const startIndex = paginasRecorrentes * itensporPagina;
  const endIndex = startIndex + itensporPagina;
  const pesquisasfiltradas = filtro(attributes, keys, consultaGeral).slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    setPaginasRecorrentes(0);
  }, [setItensporPagina]);
    return usuario ? (
      <div className="container-fluid g-0">
      <Head>
        <title>Pesquisas</title>
      </Head>
      <HDPagAdmin />
      <div className="container border rounded mt-2 p-3 w-75">
        <div className="container d-flex justify-content-center">
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
              <th>Titulo</th>
              <th>PDF</th>
              <th className="d-flex justify-content-end">Ações</th>
            </tr>
          </thead>
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
    ) : (
      <Login></Login>
    );
  };
  return (
  <Protecaoderota></Protecaoderota>
  );
}

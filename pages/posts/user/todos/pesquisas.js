/** 
 * @module user/todos/pesquisas.js
 * 
 * @requires axios
 * @requires ../../../../components/header/paginicial
 * @requires date-fns
 * @requires react
 * @requires next/link
 * @requires next/head
 * @name user/todos/pesquisas
 * 
 */

import Head from "next/head";
import axios from "axios";
import HDPagInicial from "../../../../components/header/paginicial";
import { format, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Componente que retorna os dados recebidos da API.
 *
 * @component
 * @async
 * @example
 * const response = await axios.get(process.env.URL_API + "/pesquisa");
 * const attributes = await response.data;
 * return {
    props: {
      attributes
    }
  };
 */

export const getServerSideProps = async () => {
  const response = await axios.get(process.env.URL_API + "/pesquisa");
  const attributes = await response.data;
  return {
    props: {
      attributes,
    },
  };
};

/**
 * Componente que renderiza a página user/todos/pesquisas e envia o formulário
 * 
 * @component
 * @example
 * const [consulta, setConsulta] = useState("");
 * const [itensporPagina, setItensporPagina] = useState(10);
 * const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);
 *
 * const keys = ["titulo"];
 *
 * const filtro = (item) => {
 *   return item.filter((item) =>
 *     keys.some((key) => item[key].toLowerCase().includes(consultaGeral))
 *   );
 * };
 *
 * const consultaGeral = consulta.toLowerCase();
 * const paginas = Math.ceil(filtro(attributes).length / itensporPagina);
 * const startIndex = paginasRecorrentes * itensporPagina;
 * const endIndex = startIndex + itensporPagina;
 * const pesquisasfiltradas = filtro(attributes).slice(startIndex, endIndex);
 *
 * useEffect(() => {
 *   setPaginasRecorrentes(0);
 * }, [setItensporPagina]);
 */

export default function TodasPesquisas({ attributes }) {
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

  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Pesquisas</title>
      </Head>
      <HDPagInicial />
      <div className="container border rounded mt-2 p-3">
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
              <th>Titulo</th>
              <th>Discentes</th>
              <th>Orientador(es)</th>
              <th>Data de Apresentação</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {pesquisasfiltradas.map(
              ({ id, titulo, data_apresentacao, discente, docente }) => (
                <tr key={id}>
                  <td>
                    <Link href={`/posts/user/solo/pesquisa/${id}`}>
                      <a className="list-group-item">{titulo}</a>
                    </Link>
                  </td>
                  <td>{discente.nome}</td>
                  <td>{docente.nome}</td>
                  <td>{format(parseISO(data_apresentacao), "dd/MM/yyyy")}</td>
                  <td>
                    <a
                      className="btn btn-sm btn-primary"
                      href={`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/download/${id}`}
                      download
                    >
                      Download
                    </a>
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
  );
}

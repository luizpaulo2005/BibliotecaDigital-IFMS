import Head from "next/head";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Login from "../login/login";
import { AuthContext } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { filtro } from "../../../../components/Filter/filtro";
import { parseCookies } from "nookies";
import HeaderAdmin from "../../../../components/header_admin";

/* 
Função getServerSideProps
É a função que realiza o fetch(busca), dos dados na api, convertendo-os em dados que podem ser utilizados por outros componentes dentro do arquivo
Sua primeira variável, response, é a que realiza a conexão e chama os dados para si mesma
A segunda variável, attributes, coleta os dados da variável response e os converte para objeto
Por fim, a função retorna em um objeto a variável attributes para ser utilizada em outros componentes
*/

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API + "/pesquisa");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null,
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};
//está função também é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function TodasPesquisasAdmin({ attributes, Auth }) {
  const usuario = Auth;
  // essa constante é resposanvel por armazenar os status do usuário

  //Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
  //Se não houver um usuário será renderizada a página de Login
  const Protecaoderota = () => {
    const [consulta, setConsulta] = useState("");
    //Aqui é onde os dados do filtro é armazenado
    const [itensporPagina, setItensporPagina] = useState(10);
    //Aqui é onde é colocado a quantidade de elemetos tera por pagina na paginação, por "Default", está posto por 10
    const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);
    //Aqui é onde o usuario pode ver quantas paginas ainda podem ser vistas, esse pedenra de quantos elementos no total tem.

    const keys = ["titulo"];
    // aqui é onde  eu defino o atributo que o filtro ira procura quando utilizar a função "pesquisa"

    const consultaGeral = consulta.toLowerCase();
    // Aqui é colocado todos os caracteres em minusculos para que fiquei mais facil de procurar
    const paginas = Math.ceil(
      filtro(attributes, keys, consultaGeral).length / itensporPagina
    );
    // aqui é definido as celulas
    const startIndex = paginasRecorrentes * itensporPagina;
    //aqui é definido a quantidade de itens na pagina conforme indicado no select ou por default
    const endIndex = startIndex + itensporPagina;
    //Aqui é somado para definir quantas páginas serão dependendo do valor de itens selecionados por página
    const pesquisasfiltradas = filtro(attributes, keys, consultaGeral).slice(
      startIndex,
      endIndex
    );
    //Aqui eu aplico o filtro, e com o slice eu divido os itens.

    useEffect(() => {
      setPaginasRecorrentes(0);
    }, [setItensporPagina]);
    return usuario ? (
      <div className="container-fluid g-0">
        <Head>
          <title>Pesquisas</title>
        </Head>
        <HeaderAdmin />
        <div className="container d-flex justify-content-center flex-column border rounded mt-2 p-3 col-lg-8 col-md-8 col-sm-12">
          <center>
            <input
              className="form-control filtro"
              type="search"
              placeholder="Pesquisar"
              aria-label="Search"
              onChange={(e) => setConsulta(e.target.value)}
            />
          </center>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
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
                      <Link href={`/posts/admin/alterar/pesquisa/${id}`}>
                        <button className="btn btn-sm btn-secondary me-1">
                          Alterar
                        </button>
                      </Link>
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
                    onClick={(e) =>
                      setPaginasRecorrentes(Number(e.target.value))
                    }
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

              <select
                onChange={(e) => setItensporPagina(Number(e.target.value))}
              >
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
  return <Protecaoderota></Protecaoderota>;
}

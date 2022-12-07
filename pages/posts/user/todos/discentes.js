import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../../components/header/paginicial";
import { format, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { filtro } from './../../../../components/Filter/filtro';
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
  const response = await axios.get(process.env.URL_API + "/discente");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth : cookies.usuario || null
    },
  };
};

/* 
Função TodosDiscentes
A função principal é a que renderiza o conteúdo inserido nela, porém antes de se retornar algo, foi inserido um tratamento para realizar a paginação

Explicar Paginação

Por fim a função retorna o HTML contendo a tabela que irá conter os dados trazidos da função getServerSideProps, junto à paginação

*/

export default function TodosDiscentes({ attributes, Auth }) {
  const [consulta, setConsulta] = useState("");
  //Aqui é onde os dados do filtro é armazenado
  const [itensporPagina, setItensporPagina] = useState(10);
  //Aqui é onde é colocado a quantidade de elemetos tera por pagina na paginação, por "Default", está posto por 10
  const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);
  //Aqui é onde o usuario pode ver quantas paginas ainda podem ser vistas, esse pedenra de quantos elementos no total tem.

  const keys = ["nome"];
  // aqui é onde  eu defino o atributo que o filtro ira procura quando utilizar a função "pesquisa"


  const consultaGeral = consulta.toLowerCase();
  // Aqui é coloco todos os caracteres em minusculos para que fiquei mais facil de procurar
  const paginas = Math.ceil(filtro(attributes, keys, consultaGeral).length / itensporPagina);
  // aqui é definido as celulas
  const startIndex = paginasRecorrentes * itensporPagina;
  //aqui é definido a quantidade de itens na pagina conforme indicado no select ou por default
  const endIndex = startIndex + itensporPagina;
  //Aqui é somado para definir quantas páginas serão dependendo do valor de itens selecionados por página
  const discentesfiltrados = filtro(attributes, keys, consultaGeral).slice(startIndex, endIndex);
  //Aqui eu aplico o filtro, e com o slide eu divido os itens.

  useEffect(() => {
    setPaginasRecorrentes(0);
  }, [setItensporPagina]);

  
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Lista de Alunos</title>
      </Head>
      <HDPagInicial Auth={Auth} />
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
              <th>Nome</th>
              <th>E-mail</th>
              <th>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {discentesfiltrados.map(({ id, nome, email, data_nascimento }) => (
              <tr key={id}>
                <td>
                  <Link href={`/posts/user/solo/discente/${id}`}>
                    <a className="list-group-item">{nome}</a>
                  </Link>
                </td>
                <td>{email}</td>
                <td>{format(parseISO(data_nascimento), "dd/MM/yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <center>
          <div>
            {Array.from(Array(paginas), (discentesfiltrados, index) => {
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
            <span>Alunos por página: </span>

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

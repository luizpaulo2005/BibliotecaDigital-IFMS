import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../../../components/header/paginicial";
import { parseCookies } from 'nookies';
/* 
Função getServerSideProps
É a função que realiza o fetch(busca), dos dados na api, convertendo-os em dados que podem ser utilizados por outros componentes dentro do arquivo;
Como esse arquivo realiza a busca de um objeto em específico em sua primeira variável atribuimos o ID a ser buscado utilizando o parâmetro context;
A segunda variável, response, é a que realiza a conexão e chama os dados para si mesma;
A terceira variável, attributes, coleta os dados da variável response e os converte para objeto;
Por fim, a função retorna em um objeto a variável attributes para ser utilizada em outros componentes;
*/

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  const id = context.query.id;
  const response = await axios.get(
    process.env.URL_API + `/campus/${id}/cursos`
  );
  const attributes = response.data;
  return {
    props: {
      attributes,
      Auth : cookies.usuario || null
    },
  };
};

/* 
Função SoloCampus
A função principal é a que renderiza o conteúdo inserido nela;

Por fim a função retorna o HTML contendo a tabela que irá conter os dados trazidos da função getServerSideProps, junto à paginação;

*/

export default function SoloCampus({ attributes, Auth }) {
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>{attributes.nome}</title>
      </Head>
      <HDPagInicial Auth={Auth} />
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

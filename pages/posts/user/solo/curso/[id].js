import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagInicial from "../../../../../components/header/paginicial";

/* 
Função getServerSideProps
É a função que realiza o fetch(busca), dos dados na api, convertendo-os em dados que podem ser utilizados por outros componentes dentro do arquivo;
Como esse arquivo realiza a busca de um objeto em específico em sua primeira variável atribuimos o ID a ser buscado utilizando o parâmetro context;
A segunda variável, response, é a que realiza a conexão e chama os dados para si mesma;
A terceira variável, attributes, coleta os dados da variável response e os converte para objeto;
Por fim, a função retorna em um objeto a variável attributes para ser utilizada em outros componentes;
*/

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const response = await axios.get(
    process.env.URL_API + `/curso/${id}/allattributes`
  );
  const attributes = await response.data;
  return {
    props: {
      attributes,
    },
  };
};

/* 
Função SoloCurso
A função principal é a que renderiza o conteúdo inserido nela;

Por fim a função retorna o HTML contendo a tabela que irá conter os dados trazidos da função getServerSideProps, junto à paginação;

*/

export default function SoloCurso({ attributes }) {
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>{attributes.nome}</title>
      </Head>
      <HDPagInicial />
      <div className="container rounded p-3 mt-2 w-50 d-flex justify-content-center flex-column">
        <div className="card">
          <div className="card-header">Nome: {attributes.nome}</div>
          <div className="card-body">
            <p>Grade: {attributes.grade}</p>
            <p>Duração: {attributes.duracao}</p>
            <Link href={`/posts/user/solo/campus/${attributes.campus.id}`}>
              <p>Campus: {attributes.campus.nome}</p>
            </Link>
            <Link href="/posts/user/todos/cursos">
              <a className="btn btn-sm btn-secondary">Página Anterior</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

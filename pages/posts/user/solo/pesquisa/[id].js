import axios from "axios";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { parseCookies } from 'nookies';
import HeaderUser from "../../../../../components/header_user";
import HeaderAdmin from "../../../../../components/header_admin";

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
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API + `/pesquisa/${id}`);
  const attributes = await response.data;
  console.log(attributes)
  return {
    props: {
      attributes,
      Auth : cookies.usuario || null
    },
  };
};

/* 
Função SoloPesquisa
A função principal é a que renderiza o conteúdo inserido nela;

Por fim a função retorna o HTML contendo a tabela que irá conter os dados trazidos da função getServerSideProps, junto à paginação;

*/

export default function SoloPesquisa({ attributes, Auth }) {
  const usuario = Auth;
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>{attributes.titulo}</title>
      </Head>
      {!usuario ? <HeaderUser/> : <HeaderAdmin Auth={Auth}/>}
      <div className="container rounded mt-2 p-3 w-75 d-flex justify-content-center flex-column">
        <div className="card">
          <div className="card-header">Título: {attributes.titulo}</div>
          <div className="card-body">
            <p className="card-text">Resumo: {attributes.resumo}</p>
            <p className="card-text">Tipo de Pesquisa: {attributes.tipo}</p>
            <Link href={`/posts/user/solo/discente/${attributes.discente.id}`}>
              <p className="card-text">Aluno: {attributes.discente.nome}</p>
            </Link>
            <Link href={`/posts/user/solo/docente/${attributes.docente.id}`}>
              <p className="card-text">Orientador: {attributes.docente.nome}</p>
            </Link>
            <p className="card-text">
              Data de Apresentação:{" "}
              {format(parseISO(attributes.data_apresentacao), "dd/MM/yyyy")}
            </p>
            <p className="card-text">
              Palavras Chave: {attributes.palavras_chave}
            </p>
            <a
              className="btn btn-sm btn-primary m-1"
              href={`https://databasebibliotecadigital.undertak3r.repl.co/pesquisa/download/${attributes.id}`}
              download
            >
              Download
            </a>
            <Link href="/posts/user/todos/pesquisas">
              <a className="btn btn-sm btn-secondary m-1">Página Anterior</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

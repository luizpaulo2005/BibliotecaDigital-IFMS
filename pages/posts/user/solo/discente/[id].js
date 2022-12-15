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
  const response = await axios.get(
    process.env.NEXT_PUBLIC_URL_API + `/discente/${id}/pesquisas`
  );
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth : cookies.usuario || null
    },
  };
};

/* 
Função SoloDiscente
A função principal é a que renderiza o conteúdo inserido nela;

Por fim a função retorna o HTML contendo a tabela que irá conter os dados trazidos da função getServerSideProps, junto à paginação;

*/

export default function SoloDiscente({ attributes, Auth }) {
  const usuario = Auth;
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>{attributes.nome}</title>
      </Head>
      {!usuario ? <HeaderUser/> : <HeaderAdmin Auth={Auth}/>}
      <div className="container rounded mt-2 p-3 w-50 d-flex justify-content-center flex-column">
        <div className="card">
          <div className="card-header">{attributes.nome}</div>
          <div className="card-body">
            <p className="card-text">Matrícula: {attributes.matriculaId}</p>
            <p className="card-text">E-mail: {attributes.email}</p>
            <p className="card-text">
              Data de Nascimento:{" "}
              {format(parseISO(attributes.data_nascimento), "dd/MM/yyyy")}
            </p>
            <p className="card-text">CPF: {attributes.cpf}</p>
            <Link href="/posts/user/todos/discentes">
              <a className="btn btn-sm btn-secondary">Página Anterior</a>
            </Link>
          </div>
        </div>
        <div className="border rounded p-3 mt-2">
          <legend>Pesquisas que este aluno participa/ou: </legend>
          <ul className="list-group">
            {attributes.pesquisas.map((p) => (
              <Link key={p.id} href={`/posts/user/solo/pesquisa/${p.id}`}>
                <li className="list-group-item">{p.titulo}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import HDPagAdmin from "../../../../../components/header/pagadmin";
import { parseCookies } from 'nookies';
import Login from "../../login/login";


export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  //constante reponsável por armazenar os cookies
  const id = context.query.id;
  const response = await axios.get(
    process.env.URL_API + `/docente/${id}/pesquisas`
  );
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};
 //está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponível para uso

export default function SoloDocenteAdmin({ attributes, Auth }) {
  const usuario = Auth
// essa constante é resposanvel por armazenar os status do usuário

//Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
//Se não houver um usuário será renderizada a página de Login
  const Protecaoderota = ({children})=>{
    return usuario ? children : <Login></Login>
  }
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(process.env.URL_API + `/docente/${id}`);
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir o professor");
    } else {
      router.push("/posts/admin/todos/docente");
      toast.success("Professor excluído com sucesso");
    }
  };

  return (
    <Protecaoderota>
      <div className="container-fluid g-0">
      <Head>
        <title>{attributes.nome}</title>
      </Head>
      <HDPagAdmin />
      <div className="container rounded p-3 mt-2">
        <div className="card">
          <div className="card-header">{attributes.nome}</div>
          <div className="card-body">
            <p className="card-text">SIAPE: {attributes.siape}</p>
            <p className="card-text">E-mail: {attributes.email}</p>
            <p className="card-text">
              Data de Nascimento: {attributes.data_nascimento}
            </p>
            <p className="card-text">CPF: {attributes.cpf}</p>
            <p className="card-text">Formação: {attributes.formacao}</p>
            <Link href="/posts/user/todos/docentes">
              <a className="btn btn-sm btn-secondary">Página Anterior</a>
            </Link>
            <Link href={`/posts/admin/alterar/docente/${attributes.id}`}>
              <button className="btn btn-sm btn-secondary me-1">Alterar</button>
            </Link>
            <button
              className="btn btn-sm btn-danger"
              onClick={handleDelete}
              id={attributes.id}
            >
              Apagar
            </button>
          </div>
        </div>
        <div className="border rounded p-3 mt-2">
          <legend>Pesquisas que este professor participa/ou: </legend>
          <ul className="list-group">
            {attributes.pesquisas.map((p) => (
              <Link key={p.id} href={`/posts/admin/solo/pesquisa/${p.id}`}>
                <li className="list-group-item">{p.titulo}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </Protecaoderota>
  );
}

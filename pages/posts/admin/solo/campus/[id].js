import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Login from "../../login/login";
import { parseCookies } from 'nookies';
import HeaderAdmin from "../../../../../components/header_admin";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  //constante reponsável por armazenar os cookies
  const id = context.query.id;
  const response = await axios.get(
    process.env.NEXT_PUBLIC_URL_API + `/campus/${id}/cursos`
  );
  const attributes = response.data;
  console.log(attributes);
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};
 //está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponível para uso

export default function SoloCampusAdmin({ attributes, Auth }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(process.env.NEXT_PUBLIC_URL_API + `/campus/${id}`);
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir o campus");
    } else {
      router.push("/posts/admin/todos/campus");
      toast.success("Campus excluído com sucesso");
    }
  };

  const usuario = Auth
// essa constante é resposanvel por armazenar os status do usuário

//Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
//Se não houver um usuário será renderizada a página de Login
  const Protecaoderota =({children})=>{
    return usuario ? children : <Login></Login>
  }

  return (
    <Protecaoderota>
      <div className="container-fluid g-0">
      <Head>
        <title>{attributes.nome}</title>
      </Head>
      <HeaderAdmin />
      <div className="container rounded p-3 mt-2">
        <div className="card">
          <div className="card-header">Nome: {attributes.nome}</div>
          <div className="card-body">
            <p className="card-text">Cidade: {attributes.cidade}</p>
            <p className="card-text">Estado: {attributes.estado}</p>
            <p className="card-text">E-mail: {attributes.email}</p>
            <Link href="/posts/admin/todos/campus">
              <a className="btn btn-sm btn-secondary me-1">Página Anterior</a>
            </Link>
            <Link href={`/posts/admin/alterar/campus/${attributes.id}`}>
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
          <legend>Cursos deste Campus: </legend>
          <ul className="list-group">
            {attributes.cursos.map((p) => (
              <Link key={p.id} href={`/posts/admin/solo/curso/${p.id}`}>
                <li className="list-group-item">{p.nome}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </Protecaoderota>
  );
}

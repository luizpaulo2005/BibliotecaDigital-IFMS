import HDPagAdmin from "../../../components/header/pagadmin";
import Link from "next/link";
import Head from "next/head";
import { useContext, useState } from "react";
import Login from "./login/login";
import { AuthContext } from "../../../components/AuthContext&ReducerContext/AuthFunctions";
import { setCookie, parseCookies } from "nookies";


export async function getServerSideProps (context){
  const cookies = parseCookies(context)
//constante reponsável por armazenar os cookies
  return {
    props: {
      Auth : cookies.usuario || null
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  }
 }
 //está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function PaginaAdmin(props) {
  const usuario = props.Auth
  // essa função é resposanvel por armazenar os dados do Cookies
  const Protecaoderota = ({ children }) => {
    return usuario ? children  : <Login></Login>;
  };
//Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
//Se não houver um usuário será renderizada a página de Login

  const handleLogout =(e)=>{
    const user = usuario;
    setAutenticacao({type:"LOGOUT", payload:user})
    setCookie(null , "usuario" , "Logout", {
      maxAge: 0,
      path: "/",       
    })
    router.push("/");
  }

  return (
    <Protecaoderota>
      <div className="container-fluid g-0">
        <Head>
          <title>Página Administrativa</title>
        </Head>
        <HDPagAdmin />
        <div className="container">
          <h4 className="center mt-3">
            Bem-Vindo a Administração! Aqui você pode alterar, cadastrar e
            deletar o que desejar.
          </h4>
          <div className="row mt-4">
            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-header">Pesquisas</h5>
                <div className="card-body">
                  <Link href="/posts/admin/todos/pesquisa">
                    <a className="btn btn-primary">Ir as Pesquisas</a>
                  </Link>
                  <Link href="/posts/admin/cadastrar/pesquisas">
                    <a className="btn btn-success ms-2">Cadastrar</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-header">Campus</h5>
                <div className="card-body">
                  <Link href="/posts/admin/todos/campus">
                    <a className="btn btn-primary">Ir aos Campus</a>
                  </Link>
                  <Link href="/posts/admin/cadastrar/campus">
                    <a className="btn btn-success ms-2">Cadastrar</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-header">Cursos</h5>
                <div className="card-body">
                  <Link href="/posts/admin/todos/curso">
                    <a className="btn btn-primary">Ir aos Cursos</a>
                  </Link>
                  <Link href="/posts/admin/cadastrar/curso">
                    <a className="btn btn-success ms-2">Cadastrar</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-header">Docentes</h5>
                <div className="card-body">
                  <Link href="/posts/admin/todos/docente">
                    <a className="btn btn-primary">Ir aos Docentes</a>
                  </Link>
                  <Link href="/posts/admin/cadastrar/docente">
                    <a className="btn btn-success ms-2">Cadastrar</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-header">Discentes</h5>
                <div className="card-body">
                  <Link href="/posts/admin/todos/discente">
                    <a className="btn btn-primary">Ir aos Discentes </a>
                  </Link>
                  <Link href="/posts/admin/cadastrar/discente">
                    <a className="btn btn-success ms-2">Cadastrar</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <h5 className="card-header">Matricula</h5>
                <div className="card-body">
                  <Link href="/posts/admin/todos/matricula">
                    <a className="btn btn-primary">Ir as Matriculas </a>
                  </Link>
                  <Link href="/posts/admin/cadastrar/matricula">
                    <a className="btn btn-success ms-2">Cadastrar</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Protecaoderota>
  );
}

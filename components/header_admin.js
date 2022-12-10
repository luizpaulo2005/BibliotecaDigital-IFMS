import Link from "next/link";
import { AuthContextProvider, AuthContext, AuthReducer } from "./AuthContext&ReducerContext/AuthFunctions";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

export default function HeaderAdmin() {
  let router = useRouter();
  const { setAutenticacao } = useContext(AuthContext);
  //Aqui é definido o usuário como existente com o auth context

  const usuario = useContext(AuthContext);

  //Está função tem como objetivo limpar os cookies do usuário e chamar o Logout do switch para que a página de administração fique indisponível
  const handleLogout = (e) => {
    const user = usuario;
    setAutenticacao({ type: "LOGOUT", payload: user });
    //aqui é definido o Logout para remover o usuário
    setCookie(null, "usuario", null, {
      maxAge: 0,
      path: "/",
    });
  };
  //aqui é definido o cookie como nulo, para remover o cookie
  return (
    <nav className="navbar navbar-expand-lg bg-success">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">
            <span className="titleheader">
              Biblioteca Digital - IFMS
            </span>
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="https://www.ifms.edu.br"
              >
                <span className="white">Página IFMS</span>
              </a>
            </li>
            <li className="nav-item">
              <Link href="/posts/admin/paginaAdmin">
                <a className="nav-link active">
                  <span className="white">Painel</span>
                </a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="white">Categorias</span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/posts/admin/todos/discente">
                    <a className="dropdown-item">Alunos - Admin</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/admin/todos/campus">
                    <a className="dropdown-item">Campus - Admin</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/admin/todos/curso">
                    <a className="dropdown-item">Cursos - Admin</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/admin/todos/matricula">
                    <a className="dropdown-item">Matriculas - Admin</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/admin/todos/pesquisa">
                    <a className="dropdown-item">Pesquisas - Admin</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/admin/todos/docente">
                    <a className="dropdown-item">Professores - Admin</a>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link href="/posts/user/todos/discentes">
                    <a className="dropdown-item">Alunos - User</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/user/todos/campus">
                    <a className="dropdown-item">Campus - User</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/user/todos/cursos">
                    <a className="dropdown-item">Cursos - User</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/user/todos/pesquisas">
                    <a className="dropdown-item">Pesquisas - User</a>
                  </Link>
                </li>
                <li>
                  <Link href="/posts/user/todos/docentes">
                    <a className="dropdown-item">Professores - User</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {usuario && (
            <span className="navbar-text" role="search">
              <form className="d-flex" onSubmit={handleLogout}>
                <button className="form-control me-2 btn-outline-light">
                  Logout
                </button>
              </form>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

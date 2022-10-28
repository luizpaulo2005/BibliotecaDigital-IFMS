import HDPagAdmin from "./../../components/header/pagadmin";
import Link from "next/link";
import Head from "next/head";

export default function PaginaAdmin() {
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Página Administrativa</title>
      </Head>
      <HDPagAdmin />
      <div className="container">
        <h4 className="center mt-3">
          Bem-Vindo a Administração! Aqui você pode alterar, cadastrar e deletar
          o que desejar.
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
  );
}

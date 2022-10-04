import Link from "next/link";
import PaginaAdmin from './../../posts/admin/paginaAdmin';

export default function HDPagAdmin(){
    return(
        <nav className="navbar navbar-expand-lg bg-success">
        <div className="container">
        <Link href="/">
        <a className="navbar-brand"><span className="titleheader">Biblioteca Digital de Pesquisas - IFMS</span></a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="https://www.ifms.edu.br"><span className="white">Página IFMS</span></a>
        </li>
        <li className="nav-item">
        <Link href="/posts/admin/paginaAdmin"><a className="nav-link active"><span className="white">Painel</span></a></Link>
        </li>
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="white">Categorias</span>
        </a>
        <ul className="dropdown-menu">
        <li><Link href="/posts/admin/todos/discente"><a className="dropdown-item">Alunos</a></Link></li>
        <li><Link href="/posts/admin/todos/campus"><a className="dropdown-item">Campus</a></Link></li>
        <li><Link href="/posts/admin/todos/curso"><a className="dropdown-item">Cursos</a></Link></li>
        <li><Link href="/posts/admin/todos/matricula"><a className="dropdown-item">Matriculas</a></Link></li>
        <li><Link href="/posts/admin/todos/pesquisa"><a className="dropdown-item">Pesquisas</a></Link></li>
        <li><Link href="/posts/admin/todos/docente"><a className="dropdown-item">Professores</a></Link></li>
        </ul>
        </li>
        </ul>
        <Link href="/"><button className="btn btn-outline-success" type="submit"><div className="white">Sair</div></button></Link>      
        </div>
        </div>
        </nav>
    )
}
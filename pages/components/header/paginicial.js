import Link from "next/link";

export default function HDPagInicial(){
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
        <a className="nav-link active" aria-current="page" href="#">Administração</a>
        </li>
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Categorias
        </a>
        <ul className="dropdown-menu">
        <li><Link href="/posts/user/todos/pesquisas"><a className="dropdown-item">Pesquisas</a></Link></li>
        <li><a className="dropdown-item" href="#">Categoria 2</a></li>
        <li><a className="dropdown-item" href="#">Categoria 3</a></li>
        </ul>
        </li>
        </ul>
        <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
        </div>
        </div>
        </nav>
    )
}
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import CRSPagInicial from './components/carrossel/paginicial'
import HDPagInicial from './components/header/paginicial'

export default function Home() {
  return (
    <div className='container-fluid g-0'>

    <Head>
      <title>Biblioteca Digital - IFMS</title>
    </Head>

    <div>
    <HDPagInicial/>
    </div>
    <div className={styles.main}>
    <CRSPagInicial/>
    <nav class="navbar bg-light">
  <div class="container-fluid textcenter">
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" />
      <Link href="/posts/user/todos/pesquisas"><button class="btn btn-outline-success" type="submit">Search</button></Link>
    </form>
  </div>
</nav>
 
    </div>
    </div>
  )
}

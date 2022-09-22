import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
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
    <Link href="/posts/user/todos/pesquisas"><a>AB</a></Link>
    </div>
  )
}

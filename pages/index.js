import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { parseCookies } from "nookies";
import HeaderUser from "../components/header_user";
import HeaderAdmin from "../components/header_admin";
import { useEffect, useLayoutEffect } from "react";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const response = await axios.get(process.env.URL_API + "/pesquisa");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null,
    },
  };
};

export default function Home({ attributes, Auth }) {
  const usuario = Auth;
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Biblioteca Digital - IFMS</title>
      </Head>

      <div>{!usuario ? <HeaderUser /> : <HeaderAdmin Auth={Auth} />}</div>
      <div className="d-flex justify-content-center flex-wrap p-3">
        {attributes.map(({ id, titulo, discente }) => (
          <div class="card m-1" key={id}>
            <div class="card-body">
              <Link href={`/posts/user/solo/pesquisa/${id}`}>
                <h5 class="card-title">{titulo}</h5>
              </Link>
              <Link href={`/posts/user/solo/discente/${discente.id}`}>
                <p class="card-text">{discente.nome}</p>
              </Link>
              <Link href={`/posts/user/solo/pesquisa/${id}`}>
                <span class="btn btn-primary">Ver Mais</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

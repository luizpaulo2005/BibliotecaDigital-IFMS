import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import HDPagInicial from "../components/header/paginicial";
import { parseCookies } from 'nookies';
import HDPagAdmin from "../components/header/pagadmin";


export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  const response = await axios.get(process.env.URL_API + "/pesquisa");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null
    }
  };
};

export default function Home({ attributes, Auth }) {
  const usuario = Auth;
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Biblioteca Digital - IFMS</title>
      </Head>

      <div>
      {!usuario ? <HDPagInicial/> : <HDPagAdmin Auth={Auth}/>}

      </div>
      <div className={styles.main}>
        <div
          id="carouselExampleCaptions"
          className="carousel slide carrossel border rounded"
          data-bs-ride="false"
        >
          <div className="carousel-inner rounded">
            {attributes.map(({ id, titulo, discente }) => (
              <div
                className="carousel-item active"
                data-bs-interval="2000"
                key={id}
              >
                <div className="d-block w-100">
                  <Image
                    src={"/images/gray.png"}
                    alt="Image"
                    width={800}
                    height={170}
                  />
                </div>
                <div className="carousel-caption d-none d-md-block">
                  <h5>
                    <Link href={`/posts/user/solo/pesquisa/${id}`}>
                      <a className="list-group-item">{titulo}</a>
                    </Link>
                  </h5>
                  <p>
                    Por:{" "}
                    <Link href={`/posts/user/solo/discente/${id}`}>
                      <a className="list-group-item">{discente.nome}</a>
                    </Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { useState, useEffect, useContext } from "react";
import HDPagAdmin from "../../../../components/header/pagadmin";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { AuthContext } from "../login/login";

export const getStaticProps = async () => {
  const response = await axios.get(
    process.env.URL_API + "/docente"
  );
  const docentes = await response.data;
  return {
    props: {
      docentes
    },
    revalidate: 300,
  };
};

export default function TodosDocentesAdmin({ docentes }) {
  let router = useRouter();

  const [consulta, setConsulta] = useState("");
  const [itensporPagina, setItensporPagina] = useState(10);
  const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);

  const keys = ["nome"];

  const filtro = (item) => {
    return item.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(consultaGeral))
    );
  };

  const consultaGeral = consulta.toLowerCase();
  const paginas = Math.ceil(filtro(docentes).length / itensporPagina);
  const startIndex = paginasRecorrentes * itensporPagina;
  const endIndex = startIndex + itensporPagina;
  const docentesfiltrados = filtro(docentes).slice(startIndex, endIndex);

  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(
      `https://databasebibliotecadigital.undertak3r.repl.co/docente/${id}`
    );
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir o professor");
    } else {
      router.push("/posts/admin/todos/docente");
      toast.success("Professor excluído com sucesso");
    }
  };

  const {usuario} = useContext(AuthContext)

  const Protecaoderota = ({children}) => {
    return usuario ? children : (<h2 className="mt-4 verde">Acesso negado, você precisa estar autenticado!</h2>)
  }


  useEffect(() => {
    setPaginasRecorrentes(0);
  }, [setItensporPagina]);
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Lista de Docentes</title>
      </Head>
      <HDPagAdmin />
      <ToastContainer />
      <div className="container mt-2">
        <form className="d-flex" role="search">
          <input
            className="form-control filtro"
            type="search"
            placeholder="Pesquisar"
            aria-label="Search"
            onChange={(e) => setConsulta(e.target.value)}
          />
        </form>
      </div>
      <div className="container border rounded p-3 mt-2 w-50">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th className="d-flex justify-content-end">Ações</th>
            </tr>
          </thead>
         <Protecaoderota>
         <tbody>
            {docentesfiltrados.map(
              ({ id, nome, email, cpf, data_nascimento, formacao }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>
                    <Link href={`/posts/admin/solo/docente/${id}`}>
                      <a className="list-group-item">{nome}</a>
                    </Link>
                  </td>
                  <td>{email}</td>
                  <td className="d-flex justify-content-end">
                    <Link href={`/posts/admin/alterar/docente/${id}`}>
                      <button className="btn btn-sm btn-secondary me-1">
                        Alterar
                      </button>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={handleDelete}
                      id={id}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
         </Protecaoderota>
        </table>

        <center>
          <div>
            {Array.from(Array(paginas), (docentesfiltrados, index) => {
              return (
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  key={index}
                  value={index}
                  onClick={(e) => setPaginasRecorrentes(Number(e.target.value))}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </center>
        <center>
          <form>
            <span>Professores por página: </span>

            <select onChange={(e) => setItensporPagina(Number(e.target.value))}>
              <option value={5}>5</option>
              <option selected value={10}>
                10
              </option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </form>
        </center>
      </div>
    </div>
  );
}

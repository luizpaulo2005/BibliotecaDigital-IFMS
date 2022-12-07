import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import HDPagAdmin from "../../../../components/header/pagadmin";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Login from "../login/login";
import { AuthContext } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { filtro } from "../../../../components/Filter/filtro";
import { parseCookies } from 'nookies';

/* 
Função getServerSideProps
É a função que realiza o fetch(busca), dos dados na api, convertendo-os em dados que podem ser utilizados por outros componentes dentro do arquivo
Sua primeira variável, response, é a que realiza a conexão e chama os dados para si mesma
A segunda variável, attributes, coleta os dados da variável response e os converte para objeto
Por fim, a função retorna em um objeto a variável attributes para ser utilizada em outros componentes
*/
export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.URL_API + "/discente");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null
        //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};
//está função também é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function TodosDiscentesAdmin({ attributes, Auth }) {
  const  usuario  = Auth

  const Protecaoderota = ({ children }) => {
  let router = useRouter();

    const [consulta, setConsulta] = useState("");
    const [itensporPagina, setItensporPagina] = useState(10);
    const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);
  
    const keys = ["nome"];
  
    const consultaGeral = consulta.toLowerCase();
    const paginas = Math.ceil(
      filtro(attributes, keys, consultaGeral).length / itensporPagina
    );
    const startIndex = paginasRecorrentes * itensporPagina;
    const endIndex = startIndex + itensporPagina;
    const discentesfiltrados = filtro(attributes, keys, consultaGeral).slice(
      startIndex,
      endIndex
    );
  
    useEffect(() => {
      setPaginasRecorrentes(0);
    }, [setItensporPagina]);
  
    const handleDelete = async (e) => {
      e.preventDefault();
      const { id } = e.target;
      const data = {
        id: Number(id),
      };
      const response = await axios.delete(
        `https://databasebibliotecadigital.undertak3r.repl.co/discente/${id}`
      );
      if (!response.statusText === "OK") {
        toast.error("Erro ao excluir o aluno");
      } else {
        router.push("/posts/admin/todos/discente");
        toast.success("Aluno excluído com sucesso");
      }
    };

    return usuario ? (
      <div className="container-fluid g-0">
      <Head>
        <title>Lista de Alunos</title>
      </Head>
      <HDPagAdmin />
      <ToastContainer />
      <div className="container border rounded mt-2 p-3 w-75">
        <div className="container d-flex justify-content-center">
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
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th className="d-flex justify-content-end">Ações</th>
            </tr>
          </thead>
         
            <tbody>
              {discentesfiltrados.map(
                ({ id, nome, email, data_nascimento }) => (
                  <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>
                      <Link href={`/posts/admin/solo/discente/${id}`}>
                        <a className="list-group-item">{nome}</a>
                      </Link>
                    </td>
                    <td>{email}</td>
                    <td className="d-flex justify-content-end">
                      <Link href={`/posts/admin/alterar/discente/${id}`}>
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
          
        </table>

        <center>
          <div>
            {Array.from(Array(paginas), (discentesfiltrados, index) => {
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
            <span>Alunos por página: </span>

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
    ) : (
     <Login></Login>
    );
  };

  return (
   <Protecaoderota></Protecaoderota>
  );
}

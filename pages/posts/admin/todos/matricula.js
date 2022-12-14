import axios from "axios";
import { useContext } from "react";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import Login from "../login/login";
import { AuthContext } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { parseCookies } from "nookies";
import HeaderAdmin from "../../../../components/header_admin";
import { filtro } from "../../../../components/Filter/filtro";
import { useState, useEffect } from "react";

/* 
Função getServerSideProps
É a função que realiza o fetch(busca), dos dados na api, convertendo-os em dados que podem ser utilizados por outros componentes dentro do arquivo
Sua primeira variável, response, é a que realiza a conexão e chama os dados para si mesma
A segunda variável, attributes, coleta os dados da variável response e os converte para objeto
Por fim, a função retorna em um objeto a variável attributes para ser utilizada em outros componentes
*/

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API + "/matricula");
  const attributes = await response.data;
  console.log(attributes);
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null,
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};

//está função também é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function TodasMatriculasAdmin({ attributes, Auth }) {
  const handleDelete = async (e) => {
    e.preventDefault();
    const { id } = e.target;
    const data = {
      id: Number(id),
    };
    const response = await axios.delete(
      `https://databasebibliotecadigital.undertak3r.repl.co/matricula/${id}`
    );
    if (!response.statusText === "OK") {
      toast.error("Erro ao excluir a matrícula");
    } else {
      router.push("/posts/admin/todos/matricula");
      toast.success("Matrícula excluída com sucesso");
    }
  };

  const usuario = Auth;
  // essa constante é resposanvel por armazenar os status do usuário

  //Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
  //Se não houver um usuário será renderizada a página de Login
  const Protecaoderota = () => {
    const [consulta, setConsulta] = useState("");
    //Aqui é onde os dados do filtro é armazenado
    const [itensporPagina, setItensporPagina] = useState(10);
    //Aqui é onde é colocado a quantidade de elemetos tera por pagina na paginação, por "Default", está posto por 10
    const [paginasRecorrentes, setPaginasRecorrentes] = useState(0);
    //Aqui é onde o usuario pode ver quantas paginas ainda podem ser vistas, esse pedenra de quantos elementos no total tem.

    const keys = ["id"];
    // aqui é onde  eu defino o atributo que o filtro ira procura quando utilizar a função "pesquisa"

    const consultaGeral = consulta.toLowerCase();
    // Aqui é colocado todos os caracteres em minusculos para que fiquei mais facil de procurar
    const paginas = Math.ceil(
      filtro(attributes, keys, consultaGeral).length / itensporPagina
    );
    // aqui é definido as celulas
    const startIndex = paginasRecorrentes * itensporPagina;
    //aqui é definido a quantidade de itens na pagina conforme indicado no select ou por default
    const endIndex = startIndex + itensporPagina;
    //Aqui é somado para definir quantas páginas serão dependendo do valor de itens selecionados por página
    const matriculasfiltradas = filtro(attributes, keys, consultaGeral).slice(
      startIndex,
      endIndex
    );

    useEffect(() => {
      setPaginasRecorrentes(0);
    }, [setItensporPagina]);

    return usuario ? (
      <div className="container-fluid g-0">
        <Head>
          <title>Lista de Matriculas</title>
        </Head>
        <HeaderAdmin />
        <ToastContainer />
        <div className="container d-flex justify-content-center flex-column border rounded mt-2 p-3 col-lg-8 col-md-8 col-sm-12">
          <center>
            <input
              className="form-control filtro"
              type="search"
              placeholder="Pesquisar"
              aria-label="Search"
              onChange={(e) => setConsulta(e.target.value)}
            />
          </center>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data de Início</th>
                <th>Pertence ao:</th>
                <th className="d-flex justify-content-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {matriculasfiltradas.map(({ id, data_inicio, discentes }) => (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{format(parseISO(data_inicio), "dd/MM/yyyy")}</td>
                  <Link href={`/posts/admin/solo/discente/${discentes[0].id}`}>
                    <td>{discentes[0].nome}</td>
                  </Link>
                  <td className="d-flex justify-content-end">
                    <Link href={`/posts/admin/alterar/matricula/${id}`}>
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
              ))}
            </tbody>
          </table>
          <center>
            <div>
              {Array.from(Array(paginas), (matriculasfiltradas, index) => {
                return (
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    key={index}
                    value={index}
                    onClick={(e) =>
                      setPaginasRecorrentes(Number(e.target.value))
                    }
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </center>
          <center>
            <form>
              <span>Trabalhos por página: </span>

              <select
                onChange={(e) => setItensporPagina(Number(e.target.value))}
              >
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

  return <Protecaoderota></Protecaoderota>;
}

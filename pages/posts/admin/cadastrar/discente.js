import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, Children } from "react";
import { toast, ToastContainer } from "react-toastify";
import Login from "../login/login";
import { AuthContext } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { parseCookies } from "nookies";
import HeaderAdmin from "../../../../components/header_admin";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API + "/matricula");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null,
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo e não terá um usuário disponível
    },
  };
};
//está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function CadastrarDiscente({ attributes, Auth }) {
  const usuario = Auth;
  // essa constante é resposanvel por armazenar os status do usuário

  //Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
  //Se não houver um usuário será renderizada a página de Login
  const Protecaoderota = () => {
    const [discente, setDiscente] = useState({
      nome: "",
      matriculaId: "",
      email: "",
      data_nascimento: "",
      cpf: "",
    });

    let router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const emptyFieldCheck = Object.values(discente).some(
        (element) => element === ""
      );
      if (emptyFieldCheck) {
        toast.error("Há algum campo vazio");
        return;
      }

      const data = {
        ...discente,
      };

      const response = await axios.post(
        "https://databasebibliotecadigital.undertak3r.repl.co/discente",
        data
      );

      if (!response.statusText === "OK") {
        toast.error("Erro ao cadastrar o aluno");
      } else {
        toast.success("Aluno cadastrado com sucesso");
        router.push("/posts/admin/todos/discente");
      }
    };

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setDiscente({ ...discente, [id]: value });
    };

    const { nome, matriculaId, email, data_nascimento, cpf } = discente;
    return usuario ? (
      <div className="container-fluid g-0">
        <Head>
          <title></title>
        </Head>
        <HeaderAdmin />
        <ToastContainer />
        <div className="container border rounded mt-2 p-3">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Cadastro de Alunos</legend>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Nome
                </span>
                <input
                  id="nome"
                  type="text"
                  onChange={handleInputChange}
                  value={discente.nome}
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-1">
                <span className="input-group-text" id="basic-addon1">
                  Matrícula
                </span>
                <input
                  id="matriculaId"
                  list="matricula"
                  type="text"
                  onChange={handleInputChange}
                  value={discente.matriculaId}
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <datalist id="matricula">
                {attributes.map(({ id }) => (
                  <option key={id} value={id} />
                ))}
              </datalist>
              <div id="emailHelp" className="form-text mb-1">
                *Antes de cadastrar um aluno, certificar que a matrícula
                esteja cadastrada préviamente.<br/>
                **Um aluno não pode ser cadastrado sem uma matrícula.
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  E-mail
                </span>
                <input
                  id="email"
                  type="email"
                  onChange={handleInputChange}
                  value={discente.email}
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Data de Nascimento
                </span>
                <input
                  id="data_nascimento"
                  type="date"
                  onChange={handleInputChange}
                  value={discente.data_nascimento}
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  CPF
                </span>
                <input
                  id="cpf"
                  type="number"
                  onChange={handleInputChange}
                  value={discente.cpf}
                  className="form-control"
                  placeholder="Somente números"
                  maxLength="11"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Cadastrar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    ) : (
      <Login />
    );
  };

  return <Protecaoderota></Protecaoderota>;
}

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext, Children } from "react";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../../components/header/pagadmin";
import Login from "../login/login";
import {AuthContext} from "../../../../components/AuthContext&ReducerContext/AuthFunctions"

export const getServerSideProps = async () => {
  const response = await axios.get(process.env.URL_API + "/matricula");
  const attributes = await response.data;
  return {
    props: {
      attributes,
    },
  };
};

export default function CadastrarDiscente({ attributes }) {

  const {usuario} = useContext(AuthContext)

 const Protecaoderota = () =>{

console.log(usuario)

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

    const response = await axios.post("https://databasebibliotecadigital.undertak3r.repl.co/discente", data);

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
  return usuario ? (<div className="container-fluid g-0">
  <Head>
    <title></title>
  </Head>
  <HDPagAdmin />
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
        <div className="input-group mb-3">
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
</div>): <Login/>
 }


  

  return (
    <Protecaoderota></Protecaoderota>
  );
}

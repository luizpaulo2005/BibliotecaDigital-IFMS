import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../../../components/header/pagadmin";
import { parseCookies } from 'nookies';
import Login from "../../login/login";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  const id = context.query.id;
  const response = await axios.get(process.env.URL_API + `/docente/${id}`);
  const docentes = await response.data;
  return {
    props: {
      docentes,
      Auth : cookies.usuario || null
    },
  };
};

export default function AlterarDocente({ docentes, Auth }) {
 
  const usuario = Auth

  const Protecaoderota =()=>{
    const [docente, setDocente] = useState({
      nome: "",
      siape: "",
      email: "",
      data_nascimento: "",
      cpf: "",
      formacao: "",
    });
  
    let router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const emptyFieldCheck = Object.values(docente).some(
        (element) => element === ""
      );
      if (emptyFieldCheck) {
        toast.error("Há algum campo vazio");
        return;
      }
  
      const data = {
        ...docente,
      };
      const id = docentes.id;
      const response = await axios.put(
        process.env.URL_API + `/docente/${id}`,
        data
      );
  
      if (!response.statusText === "OK") {
        toast.error("Erro ao alterar o professor");
      } else {
        toast.success("Professor alterado com sucesso");
        router.push("/posts/admin/todos/docente");
      }
    };
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setDocente({ ...docente, [id]: value });
    };
  
    const { nome, siape, email, data_nascimento, cpf, formacao } = docente;

    return usuario ? (
      <div className="container-fluid g-0">
      <Head>
        <title>Cadastro de Professor</title>
      </Head>
      <HDPagAdmin />
      <ToastContainer />
      <div className="container border rounded p-3 mt-2">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Alterar Professor</legend>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Nome
              </span>
              <input
                id="nome"
                type="text"
                onChange={handleInputChange}
                value={docente.nome}
                placeholder={docentes.nome}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Siape
              </span>
              <input
                id="siape"
                type="text"
                onChange={handleInputChange}
                value={docente.siape}
                placeholder={docentes.siape}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                E-mail
              </span>
              <input
                id="email"
                type="email"
                onChange={handleInputChange}
                value={docente.email}
                placeholder={docentes.email}
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
                value={docente.data_nascimento}
                placeholder={docentes.data_nascimento}
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
                value={docente.cpf}
                placeholder={docentes.cpf}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Formação
              </span>
              <input
                id="formacao"
                type="text"
                onChange={handleInputChange}
                value={docente.formacao}
                placeholder={docentes.formacao}
                className="form-control"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <button className="btn btn-success" type="submit">
              Alterar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
    ): (
      <Login></Login>
    )
  }

  return (
    <Protecaoderota></Protecaoderota>
  );
}

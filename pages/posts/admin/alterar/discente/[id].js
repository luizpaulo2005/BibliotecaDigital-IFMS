import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";
import Login from "./../../login/login";
import HeaderAdmin from "../../../../../components/header_admin";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  //constante reponsável por armazenar os cookies
  const id = context.query.id;
  const response = await axios.get(
    process.env.NEXT_PUBLIC_URL_API + `/discente/${id}`
  );
  const response1 = await axios.get(
    process.env.NEXT_PUBLIC_URL_API + "/matricula"
  );
  const attributes = await response.data;
  const attributes1 = await response1.data;
  return {
    props: {
      attributes,
      attributes1,
      Auth: cookies.usuario || null,
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};
//está função também é responsável por pegar os cookies se houver, para que a páginaAdmin e suas páginas fiquem disponível para uso

export default function AlterarDiscente({ attributes, attributes1, Auth }) {
  const usuario = Auth;

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
      const id = attributes.id;
      const response = await axios.put(
        process.env.NEXT_PUBLIC_URL_API + `/discente/${id}`,
        data
      );

      if (!response.statusText === "OK") {
        toast.error("Erro ao cadastrar o aluno");
      } else {
        toast.success("Aluno alterado com sucesso");
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
          <title>Alterar {attributes.nome}</title>
        </Head>
        <HeaderAdmin />
        <ToastContainer />
        <div className="container border rounded mt-2 p-3">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Alterar informações de um Aluno</legend>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Nome
                </span>
                <input
                  id="nome"
                  type="text"
                  onChange={handleInputChange}
                  value={discente.nome}
                  defaultValue={attributes.nome}
                  placeholder={attributes.nome}
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
                  defaultValue={attributes.matriculaId}
                  placeholder={attributes.matriculaId}
                  value={discente.matriculaId}
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <datalist id="matricula">
                {attributes1.map(({ id }) => (
                  <option key={id}>{id}</option>
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
                  defaultValue={attributes.email}
                  placeholder={attributes.email}
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
                  defaultValue={attributes.data_nascimento}
                  placeholder={attributes.data_nascimento}
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
                  defaultValue={attributes.cpf}
                  className="form-control"
                  placeholder={attributes.cpf}
                  maxLength="11"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Alterar
              </button>
              <Link href="/posts/admin/todos/discente">
                <button type="button" className="btn btn-secondary ms-2">
                  Cancelar
                </button>
              </Link>
            </fieldset>
          </form>
        </div>
      </div>
    ) : (
      <Login></Login>
    );
  };

  return <Protecaoderota></Protecaoderota>;
}

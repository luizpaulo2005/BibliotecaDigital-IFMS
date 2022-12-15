import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies } from "nookies";
import Login from "../../login/login";
import HeaderAdmin from "../../../../../components/header_admin";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  //constante reponsável por armazenar os cookies
  const id = context.query.id;
  const response = await axios.get(
    process.env.NEXT_PUBLIC_URL_API + `/docente/${id}`
  );
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null,
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};
//está função também é responsável por pegar os cookies se houver, para que a páginaAdmin e suas páginas fiquem disponível para uso

export default function AlterarDocente({ attributes, Auth }) {
  const usuario = Auth;

  const Protecaoderota = () => {
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
      const id = attributes.id;
      const response = await axios.put(
        process.env.NEXT_PUBLIC_URL_API + `/docente/${id}`,
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
          <title>Alterar {attributes.nome}</title>
        </Head>
        <HeaderAdmin />
        <ToastContainer />
        <div className="container border rounded p-3 mt-2">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Alterar informações de um Professor</legend>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Nome
                </span>
                <input
                  id="nome"
                  type="text"
                  onChange={handleInputChange}
                  value={docente.nome}
                  placeholder={attributes.nome}
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
                  placeholder={attributes.siape}
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
                  value={docente.data_nascimento}
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
                  value={docente.cpf}
                  placeholder={attributes.cpf}
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
                  placeholder={attributes.formacao}
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button className="btn btn-success" type="submit">
                Alterar
              </button>
              <Link href="/posts/admin/todos/docente">
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

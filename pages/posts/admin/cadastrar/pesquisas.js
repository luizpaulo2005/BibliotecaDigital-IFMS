import axios from "axios";
import Head from "next/head";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Login from "../login/login";
import { AuthContext } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { parseCookies } from "nookies";
import HeaderAdmin from "../../../../components/header_admin";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API + "/discente");
  const response1 = await axios.get(process.env.NEXT_PUBLIC_URL_API + "/docente");
  const attributes = await response.data;
  const attributes1 = await response1.data;

  return {
    props: {
      attributes,
      attributes1,
      Auth: cookies.usuario || null,
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo e não terá um usuário disponível
    },
  };
};
//está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function CadastrarPesquisa({ attributes, attributes1, Auth }) {
  const usuario = Auth;

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

    const handleSubmitd = async (e) => {
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
      }
    };

    const handleInputChanged = (e) => {
      const { id, value } = e.target;
      setDiscente({ ...discente, [id]: value });
    };

    const { nome, matriculaId, email, data_nascimento, cpf } = discente;

    const [file, setFile] = useState();

    const [pesquisa, setPesquisa] = useState({
      titulo: "",
      discenteId: "",
      docenteId: "",
      data_apresentacao: "",
      tipo: "",
      palavras_chave: "",
      resumo: "",
      url_download: uuidv4(),
    });

    let router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      const emptyFieldCheck = Object.values(pesquisa).some(
        (element) => element === ""
      );
      if (emptyFieldCheck) {
        toast.error("Há algum campo vazio");
        return;
      }
      const data = {
        ...pesquisa,
      };

      const url =
        "https://databasebibliotecadigital.undertak3r.repl.co" + "/pesquisa";

      formData.append("titulo", data.titulo);
      formData.append("tipo", data.tipo);
      formData.append("discenteId", data.discenteId);
      formData.append("docenteId", data.docenteId);
      formData.append("data_apresentacao", data.data_apresentacao);
      formData.append("resumo", data.resumo);
      formData.append("palavras_chave", data.palavras_chave);
      formData.append("url_download", data.url_download);
      formData.append("pesquisaFile", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(url, formData, config)
        .then((response) => {
          console.log(response.data);
          toast.success("Pesquisa adicionada com sucesso");
          router.push("/posts/admin/todos/pesquisa");
        })
        .catch((error) => {
          console.log(error.response);
          toast.error("Erro a cadastrar a pesquisa");
        });
    };

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setPesquisa({ ...pesquisa, [id]: value });
    };

    const handleFileSelect = (e) => {
      setFile(e.target.files[0]);
    };

    const {
      titulo,
      discenteId,
      docenteId,
      data_apresentacao,
      tipo,
      palavras_chave,
      resumo,
      url_download,
    } = pesquisa;

    return usuario ? (
      <div className="container-fluid g-0">
        <Head>
          <title>Cadastro de Pesquisas</title>
        </Head>
        <HeaderAdmin />
        <ToastContainer />
        <div className="container">
          <form
            onSubmit={handleSubmitd}
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Adicionar Aluno
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <legend>Cadastro de Alunos</legend>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Nome
                    </span>
                    <input
                      id="nome"
                      type="text"
                      onChange={handleInputChanged}
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
                      onChange={handleInputChanged}
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
                    esteja cadastrada préviamente.
                    <br />
                    **Um aluno não pode ser cadastrado sem uma matrícula.
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      E-mail
                    </span>
                    <input
                      id="email"
                      type="email"
                      onChange={handleInputChanged}
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
                      onChange={handleInputChanged}
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
                      onChange={handleInputChanged}
                      value={discente.cpf}
                      className="form-control"
                      placeholder="Somente números"
                      maxLength="11"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fechar
                  </button>
                  <button type="sumbit" class="btn btn-primary">
                    Cadastrar Aluno
                  </button>
                </div>
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded p-3 mt-2">
              <legend>Cadastro de Pesquisas</legend>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Titulo
                </span>
                <input
                  id="titulo"
                  type="text"
                  onChange={handleInputChange}
                  value={pesquisa.titulo}
                  className="form-control"
                  aria-label="Titulo"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-1">
                <label className="input-group-text">Alunos</label>
                <input
                  id="discenteId"
                  list="listdisc"
                  type="text"
                  onChange={handleInputChange}
                  value={pesquisa.discenteId}
                  className="form-control"
                />
                <datalist id="listdisc">
                  {attributes.map(({ id, nome }) => (
                    <option key={id} value={id}>
                      {nome}
                    </option>
                  ))}
                </datalist>
                <button
                  type="button"
                  class="btn btn-primary mr-4"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Adicionar aluno
                </button>
              </div>
              <div id="emailHelp" className="form-text mb-2">
                Antes de cadastrar uma pesquisa, certificar que os alunos
                estejam cadastrados préviamente.
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text">Orientador</label>
                <input
                  id="docenteId"
                  onChange={handleInputChange}
                  value={pesquisa.docenteId}
                  className="form-control"
                  list="listdoc"
                  type="text"
                />
                <datalist id="listdoc">
                  {attributes1.map(({ id, nome }) => (
                    <option key={id} value={id}>
                      {nome}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Data de Apresentação
                </span>
                <input
                  id="data_apresentacao"
                  type="date"
                  onChange={handleInputChange}
                  value={pesquisa.data_apresentacao}
                  className="form-control"
                  aria-label="data"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <label className="input-group-text">Tipo de Pesquisa</label>
                <select
                  className="form-select"
                  id="tipo"
                  onChange={handleInputChange}
                  value={pesquisa.tipo}
                >
                  <option selected disabled>
                    Selecione o tipo de pesquisa
                  </option>
                  <option value="Artigo">Artigo</option>
                  <option>Monografia</option>
                  <option>Registro de Software</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Resumo
                </span>
                <textarea
                  id="resumo"
                  type="text"
                  onChange={handleInputChange}
                  value={pesquisa.resumo}
                  className="form-control"
                  aria-label="Resumo"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Palavras Chave
                </span>
                <input
                  id="palavras_chave"
                  type="text"
                  onChange={handleInputChange}
                  value={pesquisa.palavras_chave}
                  className="form-control"
                  aria-label="pchave"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="mb-3">
                <label for="formFile" className="form-label">
                  Arquivo PDF
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="pesquisaFile"
                  onChange={handleFileSelect}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">
                Cadastrar
              </button>
              <button type="button" className="btn btn-secondary ms-2">
                Cancelar
              </button>
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

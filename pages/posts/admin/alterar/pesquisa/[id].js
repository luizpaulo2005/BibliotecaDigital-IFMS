import axios from "axios";
import Head from "next/head";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Login from "../../login/login";
import {AuthContext} from "../../../../../components/AuthContext&ReducerContext/AuthFunctions"
import { parseCookies } from 'nookies';
import HeaderAdmin from "../../../../../components/header_admin";

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const cookies = parseCookies(context)
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.URL_API + "/discente");
  const response1 = await axios.get(process.env.URL_API + "/docente");
  const response2 = await axios.get(process.env.URL_API + `/pesquisa/${id}`)
  const attributes = await response.data;
  const attributes1 = await response1.data;
  const attributes2 = await response2.data;
  

  return {
    props: {
      attributes,
      attributes1,
      attributes2,
      Auth: cookies.usuario || null,
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo e não terá um usuário disponível
    },
  };
};
 //está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function AlterarPesquisa({ attributes, attributes1, attributes2, Auth}) {
  const usuario = Auth
console.log(attributes2.id)
//Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
//Se não houver um usuário será renderizada a página de Login
  const Protecaoderota = () =>{
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
    const id = attributes2.id
    const url = "https://databasebibliotecadigital.undertak3r.repl.co" +  `/pesquisa/${id}`;

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
      .put(url, formData, config)
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
      <title>Alterar Pesquisas</title>
    </Head>
    <HeaderAdmin />
    <ToastContainer />
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset className="border rounded p-3 mt-2">
          <legend>Alterar Pesquisas: {attributes2.titulo}</legend>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Titulo
            </span>
            <input
              id="titulo"
              type="text"
              onChange={handleInputChange}
              value={pesquisa.titulo}
              placeholder={attributes2.titulo}
              className="form-control"
              aria-label="Titulo"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Alunos</label>
            <input
              id="discenteId"
              list="listdisc"
              type="text"
              onChange={handleInputChange}
              value={pesquisa.discenteId}
              placeholder={attributes2.discenteId}
              className="form-control"
            />
            <datalist id="listdisc">
              {attributes.map(({ id, nome }) => (
                <option key={id} value={id}>
                  {nome}
                </option>
              ))}
            </datalist>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Orientador</label>
            <input
              id="docenteId"
              onChange={handleInputChange}
              value={pesquisa.docenteId}
              placeholder={attributes2.docenteId}
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
              defaultValue={attributes2.data_apresentacao}
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
              placeholder={attributes2.tipo}
            >
              <option selected disabled>
                Selecione o tipo de pesquisa
              </option>
              <option value="Artigo">Artigo</option>
              <option value="Monografia">Monografia</option>
              <option value="Registro de Software">Registro de Software</option>
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
              placeholder={attributes2.resumo}
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
              placeholder={attributes2.palavras_chave}
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
  ) : (<Login></Login>)
  } 
  return (
   <Protecaoderota></Protecaoderota>
  );
}

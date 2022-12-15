import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Login from "../login/login";
import {AuthContext} from "../../../../components/AuthContext&ReducerContext/AuthFunctions"
import { parseCookies } from 'nookies';
import HeaderAdmin from "../../../../components/header_admin";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API + "/campus");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth: cookies.usuario || null
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo e não terá um usuário disponível
    },
  };
};
 //está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function CadastrarCurso({ attributes, Auth }) {
 const usuario = Auth
// essa constante é resposanvel por armazenar os status do usuário

//Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
//Se não houver um usuário será renderizada a página de Login
 const Protecaoderota = () =>{
  const [curso, setCurso] = useState({
    nome: "",
    grade: "",
    duracao: "",
    campusId: "",
  });

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFieldCheck = Object.values(curso).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) {
      toast.error("Há algum campo vazio");
      return;
    }

    const data = {
      ...curso,
    };

    const response = await axios.post(
      "https://databasebibliotecadigital.undertak3r.repl.co/curso",
      data
    );

    if (!response.statusText === "OK") {
      toast.error("Erro ao cadastrar o curso");
    } else {
      toast.success("Curso adicionado com sucesso");
      router.push("/posts/admin/todos/curso");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCurso({ ...curso, [id]: value });
  };

  const { nome, grade, duracao, campusId } = curso;
  return usuario ? (<div className="container-fluid g-0">
  <Head>
    <title>Cadastro de Curso</title>
  </Head>
  <HeaderAdmin />
  <ToastContainer />
  <div className="container border rounded mt-2 p-3">
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Cadastro de Curso</legend>
      </fieldset>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Nome
        </span>
        <input
          id="nome"
          type="text"
          className="form-control"
          onChange={handleInputChange}
          value={curso.nome}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Grade
        </span>
        <input
          id="grade"
          type="text"
          className="form-control"
          onChange={handleInputChange}
          value={curso.grade}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Duração
        </span>
        <input
          id="duracao"
          type="text"
          className="form-control"
          onChange={handleInputChange}
          value={curso.duracao}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Campus
        </span>

        {/* 
                    
                    Cadastro Por Select

                    <select id="campusId" className="form-control" onChange={handleInputChange} value={curso.campusId}>
                    <option selected disabled>Selecione o campus do curso</option>
                    {attributes.map(({id, nome}) => (
                        <option key={id} value={id}>{nome}</option>
                    ))}
                    </select>
                    
                    */}

        {/* Cadastro por input com datalist */}

        <input
          id="campusId"
          type="text"
          list="campus"
          className="form-control"
          onChange={handleInputChange}
          value={curso.campusId}
        />
        <datalist id="campus">
          {attributes.map(({ id, nome }) => (
            <option key={id} value={id}>
              {nome}
            </option>
          ))}
        </datalist>
      </div>
      <button type="submit" className="btn btn-success">
        Cadastrar
      </button>
    </form>
  </div>
</div>) : (<Login></Login>)
 }
  return (
    <Protecaoderota></Protecaoderota>
  );
}

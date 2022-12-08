import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { parseCookies } from 'nookies';
import Login from './../../login/login';
import HeaderAdmin from "../../../../../components/header_admin";

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  //constante reponsável por armazenar os cookies
  const id = context.query.id;
  const response = await axios.get(
    process.env.URL_API + `/curso/${id}/allattributes`
  );
  const cursos = await response.data;
  return {
    props: {
      cursos,
      Auth: cookies.usuario || null
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo, e não tera um usuário disponível
    },
  };
};
//está função também é responsável por pegar os cookies se houver, para que a páginaAdmin e suas páginas fiquem disponível para uso

export default function AlterarCurso({ cursos, Auth }) {
  
  const usuario = Auth;

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
      const id = cursos.id;
      const response = await axios.put(
        process.env.URL_API + `/curso/${id}`,
        data
      );
  
      if (!response.statusText === "OK") {
        toast.error("Erro ao cadastrar o curso");
      } else {
        toast.success("Curso adicionado com sucesso");
        router.push("/posts/admin/todos/cursos");
      }
    };
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setCurso({ ...curso, [id]: value });
    };
  
    const { nome, grade, duracao, campusId } = curso;

    return usuario ? ( <div>
      <HeaderAdmin />
      <form onSubmit={handleSubmit} className="container">
        <fieldset>
          <legend>Alterar informações de um Curso</legend>
        </fieldset>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Nome:
          </span>
          <input
            id="nome"
            type="text"
            className="form-control"
            onChange={handleInputChange}
            value={curso.nome}
            placeholder={cursos.nome}
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
            placeholder={cursos.grade}
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
            placeholder={cursos.duracao}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Campus
          </span>

          <input
            id="campusId"
            type="text"
            list="campus"
            className="form-control"
            onChange={handleInputChange}
            placeholder={cursos.campusId}
            value={curso.campusId}
          />

          <datalist id="campus">
            {/* {attributes.map(({id, nome}) => (
                            <option key={id} value={id}>{nome}</option>
                        ))} */}
          </datalist>
        </div>
        <button type="submit" className="btn btn-success">
          Alterar
        </button>
      </form>
    </div>) : (<Login></Login>)
  }
  
  return (
   <Protecaoderota></Protecaoderota>
  );
}

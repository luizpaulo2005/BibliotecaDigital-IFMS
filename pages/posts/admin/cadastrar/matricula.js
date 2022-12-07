import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../../components/header/pagadmin";
import Login from "../login/login";
import {AuthContext} from "../../../../components/AuthContext&ReducerContext/AuthFunctions"
import { parseCookies } from 'nookies';

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  //constante reponsável por armazenar os cookies
  const response = await axios.get(process.env.URL_API + "/curso");
  const attributes = await response.data;
  return {
    props: {
      attributes,
      Auth : cookies.usuario || null
      //Se houver cookies vai ser passado o valor para o Auth, se não, vai ser dado como nulo e não terá um usuário disponível
    },
  };
};
 //está função é responsável por pegar os cookies se houver, para que a páginaAdmin fique disponivel para uso

export default function CadastrarMatricula({ attributes, Auth }) {
  const usuario = Auth

//Aqui temos uma função que é responsável por analizar o status do usuário, se houver um usuário, A página sera renderizada normalmente
//Se não houver um usuário será renderizada a página de Login
  const Protecaoderota = () => {
    const [matricula, setMatricula] = useState({
      id: "",
      data_inicio: "",
      cursoId: "",
    });
  
    let router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const emptyFieldCheck = Object.values(matricula).some(
        (element) => element === ""
      );
      if (emptyFieldCheck) {
        toast.error("Há algum campo vazio");
        return;
      }
  
      const data = {
        ...matricula,
      };
  
      const response = await axios.post(process.env.URL_API + "/matricula", data);
  
      if (!response.statusText === "OK") {
        toast.error("Erro ao cadastrar a matrícula");
      } else {
        toast.success("Matrícula adicionada com sucesso");
        router.push("/posts/admin/todos/matricula");
      }
    };
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setMatricula({ ...matricula, [id]: value });
    };
  
    const { id, data_inicio, cursoId } = matricula;
 return usuario ?  (<div className="container-fluid g-0">
 <Head>
   <title>Cadastro de Matricula</title>
 </Head>
 <HDPagAdmin />
 <ToastContainer />
 <div className="container border rounded mt-2 p-3">
   <form onSubmit={handleSubmit}>
     <fieldset>
       <legend>Cadastro de Matricula</legend>
       <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">
           Número da Matricula
         </span>
         <input
           id="id"
           type="text"
           className="form-control"
           onChange={handleInputChange}
           value={matricula.id}
           aria-label="Username"
           aria-describedby="basic-addon1"
         />
       </div>
       <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">
           Data de Início
         </span>
         <input
           id="data_inicio"
           type="date"
           className="form-control"
           onChange={handleInputChange}
           value={matricula.data_inicio}
           aria-label="Username"
           aria-describedby="basic-addon1"
         />
       </div>
       <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1">
           Curso
         </span>

         {/* <select id="cursoId" className="form-control" onChange={handleInputChange} value={matricula.cursoId}>
               <option selected disabled>Selecione o curso da matrícula</option>
               {attributes.map(({id, nome})=> (
                   <option key={id} value={id}>{nome}</option>
               ))}
               </select> */}

         <input
           list="cursos"
           type="number"
           id="cursoId"
           className="form-control"
           onChange={handleInputChange}
           value={matricula.cursoId}
         />

         <datalist id="cursos">
           {attributes.map(({ id, nome, campus }) => (
             <option key={id} value={id}>
               {nome} - Campus {campus.nome}
             </option>
           ))}
         </datalist>
       </div>
       <button className="btn btn-success">Cadastrar</button>
     </fieldset>
   </form>
 </div>
</div>)  : (<Login />)
  }
  return (
   <Protecaoderota></Protecaoderota>
  );
}

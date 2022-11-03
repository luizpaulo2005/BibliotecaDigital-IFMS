import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import HDPagAdmin from "./../../../components/header/pagadmin";

export const getStaticProps = async () => {
  const response = await axios.get(
    process.env.URL_API + "/campus"
  );
  const attributes = await response.data;
  return {
    props: {
      attributes
    },
  };
};

export default function CadastrarCurso({ attributes }) {
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
      ...curso
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
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Cadastro de Curso</title>
      </Head>
      <HDPagAdmin />
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
    </div>
  );
}

import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HeaderAdmin from "../../../../../components/header_admin";
import Login from "../../login/login";

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  const cookies = parseCookies(context);
  const response = await axios.get(process.env.NEXT_PUBLIC_URL_API + "/curso");
  const response1 = await axios.get(
    process.env.NEXT_PUBLIC_URL_API + `/matricula/${id}`
  );
  const attributes = await response.data;
  const attributes1 = await response1.data;
  return {
    props: {
      attributes,
      attributes1,
      Auth: cookies.usuario || null,
    },
  };
};

export default function AlterarMatricula({ attributes, attributes1, Auth }) {
  const usuario = Auth;

  const Protecaoderota = () => {
    const [matricula, setMatricula] = useState({
      id: "",
      data_inicio: "",
      cursoId: "",
    });

    let router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault;
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
      const id = matricula.id;
      const response = await axios.put(
        process.env.NEXT_PUBLIC_URL_API + `/matricula/${id}`,
        data
      );

      if (!response.statusText === "OK") {
        toast.error("Erro ao alterar a matrícula");
      } else {
        toast.success("Matrícula alterada com sucesso");
        router.push("/posts/admin/todos/matricula");
      }
    };
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setMatricula({ ...matricula, [id]: value });
    };

    const { id, data_inicio, cursoId } = matricula;

    return usuario ? (
      <div className="container-fluid g-0">
        <Head>
          <title>Alterar {attributes1.id}</title>
        </Head>
        <HeaderAdmin />
        <ToastContainer />
        <div className="container border rounded mt-2 p-3">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Alterar informações de uma Matricula</legend>
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
                  placeholder={attributes1.id}
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
                  placeholder={attributes1.data_inicio}
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
                  placeholder={attributes1.cursoId}
                />

                <datalist id="cursos">
                  {attributes.map(({ id, nome, campus }) => (
                    <option key={id} value={id}>
                      {nome} - Campus {campus.nome}
                    </option>
                  ))}
                </datalist>
              </div>
              <button className="btn btn-success">Alterar</button>
            </fieldset>
          </form>
        </div>
      </div>
    ) : (
      <Login />
    );
  };
  return <Protecaoderota></Protecaoderota>;
}

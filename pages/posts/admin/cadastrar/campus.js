import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from "./../../../components/header/pagadmin";

export default function CadastrarCampus() {
  const [campus, setCampus] = useState({
    nome: "",
    cidade: "",
    estado: "",
    email: "",
  });

  let router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFieldCheck = Object.values(campus).some(
      (element) => element === ""
    );
    if (emptyFieldCheck) {
      toast.error("Há algum campo vazio");
      return;
    }
    const data = {
      ...campus
    };

    const response = await axios.post(
      "https://databasebibliotecadigital.undertak3r.repl.co/campus",
      data
    );

    if (!response.statusText === "OK") {
      toast.error("Erro ao cadastrar o campus");
    } else {
      toast.success("Campus adicionado com sucesso");
      router.push("/posts/admin/todos/campus");
    }
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCampus({ ...campus, [id]: value });
  };

  const { nome, cidade, estado, email } = campus;
  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Cadastrar Campus</title>
      </Head>
      <HDPagAdmin />
      <ToastContainer />
      <div className="container border rounded mt-2 p-3">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cadastro de Campus</legend>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Nome
              </span>
              <input
                id="nome"
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={campus.nome}
                aria-label="Nome"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Cidade
              </span>
              <input
                id="cidade"
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={campus.cidade}
                aria-label="Cidade"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Estado
              </span>
              <input
                id="estado"
                list="estados"
                type="text"
                className="form-control"
                onChange={handleInputChange}
                value={campus.estado}
                aria-label="Estado"
                aria-describedby="basic-addon1"
              />
            </div>

            <datalist id="estados">
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </datalist>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                E-mail
              </span>
              <input
                id="email"
                type="email"
                className="form-control"
                onChange={handleInputChange}
                value={campus.email}
                aria-label="E-mail"
                aria-describedby="basic-addon1"
              />
            </div>
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

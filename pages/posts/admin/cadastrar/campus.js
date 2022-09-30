import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HDPagInicial from "../../../components/header/paginicial";

export default function CadastrarCampus(){
    const [campus, setCampus] = useState({
        nome: "",
        cidade: "",
        estado: "",
        email: ""
    })

    let router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyFieldCheck = Object.values(campus).some((element)=> element === "")
        if(emptyFieldCheck){
            toast.error("Há algum campo vazio");
            return
        }
        const data = {
            ...campus
        }

        const response = await axios.post('https://databasebibliotecadigital.undertak3r.repl.co/campus', data)

        if(!response.statusText === "OK"){
            toast.error("Erro ao cadastrar o campus")
        }else{
            toast.success("Campus adicionado com sucesso")
            router.push('/posts/user/todos/campus')
        }
    }
        const handleInputChange = (e) => {
            const { id, value } = e.target;
            setCampus({...campus, [id]:value})
        }

        const {nome, cidade, estado, email} =  campus;
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Cadastrar Campus</title>
            </Head>
            <HDPagInicial/>
            <ToastContainer/>
            <div className="container border rounded mt-2 p-3">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Cadastro de Campus</legend>
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Nome</span>
                        <input id="nome" type="text" class="form-control" onChange={handleInputChange} value={campus.nome} aria-label="Nome" aria-describedby="basic-addon1"/>
                        </div>
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Cidade</span>
                        <input id="cidade" type="text" class="form-control" onChange={handleInputChange} value={campus.cidade} aria-label="Cidade" aria-describedby="basic-addon1"/>
                        </div>
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Estado</span>
                        <input id="estado" type="text" class="form-control" onChange={handleInputChange} value={campus.estado} aria-label="Estado" aria-describedby="basic-addon1"/>
                        </div>
                        <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">E-mail</span>
                        <input id="email" type="text" class="form-control" onChange={handleInputChange} value={campus.email} aria-label="E-mail" aria-describedby="basic-addon1"/>
                        </div>
                        <button type="submit" className="btn btn-success">Cadastrar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
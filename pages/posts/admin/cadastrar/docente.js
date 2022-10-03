import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../components/header/pagadmin";

export default function CadastrarDocente(){

    const [docente, setDocente] = useState({
        nome: "",
        siape: "",
        email: "",
        data_nascimento: "",
        cpf: "",
        formacao: ""
    });

    let router = useRouter();

        const handleSubmit = async (e) =>{
            e.preventDefault();
            const emptyFieldCheck = Object.values(docente).some((element) => element === "");
            if(emptyFieldCheck){
                toast.error("Há algum campo vazio");
                return
            }

            const data = {
                ...docente
            }
    
            const response = await axios.post('https://databasebibliotecadigital.undertak3r.repl.co/docente', data)
    
            if(!response.statusText === "OK"){
                toast.error("Erro ao cadastrar o professor");
            }else{
                toast.success("Professor cadastrado com sucesso");
                router.push('/posts/admin/todos/docente')
            }
        }
    
        const handleInputChange = (e) =>{
            const {id, value} = e.target;
            setDocente({...docente, [id]: value})
        }
    
        const {nome, siape, email, data_nascimento, cpf, formacao} = docente
        

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Cadastro de Professor</title>
            </Head>
            <HDPagAdmin/>
            <ToastContainer/>
            <div className="container border rounded p-3 mt-2">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Cadastro de Professor</legend>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Nome</span>
                    <input id="nome" type="text" onChange={handleInputChange} value={docente.nome} class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Siape</span>
                    <input id="siape" type="text" onChange={handleInputChange} value={docente.siape} class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">E-mail</span>
                    <input id="email" type="email" onChange={handleInputChange} value={docente.email} class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div> 
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Data de Nascimento</span>
                    <input id="data_nascimento" type="date" onChange={handleInputChange} value={docente.data_nascimento} class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">CPF</span>
                    <input id="cpf" type="number" onChange={handleInputChange} value={docente.cpf} placeholder="Somente Números" class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Formação</span>
                    <input id="formacao" type="text" onChange={handleInputChange} value={docente.formacao} class="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <button className="btn btn-success" type="submit">Cadastrar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
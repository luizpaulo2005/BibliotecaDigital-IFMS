import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from "../../../../components/header/pagadmin";

export const getServerSideProps = async (context) => {
    const id = context.query.id
    const response = await axios.get(`https://databasebibliotecadigital.undertak3r.repl.co/discente/${id}`);
    const discentes = await response.data;
    return{
        props:{
            discentes
        }
    }
}

export default function AlterarDiscente({discentes}){
    const [discente, setDiscente] = useState({
        nome: "",
        matriculaId: "",
        email: "",
        data_nascimento: "",
        cpf: ""
    });

    let router = useRouter();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const emptyFieldCheck = Object.values(discente).some((element) => element === "");
        if(emptyFieldCheck){
            toast.error("Há algum campo vazio");
            return
        }

        const data = {
            ...discente
        }
        const id = discentes.id
        const response = await axios.put(`https://databasebibliotecadigital.undertak3r.repl.co/discente/${id}`, data)

        if(!response.statusText === "OK"){
            toast.error("Erro ao cadastrar o aluno");
        }else{
            toast.success("Aluno alterado com sucesso");
            router.push('/posts/admin/todos/discente')
        }
    }

    const handleInputChange = (e) =>{
        const {id, value} = e.target;
        setDiscente({...discente, [id]: value})
    }

    const {nome, matriculaId, email, data_nascimento, cpf} = discente

    return(
        <div className="container-fluid g-0">
            <Head>
                <title></title>
            </Head>
            <HDPagAdmin/>
            <ToastContainer/>
            <div className="container border rounded mt-2 p-3">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Alterar Aluno</legend>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nome</span>
                        <input id="nome" type="text" onChange={handleInputChange} value={discente.nome} defaultValue={discentes.nome} placeholder={discentes.nome} className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Matrícula</span>
                        <input id="matriculaId" list="matricula" type="text" onChange={handleInputChange} defaultValue={discentes.matriculaId} placeholder={discentes.matriculaId} value={discente.matriculaId} className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">E-mail</span>
                        <input id="email" type="email" onChange={handleInputChange} value={discente.email} defaultValue={discentes.email} placeholder={discentes.email} className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Data de Nascimento</span>
                        <input id="data_nascimento" type="date" onChange={handleInputChange} value={discente.data_nascimento} defaultValue={discentes.data_nascimento} placeholder={discentes.data_nascimento} className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">CPF</span>
                        <input id="cpf" type="number" onChange={handleInputChange} value={discente.cpf} defaultValue={discentes.cpf} className="form-control" placeholder={discentes.cpf} maxLength="11" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <button type="submit" className="btn btn-success">Alterar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
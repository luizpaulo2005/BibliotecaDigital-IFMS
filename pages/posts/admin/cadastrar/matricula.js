import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from './../../../components/header/pagadmin';

export const getStaticProps = async () =>{
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/curso')
    const attributes = await response.data
    return {
        props: {
            attributes
        }
    }
}

export default function CadastrarMatricula({attributes}){
    const [matricula, setMatricula] = useState({
        id: "",
        data_inicio: "",
        cursoId: ""
    });

    let router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyFieldCheck = Object.values(matricula).some((element) => element === "");
        if(emptyFieldCheck){
            toast.error('Há algum campo vazio');
            return
        }

        const data = {
            ...matricula
        }

        const response = await axios.post('https://databasebibliotecadigital.undertak3r.repl.co/matricula', data)

        if(!response.statusText === "OK"){
            toast.error("Erro ao cadastrar a matrícula")
        }else{
            toast.success("Matrícula adicionada com sucesso")
            router.push("/posts/admin/todos/matricula")
        }
    }
        const handleInputChange = (e) =>{
            const {id, value} = e.target;
            setMatricula({...matricula, [id]: value})
        }

        const {id, data_inicio, cursoId} = matricula

    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Cadastro de Matricula</title>
            </Head>
            <HDPagAdmin/>
            <ToastContainer/>
            <div className="container border rounded mt-2 p-3">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Cadastro de Matricula</legend>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Número da Matricula</span>
                        <input id="id" type="text" className="form-control" onChange={handleInputChange} value={matricula.id} aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Data de Início</span>
                    <input id="data_inicio" type="date" className="form-control" onChange={handleInputChange} value={matricula.data_inicio} aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Curso</span>

                    {/* <select id="cursoId" className="form-control" onChange={handleInputChange} value={matricula.cursoId}>
                    <option selected disabled>Selecione o curso da matrícula</option>
                    {attributes.map(({id, nome})=> (
                        <option key={id} value={id}>{nome}</option>
                    ))}
                    </select> */}
                    
                    <input list="cursos" type="number" id="cursoId" className="form-control" onChange={handleInputChange} value={matricula.cursoId}/>
                    
                    <datalist id="cursos">
                    {attributes.map(({id, nome, campus})=> (
                        <option key={id} value={id}>{nome} - Campus {campus.nome}</option>
                    ))}
                    </datalist>
                    
                    </div>
                    <button className="btn btn-success">Cadastrar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import HDPagAdmin from '../../../../components/header/pagadmin';

export const getServerSideProps = async (context) => {
    const id = context.query.id
    const response = await axios.get(`https://databasebibliotecadigital.undertak3r.repl.co/curso/${id}`);
    const cursos = await response.data;
    return{
        props:{
            cursos
        }
    }
}



export default function AlterarCurso({cursos}){
    const [curso, setCurso] = useState({
        nome: "",
        grade: "",
        duracao: "",
        campusId: ""
    });

    let router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyFieldCheck = Object.values(curso).some((element) => element === "")
        if(emptyFieldCheck){
            toast.error("Há algum campo vazio")
            return
        }

        const data = {
            ...curso
        }
        const id = cursos.id
        const response = await axios.put(`https://databasebibliotecadigital.undertak3r.repl.co/curso/${id}`, data);
        
        if(!response.statusText === "OK"){
            toast.error("Erro ao cadastrar o curso")
        }else{
            toast.success("Curso adicionado com sucesso")
            router.push('/posts/admin/todos/cursos')
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCurso({...curso, [id]: value})
    }

    const {nome, grade, duracao, campusId} = curso

    return (
        <div>
            <HDPagAdmin/>  
                <form onSubmit={handleSubmit} className="container">
                <fieldset>
                        <legend>Alterar informações de um Curso</legend>
                </fieldset>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Nome:</span>
                        <input id="nome" type="text" className="form-control" onChange={handleInputChange} value={curso.nome} placeholder={cursos.nome} aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Grade</span>
                        <input id="grade" type="text" className="form-control" onChange={handleInputChange} value={curso.grade} placeholder={cursos.grade} aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Duração</span>
                        <input id="duracao" type="text" className="form-control" onChange={handleInputChange} value={curso.duracao} placeholder={cursos.duracao} aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Campus</span>

                        <input id="campusId" type="text" list="campus" className="form-control" onChange={handleInputChange} placeholder={cursos.campusId} value={curso.campusId}/>

                        </div>
                    <button type="submit" className="btn btn-success">Alterar</button>
                </form>

        </div>
    )
}
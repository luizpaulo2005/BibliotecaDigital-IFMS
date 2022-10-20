import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import HDPagAdmin from './../../../components/header/pagadmin';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

export const getStaticProps = async () =>{
    const response = await axios.get("https://databasebibliotecadigital.undertak3r.repl.co/discente")
    const response1 = await axios.get("https://databasebibliotecadigital.undertak3r.repl.co/docente")
    const attributes = await response.data;
    const attributes1 = await response1.data;

    return{
        props: {
            attributes, attributes1
        }
    }
}

export default function CadastrarPesquisa({attributes, attributes1}){

    const [pesquisa, setPesquisa] = useState({
        titulo: "",
        discenteId: "",
        docenteId: "",
        data_apresentacao: "",
        tipo: "",
        palavras_chave: "",
        resumo: "",
        url_download: uuidv4()
    });

    let router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emptyFieldCheck = Object.values(pesquisa).some((element) => element === "")
        if(emptyFieldCheck){
            toast.error("Há algum campo vazio")
            return
        }

        const data = {
            ...pesquisa
        }

        const response = await axios.post('https://databasebibliotecadigital.undertak3r.repl.co/pesquisa' + {headers: {'Content-Type': 'multipart/form-data' }}, data);

        if (!response.statusText === "OK") {
            toast.error("Erro a cadastrar a pesquisa")
        } else {
            toast.success("Pesquisa adicionada com sucesso")
            router.push('/posts/admin/todos/pesquisas')
        }
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPesquisa({...pesquisa, [id]: value})
    }

    const {titulo, discenteId, docenteId, data_apresentacao, tipo, palavras_chave, resumo, url_download } = pesquisa
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>
                Cadastro de Pesquisas
                </title>
                </Head>
            <HDPagAdmin/>
            <ToastContainer/>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <fieldset className="border rounded p-3 mt-2">
                        <legend>Cadastro de Pesquisas</legend>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Titulo</span>
                        <input id="titulo" type="text" onChange={handleInputChange} value={pesquisa.titulo} className="form-control" aria-label="Titulo" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <label className="input-group-text">Alunos</label>
                        <input id="discenteId" list="listdisc" type="text" onChange={handleInputChange} value={pesquisa.discenteId} className="form-control"/>
                        <datalist id="listdisc">
                        {attributes.map(({id, nome})=>(
                            <option key={id} value={id}>{nome}</option>
                           ))}
                        </datalist>
                        </div>
                        <div className="input-group mb-3">
                        <label className="input-group-text">Orientador</label>
                        <input id="docenteId" onChange={handleInputChange} value={pesquisa.docenteId} className="form-control" list="listdoc" type="text"/>
                        <datalist id="listdoc">
                            {attributes1.map(({id, nome}) => (
                                <option key={id} value={id}>{nome}</option>
                            ))}
                        </datalist>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Data de Apresentação</span>
                        <input id="data_apresentacao" type="date" onChange={handleInputChange} value={pesquisa.data_apresentacao} className="form-control" aria-label="data" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <label className="input-group-text">Tipo de Pesquisa</label>
                        <select className="form-select" id="tipo" onChange={handleInputChange} value={pesquisa.tipo}>
                            <option selected disabled>Selecione o tipo de pesquisa</option>
                            <option value="Artigo">Artigo</option>
                            <option>Monografia</option>
                            <option>Registro de Software</option>
                        </select>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Resumo</span>
                        <textarea id="resumo" type="text" onChange={handleInputChange} value={pesquisa.resumo} className="form-control" aria-label="Resumo" aria-describedby="basic-addon1"/>
                        </div>  
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Palavras Chave</span>
                        <input id="palavras_chave" type="text" onChange={handleInputChange} value={pesquisa.palavras_chave} className="form-control" aria-label="pchave" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="mb-3">
                         <label for="formFile" className="form-label">Arquivo PDF</label>
                        <input className="form-control" type="file" id="pesquisaFile"/>
                        </div>
                        <button type="submit" className="btn btn-success">Cadastrar</button>
                        <button type="button" className="btn btn-secondary ms-2">Cancelar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
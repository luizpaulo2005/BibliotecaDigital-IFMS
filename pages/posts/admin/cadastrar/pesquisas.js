import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import HDPagAdmin from './../../../components/header/pagadmin';

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
        palavras_chave: "",
        resumo: ""
        
    });


    return(
        <div className="container-fluid g-0">
            <Head>
                <title>
                Cadastro de Pesquisas
                </title>
                </Head>
            <HDPagAdmin/>
            <div className="container">
                <form>
                    <fieldset className="border rounded p-3 mt-2">
                        <legend>Cadastro de Pesquisas</legend>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Titulo</span>
                        <input type="text" className="form-control" aria-label="Titulo" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <label className="input-group-text" for="inputGroupSelect01">Alunos</label>
                        <input list="listdisc" type="text" className="form-control"/>
                        <datalist id="listdisc">
                        {attributes.map(({id, nome})=>(
                            <option key={id} value={id}>{nome}</option>
                           ))}
                        </datalist>
                        </div>
                        <div className="input-group mb-3">
                        <label className="input-group-text" for="inputGroupSelect01">Orientador</label>
                        <input className="form-control" list="listdoc" type="text"/>
                        <datalist id="listdoc">
                            {attributes1.map(({id, nome}) => (
                                <option key={id} value={id}>{nome}</option>
                            ))}
                        </datalist>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Data de Apresentação</span>
                        <input type="date" className="form-control" aria-label="data" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <label className="input-group-text" for="inputGroupSelect01">Tipo de Pesquisa</label>
                        <select className="form-select" id="inputGroupSelect01">
                            <option selected disabled>Selecione o tipo de pesquisa</option>
                            <option>Artigo</option>
                            <option>Monografia</option>
                            <option>Registro de Software</option>
                        </select>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Resumo</span>
                        <input type="text" className="form-control" aria-label="Resumo" aria-describedby="basic-addon1"/>
                        </div>  
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Palavras Chave</span>
                        <input type="text" className="form-control" aria-label="pchave" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="mb-3">
                         <label for="formFile" className="form-label">Arquivo PDF</label>
                        <input className="form-control" type="file" id="url_download"/>
                        </div>
                        <button type="submit" className="btn btn-success">Cadastrar</button>
                        <button type="button" className="btn btn-secondary ms-2">Cancelar</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}
import Head from "next/head";
import HDPagInicial from "../../../components/header/paginicial";

// export default function CadastrarPesquisa(){
//     return(
//         <div className="container-fluid g-0">
//             <Head>
//                 <title>
//                 Cadastro de Pesquisas
//                 </title>
//                 </Head>
//             <HDPagInicial/>
//             <div className="container">
//                 <form>
//                     <fieldset className="border rounded p-3 mt-2">
//                         <legend>Cadastro de Pesquisas</legend>
//                         <div className="input-group mb-3">
//                         <span className="input-group-text" id="basic-addon1">Titulo</span>
//                         <input type="text" className="form-control" aria-label="Titulo" aria-describedby="basic-addon1"/>
//                         </div>
//                         <div className="input-group mb-3">
//                         <label className="input-group-text" for="inputGroupSelect01">Alunos</label>
//                         <select className="form-select" id="inputGroupSelect01">
//                             <option selected disabled>Selecione o Discente</option>
//                             <option>Aluno 1</option>
//                             <option>Aluno 2</option>
//                             <option>Aluno 3</option>
//                         </select>
//                         </div>
//                         <div className="input-group mb-3">
//                         <label className="input-group-text" for="inputGroupSelect01">Orientador</label>
//                         <select className="form-select" id="inputGroupSelect01">
//                             <option selected disabled>Selecione o Orientador</option>
//                             <option>Professor 1</option>
//                             <option>Professor 2</option>
//                             <option>Professor 3</option>
//                         </select>
//                         </div>
//                         <div className="input-group mb-3">
//                         <span className="input-group-text" id="basic-addon1">Data de Apresentação</span>
//                         <input type="date" className="form-control" aria-label="data" aria-describedby="basic-addon1"/>
//                         </div>
//                         <div className="input-group mb-3">
//                         <label className="input-group-text" for="inputGroupSelect01">Tipo de Pesquisa</label>
//                         <select className="form-select" id="inputGroupSelect01">
//                             <option selected disabled>Selecione o tipo de pesquisa</option>
//                             <option>Artigo</option>
//                             <option>Monografia</option>
//                             <option>Registro de Software</option>
//                         </select>
//                         </div>
//                         <div className="input-group mb-3">
//                         <span className="input-group-text" id="basic-addon1">Resumo</span>
//                         <input type="text" className="form-control" aria-label="Resumo" aria-describedby="basic-addon1"/>
//                         </div>  
//                         <div className="input-group mb-3">
//                         <span className="input-group-text" id="basic-addon1">Palavras Chave</span>
//                         <input type="text" className="form-control" aria-label="pchave" aria-describedby="basic-addon1"/>
//                         </div>
//                         <div className="mb-3">
//                          <label for="formFile" className="form-label">Arquivo PDF</label>
//                         <input className="form-control" type="file" id="formFile"/>
//                         </div>
//                         <button type="submit" className="btn btn-success">Cadastrar</button>
//                         <button type="button" className="btn btn-secondary ms-2">Cancelar</button>
//                     </fieldset>
//                 </form>
//             </div>
//         </div>
//     )
// }
import react from "react"
import HDPagInicial from "../../../components/header/paginicial"

export default function Login(){
    return (
        <div>
            <HDPagInicial />
            
            <form className="container mt-2">
                    <fieldset className="border rounded p-3 mt-2">
                    <legend className="container navbar navbar-expand-lg bg-light verde"> Autenticação de Acesso</legend>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Login</span>
                        <input type="text" className="form-control" aria-label="Titulo" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Senha</span>
                        <input type="text" className="form-control" aria-label="Titulo" aria-describedby="basic-addon1"/>
                        </div>
                        
                        
                        <button type="submit" className="btn btn-success">Cadastrar</button>
                        <button type="button" className="btn btn-secondary ms-2">Cancelar</button>
                    </fieldset>
                </form>
        </div>
    )
}
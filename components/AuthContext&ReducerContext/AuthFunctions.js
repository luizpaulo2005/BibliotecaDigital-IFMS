import {useState, createContext, useReducer, useContext} from "react"
import { getServerSideProps } from "../../pages/posts/admin/paginaAdmin"

export const AuthContextProvider = ({children, Auth}) => {
    const [autenticacao, setAutenticacao] = useReducer(AuthReducer, UsuarioInicial)  
    //Aqui é onde eu amarzeno o estado do usuário, utilizador o useReducer
    return (
        <AuthContext.Provider value={{usuario : autenticacao.usuario, setAutenticacao}}>
            {children}
        </AuthContext.Provider>
    )
  }
  
  //Aqui é a constante que terá o estado incial no usuário quando a aplicação for iniciada, no caso nulo
  const UsuarioInicial = {
    usuario : null
  }
  
  //aqui eu crio o contexto do Usuário
  export const AuthContext = createContext(UsuarioInicial);

  //O AuthReducer e reponsável por atribuir o Status do Usuário, ou seja, se ele vai Logar, ou sair.
  export const AuthReducer = (autenticacao, tipo) => {
    switch (tipo.type){
        case "LOGIN": {
            return  {
                usuario:tipo.payload,
            }
        }
        case "LOGOUT":{
  return {
    usuario : null,
  }
        }
  
        default: return autenticacao;
    }
  } 
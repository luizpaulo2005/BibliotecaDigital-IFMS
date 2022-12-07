import { useState, createContext, useReducer, useContext } from "react";

export const AuthContextProvider = ({ children }) => {
  const [autenticacao, setAutenticacao] = useReducer(
    AuthReducer,
    UsuarioInicial
  );

  return (
    <AuthContext.Provider
      value={{ usuario: autenticacao.usuario, setAutenticacao }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const UsuarioInicial = {
  usuario: null,
};

export const AuthContext = createContext(UsuarioInicial);

export const AuthReducer = (autenticacao, tipo) => {
  switch (tipo.type) {
    case "LOGIN": {
      return {
        usuario: tipo.payload,
      };
    }
    case "LOGOUT": {
      return {
        usuario: null,
      };
    }

    default:
      return autenticacao;
  }
};
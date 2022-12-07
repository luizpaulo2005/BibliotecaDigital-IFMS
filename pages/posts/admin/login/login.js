import react from "react";
import { useState, useContext, useReducer, createContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";
import Head from "next/head";
import HDPagInicial from "../../../../components/header/paginicial";
import { AuthContext, AuthReducer } from "../../../../components/AuthContext&ReducerContext/AuthFunctions";
import { setCookie } from "nookies";




export default function Login() {
  const [error, setError] = useState(false);
  //aqui é o status da mensagem de erro
  const [email, setEmail] = useState("");
  //constante responsavel por armazenar o email que o usuario digitar
  const [password, setPassword] = useState("");
  //constante responsavel por armazenar a senha que o usuario digitar

  let router = useRouter();

  const {setAutenticacao} = useContext(AuthContext)
 

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APP_FIREBASE_KEY,
    authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_APP_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_APP_ID,
  };
  //Dados da api do Firebase
  const app = initializeApp(firebaseConfig);
  //essa const e reponsavel por pegar os dados do usuário

  // Esta função é responsavel por pegar os valores dos inputs, e se estiverem corretas, e se estiverem corretas, por meio do context
  //espalhar o status que ha um usuario logado na aplicação
  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    //essa constante é a importação da função do firebase para pegar as credencias do usuário ao logar
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //aqui eu passo a crendencial do usuário, que veio do firebase pra uma constante
        console.log(user);   
        setAutenticacao({type:"LOGIN", payload:user})
        //aqui eu passo pro AuthContextProvider que passa pro app o status do usuário.
        setCookie(null , "usuario" , "Logado", {
          maxAge: 3600 * 24,
          path: "/",       
        })
        //aqui eu declaro um cookie, com uma duração de uma hora, que estara disponivel para todas as páginas
        //para que ao recarregar
        
        router.push("/posts/admin/paginaAdmin");
        //com o router push ele ira re
      })
      .catch((error) => {
        setError(true);
        //Se a autenticação falar, o Status do erro, iniciamente "false", sera passado para "true", ao acontecer isso a mensagem
        //sera exibida para o usuario saber que o login falhou, seja por dados errados(Email ou senha), ou conexão com o firebase(Banco de dados da google)
      });
  };

  return (
    <div className="container-fluid g-0">
      <Head>
        <title>Login Administrativo</title>
      </Head>
      <HDPagInicial />

      <form onSubmit={handleLogin} className="container mt-2">
        <fieldset className="border rounded p-3 mt-2">
          <legend className="container navbar navbar-expand-lg verde">
            {" "}
            Autenticação de Acesso
          </legend>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Login
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Titulo"
              aria-describedby="basic-addon1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Senha
            </span>
            <input
              type="password"
              className="form-control"
              aria-label="Titulo"
              aria-describedby="basic-addon1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <span className="error">
              Ops, Algo deu errado, tente novamente ou contate a administração.
            </span>
          )}
          <br />
          <button type="submit" className="btn btn-success mt-2">
            Entrar
          </button>
          <button type="button" className="btn btn-secondary ms-2 mt-2">
            Cancelar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

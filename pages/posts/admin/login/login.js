import react from "react"
import HDPagInicial from "../../../components/header/paginicial"
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { initializeApp } from "firebase/app";




export default function Login(){
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    let router = useRouter();
    

    const firebaseConfig = {
        apiKey: "AIzaSyCdFNaUPOEGlEeKl6KCDxjAj4VXApFo47k",
        authDomain: "adminifms.firebaseapp.com",
        projectId: "adminifms",
        storageBucket: "adminifms.appspot.com",
        messagingSenderId: "319895162614",
        appId: "1:319895162614:web:2da4b5076c5d20f277a6d7"
      };
      const app = initializeApp(firebaseConfig);
      const auth = getAuth() 


    const handleLogin = (e) => {
      e.preventDefault();
      const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        router.push('/posts/admin/paginaAdmin')
       
      })
      .catch((error) => {
       setError(true)
      });
    }


    return (
        <div>
            <HDPagInicial />
            
            <form  onSubmit={handleLogin} className="container mt-2">
                    <fieldset className="border rounded p-3 mt-2">
                    <legend className="container navbar navbar-expand-lg bg-light verde"> Autenticação de Acesso</legend>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Login</span>
                        <input type="text" className="form-control" aria-label="Titulo" aria-describedby="basic-addon1" onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Senha</span>
                        <input type="password" className="form-control" aria-label="Titulo" aria-describedby="basic-addon1"  onChange={e=>setPassword(e.target.value)}/>
                        </div>           
                        {error &&<span className="error">Ops, Algo deu errado, tente novamente ou contate a administração.</span>}
                        <br/>
                        <button type="submit" className="btn btn-success mt-2">Entrar</button>
                        <button type="button" className="btn btn-secondary ms-2 mt-2">Cancelar</button>
                    </fieldset>
                </form>
        </div>
    )
}
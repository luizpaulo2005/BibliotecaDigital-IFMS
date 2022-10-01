import axios from "axios";
import Head from "next/head";
import HDPagInicial from "../../../components/header/paginicial";
import { useState } from "react";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/campus');
    const campus = await response.data;
    return{
        props: {
            campus
        }
    }
}

export default function TodosCampus({campus}){
const [consulta, setConsulta] = useState("")

const keys = ["nome"]

const filtro = (item) => {
  return item.filter((item) => keys.some(key=>item[key].toLowerCase().includes(consultaGeral)))
}


const campusfiltrados = campus
const consultaGeral = consulta.toLowerCase()
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Campus</title>
            </Head>
            <HDPagInicial/>
            <div class="container mt-2">
              <form class="d-flex" role="search">
               <input class="form-control filtro" type="search" placeholder="Pesquisar" aria-label="Search"  onChange={(e) => setConsulta(e.target.value)} />
             </form>
            </div>
            <div className="container border rounded mt-2 p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filtro(campus).map(({id, nome, cidade, estado, email})=>(
                        <tr key={id}>
                            <td>{nome}</td>
                            <td>{cidade}</td>
                            <td>{estado}</td>
                            <td>{email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
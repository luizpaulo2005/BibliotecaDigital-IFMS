import axios from "axios";
import Head from "next/head";
import HDPagInicial from "../../../components/header/paginicial";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/curso');
    const attributes = await response.data;
    return{
        props:{
            attributes
        }
    }
}

export default function TodosCursos({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Cursos</title>
            </Head>
            <HDPagInicial/>
            <div className="container border rounded mt-2 p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Grade</th>
                            <th>Duração</th>
                            <th>Campus</th>
                        </tr>
                    </thead>
                    <tbody>
                    {attributes.map(({id, nome, grade, duracao, campusId})=> (
                        <tr key={id}>
                            <td>{nome}</td>
                            <td>{grade}</td>
                            <td>{duracao}</td>
                            <td>{campusId}</td>
                        </tr>
                    ) )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
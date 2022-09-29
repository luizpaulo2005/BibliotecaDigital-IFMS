import axios from "axios";
import Head from "next/head";
import HDPagInicial from "../../../components/header/paginicial";

export const getStaticProps = async () => {
    const response = await axios.get('https://databasebibliotecadigital.undertak3r.repl.co/campus');
    const attributes = await response.data;
    return{
        props: {
            attributes
        }
    }
}

export default function TodosCampus({attributes}){
    return(
        <div className="container-fluid g-0">
            <Head>
                <title>Lista de Campus</title>
            </Head>
            <HDPagInicial/>
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
                    {attributes.map(({id, nome, cidade, estado, email})=>(
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
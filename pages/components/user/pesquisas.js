import Link from "next/link"

export default function TabelaPesquisas({pesquisas}){
    return(
        <table className="table border">
        <thead>
        <tr>
        <th>Titulo</th>
        <th>Discentes</th>
        <th>Orientador(es)</th>
        <th>Campus</th>
        <th>Curso</th>
        <th>Data de Apresentação</th>
        <th>Monografia</th>
        </tr>
        </thead>
        <tbody>
        {pesquisas.map(({id, titulo, discenteId, docenteId, cursoId, data_apresentacao})=> (
          <tr key={id}>
          <td>{titulo}</td>
          <td>{discenteId}</td>
          <td>{docenteId}</td>
          <td>Nova Andradina</td>
          <td>{cursoId}</td>
          <td>{data_apresentacao}</td>
          </tr>
        ))}
        </tbody>   
        </table>
    )
}
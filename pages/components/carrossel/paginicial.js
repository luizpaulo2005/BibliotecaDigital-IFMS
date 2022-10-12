import Image from "next/image";
import { format, parseISO } from "date-fns";



export default function CRSPagInicial({pesquisas}){
    return(
        <div id="carouselExampleCaptions" className="carousel slide carrossel border rounded" data-bs-ride="false">
            
        <div className="carousel-inner">
        {pesquisas.map(({id, titulo, discenteId, docenteId, data_apresentacao})=> (
        <div key={pesquisas} className="carousel-item active" data-bs-interval="3000">
        <div className="d-flex w-100">
        <Image src="https://www.ifms.edu.br/imagens/icones/s/1/ifms" alt="Image" width={800} height={488}/>
        </div>
        <div className="carousel-caption d-none d-md-block ">
       
          <div key={id}>
          <div>{titulo}</div>
          <div>{discenteId}</div>
          <div>{docenteId}</div>
          <div>{format(parseISO(data_apresentacao), 'dd/MM/yyyy')}</div>
          <div>
          </div>
          </div>
        
        </div>
        </div>
        ))}

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
        </button>
        </div>
    )
}
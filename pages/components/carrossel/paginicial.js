import Image from "next/image";

export default function CRSPagInicial(){
    return(
        <div id="carouselExampleCaptions" className="carousel slide carrossel border rounded" data-bs-ride="false">
        <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="3000">
        <div className="d-block w-100">
        <Image src="https://www.ifms.edu.br/imagens/icones/s/1/ifms" alt="Image" width={800} height={488}/>
        </div>
        <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
        </div>
        </div>
        <div className="carousel-item active" data-bs-interval="2000">
        <div className="d-block w-100">
        <Image src="https://www.ifms.edu.br/imagens/icones/s/1/ifms" alt="Image" width={800} height={488}/>
        </div>
        <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
        </div>
        </div>
        <div className="carousel-item active" data-bs-interval="2000">
        <div className="d-block w-100">
        <Image src="https://www.ifms.edu.br/imagens/icones/s/1/ifms" alt="Image" width={800} height={488}/>
        </div>
        <div className="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
        </div>
        </div>
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
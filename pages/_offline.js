import HeaderUser from "../components/header_user";

const Offline = () => {
  return (
    <div className="container-fluid g-0">
        <HeaderUser/>
        <div className="mt-2 d-flex justify-content-center">
          <h1>
          Você está Offline
          </h1>
          </div>;
    </div>
  )
};

export default Offline;

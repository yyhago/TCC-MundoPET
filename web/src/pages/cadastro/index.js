import React from 'react';
import Header from '../../components/header/header';
import Illustration from '../../assets/illustration.png';

const Cadastro = () => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid flex-grow-1 bg-primary d-flex flex-column">
        <Header logoVersion hideCart /> {/*Componente Header*/}
        <div className="row flex-grow-1 ContentBox justify-content-center">

        <div className="col-lg-6 d-none d-lg-flex text-center my-auto"> {/*Illustation*/}
          <div className="glass-effect">
            <img src={Illustration} alt="Logo" className="img-fluid imgIllustration" />
          </div>
        </div>

          <div className="col-lg-6 col-md-8 col-12 d-flex justify-content-center align-items-center"> {/*Formulário*/}
            <div className="box col-12 col-md-10 col-lg-8">
              <h2 className="text-center">Falta bem pouco para mudar o humor do seu pet, e deixar ele feliz!</h2>
              <hr />
              <br />
              <input type="text" className="form-control form-control-lg mb-3" placeholder="Nome Completo" />
              <input type="email" className="form-control form-control-lg mb-3" placeholder="E-mail" />
              <input type="text" className="form-control form-control-lg mb-3" placeholder="Telefone" />
              <input type="text" className="form-control form-control-lg mb-3" placeholder="CPF" />
              <input type="date" className="form-control form-control-lg mb-3" />
              <button className="btn btn-lg btn-block btn-secondary w-100">Finalizar Pedido</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footerCadastro"> {/*Footer Cadastro*/}
        <strong>Não vai deixar seu pet na mão né!</strong>
      </div>
    </div>
  );
};

export default Cadastro;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import setCustomer from '../../store/modules/shop/actions'; 

import Header from '../../components/header/header';
import Illustration from '../../assets/illustration.png';

const Cadastro = () => {
  const dispatch = useDispatch();
  const [customer, setCustomerState] = useState({
    external_id: new Date().getTime().toString(),
    name: '',
    type: 'individual',
    country: 'br',
    email: '',
    documents: [
      {
        type: 'cpf',
        number: '',
      },
    ],
    phone_numbers: [''],
    birthday: '',
  });

  const GoToCheckout = () => {
    dispatch(setCustomer(customer)); // Dispatch do cliente para o Redux
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid flex-grow-1 bg-primary d-flex flex-column">
        <Header logoVersion hideCart /> {/* Componente Header */}
        <div className="row flex-grow-1 ContentBox justify-content-center">
          <div className="col-lg-6 d-none d-lg-flex text-center my-auto"> {/* Ilustração */}
            <div className="glass-effect">
              <img src={Illustration} alt="Logo" className="img-fluid imgIllustration" />
            </div>
          </div>

          <div className="col-lg-6 col-md-8 col-12 d-flex justify-content-center align-items-center"> {/* Formulário */}
            <div className="box col-12 col-md-10 col-lg-8">
              <h2 className="text-center">Falta bem pouco para mudar o humor do seu pet, e deixar ele feliz!</h2>
              <hr />
              <br />
              <input
                type="text"
                className="form-control form-control-lg mb-3"
                placeholder="Nome Completo"
                onChange={(e) => setCustomerState({ ...customer, name: e.target.value })}
              />
              <input
                type="email"
                className="form-control form-control-lg mb-3"
                placeholder="E-mail"
                onChange={(e) => setCustomerState({ ...customer, email: e.target.value })}
              />
              <input
                type="text"
                className="form-control form-control-lg mb-3"
                placeholder="Telefone"
                onChange={(e) => setCustomerState({ ...customer, phone_numbers: [e.target.value] })}
              />
              <input
                type="text"
                className="form-control form-control-lg mb-3"
                placeholder="CPF"
                onChange={(e) => {
                  const newDocuments = [{ type: 'cpf', number: e.target.value }];
                  setCustomerState({ ...customer, documents: newDocuments });
                }}
              />
              <input
                type="date"
                className="form-control form-control-lg mb-3"
                onChange={(e) => setCustomerState({ ...customer, birthday: e.target.value })}
              />
              <button onClick={GoToCheckout} className="btn btn-lg btn-block btn-secondary w-100">
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footerCadastro"> {/* Footer Cadastro */}
        <strong>Não vai deixar seu pet na mão né!</strong>
      </div>
    </div>
  );
};

export default Cadastro;

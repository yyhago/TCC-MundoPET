import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../store/modules/shop/actions';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

import Header from '../../components/header/header';
import Illustration from '../../assets/illustration.png';

const Cadastro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
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

  // Função para aplicar máscara de CPF
  const maskCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  // Função para aplicar máscara de telefone
  const maskPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  // Função para validar CPF
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  // Função para validar email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Função para validar todos os campos
  const validateFields = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!customer.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(customer.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!customer.phone_numbers[0].trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (customer.phone_numbers[0].replace(/\D/g, '').length !== 11) {
      newErrors.phone = 'Telefone inválido';
    }

    const cpf = customer.documents[0].number.replace(/\D/g, '');
    if (!cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!customer.birthday) {
      newErrors.birthday = 'Data de nascimento é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const GoToCheckout = (e) => {
    e.preventDefault();
    if (validateFields()) {
      dispatch(setCustomer(customer));
      navigate('/checkout');
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid flex-grow-1 bg-primary d-flex flex-column">
        <Header hideCart />
        <div className="row flex-grow-1 ContentBox justify-content-center">
          <div className="col-lg-6 d-none d-lg-flex text-center my-auto">
            <div className="glass-effect">
              <img src={Illustration} alt="Logo" className="img-fluid imgIllustration" />
            </div>
          </div>

          <div className="col-lg-6 col-md-8 col-12 d-flex justify-content-center align-items-center">
            <div className="box col-12 col-md-10 col-lg-8">
              <h2 className="text-center">Falta bem pouco para mudar o humor do seu pet, e deixar ele feliz!</h2>
              <hr />
              <br />
              
              <input
                type="text"
                className={`form-control form-control-lg mb-3 ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Nome Completo"
                value={customer.name}
                onChange={(e) => setCustomerState({ ...customer, name: e.target.value })}
              />
              {errors.name && <div className="invalid-feedback mb-3">{errors.name}</div>}

              <input
                type="email"
                className={`form-control form-control-lg mb-3 ${errors.email ? 'is-invalid' : ''}`}
                placeholder="E-mail"
                value={customer.email}
                onChange={(e) => setCustomerState({ ...customer, email: e.target.value })}
              />
              {errors.email && <div className="invalid-feedback mb-3">{errors.email}</div>}

              <input
                type="text"
                className={`form-control form-control-lg mb-3 ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Telefone"
                value={customer.phone_numbers[0]}
                onChange={(e) => setCustomerState({ 
                  ...customer, 
                  phone_numbers: [maskPhone(e.target.value)] 
                })}
              />
              {errors.phone && <div className="invalid-feedback mb-3">{errors.phone}</div>}

              <input
                type="text"
                className={`form-control form-control-lg mb-3 ${errors.cpf ? 'is-invalid' : ''}`}
                placeholder="CPF"
                value={customer.documents[0].number}
                onChange={(e) => {
                  const maskedValue = maskCPF(e.target.value);
                  setCustomerState({
                    ...customer,
                    documents: [{ type: 'cpf', number: maskedValue }],
                  });
                }}
              />
              {errors.cpf && <div className="invalid-feedback mb-3">{errors.cpf}</div>}

              <input
                type="date"
                className={`form-control form-control-lg mb-3 ${errors.birthday ? 'is-invalid' : ''}`}
                value={customer.birthday}
                placeholder="dd/mm/aaaa"
                onChange={(e) => setCustomerState({ ...customer, birthday: e.target.value })}
              />
              {errors.birthday && <div className="invalid-feedback mb-3">{errors.birthday}</div>}

              <Link 
                to="/checkout" 
                onClick={GoToCheckout} 
                className="btn btn-lg btn-block btn-secondary w-100"
              >
                Finalizar Pedido
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="footerCadastro">
        <strong>Não vai deixar seu pet na mão!</strong>
      </div>
    </div>
  );
};

export default Cadastro;
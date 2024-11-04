import dayjs from 'dayjs';
import _, { result } from 'underscore';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Header from '../../components/header/header';
import Product from '../../components/product/list';
import './styles.css';

const Checkout = () => {
  const { cart, transactionFee, defaultRecipient } = useSelector(state => state.shop);

  const [transaction, setTransaction] = useState({
    amount: 0,
    card_number: '',
    card_cvv: '',
    card_expiration_date: '',
    card_holder_name: '',
    shipping: {
      name: 'MundoPet LTDA',
      fee: '1000',
      delivery_date: dayjs().add(7, 'days').format('YYYY-MM-DD'),
      expedited: true,
      address: {
        country: 'br',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        street_number: '',
        zipcode: '',
      },
    },
    items: [],
    split_rules: [],
  });

  const setShippingValue = (key, value) => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      shipping: {
        ...prevTransaction.shipping,
        address: {
          ...prevTransaction.shipping.address,
          [key]: value,
        },
      },
    }));
  };

  const makePurchase = () => {
    console.log(transaction);
  };

  const total = cart.reduce((total, product) => {
    return total + parseFloat(product.preco); 
  }, 0);

  useEffect(() => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      amount: total.toFixed(2).toString().replace('.', ''),
      items: cart.map(product => ({
        id: product._id,
        title: product.nome,
        unit_price: parseFloat(product.preco).toFixed(2).toString().replace('.', ''),
        quantity: 1,
        tangible: true,
      })),
      split_rules: getSplitRules()
    }));
  }, [cart]);


  const getSplitRules = () => {
    // Agrupa os produtos por petshop
    const productsByPetshop = _.groupBy(cart, (product) => product.petshop_id.recipient_id || 'undefined');
  
    // Define o total geral da compra
    const total = cart.reduce((total, product) => total + parseFloat(product.preco), 0);

    const splitRules = Object.keys(productsByPetshop)
      .filter(petshop_id => petshop_id !== 'undefined') // Filtra os petshops válidos
      .map((petshop_id) => {
        const products = productsByPetshop[petshop_id];
        // Calcula o valor total de produtos de um petshop
        const totalValueByPetshop = products.reduce((total, product) => total + parseFloat(product.preco), 0);

        // Calcula a taxa de transação para o petshop
        const totalFee = totalValueByPetshop * transactionFee;

        // Calcula a porcentagem que o petshop vai receber (subtraindo a taxa de transação)
        const percentage = Math.floor(((totalValueByPetshop - totalFee) / total) * 100);

        return {
          recipient_id: products[0].petshop_id.recipient_id, // Usa o primeiro produto para pegar o recipient_id
          percentage: percentage, // A porcentagem calculada para este petshop
          liable: true, 
          charge_processing_fee: true,
        };
      });

    // Calcula o total das porcentagens dos petshops
    const totalPetshopsPercentage = splitRules.reduce((total, recipient) => {
        return total + recipient.percentage;
    }, 0);

    // Adiciona o recebedor padrão (defaultRecipient) com a porcentagem restante
    splitRules.push({
        ...defaultRecipient,
        percentage: 100 - totalPetshopsPercentage, // O restante da porcentagem
        charge_processing_fee: true,
    });

    return splitRules;
  };




  return (
    <div className="h-100">
      <Header hideCart />

      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <span className='section-title'>Dados de Entrega</span>
            <div className="row mb-3">
              <div className="col-12">
                <input
                  onChange={(e) => setShippingValue('zipcode', e.target.value)}
                  type='text'
                  placeholder='CEP'
                  className='form-control form-control-lg'
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  onChange={(e) => setShippingValue('city', e.target.value)}
                  type='text'
                  placeholder='Cidade'
                  className='form-control form-control-lg'
                />
              </div>
              <div className="col-6">
                <input
                  onChange={(e) => setShippingValue('street', e.target.value)}
                  type='text'
                  placeholder='Logradouro'
                  className='form-control form-control-lg'
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-5">
                <input
                  onChange={(e) => setShippingValue('neighborhood', e.target.value)}
                  type='text'
                  placeholder='Bairro'
                  className='form-control form-control-lg'
                />
              </div>
              <div className="col-5">
                <input
                  onChange={(e) => setShippingValue('street_number', e.target.value)}
                  type='text'
                  placeholder='Número'
                  className='form-control form-control-lg'
                />
              </div>
              <div className="col-2">
                <input
                  onChange={(e) => setShippingValue('state', e.target.value)}
                  type='text'
                  placeholder='UF'
                  className='form-control form-control-lg'
                />
              </div>
            </div>
            <div className="col-12 mb-5">
              <input
                onChange={(e) => setShippingValue('complement', e.target.value)}
                type='text'
                placeholder='Complemento'
                className='form-control form-control-lg'
              />
            </div>

            <span className='section-title'>Dados de Pagamento</span>
            <div className="row mb-3">
              <div className="col-6 mb-3">
                <input
                  onChange={(e) => setTransaction(prevTransaction => ({ ...prevTransaction, card_number: e.target.value }))}
                  type='text'
                  placeholder='Nº do Cartão'
                  className='form-control form-control-lg'
                />
              </div>
              <div className="col-6 mb-3">
                <input
                  onChange={(e) => setTransaction(prevTransaction => ({ ...prevTransaction, card_holder_name: e.target.value }))}
                  type='text'
                  placeholder='Nome Completo no Cartão'
                  className='form-control form-control-lg'
                />
              </div>
              <div className="col-6">
                <input
                  onChange={(e) => setTransaction(prevTransaction => ({ ...prevTransaction, card_expiration_date: e.target.value }))}
                  type='date'
                  placeholder='dd/mm/aaaa'
                  className='form-control form-control-lg'
                />
              </div>
              <div className="col-6">
                <input
                  onChange={(e) => setTransaction(prevTransaction => ({ ...prevTransaction, card_cvv: e.target.value }))}
                  type='text'
                  placeholder='CVV'
                  className='form-control form-control-lg'
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <b>Total</b>
                <h3>R$ {total.toFixed(2)}</h3>
              </div>
              <div className="col-12">
                <button onClick={makePurchase} className="btn btn-lg btn-primary w-100">Finalizar Compra!</button>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="box col mb-4 box-sidebar">
              <h5>Minha Sacola ({cart.length})</h5>

              <div className="row products">
                {cart.map(p => <Product product={p} key={p._id} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

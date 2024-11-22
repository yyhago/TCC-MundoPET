import dayjs from 'dayjs';
import _ from 'underscore';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import { setTransaction as setStoreTransaction, makePruchase } from '../../store/modules/shop/actions';
import Header from '../../components/header/header';
import Product from '../../components/product/list';
import './styles.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const { cart, transactionFee, defaultRecipient } = useSelector((state) => state.shop);
  const isProcessing = useSelector((state) => state.shop.isProcessing);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  const estados = [
    { uf: 'AC', nome: 'Acre' },
    { uf: 'AL', nome: 'Alagoas' },
    { uf: 'AP', nome: 'Amapá' },
    { uf: 'AM', nome: 'Amazonas' },
    { uf: 'BA', nome: 'Bahia' },
    { uf: 'CE', nome: 'Ceará' },
    { uf: 'DF', nome: 'Distrito Federal' },
    { uf: 'ES', nome: 'Espírito Santo' },
    { uf: 'GO', nome: 'Goiás' },
    { uf: 'MA', nome: 'Maranhão' },
    { uf: 'MT', nome: 'Mato Grosso' },
    { uf: 'MS', nome: 'Mato Grosso do Sul' },
    { uf: 'MG', nome: 'Minas Gerais' },
    { uf: 'PA', nome: 'Pará' },
    { uf: 'PB', nome: 'Paraíba' },
    { uf: 'PR', nome: 'Paraná' },
    { uf: 'PE', nome: 'Pernambuco' },
    { uf: 'PI', nome: 'Piauí' },
    { uf: 'RJ', nome: 'Rio de Janeiro' },
    { uf: 'RN', nome: 'Rio Grande do Norte' },
    { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'RO', nome: 'Rondônia' },
    { uf: 'RR', nome: 'Roraima' },
    { uf: 'SC', nome: 'Santa Catarina' },
    { uf: 'SP', nome: 'São Paulo' },
    { uf: 'SE', nome: 'Sergipe' },
    { uf: 'TO', nome: 'Tocantins' }
  ];

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

  // Função para mascarar o CEP
  const maskCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  // Função para buscar o endereço pelo CEP
  const fetchAddress = async (cep) => {
    const cleanCEP = cep.replace(/\D/g, '');
    if (cleanCEP.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setTransaction(prevTransaction => ({
            ...prevTransaction,
            shipping: {
              ...prevTransaction.shipping,
              address: {
                ...prevTransaction.shipping.address,
                state: data.uf,
                city: data.localidade,
                neighborhood: data.bairro,
                street: data.logradouro,
                zipcode: cep,
              },
            },
          }));
          setErrors({});
        } else {
          setErrors(prev => ({ ...prev, zipcode: 'CEP não encontrado' }));
        }
      } catch (error) {
        setErrors(prev => ({ ...prev, zipcode: 'Erro ao buscar o CEP' }));
      } finally {
        setLoading(false);
      }
    }
  };

  const setShippingValue = (key, value) => {
    setTransaction((prevTransaction) => ({
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

  
  const total = cart.reduce((total, product) => {
    return total + parseFloat(product.preco);
  }, 0);

  const getSplitRules = useCallback(() => {
    const productsByPetshop = _.groupBy(cart, (product) => product.petshop_id.recipient_id || 'undefined');
    const total = cart.reduce((total, product) => total + parseFloat(product.preco), 0);

    const splitRules = Object.keys(productsByPetshop)
      .filter((petshop_id) => petshop_id !== 'undefined')
      .map((petshop_id) => {
        const products = productsByPetshop[petshop_id];
        const totalValueByPetshop = products.reduce((total, product) => total + parseFloat(product.preco), 0);
        const totalFee = totalValueByPetshop * transactionFee;
        const percentage = Math.floor(((totalValueByPetshop - totalFee) / total) * 100);

        return {
          recipient_id: products[0].petshop_id.recipient_id,
          percentage: percentage,
          liable: true,
          charge_processing_fee: true,
        };
      });

    const totalPetshopsPercentage = splitRules.reduce((total, recipient) => total + recipient.percentage, 0);

    splitRules.push({
      ...defaultRecipient,
      percentage: 100 - totalPetshopsPercentage,
      charge_processing_fee: true,
    });

    return splitRules;
  }, [cart, transactionFee, defaultRecipient]);

  useEffect(() => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      amount: total,
      items: cart.map((product) => ({
        id: product._id,
        title: product.nome,
        unit_price: parseFloat(product.preco),
        quantity: 1,
        tangible: true,
      })),
      split_rules: getSplitRules(),
    }));
  }, [cart, total, getSplitRules]);

  const validateAddress = () => {
    const newErrors = {};
    
    if (!transaction.shipping.address.zipcode) {
      newErrors.zipcode = 'CEP é obrigatório';
    }
    if (!transaction.shipping.address.city) {
      newErrors.city = 'Cidade é obrigatória';
    }
    if (!transaction.shipping.address.street) {
      newErrors.street = 'Logradouro é obrigatório';
    }
    if (!transaction.shipping.address.neighborhood) {
      newErrors.neighborhood = 'Bairro é obrigatório';
    }
    if (!transaction.shipping.address.street_number) {
      newErrors.street_number = 'Número é obrigatório';
    }
    if (!transaction.shipping.address.state) {
      newErrors.state = 'Estado é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const makePurchase = () => {
    if (validateAddress()) {
      dispatch(setStoreTransaction(transaction));
      dispatch(makePruchase());
    }
  };

  return (
    <div className="h-100">
      <Header hideCart />
      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <span className="section-title">Dados de Entrega</span>
            <div className="row mb-3">
              <div className="col-12">
                <input
                  type="text"
                  placeholder="CEP"
                  className={`form-control form-control-lg ${errors.zipcode ? 'is-invalid' : ''}`}
                  value={transaction.shipping.address.zipcode}
                  onChange={(e) => {
                    const maskedValue = maskCEP(e.target.value);
                    setShippingValue('zipcode', maskedValue);
                    if (maskedValue.length === 9) {
                      fetchAddress(maskedValue);
                    }
                  }}
                  maxLength="9"
                />
                {errors.zipcode && <div className="invalid-feedback">{errors.zipcode}</div>}
                {loading && <small className="text-muted">Buscando endereço...</small>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  type="text"
                  placeholder="Cidade"
                  className={`form-control form-control-lg ${errors.city ? 'is-invalid' : ''}`}
                  value={transaction.shipping.address.city}
                  onChange={(e) => setShippingValue('city', e.target.value)}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="col-6">
                <input
                  type="text"
                  placeholder="Logradouro"
                  className={`form-control form-control-lg ${errors.street ? 'is-invalid' : ''}`}
                  value={transaction.shipping.address.street}
                  onChange={(e) => setShippingValue('street', e.target.value)}
                />
                {errors.street && <div className="invalid-feedback">{errors.street}</div>}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-5">
                <input
                  type="text"
                  placeholder="Bairro"
                  className={`form-control form-control-lg ${errors.neighborhood ? 'is-invalid' : ''}`}
                  value={transaction.shipping.address.neighborhood}
                  onChange={(e) => setShippingValue('neighborhood', e.target.value)}
                />
                {errors.neighborhood && <div className="invalid-feedback">{errors.neighborhood}</div>}
              </div>
              <div className="col-5">
                <input
                  type="text"
                  placeholder="Número"
                  className={`form-control form-control-lg ${errors.street_number ? 'is-invalid' : ''}`}
                  value={transaction.shipping.address.street_number}
                  onChange={(e) => setShippingValue('street_number', e.target.value)}
                />
                {errors.street_number && <div className="invalid-feedback">{errors.street_number}</div>}
              </div>
              <div className="col-2">
                <select
                  className={`form-select form-select-lg ${errors.state ? 'is-invalid' : ''}`}
                  value={transaction.shipping.address.state}
                  onChange={(e) => setShippingValue('state', e.target.value)}
                >
                  <option value="">UF</option>
                  {estados.map(estado => (
                    <option key={estado.uf} value={estado.uf}>
                      {estado.uf}
                    </option>
                  ))}
                </select>
                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
              </div>
            </div>
            <div className="col-12 mb-5">
              <input
                type="text"
                placeholder="Complemento"
                className="form-control form-control-lg"
                value={transaction.shipping.address.complement}
                onChange={(e) => setShippingValue('complement', e.target.value)}
              />
            </div>

            <span className="section-title">Dados de Pagamento</span>
            <div className="row mb-3">
              <div className="col-6 mb-3">
                <input
                  type="text"
                  placeholder="Nº do Cartão"
                  className="form-control form-control-lg"
                  onChange={(e) => setTransaction((prevTransaction) => ({ ...prevTransaction, card_number: e.target.value }))}
                />
              </div>
              <div className="col-6 mb-3">
                <input
                  type="text"
                  placeholder="Nome Completo no Cartão"
                  className="form-control form-control-lg"
                  onChange={(e) => setTransaction((prevTransaction) => ({ ...prevTransaction, card_holder_name: e.target.value }))}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  placeholder="Validade"
                  className="form-control form-control-lg"
                  onChange={(e) => setTransaction((prevTransaction) => ({ ...prevTransaction, card_expiration_date: e.target.value }))}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  placeholder="CVV"
                  className="form-control form-control-lg"
                  onChange={(e) => setTransaction((prevTransaction) => ({ ...prevTransaction, card_cvv: e.target.value }))}
                />
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <b>Total</b>
                <h3>R$ {total.toFixed(2)}</h3>
              </div>
              <div className="col-12">
              <button 
                    onClick={makePurchase} 
                    className="btn btn-lg btn-primary w-100" 
                    disabled={isProcessing}
                  >
                {isProcessing ? "Processando pagamento..." : "Finalizar Compra!"}
              </button>
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="box col mb-4 box-sidebar">
              <h5>Minha Sacola ({cart.length})</h5>
              <div className="row products">
                {cart.map((p) => <Product product={p} key={p._id} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
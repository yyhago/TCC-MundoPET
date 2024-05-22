import Header from '../../header/header'
import './styles.css'

const Checkout = () => {
  return (
    <div className="h-100">
      <Header />

      <div className="container mt-4">
        <div className="row">
          <div className="col-6">
            <span className='section-title'>Dados de Entrega</span>
            <div className="row mb-3">
              <div className="col-12">
                <input type='text' placeholder='CEP' className='form-control form-control-lg' />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <input type='text' placeholder='Cidade' className='form-control form-control-lg' />
              </div>
              <div className="col-6 pl-0">
                <input type='text' placeholder='Logradouro' className='form-control form-control-lg' />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-5">
                  <input type='text' placeholder='Bairro' className='form-control form-control-lg' />
                </div>
                <div className="col-5">
                  <input type='text' placeholder='Número' className='form-control form-control-lg' />
                </div>
                <div className="col-2 pl-0">
                  <input type='text' placeholder='UF' className='form-control form-control-lg' />
                </div>
              </div>
              <div className="col-12 mb-5">
                  <input type='text' placeholder='Complemento' className='form-control form-control-lg' />
              </div>

              <span className='section-title'>Dados de Pagamento</span>
              <div className="row mb-3">
                <div className="col-12 mb-3">
                  <input type='text' placeholder='Nº do Cartão' className='form-control form-control-lg' />
                </div>
                <div className="col-6">
                  <input type='text' placeholder='Validade do Cartão' className='form-control form-control-lg' />
                </div>
                <div className="col-6 pl-0">
                  <input type='text' placeholder='CVV' className='form-control form-control-lg' />
                </div>
              </div>
            </div>
          <div className="col-6">
          </div>
        </div>
      </div>

    </div>
  )
}

export default Checkout;
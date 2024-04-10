import Logo from '../../../assets/logo.png'
import Illustration from '../../../assets/illustration.png'

const Cadastro = () => {
  return(
    <div className="container-fluid h-100 bg-primary p-3">
      <div className="containerLogo col-12">
          <img src={Logo} alt="Logo" className="imgLogo"/>
      </div>
      <div className="row">
        <div className="col-6 text-right my-auto">
          <img src={Illustration} alt="Logo" className="img-fluid" />
        </div>
        <div className="col-6">
          <div className="box col-8">
            <h2 className="text-center fs-1">Falta bem pouco para mudar o humor do seu pet, e deixar ele feliz!</h2>
            <hr/>
            <br/>
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Nome Completo" />
            <input type="email" className="form-control form-control-lg mb-3" placeholder="E-mail" />
            <input type="text" className="form-control form-control-lg mb-3" placeholder="Telefone" />
            <input type="text" className="form-control form-control-lg mb-3" placeholder="CPF" />
            <input type="date" className="form-control form-control-lg mb-3"/>
            <button className="btn btn-lg btn-block btn-secondary w-100">Finalizar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
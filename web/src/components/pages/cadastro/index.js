import Header from '../../header/header'
import Illustration from '../../../assets/illustration.png'

const Cadastro = () => {
  return(
    <div className="container-fluid h-100 bg-primary">
      <Header logoVersion/> {/*Componente Header*/}
      <div className="row ContentBox">

        <div className="col-6 text-right my-auto"> {/*Illustation*/}
          <img src={Illustration} alt="Logo" className="img-fluid imgIllustration" />
        </div>

        <div className="col-6"> {/*Formulário*/}
          <div className="box col-7">
            <h2 className="text-center">Falta bem pouco para mudar o humor do seu pet, e deixar ele feliz!</h2>
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

      <div className="footerCadastro"> {/*Footer Cadastro*/}
        <strong>Não vai deixar seu pet na mão né!</strong>
      </div>

    </div>
  )
}

export default Cadastro
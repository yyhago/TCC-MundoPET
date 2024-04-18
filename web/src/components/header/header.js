import LogoFundo from '../../assets/LogoComFundo.png'
import Logo from '../../assets/LogoSemFundo.png'

export default function Header({ logoVersion }){
  return(
    <div className="col-12">
      <header className="py-4 px-4 text-center">
        <img src={logoVersion ? LogoFundo : Logo} alt="LogoMundoPet" className="img-fluid" />
      </header>
    </div>
  )
}
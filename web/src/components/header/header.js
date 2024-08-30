import LogoFundo from '../../assets/LogoComFundo.png'
import Logo from '../../assets/LogoSemFundo.png'

import Icon from '@mdi/react';
import { mdiCart } from '@mdi/js';

import './styles.css'

export default function Header({ logoVersion }){

  const openDrawer = () => { // Função que dispara um novo evento chamado 'openCart' na tela!
    const event = new CustomEvent('openCart');
    window.dispatchEvent(event)
  }

  return(
    <div className="col-12">

      <header className="py-4 px-4 text-center"> {/*Logo com alteração manual com parâmetros*/}
        <img src={logoVersion ? LogoFundo : Logo} alt="LogoMundoPet" className="img-fluid" />
      </header>
      <button onClick={() => openDrawer()} className='btn btn-secondary cart-button'> {/*Botão de carrinho*/}
        <Icon className='mdi' path={mdiCart} size={1} /> 3 Ítens
      </button>

    </div>
  )
}
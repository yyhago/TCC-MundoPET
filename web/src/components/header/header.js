import {useSelector} from 'react-redux'
import LogoFundo from '../../assets/LogoComFundo.png'
import Logo from '../../assets/LogoSemFundo.png'

import Icon from '@mdi/react';
import { mdiCart } from '@mdi/js';
import { Link } from 'react-router-dom'

import './styles.css'

export default function Header({ logoVersion, hideCart }){

  const { cart } = useSelector(state => state.shop);

  const openDrawer = () => { // Função que dispara um novo evento chamado 'openCart' na tela!
    const event = new CustomEvent('openCart');
    window.dispatchEvent(event)
  }

  return(
    <div className="col-12">

      <header className="py-4 px-4 text-center"> {/*Logo com alteração manual com parâmetros*/}
        <Link to="/">
          <img src={logoVersion ? LogoFundo : Logo} alt="LogoMundoPet" className="img-fluid" />
        </Link>
        
      </header>
      {!hideCart && 
        (<button onClick={() => openDrawer()} className='btn btn-secondary cart-button'> {/*Botão de carrinho*/}
          <Icon className='mdi' path={mdiCart} size={1} /> {cart.length} Ítens
        </button>
      )}

    </div>
  )
}
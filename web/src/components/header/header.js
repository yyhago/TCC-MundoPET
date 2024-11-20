import { useSelector } from 'react-redux';
import LogoFundo from '../../assets/LogoComFundo.png';
import Logo from '../../assets/LogoSemFundo.png';

import Icon from '@mdi/react';
import { mdiCart } from '@mdi/js';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Header({ logoVersion, hideCart }) {
  const { cart } = useSelector(state => state.shop);

  const openDrawer = () => {
    // Dispara um evento 'openCart' que pode ser utilizado para abrir o carrinho
    const event = new CustomEvent('openCart');
    window.dispatchEvent(event);
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        {/* Logo com alteração baseada na versão passada como parâmetro */}
        <Link to="/">
          <img 
            src={logoVersion ? LogoFundo : Logo} 
            alt="Logo MundoPet" 
            className="logo-img" 
          />
        </Link>
      </div>

      {!hideCart && (
        <button 
          onClick={openDrawer} 
          className="btn btn-cart"
          aria-label="Abrir carrinho"
        >
          <Icon className="mdi-icon" path={mdiCart} size={1} />
          {cart.length} Itens
        </button>
      )}
    </header>
  );
}

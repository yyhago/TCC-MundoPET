import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { Dock } from 'react-dock';
import { useNavigate } from 'react-router-dom';
import Product from '../../components/product/list';

import './styles.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.shop);
  const [opened, setOpened] = useState(false);
  const sidebarRef = useRef(null);

  const total = cart.reduce((total, product) => {
    return total + product.preco;
  }, 0);

  useEffect(() => {
    window.addEventListener('openCart', () => {
      setOpened(true);
    });

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpened(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckout = () => {
    navigate('/cadastro');
    setOpened(false);
  };

  const isMobile = window.innerWidth <= 767; // Detectar dispositivo móvel

  return (
    <Dock 
      isVisible={opened} 
      onVisibleChange={(visible) => setOpened(visible)}
      position={isMobile ? "bottom" : "right"} 
      size={isMobile ? 0.9 : 0.35}
      dimMode="transparent" 
    >
      <div className="container-fluid sidebar pt-4" ref={sidebarRef}>
        <h5>Minha Sacola ({cart.length})</h5>
        <div className="row products">
          {cart.map(p => <Product product={p} key={p._id} />)}
        </div>
        <div className="row footer">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <b>Total:</b>
            <h3>R$ {total.toFixed(2)}</h3>
          </div>
          <button 
            onClick={handleCheckout}
            className="btn btn-lg btn-primary w-100 mt-3"
          >
            Finalizar Compra!
          </button>
        </div>
      </div>
    </Dock>
  );
};

export default Sidebar;

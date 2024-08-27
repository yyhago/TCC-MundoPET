import React from 'react';
import ReactDOM from 'react-dom/client';
import Cadastro from './pages/cadastro/index';
import Checkout from './pages/checkout';
import PetShop from './pages/petshop';

import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PetShop />
  </React.StrictMode>
);


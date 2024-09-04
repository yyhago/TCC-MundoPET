import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/home';
import Cadastro from './pages/cadastro/index';
import Checkout from './pages/checkout';
import PetShop from './pages/petshop';
import Sidebar from './components/sidebar';

import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);


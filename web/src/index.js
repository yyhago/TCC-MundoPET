import React from 'react';
import ReactDOM from 'react-dom/client';
import Cadastro from './pages/cadastro/index';
import Checkout from './pages/checkout';

import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Checkout />
  </React.StrictMode>
);


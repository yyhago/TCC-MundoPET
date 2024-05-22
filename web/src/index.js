import React from 'react';
import ReactDOM from 'react-dom/client';
import Cadastro from './components/pages/cadastro';
import Checkout from './components/pages/checkout';

import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Checkout />
  </React.StrictMode>
);


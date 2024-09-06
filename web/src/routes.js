import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Cadastro from './pages/cadastro/index';
import Checkout from './pages/checkout';
import PetShop from './pages/petshop';
import Sidebar from './components/sidebar';
import SplashScreen from './components/splashScreen/index';
import './styles/global.css';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onSplashEnd={() => setShowSplash(false)} />
      ) : (
        <>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/petshop/:id' element={<PetShop />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/cadastro' element={<Cadastro />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;

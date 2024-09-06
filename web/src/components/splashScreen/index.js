import React, { useEffect, useState } from 'react';
import Logo from '../../assets/LogoSemFundo.png'; 
import './styles.css'; 

const SplashScreen = ({ onSplashEnd }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Inicia a animação de desaparecimento
      setTimeout(() => {
        onSplashEnd(); // Chama a função para ocultar o splash screen
      }, 1000); // Tempo para a animação de desaparecimento
    }, 3000); // Tempo total do splash screen

    return () => clearTimeout(timer);
  }, [onSplashEnd]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img src={Logo} alt="Logo" className="splash-logo" />
      <div className="splash-animation">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default SplashScreen;

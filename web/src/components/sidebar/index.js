import { useState,useEffect } from 'react'
import {Dock} from 'react-dock'

import Product from '../../components/product/list'


import './styles.css'

const Sidebar = () => {
  const [opened, setOpened] = useState(false); // useState para manipulação da função e ativar/desativar

  useEffect(() => { // useEffect para esperar meu Event 'openCart' e alterar para true
    window.addEventListener('openCart', () => {
      // console.log('opencart!')
      setOpened(true)
    })
  },[])

  return (
    <Dock // Chamada do DOCK, passando as propriedades de acordo com a documentação
      isVisible={opened} 
      onVisibleChange={(visible) => {
        setOpened(visible);
      }}
      position="right"
    >

      {/*Conteúdo da minha SIDEBAR*/}
      <div className="container-fluid h-100 pt-4 sidebar">
        <h5>Minha Sacola (5)</h5> 

        
        <div className="row products">
            {[1,2,3,4,5].map(p => <Product />)}
        </div>

      </div>

    </Dock>
    
  );
}

export default Sidebar;
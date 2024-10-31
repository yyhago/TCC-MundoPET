import {useSelector} from 'react-redux'
import { useState,useEffect } from 'react'
import {Dock} from 'react-dock'

import Product from '../../components/product/list'


import './styles.css'

const Sidebar = () => {


  const { cart } = useSelector(state => state.shop);
  const [opened, setOpened] = useState(false); 

  const total = cart.reduce((total, product) => {
    return total + product.preco;
  }, 0)

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
        <h5>Minha Sacola ({cart.length})</h5> 

        
        <div className="row products">
          {cart.map(p => <Product product={p} key={p._id} />)}
        </div>

        <div className="row align-items-end footer"> {/*Footer da minha SIDEBAR*/}
          <div className="col-12 d-flex justify-content-between align-items-center">
            <b className='d-inline-block'>Total:</b>
            <h3 className='d-inline-block'>R$ {total.toFixed(2)}</h3>
          </div>
          <button className='btn btn-block btn-lg btn-primary rounded-0 h-50 align-items-center'>Finalizar Compra!</button>
        </div>

      </div>

    </Dock>
    
  );
}

export default Sidebar;

import Header from '../../components/header/header'
import PetShop from '../../components/petshop'
import Map from '../../components/map'

import './styles.css'

const Home = () => {
  return (
    <div className="h-100">
      <Header/> {/*Chamo meu componente Header*/}
      <div className="container-fluid petshop-list-container">
        <div className="col-12 px-4 text-center">
          <h5>Mais próximos de você (7)</h5>
        </div>
        <ul className='col-12 petshop-list'>
          {/*Chamo meu componente Petshop e passando ele dentro do array 9 vezes*/}
          {[1,2,3,4,5,6,7,8,9].map(p => <PetShop />)}
        </ul>
      </div>
      <Map />
    </div>
  )
}


export default Home;
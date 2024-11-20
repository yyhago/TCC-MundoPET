import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { requestPetshops } from '../../store/modules/shop/actions'; 

import Header from '../../components/header/header';
import PetShop from '../../components/petshop';
import Map from '../../components/map';

import './styles.css';

const Home = () => {
  const dispatch = useDispatch();
  const { petshops } = useSelector((state) => state.shop)

  useEffect(() => {
    dispatch(requestPetshops());
  }, [dispatch]); 

  return (
    <div className="h-100">
      <Header /> {/* Chamo meu componente Header */}
      <div className="container-fluid petshop-list-container">
        <div className="col-12 px-4 text-center">
          <h5>Mais próximos de você (5)</h5>
        </div>
        <ul className="col-12 petshop-list">
          {petshops.map(p => <PetShop petshop={p} key={p} />)}
        </ul>
      </div>
      <Map petshops={ petshops }/>
    </div>
  );
};

export default Home;

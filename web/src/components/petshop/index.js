import { useDispatch, useSelector } from 'react-redux';
import { setMapCenter, setSelectedPetshop as selectPetshop } from '../../store/modules/shop/actions';

import Icon from '@mdi/react';
import './styles.css';

import { mdiStar } from '@mdi/js';
import { mdiCash } from '@mdi/js';
import { mdiGoogleMaps } from '@mdi/js';

const PetShop = ({ petshop }) => {
  const dispatch = useDispatch();
  const selectedPetshop = useSelector(state => state.shop.petshopMapSelected);

  const handleSelectPetshop = () => {
    dispatch(setMapCenter(petshop.location));
    dispatch(selectPetshop(petshop));
  };

  return (
    <li
      className={`petshop d-inline-block active ${selectedPetshop?._id === petshop._id ? 'selected' : ''}`}
      onClick={handleSelectPetshop}
    >
      <div className="d-inline-block">
        <img src={petshop.logo} alt={`${petshop.nome} Logo`} className="img-fluid" />
      </div>
      <div className="content-div d-inline-block">
        <b>{petshop.nome}</b>
        <div className="petshop-infos">
          <Icon path={mdiStar} size={1} className="petshop-icon star-icon" />
          <span><b>{petshop.destaque}</b></span>

          <Icon path={mdiCash} size={1} className="petshop-icon cash-icon" />
          <span><b>{petshop.categoria}</b></span>

          <Icon path={mdiGoogleMaps} size={1} className="petshop-icon google-maps-icon" />
          <span><b>{`Lat: ${petshop.location.lat}, Lng: ${petshop.location.lng}`}</b></span>
        </div>
        <label className="badge badge-primary">Frete Grátis</label>
      </div>
    </li>
  );
};

export default PetShop;

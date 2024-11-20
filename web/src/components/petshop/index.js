import { useDispatch, useSelector } from 'react-redux';
import { setMapCenter, setSelectedPetshop as selectPetshop } from '../../store/modules/shop/actions';
import Icon from '@mdi/react';
import './styles.css';
import { mdiStar, mdiCash, mdiGoogleMaps } from '@mdi/js';

// Coordenadas da ETEC de Hortolândia
const etecCoordinates = { lat: -22.867, lng: -47.214 };

const PetShop = ({ petshop }) => {
  const dispatch = useDispatch();
  const selectedPetshop = useSelector(state => state.shop.petshopMapSelected);

  // Função para calcular a distância entre a ETEC e o petshop
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em km
    return distance;
  };

  // Calculando a distância entre a ETEC e o petshop
  const distance = haversineDistance(etecCoordinates.lat, etecCoordinates.lng, petshop.location.lat, petshop.location.lng);

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
          <span><b>{`Distância: ${distance.toFixed(2)} km`}</b></span>
        </div>
        <label className="badge badge-primary">Frete Grátis</label>
      </div>
    </li>
  );
};

export default PetShop;

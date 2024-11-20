import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import './styles.css';

const createIcon = (petshop, isSelected) => {
  return L.divIcon({
    className: `custom-marker-icon ${isSelected ? 'selected' : ''}`,
    html: `
      <div class="marker-icon ${isSelected ? 'selected' : ''}">
        <img src="${petshop.logo}" 
             alt="${petshop.nome} Logo" 
             class="img-marker"
        />
      </div>
    `,
    iconSize: [60, 60],  
    iconAnchor: [30, 60],  
    popupAnchor: [0, -50],
  });
};

const Marker = ({ petshop, lat, lng }) => {
  const selectedPetshop = useSelector((state) => state.shop.petshopMapSelected);
  const isSelected = selectedPetshop?.id === petshop.id;

  return (
    <LeafletMarker position={[lat, lng]} icon={createIcon(petshop, isSelected)}>
      <Popup>
        <div>
          <h6>{petshop.nome}</h6>
          <Link to={`/petshop/${petshop._id}`}>
            <strong>VISUALIZAR PRODUTOS!</strong>
          </Link>
        </div>
      </Popup>
    </LeafletMarker>
  );
};

export default Marker;

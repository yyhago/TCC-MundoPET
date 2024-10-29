import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './styles.css';

const createIcon = (petshop) => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div class="marker-icon">
        <img src="${petshop.logo}"
             alt="Logo"
             class="img-marker"
        />
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [21, 42],
    popupAnchor: [0, -42]
  });
};

const Marker = ({ petshop, lat, lng }) => {
  return (
    <LeafletMarker position={[lat, lng]} icon={createIcon(petshop)}>
      <Popup>
        <span>{petshop.nome}</span>
      </Popup>
    </LeafletMarker>
  );
};

export default Marker;
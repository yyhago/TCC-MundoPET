import { Marker as LeafletMarker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './styles.css'; 


const createIcon = () => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div class="marker-icon">
        <img src="https://marketplace.canva.com/EAGEl51-V8U/1/0/1600w/canva-logotipo-para-petshop-para-pequenos-animais-silhueta-azul-e-branco-0p_KpsHDZl0.jpg" 
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

const Marker = ({ lat, lng }) => {
  return (
    <LeafletMarker position={[lat, lng]} icon={createIcon()}>
      <Popup>
        <span>Etec Hortolândia</span>
      </Popup>
    </LeafletMarker>
  );
};

export default Marker;

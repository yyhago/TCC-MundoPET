import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import Marker from '../marker';


const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView([center.lat, center.lng], 15);
  return null;
};

const Map = ({ petshops }) => {
  
  const mapCenter = useSelector(state => state.shop.mapCenter);
  
  return (
    <div className="container-map">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={15}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {petshops.map(p => (
          <Marker 
            key={p.id}
            petshop={p}
            lat={p.location.lat}
            lng={p.location.lng}
          />
        ))}
        <ChangeMapView center={mapCenter} />
      </MapContainer>
    </div>
  );
};

export default Map;
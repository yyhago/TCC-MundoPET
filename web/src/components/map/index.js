import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import Marker from '../marker';

const Map = () => {
  return (
    <div className="container-map">
      <MapContainer
        center={{ lat: -22.8722787, lng: -47.2102212 }}
        zoom={15}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker lat={-22.8722787} lng={-47.2102212} />
      </MapContainer>
    </div>
  );
};

export default Map;

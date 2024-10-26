import Icon from '@mdi/react';
import './styles.css'

import { mdiStar } from '@mdi/js';
import { mdiCash } from '@mdi/js';
import { mdiGoogleMaps } from '@mdi/js';

const PetShop = ({ petshop }) => {
  return (
   <li className='petshop d-inline-block'>
    <div className="d-inline-block">
      <img src={petshop.logo}
      alt="Logo" 
      className="img-fluid"/>
    </div>
    <div className="content-div d-inline-block">
      <b>{petshop.nome}</b>
      <div className="petshop-infos">
        <Icon path={mdiStar} size={1} className="petshop-icon star-icon" />
        <text><b>{petshop.destaque}</b></text>

        <Icon path={mdiCash} size={1} className="petshop-icon cash-icon" />
        <text><b>{petshop.categoria}</b></text>

        <Icon path={mdiGoogleMaps} size={1} className="petshop-icon google-maps-icon" />
        <text><b>{`Lat: ${petshop.location.lat}, Lng: ${petshop.location.lng}`}</b></text>
      </div>
      <label className="badge badge-primary">Frete Grátis</label>
    </div>
   </li>
  );
};

export default PetShop;

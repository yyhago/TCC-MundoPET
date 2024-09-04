import Icon from '@mdi/react';
import './styles.css'

import { mdiStar } from '@mdi/js';
import { mdiCash } from '@mdi/js';
import { mdiGoogleMaps } from '@mdi/js';

const PetShop = () => {
  return (
   <li className='petshop d-inline-block'>
    <div className="d-inline-block">
      <img src="https://marketplace.canva.com/EAGEl51-V8U/1/0/1600w/canva-logotipo-para-petshop-para-pequenos-animais-silhueta-azul-e-branco-0p_KpsHDZl0.jpg" 
      alt="Logo" 
      className="img-fluid"/>
    </div>
    <div className="content-div d-inline-block">
            <b>PetShop!</b>
            <div className="petshop-infos">
              <Icon path={mdiStar} size={1} className="petshop-icon star-icon" />
              <text><b>3,2</b></text>

              <Icon path={mdiCash} size={1} className="petshop-icon cash-icon" />
              <text><b>$$$</b></text>

              <Icon path={mdiGoogleMaps} size={1} className="petshop-icon google-maps-icon" />
              <text><b>3.9KM</b></text>
            </div>
            <label className="badge badge-primary">Frete Grátis</label>
    </div>
   </li>
  );
};
export default PetShop;
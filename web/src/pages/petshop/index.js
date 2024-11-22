import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from "../../components/header/header";
import Product from "../../components/product/card";
import Icon from '@mdi/react';
import { mdiStar, mdiCash, mdiGoogleMaps } from '@mdi/js';
import { requestPetshop } from '../../store/modules/shop/actions'; 
import './styles.css';

const PetShop = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const petshop = useSelector(state => state.shop.petshop); 

  useEffect(() => {
    dispatch(requestPetshop(id)); 
  }, [dispatch, id]);

  console.log(petshop); 

  return (
    <div className="h-100">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-2">
            <img 
              src={petshop.logo} 
              alt="Logo" 
              className="img-fluid petshop-image" 
            />
            <b>{petshop.nome}</b>

            <div className="petshop-infos">
              <Icon path={mdiStar} size={1} className="petshop-icon star-icon" />
              <text><b>{petshop.destaque}</b></text>

              <Icon path={mdiCash} size={1} className="petshop-icon cash-icon" />
              <text><b>{petshop.categoria}</b></text>

              <br/><Icon path={mdiGoogleMaps} size={1} className="petshop-icon google-maps-icon" />
              <text><b>12 Minutos de você</b></text>
            </div>

            <label className="badge badge-primary">Frete Grátis</label>
          </div>
          <div className="col-10">
            <h5>Produtos: </h5>
            <br />
            <div className="row">
              {petshop.products?.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetShop;

import { useDispatch, useSelector } from 'react-redux';
import { toggleCartProduct } from '../../../store/modules/shop/actions';

import './styles.css';

const Product = ({ product }) => { 

  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shop);
  const added = cart.findIndex((p) => p._id === product._id) !== -1;

  if (!product) {
    return null; 
  }

  return (
    <div className="product col-3">
      <div className="product-image-container">
        <img 
          src={product.capa} 
          alt={product.nome} 
          className="img-fluid"
        />
        <button 
          onClick={() => dispatch(toggleCartProduct(product))} 
          className={`btn btn-${added ? 'secondary' : 'primary'} rounded-circle`}
        >
          {added ? '-' : '+'}
        </button>
      </div>
      <h4>
        <label className="badge badge-primary">{product.preco.toFixed(2)}</label>
      </h4>
      <small>
        <b>{product.nome}</b>
      </small>
    </div>
  );
}

export default Product;

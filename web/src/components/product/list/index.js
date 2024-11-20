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
    <div className="product-list">
      <div className="row align-items-center">
        <div className="col-12 col-sm-4">
          <div className="product-image-container">
            <img
              src={product.capa}
              alt={product.nome}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <h6>
            <label className="badge badge-primary price-badge">
              R$ {product.preco.toFixed(2)}
            </label>
          </h6>
          <small>
            <b>{product.nome}</b>
          </small>
          {product.avaliacoes && (
            <small className="text-muted">
              ★ {product.avaliacoes.toFixed(1)}
            </small>
          )}
        </div>
        <div className="col-12 col-sm-2 text-center text-sm-right">
          <button 
            onClick={() => dispatch(toggleCartProduct(product))}
            className={`btn btn-${added ? 'secondary' : 'primary'} rounded-circle cart-btn`}
          >
            {added ? '-' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

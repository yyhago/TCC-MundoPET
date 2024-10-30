import './styles.css';

const Product = ({ product }) => { 
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
        <button className='btn btn-primary rounded-circle'>+</button>
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

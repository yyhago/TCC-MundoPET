import './styles.css';

const Product = () => {
  return (
    <div className="product col-3">
      <div className="product-image-container">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBF3owPBqkXAh48S4pipHbfQDe8Ead43_4sQ&s" 
          alt="Racao" 
          className="img-fluid"
        />
        <button className='btn btn-primary rounded-circle'>+</button>
      </div>
      <h4>
        <label className="badge badge-primary">R$ 99.00</label>
      </h4>
      <small>
        <b>Ração Premier Formula Cães Adultos Raças Médias Frango - 15 kg</b>
      </small>
    </div>
  );
}

export default Product;

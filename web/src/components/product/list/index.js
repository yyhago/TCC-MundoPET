import './styles.css';

const Product = () => {
  return (
    <div className="product-list col-12">
      <div className="row align-items-center">
        <div className="col-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBF3owPBqkXAh48S4pipHbfQDe8Ead43_4sQ&s"
            alt="produto"
            className="img-fluid"
          />
        </div>
        <div className="col-6">
          <h6>
            <label className="badge badge-primary">R$ 30,00</label>
          </h6>
          <small>
            <b>Ração Premier Formula Cães Adultos Raças Médias Frango - 15 kg</b>
          </small>
        </div>
        <div className="col-3 text-right">
          <button className="btn btn-secondary rounded-circle">-</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

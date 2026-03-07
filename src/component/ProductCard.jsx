import "../style/productCardd.css";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>

        <div className="product-bottom">
          <span className="price">₹{product.price}</span>

          <button
            onClick={() => onAddToCart(product)}
            className="cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
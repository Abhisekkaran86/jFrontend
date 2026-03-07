const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="w-[260px] bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-xl">

      {/* Image */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 h-[40px] overflow-hidden">
          {product.description}
        </p>

        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-yellow-600">
            ₹{product.price}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-md text-white font-semibold transition hover:from-yellow-600 hover:to-yellow-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
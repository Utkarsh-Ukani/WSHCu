import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105">
      <Link to={`/products/${product._id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Only {product.stock} left
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center py-2 px-4 rounded-md ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors duration-300`}
        >
          <FaShoppingCart className="mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // React Router hooks
import { ChevronLeft, ShoppingCart, Star, Truck, Shield } from 'lucide-react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addToCart } from '../store/slices/cartSlice'; // Import addToCart action
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams(); // React Router useParams instead of router.query
  const navigate = useNavigate(); // React Router navigate
  const dispatch = useDispatch(); // Add dispatch hook
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Only fetch product data when ID is available
    if (id) {   
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5112/api/admin/get-product/${id}`);
      setProduct(response.data.product);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details. Please try again later.");
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Make sure productId is valid and not undefined
    if (!id) {
      console.error("Product ID is missing");
      return;
    }
    
    // Ensure we're passing both required parameters
    dispatch(addToCart({ 
      productId: id, 
      quantity: quantity 
    }));
    
    console.log(`Added ${quantity} of ${product?.name} to cart`);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    const ratingValue = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={18}
          className={i <= Math.round(ratingValue) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  // Error message component
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mx-auto my-4 max-w-lg">
      <p>{message}</p>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} // React Router navigation
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="h-80 md:h-full relative">
                <img 
                  src={product.image || '/api/placeholder/500/500'} 
                  alt={product.name}
                  className="w-full h-full object-cover" 
                  onError={(e) => {e.target.src = '/api/placeholder/500/500'}}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center mb-2">
                  <StarRating rating={product.rating || 0} />
                  <span className="ml-2 text-gray-600">
                    {product.rating ? `${product.rating.toFixed(1)} out of 5` : 'No ratings yet'}
                  </span>
                </div>
                <p className="text-gray-500">{product.category?.name || 'Uncategorized'}</p>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                {product.discountedPrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900">₹{product.discountedPrice.toFixed(2)}</span>
                    <span className="ml-2 text-lg text-gray-500 line-through">₹{product.price?.toFixed(2)}</span>
                    <span className="ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">₹{product.price?.toFixed(2) || 'N/A'}</span>
                )}
                <p className="text-green-600 mt-1">In Stock: {product.stock}</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description || 'No description available for this product.'}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                    className="w-16 px-3 py-1 border-t border-b border-gray-300 text-center" 
                  />
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-md ${
                  product.stock > 0 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 cursor-not-allowed text-gray-700'
                }`}
              >
                <ShoppingCart size={20} className="mr-2" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-3">
                  <Truck size={18} className="text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600">Free shipping on orders over ₹200</span>
                </div>
                <div className="flex items-center">
                  <Shield size={18} className="text-gray-600 mr-2" />
                  <span className="text-sm text-gray-600">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
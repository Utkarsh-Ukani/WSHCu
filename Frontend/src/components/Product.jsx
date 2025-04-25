import { useState, useEffect } from 'react';
import { Filter, ShoppingCart, Grid, List } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../store/slices/categorySlice';
import { fetchProducts } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';


export default function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Redux state
  const { categories } = useSelector((state) => state.categories);
  const { products, loading, error } = useSelector((state) => state.products);
  
  // Local state
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [categoryNames, setCategoryNames] = useState(['All']);

  // Get query parameters from URL - need to refresh when location changes
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  
  // Watch for URL/location changes and update selected category
  useEffect(() => {
    const newCategoryFromUrl = new URLSearchParams(location.search).get('category') || 'All';
    setSelectedCategory(newCategoryFromUrl);
  }, [location]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(getCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Process categories when they change
  useEffect(() => {
    if (categories && categories.length > 0) {
      const names = categories.map(category => category.name);
      setCategoryNames(['All', ...names]);
    }
  }, [categories]);

  // Filter products when products array or selected category changes
  useEffect(() => {
    if (products && products.length > 0) {
      if (selectedCategory && selectedCategory !== 'All') {
        setFilteredProducts(products.filter(product => 
          product.category && product.category.name === selectedCategory
        ));
      } else {
        setFilteredProducts(products);
      }
    }
  }, [products, selectedCategory]);

  // Update URL when category changes
  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
    setMobileFilterOpen(false);
  };

  // Navigate to product detail page
  const navigateToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Add to cart function
  const handleAddToCart = (productId) => {
    // Make sure productId is valid and not undefined
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }
    
    // Ensure we're passing both required parameters
    dispatch(addToCart({ 
      productId: productId, 
      quantity: 1 
    }));
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    const ratingValue = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-lg ${i <= Math.round(ratingValue) ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );

  // Error message component
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mx-auto my-6 max-w-lg shadow">
      <p>{message}</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Category Sidebar (Desktop) */}
          <div className="hidden lg:block w-64 mr-8">
            <div className="bg-white p-5 rounded-xl shadow-md sticky top-8">
              <h2 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-3">Categories</h2>
              <ul className="space-y-1">
                {categoryNames.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => filterProductsByCategory(category)}
                      className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                        selectedCategory === category 
                          ? 'bg-blue-100 text-blue-800 font-medium' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Category Filter */}
          {mobileFilterOpen && (
            <div className="lg:hidden w-full mb-6">
              <div className="bg-white p-5 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-gray-500 p-2 hover:bg-gray-100 rounded-full">
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoryNames.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        filterProductsByCategory(category);
                        setMobileFilterOpen(false);
                      }}
                      className={`py-2 px-4 rounded-full text-sm transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-800 font-medium'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid/List */}
          <div className="flex-1">
            {/* Current Category Display */}
            <div className="mb-6 bg-white p-5 rounded-xl shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{selectedCategory}</h2>
                  <p className="text-gray-500">{filteredProducts.length} products found</p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                    <button 
                      onClick={() => setIsGridView(true)}
                      className={`p-2 rounded-lg ${isGridView ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                    >
                      <Grid size={18} />
                    </button>
                    <button 
                      onClick={() => setIsGridView(false)}
                      className={`p-2 rounded-lg ${!isGridView ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Button (Mobile) */}
            <div className="lg:hidden mb-6">
              <button 
                onClick={() => setMobileFilterOpen(true)}
                className="w-full flex items-center justify-center bg-white py-3 rounded-xl shadow-md"
              >
                <Filter size={18} className="mr-2" />
                <span>Filter Products</span>
              </button>
            </div>

            {/* Error Message */}
            {error && <ErrorMessage message={error} />}

            {/* Loading Spinner */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                {/* Products Display */}
                {isGridView ? (
                  // Grid View - with larger cards
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
                        onClick={() => navigateToProductDetail(product._id)}
                      >
                        <div className="relative">
                          <img 
                            src={product.image || '/api/placeholder/400/300'} 
                            alt={product.name} 
                            className="w-full h-64 object-cover" 
                            onError={(e) => {e.target.src = '/api/placeholder/400/300'}}
                          />
                          {product.discountedPrice && (
                            <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                              SALE
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {product.category?.name || 'Uncategorized'}
                            </span>
                          </div>
                          
                          <div className="flex items-center mb-3">
                            <StarRating rating={product.rating || 0} />
                            <span className="text-gray-500 text-sm ml-2">({product.rating || 0})</span>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2 h-12">
                            {product.description || 'No description available.'}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              {product.discountedPrice ? (
                                <div className="flex items-baseline">
                                  <p className="text-2xl font-bold text-gray-900">₹{product.discountedPrice.toFixed(2) || 'N/A'}</p>
                                  <p className="text-sm text-gray-500 line-through ml-2">₹{product.price?.toFixed(2) || 'N/A'}</p>
                                </div>
                              ) : (
                                <p className="text-2xl font-bold text-gray-900">₹{product.price?.toFixed(2) || 'N/A'}</p>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </div>
                          </div>
                          
                          {product.stock > 0 ? (
                            <button 
                              className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product._id)
                              }}
                            >
                              <ShoppingCart size={18} />
                              <span>Add to Cart</span>
                            </button>
                          ) : (
                            <button className="mt-5 w-full bg-gray-300 text-gray-700 py-3 rounded-lg cursor-not-allowed font-medium">
                              Out of Stock
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-6">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => navigateToProductDetail(product._id)}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-1/3 lg:w-1/4">
                            <img 
                              src={product.image || '/api/placeholder/400/300'} 
                              alt={product.name} 
                              className="w-full h-64 md:h-full object-cover"
                              onError={(e) => {e.target.src = '/api/placeholder/400/300'}}
                            />
                            {product.discountedPrice && (
                              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                SALE
                              </div>
                            )}
                          </div>
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                  {product.category?.name || 'Uncategorized'}
                                </span>
                              </div>
                              
                              <div className="flex items-center mb-3">
                                <StarRating rating={product.rating || 0} />
                                <span className="text-gray-500 text-sm ml-2">({product.rating || 0})</span>
                              </div>
                              
                              <p className="text-gray-600 mb-4">
                                {product.description || 'No description available.'}
                              </p>
                              
                              {product.quantity && (
                                <p className="text-sm text-gray-500 mb-2">Quantity: {product.quantity}</p>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
                              <div>
                                {product.discountedPrice ? (
                                  <div className="flex items-baseline">
                                    <p className="text-2xl font-bold text-gray-900">₹{product.discountedPrice.toFixed(2) || 'N/A'}</p>
                                    <p className="text-sm text-gray-500 line-through ml-2">₹{product.price?.toFixed(2) || 'N/A'}</p>
                                  </div>
                                ) : (
                                  <p className="text-2xl font-bold text-gray-900">₹{product.price?.toFixed(2) || 'N/A'}</p>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-500">
                                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                </div>
                                
                                {product.stock > 0 ? (
                                  <button 
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddToCart(product._id)
                                    }}
                                  >
                                    <ShoppingCart size={18} />
                                    <span>Add to Cart</span>
                                  </button>
                                ) : (
                                  <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg cursor-not-allowed font-medium">
                                    Out of Stock
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {filteredProducts.length === 0 && !loading && !error && (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <ShoppingCart size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
                    <p className="text-gray-600">
                      We couldn't find any products in this category. Try selecting a different category.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
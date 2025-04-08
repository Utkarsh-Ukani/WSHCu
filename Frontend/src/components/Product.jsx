import { useState, useEffect } from 'react';
import { Filter, ShoppingCart, Grid, List } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Product() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [isGridView, setIsGridView] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories and products in parallel
        const [categoriesResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:5112/api/admin/get-categories"),
          axios.get("http://localhost:5112/api/admin/get-products")
        ]);
        
        // Process categories
        const categoriesData = categoriesResponse.data.categories || [];
        const categoryNames = categoriesData.map(category => category.name);
        setCategories(['All', ...categoryNames]);
        
        // Process products
        const productsData = productsResponse.data.products;
        setProducts(productsData);
        
        // Apply initial category filter if present in URL
        if (categoryFromUrl && categoryFromUrl !== 'All') {
          setSelectedCategory(categoryFromUrl);
          setFilteredProducts(productsData.filter(product => 
            product.category && product.category.name === categoryFromUrl
          ));
        } else {
          setSelectedCategory('All');
          setFilteredProducts(productsData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, [categoryFromUrl]);

  // Update URL when category changes
  const filterProductsByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      navigate('/products');
      setFilteredProducts(products);
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`);
      setFilteredProducts(products.filter(product => 
        product.category && product.category.name === category
      ));
    }
    setMobileFilterOpen(false);
  };

  // Navigate to product detail page - using React Router
  const navigateToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Add to cart function (separate from navigation)
  const addToCart = (e, product) => {
    e.stopPropagation(); // Prevent triggering card click event
    // Add cart functionality here
    console.log(`Added ${product.name} to cart`);
    // You can implement cart API call here
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    const ratingValue = rating || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-sm ${i <= Math.round(ratingValue) ? 'text-yellow-500' : 'text-gray-300'}`}>
          ★
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  // Error message component
  const ErrorMessage = ({ message }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mx-auto my-4 max-w-lg">
      <p>{message}</p>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 mr-2 lg:hidden" onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
              <Filter size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 mr-2" onClick={() => setIsGridView(!isGridView)}>
              {isGridView ? <List size={20} /> : <Grid size={20} />}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Category Sidebar (Desktop) */}
          <div className="hidden lg:block w-64 mr-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <ul>
                {categories.map((category) => (
                  <li key={category} className="mb-2">
                    <button
                      onClick={() => filterProductsByCategory(category)}
                      className={`w-full text-left py-2 px-3 rounded-md ${
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
            <div className="lg:hidden w-full mb-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Categories</h2>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-gray-500">
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        filterProductsByCategory(category);
                        setMobileFilterOpen(false);
                      }}
                      className={`mr-2 mb-2 py-1 px-3 rounded-full text-sm ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-800'
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
            <div className="mb-4 bg-white p-3 rounded-lg shadow">
              <h2 className="text-xl font-medium text-gray-800">{selectedCategory}</h2>
              <p className="text-gray-500 text-sm">{filteredProducts.length} products</p>
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
                  // Grid View
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigateToProductDetail(product._id)}
                      >
                        <img 
                          src={product.image || '/api/placeholder/200/200'} 
                          alt={product.name} 
                          className="w-full h-48 object-cover" 
                          onError={(e) => {e.target.src = '/api/placeholder/200/200'}}
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category?.name || 'Uncategorized'}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div>
                              {product.discountedPrice ? (
                                <div className="flex flex-col">
                                  <p className="text-lg font-bold text-gray-900">${product.discountedPrice.toFixed(2) || 'N/A'}</p>
                                  <p className="text-sm text-gray-500 line-through">${product.price?.toFixed(2) || 'N/A'}</p>
                                </div>
                              ) : (
                                <p className="text-lg font-bold text-gray-900">${product.price?.toFixed(2) || 'N/A'}</p>
                              )}
                            </div>
                            <StarRating rating={product.rating || 0} />
                          </div>
                          {product.stock > 0 ? (
                            <button 
                              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                              onClick={(e) => addToCart(e, product)}
                            >
                              Add to Cart
                            </button>
                          ) : (
                            <button className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md cursor-not-allowed">
                              Out of Stock
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <div 
                        key={product._id} 
                        className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigateToProductDetail(product._id)}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <img 
                            src={product.image || '/api/placeholder/200/200'} 
                            alt={product.name} 
                            className="w-full sm:w-48 h-48 object-cover"
                            onError={(e) => {e.target.src = '/api/placeholder/200/200'}}
                          />
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.category?.name || 'Uncategorized'}</p>
                              <StarRating rating={product.rating || 0} />
                              <p className="mt-2 text-gray-600">{product.description || 'No description available.'}</p>
                              {product.quantity && (
                                <p className="mt-1 text-sm text-gray-500">Quantity: {product.quantity}</p>
                              )}
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div>
                                {product.discountedPrice ? (
                                  <div className="flex flex-col">
                                    <p className="text-xl font-bold text-gray-900">${product.discountedPrice.toFixed(2) || 'N/A'}</p>
                                    <p className="text-sm text-gray-500 line-through">${product.price?.toFixed(2) || 'N/A'}</p>
                                  </div>
                                ) : (
                                  <p className="text-xl font-bold text-gray-900">${product.price?.toFixed(2) || 'N/A'}</p>
                                )}
                              </div>
                              {product.stock > 0 ? (
                                <button 
                                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                  onClick={(e) => addToCart(e, product)}
                                >
                                  Add to Cart
                                </button>
                              ) : (
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-not-allowed">
                                  Out of Stock
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
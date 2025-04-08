import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/search?q=${encodeURIComponent(searchQuery)}`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results. Please try again later.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{searchQuery}"
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No products found matching your search criteria.
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage; 
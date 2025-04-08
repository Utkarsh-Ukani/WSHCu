import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const encodedCategoryName = encodeURIComponent(categoryName);
        
        console.log(`Fetching products for category: ${categoryName}`);
        console.log(`Encoded URL: http://localhost:5112/api/products/category/${encodedCategoryName}`);
        
        const response = await axios.get(`http://localhost:5112/api/products/category/${encodedCategoryName}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products by category:", error);
        setError("Failed to load products for this category");
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center min-h-[70vh] flex flex-col justify-center items-center">
        <div className="text-red-500 mb-4 text-xl">{error}</div>
        <p>Please try again later or check other categories</p>
      </div>
    );
  }

  return (
    <div className="p-4 container mx-auto max-w-7xl py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        {categoryName}
      </h2>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No products found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

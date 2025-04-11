import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ id, name, description, image }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/products?category=${encodeURIComponent(name)}`);
  };

  return (
    <div onClick={handleClick} className="block h-full cursor-pointer">
      <motion.div 
        className="bg-white rounded-lg overflow-hidden shadow h-full flex flex-col"
        whileHover={{ y: -5 }}
      >
        <div className="h-48 overflow-hidden">
          <motion.img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">{name}</h3>
          <p className="text-gray-600 text-sm flex-grow">{description}</p>
          <motion.div 
            className="mt-4 text-black font-medium flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Browse Products
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 ml-2" 
              fill="none" 
              viewBox="0 0 24 24"                
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryCard;
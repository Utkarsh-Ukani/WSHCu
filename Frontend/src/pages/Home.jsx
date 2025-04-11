import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { FaArrowRight, FaPercent, FaTruck, FaStar, FaClock, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from "../store/slices/productSlice";
import { getCategories } from "../store/slices/categorySlice";



const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [cartAnimation, setCartAnimation] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const  categories = useSelector((state) => state.categories);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products);
  
  console.log(categories);
  
  const handleAddToCart = (productId) => {
    setCartAnimation(productId);
    setTimeout(() => setCartAnimation(null), 1000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Banner */}
      <motion.div 
        className="bg-black text-white py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh Food Delivered To Your Door</h1>
              <p className="text-gray-300 text-lg mb-6">Discover premium quality ingredients for your kitchen from around the world.</p>
              <div className="flex space-x-4">
                <motion.button 
                  className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-6 rounded-full transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/products')}
                >
                  Shop Now
                </motion.button>
                <motion.button 
                  className="bg-transparent hover:bg-white/10 border-2 border-white py-3 px-6 rounded-full transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Offers
                </motion.button>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlc2glMjBmb29kfGVufDB8fDB8fHww" 
                alt="Fresh Food Collection" 
                className="rounded-lg shadow-lg h-96 w-96" 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto max-w-6xl py-8 px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center animate-section"
          id="features-section"
          variants={stagger}
          initial="hidden"
          animate={isVisible["features-section"] ? "visible" : "hidden"}
        >
          {[
            { icon: <FaTruck />, title: "Free Delivery", description: "On orders above ₹200" },
            { icon: <FaPercent />, title: "Weekly Deals", description: "Save up to 25%" },
            { icon: <FaStar />, title: "Quality Guarantee", description: "100% satisfaction" },
            { icon: <FaClock />, title: "24/7 Support", description: "Always here to help" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="mx-auto text-gray-800 text-3xl mb-2"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto max-w-6xl py-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Food Categories
          </motion.h2>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/products" className="text-gray-700 hover:text-black flex items-center transition duration-300">
              View all <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-section"
          id="categories-section"
          variants={stagger}
          initial="hidden"
          animate={isVisible["categories-section"] ? "visible" : "hidden"}
        >
          {categories.categories?.map((category) => (
            <motion.div
              key={category._id}
              variants={fadeInUp}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <CategoryCard 
                id={category._id}
                name={category.name} 
                description={category.description}
                image={category.image}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-6">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-gray-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Featured Products
            </motion.h2>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/products" className="text-gray-700 hover:text-black flex items-center transition duration-300">
                View all <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-section"
            id="products-section"
            variants={stagger}
            initial="hidden"
            animate={isVisible["products-section"] ? "visible" : "hidden"}
          >
            {products.slice(0, 8).map((product) => (
              <motion.div 
                key={product._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                </motion.div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-gray-900">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <motion.span 
                      className="text-gray-700 flex items-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <FaStar className="mr-1" /> 4.5
                    </motion.span>
                    <span className="text-gray-500 text-sm ml-2">(120+ reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-lg text-gray-900">₹{product.discountedPrice}</span>
                    {product.price !== product.discountPrice && (
                      <motion.span 
                        className="ml-2 line-through text-gray-500"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ₹{product.price}
                      </motion.span>
                    )}
                  </div>
                  <motion.button 
                    className="mt-3 w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded transition duration-300 relative"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {cartAnimation === product.id ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        Added!
                      </motion.span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Add to Cart <FaShoppingCart className="ml-2" />
                      </span>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="container mx-auto max-w-6xl py-12 px-4">
        <motion.div 
          className="bg-gradient-to-r from-gray-800 to-black rounded-xl shadow-lg overflow-hidden animate-section"
          id="offer-section"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible["offer-section"] ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          {...pulseAnimation}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Special Offer!
              </motion.h2>
              <motion.p 
                className="text-gray-300 text-lg mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Get 15% off on your first order. Use code: WELCOME15
              </motion.p>
              <motion.button 
                className="bg-white text-black hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                onClick={() => navigate('/products')}
              >
                Shop Now
              </motion.button>
            </div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <img src="/api/placeholder/500/300" alt="Special Offer" className="w-full h-64 object-cover" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-section"
            id="testimonials-section"
            variants={stagger}
            initial="hidden"
            animate={isVisible["testimonials-section"] ? "visible" : "hidden"}
          >
            {[
              {
                stars: 5,
                text: "The quality of the products is amazing! Fresh ingredients delivered right to my doorstep. Will definitely order again.",
                author: "Sarah Johnson"
              },
              {
                stars: 5,
                text: "Fast delivery and excellent customer service. The imported Italian olive oil is the best I've ever tasted!",
                author: "Michael Chen"
              },
              {
                stars: 5,
                text: "Amazing selection of international foods. I can find ingredients here that I can't get anywhere else in town.",
                author: "Emily Rodriguez"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-gray-100 p-6 rounded-lg shadow"
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <motion.div 
                  className="text-gray-700 flex mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                >
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <motion.span 
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                    >
                      <FaStar />
                    </motion.span>
                  ))}
                </motion.div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="font-semibold text-gray-900">- {testimonial.author}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
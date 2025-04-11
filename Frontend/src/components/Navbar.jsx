import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSearch,
  FaChevronDown,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/slices/categorySlice";
import { getProfile, logout } from "../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Get cart items count from Redux store
  const cart = useSelector((state) => state.cart.cart); // cart could be null or an object
  const cartItems = cart?.items || []; // safely get the array or default to []

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Get categories from Redux store
  const { categories, loading } = useSelector((state) => state.categories);

  // Get authentication state from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Handle outside clicks for dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (isCategoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCategoryDropdownOpen]);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Debug categories when they change
  useEffect(() => {
    console.log("Categories in Navbar:", categories);
  }, [categories]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categoryName) => {
    console.log("Navigating to products with category:", categoryName);
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    setIsCategoryDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Get current category from URL
  const queryParams = new URLSearchParams(location.search);
  const currentCategory = queryParams.get("category") || "All";

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-black text-white py-3 shadow-lg sticky top-0 z-50 transition-all duration-300 shadow-blue-900">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-12 max-w-7xl">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-extrabold tracking-wider"
        >
          <IoFastFood size={28} className="text-white" />
          <span className="hidden sm:block">WSH</span>
        </Link>

        <div className="flex items-center flex-1 mx-4 md:mx-12">
          {/* Category Dropdown */}
          <div className="relative mr-2" ref={dropdownRef}>
            <button
              className="flex items-center px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            >
              <span className="mr-2 font-medium">Categories</span>
              <FaChevronDown
                size={12}
                className="transition-transform duration-300"
                style={{
                  transform: isCategoryDropdownOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </button>

            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                {loading ? (
                  <div className="px-4 py-3 text-sm text-gray-500 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                    Loading...
                  </div>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <button
                      key={category._id}
                      className={`block w-full text-left px-4 py-2.5 text-sm ${
                        currentCategory === category.name
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-black"
                      } transition-colors duration-200`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.name);
                      }}
                    >
                      {category.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No categories found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className={`flex-1 relative ${
              isSearchFocused ? "scale-105" : ""
            } ml-8`}
          >
            <input
              type="text"
              placeholder="Search for food..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full text-gray-800 outline-none border-2 border-transparent focus:border-gray-400 transition-all duration-300 placeholder:text-gray-500"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-3 text-gray-500"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Navigation Links including About and Contact */}
        <div className="hidden md:flex items-center space-x-4 mr-4">
          <Link 
            to="/about" 
            className={`flex items-center space-x-1 hover:text-blue-300 transition-colors duration-200 ${isActive('/about') ? 'text-blue-300 font-medium' : ''}`}
          >
            <FaInfoCircle size={16} />
            <span>About</span>
          </Link>
          <Link 
            to="/contact"
            className={`flex items-center space-x-1 hover:text-blue-300 transition-colors duration-200 ${isActive('/contact') ? 'text-blue-300 font-medium' : ''}`}
          >
            <FaEnvelope size={16} />
            <span>Contact</span>
          </Link>
        </div>

        <div className="flex items-center space-x-1 md:space-x-4">
          {isAuthenticated ? (
            <div className="ml-3 relative">
              <div className="flex items-center">
                {/* Circle with first letter of name */}
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mx-3">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="ml-3 relative flex items-center space-x-3">
              <Link
                to="/login"
                className="bg-gradient-to-r from-gray-800 to-gray-600 text-white hover:from-gray-700 hover:to-gray-500 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-black to-gray-800 text-white hover:from-gray-900 hover:to-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign up
              </Link>
            </div>
          )}

          <Link
            to="/cart"
            className="relative p-2 hover:bg-white/20 rounded-full transition duration-300"
          >
            <FaShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold shadow-md">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation for About and Contact - shown only on smaller screens */}
      <div className="md:hidden flex justify-center mt-2 pb-1 space-x-6">
        <Link 
          to="/about" 
          className={`flex items-center space-x-1 text-sm hover:text-blue-300 transition-colors duration-200 ${isActive('/about') ? 'text-blue-300 font-medium' : ''}`}
        >
          <FaInfoCircle size={14} />
          <span>About</span>
        </Link>
        <Link 
          to="/contact"
          className={`flex items-center space-x-1 text-sm hover:text-blue-300 transition-colors duration-200 ${isActive('/contact') ? 'text-blue-300 font-medium' : ''}`}
        >
          <FaEnvelope size={14} />
          <span>Contact</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white pt-12 pb-6 shadow-lg shadow-blue-900">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center space-x-2 text-xl font-extrabold tracking-wider mb-4">
              <IoFastFood size={28} className="text-white" />
              <span>FoodCart</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Delivering delicious food to your doorstep. Fast, fresh, and always tasty.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-gray-300 transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-300 transition duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition duration-300">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-gray-400 hover:text-white transition duration-300">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/locations" className="text-gray-400 hover:text-white transition duration-300">
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-400 hover:text-white transition duration-300">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition duration-300">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MdLocationOn size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Food Street, Tasty City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <MdPhone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MdEmail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-400">support@foodcart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h4>
              <p className="text-gray-400">Get updates on special offers and new menu items</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-full text-gray-800 outline-none border-2 border-transparent focus:border-gray-400 transition-all duration-300 w-full md:w-auto placeholder:text-gray-500"
              />
              <button className="bg-white text-black px-4 py-2 rounded-r-full hover:bg-gray-300 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-2 md:mb-0">
            © {currentYear} FoodCart. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition duration-300">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
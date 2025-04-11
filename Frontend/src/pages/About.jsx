import React from "react";
import { FaUtensils, FaShippingFast, FaUsers, FaHeadset, FaListUl, FaPepperHot } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { BiSolidDrink } from "react-icons/bi";
import { BsSnow } from "react-icons/bs";
import { MdOutlineFoodBank } from "react-icons/md"; // Changed MdCanned to MdOutlineFoodBank which exists
import { GiMilkCarton } from "react-icons/gi";

const AboutPage = () => {
  // Food categories from the image
  const foodCategories = [
    { id: 1, name: "Dips, Chutney & Sauces", icon: <FaUtensils size={24} /> },
    { id: 2, name: "Canned & Imported items", icon: <MdOutlineFoodBank size={24} /> }, // Updated icon
    { id: 3, name: "Fruit Crush & Mocktails", icon: <BiSolidDrink size={24} /> },
    { id: 4, name: "Frozen Foods", icon: <BsSnow size={24} /> },
    { id: 5, name: "Dairy", icon: <GiMilkCarton size={24} /> },
    { id: 6, name: "Seasoning", icon: <FaPepperHot size={24} /> },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-black py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <IoFastFood size={56} className="text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              About WSH Food Delivery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Delivering delicious meals and premium food products from your favorite local shops and global sources right to your doorstep.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-600 opacity-5 transform -skew-y-6"></div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-blue-500">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2022, WSH began with a simple mission: to connect food lovers with the best local shops and premium food products, providing lightning-fast delivery service that keeps food hot and customers happy.
            </p>
            <p className="text-gray-300 mb-4">
              What started as a small operation serving just a few neighborhoods has quickly grown into a platform that partners with hundreds of restaurants and specialty food suppliers across multiple cities.
            </p>
            <p className="text-gray-300">
              Our dedicated team works tirelessly to ensure every order is delivered promptly and every customer interaction exceeds expectations, whether you're ordering a hot meal or premium grocery items.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center p-8">
              <div className="text-center">
                <IoFastFood size={80} className="mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-bold">WSH</h3>
                <p className="text-blue-200">Established 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Categories Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-500">Our Food Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {foodCategories.map((category, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-900/30 hover:transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-full text-blue-500">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{index + 1}. {category.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {index === 0 && "Fresh sauces and condiments to enhance every meal"}
                    {index === 1 && "International flavors and specialty preserved items"}
                    {index === 2 && "Refreshing beverages for every occasion"}
                    {index === 3 && "Ready-to-heat convenience foods for busy days"}
                    {index === 4 && "Fresh dairy products from quality sources"}
                    {index === 5 && "Spices and seasonings to perfect your cooking"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/products" className="inline-flex items-center bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300">
              <FaListUl className="mr-2" />
              Browse Our Full Catalog
            </a>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-500">Why Choose WSH</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaUtensils size={32} className="text-blue-500" />,
              title: "Curated Selection",
              description:
                "We partner with only the best shops and suppliers to ensure quality with every order.",
            },
            {
              icon: <FaShippingFast size={32} className="text-blue-500" />,
              title: "Fast Delivery",
              description:
                "Our efficient delivery network ensures your food and groceries arrive in perfect condition.",
            },
            {
              icon: <FaUsers size={32} className="text-blue-500" />,
              title: "Community First",
              description:
                "We support local businesses and help them reach more customers.",
            },
            {
              icon: <FaHeadset size={32} className="text-blue-500" />,
              title: "Customer Support",
              description:
                "Our responsive team is available 24/7 to address any concerns.",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-900/30 hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Highlights */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-500">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Dips, Chutney & Sauces",
                name: "Signature Hot Sauce Collection",
                description: "Our exclusive range of handcrafted hot sauces, from mild to wild",
              },
              {
                category: "Frozen Foods",
                name: "Gourmet Pizza Selection",
                description: "Restaurant-quality pizzas ready to heat and enjoy at home",
              },
              {
                category: "Dairy",
                name: "Artisanal Cheese Box",
                description: "Curated selection of premium local and imported cheeses",
              },
            ].map((product, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg">
                <div className="h-40 bg-blue-900/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-blue-400 mb-2">{product.category}</div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Join Us CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Join Our Food Journey</h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the best local cuisines and premium food products delivered to your doorstep with just a few clicks.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-300">
              Explore Categories
            </button>
            <button className="bg-blue-600 text-white hover:bg-blue-500 px-8 py-3 rounded-lg font-medium shadow-lg transition-all duration-300">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
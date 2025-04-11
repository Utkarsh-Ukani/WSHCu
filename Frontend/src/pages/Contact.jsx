import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

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
              Contact WSH Food Delivery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions or feedback? We're here to help. Reach out to our team through any of the channels below.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-600 opacity-5 transform -skew-y-6"></div>
      </div>

      {/* Contact Info Section */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-10 text-blue-500">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-full text-blue-500 mt-1">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Our Location</h3>
                  <p className="text-gray-300">
                    123 Food Street, Culinary District<br />
                    Metropolis, MP 10010
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-full text-blue-500 mt-1">
                  <FaPhoneAlt size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Phone Number</h3>
                  <p className="text-gray-300">
                    Customer Service: (555) 123-4567<br />
                    Restaurant Partners: (555) 765-4321
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-full text-blue-500 mt-1">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Address</h3>
                  <p className="text-gray-300">
                    Customer Support: support@wshfood.com<br />
                    Partner Inquiries: partners@wshfood.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 p-3 rounded-full text-blue-500 mt-1">
                  <FaClock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hours of Operation</h3>
                  <p className="text-gray-300">
                    Food Delivery: 10:00 AM - 10:00 PM Daily<br />
                    Customer Support: 9:00 AM - 11:00 PM Daily
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600/20 p-4 rounded-full text-blue-500 hover:bg-blue-600/40 transition-colors duration-300">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="bg-blue-600/20 p-4 rounded-full text-blue-500 hover:bg-blue-600/40 transition-colors duration-300">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="bg-blue-600/20 p-4 rounded-full text-blue-500 hover:bg-blue-600/40 transition-colors duration-300">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-blue-400">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-blue-400">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-blue-400">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Order Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-blue-400">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide details about your inquiry..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow-lg transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-500">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I track my order?",
                answer: "You can track your order in real-time through our mobile app or website. Simply log in to your account and view the 'Active Orders' section to see the status of your delivery."
              },
              {
                question: "What areas do you deliver to?",
                answer: "We currently deliver to all major neighborhoods in Metropolis and surrounding suburbs. You can check if we deliver to your area by entering your postal code on our delivery page."
              },
              {
                question: "How can I become a restaurant partner?",
                answer: "Restaurant owners can apply to partner with WSH by filling out our partner application form. Our team will review your submission and contact you within 2-3 business days."
              },
              {
                question: "What is your refund policy?",
                answer: "If you're not satisfied with your order, please contact our customer support within 24 hours of delivery. We'll review your case and process appropriate refunds according to our policy."
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-400">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-6 md:px-12 py-16 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">Find Us</h2>
        <div className="bg-gray-800 p-4 rounded-xl overflow-hidden shadow-xl">
          <div className="aspect-w-16 aspect-h-9 h-96 bg-blue-900/30 flex items-center justify-center rounded-lg">
            <div className="text-center p-8">
              <FaMapMarkerAlt size={48} className="mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
              <p className="text-blue-300 mb-4">Our headquarters is located in the heart of Culinary District</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition-colors duration-300">
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-16">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter to receive updates on new restaurant partners, special offers, and exclusive promotions.
          </p>
          <div className="flex flex-col md:flex-row justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-3 rounded-l-lg md:w-96 focus:outline-none text-gray-800"
            />
            <button className="bg-blue-600 text-white hover:bg-blue-500 px-8 py-3 rounded-lg md:rounded-l-none font-medium shadow-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
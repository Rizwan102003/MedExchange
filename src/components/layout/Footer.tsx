import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Stethoscope className="h-7 w-7" />
              <span className="text-xl font-bold">MedExchange</span>
            </Link>
            <p className="text-gray-300 mb-4">
              The trusted marketplace for buying and selling used medical equipment. Connect with buyers and sellers near you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create-listing" className="text-gray-300 hover:text-white transition-colors">
                  Sell Item
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=Mobility" className="text-gray-300 hover:text-white transition-colors">
                  Mobility Equipment
                </Link>
              </li>
              <li>
                <Link to="/?category=Orthopedic" className="text-gray-300 hover:text-white transition-colors">
                  Orthopedic Supports
                </Link>
              </li>
              <li>
                <Link to="/?category=Respiratory" className="text-gray-300 hover:text-white transition-colors">
                  Respiratory Equipment
                </Link>
              </li>
              <li>
                <Link to="/?category=Daily-Living" className="text-gray-300 hover:text-white transition-colors">
                  Daily Living Aids
                </Link>
              </li>
              <li>
                <Link to="/?category=Medical-Furniture" className="text-gray-300 hover:text-white transition-colors">
                  Medical Furniture
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact and Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Contact Us</li>
              <li className="text-gray-300">FAQ</li>
              <li className="text-gray-300">Terms of Service</li>
              <li className="text-gray-300">Privacy Policy</li>
              <li className="text-gray-300">Safety Tips</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MedExchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
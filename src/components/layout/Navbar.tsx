import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart, User, LogOut, MessageCircle, PlusCircle, Stethoscope } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-primary-600"
          >
            <Stethoscope className="h-8 w-8 text-primary-600" />
            <span className="hidden sm:inline text-primary-600">MedExchange</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 mx-4 relative"
          >
            <input
              type="text"
              placeholder="Search for medical equipment..."
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {state.isAuthenticated ? (
              <>
                <Link 
                  to="/favorites" 
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                  title="Favorites"
                >
                  <Heart className="h-6 w-6" />
                </Link>
                <Link 
                  to="/create-listing" 
                  className="flex items-center space-x-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Sell</span>
                </Link>
                <div className="relative group">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
                    <User className="h-6 w-6" />
                  </button>
                  <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{state.user?.name}</p>
                      <p className="text-sm text-gray-500">{state.user?.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700" 
            onClick={toggleMenu}
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4">
          <div className="container mx-auto px-4 space-y-4">
            {/* Search Bar - Mobile */}
            <form 
              onSubmit={handleSearch}
              className="flex relative"
            >
              <input
                type="text"
                placeholder="Search for medical equipment..."
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {state.isAuthenticated ? (
                <>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">{state.user?.name}</p>
                    <p className="text-sm text-gray-500">{state.user?.email}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="flex items-center py-2 text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    <span>Profile</span>
                  </Link>
                  <Link 
                    to="/favorites" 
                    className="flex items-center py-2 text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <Heart className="h-5 w-5 mr-3" />
                    <span>Favorites</span>
                  </Link>
                  <Link 
                    to="/create-listing" 
                    className="flex items-center py-2 text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    <PlusCircle className="h-5 w-5 mr-3" />
                    <span>Sell Item</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full py-2 text-left text-gray-700"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block w-full py-2 text-center bg-white border border-gray-300 rounded-lg text-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full py-2 text-center bg-primary-600 rounded-lg text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
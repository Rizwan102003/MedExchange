import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, MessageCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/dateFormatter';
import ListingCard from '../components/listing/ListingCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getListingById, toggleFavorite, state: listingsState } = useListings();
  const { state: authState } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');

  const listing = getListingById(id || '');
  const isFavorite = listing ? listingsState.favorites.includes(listing.id) : false;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
          <p className="mb-4">The listing you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % listing.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1));
  };

  const handleFavoriteClick = () => {
    if (authState.isAuthenticated) {
      toggleFavorite(listing.id);
    } else {
      alert('Please login to save favorites');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to the seller
    alert('Message sent to seller! They will respond to you soon.');
    setMessage('');
    setShowContactForm(false);
  };

  // Find similar listings based on category
  const similarListings = listingsState.listings
    .filter(item => 
      item.category === listing.category && 
      item.id !== listing.id
    )
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/?category=${listing.category}`} className="text-gray-500 hover:text-primary-600">{listing.category}</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">{listing.title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Main Image */}
            <div className="relative aspect-[4/3]">
              <img
                src={listing.images[currentImage]}
                alt={`${listing.title} - Image ${currentImage + 1}`}
                className="w-full h-full object-contain bg-gray-100"
              />
              
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {listing.images.length > 1 && (
              <div className="flex p-2 overflow-x-auto">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`flex-shrink-0 w-20 h-20 m-1 rounded overflow-hidden border-2 ${
                      currentImage === index ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-medium mb-3">Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="w-32 text-gray-500">Condition</div>
                  <div className="font-medium">{listing.condition}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 text-gray-500">Category</div>
                  <div className="font-medium">{listing.category}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 text-gray-500">Location</div>
                  <div className="font-medium">{listing.location}</div>
                </div>
                <div className="flex items-start">
                  <div className="w-32 text-gray-500">Posted On</div>
                  <div className="font-medium">{formatDate(new Date(listing.createdAt))}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Price and Seller Info */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{listing.title}</h1>
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full ${
                  isFavorite 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={isFavorite ? 'h-5 w-5 fill-red-500' : 'h-5 w-5'} />
              </button>
            </div>
            
            <div className="text-3xl font-bold text-primary-600 mb-4">
              ${listing.price}
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted {formatDate(new Date(listing.createdAt))}</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Seller
            </button>
            
            {/* Contact Form */}
            {showContactForm && (
              <form onSubmit={handleContactSubmit} className="mt-4 pt-4 border-t border-gray-100">
                <label className="block mb-2 text-sm font-medium">
                  Message to seller
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="I'm interested in this item. Is it still available?"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  required
                ></textarea>
                <button
                  type="submit"
                  className="mt-3 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
          
          {/* Seller Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Seller Information</h2>
            <div className="flex items-center mb-4">
              <img
                src={listing.seller.avatar}
                alt={listing.seller.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-medium">{listing.seller.name}</p>
                <p className="text-sm text-gray-500">Member since January 2025</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <span className="text-sm">📞 {listing.seller.phone}</span>
              </div>
              {authState.isAuthenticated ? (
                <div className="flex items-center text-gray-700">
                  <span className="text-sm">✉️ {listing.seller.email}</span>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Login to view contact details</p>
              )}
            </div>
          </div>
          
          {/* Safety Tips */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <h3 className="font-medium text-yellow-800 mb-2 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2" />
              Safety Tips
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1 pl-7 list-disc">
              <li>Meet in a public, well-lit place</li>
              <li>Check the item thoroughly before paying</li>
              <li>Never send money in advance</li>
              <li>Consider bringing someone with you</li>
            </ul>
            <a 
              href="#" 
              className="flex items-center mt-2 text-sm text-primary-600 hover:text-primary-800"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Read more safety guidelines
            </a>
          </div>
        </div>
      </div>
      
      {/* Similar Listings */}
      {similarListings.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Similar Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarListings.map(item => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// A properly named functional component that displays a shield check icon
const ShieldCheck: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
};

export default ProductDetail;
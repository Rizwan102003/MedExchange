import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { Listing } from '../../types';
import { useListings } from '../../context/ListingsContext';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from '../../utils/dateFormatter';

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { state: authState } = useAuth();
  const { toggleFavorite, state: listingsState } = useListings();
  const isFavorite = listingsState.favorites.includes(listing.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (authState.isAuthenticated) {
      toggleFavorite(listing.id);
    } else {
      // Redirect to login or show a message
      alert('Please login to save favorites');
    }
  };

  return (
    <Link 
      to={`/product/${listing.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={listing.images[0] || 'https://via.placeholder.com/300x225?text=No+Image'} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {listing.featured && (
          <div className="absolute top-0 left-0 bg-primary-600 text-white text-xs px-2 py-1">
            Featured
          </div>
        )}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-colors"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
      </div>

      {/* Listing Details */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-800 line-clamp-1 mb-1 group-hover:text-primary-600 transition-colors">
            {listing.title}
          </h3>
          <p className="text-lg font-bold text-primary-600">${listing.price}</p>
        </div>
        
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{listing.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{listing.location}</span>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span>{listing.condition}</span>
          <span>{formatDistanceToNow(new Date(listing.createdAt))}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
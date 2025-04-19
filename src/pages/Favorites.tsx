import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useListings } from '../context/ListingsContext';
import ListingCard from '../components/listing/ListingCard';

const Favorites: React.FC = () => {
  const { state } = useListings();
  
  const favoriteListings = state.listings.filter(listing => 
    state.favorites.includes(listing.id)
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Heart className="h-6 w-6 text-primary-600 mr-3" />
        <h1 className="text-2xl font-bold">My Favorites</h1>
      </div>
      
      {favoriteListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="bg-gray-100 inline-flex p-4 rounded-full mb-4">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">
            Save items you're interested in by clicking the heart icon.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Listings
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
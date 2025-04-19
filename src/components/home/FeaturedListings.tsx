import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Listing } from '../../types';
import ListingCard from '../listing/ListingCard';

interface FeaturedListingsProps {
  listings: Listing[];
}

const FeaturedListings: React.FC<FeaturedListingsProps> = ({ listings }) => {
  const featuredListings = listings.filter(listing => listing.featured);
  
  if (featuredListings.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Featured Listings</h2>
        <a 
          href="#all-listings" 
          className="flex items-center text-primary-600 hover:text-primary-800 transition-colors text-sm font-medium"
        >
          View all 
          <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredListings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
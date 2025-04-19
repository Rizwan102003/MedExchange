import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import CategoryList from '../components/home/CategoryList';
import FeaturedListings from '../components/home/FeaturedListings';
import SearchFilters from '../components/home/SearchFilters';
import ListingCard from '../components/listing/ListingCard';
import { useListings } from '../context/ListingsContext';
import Hero from '../components/home/Hero';

const Home: React.FC = () => {
  const location = useLocation();
  const { state, searchListings, filterListingsByCategory, filterListingsByPrice, filterListingsByLocation, resetFilters } = useListings();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique locations from listings
  const locations = useMemo(() => {
    const uniqueLocations = new Set(state.listings.map(listing => listing.location));
    return Array.from(uniqueLocations).sort();
  }, [state.listings]);

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    const category = params.get('category');
    
    // Apply filters based on URL parameters
    if (searchQuery) {
      searchListings(searchQuery);
    }
    
    if (category) {
      const categoryId = state.categories.find(
        c => c.name.toLowerCase() === category.toLowerCase()
      )?.id || 'all';
      
      setSelectedCategory(categoryId);
      filterListingsByCategory(categoryId);
    }
  }, [location.search, state.categories]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    filterListingsByCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    searchListings(query);
  };

  const handleFilterPrice = (min: number, max: number) => {
    filterListingsByPrice(min, max);
  };

  const handleFilterLocation = (location: string) => {
    filterListingsByLocation(location);
  };

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 py-8">
        <CategoryList
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        
        <SearchFilters
          onSearch={handleSearch}
          onFilterPrice={handleFilterPrice}
          onFilterLocation={handleFilterLocation}
          onResetFilters={resetFilters}
          initialSearchQuery={new URLSearchParams(location.search).get('search') || ''}
          locations={locations}
        />
        
        <FeaturedListings listings={state.listings} />
        
        <div id="all-listings" className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">All Listings</h2>
          
          {state.filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {state.filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No listings found that match your criteria.</p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
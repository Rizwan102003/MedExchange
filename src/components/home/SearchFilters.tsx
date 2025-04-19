import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface PriceRange {
  min: number;
  max: number;
}

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterPrice: (min: number, max: number) => void;
  onFilterLocation: (location: string) => void;
  onResetFilters: () => void;
  initialSearchQuery?: string;
  locations: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilterPrice,
  onFilterLocation,
  onResetFilters,
  initialSearchQuery = '',
  locations,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 2000 });
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = e.target.value;
    setSelectedLocation(location);
    onFilterLocation(location);
  };

  const handleApplyFilters = () => {
    onFilterPrice(priceRange.min, priceRange.max);
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setPriceRange({ min: 0, max: 2000 });
    setSearchQuery('');
    setSelectedLocation('');
    onResetFilters();
    setShowFilters(false);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Search Bar */}
        <form 
          onSubmit={handleSearchSubmit}
          className="flex-1 relative"
        >
          <input
            type="text"
            placeholder="Search for medical equipment..."
            className="w-full py-3 px-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filter Options</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Price Range */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm">Price Range</label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  name="min"
                  min="0"
                  max={priceRange.max}
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  name="max"
                  min={priceRange.min}
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
            </div>
          </div>

          {/* Location Filter */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-sm">Location</label>
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-200 rounded"
            >
              <option value="">All Locations</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3 pt-3 border-t border-gray-100">
            <button
              onClick={handleResetFilters}
              className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
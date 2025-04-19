import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Listing, Category, ListingsState } from '../types';
import { mockListings, mockCategories } from '../data/mockData';

interface ListingsContextProps {
  state: ListingsState;
  getListingById: (id: string) => Listing | undefined;
  searchListings: (query: string) => void;
  filterListingsByCategory: (categoryId: string) => void;
  filterListingsByPrice: (min: number, max: number) => void;
  filterListingsByLocation: (location: string) => void;
  resetFilters: () => void;
  toggleFavorite: (listingId: string) => void;
  addListing: (listing: Omit<Listing, 'id' | 'createdAt'>) => void;
}

const ListingsContext = createContext<ListingsContextProps | undefined>(undefined);

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
};

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ListingsState>({
    listings: [],
    filteredListings: [],
    categories: [],
    loading: true,
    error: null,
    favorites: [],
  });

  useEffect(() => {
    // Load listings and categories
    setState(prevState => ({
      ...prevState,
      listings: mockListings,
      filteredListings: mockListings,
      categories: mockCategories,
      loading: false,
    }));

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('medEquipFavorites');
    if (savedFavorites) {
      setState(prevState => ({
        ...prevState,
        favorites: JSON.parse(savedFavorites),
      }));
    }
  }, []);

  const getListingById = (id: string) => {
    return state.listings.find(listing => listing.id === id);
  };

  const searchListings = (query: string) => {
    if (!query.trim()) {
      setState(prevState => ({
        ...prevState,
        filteredListings: prevState.listings,
      }));
      return;
    }

    const searchTerms = query.toLowerCase().trim();
    const filtered = state.listings.filter(
      listing =>
        listing.title.toLowerCase().includes(searchTerms) ||
        listing.description.toLowerCase().includes(searchTerms) ||
        listing.category.toLowerCase().includes(searchTerms)
    );

    setState(prevState => ({
      ...prevState,
      filteredListings: filtered,
    }));
  };

  const filterListingsByCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setState(prevState => ({
        ...prevState,
        filteredListings: prevState.listings,
      }));
      return;
    }

    const category = state.categories.find(c => c.id === categoryId);
    if (!category) return;

    const filtered = state.listings.filter(
      listing => listing.category.toLowerCase() === category.name.toLowerCase()
    );

    setState(prevState => ({
      ...prevState,
      filteredListings: filtered,
    }));
  };

  const filterListingsByPrice = (min: number, max: number) => {
    const filtered = state.listings.filter(
      listing => listing.price >= min && listing.price <= max
    );

    setState(prevState => ({
      ...prevState,
      filteredListings: filtered,
    }));
  };

  const filterListingsByLocation = (location: string) => {
    if (!location) {
      setState(prevState => ({
        ...prevState,
        filteredListings: prevState.listings,
      }));
      return;
    }

    const filtered = state.listings.filter(
      listing => listing.location === location
    );

    setState(prevState => ({
      ...prevState,
      filteredListings: filtered,
    }));
  };

  const resetFilters = () => {
    setState(prevState => ({
      ...prevState,
      filteredListings: prevState.listings,
    }));
  };

  const toggleFavorite = (listingId: string) => {
    let newFavorites: string[];
    
    if (state.favorites.includes(listingId)) {
      newFavorites = state.favorites.filter(id => id !== listingId);
    } else {
      newFavorites = [...state.favorites, listingId];
    }
    
    localStorage.setItem('medEquipFavorites', JSON.stringify(newFavorites));
    
    setState(prevState => ({
      ...prevState,
      favorites: newFavorites,
    }));
  };

  const addListing = (listing: Omit<Listing, 'id' | 'createdAt'>) => {
    const newListing: Listing = {
      ...listing,
      id: `listing-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setState(prevState => ({
      ...prevState,
      listings: [newListing, ...prevState.listings],
      filteredListings: [newListing, ...prevState.filteredListings],
    }));
  };

  return (
    <ListingsContext.Provider
      value={{
        state,
        getListingById,
        searchListings,
        filterListingsByCategory,
        filterListingsByPrice,
        filterListingsByLocation,
        resetFilters,
        toggleFavorite,
        addListing,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};
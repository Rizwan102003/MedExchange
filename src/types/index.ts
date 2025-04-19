export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  category: string;
  location: string;
  createdAt: string;
  seller: User;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ListingsState {
  listings: Listing[];
  filteredListings: Listing[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  favorites: string[];
}
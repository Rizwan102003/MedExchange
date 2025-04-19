import React from 'react';
import { useListings } from '../../context/ListingsContext';
import { Category } from '../../types';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onClick: (categoryId: string) => void;
  active: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, active }) => {
  // Dynamically get the icon from Lucide
  const IconComponent = (LucideIcons as any)[
    category.icon.charAt(0).toUpperCase() + category.icon.slice(1)
  ] || LucideIcons.Package;

  return (
    <button
      onClick={() => onClick(category.id)}
      className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
        active 
          ? 'bg-primary-100 text-primary-700 border-2 border-primary-300' 
          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className={`p-3 rounded-full ${active ? 'bg-primary-200' : 'bg-gray-100'} mb-2`}>
        <IconComponent className="h-6 w-6" />
      </div>
      <span className="font-medium text-sm">{category.name}</span>
      {category.count !== undefined && (
        <span className="text-xs text-gray-500 mt-1">{category.count} items</span>
      )}
    </button>
  );
};

interface CategoryListProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  onSelectCategory, 
  selectedCategory 
}) => {
  const { state } = useListings();
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <CategoryCard
          category={{ id: 'all', name: 'All Items', icon: 'layers' }}
          onClick={onSelectCategory}
          active={selectedCategory === 'all'}
        />
        {state.categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onClick={onSelectCategory}
            active={selectedCategory === category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
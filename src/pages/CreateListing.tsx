import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronDown, X, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useListings } from '../context/ListingsContext';
import { Listing } from '../types';

const CreateListing: React.FC = () => {
  const { state: authState } = useAuth();
  const { addListing, state: listingsState } = useListings();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: authState.user?.location || '',
    images: ['https://images.pexels.com/photos/3771060/pexels-photo-3771060.jpeg'],
  });
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const validateStep = () => {
    setError(null);
    
    if (step === 1) {
      if (!formData.title.trim()) {
        setError('Title is required');
        return false;
      }
      if (!formData.description.trim()) {
        setError('Description is required');
        return false;
      }
      if (!formData.category) {
        setError('Category is required');
        return false;
      }
    } else if (step === 2) {
      if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
        setError('Valid price is required');
        return false;
      }
      if (!formData.condition) {
        setError('Condition is required');
        return false;
      }
      if (!formData.location.trim()) {
        setError('Location is required');
        return false;
      }
      if (formData.images.length === 0) {
        setError('At least one image is required');
        return false;
      }
    }
    
    return true;
  };
  
  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep()) return;
    
    // Create new listing
    const newListing: Omit<Listing, 'id' | 'createdAt'> = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      condition: formData.condition as Listing['condition'],
      location: formData.location,
      images: formData.images,
      seller: authState.user!,
    };
    
    addListing(newListing);
    navigate('/');
  };
  
  const handleAddImage = () => {
    // In a real app, this would handle image upload
    // For demo purposes, we'll just add a placeholder image
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, 'https://images.pexels.com/photos/4226893/pexels-photo-4226893.jpeg'],
    }));
  };
  
  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-8">Create a Listing</h1>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step >= 2 ? 'bg-primary-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step >= 3 ? 'bg-primary-600' : 'bg-gray-200'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <div className={step >= 1 ? 'text-primary-600 font-medium' : ''}>Basic Info</div>
          <div className={step >= 2 ? 'text-primary-600 font-medium' : ''}>Details & Images</div>
          <div className={step >= 3 ? 'text-primary-600 font-medium' : ''}>Review & Submit</div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Folding Wheelchair in Excellent Condition"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe your item, including age, brand, features, and any defects or wear"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {listingsState.categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Details and Images */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                    Condition *
                  </label>
                  <div className="relative">
                    <select
                      name="condition"
                      id="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      required
                    >
                      <option value="">Select condition</option>
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., New York, NY"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Images *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md aspect-square hover:border-primary-500 transition-colors"
                  >
                    <Camera className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-sm text-gray-500">Add Image</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Add up to 5 images to showcase your item. First image will be the main image.
                </p>
              </div>
            </div>
          )}
          
          {/* Step 3: Review and Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Review Your Listing</h3>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    {formData.images[0] && (
                      <img
                        src={formData.images[0]}
                        alt="Main Image"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium">{formData.title}</h4>
                    <p className="text-primary-600 font-bold">${formData.price}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {formData.condition} · {formData.category} · {formData.location}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm mb-4">
                  <h5 className="font-medium mb-1">Description</h5>
                  <p className="text-gray-700">{formData.description}</p>
                </div>
                
                <div className="text-sm">
                  <h5 className="font-medium mb-1">Images</h5>
                  <div className="flex space-x-2 overflow-x-auto">
                    {formData.images.map((image, index) => (
                      <div key={index} className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-sm text-yellow-800">
                  By publishing this listing, you agree to our Terms of Service and verify that this item complies with our policies.
                </p>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center"
              >
                <Check className="h-5 w-5 mr-1" />
                Publish Listing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
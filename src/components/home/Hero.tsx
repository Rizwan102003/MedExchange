import React from 'react';
import { ArrowRight, Armchair as Wheelchair, ShieldCheck, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-700 to-primary-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Buy and Sell Used Medical Equipment with Confidence
            </h1>
            <p className="text-lg text-primary-100 md:pr-12">
              Find affordable medical equipment or sell items you no longer need. Connect with buyers and sellers in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/create-listing"
                className="bg-white text-primary-700 hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              >
                Sell Your Equipment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#all-listings"
                className="border border-white text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-lg font-medium flex items-center justify-center"
              >
                Browse Equipment
              </a>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl transform rotate-1">
              <img
                src="https://images.pexels.com/photos/3771055/pexels-photo-3771055.jpeg"
                alt="Medical equipment"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg transform -rotate-3">
              <img
                src="https://images.pexels.com/photos/7108358/pexels-photo-7108358.jpeg"
                alt="Medical equipment close-up"
                className="w-56 h-40 object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white text-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Wheelchair className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Browse thousands of medical equipment listings across multiple categories from sellers nationwide.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Community</h3>
              <p className="text-gray-600">
                Connect with verified sellers and browse detailed listings with photos and product history.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600">
                Message sellers directly to ask questions, negotiate prices, and arrange pickup or delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
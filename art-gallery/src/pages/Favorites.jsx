import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Basic Tee 6-Pack',
      price: 192.00,
      color: 'White',
      size: 'XXS',
      image: '/api/placeholder/300/300'
    },
    {
      id: 2,
      name: 'Premium Hoodie',
      price: 89.99,
      color: 'Black',
      size: 'M',
      image: '/api/placeholder/300/300'
    },
    {
      id: 3,
      name: 'Slim Fit Jeans',
      price: 69.95,
      color: 'Blue',
      size: '32',
      image: '/api/placeholder/300/300'
    }
  ]);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    // This would connect to your cart functionality
    console.log(`Added ${item.name} to cart`);
    // You could call a parent function passed as props to add to cart
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <span className="text-gray-500">{favorites.length} items</span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Your favorites list is empty</h3>
          <p className="mt-1 text-sm text-gray-500">Items you favorite will appear here for easy access.</p>
          <div className="mt-6">
            <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              Continue shopping
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {favorites.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-lg shadow overflow-hidden">
              <div className="w-full aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden group-hover:opacity-75">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="px-4 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-xl font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                <div className="mt-1 flex space-x-2 text-sm text-gray-500">
                  <span>Size: {item.size}</span>
                  <span>•</span>
                  <span>Color: {item.color}</span>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                  >
                    <ShoppingBag className="inline-block w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="p-2 border border-gray-300 rounded-md text-gray-400 hover:text-red-500 hover:border-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="sr-only">Remove from favorites</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
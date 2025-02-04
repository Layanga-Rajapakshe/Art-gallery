import React from 'react';

const BuyProduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 mt-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Product Image */}
        <img
          src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Aloe Vera"
          className="w-full h-96 object-cover"
        />

        {/* Product Info */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Aloe Vera Plant</h1>
          <p className="text-gray-700 mb-6">
            Bring nature indoors with this vibrant Aloe Vera plant. Known for its medicinal
            properties and easy care requirements, it’s the perfect addition to any home or office.
          </p>

          {/* Price and Discount */}
          <div className="mb-6">
            <p className="text-2xl font-semibold text-gray-800">$29.99</p>
            <p className="text-sm text-gray-600 line-through">$33.99</p>
            <span className="bg-rose-600 text-white px-3 py-1 rounded-md font-medium">Save 10%</span>
          </div>

          {/* Features List */}
          <ul className="list-disc list-inside mb-8 text-gray-700">
            <li>Natural air purifier</li>
            <li>Minimal maintenance required</li>
            <li>Great for beginners and plant enthusiasts</li>
          </ul>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="bg-indigo-900 text-white px-6 py-3 rounded-md uppercase font-medium tracking-wider hover:bg-indigo-600">
              Buy Now
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-md uppercase font-medium tracking-wider hover:bg-gray-100">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
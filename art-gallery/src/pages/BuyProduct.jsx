import React from 'react';

const BuyProduct = () => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = {
      id: 1, // Replace with actual product ID
      name: 'Serenity in Blue',
      price: 2400,
      artist: 'Elena Ramirez',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      quantity: 1,
    };

    dispatch(addToCart(product));
    alert('Added to cart!');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Artwork Image */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Serenity in Blue"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Artwork Info */}
          <div className="md:w-1/2 p-8">
            <div className="uppercase text-indigo-600 text-xs font-bold tracking-widest mb-2">
              Featured Artwork
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Serenity in Blue</h1>
            <p className="text-lg text-gray-600 mb-4">by Elena Ramirez</p>
            
            <div className="border-t border-b border-gray-200 py-4 my-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Medium</span>
                <span className="font-medium">Oil on Canvas</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Dimensions</span>
                <span className="font-medium">24" × 36" (60.9 × 91.4 cm)</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Year</span>
                <span className="font-medium">2023</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Framed</span>
                <span className="font-medium">Yes, Walnut</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <p className="text-2xl font-semibold text-gray-800">$2,400</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600 mr-2">Excluding shipping and taxes</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Available</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              "Serenity in Blue" explores themes of tranquility and reflection through subtle gradients 
              of blue and teal. The painting invites viewers to immerse themselves in its peaceful 
              depths, evoking the calming sensation of water and sky merging at the horizon.
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button className="bg-indigo-700 text-white px-6 py-3 rounded-md font-medium tracking-wider hover:bg-indigo-800 transition"
              onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded-md font-medium tracking-wider hover:bg-gray-100 transition">
                Add to Collection
              </button>
            </div>

            {/* Additional Options */}
            <div className="mt-6 flex items-center text-gray-600">
              <button className="flex items-center mr-6 hover:text-indigo-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                Certificate of Authenticity
              </button>
              <button className="flex items-center hover:text-indigo-600 transition">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Inquire About This Artwork
              </button>
            </div>
          </div>
        </div>

        {/* Artist Information */}
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About the Artist</h2>
          <div className="flex items-center">
            <img 
              src="/api/placeholder/80/80" 
              alt="Elena Ramirez" 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-medium text-gray-900">Elena Ramirez</h3>
              <p className="text-gray-600 mt-1">
                Contemporary abstract painter based in Barcelona, Spain. Elena's work explores themes of 
                nature, emotion, and the human experience through vibrant colors and expressive brushwork.
              </p>
              <button className="text-indigo-600 font-medium mt-2 hover:text-indigo-800 transition">
                View Artist Profile
              </button>
            </div>
          </div>
        </div>

        {/* Related Artworks */}
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="overflow-hidden rounded-lg mb-2">
                  <img 
                    src="/api/placeholder/300/300" 
                    alt={`Related Artwork ${item}`} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition">Artwork Title {item}</h3>
                <p className="text-sm text-gray-600">Elena Ramirez</p>
                <p className="text-sm font-medium mt-1">$1,800</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
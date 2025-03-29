import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArtworks, setRelatedArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworkDetails = async () => {
      try {
        setLoading(true);
        // Fetch the specific artwork using the id from URL params
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,artist_display,date_display,image_id,medium_display,dimensions,artist_id,style_id,category_ids,artwork_type_id,description`);
        
        if (!response.ok) {
          throw new Error('Artwork not found');
        }
        
        const data = await response.json();
        setArtwork(data.data);
        
        // Fetch related artworks (same artist or style)
        if (data.data.artist_id || data.data.style_id) {
          const query = data.data.artist_id 
            ? `artist_id=${data.data.artist_id}` 
            : `style_id=${data.data.style_id}`;
          
          const relatedResponse = await fetch(`https://api.artic.edu/api/v1/artworks?${query}&limit=3&fields=id,title,artist_display,image_id`);
          const relatedData = await relatedResponse.json();
          
          // Filter out the current artwork
          setRelatedArtworks(relatedData.data.filter(item => item.id !== parseInt(id)));
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (id) {
      fetchArtworkDetails();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!artwork) return;
    
    // Create a cart item from the artwork data
    const cartItem = {
      id: artwork.id,
      name: artwork.title,
      artist: artwork.artist_display,
      price: calculatePrice(artwork), // Helper function to determine price
      image: artwork.image_id 
        ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg` 
        : '/api/placeholder/400/400',
      quantity: 1,
    };
    
    // Get current cart from localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = currentCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      // Increase quantity if item already in cart
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      currentCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    // Notify user
    alert('Added to cart!');
    
    // You could also update a global cart state here if using context/redux
  };
  
  // Helper function to calculate price based on artwork attributes
  const calculatePrice = (artwork) => {
    // This is a placeholder - in a real app, you'd have actual pricing data
    // For now, we'll generate a price based on the artwork's age and medium
    const basePrice = 1000;
    
    // Older artworks tend to be more valuable
    const yearMatch = artwork.date_display ? artwork.date_display.match(/\d{4}/) : null;
    const year = yearMatch ? parseInt(yearMatch[0]) : 2000;
    const ageMultiplier = (2025 - year) / 100;
    
    // Different mediums command different prices
    let mediumMultiplier = 1;
    if (artwork.medium_display) {
      const medium = artwork.medium_display.toLowerCase();
      if (medium.includes('oil')) mediumMultiplier = 1.5;
      if (medium.includes('acrylic')) mediumMultiplier = 1.2;
      if (medium.includes('watercolor')) mediumMultiplier = 1.1;
      if (medium.includes('sculpture')) mediumMultiplier = 2;
    }
    
    return Math.round((basePrice * (1 + ageMultiplier) * mediumMultiplier) / 100) * 100;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl">Loading artwork details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl">Artwork not found</p>
      </div>
    );
  }

  // Format price for display
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(calculatePrice(artwork));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 mt-20">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Artwork Image */}
          <div className="md:w-1/2">
            <img
              src={
                artwork.image_id
                  ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/800,/0/default.jpg`
                  : '/api/placeholder/800/800'
              }
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Artwork Info */}
          <div className="md:w-1/2 p-8">
            <div className="uppercase text-indigo-600 text-xs font-bold tracking-widest mb-2">
              Featured Artwork
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{artwork.title}</h1>
            <p className="text-lg text-gray-600 mb-4">by {artwork.artist_display}</p>
            
            <div className="border-t border-b border-gray-200 py-4 my-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Medium</span>
                <span className="font-medium">{artwork.medium_display || 'Not specified'}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Dimensions</span>
                <span className="font-medium">{artwork.dimensions || 'Not specified'}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Year</span>
                <span className="font-medium">{artwork.date_display || 'Not specified'}</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6">
              <p className="text-2xl font-semibold text-gray-800">{formattedPrice}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600 mr-2">Excluding shipping and taxes</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Available</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              {artwork.description || `"${artwork.title}" is a remarkable piece by ${artwork.artist_display}. This ${artwork.medium_display || 'artwork'} showcases the artist's unique style and perspective.`}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                className="bg-indigo-700 text-white px-6 py-3 rounded-md font-medium tracking-wider hover:bg-indigo-800 transition"
                onClick={handleAddToCart}
              >
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
              alt={artwork.artist_display} 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="font-medium text-gray-900">{artwork.artist_display}</h3>
              <p className="text-gray-600 mt-1">
                {artwork.artist_display} is known for their distinctive style and contributions to the art world.
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
            {relatedArtworks.length > 0 ? (
              relatedArtworks.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg mb-2">
                    <img 
                      src={
                        item.image_id
                          ? `https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg`
                          : '/api/placeholder/300/300'
                      } 
                      alt={item.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.artist_display}</p>
                  <p className="text-sm font-medium mt-1">{new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                  }).format(calculatePrice(item))}</p>
                </div>
              ))
            ) : (
              [1, 2, 3].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-lg mb-2">
                    <img 
                      src="/api/placeholder/300/300" 
                      alt={`Related Artwork ${item}`} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition">Artwork Title {item}</h3>
                  <p className="text-sm text-gray-600">Artist Name</p>
                  <p className="text-sm font-medium mt-1">$1,800</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
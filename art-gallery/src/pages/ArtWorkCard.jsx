import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtworkCard = ({ 
  id, 
  title, 
  artist, 
  year, 
  medium, 
  price, 
  imageUrl, 
  dimensions 
}) => {
  const navigate = useNavigate();
  return (
    <div className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl || "/api/placeholder/400/320"}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/api/placeholder/400/320";
          }}
        />
        
        <div className="absolute top-0 left-0 m-2">
          <span className="whitespace-nowrap rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium">
            {medium?.split(',')[0] || "Mixed Media"}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100" onClick={() => navigate(`/productdetails/${id}`)}>
            View Details
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{title || "Untitled Work"}</h3>
        
        <p className="mt-1 text-sm text-gray-700 line-clamp-1">
          {artist || "Unknown Artist"}{year ? `, ${year}` : ""}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">
            ${price?.toLocaleString() || "Price on request"}
          </p>

          <button className="rounded border border-gray-400 p-2 text-gray-900 hover:bg-gray-100">
            <span className="sr-only">Add to Favorites</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        
        {dimensions && (
          <p className="mt-1 text-xs text-gray-500">
            {dimensions}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtworkCard;
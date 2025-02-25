import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArtworkCard = () => {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate('/productdetails');
  } 
  
  return (
    <div className="block overflow-hidden group rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src="/api/placeholder/400/320"
          alt="Artwork"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-sm">
          New Arrival
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Serenity in Blue</h3>
        
        <p className="mt-1 text-sm text-gray-600">Elena Ramirez</p>
        
        <div className="mt-1 text-sm flex items-center">
          <span className="text-gray-500">Oil on Canvas • 24" × 36"</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-gray-900">$2,400</p>
          
          <button 
          className="rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50"
          onClick={handleClick} >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArtworkCard
import React, { useState, useEffect } from 'react';
import GridMotion from '../components/GridMotion';
import BlurText from "../components/BlurText";
import ExploreButton from "../components/ExploreButton";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay to trigger animations after component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    navigate('/browse');
  };

  // Clean up and organize the items array
  const galleryItems = [
    'Abstract Art',
    <div key='exhibit-1' className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">Featured Exhibit</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Impressionism',
    <div key='artist-spotlight' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">Artist Spotlight</div>,
    'Modern Art',
    <div key='new-arrival' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">New Arrival</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Photography',
    <div key='collection-highlight' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">Collection Highlight</div>,
    'Sculpture',
    <div key='upcoming-event' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">Upcoming Event</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Digital Art',
    <div key='virtual-tour' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">Virtual Tour</div>,
    'Renaissance',
    <div key='member-exclusive' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">Member Exclusive</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Contemporary',
    'Surrealism',
    <div key='limited-exhibit' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">Limited Time Exhibit</div>,
    'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Pop Art',
    <div key='curator-choice' className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">Curator's Choice</div>,
    'Expressionism',
  ];

  return (
    <div className="relative h-screen bg-black flex justify-center items-center overflow-hidden">
      {/* Background with GridMotion */}
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <GridMotion items={galleryItems} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 pointer-events-none"></div>
        </div>
      </div>

      {/* Content overlay */}
      <div 
        className={`flex flex-col items-center justify-center relative z-10 px-4 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <BlurText
          text="Discover Art. Experience Beauty."
          delay={180}
          animateBy="words"
          direction="top"
          className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white font-bold font-comfortaa text-center"
        />
        
        <p className="text-white/90 text-lg md:text-xl max-w-2xl text-center mb-10 font-light">
          Immerse yourself in our curated collection of masterpieces from renowned artists around the world.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <ExploreButton onClick={handleExplore} />
          
          <button 
            className="px-6 py-3 border border-white/40 text-white rounded-full hover:bg-white/10 transition-all duration-300"
            onClick={() => navigate('/about')}
          >
            About Gallery
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
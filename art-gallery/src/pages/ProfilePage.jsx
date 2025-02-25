import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Edit, Settings, Heart, Clock, Image, Calendar, LogOut, Mail, Instagram } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('collections');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Mock user data - in a real app, this would come from an API or context
  const userData = {
    name: "Alexandra Chen",
    username: "alexchen",
    bio: "Art enthusiast and collector. Passionate about modern art, sculptures, and supporting emerging artists.",
    location: "New York, NY",
    memberSince: "May 2021",
    profileImage: "/api/placeholder/150/150",
    website: "www.alexchen.com",
    email: "alex@example.com",
    instagram: "@alex.artlover"
  };
  
  // Mock collection data
  const collections = [
    { id: 1, name: "Abstract Favorites", itemCount: 12, coverImage: "/api/placeholder/300/200" },
    { id: 2, name: "Emerging Artists", itemCount: 8, coverImage: "/api/placeholder/300/200" },
    { id: 3, name: "Exhibition Memories", itemCount: 5, coverImage: "/api/placeholder/300/200" },
  ];
  
  // Mock saved artwork data
  const savedArtworks = [
    { id: 101, title: "Tranquil Horizon", artist: "Maria Santos", image: "/api/placeholder/300/200", year: 2023 },
    { id: 102, title: "Urban Symphony", artist: "James Wilson", image: "/api/placeholder/300/200", year: 2022 },
    { id: 103, title: "Fragments of Time", artist: "Nina Patel", image: "/api/placeholder/300/200", year: 2024 },
    { id: 104, title: "Ethereal Dreams", artist: "Carlos Mendez", image: "/api/placeholder/300/200", year: 2021 },
  ];
  
  // Mock recently viewed data
  const recentlyViewed = [
    { id: 201, title: "Resonant Patterns", artist: "Maya Lin", image: "/api/placeholder/300/200", viewedOn: "Yesterday" },
    { id: 202, title: "Vibrant Solitude", artist: "Thomas Kang", image: "/api/placeholder/300/200", viewedOn: "2 days ago" },
    { id: 203, title: "Structural Harmony", artist: "Eliza Weber", image: "/api/placeholder/300/200", viewedOn: "4 days ago" },
  ];
  
  // Mock upcoming events data
  const upcomingEvents = [
    { id: 301, title: "Modern Art Symposium", date: "March 15, 2025", location: "Main Gallery" },
    { id: 302, title: "New Artist Showcase", date: "April 2, 2025", location: "East Wing" },
    { id: 303, title: "Interactive Installation Opening", date: "April 18, 2025", location: "Digital Gallery" },
  ];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'collections':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map(collection => (
              <div key={collection.id} className="bg-gray-900 rounded-lg overflow-hidden group hover:ring-2 hover:ring-white/20 transition-all">
                <div className="relative h-48">
                  <img src={collection.coverImage} alt={collection.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-4 py-2 bg-white text-black rounded-md font-medium">View Collection</button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white">{collection.name}</h3>
                  <p className="text-white/70 text-sm mt-1">{collection.itemCount} items</p>
                </div>
              </div>
            ))}
            <div className="bg-gray-900/50 border border-white/10 border-dashed rounded-lg flex items-center justify-center h-full min-h-48 hover:bg-gray-900/70 transition-colors cursor-pointer">
              <div className="text-center p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <span className="text-2xl text-white/80">+</span>
                </div>
                <p className="text-white/80">Create New Collection</p>
              </div>
            </div>
          </div>
        );
      
      case 'saved':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedArtworks.map(artwork => (
              <div key={artwork.id} className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-white/20 transition-all">
                <div className="relative h-48">
                  <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
                  <button className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full">
                    <Heart size={18} className="text-white" fill="white" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-white font-medium">{artwork.title}</h3>
                  <p className="text-white/70 text-sm">{artwork.artist}, {artwork.year}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-white mb-4">Recently Viewed</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewed.map(item => (
                <div key={item.id} className="flex bg-gray-900 rounded-lg overflow-hidden hover:ring-1 hover:ring-white/20 transition-all">
                  <div className="w-24 h-24">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="text-white font-medium line-clamp-1">{item.title}</h3>
                    <p className="text-white/70 text-sm">{item.artist}</p>
                    <p className="text-white/50 text-xs mt-1">{item.viewedOn}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-medium text-white mb-4 mt-8">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-gray-900 rounded-lg p-4 hover:ring-1 hover:ring-white/20 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">{event.title}</h3>
                      <p className="text-white/70 text-sm mt-1">{event.location}</p>
                    </div>
                    <div className="bg-black/40 px-3 py-1.5 rounded-md text-sm text-white/90">
                      {event.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-6">Account Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm">Display Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                  defaultValue={userData.name}
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2 text-sm">Bio</label>
                <textarea 
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white h-24"
                  defaultValue={userData.bio}
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                    defaultValue={userData.email}
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Location</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                    defaultValue={userData.location}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Website</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                    defaultValue={userData.website}
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Instagram</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-black border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 text-white"
                    defaultValue={userData.instagram}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button className="px-4 py-2 border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-white/90 transition-colors font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div></div>;
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header with background image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4">
          {/* Positioned at bottom of header */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 md:left-4 md:translate-x-0">
            <div className="relative">
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="w-32 h-32 rounded-full border-4 border-black object-cover"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors">
                <Edit size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="container mx-auto px-4 pt-20 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-white/60">@{userData.username}</p>
            <p className="text-white/80 mt-2 max-w-lg">{userData.bio}</p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
              <div className="flex items-center text-white/60 text-sm">
                <Calendar size={16} className="mr-1.5" />
                Member since {userData.memberSince}
              </div>
              {userData.email && (
                <div className="flex items-center text-white/60 text-sm">
                  <Mail size={16} className="mr-1.5" />
                  {userData.email}
                </div>
              )}
              {userData.instagram && (
                <div className="flex items-center text-white/60 text-sm">
                  <Instagram size={16} className="mr-1.5" />
                  {userData.instagram}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="px-4 py-2 border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors flex items-center">
              <Settings size={18} className="mr-1.5" />
              Edit Profile
            </button>
            <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-md hover:bg-red-900/20 transition-colors flex items-center">
              <LogOut size={18} className="mr-1.5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('collections')}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === 'collections' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <Image size={18} className="mr-1.5" />
              Collections
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === 'saved' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <Heart size={18} className="mr-1.5" />
              Saved Artwork
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === 'history' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <Clock size={18} className="mr-1.5" />
              Activity
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap ${
                activeTab === 'settings' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              <Settings size={18} className="mr-1.5" />
              Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
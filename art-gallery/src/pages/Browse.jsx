import React, { useState, useEffect } from 'react';
import ArtworkCard from './ArtWorkCard';

const BrowseArtGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    medium: [],
    priceMin: '',
    priceMax: '',
    artists: []
  });
  const [sortBy, setSortBy] = useState('');
  
  // Fetch artworks from the Art Institute of Chicago API (a free public API)
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        // Using Art Institute of Chicago API which is free and doesn't require authentication
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}&limit=9&fields=id,title,artist_display,date_display,image_id,medium_display,dimensions`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch artworks');
        }
        
        const data = await response.json();
        
        const formattedArtworks = data.data.map(artwork => ({
          id: artwork.id,
          title: artwork.title,
          artist: artwork.artist_display,
          year: artwork.date_display,
          medium: artwork.medium_display,
          dimensions: artwork.dimensions,
          // Generate a random price for demo purposes
          price: Math.floor(Math.random() * 12000) + 500,
          // Construct image URL from the Art Institute of Chicago image API
          imageUrl: artwork.image_id 
            ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg` 
            : '/api/placeholder/400/320'
        }));
        
        if (page === 1) {
          setArtworks(formattedArtworks);
        } else {
          setArtworks(prev => [...prev, ...formattedArtworks]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching artwork data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtworks();
  }, [page]);
  
  // Extract unique artists for the filter dropdown
  const uniqueArtists = [...new Set(artworks.map(artwork => artwork.artist))]
    .filter(artist => artist) // Remove empty artists
    .slice(0, 10); // Limit to 10 for simplicity
  
  // Extract unique mediums for the filter dropdown
  const mediumCounts = artworks.reduce((acc, artwork) => {
    if (artwork.medium) {
      const medium = artwork.medium.split(',')[0].trim(); // Get the primary medium
      acc[medium] = (acc[medium] || 0) + 1;
    }
    return acc;
  }, {});
  
  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'medium' || filterType === 'artists') {
        // Toggle selection for checkboxes
        const updated = prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value];
        return { ...prev, [filterType]: updated };
      }
      // For price inputs
      return { ...prev, [filterType]: value };
    });
  };
  
  // Reset filters
  const resetFilters = (filterType) => {
    setFilters(prev => ({ ...prev, [filterType]: filterType === 'medium' || filterType === 'artists' ? [] : '' }));
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Apply filters and sorting to artworks
  const filteredAndSortedArtworks = artworks
    .filter(artwork => {
      // Filter by medium
      if (filters.medium.length > 0) {
        const artworkMedium = artwork.medium?.split(',')[0].trim();
        if (!artworkMedium || !filters.medium.includes(artworkMedium)) {
          return false;
        }
      }
      
      // Filter by price
      if (filters.priceMin && artwork.price < parseInt(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && artwork.price > parseInt(filters.priceMax)) {
        return false;
      }
      
      // Filter by artist
      if (filters.artists.length > 0 && !filters.artists.includes(artwork.artist)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'Artist, A-Z':
          return (a.artist || '').localeCompare(b.artist || '');
        case 'Artist, Z-A':
          return (b.artist || '').localeCompare(a.artist || '');
        case 'Price, High-Low':
          return b.price - a.price;
        case 'Price, Low-High':
          return a.price - b.price;
        case 'Newest':
          return (b.year || '').localeCompare(a.year || '');
        default:
          return 0;
      }
    });
  
  // Load more artworks
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };
  
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Gallery Collection</h2>

            <p className="mt-4 max-w-md text-gray-500">
              Explore our curated selection of contemporary and classical artworks from renowned artists 
              and emerging talents from around the world.
            </p>
          </header>

          <div className="mt-8 sm:flex sm:items-center sm:justify-between">
            <div className="block sm:hidden">
              <button
                className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
              >
                <span className="text-sm font-medium"> Filters & Sorting </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4 rtl:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            <div className="hidden sm:flex sm:gap-4">
              <div className="relative">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                  >
                    <span className="text-sm font-medium"> Medium </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div
                    className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0"
                  >
                    <div className="w-96 rounded-sm border border-gray-200 bg-white">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700"> {filters.medium.length} Selected </span>

                        <button 
                          type="button" 
                          className="text-sm text-gray-900 underline underline-offset-4"
                          onClick={() => resetFilters('medium')}
                        >
                          Reset
                        </button>
                      </header>

                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        {Object.entries(mediumCounts).slice(0, 4).map(([medium, count], index) => (
                          <li key={index}>
                            <label htmlFor={`FilterMedium${index}`} className="inline-flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`FilterMedium${index}`}
                                className="size-5 rounded-sm border-gray-300"
                                checked={filters.medium.includes(medium)}
                                onChange={() => handleFilterChange('medium', medium)}
                              />

                              <span className="text-sm font-medium text-gray-700"> {medium} ({count}) </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </details>
              </div>

              <div className="relative">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                  >
                    <span className="text-sm font-medium"> Price </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div
                    className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0"
                  >
                    <div className="w-96 rounded-sm border border-gray-200 bg-white">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700"> The highest price is $12,000 </span>

                        <button 
                          type="button" 
                          className="text-sm text-gray-900 underline underline-offset-4"
                          onClick={() => {
                            resetFilters('priceMin');
                            resetFilters('priceMax');
                          }}
                        >
                          Reset
                        </button>
                      </header>

                      <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between gap-4">
                          <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">$</span>

                            <input
                              type="number"
                              id="FilterPriceFrom"
                              placeholder="From"
                              className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                              value={filters.priceMin}
                              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                            />
                          </label>

                          <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">$</span>

                            <input
                              type="number"
                              id="FilterPriceTo"
                              placeholder="To"
                              className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                              value={filters.priceMax}
                              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              <div className="relative">
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary
                    className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                  >
                    <span className="text-sm font-medium"> Artist </span>

                    <span className="transition group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </summary>

                  <div
                    className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0"
                  >
                    <div className="w-96 rounded-sm border border-gray-200 bg-white">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-700"> {filters.artists.length} Selected </span>

                        <button 
                          type="button" 
                          className="text-sm text-gray-900 underline underline-offset-4"
                          onClick={() => resetFilters('artists')}
                        >
                          Reset
                        </button>
                      </header>

                      <div className="border-t border-gray-200 p-4">
                        <div className="space-y-2">
                          <div className="relative">
                            <label className="sr-only" htmlFor="search"> Search </label>

                            <input
                              className="h-10 w-full rounded-md border-gray-200 pe-10 text-sm placeholder-gray-300 focus:z-10"
                              placeholder="Search artist..."
                              type="text"
                              id="search"
                            />

                            <button
                              type="button"
                              className="absolute end-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700"
                            >
                              <span className="sr-only">Search</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="max-h-48 overflow-y-auto">
                            <ul className="space-y-1">
                              {uniqueArtists.map((artist, index) => (
                                <li key={index}>
                                  <label htmlFor={`FilterArtist${index}`} className="inline-flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id={`FilterArtist${index}`}
                                      className="size-5 rounded-sm border-gray-300"
                                      checked={filters.artists.includes(artist)}
                                      onChange={() => handleFilterChange('artists', artist)}
                                    />
                                    <span className="text-sm font-medium text-gray-700">{artist}</span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <div className="hidden sm:block">
              <label htmlFor="SortBy" className="sr-only">Sort By</label>

              <select 
                id="SortBy" 
                className="h-10 rounded-sm border-gray-300 text-sm"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Sort By</option>
                <option value="Artist, A-Z">Artist, A-Z</option>
                <option value="Artist, Z-A">Artist, Z-A</option>
                <option value="Price, High-Low">Price, High-Low</option>
                <option value="Price, Low-High">Price, Low-High</option>
                <option value="Newest">Newest</option>
              </select>
            </div>
          </div>

          {loading && page === 1 ? (
            <div className="mt-8 flex justify-center">
              <p>Loading artworks...</p>
            </div>
          ) : error ? (
            <div className="mt-8 flex justify-center">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : (
            <>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAndSortedArtworks.map((artwork) => (
                  <li key={artwork.id}>
                    <ArtworkCard 
                      id={artwork.id}
                      title={artwork.title}
                      artist={artwork.artist}
                      year={artwork.year}
                      medium={artwork.medium}
                      price={artwork.price}
                      imageUrl={artwork.imageUrl}
                      dimensions={artwork.dimensions}
                    />
                  </li>
                ))}
              </ul>

              {filteredAndSortedArtworks.length === 0 && (
                <div className="mt-8 flex justify-center">
                  <p>No artworks match your current filters.</p>
                </div>
              )}
            </>
          )}

          <div className="mt-8 flex justify-center">
            <button 
              className="flex items-center gap-2 rounded-md bg-white px-5 py-3 text-gray-700 border border-gray-300 hover:bg-gray-50"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading && page > 1 ? (
                <span className="text-sm font-medium">Loading...</span>
              ) : (
                <>
                  <span className="text-sm font-medium"> Load More Artworks </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                      transform="rotate(180 12 12)"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrowseArtGallery;
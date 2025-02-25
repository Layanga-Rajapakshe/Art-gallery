import React from 'react'
import ArtworkCard from './ArtWorkCard'

const BrowseArtGallery = () => {
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
                        <span className="text-sm text-gray-700"> 0 Selected </span>

                        <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                          Reset
                        </button>
                      </header>

                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <label htmlFor="FilterPainting" className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="FilterPainting"
                              className="size-5 rounded-sm border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700"> Paintings (45+) </span>
                          </label>
                        </li>

                        <li>
                          <label htmlFor="FilterSculpture" className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="FilterSculpture"
                              className="size-5 rounded-sm border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700"> Sculptures (23+) </span>
                          </label>
                        </li>

                        <li>
                          <label htmlFor="FilterPhotography" className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="FilterPhotography"
                              className="size-5 rounded-sm border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700"> Photography (32+) </span>
                          </label>
                        </li>

                        <li>
                          <label htmlFor="FilterDigital" className="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="FilterDigital"
                              className="size-5 rounded-sm border-gray-300"
                            />

                            <span className="text-sm font-medium text-gray-700"> Digital Art (18+) </span>
                          </label>
                        </li>
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

                        <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
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
                            />
                          </label>

                          <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">$</span>

                            <input
                              type="number"
                              id="FilterPriceTo"
                              placeholder="To"
                              className="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
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
                        <span className="text-sm text-gray-700"> 0 Selected </span>

                        <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
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
                              <li>
                                <label htmlFor="FilterArtist1" className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="FilterArtist1"
                                    className="size-5 rounded-sm border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">Elena Ramirez</span>
                                </label>
                              </li>
                              <li>
                                <label htmlFor="FilterArtist2" className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="FilterArtist2"
                                    className="size-5 rounded-sm border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">James Chen</span>
                                </label>
                              </li>
                              <li>
                                <label htmlFor="FilterArtist3" className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="FilterArtist3"
                                    className="size-5 rounded-sm border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">Sophia Nguyen</span>
                                </label>
                              </li>
                              <li>
                                <label htmlFor="FilterArtist4" className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="FilterArtist4"
                                    className="size-5 rounded-sm border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">Marcus Williams</span>
                                </label>
                              </li>
                              <li>
                                <label htmlFor="FilterArtist5" className="inline-flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="FilterArtist5"
                                    className="size-5 rounded-sm border-gray-300"
                                  />
                                  <span className="text-sm font-medium text-gray-700">Aisha Patel</span>
                                </label>
                              </li>
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

              <select id="SortBy" className="h-10 rounded-sm border-gray-300 text-sm">
                <option>Sort By</option>
                <option value="Artist, A-Z">Artist, A-Z</option>
                <option value="Artist, Z-A">Artist, Z-A</option>
                <option value="Price, High-Low">Price, High-Low</option>
                <option value="Price, Low-High">Price, Low-High</option>
                <option value="Newest">Newest</option>
                <option value="Most Popular">Most Popular</option>
              </select>
            </div>
          </div>

          <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <li key={index}>
                <ArtworkCard />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-2 rounded-md bg-white px-5 py-3 text-gray-700 border border-gray-300 hover:bg-gray-50">
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
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BrowseArtGallery
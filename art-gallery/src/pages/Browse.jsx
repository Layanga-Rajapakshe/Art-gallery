import React from 'react'
import ProductCard from './ProductCard'

const Browse = () => {
  return (
    <div>

<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-12">
    <header>
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

      <p className="mt-4 max-w-md text-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
        dicta incidunt est ipsam, officia dolor fugit natus?
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
              <span className="text-sm font-medium"> Availability </span>

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
                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterInStock"
                        className="size-5 rounded-sm border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterPreOrder"
                        className="size-5 rounded-sm border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                    </label>
                  </li>

                  <li>
                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="FilterOutOfStock"
                        className="size-5 rounded-sm border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
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
                  <span className="text-sm text-gray-700"> The highest price is $600 </span>

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
      </div>

      <div className="hidden sm:block">
        <label htmlFor="SortBy" className="sr-only">SortBy</label>

        <select id="SortBy" className="h-10 rounded-sm border-gray-300 text-sm">
          <option>Sort By</option>
          <option value="Title, DESC">Title, DESC</option>
          <option value="Title, ASC">Title, ASC</option>
          <option value="Price, DESC">Price, DESC</option>
          <option value="Price, ASC">Price, ASC</option>
        </select>
      </div>
    </div>

    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <li key={index}>
          <ProductCard />
        </li>
      ))}
    </ul>
  </div>
</section>
    </div>
  )
}

export default Browse

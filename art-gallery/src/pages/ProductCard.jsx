import React from 'react'

const ProductCard = () => {
  return (
    <div>
      <a href="/productdetails" className="relative block rounded-tr-3xl border border-gray-100 py-5 px-5">
  <span
    className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white"
  >
    Save 10%
  </span>

  <img
    src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt=""
    className="-ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
  />

  <div className="p-4 text-center">
    <strong className="text-xl font-medium text-gray-900"> Aloe Vera </strong>

    <p className="mt-2 text-pretty text-gray-700">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet officia rem vel voluptatum in
      eum vitae aliquid at sed dignissimos.
    </p>

    <span
      className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
    >
      Learn More
    </span>
  </div>
</a>
    </div>
  )
}

export default ProductCard

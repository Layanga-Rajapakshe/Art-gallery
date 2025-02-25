import React, { useState } from 'react';
import { X, ShoppingBag, X as XIcon } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Basic Tee 6-Pack',
      size: 'XXS',
      color: 'White',
      price: 192.00,
      quantity: 1,
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Basic Tee 6-Pack',
      size: 'XXS',
      color: 'White',
      price: 192.00,
      quantity: 1,
      image: '/api/placeholder/100/100'
    }
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(cartItems.map(item => 
        item.id === id ? {...item, quantity: newQuantity} : item
      ));
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-500 bg-opacity-75 z-50">
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
        {/* Cart header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
            <span className="sr-only">Close cart</span>
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingBag className="mx-auto w-12 h-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-1 text-sm text-gray-500">Start adding items to your cart.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        <span className="block">Size: {item.size}</span>
                        <span className="block">Color: {item.color}</span>
                      </p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <div className="flex items-center">
                        <button 
                          className="px-2 py-1 border rounded-l"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 border rounded-r"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button 
                        type="button" 
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => removeItem(item.id)}
                      >
                        <XIcon className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart footer */}
        <div className="border-t border-gray-200 p-4 space-y-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700"
            >
              Checkout (${subtotal.toFixed(2)})
            </button>
            <button
              type="button"
              className="w-full bg-white border border-gray-300 rounded-md py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
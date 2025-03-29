import React, { useState, useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import { removeCartItem, updateCartItemQuantity } from "../utils/cartUtils";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState({
    items: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    paymentMethod: "Not selected"
  });

  // Function to get cart items from local storage
  const getCartItemsFromStorage = () => {
    try {
      const cartItems = localStorage.getItem('cart');
      return cartItems ? JSON.parse(cartItems) : [];
    } catch (error) {
      console.error("Error retrieving cart from localStorage:", error);
      return [];
    }
  };

  // Function to calculate cart summary
  const calculateCartSummary = (items) => {
    const itemsPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
    const taxRate = 0.07; // 7% tax
    const taxPrice = itemsPrice * taxRate;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentMethod: localStorage.getItem('paymentMethod') || "Not selected"
    };
  };

  useEffect(() => {
    // Load cart data on component mount
    const items = getCartItemsFromStorage();
    const summary = calculateCartSummary(items);
    setCartData({
      items,
      ...summary
    });
  }, []);

  // Handler for updating cart item quantity
  const handleUpdateQuantity = (id, quantity) => {
    updateCartItemQuantity(id, quantity);
    // Refresh cart data after update
    const updatedItems = getCartItemsFromStorage();
    setCartData({
      items: updatedItems,
      ...calculateCartSummary(updatedItems)
    });
  };

  // Handler for removing cart item
  const handleRemoveItem = (id) => {
    removeCartItem(id);
    // Refresh cart data after removal
    const updatedItems = getCartItemsFromStorage();
    setCartData({
      items: updatedItems,
      ...calculateCartSummary(updatedItems)
    });
  };

  const { items: cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice, paymentMethod } = cartData;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          {!cartItems || cartItems.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow p-6">
              <ShoppingBag className="mx-auto w-12 h-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-1 text-sm text-gray-500">Start adding items to your cart.</p>
              <Link to="/products" className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-6 px-4 flex">
                    <div className="flex-shrink-0 w-24 h-24 border rounded-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder-image.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        <span>Artist: {item.artist || "Unknown"}</span>
                      </p>
                      <div className="flex items-center justify-between mt-2 text-sm">
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1 border rounded-l"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            className="px-2 py-1 border rounded-r"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${Number(itemsPrice).toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Shipping</p>
                <p>${Number(shippingPrice).toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Tax</p>
                <p>${Number(taxPrice).toFixed(2)}</p>
              </div>
              <div className="border-t pt-2 mt-2"></div>
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <p>Total</p>
                <p>${Number(totalPrice).toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-500">Payment Method: {paymentMethod}</p>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!cartItems || cartItems.length === 0}
                  onClick={() => {
                    window.location.href = "/checkout";
                  }}
                >
                  {cartItems && cartItems.length > 0 
                    ? `Checkout ($${Number(totalPrice).toFixed(2)})` 
                    : "Checkout"}
                </button>
                <Link
                  to="/browse"
                  className="w-full block text-center bg-gray-100 py-3 rounded-md hover:bg-gray-200 mt-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
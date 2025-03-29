import React from "react";
import { X, ShoppingBag } from "lucide-react";

const Cart = ({ closeCart }) => {
  const dispatch = useDispatch();
  const {
    items: cartItems,
    itemsPrice = 0,
    shippingPrice = 0,
    taxPrice = 0,
    totalPrice = 0,
    paymentMethod = "Not selected",
  } = useSelector((state) => state.cart);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-500 bg-opacity-75 z-50 ">
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
          <button className="p-2 text-gray-400 hover:text-gray-500" onClick={closeCart}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {!cartItems ? (
            <div className="text-center py-10">
              <ShoppingBag className="mx-auto w-12 h-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-1 text-sm text-gray-500">Start adding items to your cart.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 border rounded-md overflow-hidden">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
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
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded-r"
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Footer */}
        <div className="border-t p-4 space-y-2">
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
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <p>Total</p>
            <p>${Number(totalPrice).toFixed(2)}</p>
          </div>
          <p className="text-sm text-gray-500">Payment Method: {paymentMethod}</p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
            >
              Checkout (${Number(totalPrice).toFixed(2)})
            </button>
            <button
              type="button"
              className="w-full bg-gray-100 py-3 rounded-md hover:bg-gray-200"
              onClick={closeCart}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState({
    items: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    paymentMethod: "PayPal"
  });
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: ""
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // PayPal client ID - replace with your sandbox ID for testing
  const paypalClientId = "YOUR_PAYPAL_SANDBOX_CLIENT_ID";

  useEffect(() => {
    // Load cart data from localStorage
    try {
      const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      if (cartItems.length === 0) {
        navigate('/cart');
        return;
      }

      // Calculate cart summary
      const itemsPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
      const taxRate = 0.07; // 7% tax
      const taxPrice = itemsPrice * taxRate;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;

      setCartData({
        items: cartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod: "PayPal"
      });

      // Load customer data if available
      const savedCustomer = localStorage.getItem('customerInfo') ? 
        JSON.parse(localStorage.getItem('customerInfo')) : null;
      
      if (savedCustomer) {
        setCustomer(savedCustomer);
      }
    } catch (error) {
      console.error("Error loading checkout data:", error);
      setError("Failed to load checkout information. Please try again.");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveCustomerInfo = () => {
    localStorage.setItem('customerInfo', JSON.stringify(customer));
    localStorage.setItem('paymentMethod', cartData.paymentMethod);
  };

  const validateForm = () => {
    const { name, email, address, city, postalCode, country } = customer;
    if (!name || !email || !address || !city || !postalCode || !country) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!email.includes('@')) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      saveCustomerInfo();
      // The actual payment will be handled by PayPal buttons
      // This just prepares the form for payment
      document.getElementById("paypal-button-container").scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  // PayPal handlers
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: "Purchase from Art Store",
          amount: {
            currency_code: "USD",
            value: cartData.totalPrice.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cartData.itemsPrice.toFixed(2)
              },
              shipping: {
                currency_code: "USD",
                value: cartData.shippingPrice.toFixed(2)
              },
              tax_total: {
                currency_code: "USD",
                value: cartData.taxPrice.toFixed(2)
              }
            }
          },
          items: cartData.items.map(item => ({
            name: item.name,
            unit_amount: {
              currency_code: "USD",
              value: item.price.toFixed(2)
            },
            quantity: item.quantity,
            description: `Artist: ${item.artist || "Unknown"}`
          }))
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    setIsProcessing(true);
    return actions.order.capture().then(function(details) {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Save order details
      const orderInfo = {
        id: details.id,
        status: details.status,
        customer: customer,
        items: cartData.items,
        payment: {
          method: "PayPal",
          email: details.payer.email_address,
          id: details.id
        },
        subtotal: cartData.itemsPrice,
        shipping: cartData.shippingPrice,
        tax: cartData.taxPrice,
        total: cartData.totalPrice,
        date: new Date().toISOString()
      };
      
      // Save order to localStorage for demo purposes
      // In a real app, you would send this to your backend
      const orders = localStorage.getItem('orders') ? 
        JSON.parse(localStorage.getItem('orders')) : [];
      orders.push(orderInfo);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      // Clear cart
      localStorage.removeItem('cart');
      
      // Navigate to confirmation after a short delay
      setTimeout(() => {
        navigate('/order-confirmation', { state: { order: orderInfo } });
      }, 2000);
    });
  };

  const onError = (err) => {
    setIsProcessing(false);
    setError("Payment failed. Please try again or use a different payment method.");
    console.error("PayPal Error:", err);
  };

  // If payment was successful, show a success message
  if (paymentSuccess) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-2xl text-center">
        <div className="bg-green-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Payment Successful!</h2>
          <p className="mb-4">Your order has been placed successfully. Redirecting to order confirmation...</p>
          <div className="animate-spin h-10 w-10 border-4 border-green-500 rounded-full border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Customer Information Form */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
            
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customer.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customer.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={customer.postalCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country *</label>
                  <select
                    id="country"
                    name="country"
                    value={customer.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                    <option value="JP">Japan</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            {/* Cart items summary */}
            <div className="max-h-60 overflow-y-auto mb-4">
              <ul className="divide-y divide-gray-200">
                {cartData.items.map((item) => (
                  <li key={item.id} className="py-2 flex">
                    <div className="flex-shrink-0 w-12 h-12 border rounded-md overflow-hidden">
                      <img
                        src={item.image || "/placeholder-image.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-2 flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Price breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${cartData.itemsPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Shipping</p>
                <p>${cartData.shippingPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-700">
                <p>Tax</p>
                <p>${cartData.taxPrice.toFixed(2)}</p>
              </div>
              <div className="border-t pt-2 mt-2"></div>
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <p>Total</p>
                <p>${cartData.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            
            {/* PayPal payment section */}
            <div className="mt-6" id="paypal-button-container">
              <h3 className="text-md font-medium text-gray-900 mb-2">Payment Method</h3>
              <div className="p-4 border rounded-md bg-gray-50">
                <PayPalScriptProvider options={{ "client-id": paypalClientId, currency: "USD" }}>
                  {isProcessing ? (
                    <div className="text-center py-4">
                      <div className="animate-spin h-6 w-6 border-2 border-indigo-500 rounded-full border-t-transparent mx-auto"></div>
                      <p className="mt-2 text-sm text-gray-600">Processing payment...</p>
                    </div>
                  ) : (
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      disabled={!customer.name || !customer.email || !customer.address || !customer.city || !customer.postalCode || !customer.country}
                    />
                  )}
                </PayPalScriptProvider>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Safe and secure payments with PayPal. You don't need a PayPal account to pay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
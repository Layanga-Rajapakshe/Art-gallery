import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51R8EtS2LxKFFC71VuHJR3yG7IeRkjXMrHNZGMnj7fV2qORnzBEbPAjCmgLwTiPAvUpmS91YllFcZckTab1zhHvea005ZdF4LXg");

// Payment Form Component using Stripe
const PaymentForm = ({ customer, cartData, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsProcessing(true);
    setCardError("");

    // In a real implementation, you would create a payment intent on your server
    // and pass the client secret to the frontend. For demo purposes, we'll simulate success.
    try {
      // Normally you would make an API call to your server like this:
      // const response = await fetch('/api/create-payment-intent', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount: cartData.totalPrice * 100, currency: 'usd' })
      // });
      // const { clientSecret } = await response.json();
      
      // Instead, we'll simulate payment success for demo purposes
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: customer.name,
          email: customer.email,
          address: {
            line1: customer.address,
            city: customer.city,
            postal_code: customer.postalCode,
            country: customer.country
          }
        }
      });

      if (error) {
        setCardError(error.message);
        setIsProcessing(false);
        onPaymentError(error.message);
        return;
      }

      // For a real implementation, you would confirm the payment
      // const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: paymentMethod.id
      // });
      
      // if (confirmError) {
      //   setCardError(confirmError.message);
      //   setIsProcessing(false);
      //   onPaymentError(confirmError.message);
      //   return;
      // }

      // Payment successful
      setIsProcessing(false);
      onPaymentSuccess({
        id: paymentMethod.id,
        last4: paymentMethod.card.last4,
        brand: paymentMethod.card.brand
      });
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      onPaymentError("An unexpected error occurred. Please try again.");
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-3 border rounded-md">
          <CardElement options={cardStyle} />
        </div>
        {cardError && (
          <p className="mt-1 text-sm text-red-600">{cardError}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          `Pay $${cartData.totalPrice.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState({
    items: [],
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    paymentMethod: "Stripe"
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
  const [shippingCompleted, setShippingCompleted] = useState(false);

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
        paymentMethod: "Stripe"
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
      setShippingCompleted(true);
      // Scroll to payment section
      document.getElementById("payment-section").scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  const handlePaymentSuccess = (paymentDetails) => {
    setIsProcessing(true);
    setPaymentSuccess(true);
    
    // Save order details
    const orderInfo = {
      id: `order-${Date.now()}`, // Generate a unique ID
      status: "Pending",
      customer: customer,
      items: cartData.items,
      payment: {
        method: "Stripe",
        id: paymentDetails.id,
        card: {
          last4: paymentDetails.last4,
          brand: paymentDetails.brand
        }
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
  };

  const handlePaymentError = (errorMessage) => {
    setIsProcessing(false);
    setError(errorMessage || "Payment failed. Please try again or use a different card.");
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
          
          {/* Stripe Payment Section */}
          {shippingCompleted && (
            <div className="bg-white rounded-lg shadow p-6 mt-6" id="payment-section">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  customer={customer}
                  cartData={cartData}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              </Elements>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Safe and secure payments with Stripe. Your card information is encrypted and never stored on our servers.
              </p>
            </div>
          )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
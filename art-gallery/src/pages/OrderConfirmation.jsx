import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { CheckCircle, AlertTriangle } from "lucide-react";
import axios from "axios";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ 
    loading: false, 
    error: null, 
    success: false,
    authError: false
  });

  useEffect(() => {
    // Get order from location state or fetch the latest order from localStorage
    let currentOrder = null;
    
    if (location.state && location.state.order) {
      currentOrder = location.state.order;
    } else {
      // Fallback to latest order in localStorage if navigated directly to this page
      const orders = localStorage.getItem('orders') ? 
        JSON.parse(localStorage.getItem('orders')) : [];
      
      if (orders.length > 0) {
        currentOrder = orders[orders.length - 1];
      }
    }
    
    setOrder(currentOrder);
    
    // If we have an order, save it to the API
    if (currentOrder && !currentOrder.savedToAPI) {
      saveOrderToAPI(currentOrder);
    }
  }, [location.state]);

  // Function to save order to API
  const saveOrderToAPI = async (orderData) => {
    setSaveStatus({ loading: true, error: null, success: false, authError: false });
    
    try {
      // Get the authentication token
      const token = localStorage.getItem('accessToken');

      // Get CSRF token from cookie if it exists
      const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
      
      // If no token is found, handle the auth error
      if (!token) {
        setSaveStatus({ 
          loading: false, 
          error: "You need to be logged in to save your order", 
          success: false,
          authError: true
        });
        return;
      }

      // Format the order data according to the API's expected structure
      const formattedOrder = {
        status: orderData.status,
        items: orderData.items.map(item => ({
          artwork_id: item.id,
          artwork_title: item.name,
          artwork_image: item.image || "",
          artwork_description: item.description || "test description",
          artwork_price: item.price,
          quantity: item.quantity,
          total_price: item.price * item.quantity
        }))
      };
      
      // Make the API request
      const response = await axios.post(
        'http://54.162.24.220/artwork/orders/',
        formattedOrder,
        {
          headers: {
            'Content-Type': 'application/json',
            // Include authorization header if token exists
          ...(token && { 'Authorization': `Bearer ${token}` }),
          // Include CSRF token if available
          ...(csrfToken && { 'X-CSRFToken': csrfToken }),
          },
          withCredentials: true // Include cookies if using session-based auth
        }
      );
      
      // Update local storage to mark this order as saved
      const orders = localStorage.getItem('orders') ? 
        JSON.parse(localStorage.getItem('orders')) : [];
      
      const updatedOrders = orders.map(ord => {
        if (ord.id === orderData.id) {
          return { ...ord, savedToAPI: true, apiOrderId: response.data.id };
        }
        return ord;
      });
      
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      // Update the current order state
      setOrder(prev => ({ ...prev, savedToAPI: true, apiOrderId: response.data.id }));
      setSaveStatus({ loading: false, error: null, success: true, authError: false });
    } catch (error) {
      console.error("Failed to save order to API:", error);
      
      // Handle specific error types
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setSaveStatus({ 
          loading: false, 
          error: "Your session has expired. Please log in again.", 
          success: false,
          authError: true
        });
      } else {
        setSaveStatus({ 
          loading: false, 
          error: error.response?.data?.message || "Failed to save order to server", 
          success: false,
          authError: false
        });
      }
    }
  };

  // Get JWT token with appropriate error handling
  const getAuthToken = () => {
    // First check localStorage
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return accessToken;
    }
    
    // Fallback to checking cookies
    const tokenCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='));
      
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
    
    console.warn("No authentication token found in cookies or localStorage");
    return null;
  };

  const handleLoginRedirect = () => {
    // Save current page to return after login
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    navigate('/login');
  };

  const handleRetry = () => {
    if (order) {
      saveOrderToAPI(order);
    }
  };

  // Order not found state
  if (!order) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">No Order Information Found</h1>
        <p className="mb-6">We couldn't find any information about your order.</p>
        <Link to="/browse" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate the total items in the order
  const totalItems = order.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      {/* Auth Error Alert */}
      {saveStatus.authError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-4 flex items-start">
          <AlertTriangle className="w-5 h-5 mr-2 mt-0.5" />
          <div>
            <p className="font-medium">Authentication Error</p>
            <p className="mt-1">{saveStatus.error}</p>
            <div className="mt-3">
              <button 
                onClick={handleLoginRedirect}
                className="bg-yellow-800 text-white px-4 py-2 rounded mr-2 text-sm"
              >
                Log In
              </button>
              <button 
                onClick={handleRetry}
                className="bg-white text-yellow-800 border border-yellow-800 px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* General Error Alert */}
      {saveStatus.error && !saveStatus.authError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-start">
          <AlertTriangle className="w-5 h-5 mr-2 mt-0.5" />
          <div>
            <p className="font-medium">Error Saving Order</p>
            <p className="mt-1">{saveStatus.error}</p>
            <button 
              onClick={handleRetry}
              className="mt-2 text-red-700 underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}
      
      {/* Success Alert */}
      {saveStatus.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-start">
          <CheckCircle className="w-5 h-5 mr-2 mt-0.5" />
          <p>Your order has been successfully recorded in our system.</p>
        </div>
      )}

      {/* Loading Indicator */}
      {saveStatus.loading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <p>Processing your order...</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been confirmed.
            {!saveStatus.success && !saveStatus.loading && (
              <span className="block mt-2 text-sm text-yellow-600">
                (We're still processing your order in our system)
              </span>
            )}
          </p>
        </div>

        <div className="border-t border-b py-4 my-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Order Number:</span>
            <span className="text-gray-700">{order.apiOrderId || order.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Date:</span>
            <span className="text-gray-700">{formatDate(order.date)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Payment Method:</span>
            <span className="text-gray-700">{order.payment.method}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className="text-green-600 font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
          </div>
        </div>

        <h2 className="text-lg font-medium mb-4">Order Details ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>
        <div className="mb-6">
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <li key={index} className="py-3 flex items-start">
                {item.image && (
                  <div className="w-16 h-16 flex-shrink-0 mr-4 rounded overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                  <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <p className="font-medium ml-4">${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>${order.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Name:</span> {order.customer.name}</p>
          <p><span className="font-medium">Email:</span> {order.customer.email}</p>
          <p><span className="font-medium">Address:</span> {order.customer.address}</p>
          <p><span className="font-medium">City:</span> {order.customer.city}</p>
          <p><span className="font-medium">Postal Code:</span> {order.customer.postalCode}</p>
          <p><span className="font-medium">Country:</span> {order.customer.country}</p>
        </div>
      </div>

      <div className="text-center space-x-4">
        <Link to="/browse" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 inline-block">
          Continue Shopping
        </Link>
        <Link to="/orders" className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 inline-block">
          View All Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
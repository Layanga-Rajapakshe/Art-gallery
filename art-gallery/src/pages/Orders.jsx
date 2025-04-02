import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, CheckCircle, TruckIcon, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get the authentication token
      const token = getAuthToken();
      
      if (!token) {
        setError("You need to be logged in to view your orders");
        setLoading(false);
        return;
      }

      // Get CSRF token from cookie if it exists
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
      
      const response = await axios.get(
        'http://54.162.24.220/artwork/orders/',
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(csrfToken && { 'X-CSRFToken': csrfToken }),
          },
          withCredentials: true
        }
      );
      
      // Process orders to add calculated totals
      const processedOrders = response.data.map(order => {
        const calculatedTotals = calculateOrderTotals(order.items);
        return {
          ...order,
          calculatedSubtotal: calculatedTotals.subtotal,
          calculatedTotal: calculatedTotals.total
        };
      });
      
      setOrders(processedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError(error.response?.data?.message || "Failed to load orders from server");
      }
      
      setLoading(false);
    }
  };

  // Calculate order totals from items
  const calculateOrderTotals = (items) => {
    // Calculate subtotal (sum of all item prices * quantities)
    const subtotal = items.reduce((total, item) => {
      const itemPrice = parseFloat(item.artwork_price || 0);
      const quantity = parseInt(item.quantity || 0);
      const itemTotal = itemPrice * quantity;
      return total + itemTotal;
    }, 0);
    
    // Estimate tax (assuming 8% tax rate)
    const estimatedTax = subtotal * 0.08;
    
    // Estimate shipping (flat $5 or free for orders over $50)
    const estimatedShipping = subtotal > 50 ? 0 : 5;
    
    // Calculate final total
    const total = subtotal + estimatedTax + estimatedShipping;
    
    return {
      subtotal: subtotal,
      tax: estimatedTax,
      shipping: estimatedShipping,
      total: total
    };
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <TruckIcon className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Error</p>
          <p className="mt-1">{error}</p>
          {error.includes("logged in") && (
            <button 
              onClick={handleLoginRedirect}
              className="mt-3 bg-red-700 text-white px-4 py-2 rounded text-sm"
            >
              Log In
            </button>
          )}
        </div>
        <button 
          onClick={fetchOrders}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="mb-6">You haven't placed any orders yet.</p>
          <Link to="/browse" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
            {/* Order Summary Header - Always Visible */}
            <div 
              className="p-4 border-b cursor-pointer hover:bg-gray-50 flex items-center justify-between"
              onClick={() => toggleOrderDetails(order.id)}
            >
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <div className="ml-3">
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.created_at || order.date)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="text-right mr-4">
                  <p className="font-medium">${order.calculatedTotal.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                </div>
                {expandedOrderId === order.id ? 
                  <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                }
              </div>
            </div>
            
            {/* Expanded Order Details */}
            {expandedOrderId === order.id && (
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Items ({calculateTotalItems(order.items)} total)</h3>
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <li key={index} className="py-3 flex items-start">
                        {item.artwork_image && (
                          <div className="w-16 h-16 flex-shrink-0 mr-4 rounded overflow-hidden">
                            <img 
                              src={item.artwork_image} 
                              alt={item.artwork_title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        )}
                        <div className="flex-grow">
                          <p className="font-medium">{item.artwork_title}</p>
                          {item.artwork_description && (
                            <p className="text-sm text-gray-500">{item.artwork_description}</p>
                          )}
                          <p className="text-sm text-gray-600 mt-1">
                            Qty: {item.quantity} × ${parseFloat(item.artwork_price).toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium ml-4">
                          ${(parseFloat(item.artwork_price) * parseInt(item.quantity)).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Order Details Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${order.calculatedSubtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>${(order.calculatedSubtotal > 50 ? 0 : 5).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span>Tax (8%)</span>
                    <span>${(order.calculatedSubtotal * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                    <span>Total</span>
                    <span>${order.calculatedTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Shipping Information */}
                {order.customer && (
                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-medium text-gray-700 mb-2">Shipping Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                      <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                      <p><span className="font-medium">Address:</span> {order.customer.address}</p>
                      <p><span className="font-medium">City:</span> {order.customer.city}</p>
                      <p><span className="font-medium">Postal Code:</span> {order.customer.postalCode}</p>
                      <p><span className="font-medium">Country:</span> {order.customer.country}</p>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="mt-6 flex space-x-4">
                  <Link 
                    to={`/order/${order.id}`}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                  >
                    View Full Details
                  </Link>
                  {["processing", "pending"].includes(order.status?.toLowerCase()) && (
                    <button className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded hover:bg-red-200 text-sm">
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/browse" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Orders;
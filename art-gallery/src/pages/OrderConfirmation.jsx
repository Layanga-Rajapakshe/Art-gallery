import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Get order from location state or fetch the latest order from localStorage
    if (location.state && location.state.order) {
      setOrder(location.state.order);
    } else {
      // Fallback to latest order in localStorage if navigated directly to this page
      const orders = localStorage.getItem('orders') ? 
        JSON.parse(localStorage.getItem('orders')) : [];
      
      if (orders.length > 0) {
        setOrder(orders[orders.length - 1]);
      }
    }
  }, [location.state]);

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

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        <div className="border-t border-b py-4 my-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Order Number:</span>
            <span className="text-gray-700">{order.id}</span>
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

        <h2 className="text-lg font-medium mb-4">Order Details</h2>
        <div className="mb-6">
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <li key={index} className="py-3 flex justify-between">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
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

      <div className="text-center">
        <Link to="/browse" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
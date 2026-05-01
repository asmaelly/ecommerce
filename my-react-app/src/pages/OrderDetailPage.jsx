import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../services/api';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const response = await getOrder(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Error loading order:', error);
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading order...</div>;
  }

  if (!order) {
    return <div className="text-center py-12">Order not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/orders')} className="mb-6 text-blue-600 hover:text-blue-800">
        ← Back to Orders
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">Order #{order._id.slice(-8)}</h1>
              <p className="text-gray-600 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-600">at {new Date(order.createdAt).toLocaleTimeString()}</p>
            </div>
            <div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{order.shippingAddress}</p>
              <p className="text-gray-700 mt-2">Phone: {order.phone}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-blue-600">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
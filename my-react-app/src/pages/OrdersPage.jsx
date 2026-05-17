import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/api';
import { OrdersSkeleton } from '../components/Skeletons';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
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

  if (loading) return <OrdersSkeleton />;

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-10 font-sans">

      <div className="max-w-4xl mx-auto px-4">

        {/* HEADER (same Agencies style) */}
        <div className="mb-16 text-left">

          <h1 className="text-5xl font-['Clash_Display'] text-[#111111] mb-4">
            Mes commandes
          </h1>

          <p className="text-[#6B7280] text-sm leading-relaxed">
            Suivez l’état de vos réservations et commandes de véhicules.
          </p>

        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[#6B7280] mb-4">
              Aucune commande trouvée.
            </p>

            <Link
              to="/home"
              className="px-6 py-3 bg-black text-white rounded-full text-sm hover:opacity-90 transition"
            >
              Explorer les véhicules
            </Link>
          </div>
        )}

        {/* ORDERS LIST */}
        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-[#F1F1F1] p-4 hover:shadow-md transition"
            >

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                {/* LEFT INFO */}
                <div>

                  <h2 className="text-sm font-semibold text-[#111111]">
                    Commande #{order._id.slice(-8)}
                  </h2>

                  <p className="text-xs text-[#6B7280] mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.charAt(0).toUpperCase() +
                    order.status.slice(1)}
                </span>

                {/* RIGHT INFO */}
                <div className="text-left md:text-right">

                  <p className="text-lg font-semibold text-[#111111]">
                    {order.totalAmount.toFixed(2)} DH
                  </p>

                  <p className="text-xs text-[#6B7280]">
                    {order.items.length} véhicule(s)
                  </p>

                </div>

              </div>

              {/* ITEMS PREVIEW */}
              <div className="mt-4 space-y-1">

                {order.items.slice(0, 3).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-xs text-[#6B7280]"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span className="text-[#111111]">
                      {(item.price * item.quantity).toFixed(2)} DH
                    </span>
                  </div>
                ))}

                {order.items.length > 3 && (
                  <p className="text-xs text-[#9CA3AF]">
                    +{order.items.length - 3} autres véhicules
                  </p>
                )}

              </div>

              {/* ACTION */}
              <div className="mt-4">

                <Link
                  to={`/orders/${order._id}`}
                  className="text-xs text-[#111111] underline hover:opacity-70"
                >
                  Voir les détails →
                </Link>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default OrdersPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/api';
import Footer from '../components/Footer';
import { OrdersSkeleton } from '../components/Skeletons';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

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
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'paid': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'paid': return 'Payée';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const toggleExpand = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  if (loading) {
    return <OrdersSkeleton />;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-black/5 to-yellow-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-light text-black mb-3">Aucune commande</h2>
          <p className="text-sm text-black/50 mb-8">Vous n'avez pas encore passé de commande.</p>
          <Link to="/home" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm hover:bg-yellow-500 hover:text-black transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Découvrir les véhicules
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Header with stats */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-light text-black tracking-tight">Mes commandes</h1>
              <div className="w-16 h-px bg-yellow-400 mt-2 mb-3"></div>
              <p className="text-sm text-black/50">Historique complet de vos réservations</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center px-4 py-2 bg-black/5 rounded-xl">
                <p className="text-2xl font-light text-black">{orders.length}</p>
                <p className="text-xs text-black/40">Commandes</p>
              </div>
              <div className="text-center px-4 py-2 bg-black/5 rounded-xl">
                <p className="text-2xl font-light text-yellow-500">
                  {orders.reduce((sum, order) => sum + order.totalAmount, 0)} DH
                </p>
                <p className="text-xs text-black/40">Total dépensé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des commandes */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="group bg-white rounded-2xl border border-black/10 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* En-tête de la commande - style timeline */}
              <div 
                className="flex flex-wrap items-center justify-between p-5 cursor-pointer"
                onClick={() => toggleExpand(order._id)}
              >
                <div className="flex items-center gap-4">
                  {/* Icone de statut */}
                  <div className={`w-10 h-10 rounded-full border ${getStatusColor(order.status)} flex items-center justify-center`}>
                    {order.status === 'delivered' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {order.status === 'pending' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {order.status === 'shipped' && (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4M17 9l-5-5-5 5M12 4v9" />
                      </svg>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-xs text-black/40 uppercase tracking-wide">Commande #{order._id.slice(-8)}</p>
                    <p className="text-sm font-medium text-black">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-black/40">Montant total</p>
                    <p className="text-xl font-light text-yellow-500">{order.totalAmount} DH</p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  <button className="text-black/30 group-hover:text-yellow-500 transition">
                    <svg className={`w-5 h-5 transform transition-transform duration-300 ${expandedOrder === order._id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Détails développés */}
              <div className={`overflow-hidden transition-all duration-300 ${expandedOrder === order._id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="border-t border-black/10 bg-black/5 p-5">
                  {/* Informations de livraison */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-black mb-3">Informations de livraison</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-black/40">Adresse</p>
                        <p className="text-black mt-1">{order.shippingAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/40">Téléphone</p>
                        <p className="text-black mt-1">{order.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Liste des articles */}
                  <div>
                    <h4 className="text-sm font-medium text-black mb-3">Articles commandés</h4>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-black/5">
                          <div className="flex items-center gap-3">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-12 h-10 object-cover rounded-lg" />
                            ) : (
                              <div className="w-12 h-10 bg-black/5 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-8" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-black">{item.name}</p>
                              <p className="text-xs text-black/40">Quantité: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-black">{(item.price * item.quantity).toFixed(2)} DH</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total et actions */}
                  <div className="mt-6 pt-4 border-t border-black/10 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-black/60">Total de la commande :</span>
                      <span className="text-xl font-light text-yellow-500">{order.totalAmount} DH</span>
                    </div>
                    <Link 
                      to={`/order/${order._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-yellow-500 hover:text-black transition"
                    >
                      Voir le détail complet
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrdersPage;
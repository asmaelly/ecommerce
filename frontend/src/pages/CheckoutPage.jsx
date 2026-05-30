import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

const CheckoutPage = () => {
  const { cart, loadCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    shippingAddress: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createOrder(formData);
      await loadCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error(error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Manrope'] py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-[#111111] mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#ECECEC] rounded-[24px] p-6 space-y-6"
          >

            {/* ADDRESS */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#9CA3AF]">
                Adresse de livraison
              </label>

              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Entrer votre adresse complète"
                className="w-full mt-2 p-4 rounded-xl border border-[#ECECEC] bg-[#FAFAFA] text-sm focus:bg-white focus:outline-none"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#9CA3AF]">
                Téléphone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="06 00 00 00 00"
                className="w-full mt-2 p-4 rounded-xl border border-[#ECECEC] bg-[#FAFAFA] text-sm focus:bg-white focus:outline-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] text-white py-3 rounded-full text-sm hover:opacity-90 transition disabled:opacity-50"
            >
              {loading
                ? 'Validation...'
                : `Confirmer la commande - ${cart.total?.toFixed(2)} DH`}
            </button>

          </form>

          {/* SUMMARY */}
          <div className="bg-white border border-[#ECECEC] rounded-[24px] p-6 h-fit">

            <h2 className="text-lg font-semibold text-[#111111] mb-5">
              Résumé de commande
            </h2>

            <div className="space-y-3 mb-6">

              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm text-[#6B7280]"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span className="text-[#111111]">
                    {(item.price * item.quantity).toFixed(2)} DH
                  </span>
                </div>
              ))}

            </div>

            <div className="border-t border-[#ECECEC] pt-4">

              <div className="flex justify-between font-semibold text-[#111111]">
                <span>Total</span>
                <span>{cart.total?.toFixed(2)} DH</span>
              </div>

              <p className="text-xs text-[#9CA3AF] mt-1">
                TVA incluse
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
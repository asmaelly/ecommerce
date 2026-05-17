import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import registerImg from "../assets/registerImg.jpg";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Inscription réussie:', response.data);
      
      // Sauvegarder le token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Marquer que l'utilisateur est nouveau et doit faire le quiz
      localStorage.setItem('isNewUser', 'true');
      
      // Rediriger vers le quiz pour les nouveaux membres
      navigate('/quiz');
      
    } catch (err) {
      console.error('Erreur inscription:', err);
      
      if (err.response?.status === 400) {
        setError(err.response.data.error || 'Données invalides');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Inscription en cours..." />;
  }

  return (
  <div className="min-h-screen flex font-sans bg-[#F9FAFB]">

    {/* LEFT SIDE - IMAGE */}
    <div className="hidden md:flex w-1/2 relative overflow-hidden">

      <img
        src={registerImg}
        alt="car"
        className="w-full h-full object-cover"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* text on image */}
      <div className="absolute bottom-10 left-10 text-white">
       <span className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-[0.1em] md:tracking-[0.15em] text-white group-hover:scale-105 transition-all duration-500`}>
                  DRIVE<span className="text-[#FFD700]">WISE</span>
                </span>
        <p className="text-sm text-white/80 mt-2 max-w-sm">
          Louez facilement des voitures premium partout au Maroc.
        </p>
      </div>

    </div>

    {/* RIGHT SIDE - FORM */}
    <div className="w-full md:w-1/2 flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">

          {/* HEADER */}
          <div className="text-left mb-8">
            <h2 className="text-2xl font-semibold text-[#111111]">
              Inscription
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Crée ton compte DriveWise
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm outline-none focus:border-black"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm outline-none focus:border-black"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm outline-none focus:border-black"
              required
            />

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmer le mot de passe"
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm outline-none focus:border-black"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-sm font-medium transition ${
                loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:opacity-90"
              }`}
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-[#6B7280] mt-6">
            Déjà un compte?
            <Link to="/login" className="text-black font-medium ml-1 hover:underline">
              Se connecter
            </Link>
          </p>

        </div>
      </div>
    </div>

  </div>
);
};

export default RegisterPage;
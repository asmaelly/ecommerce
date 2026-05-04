import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await login(identifier, password);
      console.log('Réponse login:', response.data);
      
      // Sauvegarder le token
      localStorage.setItem('token', response.data.token);
      
      // Rediriger vers le quiz
      navigate('/quiz');
      
    } catch (err) {
      console.error('Erreur login:', err);
      console.log('Détails erreur:', err.response?.data);
      
      if (err.response?.status === 401) {
        setError('Email/username ou mot de passe incorrect');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Erreur de connexion. Vérifie que le backend tourne sur http://localhost:3000');
      }
    } finally {
      setLoading(false);
    }
  };
   if (loading) {
    return <LoadingSpinner message="Connexion en cours..." />;
  }

  return (
  <div className="min-h-screen bg-[#F2FAFA] flex items-center justify-center font-sans">

    <div className="w-full max-w-md">

      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10">

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-medium text-[#111111] mb-2">
            Connexion
          </h2>
          <p className="text-[#6B7280] text-sm">
            Accède à ton compte DriveWise
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-6 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email ou username"
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-full text-sm outline-none focus:border-black transition"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-full text-sm outline-none focus:border-black transition"
            required
          />

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-full text-sm transition ${
              loading
                ? 'bg-gray-200 text-[#6B7280]'
                : 'bg-[#111111] text-white hover:opacity-80'
            }`}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7280] mt-8">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-[#111111] hover:underline">
            Créer un compte
          </Link>
        </p>

      </div>

    </div>
  </div>
);
};

export default LoginPage;
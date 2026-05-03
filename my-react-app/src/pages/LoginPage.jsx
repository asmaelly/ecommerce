import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">Connexion</h2>
          <p className="text-center text-gray-600 mt-2">Connecte-toi à ton compte</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email ou Nom d'utilisateur
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="exemple@email.com ou pseudo"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Ton mot de passe"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold disabled:bg-blue-400"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
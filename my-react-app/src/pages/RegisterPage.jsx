import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

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
    <div className="min-h-screen bg-[#F2FAFA] flex items-center justify-center font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-medium text-[#111111] mb-2">
              Inscription
            </h2>
            <p className="text-[#6B7280] text-sm">
              Crée ton compte DriveWise
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-full text-sm outline-none focus:border-black transition"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-full text-sm outline-none focus:border-black transition"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-full text-sm outline-none focus:border-black transition"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-full text-sm outline-none focus:border-black transition"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-3 rounded-full text-sm transition ${
                loading
                  ? 'bg-gray-200 text-[#6B7280] cursor-not-allowed'
                  : 'bg-[#111111] text-white hover:opacity-80'
              }`}
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-8">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#111111] font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
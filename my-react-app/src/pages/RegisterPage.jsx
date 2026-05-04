import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('Tous les champs sont requis');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    try {
      const response = await register({ username, email, password });

      localStorage.setItem('token', response.data.token);
      navigate('/quiz');

    } catch (err) {
      const errorMessage = err.response?.data?.error || "Erreur lors de l'inscription";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center font-sans">

      <div className="w-full max-w-md">

        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-10">

          <div className="mb-10 text-center">
            <h2 className="text-2xl font-medium text-[#111111] mb-2">
              Créer un compte
            </h2>
            <p className="text-[#6B7280] text-sm">
              Rejoins DriveWise
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-full text-sm outline-none focus:border-black transition"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer le mot de passe"
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
              {loading ? 'Création...' : "S'inscrire"}
            </button>

          </form>

          <p className="text-center text-sm text-[#6B7280] mt-8">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#111111] hover:underline">
              Se connecter
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;
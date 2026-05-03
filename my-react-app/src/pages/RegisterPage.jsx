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
        console.log('Inscription réussie:', response.data);
        
        // Sauvegarder le token
        localStorage.setItem('token', response.data.token);
        
        // Rediriger vers le quiz
        navigate('/quiz');
        
        } catch (err) {
        console.error('Erreur inscription:', err);
        const errorMessage = err.response?.data?.error || 'Erreur lors de l\'inscription';
        setError(errorMessage);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
            <div>
            <h2 className="text-3xl font-bold text-center text-gray-900">Créer un compte</h2>
            <p className="text-center text-gray-600 mt-2">Rejoins-nous aujourd'hui</p>
            </div>
            
            {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
            </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'utilisateur
                </label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Choisis un pseudo"
                required
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="exemple@email.com"
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
                placeholder="Au moins 6 caractères"
                required
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
                </label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="confirmer ton mot de passe"
                required
                />
            </div>
            
            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold disabled:bg-blue-400"
            >
                {loading ? 'Création du compte...' : "S'inscrire"}
            </button>
            </form>
            
            <p className="text-center text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Se connecter
            </Link>
            </p>
        </div>
        </div>
    );
    };

    export default RegisterPage;
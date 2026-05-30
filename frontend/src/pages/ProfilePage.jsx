// pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile, updatePassword } from '../services/api';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'password'
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formulaire profil
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: ''
  });

  // Formulaire mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
      setFormData({
        username: response.data.username || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        address: response.data.address || ''
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await updateProfile(formData);
      setProfile({ ...profile, ...formData });
      setStatus({
        type: 'success',
        text: 'Profil mis à jour avec succès !'
      });
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error('Error:', error);
      setStatus({
        type: 'error',
        text: 'Erreur lors de la mise à jour du profil'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus({
        type: 'error',
        text: 'Les nouveaux mots de passe ne correspondent pas'
      });
      setIsSubmitting(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setStatus({
        type: 'error',
        text: 'Le mot de passe doit contenir au moins 6 caractères'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setStatus({
        type: 'success',
        text: 'Mot de passe modifié avec succès !'
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error('Error:', error);
      setStatus({
        type: 'error',
        text: error.response?.data?.error || 'Erreur lors du changement de mot de passe'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F7] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F8F8F7] py-24 px-4 relative overflow-hidden font-['General_Sans']">

        {/* BACKGROUND DECORATION */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-black/[0.03] rounded-full blur-3xl"></div>

        <div className="absolute inset-0 opacity-[0.025]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:55px_55px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="mb-12">
            <p className="text-yellow-500 uppercase tracking-[0.35em] text-[11px] mb-5 font-['Clash_Display']">
              DriveWise Account
            </p>
            <h1 className="text-5xl md:text-6xl leading-tight text-[#111111] font-['Clash_Display'] mb-4">
              Mon profil
            </h1>
            <p className="text-[#6B7280] text-[15px] leading-relaxed font-sans">
              Gérez vos informations personnelles et votre mot de passe
            </p>
          </div>

          {/* TABS */}
          <div className="flex gap-2 mb-8 border-b border-[#ECECEC]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'profile'
                  ? 'text-[#111111] border-b-2 border-[#111111]'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              Informations personnelles
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                activeTab === 'password'
                  ? 'text-[#111111] border-b-2 border-[#111111]'
                  : 'text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              Sécurité
            </button>
          </div>

          {/* STATUS MESSAGE */}
          {status && (
            <div className={`mb-6 rounded-2xl p-4 text-sm ${
              status.type === 'success'
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}>
              {status.text}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white border border-[#ECECEC] rounded-[34px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              
              <div className="flex items-center gap-6 mb-8 pb-6 border-b border-[#ECECEC]">
                <div className="w-20 h-20 bg-[#F8F8F7] rounded-full flex items-center justify-center border-2 border-[#ECECEC]">
                  <span className="text-2xl font-medium text-[#111111]">
                    {profile?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-medium text-[#111111] font-['Clash_Display']">
                    {profile?.username}
                  </h2>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Membre depuis {new Date(profile?.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-[#6B7280] mb-2 font-sans">
                    Nom d'utilisateur
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleProfileChange}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans focus:outline-none focus:border-[#111111] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2 font-sans">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans focus:outline-none focus:border-[#111111] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2 font-sans">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleProfileChange}
                    placeholder="+212 6 XX XX XX XX"
                    className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans focus:outline-none focus:border-[#111111] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2 font-sans">
                    Adresse
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleProfileChange}
                    rows="3"
                    placeholder="Votre adresse complète"
                    className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-[28px] px-5 py-4 text-sm font-sans focus:outline-none focus:border-[#111111] transition resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#111111] text-white rounded-full py-3 px-8 text-sm font-sans hover:bg-[#333333] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === 'password' && (
            <div className="bg-white border border-[#ECECEC] rounded-[34px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
              
              <div className="mb-6">
                <h3 className="text-xl font-medium text-[#111111] font-['Clash_Display'] mb-2">
                  Modifier mon mot de passe
                </h3>
                <p className="text-sm text-[#6B7280]">
                  Choisissez un mot de passe sécurisé d'au moins 6 caractères
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-[#6B7280] mb-2 font-sans">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans focus:outline-none focus:border-[#111111] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2 font-sans">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans focus:outline-none focus:border-[#111111] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B7280] mb-2 font-sans">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-full px-5 py-3 text-sm font-sans focus:outline-none focus:border-[#111111] transition"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#111111] text-white rounded-full py-3 px-8 text-sm font-sans hover:bg-[#333333] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Modification...' : 'Modifier le mot de passe'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white border border-[#ECECEC] rounded-[24px] p-5 text-center">
              <p className="text-2xl font-light text-[#111111]">0</p>
              <p className="text-sm text-[#6B7280] mt-1">Réservations</p>
            </div>
            <div className="bg-white border border-[#ECECEC] rounded-[24px] p-5 text-center">
              <p className="text-2xl font-light text-[#111111]">0</p>
              <p className="text-sm text-[#6B7280] mt-1">Favoris</p>
            </div>
            <div className="bg-white border border-[#ECECEC] rounded-[24px] p-5 text-center">
              <p className="text-2xl font-light text-[#111111]">0</p>
              <p className="text-sm text-[#6B7280] mt-1">Jours de location</p>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="text-sm text-[#6B7280] hover:text-red-500 transition font-sans"
            >
              Se déconnecter
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
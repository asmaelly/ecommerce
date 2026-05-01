import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setProfile(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

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
      const response = await updateProfile(formData);
      setProfile(response.data);
      setEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{profile?.username}</h2>
              <p className="text-blue-100">Member since {new Date(profile?.createdAt).toLocaleDateString()}</p>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Username</h3>
                <p className="text-lg">{profile?.username}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email Address</h3>
                <p className="text-lg">{profile?.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Account Created</h3>
                <p className="text-lg">{new Date(profile?.createdAt).toLocaleString()}</p>
              </div>
              
              <div className="border-t pt-6">
                <button
                  onClick={logout}
                  className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
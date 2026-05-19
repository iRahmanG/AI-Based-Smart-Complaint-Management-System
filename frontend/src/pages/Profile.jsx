import React, { useState, useEffect } from 'react';
import { UserCircle, Mail, Phone, Calendar, Edit2, Save } from 'lucide-react';
import api from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
        setForm(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="p-12 text-center text-slate-400">Loading profile...</div>;

  const initials = (user?.fullName || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Avatar header */}
        <div className="h-28 bg-gradient-to-r from-primary-500 to-indigo-600"></div>
        <div className="px-6 pb-6">
          <div className="-mt-10 mb-4 flex items-end justify-between">
            <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-primary-600 bg-primary-50">
              {initials}
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="btn-secondary text-sm px-4 py-2 mt-2"
            >
              <Edit2 size={14} /> {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <h2 className="text-xl font-bold text-slate-900">{user?.fullName || 'Citizen'}</h2>
          <p className="text-sm text-primary-600 font-medium capitalize">{user?.role || 'citizen'} Account</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-slate-600">
              <Mail size={16} className="text-slate-400" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Phone size={16} className="text-slate-400" />
              <span className="text-sm">{user?.phoneNumber || 'Not provided'}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-sm">Joined {new Date(user?.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="font-bold text-slate-700 mb-4">Account Information</h2>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between py-3 border-b border-slate-100">
            <span className="text-slate-500">Account Type</span>
            <span className="font-medium text-slate-700 capitalize">{user?.role}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-100">
            <span className="text-slate-500">Email Verified</span>
            <span className="text-emerald-600 font-medium">✓ Verified</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-slate-500">Authentication</span>
            <span className="font-medium text-slate-700">Password + JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import api from '../api/axios.js';

const Profile = () => {
  const { token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users', {
           headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json'
  },
  withCredentials: true
});
        setProfile(res.data);
      } catch (err) {
        console.error(err.message);
        setError('Session expired. Please login again.');
        logout();
      }
    };
    if (token) fetchProfile();
  }, [token, logout]);

  if (error) return <div className="max-w-md mx-auto mt-10 text-center text-red-600">{error}</div>;
  if (!profile) return <div className="max-w-md mx-auto mt-10 text-center">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl mb-6 text-center font-semibold">Profile</h2>
      <p className="mb-2"><strong>Email:</strong> {profile.email}</p>
      <p className="mb-2"><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
      {profile.teacher && (
        <>
          <p className="mb-2"><strong>University:</strong> {profile.teacher.university_name}</p>
          <p className="mb-2"><strong>Gender:</strong> {profile.teacher.gender}</p>
          <p className="mb-2"><strong>Year Joined:</strong> {profile.teacher.year_joined}</p>
        </>
      )}
      <button
        onClick={logout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;

import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default ProfilePage;

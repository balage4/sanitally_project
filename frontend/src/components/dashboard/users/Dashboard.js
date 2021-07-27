/* eslint-disable react/prop-types */
import React from 'react';
import AuthenticatedNavbar from '../../navbars/authenticatedNavbar/AuthenticatedNavbar';

export default function Dashboard({ user, setUser }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <p>Welcome, {user.email}</p>
    </div>
  )
}


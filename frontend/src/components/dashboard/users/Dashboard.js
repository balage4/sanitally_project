/* eslint-disable react/prop-types */
import React from 'react';
import AuthenticatedNavbar from '../../navbars/authenticatedNavbar/AuthenticatedNavbar';
import WelcomeFeed from './WelcomeFeed';

export default function Dashboard({ user, setUser }) {

  return (
    <div className="dashboard">
      <WelcomeFeed firstName={user.firstName} />
      <h1>Dashboard</h1>
      <AuthenticatedNavbar user={user} setUser={setUser} />

    </div>
  )
}


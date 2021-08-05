/* eslint-disable react/prop-types */
import React from 'react';
import AuthenticatedNavbar from '../../navbars/authenticatedNavbar/AuthenticatedNavbar';
import WelcomeFeed from './WelcomeFeed';

export default function Dashboard({ user, setUser }) {

  return (
    <div className="dashboard">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h1 className="text-center">Dashboard</h1>
      <WelcomeFeed firstName={user.firstName} />

    </div>
  )
}


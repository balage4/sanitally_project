/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import AuthenticatedNavbar from '../../navbars/authenticatedNavbar/AuthenticatedNavbar';
import WelcomeFeed from './WelcomeFeed';

export default function Dashboard({ user, setUser }) {

  console.log(user.role);

  return (
    <div className="dashboard">
      <WelcomeFeed firstName={user.firstName} />
      <h1>Dashboard</h1>
      <AuthenticatedNavbar user={user} setUser={setUser} />

      <Link
        className="btn btn-primary"
        to="/events/new">
        Új időpontot foglalok
      </Link>

    </div>
  )
}


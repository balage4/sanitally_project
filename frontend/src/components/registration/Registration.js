import React from 'react';
import AuthenticatedNavbar from '../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar';
import Navbar from '../../Common/navbars/nonAuthenticatedNavbar/Navbar';
import RegistrationForm from './RegForm';

// eslint-disable-next-line react/prop-types
export default function Registration({ user, logoutUser }) {
  return (
    <div className="registration-form">
      {!user && <Navbar />}
      {user && <AuthenticatedNavbar user={user} logoutUser={logoutUser} />}
      <h1 className="text-center m-3">Regisztráció</h1>
      <h6>Kérlek, add meg adataidat az alkalmazás használatához:</h6>
      <RegistrationForm />
    </div>
  );
}

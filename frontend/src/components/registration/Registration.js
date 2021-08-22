import React from 'react';
import AuthenticatedNavbar from '../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar';
import Navbar from '../../Common/navbars/nonAuthenticatedNavbar/Navbar';
import RegistrationForm from './RegistrationForm';

// eslint-disable-next-line react/prop-types
export default function Registration({ user, logoutUser }) {
  return (
    <div className="registration-form">
      {!user && <Navbar />}
      {user && <AuthenticatedNavbar user={user} logoutUser={logoutUser} />}
      <h1 className="text-center">Regisztráció</h1>
      <RegistrationForm />
    </div>
  );
}

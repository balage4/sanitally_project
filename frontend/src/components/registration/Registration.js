import React from 'react';
import AuthenticatedNavbar from '../navbars/authenticatedNavbar/AuthenticatedNavbar';
import Navbar from '../navbars/nonAuthenticatedNavbar/Navbar';
import RegistrationForm from './RegistrationForm';

// eslint-disable-next-line react/prop-types
export default function Registration({ user, logoutUser }) {
  return (
    <>
      <div className="row">
        <div className="col">
          {!user && <Navbar />}
          {user && <AuthenticatedNavbar user={user} logoutUser={logoutUser} />}
          <div className="header d-flex justify-content-center py-5">
            <h1 className="text-center mb-0">Registration</h1>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}

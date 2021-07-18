import React from 'react';
import Navbar from '../navbars/nonAuthenticatedNavbar/Navbar';
import RegistrationForm from './RegistrationForm';

export default function Registration() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Navbar />
          <div className="header d-flex justify-content-center py-5">
            <h1 className="text-center mb-0">Registration</h1>
          </div>
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}

import React from 'react';
import Navbar from '../navbars/nonAuthenticatedNavbar/Navbar';
import Registrate from './registrationForm';

export default function Registration() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Navbar />
          <div className="header d-flex justify-content-center py-5">
            <h1 className="text-center mb-0">Registration Page</h1>
          </div>
          <Registrate />
        </div>
      </div>
    </>
  );
}

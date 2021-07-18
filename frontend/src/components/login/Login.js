import React from 'react';
import Navbar from '../navbars/nonAuthenticatedNavbar/Navbar';
import LoginForm from './LoginForm';
import "../../scss/login.scss";

export default function Login() {
  return (
    <>
      <div className="row">
        <div className="col pe-0 ps-4">
          <Navbar />
          <div className="header d-flex justify-content-center py-5">
            <h1 className="text-center mb-5">Login</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

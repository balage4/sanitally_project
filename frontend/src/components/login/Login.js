import React from 'react';
import Navbar from '../../Common/navbars/nonAuthenticatedNavbar/Navbar';
import LoginForm from './LoginForm';


// eslint-disable-next-line react/prop-types
export default function Login({ user, setUser }) {
  return (
    <div className="login-form">
      <Navbar />
      <h1>Bejelentkezés</h1>
      <LoginForm user={user} setUser={setUser} />
    </div>
  );
}

import React from 'react';
import AuthenticatedNavbar from '../../navbars/authenticatedNavbar/AuthenticatedNavbar';

// eslint-disable-next-line react/prop-types
export default function Dashboard({ user, setUser }) {
  return (
    <>
      <h1>Dashboard</h1>
      <AuthenticatedNavbar user={user} setUser={setUser} />
    </>
  )
}
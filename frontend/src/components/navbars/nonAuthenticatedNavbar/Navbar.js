import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container-fluid bg-dark">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item d-flex align-items-center">
              <Link className="link me-3" to="/">Home</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex align-items-center">
              <Link className="link me-3" to="/login">Login</Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <Link className="link me-3" to="/register">Registration</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}


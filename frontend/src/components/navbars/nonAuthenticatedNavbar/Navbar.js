import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md ">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav me-auto">
          <li className="nav-item d-flex align-items-center">
            <Link className="link me-3" to="/">Főoldal</Link>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item d-flex align-items-center">
            <Link className="link me-3" to="/login">Bejelentkezés</Link>
          </li>
          <li className="nav-item d-flex align-items-center">
            <Link className="link me-3" to="/register">Regisztráció</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}


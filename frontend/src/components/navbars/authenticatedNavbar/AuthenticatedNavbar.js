/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AuthNavMenu from "./AuthNavMenu";

export default function AuthenticatedNavbar({ user, setUser }) {

  function logoutUser() {
    localStorage.removeItem('user');
    setUser(null);
  }

  const menusByRoles = {
    user: [
      'Események',
      'Receptek'
    ],
    admin: [
      'Admin',
      'Események',
    ],
    provider: [
      'Események',
      'Receptek',
    ]
  }

  const endpoints = {
    'Események': '/events',
    'Admin': '/admin',
    'Receptek': '/prescriptions',
  }

  return (
    <nav className="navbar navbar-expand-md">
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
          <li className="nav-item d-flex align-items-center nav-title-li">
            Sanitally
          </li>
          <li className="nav-item d-flex align-items-center">
            <Link className="link me-3" to="/dashboard">
              Dashboard
            </Link>
          </li>
        </ul>


        <ul className="navbar-nav ms-auto">

          <AuthNavMenu
            // eslint-disable-next-line react/prop-types
            menus={menusByRoles[user.role]}
            endpoints={endpoints}
            liClass='nav-item d-flex align-items-center'
            linkClass='link me-3'
          />

          <li
            className="nav-item d-flex align-items-center link me-3 text-center">
            Bejelentkezve:<br /> {`${user.lastName} ${user.firstName}`}
          </li>
          <li
            className='nav-item d-flex align-items-center'>
            <button
              type="button"
              className="btn btn-info m-3 border border-secondary"
              onClick={logoutUser}
            >Kijelentkezés</button></li>

        </ul>

      </div>
    </nav>
  );
}

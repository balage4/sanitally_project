import { Link } from "react-router-dom";
import AuthNavMenu from "./AuthNavMenu";

// eslint-disable-next-line react/prop-types
export default function AuthenticatedNavbar({ user, setUser }) {

  function logoutUser() {
    localStorage.clear();
    setUser(null);
  }

  const menusByRoles = {
    participant: [
      'Events',
      'My appointments',
      'My Profile'
    ],
    facilitator: [
      'Events',
      'My appointments',
      'My Profile'
    ],
    admin: [
      'Admin',
      'My Profile'
    ]
  }

  const endpoints = {
    'Events': '/events',
    'My appointments': '/myappointments',
    'Admin': '/admin',
    'My Profile': '/profile'
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container-fluid bg-dark">
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

            <li className='nav-item d-flex align-items-center'>
              <button
                type="button"
                className="btn btn-info"
                onClick={logoutUser}
              >Logout</button></li>

          </ul>

        </div>
      </div>
    </nav>
  );
}

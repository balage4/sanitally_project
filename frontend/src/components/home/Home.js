import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbars/nonAuthenticatedNavbar/Navbar';
import Footer from '../footer/Footer';

export default function Home() {
  const history = useHistory();

  function goToRegistration() {
    history.push('/register');
  }

  function goToLogin() {
    history.push('/login');
  }

  return (
    <>
      <div className="row">
        <div className="col pe-0 ps-4">
          <Navbar />
          <div className="header d-flex justify-content-center py-5">
            <div>
              <h1 className="text-center mb-5">Sanitally</h1>
              <div>
                <h3 className="text-center mb-3">No authenticated user</h3>
                <h3 className="text-center">
                  Please{' '}
                  <span onClick={goToRegistration} aria-hidden="true">
                    register
                  </span>{' '}
                  or{' '}
                  <span onClick={goToLogin} aria-hidden="true">
                    login{' '}
                  </span>
                  to use the application
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

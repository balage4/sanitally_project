/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../navbars/nonAuthenticatedNavbar/Navbar';
import AuthenticatedNavbar from '../navbars/authenticatedNavbar/AuthenticatedNavbar';
import Footer from '../footer/Footer';
import Categories from './CategoriesMain';
import fetchWithAuth, { backend } from '../../utilities';

export default function Home({ user, setUser }) {
  const history = useHistory();

  const [categories, setCategories] = useState(null);

  function goToRegistration() {
    history.push('/register');
  }

  function goToLogin() {
    history.push('/login');
  }

  async function getCategories() {
    const res = await fetchWithAuth(`${backend.endpoint}/categories`, null, 'GET', null);
    return res;
  }

  useEffect(async () => {
    const categoriesResponse = await getCategories();
    setCategories(categoriesResponse.categories);
  }, []);

  return (
    <>
      {!user && <Navbar />}
      {user && <AuthenticatedNavbar user={user} setUser={setUser} />}
      <div className="main d-flex justify-content-center">
        <div>
          <h1 className="text-center">SanitAlly</h1>
          <h4 className="text-center">Medical appointment system</h4>
          <div>
            {!user && <h3 className="text-center text-danger mb-3">No authenticated user</h3>}
            {user && (
              <>
                <h3 className="text-center mb-3">Üdvözlünk, {user.firstName}</h3>
              </>
            )}

            {!user && <h3 className="text-center">
              Az alkalmazás használatához{' '}
              <span onClick={goToRegistration} aria-hidden="true">
                regisztrálj
              </span>{' '}
              vagy{' '}
              <span onClick={goToLogin} aria-hidden="true">
                jelentkezz be{' '}
              </span>
              !
            </h3>}

          </div>
          <div>
            <h4 className="text-center mt-3">Ismerkedj meg szolgáltatásainkkal</h4>
            {categories && (<Categories categories={categories} />)}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

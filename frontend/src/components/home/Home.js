/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../Common/navbars/nonAuthenticatedNavbar/Navbar';
import AuthenticatedNavbar from '../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar';
/* import Footer from '../footer/Footer'; */
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
    const res = await fetchWithAuth(`${backend.endpoint}/categories`);
    return res;
  }
  async function initCategories() {
    const res = await fetchWithAuth(`${backend.endpoint}/categories/init`, null, 'POST');
    return res;
  }

  useEffect(async () => {
    const categoriesResponse = await getCategories();
    if (!categoriesResponse.length) {
      await initCategories();
      const categoriesAfterInit = await getCategories();
      setCategories(categoriesAfterInit);
    } else {
      setCategories(categoriesResponse);
    }
  }, []);

  return (
    <>
      {!user && <Navbar />}
      {user && <AuthenticatedNavbar user={user} setUser={setUser} />}
      <div className="home main d-flex flex-column justify-content-center">
        <h1 className="text-center">SanitAlly</h1>
        <h4 className="text-center">Egészségügyi időpont-foglalási rendszer</h4>
        <div>
          {!user && <h3 className="text-center text-danger mb-3">Nincs bejelentkezett felhasználó</h3>}
          {user && (
            <>
              <h3 className="text-center mb-3">Üdvözlünk, {user.firstName}</h3>
            </>
          )}

          {!user && <h3 className="text-center mt-4">
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
          <h4 className="text-center mt-5">Ismerkedj meg szolgáltatásainkkal:</h4>
          {categories && (<Categories categories={categories} />)}
          {!categories && (
            <div className="text-center text-danger mt-3">Szolgáltatási ismertető pillanatnyilag nem érhető el! :(</div>
          )}
        </div>
      </div>
      {/*  <Footer /> */}
    </>
  );
}

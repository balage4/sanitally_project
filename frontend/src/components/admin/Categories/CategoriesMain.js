import { useState, useEffect } from "react";
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";
import '../../../scss/categories.scss';
import CategoryForm from "./CategoryForm";
import { backend } from "../../../utilities";

/* eslint-disable react/prop-types */
export default function CategoriesMain({ user, setUser }) {

  const [editCategories, setEditCategories] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  function getCategories() {
    fetch(`${backend.endpoint}/categories`)
      .then(res => res.json())
      .then(res => {
        setEditCategories(res);
      })
      .catch(err => {
        setFetchError(err.message);
      })
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="categories-main">
      <AuthenticatedNavbar user={user} setUser={setUser} />

      <h2 className="text-center m-3">Kategória leírások listája</h2>
      <h4 className="text-center mb-3">A Főoldalon megjelenő kategória-lista (szolgálatások) frissítése </h4>

      <div className="categories-box mt-2">

        {editCategories && (
          editCategories.map(category => (
            <CategoryForm
              key={category._id}
              token={user.token}
              category={category} />
          ))
        )}
        {fetchError && (
          <div className="alert alert-danger">{fetchError}</div>
        )}

      </div>
    </div>
  )
}
